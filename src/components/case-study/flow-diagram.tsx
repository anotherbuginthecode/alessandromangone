"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type FlowNode = { title: string; note?: string };
type FlowRow = { label: string; nodes: FlowNode[]; tone?: "core" | "people" };
type FlowDiagramProps = { rows: FlowRow[]; links?: string[]; caption?: string };

// Layered diagram: rows of nodes joined by connectors. `links[i]` labels the
// connector between row i and row i + 1.
export function FlowDiagram({ rows, links = [], caption }: FlowDiagramProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } });
        rows.forEach((_, i) => {
          tl.fromTo(`[data-row='${i}']`, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" })
            .fromTo(`[data-row='${i}'] li`, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.06 }, "<0.1")
            .fromTo(`[data-line='${i}']`, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: 0.35 }, "-=0.1");
        });
        gsap.fromTo(
          "[data-pulse]",
          { top: "0%", autoAlpha: 0 },
          { top: "100%", autoAlpha: 1, duration: 1.4, ease: "none", repeat: -1, stagger: 0.35, delay: 1.5 },
        );
      });
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} data-self-animated className="my-14">
      <div className="rounded-3xl bg-paper-2 p-4 sm:p-10">
        {rows.map((row, i) => (
          <div key={row.label}>
            <div
              data-row={i}
              className={`rounded-2xl border p-4 ${
                row.tone === "core"
                  ? "border-accent bg-accent/10"
                  : row.tone === "people"
                    ? "border-dashed border-ink/25 bg-paper"
                    : "border-line bg-card"
              }`}
            >
              <p className="font-mono text-[11px] text-muted uppercase">{row.label}</p>
              <ul
                style={{ "--cols": Math.min(row.nodes.length, 4) } as CSSProperties}
                className="mt-3 grid gap-2 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
              >
                {row.nodes.map((node) => (
                  <li key={node.title} className="rounded-xl border border-line bg-card px-3 py-2.5">
                    <p className="text-sm font-semibold">{node.title}</p>
                    {node.note && <p className="mt-0.5 text-xs text-muted">{node.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
            {i < rows.length - 1 && (
              <div className="relative h-16" aria-hidden={!links[i]}>
                <span data-line={i} className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-accent" />
                <span data-pulse className="absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                {links[i] && (
                  <span className="absolute top-1/2 left-1/2 ml-4 max-w-[calc(50%-1.5rem)] -translate-y-1/2 rounded-xl border border-line bg-paper px-2.5 py-0.5 font-mono text-[11px] leading-snug text-muted sm:max-w-none sm:whitespace-nowrap">
                    {links[i]}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-3 text-[13px] text-muted">{caption}</figcaption>}
    </figure>
  );
}
