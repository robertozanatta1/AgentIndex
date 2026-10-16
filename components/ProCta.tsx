import Link from "next/link";
export default function ProCta({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-between gap-4 rounded-3xl border border-violet-400/30 bg-violet-500/10 ${compact ? "p-6" : "p-10"} sm:flex-row`}>
      <div><h3 className={`${compact ? "text-lg" : "text-2xl"} font-semibold`}>AgentIndex Pro</h3>
        <p className="mt-1 text-zinc-300">Support the directory and get launch alerts and early access as they roll out. $29/mo.</p></div>
      <Link href="/pro" className="rounded-full bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200">Upgrade to Pro</Link>
    </div>
  );
}
