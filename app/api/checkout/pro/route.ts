import { NextResponse } from "next/server";
import { siteUrl, stripePost } from "@/lib/stripe";
// Creates a Stripe Checkout session for AgentIndex Pro ($29/mo, price set by STRIPE_PRO_PRICE_ID).
export async function POST(req: Request) {
  const price = process.env.STRIPE_PRO_PRICE_ID;
  if (!process.env.STRIPE_SECRET_KEY || !price) return NextResponse.json({ error: "Payments not configured yet" }, { status: 503 });
  const { email = "" } = await req.json().catch(() => ({}));
  const params: Record<string, string> = {
    mode: "subscription",
    "line_items[0][price]": price,
    "line_items[0][quantity]": "1",
    success_url: `${siteUrl()}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/pro`,
    "metadata[product]": "pro",
  };
  if (typeof email === "string" && email.includes("@")) params.customer_email = email;
  try {
    const s = await stripePost("checkout/sessions", params);
    return NextResponse.json({ url: s.url });
  } catch (e) {
    console.error("[checkout/pro]", e);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
