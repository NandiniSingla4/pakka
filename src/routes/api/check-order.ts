import { createFileRoute } from "@tanstack/react-router";
import {
  CAP_MESSAGE, ERROR_MESSAGE, MAX_INPUT_CHARS, MAX_MESSAGES, MAX_OUTPUT_TOKENS, REJECT_MESSAGE, VISITOR_CAP, containsPersonalDetails, isVisitorId, parseConversation,
  type CheckResponse, type LiveChange, type LiveField, type LiveResult, type ParsedMessage,
} from "@/lib/check-order";
import { countVisitorChecks, logInteraction } from "@/lib/pakka-supabase.server";

const API = "https://generativelanguage.googleapis.com/v1beta";
/** Pakka only needs lightweight structured extraction: Flash-Lite is primary, gemini-3.8-flash is the single 503 fallback. */
const PRIMARY_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_MODEL = "gemini-3.8-flash";

type Usage = { inputTokens: number | null; outputTokens: number | null };
type GeminiCall = { ok: true; model: string; json: Record<string, unknown>; usage: Usage } | { ok: false; model: string; status: number; details: string };

const redact = (s: string, key: string) => s.split(key).join("[redacted]").slice(0, 800);


async function generate(apiKey: string, model: string, numbered: string): Promise<GeminiCall> {
  const generationConfig: Record<string, unknown> = { responseMimeType: "application/json", responseSchema, temperature: 0, maxOutputTokens: MAX_OUTPUT_TOKENS };
  if (/^gemini-2\.5-flash/.test(model)) generationConfig["thinkingConfig"] = { thinkingBudget: 0 };
  const res = await fetch(`${API}/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: SYSTEM }] }, contents: [{ role: "user", parts: [{ text: numbered }] }], generationConfig }),
  });
  const body = await res.text();
  if (!res.ok) {
    const details = redact(body, apiKey);
    // Log the quota state without ever printing the key.
    const retryAfter = res.headers.get("retry-after") ?? "";
    console.error("Gemini error", model, res.status, retryAfter ? `retry-after: ${retryAfter}s` : "no retry-after header", details);
    return { ok: false, model, status: res.status, details: retryAfter ? `${details} (retry-after: ${retryAfter}s)` : details };
  }
  try {
    const data = JSON.parse(body) as { candidates?: { finishReason?: string; content?: { parts?: { text?: string; thought?: boolean }[] } }[]; promptFeedback?: { blockReason?: string }; usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number } };
    const cand = data.candidates?.[0];
    const out = cand?.content?.parts?.filter(p => !p.thought).map(p => p.text ?? "").join("") ?? "";
    if (!out) return { ok: false, model, status: 200, details: `Empty response (finishReason: ${cand?.finishReason ?? "none"}, blockReason: ${data.promptFeedback?.blockReason ?? "none"})` };
    const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
    const usage = { inputTokens: num(data.usageMetadata?.promptTokenCount), outputTokens: num(data.usageMetadata?.candidatesTokenCount) };
    return { ok: true, model, json: JSON.parse(out) as Record<string, unknown>, usage };
  } catch (e) {
    console.error("Gemini parse error", model, body.slice(0, 500));
    return { ok: false, model, status: 200, details: `Could not parse Gemini JSON: ${e instanceof Error ? e.message : "unknown"}` };
  }
}

async function callGemini(apiKey: string, numbered: string): Promise<GeminiCall> {
  // GEMINI_MODEL stays as an optional server-side override; default is stable Flash-Lite.
  const override = process.env["GEMINI_MODEL"]?.trim();
  const primary = override || PRIMARY_MODEL;
  const attempt = await generate(apiKey, primary, numbered);
  // Exactly one fallback, only for transient high-demand responses; no repeated retries.
  if (attempt.ok || attempt.status !== 503) return attempt;
  return generate(apiKey, FALLBACK_MODEL, numbered);
}

function diag(httpStatus: number, error: string, status: number, details: string, model?: string) {
  return Response.json({ ok: false, kind: "error", message: ERROR_MESSAGE, error, status, details, model }, { status: httpStatus, headers: { "Cache-Control": "no-store" } });
}

const fieldSchema = {
  type: "OBJECT",
  properties: { field: { type: "STRING" }, value: { type: "STRING" }, reason: { type: "STRING" }, evidence: { type: "ARRAY", items: { type: "STRING" } } },
  required: ["field", "value", "reason", "evidence"],
};
const responseSchema = {
  type: "OBJECT",
  properties: {
    is_custom_order_conversation: { type: "BOOLEAN" },
    agreed: { type: "ARRAY", items: fieldSchema },
    open: { type: "ARRAY", items: fieldSchema },
    missing: { type: "ARRAY", items: fieldSchema },
    changes: { type: "ARRAY", items: { type: "OBJECT", properties: { field: { type: "STRING" }, from: { type: "STRING" }, to: { type: "STRING" }, evidence: { type: "ARRAY", items: { type: "STRING" } } }, required: ["field", "from", "to", "evidence"] } },
  },
  required: ["is_custom_order_conversation", "agreed", "open", "missing", "changes"],
};

const SYSTEM = `You are Pakka. You read a numbered custom-order chat between a customer and a seller and record what the chat supports. You never make business decisions.
Rules:
- AGREED only if the seller explicitly accepted the customer's request, or both sides clearly aligned. A customer request alone is NEVER agreed.
- OPEN if requested or proposed but not clearly accepted by the seller (prices, deadlines, revisions, design choices, conditions), or ambiguous.
- MISSING if an important custom-order detail was never discussed (consider: size/format, design details, price, deadline/delivery date, revisions, payment, delivery method). Missing items have evidence [] and value "Not discussed yet".
- Never infer or invent prices, deadlines, revision limits, policies, delivery or legal commitments.
- Every agreed and open field must cite message IDs (e.g. "M3") from the chat. Use the latest state of a detail; record earlier values under changes with the IDs that show the change.
- reason: one short, kind sentence. Values short (max 6 words).
- Set is_custom_order_conversation=false if the text is not a seller-customer custom-order chat.`;

function clean(field: unknown): LiveField | null {
  if (!field || typeof field !== "object") return null;
  const f = field as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 200) : "");
  const name = str(f["field"]);
  if (!name) return null;
  const evidence = Array.isArray(f["evidence"]) ? f["evidence"].filter((e): e is string => typeof e === "string") : [];
  return { field: name, value: str(f["value"]) || "Not discussed yet", reason: str(f["reason"]), evidence };
}

/** Conservative post-processing: invalid evidence downgrades Agreed → Open, Open without evidence → Missing. */
function validate(raw: Record<string, unknown>, messages: ParsedMessage[]): LiveResult {
  const byId = new Map(messages.map(m => [m.id, m]));
  const valid = (ids: string[]) => [...new Set(ids.map(id => id.trim().toUpperCase()))].filter(id => byId.has(id));
  const list = (key: string) => (Array.isArray(raw[key]) ? (raw[key] as unknown[]) : []).map(clean).filter((f): f is LiveField => f !== null);
  const result: LiveResult = { agreed: [], open: [], missing: [], changes: [] };
  const pushOpen = (f: LiveField) => (f.evidence.length ? result.open.push(f) : result.missing.push({ ...f, value: "Not discussed yet", evidence: [], reason: f.reason || "No supporting message found yet." }));
  for (const f of list("agreed")) {
    const evidence = valid(f.evidence);
    const sellerConfirmed = evidence.some(id => byId.get(id)?.from === "seller");
    if (evidence.length && sellerConfirmed) result.agreed.push({ ...f, evidence });
    else pushOpen({ ...f, evidence, reason: "Moved to Still open: no clear seller confirmation found in the chat." });
  }
  for (const f of list("open")) pushOpen({ ...f, evidence: valid(f.evidence) });
  for (const f of list("missing")) result.missing.push({ ...f, evidence: [] });
  const changes = Array.isArray(raw["changes"]) ? (raw["changes"] as Record<string, unknown>[]) : [];
  for (const c of changes) {
    if (!c || typeof c !== "object") continue;
    const evidence = valid(Array.isArray(c["evidence"]) ? (c["evidence"] as unknown[]).filter((e): e is string => typeof e === "string") : []);
    const s = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 120) : "");
    if (s(c["field"]) && evidence.length) result.changes.push({ field: s(c["field"]), from: s(c["from"]), to: s(c["to"]), evidence } satisfies LiveChange);
  }
  return result;
}

const QUOTA_MESSAGE = "Pakka has reached its temporary AI usage limit. Please try again later.";
const BUSY_MESSAGE = "Pakka’s AI service is temporarily busy. Please try again in a few minutes.";

const json = (body: CheckResponse, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const reject = () => json({ ok: false, kind: "rejected", message: REJECT_MESSAGE }, 400);

export const Route = createFileRoute("/api/check-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let text = "";
        let visitorId: unknown = null;
        try { const body = (await request.json()) as { text?: unknown; visitorId?: unknown }; text = typeof body.text === "string" ? body.text : ""; visitorId = body.visitorId; } catch { return reject(); }
        text = text.trim();
        if (!text || text.length > MAX_INPUT_CHARS || containsPersonalDetails(text)) return reject();
        const messages = parseConversation(text);
        if (messages.length < 2 || messages.length > MAX_MESSAGES || !messages.some(m => m.from === "customer") || !messages.some(m => m.from === "seller")) return reject();
        if (!isVisitorId(visitorId)) return json({ ok: false, kind: "error", message: ERROR_MESSAGE }, 400);

        // Server-side demo cap: only successful, stored analyses count. Fails closed if the count can't be read.
        try {
          const used = await countVisitorChecks(visitorId);
          if (used >= VISITOR_CAP) return json({ ok: false, kind: "capped", message: CAP_MESSAGE }, 429);
        } catch (e) {
          console.error("visitor cap check failed", e instanceof Error ? e.message : "unknown");
          return json({ ok: false, kind: "error", message: ERROR_MESSAGE }, 503);
        }

        const apiKey = process.env["GEMINI_API_KEY"]?.trim();
        if (!apiKey) { console.error("GEMINI_API_KEY missing or empty"); return diag(500, "GEMINI_API_KEY is not configured on the server", 0, ""); }
        const numbered = messages.map(m => `${m.id} ${m.from === "seller" ? "Seller" : "Customer"}: ${m.text}`).join("\n");
        try {
          const call = await callGemini(apiKey, numbered);
          if (!call.ok) {
            if (call.status === 429) {
              console.error("Gemini quota exceeded, model:", call.model, "details:", call.details);
              return json({ ok: false, kind: "error", message: QUOTA_MESSAGE }, 429);
            }
            if (call.status === 503) {
              // Both the primary model and the single fallback reported high demand.
              console.error("Gemini unavailable after primary and fallback, model:", call.model, "details:", call.details);
              return json({ ok: false, kind: "error", message: BUSY_MESSAGE }, 503);
            }
            console.error("Gemini request failed", call.model, call.status, call.details);
            return json({ ok: false, kind: "error", message: ERROR_MESSAGE }, 502);
          }
          const raw = call.json;
          if (raw["is_custom_order_conversation"] === false) return reject();
          const result = validate(raw, messages);
          try {
            await logInteraction({
              input_text: text, result_json: result,
              agreed_count: result.agreed.length, open_count: result.open.length, missing_count: result.missing.length, change_count: result.changes.length,
              had_open_or_missing: result.open.length + result.missing.length > 0,
              input_tokens: call.usage.inputTokens, output_tokens: call.usage.outputTokens, visitor_id: visitorId,
            });
          } catch (e) { console.error("logging failed", e); }
          return json({ ok: true, messages, result });
        } catch (error) {
          console.error("check-order failed", error);
          return json({ ok: false, kind: "error", message: ERROR_MESSAGE }, 500);
        }
      },
    },
  },
});
