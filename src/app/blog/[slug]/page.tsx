import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, listPostSlugs } from "@/lib/content";

export function generateStaticParams() {
  return listPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.summary };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const { meta, Content } = post;

  return (
    <article data-app="Notes" data-app-file={`~/notes/${post.slug}.md`} className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/blog" className="font-mono text-sm text-muted hover:text-accent-ink">
        ← Blog
      </Link>
      <header className="mt-8 border-b border-line pb-8">
        <time dateTime={meta.date} className="font-mono text-sm text-muted">
          {formatDate(meta.date)}
        </time>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{meta.title}</h1>
        <p className="mt-4 text-xl text-ink-2">{meta.summary}</p>
      </header>
      <Content />
    </article>
  );
}
