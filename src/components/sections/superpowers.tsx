import Link from "next/link";
import { superpowers } from "@/lib/site";
import { SectionHeading } from "../section-heading";

export function Superpowers() {
  return (
    <section id="superpowers" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          eyebrow="superpowers"
          title="[What I bring to an engineering org.]"
          description="[Four pillars, each backed by numbers and a case study.]"
        />
        <ol className="divide-y divide-line border-y border-line">
          {superpowers.map((power, i) => (
            <li key={power.area} className="grid gap-8 py-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="font-mono text-xs text-muted uppercase">
                  Superpower nº{i + 1} · {power.area}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{power.title}</h3>
                <p className="mt-3 max-w-md text-ink-2">{power.body}</p>
                <Link href={power.href} className="mt-4 inline-block font-mono text-sm text-accent-ink hover:underline">
                  {power.cta} →
                </Link>
              </div>
              <dl className="grid grid-cols-3 gap-4 self-end">
                {power.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg bg-paper p-4">
                    <dt className="sr-only">{metric.label}</dt>
                    <dd className="font-mono text-2xl font-semibold">{metric.value}</dd>
                    <dd className="mt-1 text-xs text-muted">{metric.label}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
