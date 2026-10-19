---
title: "SSG, SSR and ISR: when to use which"
description: "Next.js can build a page ahead of time, on every request, or somewhere in between. Here is how to choose without the jargon."
date: "2026-09-28"
category: "Next.js"
---

Every page in Next.js is rendered at some point. The question is *when*. That one choice affects speed, freshness and cost.

## SSG: build once, serve many times

With Static Site Generation, the HTML is created at build time and served from a CDN. It is the fastest option and works well for content that rarely changes, such as blog posts, docs and marketing pages.

In the App Router, a page becomes static when it has no per-request data. For dynamic routes, tell Next.js which pages to build with `generateStaticParams`.

## SSR: build on every request

With Server-Side Rendering, the page is created each time someone asks for it. Use it when the content depends on the visitor or must always be current, such as a dashboard or a page that reads cookies.

```js
export const dynamic = "force-dynamic";
```

It is slower than SSG because the server has to do work before it can reply.

## ISR: static, but refreshed

Incremental Static Regeneration gives you a middle path. The page is served as static HTML, and Next.js rebuilds it in the background after a time you choose.

```js
const res = await fetch("https://api.example.com/products", {
  next: { revalidate: 3600 }, // refresh at most once an hour
});
```

This suits a product catalogue: fast for everyone, and never more than an hour out of date.

## A quick rule of thumb

- Content changes rarely: use SSG.
- Content changes sometimes and a short delay is fine: use ISR.
- Content is personal or must be live: use SSR.

Note that caching defaults for `fetch` differ between Next.js versions, so check the docs for the version you use.
