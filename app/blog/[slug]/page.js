import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, renderPost, formatDate } from "@/lib/posts";
import { SITE } from "@/lib/site";
import PostCard from "@/components/PostCard";

// SSG: every article is built into a static HTML page at build time
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// Unique title, description, canonical URL and Open Graph data for each article
export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: SITE.name,
      publishedTime: post.date,
      authors: [SITE.author],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const { html, toc } = await renderPost(post.content);

  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === post.slug);
  const newer = all[index - 1];
  const older = all[index + 1];
  const related = all
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== post.slug)
    .slice(0, 2);

  // Structured data: helps Google understand the article (headline, author, date)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: SITE.author },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    image: `${SITE.url}/blog/${post.slug}/opengraph-image`,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink/60">
        <Link href="/" className="hover:text-violet">Articles</Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/category/${post.categorySlug}`} className="hover:text-violet">{post.category}</Link>
      </nav>

      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 font-serif text-xl leading-relaxed text-ink/75">{post.description}</p>
        <p className="mt-5 flex gap-4 text-sm text-ink/60">
          <span>{SITE.author}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.minutes} min read</span>
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
        <article
          className="prose prose-lg max-w-none font-serif prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-violet prose-code:rounded prose-code:bg-tint prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink prose-pre:text-white [&_pre_code]:bg-transparent [&_pre_code]:p-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {toc.length > 1 && (
          <aside className="order-first lg:order-last">
            <nav aria-labelledby="toc-title" className="sticky top-24 rounded-2xl border border-line bg-white p-5 text-sm">
              <h2 id="toc-title" className="font-bold">On this page</h2>
              <ul className="mt-3 space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-ink/75 hover:text-violet">{item.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      <nav aria-label="More articles" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {older ? (
          <Link href={`/blog/${older.slug}`} className="rounded-2xl border border-line bg-white p-5 hover:border-violet">
            <span className="text-sm text-ink/60">Older article</span>
            <span className="mt-1 block font-bold">{older.title}</span>
          </Link>
        ) : <span />}
        {newer && (
          <Link href={`/blog/${newer.slug}`} className="rounded-2xl border border-line bg-white p-5 hover:border-violet sm:text-right">
            <span className="text-sm text-ink/60">Newer article</span>
            <span className="mt-1 block font-bold">{newer.title}</span>
          </Link>
        )}
      </nav>

      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related">
          <h2 id="related" className="mb-5 text-2xl font-extrabold">More on {post.category.toLowerCase()}</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}><PostCard post={p} /></li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
