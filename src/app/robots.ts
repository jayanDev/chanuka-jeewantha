import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site-url";

const baseUrl = getBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/reviews-admin/",
          "/auth/",
          "/cart/",
          "/checkout/",
          "/orders/",
          "/notifications/",
        ],
      },
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
