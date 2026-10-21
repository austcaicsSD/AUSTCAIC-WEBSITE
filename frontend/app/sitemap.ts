import type { MetadataRoute } from "next";

const SITE_URL = "https://www.austcaic.com";

// Generate on each request so panel semesters stay up-to-date and
// so the build-time Prisma query doesn't compete with page prerendering
// for the limited session-mode connection pool.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/culture/syllabus`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/lab-free`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...panelUrls,
  ];
}
