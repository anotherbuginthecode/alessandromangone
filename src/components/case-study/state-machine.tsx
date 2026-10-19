"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type State = { label: string; note: string; movedBy?: string };
type StateMachineProps = { states: State[]; exits?: string[]; caption?: string };

// A vertical state machine that lights up step by step as the reader scrolls.
export function StateMachine({ states, exits = [], caption }: StateMachineProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
        });
        // Explicit end values: ScrollTrigger refreshes must never record a hidden state as the target.
        tl.fromTo("[data-rail]", { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", duration: states.length }, 0);
        states.forEach((_, i) => {
          tl.fromTo(`[data-state='${i}']`, { autoAlpha: 0.25, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.6 }, i).fromTo(
            `[data-dot='${i}']`,
            { scale: 0.3 },
            { scale: 1, duration: 0.4 },
            i,
          );
        });
        if (exits.length) tl.fromTo("[data-exits]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 });
      });
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} data-self-animated className="my-12 rounded-2xl border border-line bg-card p-5 sm:p-8">
      <div className="relative">
        <span className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-paper-2" aria-hidden />
        <span data-rail className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-accent" aria-hidden />
        <ol className="space-y-6">
          {states.map((state, i) => (
            <li key={state.label} data-state={i} className="relative grid gap-1 pl-9 sm:grid-cols-[180px_1fr] sm:gap-6">
              <span data-dot={i} className="absolute top-1 left-0 size-4 rounded-full border-2 border-card bg-accent shadow" aria-hidden />
              <p className="font-mono text-sm font-semibold">{state.label}</p>
              <div>
                <p className="text-ink-2">{state.note}</p>
                {state.movedBy && <p className="mt-0.5 font-mono text-[11px] text-muted">moves when: {state.movedBy}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
      {exits.length > 0 && (
        <div data-exits className="mt-8 border-t border-dashed border-line pt-5">
          <p className="font-mono text-[11px] text-muted uppercase">Every other way out</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {exits.map((exit) => (
              <li key={exit} className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-ink-2">
                {exit}
              </li>
            ))}
          </ul>
        </div>
      )}
      {caption && <figcaption className="mt-5 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
