"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Entrance animation on page load for elements marked with data-intro:
// "up" slides text in, "pop" scales windows and cards in.
export function Intro({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
        tl.from("[data-intro='up']", { autoAlpha: 0, y: 32, duration: 0.8, stagger: 0.09 })
          .from("[data-intro='pop']", { autoAlpha: 0, scale: 0.92, y: 24, duration: 0.7, stagger: 0.12 }, "-=0.55")
          .from("[data-intro='icon']", { autoAlpha: 0, y: 12, duration: 0.4, stagger: 0.05 }, "-=0.5");
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
