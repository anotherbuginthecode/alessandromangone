import Link from "next/link";
import { getPosts } from "@/lib/content";
import { isPlaceholder, site } from "@/lib/site";
import { ActiveApp } from "./desktop/active-app";

// The site navigation, shaped like the macOS menu bar: logo, the app in front, menus.
export async function MenuBar() {
  const hasPosts = (await getPosts()).length > 0;
  const items = [
    { href: "/work", label: "Work" },
    ...(hasPosts ? [{ href: "/blog", label: "Blog" }] : []),
    { href: "/#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur">
      <nav className="mx-auto flex h-11 max-w-6xl items-center gap-5 px-4 font-mono text-[13px]">
        <Link href="/" className="font-semibold whitespace-nowrap">
          ◆<span className="sr-only sm:not-sr-only"> {site.firstName.toLowerCase()}</span>
        </Link>
        <ActiveApp />
        <ul className="flex items-center gap-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-ink-2 hover:text-accent-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {!isPlaceholder(site.status) && (
          <p className="ml-auto hidden items-center gap-2 whitespace-nowrap text-muted lg:flex">
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            {site.status}
          </p>
        )}
      </nav>
    </header>
  );
}
