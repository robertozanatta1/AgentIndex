import Link from "next/link";
import type { Metadata } from "next";
import { getUseCases } from "@/lib/data";
import UseCaseBrowser from "@/components/UseCaseBrowser";
import SponsorSlot from "@/components/SponsorSlot";
import SubscribeForm from "@/components/SubscribeForm";
import ProCta from "@/components/ProCta";
import ProCheckoutButton from "@/components/ProCheckoutButton";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  const all = getUseCases();
  return (
    <main>
      <section className="glow">
        <div className="mx-auto max-w-6xl px-6 pt-6"><SponsorSlot /></div>
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-20 text-center">
          <p className="mb-4 text-sm font-medium text-violet-300">{all.length} playbooks · we'll grow this catalog over time</p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">AgentIndex</h1>
          <p className="mt-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-2xl font-medium text-transparent sm:text-3xl">Proven AI agent use cases you can copy today</p>
          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">Stop guessing what agents are good for. Every entry is a concrete workflow — the tools, the steps, the guardrails — written for founders and operators who want to put agents to work.</p>
          <div id="newsletter" className="relative mt-10 flex flex-col items-center gap-4"><SubscribeForm />
            <Link href="/sponsor" className="text-sm text-zinc-400 hover:text-white">Reach operators and founders who browse AgentIndex for agent workflows → <span className="text-violet-300 underline underline-offset-4">Sponsor us</span></Link>
            <ProCheckoutButton className="rounded-full border border-violet-400/50 px-5 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/10" />
          </div>
        </div>
      </section>
      <section id="usecases" className="mx-auto max-w-6xl px-6">
        <UseCaseBrowser all={all} />
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6"><ProCta /></section>
      <section className="mx-auto mt-6 max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 to-fuchsia-500/10 p-10 sm:flex-row">
          <div><h3 className="text-2xl font-semibold">Put your AI product in front of builders</h3><p className="mt-2 text-zinc-300">Homepage placement and newsletter features for teams shipping agents.</p></div>
          <Link href="/sponsor" className="rounded-full bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200">Sponsor us</Link>
        </div>
      </section>
    </main>
  );
}
