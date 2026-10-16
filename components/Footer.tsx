import Link from "next/link";
export default function Footer() {
  return (<footer className="mt-24 border-t border-white/5 py-10 text-center text-sm text-zinc-500">
    © {new Date().getFullYear()} AgentIndex · <Link href="/sponsor" className="hover:text-white">Sponsor</Link> · <Link href="/pro" className="hover:text-white">Pro</Link> · <Link href="/privacy" className="hover:text-white">Privacy</Link> · <Link href="/terms" className="hover:text-white">Terms</Link></footer>);
}
