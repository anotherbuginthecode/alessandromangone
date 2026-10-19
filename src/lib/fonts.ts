import { Baloo_2, Bricolage_Grotesque } from "next/font/google";

// Brand fonts of the case studies, used only on their pages and posters.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "800"], preload: false });
const baloo = Baloo_2({ subsets: ["latin"], weight: ["700", "800"], preload: false });

export const brandFonts = {
  matcha: bricolage.className,
  otg: baloo.className,
} as const;
