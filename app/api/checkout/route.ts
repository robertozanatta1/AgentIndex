import { NextResponse } from "next/server";
import { siteUrl, stripePost } from "@/lib/stripe";
// Creates a Stripe Checkout session for a Sponsored listing ($99/mo default, set by STRIPE_SPONSOR_PRICE_ID).
export async function POST(req: Request) {
  const price = process.env.STRIPE_SPONSOR_PRICE_ID;
  if (!process.env.STRIPE_SECRET_KEY || !price) return NextResponse.json({ error: "Payments not configured yet" }, { status: 503 });
  const { slug = "", url = "", email = "" } = await req.json().catch(() => ({}));
  const mode = process.env.STRIPE_SPONSOR_MODE === "payment" ? "payment" : "subscription";
  const params: Record<string, string> = {
    mode,
    "line_items[0][price]": price,
    "line_items[0][quantity]": "1",
    success_url: `${siteUrl()}/sponsor/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/sponsor/cancel`,
    "metadata[product]": "sponsored_listing",
    "metadata[slug]": String(slug).slice(0, 200),
    "metadata[url]": String(url).slice(0, 400),
  };
  if (typeof email === "string" && email.includes("@")) params.customer_email = email;
  try {
    const s = await stripePost("checkout/sessions", params);
    return NextResponse.json({ url: s.url });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
