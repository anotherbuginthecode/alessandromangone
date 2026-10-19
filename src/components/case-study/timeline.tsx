"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type TimelineItem = { date: string; title: string; body?: string };

// Dated milestones on a rail that fills as the reader scrolls.
export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-item]").forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, x: -16 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 85%", once: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} data-self-animated className="relative my-10 space-y-8 pl-8">
      <span className="absolute top-1 bottom-1 left-[5px] w-0.5 bg-paper-2" aria-hidden />
      <span data-rail className="absolute top-1 bottom-1 left-[5px] w-0.5 bg-accent" aria-hidden />
      {items.map((item) => (
        <li key={item.date + item.title} data-item className="relative">
          <span className="absolute top-1.5 -left-8 size-3 rounded-full border-2 border-paper bg-accent" aria-hidden />
          <p className="font-mono text-xs text-accent-ink">{item.date}</p>
          <p className="mt-0.5 font-semibold">{item.title}</p>
          {item.body && <p className="mt-1 text-ink-2">{item.body}</p>}
        </li>
      ))}
    </ol>
  );
}
