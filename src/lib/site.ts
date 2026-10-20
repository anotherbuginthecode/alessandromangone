// Single source for the personal copy shown across the site.
// Values in [brackets] are placeholders: the UI hides them until they are filled in.

export const isPlaceholder = (value: string) => value.includes("[");

export const site = {
  name: "Alessandro Mangone",
  firstName: "Alessandro",
  roles: ["Engineering Manager", "Co-founder & CTO, Matcha"],
  headline: "I lead small teams that ship like big ones.",
  tagline:
    "18 engineers at BID Company. Three founders at Matcha, where I still write the code. In both, people and coding agents share one board, and people own what ships.",
  description:
    "Alessandro Mangone is a hands-on engineering leader in Milan. Engineering Manager at BID Company, leading an 18-person team and the company's AI adoption program. Co-founder and CTO of Matcha, building with coding agents every day.",
  location: "Milan, Italy",
  status: "Open to tech lead and EM roles, startups included",
  email: "[hello@yourdomain.com]",
  links: {
    linkedin: "https://www.linkedin.com/in/alessandro-mangone-773a961a6",
    github: "https://github.com/anotherbuginthecode",
    calendar: "#[booking-link]",
    cv: "#[cv-link]",
  },
};

export const now = [
  { label: "Building", value: "Matcha's MVP, getting ready for the Milan launch" },
  { label: "Reading", value: "[Book title]" },
  { label: "Listening", value: "[Song or album]" },
].filter((item) => !isPlaceholder(item.value));

export const career = [
  {
    hash: "a3f9c21",
    year: "2026",
    role: "Co-founder & CTO",
    company: "Matcha",
    note: "architecture and code end to end, with a board of coding agents",
    refs: "HEAD -> matcha",
  },
  {
    hash: "8be04d7",
    year: "2024",
    role: "Engineering Manager",
    company: "BID Company",
    note: "18 engineers, grown from 3; the company's AI adoption program",
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
  then: "I started in 2019 as a freelance full-stack developer, then moved through data consulting and cloud engineering before taking on my first team in 2024. Each step widened the scope: from my own code, to the infrastructure, to the people who build on it.",
  now: "I lead an 18-person engineering team at BID Company, own delivery for enterprise clients and run the company's AI adoption program. I'm also co-founder and CTO of Matcha, where I write the code with a board of coding agents.",
};

export const skills = [
  { group: "Leadership", items: ["Technical direction", "Delivery planning", "Hiring", "Team scaling", "1:1s & performance reviews"] },
  { group: "AI", items: ["LLM integration", "RAG", "Agentic workflows", "Coding agents", "Agent skills"] },
  { group: "Engineering", items: ["TypeScript", "Python", "Node.js", "NestJS", "React", "React Native", "Next.js"] },
  { group: "Cloud & data", items: ["AWS", "Terraform", "Docker", "GitHub Actions", "PostgreSQL", "Supabase"] },
  { group: "Certified", items: ["AWS Solutions Architect Associate", "AWS AI Practitioner"] },
];
