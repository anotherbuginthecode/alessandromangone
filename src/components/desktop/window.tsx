import type { ReactNode } from "react";

type WindowProps = {
  title: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
  bodyClassName?: string;
};

// macOS-style window chrome shared by the terminal, notes and section cards.
export function Window({ title, children, dark = false, className = "", bodyClassName = "" }: WindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)] ${
        dark ? "border-white/10 bg-terminal text-terminal-ink" : "border-line bg-card"
      } ${className}`}
    >
      <div data-drag-handle className={`flex items-center gap-2 border-b px-3 py-2 ${dark ? "border-white/10" : "border-line"}`}>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <p className={`flex-1 truncate text-center font-mono text-xs ${dark ? "text-terminal-muted" : "text-muted"}`}>
          {title}
        </p>
        <span className="w-[52px]" aria-hidden />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
