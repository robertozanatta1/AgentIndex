"use client";
import { useState } from "react";
export default function ProCheckoutButton({ fallbackHref }: { fallbackHref: string }) {
  const [state, setState] = useState<"idle" | "loading" | "off">("idle");
  async function go() {
    setState("loading");
    const r = await fetch("/api/checkout/pro", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    const j = await r.json().catch(() => ({}));
    if (j.url) window.location.href = j.url; else setState("off");
  }
  if (state === "off") return <a href={fallbackHref} className="mt-8 block rounded-xl border border-white/20 py-3 text-center font-medium hover:bg-white/5">Checkout not configured yet — email us to join the waitlist</a>;
  return <button onClick={go} disabled={state === "loading"} className="mt-8 w-full rounded-xl bg-white py-3 font-medium text-black hover:bg-zinc-200 disabled:opacity-60">{state === "loading" ? "Redirecting…" : "Upgrade to Pro — $29/mo"}</button>;
}
