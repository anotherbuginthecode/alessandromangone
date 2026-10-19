import { isPlaceholder, site } from "@/lib/site";

const links = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Book a call", href: site.links.calendar },
  { label: "CV", href: site.links.cv },
].filter((link) => !isPlaceholder(link.href));

export function Footer() {
  return (
    <footer id="contact" className="bg-terminal text-terminal-ink">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="font-mono text-sm text-accent">{"// contact"}</p>
        <p className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          Let&apos;s build a team that ships.
        </p>

        <ul className="mt-10 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <li key={link.label} className="border-b border-white/10">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between py-4 pr-4 font-mono text-sm hover:text-accent"
              >
                {link.label}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-mono text-sm text-terminal-muted">
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
