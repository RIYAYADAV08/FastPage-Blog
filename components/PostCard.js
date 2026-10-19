import Link from "next/link";
import { formatDate } from "@/lib/posts";

export default function PostCard({ post }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition hover:border-violet">
      <Link
        href={`/category/${post.categorySlug}`}
        className="w-fit rounded-full bg-tint px-3 py-1 text-xs font-semibold text-violet hover:bg-violet hover:text-white"
      >
        {post.category}
      </Link>

      <h2 className="mt-4 text-xl font-bold leading-snug">
        <Link href={`/blog/${post.slug}`} className="hover:text-violet">
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 flex-1 font-serif text-lg leading-relaxed text-ink/75">{post.description}</p>

      <p className="mt-5 flex gap-4 text-sm text-ink/60">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.minutes} min read</span>
      </p>
    </article>
  );
}
