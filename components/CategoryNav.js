import Link from "next/link";

export default function CategoryNav({ categories, active }) {
  const base = "rounded-full border px-4 py-1.5 text-sm font-medium";
  return (
    <nav aria-label="Categories" className="mb-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/"
            aria-current={!active ? "page" : undefined}
            className={`${base} ${!active ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-violet"}`}
          >
            All
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/category/${c.slug}`}
              aria-current={active === c.slug ? "page" : undefined}
              className={`${base} ${active === c.slug ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-violet"}`}
            >
              {c.name} ({c.count})
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
