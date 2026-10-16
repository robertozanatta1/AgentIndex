import Link from "next/link";
import type { UseCase } from "@/lib/data";

export default function UseCaseCard({ u }: { u: UseCase }) {
  return (
    <Link
      href={`/usecases/${u.slug}`}
      className={`group flex flex-col rounded-2xl border bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white/[0.05] ${
        u.sponsored ? "border-amber-400/40 bg-amber-400/[0.04]" : "border-white/10"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-violet-300">{u.category}</span>
        {u.sponsored && (
          <span
            className="w-fit rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-amber-200"
            title="This listing is marked as sponsored"
          >
            Sponsored
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold leading-snug group-hover:text-white">{u.title}</h3>
      <p className="mt-2 flex-1 text-sm text-zinc-400">{u.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {u.tags.map((t) => (
          <span key={t} className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-400">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}
