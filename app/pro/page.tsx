import type { Metadata } from "next";
import { contactEmail } from "@/lib/data";
import ProCheckoutButton from "@/components/ProCheckoutButton";
import SubscribeForm from "@/components/SubscribeForm";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "AgentIndex Pro", description: "AgentIndex Pro: $29/month. Launch alerts and early access to new AI agent use cases, rolling out to Pro members.", alternates: { canonical: "/pro" } };
const features: { name: string; status: "Available" | "Coming soon"; text: string }[] = [
  { name: "Advanced search", status: "Coming soon", text: "Filter by tool, category and tag combinations, with saved searches. Today everyone gets the standard search and filters." },
  { name: "Launch alerts for new agents", status: "Available", text: "A weekly email listing the agent use cases added that week. Waitlist members get it too." },
  { name: "Early access to new use cases", status: "Coming soon", text: "See new playbooks before they're published to everyone." },
];
export default function Pro() {
  const checkout = process.env.PRO_CHECKOUT_ENABLED === "true";
  return (
    <main className="glow"><div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AgentIndex Pro</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">The free directory stays free. Pro is for people who want more from AgentIndex and want to help fund it. We're building the Pro features now. Weekly launch alerts are live; the rest ship over time.</p></div>
      <div className="mt-12 rounded-3xl border border-violet-400/40 bg-violet-500/10 p-8">
        <p><span className="text-4xl font-bold">$29</span><span className="text-zinc-400">/month{checkout ? "" : " when it launches"}</span></p>
        <ul className="mt-6 space-y-4">{features.map((f) => (
          <li key={f.name}><div className="flex items-center gap-2 font-medium">{f.name}<span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-zinc-300">{f.status}</span></div>
            <p className="text-sm text-zinc-400">{f.text}</p></li>))}</ul>
        {checkout ? <><p className="mt-6 text-sm text-zinc-500">Cancel anytime. Billed monthly through Stripe.</p>
        <ProCheckoutButton fallbackHref={`mailto:${contactEmail}?subject=${encodeURIComponent("AgentIndex Pro")}`} /></>
        : <div className="mt-8"><p className="mb-3 text-sm text-zinc-300">Pro is free while we build it. Join the waitlist and you'll get launch alerts now. We'll email you before any paid plan starts, and nothing is charged.</p><SubscribeForm list="pro-waitlist" cta="Join the Pro waitlist" /></div>}
      </div>
    </div></main>
  );
}
