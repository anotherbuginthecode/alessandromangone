"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type App = { name: string; file?: string };

const read = (el: Element): App => {
  const { app = "Finder", appFile } = (el as HTMLElement).dataset;
  return { name: app, file: appFile };
};

// The menu bar names the app in front, like macOS. Each section declares its
// app with data-app (and optionally data-app-file); the one crossing a thin band
// a third of the way down the viewport wins.
export function ActiveApp() {
  const pathname = usePathname();
  const [app, setApp] = useState<App>({ name: "Finder" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setApp(read(hit.target));
      },
      { rootMargin: "-33% 0px -66% 0px" },
    );
    document.querySelectorAll("[data-app]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    // Fixed width, so the menus next to it do not shift when the name changes.
    <p aria-hidden className="flex w-[4.75rem] shrink-0 items-baseline gap-2 whitespace-nowrap md:w-64">
      <span key={app.name} className="font-semibold motion-safe:animate-[app-in_0.3s_ease-out]">
        {app.name}
      </span>
      {app.file && <span className="hidden min-w-0 truncate text-muted md:block">{app.file}</span>}
    </p>
  );
}
