import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = "https://austcaic.com";

// Generate on each request so panel semesters stay up-to-date and
// so the build-time Prisma query doesn't compete with page prerendering
// for the limited session-mode connection pool.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all distinct semesters that have panel members.
  // Gracefully degrade if the DB is unavailable at build time.
  let panelUrls: MetadataRoute.Sitemap = [];
  try {
    const rows = await prisma.panelMember.findMany({
      distinct: ["semester"],
      select: { semester: true, createdAt: true },
      orderBy: { semester: "desc" },
    });
    panelUrls = rows.map((r) => ({
      url: `${SITE_URL}/panel/${r.semester}`,
      lastModified: r.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable (e.g. pool exhausted at build time) — omit panel URLs
  }

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
