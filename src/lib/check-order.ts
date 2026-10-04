/** Client-safe helpers and types for the live "Check Your Order" mode. */
export const MAX_INPUT_CHARS = 4000;
export const MAX_MESSAGES = 60;

export type ParsedMessage = { id: string; n: number; from: "customer" | "seller"; text: string };
export type LiveField = { field: string; value: string; reason: string; evidence: string[] };
export type LiveChange = { field: string; from: string; to: string; evidence: string[] };
export type LiveResult = { agreed: LiveField[]; open: LiveField[]; missing: LiveField[]; changes: LiveChange[] };
export type CheckResponse =
  | { ok: true; messages: ParsedMessage[]; result: LiveResult }
  | { ok: false; kind: "rejected" | "error"; message: string };

export const REJECT_MESSAGE = "Pakka only analyses anonymised custom-order conversations. Please remove personal details and try again.";
export const ERROR_MESSAGE = "We couldn’t check this order right now. Please try again.";

const LINE = /^\s*(customer|buyer|client|seller|maker|me|artist)\s*[:\-]\s*(.*)$/i;

/** Splits "Customer: ... / Seller: ..." text into numbered messages M1, M2, ... */
export function parseConversation(input: string): ParsedMessage[] {
  const out: ParsedMessage[] = [];
  for (const raw of input.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const match = LINE.exec(line);
    if (match) {
      const role = match[1]!.toLowerCase();
      const from = role === "customer" || role === "buyer" || role === "client" ? "customer" : "seller";
      const n = out.length + 1;
      out.push({ id: `M${n}`, n, from, text: (match[2] ?? "").trim() });
    } else if (out.length) {
      const last = out[out.length - 1]!;
      last.text = `${last.text} ${line}`.trim();
    }
  }
  return out.filter(m => m.text.length > 0).map((m, i) => ({ ...m, id: `M${i + 1}`, n: i + 1 }));
}

export function containsPersonalDetails(input: string): boolean {
  const email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const phone = /(\+?\d[\d\s().-]{8,}\d)/;
  return email.test(input) || phone.test(input);
}
