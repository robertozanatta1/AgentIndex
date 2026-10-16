"use client";
import { useState } from "react";
// Starts Stripe Checkout for AgentIndex Pro. If checkout is unavailable, falls back to the /pro page.
export default function ProCheckoutButton({ fallbackHref = "/pro", className, label = "Upgrade to Pro · $29/mo" }: { fallbackHref?: string; className?: string; label?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "off">("idle");
  const cls = className ?? "mt-8 w-full rounded-xl bg-white py-3 font-medium text-black hover:bg-zinc-200 disabled:opacity-60";
  async function go() {
    setState("loading");
    const r = await fetch("/api/checkout/pro", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (j.url) window.location.href = j.url; else setState("off");
  }
  if (state === "off") return <a href={fallbackHref} className={cls}>Checkout unavailable — learn more</a>;
  return <button type="button" onClick={go} disabled={state === "loading"} className={cls}>{state === "loading" ? "Redirecting…" : label}</button>;
}
