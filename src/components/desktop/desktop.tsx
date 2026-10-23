import { getCaseStudies, getPosts } from "@/lib/content";
import { isPlaceholder, now, site } from "@/lib/site";
import { Intro } from "../motion/intro";
import { DesktopIcon } from "./desktop-icon";
import { Dock } from "./dock";
import { DraggableWindows } from "./draggable-windows";
import { Terminal } from "./terminal";
import { Window } from "./window";

// Home hero: a developer's desktop. Folders open case studies, windows can be
// dragged around, and the dock holds the contacts. Like a real desktop it fills
// the screen: from 1440px up it keeps 80% of the width, the same share as on a
// laptop, and the type grows with the screen, capped by its height so the whole
// desktop stays in the first view.
export async function Desktop() {
  const [studies, posts] = await Promise.all([getCaseStudies(), getPosts()]);

  return (
    <section id="top" data-app="Terminal" data-app-file="~" className="overflow-hidden">
      <Intro className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-10 pb-8 lg:min-h-[calc(100svh-2.75rem)] lg:max-w-[max(72rem,80vw)] lg:pt-12">
        <div className="grid flex-1 gap-10 lg:grid-cols-[96px_1fr_300px] xl:grid-cols-[minmax(176px,12vw)_1fr_clamp(360px,25vw,36rem)]">
          <ul className="grid grid-cols-4 content-start justify-items-center gap-1 sm:grid-cols-6 lg:grid-cols-1 xl:grid-cols-2">
            {studies.map((study) => (
              <li key={study.slug} data-intro="icon">
                <DesktopIcon href={`/work/${study.slug}`} label={study.meta.title} />
              </li>
            ))}
            {posts.length > 0 && (
              <li data-intro="icon">
                <DesktopIcon href="/blog" label="Blog" />
              </li>
            )}
            <li data-intro="icon">
              <DesktopIcon href="/#about" label="about-me" kind="file" ext="md" />
            </li>
            {!isPlaceholder(site.links.cv) && (
              <li data-intro="icon">
                <DesktopIcon href={site.links.cv} label="CV" kind="file" ext="pdf" />
              </li>
            )}
          </ul>

          <div className="order-first flex flex-col justify-end gap-5 lg:order-none lg:pb-16">
            <p data-intro="up" className="font-mono text-sm text-balance text-muted lg:text-[clamp(0.875rem,0.97vw,1.125rem)]">
              {/* Each role stays on one line, so a narrow screen breaks at the separator. */}
              {site.roles.map((role, i) => (
                <span key={role}>
                  {i > 0 && " · "}
                  <span className="whitespace-nowrap">{role}</span>
                </span>
              ))}
            </p>
            <h1
              data-intro="up"
              className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[clamp(2.75rem,min(4.17vw,7.5vh),6rem)] lg:leading-none"
            >
              I&apos;m {site.firstName}.{" "}
              <span className="block text-balance text-accent-ink">{site.headline}</span>
            </h1>
            <p data-intro="up" className="max-w-xl text-lg text-ink-2 lg:max-w-[32em] lg:text-[clamp(1.125rem,min(1.25vw,2.3vh),1.5rem)] lg:leading-[1.6]">
              {site.tagline}
            </p>
          </div>

          <DraggableWindows className="flex flex-col gap-4">
            <div data-intro="pop" data-window className="relative">
              <Terminal projects={studies.map((s) => ({ slug: s.slug, title: s.meta.title }))} />
            </div>
            {now.length > 0 && (
              <div data-intro="pop" data-window className="relative">
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
            )}
          </DraggableWindows>
        </div>

        <div data-intro="pop">
          <Dock />
        </div>
      </Intro>
    </section>
  );
}
