"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Thin bar under the menu bar that tracks how far the reader has scrolled.
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
    );
  });

  return <div ref={ref} aria-hidden className="fixed inset-x-0 top-11 z-40 h-0.5 origin-left scale-x-0 bg-accent" />;
}
