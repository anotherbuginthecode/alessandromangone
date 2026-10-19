"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Window } from "./window";

// `boot` lines are the scripted intro, typed out on page load.
type Line = { kind: "in" | "out"; text: string; boot?: boolean };
type Project = { slug: string; title: string };

const BOOT_COMMAND = "whoami";

const intro: Line[] = [
  { kind: "in", text: BOOT_COMMAND, boot: true },
  { kind: "out", text: `${site.name}. ${site.roles.join(", ")}.`, boot: true },
  { kind: "out", text: "Type `help` to look around.", boot: true },
];

// A tiny shell that doubles as navigation for people who prefer typing.
export function Terminal({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(intro);
  const [value, setValue] = useState("");
  const [typed, setTyped] = useState(BOOT_COMMAND.length);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const state = { n: 0 };
      gsap.delayedCall(0, () => setTyped(0));
      gsap.to(state, {
        n: BOOT_COMMAND.length,
        duration: 0.6,
        delay: 1.3,
        ease: `steps(${BOOT_COMMAND.length})`,
        onUpdate: () => setTyped(Math.round(state.n)),
      });
      return () => setTyped(BOOT_COMMAND.length);
    });
  });

  const booted = typed >= BOOT_COMMAND.length;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string): string[] | "clear" {
    const [command = "", ...args] = raw.trim().split(/\s+/);
    switch (command) {
      case "":
        return [];
      case "help":
        return ["whoami · ls · open <project> · blog · about · contact · clear"];
      case "whoami":
        return [`${site.name}. ${site.roles.join(", ")}.`];
      case "ls":
        return [...projects.map((p) => `work/${p.slug}`), "blog/", "about-me.md"];
      case "open": {
        const project = projects.find((p) => p.slug === args[0]);
        if (!project) return [`open: no such project: ${args[0] ?? ""}. Try \`ls\`.`];
        router.push(`/work/${project.slug}`);
        return [`Opening ${project.title}...`];
      }
      case "blog":
        router.push("/blog");
        return ["Opening blog/..."];
      case "about":
      case "cat":
        router.push("/#about");
        return ["Opening about-me.md..."];
      case "contact":
        return [`email: ${site.email}`, `linkedin: ${site.links.linkedin}`];
      case "sudo":
        return args.join(" ") === "hire-me"
          ? ["Permission granted. Let's talk: type `contact`."]
          : ["Nice try."];
      case "clear":
        return "clear";
      default:
        return [`command not found: ${command}. Type \`help\`.`];
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const output = run(value);
    setValue("");
    if (output === "clear") {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { kind: "in", text: value }, ...output.map((text) => ({ kind: "out" as const, text }))]);
  }

  return (
    <Window title="alessandro@mangone: ~" dark>
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-56 overflow-y-auto p-3 font-mono text-[12.5px] leading-relaxed"
      >
        {lines.map((line, i) => {
          if (line.boot && line.kind === "out" && !booted) return null;
          const text = line.boot && line.kind === "in" ? line.text.slice(0, typed) : line.text;
          return (
            <p key={i} className={line.kind === "out" ? "text-terminal-muted" : ""}>
              {line.kind === "in" && <span className="text-accent">~ % </span>}
              {text}
              {line.boot && line.kind === "in" && !booted && <span className="animate-pulse">▍</span>}
            </p>
          );
        })}
        <form onSubmit={onSubmit} className="flex">
          <label htmlFor="terminal-input" className="text-accent">
            ~ %&nbsp;
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command"
            className="flex-1 bg-transparent text-terminal-ink caret-accent outline-none"
          />
        </form>
      </div>
    </Window>
  );
}
