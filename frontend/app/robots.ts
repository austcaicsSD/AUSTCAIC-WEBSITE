import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/login", "/profile", "/panel", "/panel/"],
      },
    ],
    sitemap: "https://www.austcaic.com/sitemap.xml",
    host: "https://www.austcaic.com",
  };
}
