import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { AgentBoard } from "@/components/case-study/agent-board";
import { Cards, Principles, Steps } from "@/components/case-study/blocks";
import { FlowDiagram } from "@/components/case-study/flow-diagram";
import { BrowserFrame, PhoneFrame } from "@/components/case-study/frames";
import { Quote } from "@/components/case-study/quote";
import { ScreenBoard } from "@/components/case-study/screen-board";
import { StateMachine } from "@/components/case-study/state-machine";

// Building blocks available in every MDX file without importing them.
// Text keeps a 52rem reading column (about 100 characters a line); figures and blocks
// use the full width. Headings wrap with text-pretty, which fills each line and only
// avoids a lone last word, instead of text-balance, which halves short headings.

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-20 mb-5 max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-pretty sm:text-4xl" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="mt-8 mb-2 max-w-[52rem] text-lg font-semibold" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="my-4 max-w-[52rem] leading-relaxed text-ink-2 sm:text-lg" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-6 max-w-[52rem] space-y-3 text-ink-2 sm:text-lg [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-accent-ink [&>li]:before:content-['→']"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 max-w-[52rem] list-decimal space-y-2 pl-6 text-ink-2 sm:text-lg" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-accent-ink underline underline-offset-2 hover:text-ink" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 max-w-[52rem] border-l-2 border-accent pl-4 text-lg italic" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 max-w-[52rem] overflow-x-auto rounded-xl bg-terminal p-4 font-mono text-sm text-terminal-ink [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  AgentBoard,
  BrowserFrame,
  Cards,
  FlowDiagram,
  PhoneFrame,
  Principles,
  Quote,
  ScreenBoard,
  StateMachine,
  Steps,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
