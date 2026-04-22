export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
}

export const experience: Experience[] = [
  {
    id: 1,
    company: "Buguard LLC.",
    position: "Software Engineer",
    duration: "Nov 2024 - Present",
    description: "Software engineer on Buguard's Threat Intelligence and Brand Protection products — owning scraping infrastructure, data pipelines, and the brand-protection surface end-to-end, from ingestion through API.",
    highlights: [
      "Led a 5-person cross-functional team (backend, data engineering, AI) shipping end-to-end CTI data platforms.",
      "Own the scraping stack and distributed data pipelines feeding Buguard's Threat Intelligence and Brand Protection products.",
      "Built dark-web monitoring coverage across Telegram, hacking forums, leak sites, and marketplaces — feeding live signals into the investigative surface.",
      "Architected distributed ETL pipelines for 100M+ PII records and millions of forum and Telegram messages.",
    ],
  },
  {
    id: 2,
    company: "Freelance",
    position: "Python Developer & Web Scraping Specialist",
    duration: "Apr 2022 - Nov 2024",
    description: "Delivered custom Python backend and automation solutions end-to-end — from web-scraping rigs and data-engineering pipelines to threat-intelligence tooling and security-research applications for clients across multiple industries.",
    technologies: ["Python", "FastAPI", "Django", "PostgreSQL", "MongoDB", "Playwright", "Selenium", "Docker"],
  },
];
