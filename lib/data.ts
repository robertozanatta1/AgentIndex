import usecases from "@/data/usecases.json";
import sponsor from "@/data/sponsor.json";
export type UseCase = { slug: string; title: string; category: string; description: string; tags: string[]; tools: string[]; steps: string[]; link?: string };
export type Sponsor = { name: string; url: string; tagline: string; logo: string };
export const getUseCases = () => usecases as UseCase[];
export const getUseCase = (slug: string) => getUseCases().find((u) => u.slug === slug);
export const getSponsor = () => sponsor as Sponsor;
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "sponsor@agentindex.example.com";
