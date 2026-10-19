import "./globals.css";
import Link from "next/link";
import { Sora, Source_Serif_4 } from "next/font/google";
import { SITE } from "@/lib/site";

const sans = Sora({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              fastpage<span className="text-violet">.</span>
            </Link>
            <nav aria-label="Main" className="flex items-center gap-5 text-sm font-medium">
              <Link href="/" className="hover:text-violet">Articles</Link>
              <a href="/feed.xml" className="hover:text-violet">RSS</a>
            </nav>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6">
          {children}
        </main>

        <footer className="border-t border-line py-10 text-center text-sm text-ink/60">
          Written by {SITE.author}. Built with Next.js and Tailwind CSS.
        </footer>
      </body>
    </html>
  );
}
