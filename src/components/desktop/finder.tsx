"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, ViewTransition, type CSSProperties, type KeyboardEvent } from "react";
import { CaseCover } from "@/components/case-study/case-cover";
import type { CaseStudyMeta, Entry } from "@/lib/content";
import { themeStyle } from "@/lib/theme";
import { Window } from "./window";

const places = [
  { label: "Desktop", href: "/#top" },
  { label: "work", href: "/#work", current: true },
  { label: "about-me.md", href: "/#about" },
  { label: "New Message", href: "/#contact" },
];

const infoLabel = "font-mono text-[10px] tracking-wider text-muted uppercase";

// Selected work as a Finder window in Gallery view: a large preview of the
// selected project, its details and a strip of every project to pick from.
// Click selects, double click or Open opens, and the preview morphs into the
// case study's cover. Phones get the list view.
export function Finder({ studies }: { studies: Entry<CaseStudyMeta>[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = studies[index];

  function onKeyDown(event: KeyboardEvent) {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + studies.length) % studies.length;
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <Window title="work">
      <div className="hidden md:grid md:grid-cols-[1fr_260px] lg:grid-cols-[150px_1fr_280px]">
        <nav aria-label="Finder favorites" className="hidden border-r border-line bg-paper/60 p-3 lg:block">
          <p className={`px-2 ${infoLabel}`}>Favorites</p>
          <ul className="mt-2 space-y-0.5 text-sm">
            {places.map((place) => (
              <li key={place.label}>
                <Link
                  href={place.href}
                  aria-current={place.current ? "location" : undefined}
                  className={`block truncate rounded-md px-2 py-1 ${place.current ? "bg-ink/10 font-medium" : "text-ink-2 hover:bg-ink/5"}`}
                >
                  {place.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 p-4">
          <div className="grid">
            {studies.map((study, i) => (
              <div
                key={study.slug}
                id={`finder-preview-${study.slug}`}
                role="tabpanel"
                aria-label={study.meta.title}
                className={`col-start-1 row-start-1 transition-[opacity,scale,visibility] duration-300 motion-reduce:transition-none ${
                  i === index ? "" : "invisible scale-[0.98] opacity-0"
                }`}
              >
                {/* Only the selected preview carries the shared name, so hidden ones never morph.
                    The full prefetch delivers the case study before the click, so the cover can
                    morph in the same commit as the navigation. */}
                <ViewTransition name={i === index ? `cover-${study.slug}` : undefined} share="morph" default="none">
                  <Link
                    href={`/work/${study.slug}`}
                    prefetch
                    tabIndex={i === index ? 0 : -1}
                    style={themeStyle(study.meta.theme)}
                    className="grid h-[26rem] place-items-center overflow-hidden rounded-xl bg-[var(--cs-bg)] px-10 text-[var(--cs-fg)] outline-none focus-visible:ring-4 focus-visible:ring-[var(--cs-accent)]"
                  >
                    <span className="sr-only">Open {study.meta.title}</span>
                    <div className="w-full max-w-md">
                      <CaseCover cover={study.meta.cover} />
                    </div>
                  </Link>
                </ViewTransition>
              </div>
            ))}
          </div>

          <div role="tablist" aria-label="Projects" onKeyDown={onKeyDown} className="mt-5 flex justify-center gap-4">
            {studies.map((study, i) => (
              <button
                key={study.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-controls={`finder-preview-${study.slug}`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => setIndex(i)}
                onDoubleClick={() => router.push(`/work/${study.slug}`)}
                className="group flex w-28 flex-col items-center gap-1.5 rounded-lg p-1 outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Thumb
                  meta={study.meta}
                  className={`h-16 w-24 transition-transform group-hover:-translate-y-0.5 ${
                    i === index ? "ring-2 ring-accent ring-offset-2 ring-offset-card" : "ring-1 ring-black/10"
                  }`}
                />
                <span
                  className={`max-w-full truncate rounded px-1.5 font-mono text-[11px] ${
                    i === index ? "bg-accent text-white" : "text-ink-2"
                  }`}
                >
                  {study.meta.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <aside
          key={selected.slug}
          aria-label={`${selected.meta.title} information`}
          style={themeStyle(selected.meta.theme)}
          className="flex flex-col border-l border-line p-5 motion-safe:animate-[app-in_0.3s_ease-out]"
        >
          <Thumb meta={selected.meta} className="h-20 w-28 ring-1 ring-black/10" />
          <h3 className="mt-4 text-2xl font-semibold tracking-tight">{selected.meta.title}</h3>
          <p className="text-sm text-muted">Case study · {selected.meta.year}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{selected.meta.summary}</p>

          <p className={`mt-6 ${infoLabel}`}>Information</p>
          <dl className="mt-2 divide-y divide-line border-y border-line text-sm">
            <InfoRow label="Role" value={selected.meta.role} />
            {selected.meta.team && <InfoRow label="Team" value={selected.meta.team} />}
            <InfoRow label="Tags" value={selected.meta.tags.join(", ")} />
          </dl>

          <Link
            href={`/work/${selected.slug}`}
            prefetch
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--cs-accent)] px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:translate-x-1"
          >
            Open <span aria-hidden>→</span>
          </Link>
        </aside>
      </div>

      <ul className="divide-y divide-line md:hidden">
        {studies.map((study) => (
          <li key={study.slug}>
            <Link href={`/work/${study.slug}`} className="flex items-center gap-4 px-4 py-4 hover:bg-paper">
              <Thumb meta={study.meta} className="h-14 w-20 shrink-0 ring-1 ring-black/10" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{study.meta.title}</span>
                <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{study.meta.summary}</span>
              </span>
              <span aria-hidden className="text-muted">
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="border-t border-line px-4 py-2 text-center font-mono text-[11px] text-muted">
        {studies.length} items<span className="hidden md:inline"> · Gallery view</span>
      </p>
    </Window>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

// A small picture of a project, in its own colors, built from its cover. It sets
// only the project variables, so the selection ring keeps the system accent.
function Thumb({ meta, className = "" }: { meta: CaseStudyMeta; className?: string }) {
  const { cover, theme } = meta;
  return (
    <span
      style={{ "--cs-bg": theme.bg, "--cs-accent": theme.accent } as CSSProperties}
      className={`relative grid place-items-center overflow-hidden rounded-lg bg-[var(--cs-bg)] ${className}`}
    >
      {cover.kind === "browser" && <Image src={cover.src} alt="" fill sizes="112px" className="object-cover object-top" />}
      {cover.kind === "logo" && <Image src={cover.src} alt="" width={64} height={64} className="w-1/2" />}
      {cover.kind === "type" && <span className="font-semibold text-[var(--cs-accent)]">{cover.label}</span>}
    </span>
  );
}
