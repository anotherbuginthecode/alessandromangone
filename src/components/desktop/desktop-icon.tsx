import Image from "next/image";
import Link from "next/link";

type DesktopIconProps = {
  href: string;
  label: string;
  kind?: "folder" | "file";
  ext?: string;
};

export function DesktopIcon({ href, label, kind = "folder", ext = "md" }: DesktopIconProps) {
  return (
    <Link
      href={href}
      className="group flex w-20 flex-col items-center gap-1.5 rounded-lg p-1.5 text-center outline-none hover:bg-ink/5 focus-visible:bg-ink/5 focus-visible:ring-2 focus-visible:ring-accent"
    >
      {kind === "folder" ? <FolderGlyph /> : <FileGlyph ext={ext} />}
      <span className="rounded px-1 font-mono text-[11px] leading-tight text-ink-2 group-hover:bg-accent group-hover:text-white group-focus-visible:bg-accent group-focus-visible:text-white">
        {label}
      </span>
    </Link>
  );
}

function FolderGlyph() {
  return (
    <svg viewBox="0 0 64 52" className="h-12 w-14 drop-shadow-sm transition-transform group-hover:-translate-y-0.5" aria-hidden>
      <path d="M4 8a4 4 0 0 1 4-4h16l6 6h26a4 4 0 0 1 4 4v4H4z" className="fill-folder-back" />
      <rect x="2" y="14" width="60" height="36" rx="4" className="fill-folder" />
    </svg>
  );
}

const fileTypeIcons: Record<string, string> = {
  md: "/app-icons/markdown.svg",
  pdf: "/app-icons/pdf.svg",
};

function FileGlyph({ ext }: { ext: string }) {
  return (
    <span className="relative block h-12 w-12 transition-transform group-hover:-translate-y-0.5">
      <svg viewBox="0 0 48 56" className="h-12 w-12 drop-shadow-sm" aria-hidden>
        <path d="M6 2h26l12 12v38a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" className="fill-card stroke-line" strokeWidth="1.5" />
        <path d="M32 2v10a2 2 0 0 0 2 2h10" className="fill-paper-2 stroke-line" strokeWidth="1.5" />
      </svg>
      <Image
        src={fileTypeIcons[ext] ?? fileTypeIcons.md}
        alt=""
        width={22}
        height={22}
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2"
      />
    </span>
  );
}
