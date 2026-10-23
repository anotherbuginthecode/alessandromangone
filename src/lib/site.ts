// Single source for the personal copy shown across the site.
// Values in [brackets] are placeholders: the UI hides them until they are filled in.

export const isPlaceholder = (value: string) => value.includes("[");

export const site = {
  name: "Alessandro Mangone",
  firstName: "Alessandro",
  roles: ["Applied AI Architect", "Co-founder & CTO, Matcha"],
  headline: "I build systems that work without you.",
  tagline:
    "Six years getting LLMs into production for Italian banks, insurers and retailers. At Matcha, where I'm co-founder and CTO, coding agents pick up their own issues and write most of the code. Without you, yes. Without rules, never.",
  description:
    "Alessandro Mangone is an applied AI architect in Milan who builds systems that work without you: six years taking LLM systems from discovery to production for Italian banks, insurers and retailers. Engineering Lead of an 18-person team at BID Company and of its AI adoption program. Co-founder and CTO of Matcha, built with coding agents.",
  location: "Milan, Italy",
  status: "Open to applied AI, FDE and AI architect roles",
  email: "[hello@yourdomain.com]",
  links: {
    linkedin: "https://www.linkedin.com/in/alessandro-mangone-773a961a6",
    github: "https://github.com/anotherbuginthecode",
    calendar: "#[booking-link]",
    cv: "#[cv-link]",
  },
};

export const now = [
  { label: "Day job", value: "LLM systems for Italian enterprises, from demo to production" },
  { label: "Building", value: "Matcha's MVP, getting ready for the Milan launch" },
  { label: "Tinkering", value: "Fiabella, bedtime stories written by an agentic workflow" },
  { label: "Reading", value: "[Book title]" },
].filter((item) => !isPlaceholder(item.value));

export const career = [
  {
    hash: "a3f9c21",
    year: "2026",
    role: "Co-founder & CTO",
    company: "Matcha",
    note: "architecture and rules by me, most of the code by a board of coding agents",
    refs: "HEAD -> matcha",
  },
  {
    hash: "8be04d7",
    year: "2024",
    role: "Engineering Lead",
    company: "BID Company",
    note: "LLM systems in production for banks and retailers; team grown from 3 to 18; the AI adoption program",
    refs: "main",
  },
  {
    hash: "51c7a90",
    year: "2022",
    role: "DevOps & Cloud Engineer",
    company: "BID Company",
    note: "cloud architecture, zero-downtime CI/CD, Terraform modules saving up to €50k a year",
  },
  {
    hash: "e2d6b38",
    year: "2020",
    role: "Data & Analytics Consultant",
    company: "BID Company",
    note: "reporting and data pipelines for banking clients",
  },
  {
    hash: "0c4f1aa",
    year: "2019",
    role: "Full Stack Developer",
    company: "Freelance",
    note: "web apps end to end, from requirements to production",
  },
];

export const about = {
  then: "I started in 2019 as a freelance full-stack developer, then moved through data consulting and cloud engineering at BID Company before taking on a team. Each step widened the scope: my own code, then the infrastructure, then the people who build on it. Now the models build with us.",
  now: "I'm Engineering Lead at BID Company: 18 engineers, grown from 3, and a lot of time with Italian enterprises, from discovery with the C-level to LLM systems in production. One of them turns up to an hour of balance sheet work into a 7-minute draft, with 95.4% of line items found. I also built Chatto, a RAG platform that convinced three paying customers. After hours I'm co-founder and CTO of Matcha.",
};

export const skills = [
  {
    group: "Applied AI",
    items: ["RAG", "LLM evaluation (RAGAS)", "Guardrails", "Deterministic AI workflows", "Agentic workflows", "Coding agents", "Semantic caching"],
  },
  { group: "In the field", items: ["Technical discovery", "Pre-sales scoping", "Solution design", "Workshops & enablement", "Executive communication"] },
  { group: "Leadership", items: ["Technical direction", "Delivery planning", "Hiring", "Team scaling", "1:1s & performance reviews"] },
  { group: "Engineering", items: ["Python", "FastAPI", "TypeScript", "NestJS", "Next.js", "React Native", "PostgreSQL"] },
  { group: "Cloud & data", items: ["AWS", "Terraform", "Elasticsearch", "Docker", "GitHub Actions", "Supabase"] },
  { group: "Research", items: ["ECAI 2025 co-author", "MSc thesis: multimodal emotion analysis"] },
  { group: "Certified", items: ["AWS Solutions Architect Associate", "AWS AI Practitioner"] },
];
