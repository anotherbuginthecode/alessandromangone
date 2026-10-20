import Image from "next/image";
import { isPlaceholder, site } from "@/lib/site";

const claudePrompt = encodeURIComponent(
  `Tell me about ${site.name}, ${site.roles.join(" and ")}. What kind of engineering leader is ${site.firstName}?`,
);

// Brand icons live in public/app-icons (Iconify "logos" set, CC0; PDF from "vscode-icons", MIT).
// `fill` icons are already app tiles and cover the whole tile.
const apps = [
  { label: "Email", icon: "/app-icons/gmail.svg", href: `mailto:${site.email}`, tile: "bg-white", size: 26 },
  { label: "LinkedIn", icon: "/app-icons/linkedin.svg", href: site.links.linkedin, tile: "bg-white", size: 44, fill: true },
  { label: "GitHub", icon: "/app-icons/github.svg", href: site.links.github, tile: "bg-white", size: 28 },
  { label: "Book a call", icon: "/app-icons/calendar.svg", href: site.links.calendar, tile: "bg-white", size: 26 },
  { label: "CV", icon: "/app-icons/pdf.svg", href: site.links.cv, tile: "bg-white", size: 28 },
  {
    label: "Ask Claude about me",
    icon: "/app-icons/claude.svg",
    href: `https://claude.ai/new?q=${claudePrompt}`,
    tile: "bg-[#f4f0e8]",
    size: 26,
  },
].filter((app) => !isPlaceholder(app.href));

// Contact links styled as a macOS dock. No overflow clipping: the hover lift and
// the labels must show above the dock, and six icons fit even on a phone.
export function Dock() {
  return (
    <nav aria-label="Contact" className="mx-auto w-fit max-w-full rounded-2xl border border-line bg-card/70 p-2 shadow-lg backdrop-blur">
      <ul className="flex items-end gap-2">
        {apps.map((app) => (
          <li key={app.label} className="group relative">
            <a
              href={app.href}
              target={app.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={app.label}
              className={`grid size-11 place-items-center overflow-hidden rounded-xl shadow-sm ring-1 ring-black/10 transition-transform duration-150 hover:-translate-y-1.5 hover:scale-110 focus-visible:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-accent ${app.tile}`}
            >
              <Image
                src={app.icon}
                alt=""
                width={app.size}
                height={app.size}
                className={app.fill ? "size-full scale-110 object-cover" : "object-contain"}
              />
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
