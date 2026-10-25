import usecases from "@/data/usecases.json";
import sponsor from "@/data/sponsor.json";
import playbooks from "@/data/playbooks.json";

/** Optional in-depth, use-case-specific playbook content rendered on /usecases/[slug]. */
export type Playbook = {
  /** Who it's for and the problem, 2-3 sentences. */
  problem: string;
  /** Concrete setup steps; replaces the generic `steps` list when present. */
  setupSteps: string[];
  /** Copy-paste example agent instructions. */
  prompt: string;
  guardrails: string[];
  example: { input: string; output: string };
  metrics: string[];
  faq: { q: string; a: string }[];
  /** Slugs of related use cases. */
  related: string[];
};

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
  playbook?: Playbook;
};

export type Sponsor = { name: string; url: string; tagline: string; logo: string };

const playbookMap = playbooks as Record<string, Playbook>;

/** List view: base fields only (keeps playbook text out of the homepage payload). */
export const getUseCases = () => usecases as UseCase[];
/** Detail view: includes the playbook when one exists for the slug. */
export const getUseCase = (slug: string): UseCase | undefined => {
  const u = getUseCases().find((x) => x.slug === slug);
  if (!u) return undefined;
  const playbook = playbookMap[slug];
  return playbook ? { ...u, playbook } : u;
};
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
