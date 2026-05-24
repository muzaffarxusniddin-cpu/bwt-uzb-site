import type { MetadataRoute } from "next";

const SITE = "https://bwt-uzb.uz";

// Locale-agnostic marketing routes. RU (default) is unprefixed; UZ under /uz/*.
// Catalog product (/catalog/[sku]) pages are statically generated from the ERP
// and can be added here later from the same source.
const PATHS = ["", "/about", "/services", "/contacts", "/request", "/catalog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    const ru = `${SITE}${path || "/"}`;
    const uz = `${SITE}/uz${path}`;
    const languages = { ru, uz };
    const priority = path === "" ? 1 : 0.8;

    entries.push({ url: ru, lastModified: now, changeFrequency: "monthly", priority, alternates: { languages } });
    entries.push({ url: uz, lastModified: now, changeFrequency: "monthly", priority, alternates: { languages } });
  }

  return entries;
}
