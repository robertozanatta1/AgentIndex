import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getUseCase, getUseCases } from "@/lib/data";
import SubscribeForm from "@/components/SubscribeForm";
import ProCta from "@/components/ProCta";

export function generateStaticParams() {
  return getUseCases().map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const u = getUseCase(params.slug);
  if (!u) return {};
  return { title: u.title, description: u.description, alternates: { canonical: `/usecases/${u.slug}` } };
}

export default function Page({ params }: { params: { slug: string } }) {
  const u = getUseCase(params.slug);
  if (!u) notFound();
  return (
    <main className="glow">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/#usecases" className="text-sm text-zinc-500 hover:text-white">
          ← All use cases
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-xs text-violet-300">{u.category}</span>
          {u.sponsored && (
            <span className="w-fit rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-amber-200">
              Sponsored
            </span>
          )}
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{u.title}</h1>
        <p className="mt-4 text-lg text-zinc-300">{u.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {u.tags.map((t) => (
            <span key={t} className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-400">
              {t}
            </span>
          ))}
        </div>
        <h2 className="mt-12 text-xl font-semibold">Tools</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {u.tools.map((t) => (
            <li key={t} className="rounded-lg bg-white/5 px-3 py-1.5 text-sm">
              {t}
            </li>
          ))}
        </ul>
        <h2 className="mt-10 text-xl font-semibold">How to set it up</h2>
        <ol className="mt-3 space-y-3">
          {u.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-zinc-300">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/20 text-xs text-violet-300">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        {u.link && (
          <a href={u.link} target="_blank" rel="noopener" className="mt-8 inline-block text-violet-300 underline">
            Learn more →
          </a>
        )}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 font-medium">Get new agent playbooks by email</p>
          <SubscribeForm />
        </div>
      </article>
      <div className="mx-auto mt-12 max-w-3xl px-6 pb-16"><ProCta compact /></div>
    </main>
  );
}
