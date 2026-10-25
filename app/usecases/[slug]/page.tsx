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
  const title = u.seoTitle ? { absolute: u.seoTitle } : u.title;
  const description = u.seoDescription ?? u.description;
  return {
    title,
    description,
    alternates: { canonical: `/usecases/${u.slug}` },
    openGraph: { title: u.seoTitle ?? u.title, description, url: `/usecases/${u.slug}` },
  };
}

function SectionList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-zinc-300">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Page({ params }: { params: { slug: string } }) {
  const u = getUseCase(params.slug);
  if (!u) notFound();
  const pb = u.playbook;
  const steps = pb?.setupSteps?.length ? pb.setupSteps : u.steps;
  const related = (pb?.related ?? [])
    .map((slug) => getUseCase(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const faqJsonLd = pb?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pb.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;
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
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{u.h1 ?? u.title}</h1>
        {u.intro && <p className="mt-4 text-zinc-300">{u.intro}</p>}
        <p className="mt-4 text-lg text-zinc-300">{u.description}</p>
        {pb?.problem && (
          <>
            <h2 className="mt-10 text-xl font-semibold">Who it&apos;s for and the problem it solves</h2>
            <p className="mt-3 text-zinc-300">{pb.problem}</p>
          </>
        )}
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
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-zinc-300">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/20 text-xs text-violet-300">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        {pb && (
          <>
            <h2 className="mt-10 text-xl font-semibold">Example agent instructions</h2>
            <p className="mt-2 text-sm text-zinc-500">Copy, paste and adapt. Replace anything in {"{braces}"} with your own details.</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/40 p-4 text-sm leading-relaxed text-zinc-200">
              {pb.prompt}
            </pre>

            <h2 className="mt-10 text-xl font-semibold">Guardrails and human checkpoints</h2>
            <SectionList items={pb.guardrails} />

            <h2 className="mt-10 text-xl font-semibold">Example input and output</h2>
            <p className="mt-2 text-sm text-zinc-500">Illustrative example only, not real customer data.</p>
            <div className="mt-3 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Example input</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{pb.example.input}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Example output</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{pb.example.output}</p>
              </div>
            </div>

            <h2 className="mt-10 text-xl font-semibold">What to measure</h2>
            <SectionList items={pb.metrics} />

            <h2 className="mt-10 text-xl font-semibold">FAQ</h2>
            <div className="mt-3 space-y-5">
              {pb.faq.map((f) => (
                <div key={f.q}>
                  <h3 className="font-medium text-zinc-100">{f.q}</h3>
                  <p className="mt-1 text-zinc-300">{f.a}</p>
                </div>
              ))}
            </div>

            {related.length > 0 && (
              <>
                <h2 className="mt-10 text-xl font-semibold">Related use cases</h2>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/usecases/${r.slug}`}
                        className="block h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-violet-400/50"
                      >
                        <span className="text-xs text-violet-300">{r.category}</span>
                        <span className="mt-1 block font-medium">{r.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
          />
        )}
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
