import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseFile(file) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date, // YYYY-MM-DD
    category: data.category,
    categorySlug: slugify(data.category),
    minutes: readingTime(content),
    content,
  };
}

// Newest first
export function getAllPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getCategories() {
  const map = new Map();
  for (const p of getAllPosts()) {
    const entry = map.get(p.categorySlug) || { slug: p.categorySlug, name: p.category, count: 0 };
    entry.count += 1;
    map.set(p.categorySlug, entry);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// Markdown -> HTML, adds ids to h2 headings and returns a table of contents
export async function renderPost(markdown) {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  const toc = [];
  const html = String(file).replace(/<h2>(.*?)<\/h2>/g, (_, inner) => {
    const id = slugify(inner);
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}

export function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
