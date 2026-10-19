import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { formatDate, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on leading engineers and shipping software.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SectionHeading eyebrow="blog" title="Notes on leading engineers and shipping software." />
      {posts.length === 0 && <p className="font-mono text-sm text-muted">{"// first posts are on the way"}</p>}
      <ul className="divide-y divide-line border-y border-line empty:hidden">
        {posts.map(({ slug, meta }) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`} className="group block py-6">
              <time dateTime={meta.date} className="font-mono text-sm text-muted">
                {formatDate(meta.date)}
              </time>
              <h2 className="mt-1 text-xl font-semibold group-hover:text-accent-ink">{meta.title}</h2>
              <p className="mt-1 text-ink-2">{meta.summary}</p>
              <p className="mt-2 flex gap-3 font-mono text-xs text-muted">
                {meta.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
