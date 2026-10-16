import Link from "next/link";
export const metadata = { title: "Checkout cancelled", robots: { index: false } };
export default function Page() {
  return (<main className="mx-auto max-w-xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Checkout cancelled</h1>
    <p className="mt-4 text-zinc-400">No charge was made. You can try again anytime.</p>
    <Link href="/sponsor" className="mt-8 inline-block rounded-xl border border-white/20 px-5 py-3 hover:bg-white/5">Back to sponsorship</Link></main>);
}
