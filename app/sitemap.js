import { getAllPosts, getCategories } from "@/lib/posts";
import { SITE } from "@/lib/site";

// Served at /sitemap.xml so search engines can find every page
export default function sitemap() {
  const posts = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.date,
  }));
  const categories = getCategories().map((c) => ({
    url: `${SITE.url}/category/${c.slug}`,
  }));
  return [{ url: SITE.url, lastModified: new Date() }, ...categories, ...posts];
}
