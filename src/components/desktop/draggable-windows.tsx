"use client";

import { useRef, type ReactNode } from "react";
import { Draggable, gsap, useGSAP } from "@/lib/gsap";

// Lets visitors drag the desktop windows ([data-window]) by their title bar,
// on large screens with a mouse only. Dragged windows come to the front.
export function DraggableWindows({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (pointer: fine)", () => {
        const bounds = ref.current?.closest("section") ?? undefined;
        const draggables = gsap.utils.toArray<HTMLElement>("[data-window]").map(
          (el) =>
            Draggable.create(el, {
              trigger: el.querySelector<HTMLElement>("[data-drag-handle]") ?? el,
              bounds,
              zIndexBoost: true,
              edgeResistance: 0.85,
            })[0],
        );
        return () => draggables.forEach((d) => d.kill());
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
