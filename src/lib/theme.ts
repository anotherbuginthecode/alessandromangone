import type { CSSProperties } from "react";
import type { CaseStudyTheme } from "./content";

// CSS variables for a project's colors. --accent and --accent-ink override the
// site tokens, so links, bullets and the progress bar take the project color.
export function themeStyle(theme: CaseStudyTheme) {
  return {
    "--cs-bg": theme.bg,
    "--cs-fg": theme.fg,
    "--cs-accent": theme.accent,
    "--accent": theme.accent,
    "--accent-ink": theme.accentInk,
  } as CSSProperties;
}
