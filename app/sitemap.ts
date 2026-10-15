import type { MetadataRoute } from "next";
import { getUseCases, siteUrl } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, { url: `${siteUrl}/sponsor` }, ...getUseCases().map((u) => ({ url: `${siteUrl}/usecases/${u.slug}` }))];
}
