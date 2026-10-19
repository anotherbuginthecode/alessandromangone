import Image from "next/image";
import type { CaseStudyCover } from "@/lib/content";
import { BrowserFrame, PhoneFrame } from "./frames";

type CaseCoverProps = { cover: CaseStudyCover; priority?: boolean };

// The visual of a case study, shared by its page hero and its poster on the home page.
export function CaseCover({ cover, priority }: CaseCoverProps) {
  if (cover.kind === "browser") {
    return (
      <div className="relative">
        {cover.art && (
          <Image
            src={cover.art}
            alt=""
            width={393}
            height={852}
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-6 w-2/5 opacity-90 select-none"
          />
        )}
        <BrowserFrame src={cover.src} alt={cover.alt} url={cover.url} priority={priority} className="relative w-[88%]" />
        {cover.mobileSrc && (
          <PhoneFrame
            src={cover.mobileSrc}
            alt=""
            priority={priority}
            className="absolute right-0 -bottom-8 w-[27%] rotate-3"
          />
        )}
      </div>
    );
  }

  if (cover.kind === "logo") {
    return (
      <div className="relative grid place-items-center py-6">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={640}
          height={640}
          priority={priority}
          className="w-3/5 max-w-xs -rotate-6 drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)] motion-safe:animate-[wobble_6s_ease-in-out_infinite]"
        />
        <GameCard />
      </div>
    );
  }

  return (
    <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-white/10 bg-white/5">
      <span className="text-7xl font-semibold tracking-tight text-[var(--cs-accent)] sm:text-8xl">{cover.label}</span>
    </div>
  );
}

// A reconstruction of one round of Standard mode, built from its rules:
// 5 actors, 30 seconds in total, 1 correct movie out of 3 options.
function GameCard() {
  const options = ["Fargo", "Office Space", "Barry"];
  return (
    <div className="-mt-6 w-full max-w-sm rounded-2xl border border-white/10 bg-[#181818] p-4 shadow-2xl">
      <div className="flex items-center justify-between font-mono text-[11px] text-white/50">
        <span>ACTOR 3 / 5 · STANDARD</span>
        <span className="text-[var(--cs-accent)]">0:18</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-full bg-white/10 text-xl" aria-hidden>
          ?
        </div>
        <p className="text-sm text-white/80">You know the face. Which movie was this actor in?</p>
      </div>
      <ul className="mt-4 grid gap-2">
        {options.map((option, i) => (
          <li
            key={option}
            className={`rounded-lg border px-3 py-2 text-center text-sm ${
              i === 1 ? "border-[var(--cs-accent)] bg-[var(--cs-accent)] font-semibold text-black" : "border-white/10 text-white/80"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
