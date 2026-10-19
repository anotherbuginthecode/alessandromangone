import Image from "next/image";

type FrameProps = { src: string; alt: string; className?: string; priority?: boolean };

export function BrowserFrame({ src, alt, url, className = "", priority }: FrameProps & { url?: string }) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-white/10 bg-[#1b1b1b] shadow-2xl ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        {url && (
          <span className="mx-auto truncate rounded-md bg-white/10 px-3 py-0.5 font-mono text-[10px] text-white/60">
            {url}
          </span>
        )}
      </div>
      <Image src={src} alt={alt} width={1440} height={900} priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
    </figure>
  );
}

export function PhoneFrame({ src, alt, className = "", priority }: FrameProps) {
  return (
    <figure className={`overflow-hidden rounded-[1.6rem] border-[6px] border-[#111] bg-[#111] shadow-2xl ${className}`}>
      <Image src={src} alt={alt} width={780} height={1688} priority={priority} sizes="200px" className="h-auto w-full rounded-[1.1rem]" />
    </figure>
  );
}
