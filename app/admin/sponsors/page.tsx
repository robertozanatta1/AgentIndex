import type { Metadata } from "next";
import Link from "next/link";
import { getUseCases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sponsored listings (admin)",
  robots: { index: false, follow: false },
};

export default function AdminSponsorsPage() {
  const all = getUseCases();
  const sponsored = all
    .filter((u) => u.sponsored)
    .sort((a, b) => (a.sponsorRank ?? 999) - (b.sponsorRank ?? 999) || a.title.localeCompare(b.title));
  const organic = all.filter((u) => !u.sponsored);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-amber-200/80">Temporary · no auth · V1</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Sponsored listings</h1>
      <p className="mt-3 text-zinc-400">
        This page is a read-only checklist for local/ops use. It has no login and must not be treated as a public admin console.
        Payments are not wired yet — mark sponsors by editing the data file.
      </p>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">How to mark a listing as sponsored</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-300">
          <li>
            Open <code className="rounded bg-white/10 px-1.5 py-0.5 text-violet-200">data/usecases.json</code>
          </li>
          <li>
            On the use-case object, set <code className="rounded bg-white/10 px-1.5 py-0.5 text-violet-200">&quot;sponsored&quot;: true</code>
          </li>
          <li>
            Optionally set <code className="rounded bg-white/10 px-1.5 py-0.5 text-violet-200">&quot;sponsorRank&quot;: 1</code> (lower = higher among sponsored)
          </li>
          <li>Commit, push, and redeploy (or refresh locally)</li>
        </ol>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-300">{`{
  "slug": "example-slug",
  "title": "Example",
  "sponsored": true,
  "sponsorRank": 1,
  ...
}`}</pre>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Currently sponsored ({sponsored.length})</h2>
        {sponsored.length ? (
          <ul className="mt-4 space-y-2">
            {sponsored.map((u) => (
              <li key={u.slug} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] px-4 py-3 text-sm">
                <div>
                  <span className="mr-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200">
                    Sponsored · rank {u.sponsorRank ?? "—"}
                  </span>
                  <Link href={`/usecases/${u.slug}`} className="font-medium text-white hover:underline">
                    {u.title}
                  </Link>
                  <span className="ml-2 text-zinc-500">{u.category}</span>
                </div>
                <code className="text-xs text-zinc-500">{u.slug}</code>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">None marked yet.</p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Organic listings ({organic.length})</h2>
        <ul className="mt-4 max-h-96 space-y-1 overflow-y-auto text-sm text-zinc-400">
          {organic.map((u) => (
            <li key={u.slug} className="flex justify-between gap-4 border-b border-white/5 py-2">
              <Link href={`/usecases/${u.slug}`} className="hover:text-white">
                {u.title}
              </Link>
              <span className="shrink-0 text-zinc-600">{u.category}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-sm text-zinc-500">
        <Link href="/" className="text-violet-300 hover:underline">
          ← Back to homepage
        </Link>
        {" · "}
        <Link href="/sponsor" className="text-violet-300 hover:underline">
          Public sponsor page
        </Link>
      </p>
    </main>
  );
}
