import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/content/blog-posts";

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
  const post = getPostBySlug(slug);

  const title = post?.title ?? (slugToTitle(slug) || "Career Insights");
  const category = post?.category ?? "Career Blog";

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
            "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0a3f2a 100%)",
          padding: "64px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            border: "1px solid rgba(56, 189, 110, 0.45)",
            borderRadius: "999px",
            padding: "10px 18px",
            fontSize: 24,
            fontWeight: 700,
            color: "#86efac",
          }}
        >
          {category}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.12,
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
              color: "#d1fae5",
              fontWeight: 600,
            }}
          >
            Chanuka Jeewantha Blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
