"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Opens a poster from a rounded inset as it enters the viewport and drifts
// its media ([data-poster-media]) for a light parallax.
export function PosterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(10% 5% 0% 5% round 32px)", autoAlpha: 0.4 },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 45%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          "[data-poster-media]",
          { y: 40 },
          { y: -40, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
