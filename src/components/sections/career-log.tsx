import { career } from "@/lib/site";
import { Window } from "../desktop/window";
import { SectionHeading } from "../section-heading";

// The career timeline, told as a git history.
export function CareerLog() {
  return (
    <section id="career" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading eyebrow="career" title="Every role was a commit. Here is the log." />
      <Window title="~/career: git log --graph --oneline" dark bodyClassName="overflow-x-auto p-5 font-mono text-[13px] leading-7">
        <ol>
          {career.map((entry, i) => (
            <li key={entry.hash} className="whitespace-nowrap">
              <span className="text-accent">*</span> <span className="text-[#e5c07b]">{entry.hash}</span>{" "}
              {entry.refs && <span className="text-[#61afef]">({entry.refs}) </span>}
              <span className="text-terminal-muted">{entry.year}</span>{" "}
              <span className="font-semibold text-white">{entry.role}</span> @ {entry.company}
              <span className="text-terminal-muted"> · {entry.note}</span>
              {i < career.length - 1 && (
                <span className="block text-accent" aria-hidden>
                  |
                </span>
              )}
            </li>
          ))}
        </ol>
      </Window>
    </section>
  );
}
