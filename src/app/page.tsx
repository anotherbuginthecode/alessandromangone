import { Desktop } from "@/components/desktop/desktop";
import { About } from "@/components/sections/about";
import { CareerLog } from "@/components/sections/career-log";
import { HowIWork } from "@/components/sections/how-i-work";
import { SelectedWork } from "@/components/sections/selected-work";
import { Writing } from "@/components/sections/writing";

// Narrative order: who I am, what I built, how I build it, the journey, how I think, the person.
export default function Home() {
  return (
    <>
      <Desktop />
      <SelectedWork />
      <HowIWork />
      <CareerLog />
      <Writing />
      <About />
    </>
  );
}
