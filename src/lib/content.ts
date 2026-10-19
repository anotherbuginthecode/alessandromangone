import fs from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";

// Case studies and posts live as MDX files in src/content/<collection>.
// Each file exports a `metadata` object typed below.

export type CaseStudyMeta = {
  title: string;
  summary: string;
  year: string;
  role: string;
  team?: string;
  tags: string[];
  links?: { label: string; href: string }[];
  order: number;
};

export type PostMeta = {
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
};

export type Entry<T> = { slug: string; meta: T };

type Collection = "work" | "blog";

const contentDir = path.join(process.cwd(), "src/content");

function listSlugs(collection: Collection) {
  return fs
    .readdirSync(path.join(contentDir, collection))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

async function loadCaseStudy(slug: string) {
  const mod = await import(`@/content/work/${slug}.mdx`);
  return { meta: mod.metadata as CaseStudyMeta, Content: mod.default as MDXContent };
}

async function loadPost(slug: string) {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  return { meta: mod.metadata as PostMeta, Content: mod.default as MDXContent };
}

export const listCaseStudySlugs = () => listSlugs("work");
export const listPostSlugs = () => listSlugs("blog");

export async function getCaseStudies(): Promise<Entry<CaseStudyMeta>[]> {
  const entries = await Promise.all(
    listCaseStudySlugs().map(async (slug) => ({ slug, meta: (await loadCaseStudy(slug)).meta })),
  );
  return entries.sort((a, b) => a.meta.order - b.meta.order);
}

export async function getCaseStudy(slug: string) {
  if (!listCaseStudySlugs().includes(slug)) return null;
  return { slug, ...(await loadCaseStudy(slug)) };
}

export async function getPosts(): Promise<Entry<PostMeta>[]> {
  const entries = await Promise.all(
    listPostSlugs().map(async (slug) => ({ slug, meta: (await loadPost(slug)).meta })),
  );
  return entries.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export async function getPost(slug: string) {
  if (!listPostSlugs().includes(slug)) return null;
  return { slug, ...(await loadPost(slug)) };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}
