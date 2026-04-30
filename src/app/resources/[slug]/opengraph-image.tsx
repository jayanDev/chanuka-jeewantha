import { ImageResponse } from "next/og";
import { getResourceBySlug } from "@/lib/resources";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  const title = resource?.title ?? (slugToTitle(slug) || "Career Resource");
  const subtitle = resource?.subtitle ?? "Digital Toolkit";
  const badge = resource
    ? `${resource.category === "free" ? "Free" : "Premium"} ${resource.resourceType}`
    : "Digital Resource";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(140deg, #072b3a 0%, #0f4c68 45%, #1e3a8a 100%)",
          padding: "64px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            border: "1px solid rgba(125, 211, 252, 0.6)",
            borderRadius: "999px",
            padding: "10px 18px",
            fontSize: 24,
            fontWeight: 700,
            color: "#bae6fd",
          }}
        >
          {badge}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              maxWidth: 1020,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#dbeafe",
              fontWeight: 600,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
