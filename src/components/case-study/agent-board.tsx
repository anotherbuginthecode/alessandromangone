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
];

const paths: Record<Autonomy, Column[]> = {
  auto: ["todo", "progress", "review", "done"],
  supervised: ["todo", "human", "progress", "review", "human", "done"],
};

// Every card is done by tick 8; the board holds that view for two ticks, then restarts.
const LAST_TICK = 10;
const STATIC_TICK = 4;
const STEP_MS = 1300;

// Fixed sizes keep the board from resizing while cards move: a column fits
// every card at once (tick 0 and the last ticks put all of them in one column).
const CARD_HEIGHT = "h-[7.75rem]";
const LIST_HEIGHT = "h-[32.5rem]"; // 4 cards + 3 gaps

function place(card: Card, tick: number) {
  const path = paths[card.autonomy];
  const step = Math.min(Math.max(tick - card.start, 0), path.length - 1);
  return { column: path[step], step };
}

function status(card: Card, column: Column, step: number) {
  if (column === "todo") return "waiting";
  if (column === "progress") return "agent is coding";
  if (column === "review") return "independent review + CI";
  if (column === "human") return step === 1 ? "waiting for “Approved”" : "ready to merge";
  return card.autonomy === "auto" ? "merged by the agent" : "merged by a human";
}

export function AgentBoard({ className = "my-14" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef<Flip.FlipState | null>(null);
  const restarting = useRef(false);
  const visible = useRef(false);
  const tickRef = useRef(STATIC_TICK);
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
          if (!visible.current || !root.current || restarting.current) return;
          const nodes = root.current.querySelectorAll("[data-card]");
          if (tickRef.current < LAST_TICK) {
            pending.current = Flip.getState(nodes);
            setTick(tickRef.current + 1);
            return;
          }
          // Restart by fading out of Done and back into Todo instead of
          // flying every card across the board.
          restarting.current = true;
          gsap.to(nodes, { autoAlpha: 0, duration: 0.3, onComplete: () => setTick(0) });
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
    tickRef.current = tick;
    const nodes = root.current?.querySelectorAll("[data-card]");
    if (!nodes) return;
    if (restarting.current && tick === 0) {
      restarting.current = false;
      gsap.fromTo(nodes, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 });
      return;
    }
    if (!pending.current) return;
    // Cards stay in the layout (no absolute positioning), so the board keeps its size.
    Flip.from(pending.current, { duration: 0.6, ease: "power2.inOut" });
    pending.current = null;
  }, [tick]);

  return (
    <figure className={className}>
      <div ref={root} className="relative overflow-x-auto rounded-3xl bg-paper-2 p-3 sm:p-4">
        <div className="grid min-w-[880px] grid-cols-5 gap-3">
          {columns.map((column) => {
            const inColumn = cards.filter((card) => place(card, tick).column === column.id);
            return (
              <div key={column.id} className={`rounded-xl p-2 ${column.id === "human" ? "bg-[#fef3c7]" : "bg-card/60"}`}>
                <p className="mb-2 flex items-center justify-between px-1 font-mono text-[11px] text-muted uppercase">
                  {column.label}
                  <span>{inColumn.length}</span>
                </p>
                <ul className={`flex flex-col gap-2 ${LIST_HEIGHT}`}>
                  {inColumn.map((card) => {
                    const { step } = place(card, tick);
                    return (
                      <li
                        key={card.id}
                        data-card
                        data-flip-id={card.id}
                        className={`flex shrink-0 flex-col overflow-hidden rounded-lg border border-line bg-card p-2.5 shadow-sm ${CARD_HEIGHT}`}
                      >
                        <p className="line-clamp-2 text-[13px] leading-snug font-semibold">{card.title}</p>
                        <p className="mt-auto flex flex-col items-start gap-1 pt-2 font-mono text-[10px]">
                          <span className="rounded bg-paper-2 px-1.5 py-0.5">area:{card.area}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 ${
                              card.autonomy === "auto" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#92400e]"
                            }`}
                          >
                            autonomy:{card.autonomy}
                          </span>
                        </p>
                        <p className="mt-1.5 truncate text-[11px] text-muted">{status(card, column.id, step)}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-3 grid gap-2 text-[13px] text-muted sm:grid-cols-2">
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
