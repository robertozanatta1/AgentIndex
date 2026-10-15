"use client";
import { useState } from "react";
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setState("loading");
    const r = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setState(r.ok ? "ok" : "err"); if (r.ok) setEmail("");
  }
  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-zinc-500 focus:border-accent" />
      <button disabled={state === "loading"} className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
        {state === "loading" ? "Joining…" : "Get weekly use cases"}
      </button>
      {state === "ok" && <p className="text-sm text-emerald-400 sm:absolute sm:mt-14">You're in. 🎉</p>}
      {state === "err" && <p className="text-sm text-red-400 sm:absolute sm:mt-14">Something went wrong — try again.</p>}
    </form>
  );
}
