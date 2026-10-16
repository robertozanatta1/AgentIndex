import { NextResponse } from "next/server";
import { verifyStripeSignature } from "@/lib/stripe";
export const dynamic = "force-dynamic";
// Stripe webhook: on checkout.session.completed, mark the listing sponsored.
// TODO(persistence): listings live in static data/usecases.json and Vercel's FS is read-only.
// For now this logs + emails the owner (if Resend is configured) so they can set
// `sponsored: true` / `sponsorRank` in data/usecases.json (see /admin/sponsors) and redeploy.
// Upgrade path: move sponsorship state to Vercel KV / Edge Config / Postgres and write it here.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  const body = await req.text();
  if (!verifyStripeSignature(body, req.headers.get("stripe-signature"), secret)) return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  const event = JSON.parse(body);
  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const info = { session: s.id, email: s.customer_details?.email, slug: s.metadata?.slug, url: s.metadata?.url, amount: s.amount_total };
    console.log("[stripe] sponsorship paid", info);
    const to = process.env.CONTACT_EMAIL; const from = process.env.NEWSLETTER_FROM;
    if (process.env.RESEND_API_KEY && to && from) {
      await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject: s.metadata?.product === "pro" ? "New AgentIndex Pro subscriber" : "New AgentIndex sponsorship", text: `Mark as sponsored in data/usecases.json:\n${JSON.stringify(info, null, 2)}` }),
      }).catch((e) => console.error("[stripe] notify failed", e));
    }
  }
  return NextResponse.json({ received: true });
}
