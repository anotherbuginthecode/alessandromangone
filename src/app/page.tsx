import { Desktop } from "@/components/desktop/desktop";
import { About } from "@/components/sections/about";
import { CareerLog } from "@/components/sections/career-log";
import { HowIWork } from "@/components/sections/how-i-work";
import { SelectedWork } from "@/components/sections/selected-work";
import { Writing } from "@/components/sections/writing";

// Narrative order: who I am, what I built, how I build it, the journey, how I think, the person.
// The whole page is one desktop: each section is an app window on the same dot grid.
export default function Home() {
  return (
    <div className="dot-grid">
      <Desktop />
      <SelectedWork />
      <HowIWork />
      <CareerLog />
      <Writing />
      <About />
    </div>
  );
}
