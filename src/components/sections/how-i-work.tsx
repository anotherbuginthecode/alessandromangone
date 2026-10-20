import Link from "next/link";
import { AgentBoard } from "../case-study/agent-board";
import { SectionHeading } from "../section-heading";

// The agent workflow, shown live: the same board rules used on Matcha.
export function HowIWork() {
  return (
    <section id="how-i-work" data-app="Board" data-app-file="matcha">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="how I work"
          title="The leverage is in the rules, not the prompts."
          description="Issues in, tested pull requests out. Engineers and coding agents share one board, every issue says how far an agent may go alone, and people own what ships. This is the board behind Matcha, running live."
        />
        <AgentBoard className="my-0" />
        <Link href="/work/matcha" className="mt-8 inline-block font-mono text-sm text-accent-ink hover:underline">
          See it in the Matcha case study →
        </Link>
      </div>
    </section>
  );
}
