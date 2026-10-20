import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";
import { Window } from "../desktop/window";
import { SectionHeading } from "../section-heading";

// The latest posts as a notes app: the list on the left, the newest note open on the right.
export async function Writing() {
  const posts = (await getPosts()).slice(0, 3);
  if (posts.length === 0) return null;
  const [latest] = posts;

  return (
    <section id="writing" data-app="Notes" data-app-file="~/notes">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading eyebrow="writing" title="Notes from both sides of the pull request." />
        <Window title="~/notes" bodyClassName="grid md:grid-cols-[300px_1fr]">
          <ul className="divide-y divide-line bg-paper/60 md:border-r md:border-line">
            {posts.map(({ slug, meta }, i) => (
              <li key={slug}>
                <Link href={`/blog/${slug}`} className={`block px-4 py-3 ${i === 0 ? "md:bg-note" : "hover:bg-ink/5"}`}>
                  <span className="block truncate font-semibold">{meta.title}</span>
                  <span className="block truncate text-sm text-muted">
                    <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {meta.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden p-8 md:block">
            <time dateTime={latest.meta.date} className="font-mono text-xs text-muted">
              {formatDate(latest.meta.date)}
            </time>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight text-balance">{latest.meta.title}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-2">{latest.meta.summary}</p>
            <Link href={`/blog/${latest.slug}`} className="mt-6 inline-block font-mono text-sm text-accent-ink hover:underline">
              Read the note →
            </Link>
          </div>
        </Window>
        <Link href="/blog" className="mt-8 inline-block font-mono text-sm text-accent-ink hover:underline">
          All posts →
        </Link>
      </div>
    </section>
  );
}
