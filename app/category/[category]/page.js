import { notFound } from "next/navigation";
import { getAllPosts, getCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }) {
  const cat = getCategories().find((c) => c.slug === params.category);
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat.name} articles`,
    description: `All articles about ${cat.name.toLowerCase()}.`,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default function CategoryPage({ params }) {
  const categories = getCategories();
  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const posts = getAllPosts().filter((p) => p.categorySlug === cat.slug);

  return (
    <div>
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight">{cat.name}</h1>
      <CategoryNav categories={categories} active={cat.slug} />
      <ul className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
