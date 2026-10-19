# alessandromangone

Personal site and blog of Alessandro Mangone, Engineering Manager and co-founder & CTO of Matcha.

Live at [alessandromangone.vercel.app](https://alessandromangone.vercel.app). Every push to `main` deploys to production on Vercel.

## Concept

The home page is a developer's desktop. It boots in on load, the terminal types `whoami` by itself and works as navigation (`help`, `ls`, `open matcha`, `contact`), the windows can be dragged by their title bar, folders open the case studies and the dock holds the contact links. Below it:

1. **Selected work**: each case study as a full-width poster in the project's own colors.
2. **How I work**: the agent board from Matcha, running live.
3. **Career**: the timeline as a `git log`.
4. **Writing**: shown only once a post is published.
5. **About**: `about-me.md` and `stack.json`.
6. **Contact**: footer on every page.

Case studies follow one arc (insight, challenge, decisions, delivery, results, closing) and use animated building blocks: a layered flow diagram, a scroll-driven state machine, a timeline and the agent board.

Reference analysis (in Italian): [`docs/analisi-riferimenti.md`](docs/analisi-riferimenti.md).

## Stack

- Next.js 16 (App Router, Cache Components) + TypeScript
- Tailwind CSS 4
- MDX via `@next/mdx` for case studies and posts
- GSAP (ScrollTrigger, Flip, Draggable) via `@gsap/react`. Every animation runs inside `(prefers-reduced-motion: no-preference)`, so reduced motion shows the final state.

## Where things live

| What | Where |
| --- | --- |
| Personal copy, links, career, skills | `src/lib/site.ts` |
| Case studies | `src/content/work/*.mdx` |
| Blog posts | `src/content/blog/*.mdx` |
| MDX building blocks | `src/components/case-study/`, registered in `src/mdx-components.tsx` |
| Animations | `src/components/motion/`, plugins registered in `src/lib/gsap.ts` |
| Case study images | `public/work/<slug>/` |
| Brand icons | `public/app-icons/` (Iconify "logos", CC0; "vscode-icons", MIT) |
| Design tokens | `src/app/globals.css` |

### Conventions

- **Placeholders.** A value in `[brackets]` in `site.ts` is a placeholder. The UI hides it (dock icon, footer link, status line) until it holds a real value.
- **Case studies.** Each MDX file exports `metadata` with `intro`, `theme` (colors and an optional brand font for the poster), `cover` and `stats`. The page closes with `stats` in a results panel. The body is Markdown plus the blocks registered in `src/mdx-components.tsx`: `Cards`, `Steps`, `Principles` and the animated figures. Adding a file adds a desktop folder, a poster and a page.
- **Posts.** Set `draft: true` to keep a post out of every list. The Blog link, folder and section appear with the first published post.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
