import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
// Newsletter + Pro waitlist signup (body: { email, list?: "pro-waitlist" }).
// Pro waitlist uses RESEND_PRO_AUDIENCE_ID (falls back to RESEND_AUDIENCE_ID).
// - RESEND_API_KEY + RESEND_AUDIENCE_ID: adds contact to a Resend Audience.
// - RESEND_API_KEY + NEWSLETTER_FROM: sends a welcome email.
// - Fallback: appends to data/subscribers.json (local/dev only — Vercel FS is read-only).
const resend = (p: string, body: unknown) =>
  fetch(`https://api.resend.com${p}`, { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
export async function POST(req: Request) {
  const { email, list } = await req.json().catch(() => ({}));
  const pro = list === "pro-waitlist";
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  const key = process.env.RESEND_API_KEY, audience = pro ? (process.env.RESEND_PRO_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID) : process.env.RESEND_AUDIENCE_ID, from = process.env.NEWSLETTER_FROM;
  let stored = false;
  if (key) {
    try {
      if (audience) { const r = await resend(`/audiences/${audience}/contacts`, { email, unsubscribed: false }); stored = r.ok; if (!r.ok) console.warn("[subscribe] audience", await r.text()); }
      if (from) await resend("/emails", { from, to: email, subject: pro ? "You're on the AgentIndex Pro waitlist" : "You're on the AgentIndex list",
        text: `Thanks for subscribing to AgentIndex.\n\nWe'll email you when new AI agent use cases are added: ${process.env.NEXT_PUBLIC_SITE_URL || "https://getagentindex.com"}\n\nReply to this email to unsubscribe.` });
    } catch (e) { console.warn("[subscribe] resend failed", e); }
  }
  if (!stored) {
    console.log("[subscribe]", pro ? "pro-waitlist" : "newsletter", email);
    try {
      const file = path.join(process.cwd(), "data", "subscribers.json");
      const list: { email: string; at: string }[] = JSON.parse(await fs.readFile(file, "utf8").catch(() => "[]"));
      if (!list.some((s) => s.email === email)) list.push({ email, at: new Date().toISOString(), ...(pro ? { list: "pro-waitlist" } : {}) });
      await fs.writeFile(file, JSON.stringify(list, null, 2));
    } catch (e) { console.warn("[subscribe] could not persist", e); }
  }
  return NextResponse.json({ ok: true });
}
