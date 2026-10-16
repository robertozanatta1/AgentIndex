import Link from "next/link";
export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-fuchsia-500 text-xs font-bold">AI</span>AgentIndex
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/#usecases" className="hover:text-white">Use cases</Link>
          <Link href="/#newsletter" className="hover:text-white">Newsletter</Link>
          <Link href="/pro" className="text-violet-300 hover:text-white">Pro</Link>
          <Link href="/sponsor" className="rounded-full bg-white px-4 py-1.5 font-medium text-black hover:bg-zinc-200">Sponsor us</Link>
        </nav>
      </div>
    </header>
  );
}
