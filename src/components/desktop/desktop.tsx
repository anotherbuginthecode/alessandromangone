import { getCaseStudies } from "@/lib/content";
import { now, site } from "@/lib/site";
import { DesktopIcon } from "./desktop-icon";
import { Dock } from "./dock";
import { Terminal } from "./terminal";
import { Window } from "./window";

// Home hero: a developer's desktop. Folders open case studies, the dock holds the contacts.
export async function Desktop() {
  const studies = await getCaseStudies();

  return (
    <section id="top" className="dot-grid border-b border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-10 pb-8 lg:min-h-[calc(100svh-2.75rem)] lg:pt-12">
        <div className="grid flex-1 gap-10 lg:grid-cols-[176px_1fr_360px]">
          <ul className="grid grid-cols-4 content-start justify-items-center gap-1 sm:grid-cols-6 lg:grid-cols-2">
            {studies.map((study) => (
              <li key={study.slug}>
                <DesktopIcon href={`/work/${study.slug}`} label={study.meta.title} />
              </li>
            ))}
            <li>
              <DesktopIcon href="/blog" label="Blog" />
            </li>
            <li>
              <DesktopIcon href="/#about" label="about-me" kind="file" ext="md" />
            </li>
            <li>
              <DesktopIcon href={site.links.cv} label="CV" kind="file" ext="pdf" />
            </li>
          </ul>

          <div className="order-first flex flex-col justify-end gap-5 lg:order-none lg:pb-16">
            <p className="font-mono text-sm text-muted">{site.roles.join(" · ")}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              I&apos;m {site.firstName}. I lead engineering at{" "}
              <a href={site.company.href} target="_blank" rel="noreferrer" className="text-accent-ink underline decoration-2 underline-offset-4">
                {site.company.name}
              </a>
              .
            </h1>
            <p className="max-w-xl text-lg text-ink-2">{site.tagline}</p>
          </div>

          <div className="flex flex-col gap-4">
            <Terminal projects={studies.map((s) => ({ slug: s.slug, title: s.meta.title }))} />
            <Window title="now.md" className="bg-note!" bodyClassName="space-y-2 p-4 text-sm">
              {now.map((item) => (
                <p key={item.label}>
                  <span className="font-mono text-xs text-muted uppercase">{item.label}</span>
                  <br />
                  {item.value}
                </p>
              ))}
            </Window>
          </div>
        </div>

        <Dock />
      </div>
    </section>
  );
}
