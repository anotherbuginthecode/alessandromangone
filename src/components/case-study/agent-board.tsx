"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Flip, gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Column = "todo" | "progress" | "review" | "human" | "done";
type Autonomy = "auto" | "supervised";
type Card = { id: string; title: string; area: string; autonomy: Autonomy; start: number };

const columns: { id: Column; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "progress", label: "In progress" },
  { id: "review", label: "In review" },
  { id: "human", label: "Needs human" },
  { id: "done", label: "Done" },
];

// Illustrative issues; the paths follow the board rules in the repository.
const cards: Card[] = [
  { id: "a", title: "Reminder for unpaid matches", area: "backend", autonomy: "auto", start: 0 },
  { id: "b", title: "Payments table and access rules", area: "backend", autonomy: "supervised", start: 1 },
  { id: "c", title: "Slot picker shows local time", area: "mobile", autonomy: "auto", start: 2 },
  { id: "d", title: "Report and block a user", area: "mobile", autonomy: "supervised", start: 3 },
  { id: "e", title: "Copy on the venue wait screen", area: "mobile", autonomy: "auto", start: 4 },
];

const paths: Record<Autonomy, Column[]> = {
  auto: ["todo", "progress", "review", "done"],
  supervised: ["todo", "human", "progress", "review", "human", "done"],
};

const LAST_TICK = 10;
const STATIC_TICK = 4;
const STEP_MS = 1300;

function place(card: Card, tick: number) {
  const path = paths[card.autonomy];
  const step = Math.min(Math.max(tick - card.start, 0), path.length - 1);
  return { column: path[step], step };
}

function status(card: Card, column: Column, step: number) {
  if (column === "todo") return "waiting";
  if (column === "progress") return "agent is coding";
  if (column === "review") return "independent review + CI";
  if (column === "human") return step === 1 ? "plan posted, waiting for “Approved”" : "proof posted, ready to merge";
  return card.autonomy === "auto" ? "merged after Approve + green CI" : "merged by a human";
}

export function AgentBoard({ className = "my-12 lg:-mx-20" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef<Flip.FlipState | null>(null);
  const visible = useRef(false);
  const [tick, setTick] = useState(STATIC_TICK);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top 85%",
          end: "bottom 15%",
          onToggle: (self) => {
            visible.current = self.isActive;
          },
        });
        const timer = window.setInterval(() => {
          if (!visible.current || !root.current) return;
          pending.current = Flip.getState(root.current.querySelectorAll("[data-card]"));
          setTick((t) => (t >= LAST_TICK ? 0 : t + 1));
        }, STEP_MS);
        return () => {
          window.clearInterval(timer);
          trigger.kill();
        };
      });
    },
    { scope: root },
  );

  useLayoutEffect(() => {
    if (!pending.current) return;
    Flip.from(pending.current, { duration: 0.6, ease: "power2.inOut", absolute: true });
    pending.current = null;
  }, [tick]);

  return (
    <figure className={className}>
      <div ref={root} className="overflow-x-auto rounded-2xl border border-line bg-paper-2 p-3">
        <div className="grid min-w-[720px] grid-cols-5 gap-3">
          {columns.map((column) => (
            <div key={column.id} className={`rounded-xl p-2 ${column.id === "human" ? "bg-[#fef3c7]" : "bg-card/60"}`}>
              <p className="mb-2 flex items-center justify-between px-1 font-mono text-[11px] text-muted uppercase">
                {column.label}
                <span>{cards.filter((card) => place(card, tick).column === column.id).length}</span>
              </p>
              <ul className="flex min-h-48 flex-col gap-2">
                {cards
                  .filter((card) => place(card, tick).column === column.id)
                  .map((card) => {
                    const { step } = place(card, tick);
                    return (
                      <li
                        key={card.id}
                        data-card
                        data-flip-id={card.id}
                        className="rounded-lg border border-line bg-card p-2.5 shadow-sm"
                      >
                        <p className="text-[13px] leading-snug font-semibold">{card.title}</p>
                        <p className="mt-2 flex flex-wrap gap-1 font-mono text-[10px]">
                          <span className="rounded bg-paper-2 px-1.5 py-0.5">area:{card.area}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 ${
                              card.autonomy === "auto" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#92400e]"
                            }`}
                          >
                            autonomy:{card.autonomy}
                          </span>
                        </p>
                        <p className="mt-2 text-[11px] text-muted">{status(card, column.id, step)}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
        <p>
          <span className="rounded bg-[#dcfce7] px-1.5 py-0.5 font-mono text-xs text-[#166534]">autonomy:auto</span>{" "}
          The agent delivers end to end and merges after an independent review approves and CI is green.
        </p>
        <p>
          <span className="rounded bg-[#fef3c7] px-1.5 py-0.5 font-mono text-xs text-[#92400e]">autonomy:supervised</span>{" "}
          The agent posts a plan and stops. It codes after a human approves, and a human merges.
        </p>
      </figcaption>
    </figure>
  );
}
