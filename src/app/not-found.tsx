import Link from "next/link";
import { Window } from "@/components/desktop/window";

export default function NotFound() {
  return (
    <div className="dot-grid grid min-h-[70svh] place-items-center px-4">
      <Window title="zsh" dark className="w-full max-w-lg" bodyClassName="p-5 font-mono text-sm leading-7">
        <p>
          <span className="text-accent">~ % </span>cd this-page
        </p>
        <p className="text-terminal-muted">cd: no such file or directory: this-page</p>
        <p>
          <span className="text-accent">~ % </span>
          <Link href="/" className="underline hover:text-accent">
            cd ~
          </Link>
        </p>
      </Window>
    </div>
  );
}
