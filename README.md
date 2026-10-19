# alessandromangone

Personal site and blog of Alessandro Mangone, Tech Lead and Engineering Manager, CTO at Matcha.

> Status: **skeleton mockup**. Structure, layout and interactions are in place; every piece of copy written in `[brackets]` is a placeholder to replace.

## Concept

The home page is a developer's desktop: folders open the case studies, a working terminal doubles as navigation (`help`, `ls`, `open matcha`, `contact`...), and the dock holds the contact links. Below the desktop the page tells the story in order:

1. **Desktop** (hero)
2. **Highlights**: proof in one line each
3. **Superpowers**: four pillars, each with three metrics and a case study
4. **Selected work**: case study cards
5. **Career**: the timeline as a `git log`
6. **Writing**: latest blog posts
7. **About**: `about-me.md` (Then / Now / Next) and `stack.json`
8. **Contact**: footer on every page

Case studies follow one narrative arc: insight → challenge → leadership → process → results → closing. Headings are claims, not labels.

Reference analysis (in Italian): [`docs/analisi-riferimenti.md`](docs/analisi-riferimenti.md).

## Stack

- Next.js 16 (App Router, Cache Components) + TypeScript
- Tailwind CSS 4
- MDX via `@next/mdx` for case studies and posts

## Where things live

| What | Where |
| --- | --- |
| Personal copy, links, pillars, career, skills | `src/lib/site.ts` |
| Case studies | `src/content/work/*.mdx` |
| Blog posts | `src/content/blog/*.mdx` |
| MDX styles and components (`<Metrics>`, `<Callout>`) | `src/mdx-components.tsx` |
| Design tokens (colors, fonts) | `src/app/globals.css` |

Each MDX file exports a `metadata` object (see the existing files for the fields). Adding a file to `src/content/work` also adds a folder to the desktop and a card to the work pages.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
