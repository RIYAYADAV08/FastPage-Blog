# Fastpage: SEO-Optimised Blog

A fast, accessible blog built with **Next.js (App Router)** and **Tailwind CSS**. Articles are written as Markdown files and built into static pages (SSG), with the SEO setup a real client website needs.

**Live demo:** [fast-page-blog.vercel.app](https://fast-page-blog.vercel.app)
**Source code:** [github.com/RIYAYADAV08/FastPage-Blog](https://github.com/RIYAYADAV08/FastPage-Blog)

![Home page](./screenshots/home.png)

## Features

- Articles written in **Markdown** (`content/posts/*.md`), parsed with gray-matter and remark
- **Static generation (SSG)** for every article and category page, so pages load fast
- Unique **title, description, canonical URL, Open Graph and Twitter tags** for every article
- Auto-generated **social share image** for each article
- **JSON-LD** `Article` structured data for search engines
- **`sitemap.xml`**, **`robots.txt`** and an **RSS feed** (`/feed.xml`)
- Category pages, table of contents, reading time, previous/next and related articles
- Responsive layout, skip link, visible keyboard focus, good colour contrast and reduced-motion support
- Typography-first design with no heavy images, so it stays light

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS, `@tailwindcss/typography` |
| Content | Markdown, gray-matter, remark, remark-gfm, remark-html |
| Fonts | `next/font` (Sora, Source Serif 4) |
| Deployment | Vercel |

## Getting started

You need [Node.js](https://nodejs.org) 18.17 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/RIYAYADAV08/FastPage-Blog.git
cd FastPage-Blog

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variable (for deployment)

Set your live address so the sitemap, canonical links and share images use the right domain:

```
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

Locally it defaults to `http://localhost:3000`. See `.env.example`.

## Adding an article

Create a file such as `content/posts/my-new-post.md`:

```md
---
title: "My new post"
description: "One sentence of about 150 characters."
date: "2026-10-20"
category: "SEO"
---

Intro paragraph.

## First heading
Text goes here.
```

Save it, and the article appears on the home page, its category page, the sitemap and the RSS feed.

## Project structure

```
content/posts/              Markdown articles
lib/posts.js                Read, parse and render articles
lib/site.js                 Site name, URL and author
app/page.js                 Home page
app/blog/[slug]/            Article page and share image
app/category/[category]/    Category page
app/sitemap.js              /sitemap.xml
app/robots.js               /robots.txt
app/feed.xml/route.js       RSS feed
components/                 PostCard, CategoryNav
```

## How the SEO works

- **`generateMetadata`** gives each article its own title, description, canonical URL and Open Graph data.
- **`generateStaticParams`** builds every article at build time, so crawlers get ready-made HTML.
- **`opengraph-image.js`** creates a unique share image for each article.
- **JSON-LD** describes each page as an `Article` with its author and publish date.
- **Sitemap and robots.txt** help search engines find and crawl all pages.

## Future improvements

- Search across articles
- Code syntax highlighting
- Tags in addition to categories
- Newsletter sign-up

## Author

**Riya Yadav**
[LinkedIn](https://www.linkedin.com/in/riyayadav0803) | [GitHub](https://github.com/RIYAYADAV08) | riya080305@gmail.com
