import Link from "next/link";
import { getSponsor } from "@/lib/data";
export default function SponsorSlot() {
  const s = getSponsor();
  if (!s.name) return (
    <Link href="/sponsor" className="block rounded-2xl border border-dashed border-white/15 px-6 py-4 text-center text-sm text-zinc-400 hover:border-accent hover:text-white">
      <span className="mr-2 text-xs uppercase tracking-widest text-zinc-500">Featured sponsor</span> Your brand here — <span className="text-violet-300">Sponsor us →</span>
    </Link>
  );
  return (
    <a href={s.url} target="_blank" rel="noopener sponsored" className="flex items-center gap-4 rounded-2xl border border-accent/40 bg-accent/10 px-6 py-4 hover:bg-accent/15">
      {s.logo && <img src={s.logo} alt={s.name} className="h-8 w-8 rounded" />}
      <span className="text-xs uppercase tracking-widest text-zinc-400">Sponsor</span>
      <span className="font-semibold">{s.name}</span><span className="text-sm text-zinc-300">{s.tagline}</span>
    </a>
  );
}
