import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = "https://www.austcaic.com";

// Generate on each request so panel semesters stay up-to-date and
// so the build-time Prisma query doesn't compete with page prerendering
// for the limited session-mode connection pool.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let panelRoutes: MetadataRoute.Sitemap = [];
  try {
    const rows = await prisma.panelMember.findMany({
      select: { semester: true },
      distinct: ["semester"],
    });

    panelRoutes = rows
      .filter((r) => Boolean(r.semester))
      .map((r) => ({
        url: `${SITE_URL}/panel/${encodeURIComponent(r.semester)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch {
    // Fallback to static routes if database is temporarily unreachable
  }

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/culture/syllabus`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/lab-free`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...panelRoutes,
  ];
}
