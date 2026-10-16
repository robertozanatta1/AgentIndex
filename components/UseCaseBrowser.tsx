"use client";
import { useMemo, useState } from "react";
import type { UseCase } from "@/lib/data";
import UseCaseCard from "@/components/UseCaseCard";

function matchesQuery(u: UseCase, terms: string[], cat: string | null) {
  if (cat && u.category !== cat) return false;
  if (!terms.length) return true;
  const hay = [u.title, u.description, u.category, ...u.tags, ...u.tools].join(" ").toLowerCase();
  return terms.every((t) => hay.includes(t));
}

/** Sponsored matches first (by sponsorRank, then title), then organic in catalog order. */
function rankResults(filtered: UseCase[]): UseCase[] {
  const sponsored = filtered
    .filter((u) => u.sponsored)
    .sort(
      (a, b) =>
        (a.sponsorRank ?? 999) - (b.sponsorRank ?? 999) ||
        a.title.localeCompare(b.title)
    );
  const organic = filtered.filter((u) => !u.sponsored);
  return [...sponsored, ...organic];
}

export default function UseCaseBrowser({ all }: { all: UseCase[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const cats = useMemo(() => Array.from(new Set(all.map((u) => u.category))), [all]);
  const results = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const filtered = all.filter((u) => matchesQuery(u, terms, cat));
    return rankResults(filtered);
  }, [all, q, cat]);
  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-xs transition ${active ? "border-accent/60 bg-accent/15 text-violet-200" : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"}`;
  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Browse use cases</h2>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, tag, or tool…"
            aria-label="Search use cases"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-accent/60 focus:outline-none sm:w-80"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button type="button" onClick={() => setCat(null)} aria-pressed={cat === null} className={chip(cat === null)}>All</button>
          {cats.map((c) => (
            <button key={c} type="button" onClick={() => setCat(cat === c ? null : c)} aria-pressed={cat === c} className={chip(cat === c)}>{c}</button>
          ))}
        </div>
        <p className="text-xs text-zinc-500" aria-live="polite">{results.length} of {all.length} use cases</p>
      </div>
      {results.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((u) => <UseCaseCard key={u.slug} u={u} />)}</div>
      ) : (
        <div className="rounded-2xl border border-white/10 p-10 text-center text-zinc-400">
          No use cases match. <button type="button" onClick={() => { setQ(""); setCat(null); }} className="text-violet-300 underline underline-offset-4">Clear filters</button>
        </div>
      )}
    </>
  );
}
