import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { AgentBoard } from "@/components/case-study/agent-board";
import { FlowDiagram } from "@/components/case-study/flow-diagram";
import { BrowserFrame, PhoneFrame } from "@/components/case-study/frames";
import { Quote } from "@/components/case-study/quote";
import { StateMachine } from "@/components/case-study/state-machine";
import { Timeline } from "@/components/case-study/timeline";
import { Counter } from "@/components/motion/counter";

// Building blocks available in every MDX file without importing them.

type Metric = { value: string | number; label: string; prefix?: string; suffix?: string };

// Numeric values count up on scroll; string values (like "18/18") render as is.
function Metrics({ items }: { items: Metric[] }) {
  return (
    <dl className={`my-8 grid grid-cols-2 gap-4 ${items.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col-reverse justify-end rounded-xl border border-line bg-card p-4">
          <dt className="mt-1 text-xs text-muted">{item.label}</dt>
          <dd className="font-mono text-3xl font-semibold text-accent-ink">
            {typeof item.value === "number" ? (
              <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="my-8 rounded-xl border border-line border-l-4 border-l-accent bg-card p-5">
      <p className="font-mono text-xs text-accent-ink uppercase">{title}</p>
      <div className="[&>p]:my-2">{children}</div>
    </aside>
  );
}

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-20 mb-5 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="mt-8 mb-2 text-lg font-semibold" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="my-4 leading-relaxed text-ink-2" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-4 space-y-2 text-ink-2 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-accent-ink [&>li]:before:content-['→']"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="my-4 list-decimal space-y-2 pl-6 text-ink-2" {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-accent-ink underline underline-offset-2 hover:text-ink" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 border-l-2 border-accent pl-4 text-lg italic" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-terminal p-4 font-mono text-sm text-terminal-ink [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  Metrics,
  Callout,
  AgentBoard,
  BrowserFrame,
  FlowDiagram,
  PhoneFrame,
  Quote,
  StateMachine,
  Timeline,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
