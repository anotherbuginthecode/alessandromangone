// Single source for the personal copy shown across the site.
// Everything in [brackets] is placeholder content to replace.

export const site = {
  name: "Alessandro Mangone",
  firstName: "Alessandro",
  roles: ["Tech Lead", "Engineering Manager", "CTO"],
  company: { name: "Matcha", href: "https://matchadating.it" },
  tagline:
    "[One sentence on what you do every day: the teams you lead, the systems you build, the outcomes you own.]",
  description:
    "Alessandro Mangone is a Tech Lead and Engineering Manager, currently CTO at Matcha. [SEO description to refine.]",
  location: "[City], Italy",
  status: "Open to [Tech Lead / EM] conversations",
  email: "[hello@yourdomain.com]",
  links: {
    linkedin: "https://www.linkedin.com/in/[handle]",
    github: "https://github.com/anotherbuginthecode",
    calendar: "#[booking-link]",
    cv: "#[cv-link]",
  },
};

export const now = [
  { label: "Building", value: "[What you are shipping at Matcha right now]" },
  { label: "Reading", value: "[Book title]" },
  { label: "Listening", value: "[Song or album]" },
];

export const highlights = [
  { title: "CTO, Matcha", detail: "Leading the tech behind a dating app that turns matches into real dates" },
  { title: "[Talk / conference]", detail: "[One line of proof]" },
  { title: "[Mentoring / community]", detail: "[One line of proof]" },
  { title: "[Open source / side project]", detail: "[One line of proof]" },
  { title: "[Award / certification]", detail: "[One line of proof]" },
];

export type Superpower = {
  area: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  metrics: { value: string; label: string }[];
};

export const superpowers: Superpower[] = [
  {
    area: "Leadership",
    title: "[Teams that ship without heroics.]",
    body: "[How you build and run engineering teams: rituals, ownership, the way you grow people.]",
    href: "/work/matcha",
    cta: "Full case study",
    metrics: [
      { value: "[00]", label: "[engineers led]" },
      { value: "[00]", label: "[people hired]" },
      { value: "[00%]", label: "[retention / engagement]" },
    ],
  },
  {
    area: "Architecture",
    title: "[Systems that survive the next pivot.]",
    body: "[The technical decisions you own: architecture, trade-offs, platform choices.]",
    href: "/work/matcha",
    cta: "Full case study",
    metrics: [
      { value: "[00.9%]", label: "[uptime]" },
      { value: "[00ms]", label: "[p95 latency]" },
      { value: "[0x]", label: "[scale handled]" },
    ],
  },
  {
    area: "Delivery",
    title: "[From roadmap to production, every week.]",
    body: "[How you turn product bets into shipped software: process, cadence, quality.]",
    href: "/work/project-two",
    cta: "Full case study",
    metrics: [
      { value: "[00/wk]", label: "[deploys]" },
      { value: "[00h]", label: "[lead time for changes]" },
      { value: "[0%]", label: "[change failure rate]" },
    ],
  },
  {
    area: "AI & Platform",
    title: "[AI where it moves the needle.]",
    body: "[Where you bring AI into the product and into the way the team works.]",
    href: "/work/project-three",
    cta: "Full case study",
    metrics: [
      { value: "[00]", label: "[AI features shipped]" },
      { value: "[00%]", label: "[time saved]" },
      { value: "[00]", label: "[agents / automations in prod]" },
    ],
  },
];

export const career = [
  { hash: "a3f9c21", year: "2026", role: "CTO", company: "Matcha", note: "[One-line impact]", head: true },
  { hash: "8be04d7", year: "[YYYY]", role: "[Engineering Manager]", company: "[Company]", note: "[One-line impact]" },
  { hash: "51c7a90", year: "[YYYY]", role: "[Tech Lead]", company: "[Company]", note: "[One-line impact]" },
  { hash: "e2d6b38", year: "[YYYY]", role: "[Software Engineer]", company: "[Company]", note: "[One-line impact]" },
  { hash: "0c4f1aa", year: "[YYYY]", role: "Initial commit", company: "[First job / studies]", note: "[Where it started]" },
];

export const about = {
  then: "[Where you started: first job, first team, the moment you moved from writing code to leading people.]",
  now: "[What you do today at Matcha: team size, scope, what you own end to end.]",
  next: "[An ironic or personal line about the future, revealed on click.]",
};

export const skills = [
  { group: "Leadership", items: ["[Hiring]", "[1:1s & career growth]", "[Team scaling]", "[Stakeholder management]"] },
  { group: "Engineering", items: ["[System design]", "[Cloud architecture]", "[Code review culture]", "[Your stack]"] },
  { group: "Delivery", items: ["[Roadmapping]", "[Agile at scale]", "[DORA metrics]", "[Incident management]"] },
  { group: "AI", items: ["[LLM integration]", "[Agents]", "[AI-assisted development]", "[Evaluation]"] },
];
