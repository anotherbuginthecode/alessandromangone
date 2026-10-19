import { Desktop } from "@/components/desktop/desktop";
import { About } from "@/components/sections/about";
import { CareerLog } from "@/components/sections/career-log";
import { Highlights } from "@/components/sections/highlights";
import { SelectedWork } from "@/components/sections/selected-work";
import { Superpowers } from "@/components/sections/superpowers";
import { Writing } from "@/components/sections/writing";

// Narrative order: who I am, proof, what I bring, the stories, the journey, how I think, the person.
export default function Home() {
  return (
    <>
      <Desktop />
      <Highlights />
      <Superpowers />
      <SelectedWork />
      <CareerLog />
      <Writing />
      <About />
    </>
  );
}
