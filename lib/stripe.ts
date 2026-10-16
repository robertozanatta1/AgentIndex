import crypto from "crypto";
// Minimal Stripe REST helpers (no SDK dependency). Requires STRIPE_SECRET_KEY.
export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://getagentindex.com").replace(/\/$/, "");
export async function stripePost(path: string, params: Record<string, string>) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  const r = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params).toString(),
  });
  const json = await r.json();
  if (!r.ok) throw new Error(json?.error?.message || "Stripe error");
  return json;
}
/** Verify a Stripe-Signature header (v1 scheme, 5 min tolerance). */
export function verifyStripeSignature(payload: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = parts.t; const sigs = header.split(",").filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  return sigs.some((s) => s.length === expected.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected)));
}
