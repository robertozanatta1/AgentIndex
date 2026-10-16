import Link from "next/link";
import ProCheckoutButton from "@/components/ProCheckoutButton";
export default function ProCta({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-between gap-4 rounded-3xl border border-violet-400/30 bg-violet-500/10 ${compact ? "p-6" : "p-10"} sm:flex-row`}>
      <div><h3 className={`${compact ? "text-lg" : "text-2xl"} font-semibold`}>AgentIndex Pro</h3>
        <p className="mt-1 text-zinc-300">Weekly launch alerts for new agent use cases. Advanced search and early access are coming soon. <Link href="/pro" className="underline">What's included</Link></p></div>
      <ProCheckoutButton className="rounded-full bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200 disabled:opacity-60" />
    </div>
  );
}
