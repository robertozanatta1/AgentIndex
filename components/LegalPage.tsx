// Internal note: plain-language summaries written by the operator, not legal advice. Have a BC lawyer review before scaling.
export const legalContact = "robertozanatta1@gmail.com";
export const legalUpdated = "October 16, 2026";
export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated {legalUpdated}</p>
      <div className="mt-10 space-y-6 text-zinc-300 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_a]:text-violet-300 [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">{children}</div>
    </main>
  );
}
