/** Server-only REST access to the pakka_interactions table. */
function config() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_KEY"];
  if (!url || !key) throw new Error("Supabase is not configured");
  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  if (key.split(".").length === 3) headers["Authorization"] = `Bearer ${key}`;
  return { base: `${url.replace(/\/$/, "")}/rest/v1/pakka_interactions`, headers };
}

export async function logInteraction(row: Record<string, unknown>) {
  const { base, headers } = config();
  const res = await fetch(base, { method: "POST", headers: { ...headers, Prefer: "return=minimal" }, body: JSON.stringify(row) });
  if (!res.ok) console.error("pakka_interactions insert failed", res.status, await res.text());
}

async function count(filter: string) {
  const { base, headers } = config();
  const res = await fetch(`${base}?select=agreed_count${filter}`, { headers: { ...headers, Prefer: "count=exact", Range: "0-0" } });
  if (!res.ok && res.status !== 416) throw new Error(`stats ${res.status}`);
  const total = res.headers.get("content-range")?.split("/")[1];
  return total && total !== "*" ? Number(total) : 0;
}

/** Successful stored analyses for one anonymous visitor (only successful checks are ever inserted). */
export async function countVisitorChecks(visitorId: string) {
  return count(`&visitor_id=eq.${encodeURIComponent(visitorId)}`);
}

export async function getStats() {
  const [total, flagged] = await Promise.all([count(""), count("&had_open_or_missing=eq.true")]);
  return { ordersChecked: total, openOrMissingPct: total ? Math.round((flagged / total) * 100) : 0 };
}
