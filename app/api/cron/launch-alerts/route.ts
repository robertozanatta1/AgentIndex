import { NextResponse } from "next/server";
import { getUseCases } from "@/lib/data";
export const dynamic = "force-dynamic";
// Weekly launch alerts: emails use cases with addedAt in the last 7 days to the Pro waitlist audience.
// Runs from Vercel Cron (vercel.json). Needs CRON_SECRET (Vercel sends it as a Bearer token).
// Sends only when RESEND_API_KEY, NEWSLETTER_FROM and RESEND_PRO_AUDIENCE_ID (or RESEND_AUDIENCE_ID) are set;
// otherwise it returns a dry run with what would have been sent.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://getagentindex.com";
  const since = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const fresh = getUseCases().filter((u) => u.addedAt && u.addedAt >= since);
  if (!fresh.length) return NextResponse.json({ sent: false, reason: "No new use cases this week" });
  const subject = `${fresh.length} new AI agent use case${fresh.length > 1 ? "s" : ""} on AgentIndex`;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
  const html = `<h2>New this week on AgentIndex</h2><ul>${fresh.map((u) => `<li><a href="${site}/usecases/${u.slug}">${esc(u.title)}</a> (${esc(u.category)}): ${esc(u.description)}</li>`).join("")}</ul><p><a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a></p>`;
  const key = process.env.RESEND_API_KEY, from = process.env.NEWSLETTER_FROM, audience = process.env.RESEND_PRO_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID;
  if (!key || !from || !audience) return NextResponse.json({ sent: false, reason: "Resend not configured (dry run)", subject, items: fresh.map((u) => u.slug) });
  const h = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const b = await fetch("https://api.resend.com/broadcasts", { method: "POST", headers: h, body: JSON.stringify({ audience_id: audience, from, subject, html, name: `Launch alerts ${since}` }) });
  if (!b.ok) return NextResponse.json({ sent: false, error: await b.text() }, { status: 502 });
  const { id } = await b.json();
  const s = await fetch(`https://api.resend.com/broadcasts/${id}/send`, { method: "POST", headers: h, body: "{}" });
  return NextResponse.json({ sent: s.ok, broadcast: id, count: fresh.length }, { status: s.ok ? 200 : 502 });
}
