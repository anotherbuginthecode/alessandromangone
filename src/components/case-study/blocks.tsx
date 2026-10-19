import { Counter } from "@/components/motion/counter";
import type { Stat } from "@/lib/content";

type Item = { title: string; body: string };

// Two columns of cards: who or what owns each area of the work.
export function Cards({ items }: { items: Item[] }) {
  return (
    <ul className="my-10 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="rounded-2xl border border-line bg-card p-6">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

// Numbered process rows. `label` replaces the number, for example with a date.
export function Steps({ items }: { items: { title: string; body?: string; label?: string }[] }) {
  return (
    <ol className="my-10 border-t border-line">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="grid gap-2 border-b border-line py-6 sm:grid-cols-[110px_1fr] lg:grid-cols-[110px_280px_1fr] lg:gap-8"
        >
          <span className="pt-1 font-mono text-xs text-accent-ink">{item.label ?? String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-lg leading-snug font-semibold">{item.title}</h3>
          {item.body && <p className="leading-relaxed text-ink-2 sm:col-start-2 lg:col-start-auto">{item.body}</p>}
        </li>
      ))}
    </ol>
  );
}

// A grid of principles, each under a heavy rule.
export function Principles({ items }: { items: Item[] }) {
  return (
    <ul className="my-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title} className="border-t-2 border-ink pt-4">
          <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

const statColumns: Record<number, string> = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" };

// The closing panel of a case study: its numbers, large.
export function StatsPanel({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="Results" className="rounded-3xl border border-line bg-card p-3 sm:p-4">
      <dl className={`grid gap-3 ${statColumns[stats.length] ?? "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse items-center justify-end rounded-2xl border border-line bg-paper px-6 py-10 text-center">
            <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
            <dd className="text-6xl font-light tracking-tight">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
