import { site } from "@/lib/site";

const claudePrompt = encodeURIComponent(
  `Tell me about ${site.name}, ${site.roles.join(" and ")}. What kind of engineering leader is ${site.firstName}?`,
);

const apps = [
  { label: "Email", glyph: "@", href: `mailto:${site.email}`, className: "bg-[#e9473f] text-white" },
  { label: "LinkedIn", glyph: "in", href: site.links.linkedin, className: "bg-[#0a66c2] text-white" },
  { label: "GitHub", glyph: "gh", href: site.links.github, className: "bg-[#1f2328] text-white" },
  { label: "Book a call", glyph: "cal", href: site.links.calendar, className: "bg-card text-[#e9473f]" },
  { label: "CV", glyph: "cv", href: site.links.cv, className: "bg-note text-ink" },
  { label: "Ask Claude about me", glyph: "✳", href: `https://claude.ai/new?q=${claudePrompt}`, className: "bg-[#d97757] text-white" },
];

// Contact links styled as a macOS dock.
export function Dock() {
  return (
    <nav aria-label="Contact" className="mx-auto w-fit max-w-full overflow-x-auto rounded-2xl border border-line bg-card/70 p-2 shadow-lg backdrop-blur">
      <ul className="flex items-end gap-2">
        {apps.map((app) => (
          <li key={app.label} className="group relative">
            <a
              href={app.href}
              target={app.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={app.label}
              className={`grid size-11 place-items-center rounded-xl border border-line font-mono text-sm font-semibold shadow-sm transition-transform duration-150 hover:-translate-y-1.5 hover:scale-110 focus-visible:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-accent ${app.className}`}
            >
              {app.glyph}
            </a>
            <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[11px] text-paper group-hover:block">
              {app.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
