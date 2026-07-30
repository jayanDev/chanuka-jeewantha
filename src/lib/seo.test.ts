import { describe, expect, it } from "vitest";
import { buildPageMetadata } from "@/lib/seo";

describe("buildPageMetadata social images", () => {
  it("keeps the site-wide preview image by default", () => {
    const metadata = buildPageMetadata({
      title: "Default page",
      description: "Default metadata preview",
      path: "/default-page",
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/images/hero-chanuka.jpg",
        width: 1200,
        height: 630,
        alt: "Chanuka Jeewantha preview image",
      },
    ]);
    expect(metadata.twitter?.images).toEqual(["/images/hero-chanuka.jpg"]);
  });

  it("uses a page-specific image for Open Graph and Twitter cards", () => {
    const socialImage = {
      url: "/images/dubai-job-cv-cover-chanuka-jeewantha.jpg",
      width: 1200,
      height: 630,
      alt: "Dubai job CV services by Chanuka Jeewantha",
    };
    const metadata = buildPageMetadata({
      title: "Dubai CV Writing",
      description: "Dubai CV services for Sri Lankans",
      path: "/dubai",
      image: socialImage,
    });

    expect(metadata.openGraph?.images).toEqual([socialImage]);
    expect(metadata.twitter?.images).toEqual([socialImage.url]);
  });
});
