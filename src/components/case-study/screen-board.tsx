"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Screen = { src: string; alt: string; caption: string };

// A board of real app screens with captions, on the project's own background.
// Desktop shows a grid with a light parallax between columns; mobile scrolls sideways.
export function ScreenBoard({ screens, caption }: { screens: Screen[]; caption?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-screen]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          },
        );
      });
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-screen]").forEach((el, i) => {
          const drift = i % 3 === 1 ? 7 : -3;
          gsap.fromTo(
            el,
            { yPercent: drift },
            {
              yPercent: -drift,
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} data-self-animated className="my-14">
      <div className="dot-grid-dark rounded-3xl bg-[var(--cs-bg)] px-4 py-10 sm:px-8 sm:py-14">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:mx-auto md:grid md:max-w-4xl md:grid-cols-3 md:gap-x-6 md:gap-y-12 md:overflow-visible md:pb-0">
          {screens.map((screen) => (
            <li key={screen.src} data-screen className="w-[62%] shrink-0 snap-center md:w-auto">
              <Image
                src={screen.src}
                alt={screen.alt}
                width={600}
                height={1298}
                sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 62vw"
                className="h-auto w-full rounded-[1.4rem] shadow-2xl ring-1 ring-white/10"
              />
              <p className="mt-3 text-sm leading-snug text-white/70">{screen.caption}</p>
            </li>
          ))}
        </ul>
      </div>
      {caption && <figcaption className="mt-3 text-[13px] text-muted">{caption}</figcaption>}
    </figure>
  );
}
