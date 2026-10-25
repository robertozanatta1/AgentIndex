import type { Metadata } from "next";
import { contactEmail } from "@/lib/data";
import Link from "next/link";
import SponsorCheckoutButton from "@/components/SponsorCheckoutButton";
export const metadata: Metadata = { title: "Sponsor", description: "Reach founders and operators building with AI agents. Homepage and newsletter sponsorships.", alternates: { canonical: "/sponsor" } };
const tiers: { name: string; price: string; period: string; link?: string; perks: string[]; highlight?: boolean; checkout?: boolean }[] = [
  { name: "Sponsored listing", price: "$99", period: "/month", checkout: true, perks: ["Your use case pinned above organic results", "\"Sponsored\" badge (clearly labeled)", "Live within 24 hours of payment", "Cancel anytime"] },
  { name: "Homepage feature", price: "$500", period: "/month", link: process.env.NEXT_PUBLIC_STRIPE_LINK_HOMEPAGE, perks: ["Logo + tagline in the featured slot on every page view", "Dofollow link to your product", "Rotates in within 24 hours", "Cancel anytime"] },
  { name: "Newsletter feature", price: "$600", period: "/issue", link: process.env.NEXT_PUBLIC_STRIPE_LINK_NEWSLETTER, perks: ["Top-of-issue sponsor block", "~100 words + CTA in our voice", "Sent to every subscriber", "Performance recap after send"], highlight: true },
];
export default function Sponsor() {
  return (
    <main className="glow"><div className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center"><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sponsor AgentIndex</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Reach operators and founders who browse AgentIndex for agent workflows. We're early — sponsors who join now get launch pricing and a direct line to us.</p></div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className={`flex flex-col rounded-3xl border p-8 ${t.highlight ? "border-accent/60 bg-accent/10" : "border-white/10 bg-white/[0.03]"}`}>
            <h2 className="text-lg font-semibold">{t.name}</h2>
            <p className="mt-4"><span className="text-4xl font-bold">{t.price}</span><span className="text-zinc-400">{t.period}</span></p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-zinc-300">{t.perks.map((p) => <li key={p}>✓ {p}</li>)}</ul>
            {t.checkout
              ? <SponsorCheckoutButton fallbackHref={`mailto:${contactEmail}?subject=${encodeURIComponent("Sponsorship: " + t.name)}`} />
              : t.link
              ? <a href={t.link} className="mt-8 rounded-xl bg-white py-3 text-center font-medium text-black hover:bg-zinc-200">Book now</a>
              : <a href={`mailto:${contactEmail}?subject=${encodeURIComponent("Sponsorship: " + t.name)}`} className="mt-8 rounded-xl border border-white/20 py-3 text-center font-medium hover:bg-white/5">Coming soon — email us</a>}
          </div>
        ))}
      </div>
      <section id="disclosure" className="mx-auto mt-16 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-sm text-zinc-300">
        <h2 className="text-lg font-semibold text-white">Sponsorship disclosure</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Paid placements are always labeled "Sponsored". Sponsored listings are shown above other results, but only when they match what the visitor searched or filtered for.</li>
          <li>Sponsorship buys visibility, not an endorsement. We don't change our descriptions of other products because of a sponsorship, and sponsors don't get to edit other listings.</li>
          <li>We may decline sponsors that are misleading, illegal, unsafe or off-topic.</li>
          <li>Billing is monthly and you can cancel anytime. Your placement runs until the end of the paid period. There are no partial refunds, except where the law requires one. Full details are in our <Link href="/terms" className="text-violet-300 underline">Terms</Link> and <Link href="/privacy" className="text-violet-300 underline">Privacy Policy</Link>.</li>
        </ul>
      </section>
    </div></main>
  );
}
