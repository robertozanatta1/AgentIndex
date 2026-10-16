import usecases from "@/data/usecases.json";
import sponsor from "@/data/sponsor.json";

export type UseCase = {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  intro?: string;
  category: string;
  description: string;
  tags: string[];
  tools: string[];
  steps: string[];
  link?: string;
  /** ISO date (YYYY-MM-DD) the use case was added; drives weekly launch alerts. */
  addedAt?: string;
  /** When true, listing ranks above organic matches in search (must still match filters). */
  sponsored?: boolean;
  /** Lower number = higher priority among sponsored listings. */
  sponsorRank?: number;
};

export type Sponsor = { name: string; url: string; tagline: string; logo: string };

export const getUseCases = () => usecases as UseCase[];
export const getUseCase = (slug: string) => getUseCases().find((u) => u.slug === slug);
export const getSponsor = () => sponsor as Sponsor;
export const getSponsoredUseCases = () =>
  getUseCases()
    .filter((u) => u.sponsored)
    .sort(
      (a, b) =>
        (a.sponsorRank ?? 999) - (b.sponsorRank ?? 999) ||
        a.title.localeCompare(b.title)
    );

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sponsor@agentindex.example.com";
