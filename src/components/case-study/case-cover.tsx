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
      <div className="relative flex items-center justify-center gap-2 py-4 sm:gap-6">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={640}
          height={640}
          priority={priority}
          className="w-1/2 max-w-xs -rotate-6 drop-shadow-[0_20px_40px_rgb(0_0_0/0.5)] motion-safe:animate-[wobble_6s_ease-in-out_infinite]"
        />
        {cover.screen && (
          <PhoneFrame src={cover.screen} alt={cover.screenAlt ?? ""} priority={priority} className="w-[38%] max-w-56 rotate-3" />
        )}
      </div>
    );
  }

  return (
    <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-white/10 bg-white/5">
      <span className="text-7xl font-semibold tracking-tight text-[var(--cs-accent)] sm:text-8xl">{cover.label}</span>
    </div>
  );
}
