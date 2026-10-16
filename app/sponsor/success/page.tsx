import Link from "next/link";
export const metadata = { title: "Thanks — payment received", robots: { index: false } };
export default function Page() {
  return (<main className="mx-auto max-w-xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Thanks — payment received</h1>
    <p className="mt-4 text-zinc-400">We'll mark your listing as sponsored within 24 hours and email you when it's live.</p>
    <Link href="/sponsor" className="mt-8 inline-block rounded-xl border border-white/20 px-5 py-3 hover:bg-white/5">Back to sponsorship</Link></main>);
}
