"use client";
import { useState } from "react";
export default function SponsorCheckoutButton({ fallbackHref }: { fallbackHref: string }) {
  const [state, setState] = useState<"idle" | "loading" | "off">("idle");
  async function go() {
    setState("loading");
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    const j = await r.json().catch(() => ({}));
    if (j.url) window.location.href = j.url; else setState("off");
  }
  if (state === "off") return <a href={fallbackHref} className="mt-8 rounded-xl border border-white/20 py-3 text-center font-medium hover:bg-white/5">Checkout unavailable — email us</a>;
  return <button onClick={go} disabled={state === "loading"} className="mt-8 rounded-xl bg-white py-3 font-medium text-black hover:bg-zinc-200 disabled:opacity-60">{state === "loading" ? "Redirecting…" : "Sponsor a listing"}</button>;
}
