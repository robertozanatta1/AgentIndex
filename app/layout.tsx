import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/data";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "AgentIndex — Proven AI agent use cases you can copy today", template: "%s | AgentIndex" },
  description: "A curated directory of real AI agent use cases for founders and operators: sales, support, research, content, ops, coding and productivity.",
  openGraph: { title: "AgentIndex", description: "Proven AI agent use cases you can copy today", type: "website" },
  twitter: { card: "summary_large_image", title: "AgentIndex", description: "Proven AI agent use cases you can copy today" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-screen font-sans antialiased"><Nav />{children}<Footer /></body></html>);
}
