import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";

// Generates a unique social-share image (1200x630) for every article
export const alt = "Article cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function Image({ params }) {
  const post = getPost(params.slug);
  const title = post ? post.title : SITE.name;
  const category = post ? post.category : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#5B3DF5",
          color: "white",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>{category}</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 32 }}>{SITE.name}</div>
      </div>
    ),
    size
  );
}
