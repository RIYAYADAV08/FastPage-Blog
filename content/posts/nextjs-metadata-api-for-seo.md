---
title: "Next.js metadata API: titles, descriptions and share cards"
description: "Set unique titles, descriptions, canonical URLs and Open Graph tags for every page in the Next.js App Router, without extra libraries."
date: "2026-10-05"
category: "SEO"
---

Search engines and social apps read a few tags in your page's `<head>` to decide what to show. The Next.js App Router lets you set them from code, so you never edit `<head>` by hand.

## Set defaults in the root layout

Export a `metadata` object from `app/layout.js`. A title template adds your site name to every page.

```js
export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: { default: "My Blog", template: "%s | My Blog" },
  description: "Guides on web development.",
};
```

`metadataBase` matters because it turns relative URLs, such as the canonical link, into full ones.

## Make it unique per page with generateMetadata

For dynamic routes like `/blog/[slug]`, export `generateMetadata`. It runs on the server and can read the same data as the page.

```js
export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, type: "article" },
  };
}
```

## Write for people first

- Keep titles under about 60 characters and descriptions near 150 to 160, so they are less likely to be cut off in results.
- Give every page its own title and description. Duplicates make pages compete with each other.
- Google may rewrite your title or description if it thinks another version fits the search better. That is normal.

## Help crawlers find your pages

Add `app/sitemap.js` and `app/robots.js`. Next.js turns them into `/sitemap.xml` and `/robots.txt` automatically.

## Add a share image

Put an `opengraph-image.js` file next to a page and return an `ImageResponse`. Next.js generates a share image for each article, so links look good on WhatsApp, LinkedIn and X.
