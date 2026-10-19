import Link from "next/link";
import { getAllPosts, getCategories, formatDate } from "@/lib/posts";
import { SITE } from "@/lib/site";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";

export default function HomePage() {
  const [featured, ...rest] = getAllPosts();
  const categories = getCategories();

  return (
    <div>
      <section className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {SITE.tagline}
        </h1>
        <p className="mt-4 font-serif text-xl leading-relaxed text-ink/75">{SITE.description}</p>
      </section>

      <Link
        href={`/blog/${featured.slug}`}
        className="mb-12 block rounded-3xl bg-violet p-8 text-white transition hover:bg-ink sm:p-12"
      >
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">Latest: {featured.category}</span>
        <span className="mt-5 block max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          {featured.title}
        </span>
        <span className="mt-4 block max-w-2xl font-serif text-lg leading-relaxed text-white/85">
          {featured.description}
        </span>
        <span className="mt-6 flex gap-4 text-sm text-white/75">
          <time dateTime={featured.date}>{formatDate(featured.date)}</time>
          <span>{featured.minutes} min read</span>
        </span>
      </Link>

      <CategoryNav categories={categories} />

      <ul className="grid gap-6 md:grid-cols-2">
        {rest.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
