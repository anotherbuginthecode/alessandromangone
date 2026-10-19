import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";
import { SectionHeading } from "../section-heading";

export async function Writing() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow="writing" title="Notes on leading engineers and shipping software." />
        <ul className="divide-y divide-line border-y border-line">
          {posts.map(({ slug, meta }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className="group grid gap-1 py-5 sm:grid-cols-[140px_1fr]">
                <time dateTime={meta.date} className="font-mono text-sm text-muted">
                  {formatDate(meta.date)}
                </time>
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-accent-ink">{meta.title}</h3>
                  <p className="text-ink-2">{meta.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className="mt-8 inline-block font-mono text-sm text-accent-ink hover:underline">
          All posts →
        </Link>
      </div>
    </section>
  );
}
