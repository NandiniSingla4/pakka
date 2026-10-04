import { createFileRoute } from "@tanstack/react-router";
import {
  ERROR_MESSAGE, MAX_INPUT_CHARS, MAX_MESSAGES, REJECT_MESSAGE, containsPersonalDetails, parseConversation,
  type CheckResponse, type LiveChange, type LiveField, type LiveResult, type ParsedMessage,
} from "@/lib/check-order";
import { logInteraction } from "@/lib/pakka-supabase.server";

const MODEL = "gemini-2.5-flash";

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

const json = (body: CheckResponse, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const reject = () => json({ ok: false, kind: "rejected", message: REJECT_MESSAGE }, 400);

export const Route = createFileRoute("/api/check-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let text = "";
        try { const body = (await request.json()) as { text?: unknown }; text = typeof body.text === "string" ? body.text : ""; } catch { return reject(); }
        text = text.trim();
        if (!text || text.length > MAX_INPUT_CHARS || containsPersonalDetails(text)) return reject();
        const messages = parseConversation(text);
        if (messages.length < 2 || messages.length > MAX_MESSAGES || !messages.some(m => m.from === "customer") || !messages.some(m => m.from === "seller")) return reject();

        const apiKey = process.env["GEMINI_API_KEY"];
        if (!apiKey) { console.error("GEMINI_API_KEY missing"); return json({ ok: false, kind: "error", message: ERROR_MESSAGE }, 500); }
        const numbered = messages.map(m => `${m.id} ${m.from === "seller" ? "Seller" : "Customer"}: ${m.text}`).join("\n");
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: SYSTEM }] },
              contents: [{ role: "user", parts: [{ text: numbered }] }],
              generationConfig: { responseMimeType: "application/json", responseSchema, temperature: 0, maxOutputTokens: 2048, thinkingConfig: { thinkingBudget: 0 } },
            }),
          });
          if (!res.ok) { console.error("Gemini error", res.status, (await res.text()).slice(0, 500)); return json({ ok: false, kind: "error", message: ERROR_MESSAGE }, 502); }
          const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
          const out = data.candidates?.[0]?.content?.parts?.map(p => p.text ?? "").join("") ?? "";
          const raw = JSON.parse(out) as Record<string, unknown>;
          if (raw["is_custom_order_conversation"] === false) return reject();
          const result = validate(raw, messages);
          try {
            await logInteraction({
              input_text: text, result_json: result,
              agreed_count: result.agreed.length, open_count: result.open.length, missing_count: result.missing.length, change_count: result.changes.length,
              had_open_or_missing: result.open.length + result.missing.length > 0,
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
