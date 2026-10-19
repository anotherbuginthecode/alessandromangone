"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type CounterProps = { value: number; prefix?: string; suffix?: string; className?: string };

// Counts up to `value` the first time it scrolls into view. The server
// renders the final number, so it is correct without JavaScript.
export function Counter({ value, prefix = "", suffix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${value}${suffix}`;

  useGSAP(
    () => {
      const text = ref.current?.firstChild;
      if (!text) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { n: 0 };
        text.nodeValue = `${prefix}0${suffix}`;
        gsap.to(state, {
          n: value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top bottom", once: true },
          onUpdate: () => {
            text.nodeValue = `${prefix}${Math.round(state.n)}${suffix}`;
          },
        });
        return () => {
          text.nodeValue = final;
        };
      });
    },
    { scope: ref },
  );

  return (
    <span className={className}>
      <span ref={ref} aria-hidden>
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
