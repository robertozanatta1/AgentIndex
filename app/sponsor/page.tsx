import type { Metadata } from "next";
import { contactEmail } from "@/lib/data";
export const metadata: Metadata = { title: "Sponsor", description: "Reach founders and operators building with AI agents. Homepage and newsletter sponsorships." };
const tiers = [
  { name: "Homepage feature", price: "$500", period: "/month", link: process.env.NEXT_PUBLIC_STRIPE_LINK_HOMEPAGE, perks: ["Logo + tagline in the featured slot on every page view", "Dofollow link to your product", "Rotates in within 24 hours", "Cancel anytime"] },
  { name: "Newsletter feature", price: "$600", period: "/issue", link: process.env.NEXT_PUBLIC_STRIPE_LINK_NEWSLETTER, perks: ["Top-of-issue sponsor block", "~100 words + CTA in our voice", "Sent to every subscriber", "Performance recap after send"], highlight: true },
];
export default function Sponsor() {
  return (
    <main className="glow"><div className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sponsor AgentIndex</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Get your AI product in front of founders and operators actively looking for agent workflows to copy.</p></div>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {tiers.map((t) => (
          <div key={t.name} className={`flex flex-col rounded-3xl border p-8 ${t.highlight ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/[0.03]"}`}>
            <h2 className="text-lg font-semibold">{t.name}</h2>
            <p className="mt-4"><span className="text-4xl font-bold">{t.price}</span><span className="text-zinc-400">{t.period}</span></p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-zinc-300">{t.perks.map((p) => <li key={p}>✓ {p}</li>)}</ul>
            {t.link
              ? <a href={t.link} className="mt-8 rounded-xl bg-white py-3 text-center font-medium text-black hover:bg-zinc-200">Book now</a>
              : <a href={`mailto:${contactEmail}?subject=${encodeURIComponent("Sponsorship: " + t.name)}`} className="mt-8 rounded-xl border border-white/20 py-3 text-center font-medium hover:bg-white/5">Coming soon — email us</a>}
          </div>
        ))}
      </div>
    </div></main>
  );
}
