import Link from "next/link";
import { AgentBoard } from "../case-study/agent-board";
import { SectionHeading } from "../section-heading";

// The agent workflow, shown live: the same board rules used on Matcha.
export function HowIWork() {
  return (
    <section id="how-i-work" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="how I work"
          title="Issues in, tested pull requests out."
          description="Engineers and coding agents share one board. Every issue says how far an agent may go alone. People approve the risky plans and own what ships. This is the board behind Matcha, running live."
        />
        <AgentBoard className="my-0" />
        <Link href="/work/matcha" className="mt-8 inline-block font-mono text-sm text-accent-ink hover:underline">
          See it in the Matcha case study →
        </Link>
      </div>
    </section>
  );
}
