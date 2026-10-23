import Image from "next/image";
import { isPlaceholder, site } from "@/lib/site";
import { Window } from "./desktop/window";

const channels = [
  { label: "Email", icon: "/app-icons/gmail.svg", href: `mailto:${site.email}` },
  { label: "LinkedIn", icon: "/app-icons/linkedin.svg", href: site.links.linkedin },
  { label: "GitHub", icon: "/app-icons/github.svg", href: site.links.github },
  { label: "Book a call", icon: "/app-icons/calendar.svg", href: site.links.calendar },
  { label: "CV", icon: "/app-icons/pdf.svg", href: site.links.cv },
].filter((channel) => !isPlaceholder(channel.href));

const field = "flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-baseline sm:gap-4";
const fieldLabel = "w-16 shrink-0 text-sm text-muted";

// Contact, as a message already addressed and waiting to be sent.
export function Footer() {
  return (
    <footer id="contact" data-app="Mail" data-app-file="New Message" className="dot-grid-dark bg-terminal text-terminal-ink">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="font-mono text-sm text-accent">{"// contact"}</p>

        <Window title="New Message" className="mt-6 max-w-3xl text-ink" bodyClassName="divide-y divide-line">
          <p className={field}>
            <span className={fieldLabel}>To:</span>
            <span className="w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-sm text-accent-ink">{site.name}</span>
          </p>
          <div className={field}>
            <span className={fieldLabel}>Subject:</span>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Let&apos;s build something that works without you.</h2>
          </div>
          <div className="px-5 py-6">
            <p className="max-w-xl text-ink-2">
              Got an AI agent stuck in demo mode? Hiring an applied AI or forward deployed engineer, an AI architect, or a tech
              lead who still writes code? Tell me about it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <Image src={channel.icon} alt="" width={18} height={18} className="size-[18px] object-contain" />
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Window>

        <p className="mt-10 font-mono text-sm text-terminal-muted">
          Based in {site.location}
          {!isPlaceholder(site.status) && ` · ${site.status}`}
        </p>

        {/* Folded paragraph for search engines, as on jacopomarcolini.com. */}
        <details className="mt-10 max-w-3xl text-sm text-terminal-muted">
          <summary className="cursor-pointer font-mono">✱ SEO footnote</summary>
          <p className="mt-3">{site.description}</p>
        </details>

        <p className="mt-10 border-t border-white/10 pt-6 font-mono text-xs text-terminal-muted">
          © {site.name} · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
