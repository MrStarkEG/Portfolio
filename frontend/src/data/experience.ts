export interface Experience {
  id: number;
  company: string;
  position: string;
  duration?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
}

export const experience: Experience[] = [
  {
    id: 1,
    company: "Deep Diligence AI",
    position: "Software Engineer (Part-time)",
    duration: "May 2026 - Present",
    description: "Part-time software engineer on the data-collection platform. I build and run the scraper fleet and the pipelines that keep its datasets fresh and clean.",
    highlights: [
      "Build and maintain the scraper fleet that collects the company's source data.",
      "Keep the collection pipelines running: scheduling, retries, monitoring, and data quality checks.",
    ],
    technologies: ["Python", "Playwright", "PostgreSQL", "Docker"],
  },
  {
    id: 2,
    company: "Confidential - Saudi Arabia",
    position: "Software Engineer",
    description: "The company name is confidential. The team is based in Saudi Arabia. The work itself is under agreement, so I cannot share the details here.",
  },
  {
    id: 3,
    company: "Buguard LLC.",
    position: "Software Engineer",
    duration: "Nov 2024 - Sep 2026",
    description: "Software engineer on Buguard's Threat Intelligence and Brand Protection products — owning scraping infrastructure, data pipelines, and the brand-protection surface end-to-end, from ingestion through API.",
    highlights: [
      "Led a 5-person cross-functional team (backend, data engineering, AI) shipping end-to-end CTI data platforms.",
      "Owned the scraping stack and distributed data pipelines feeding Buguard's Threat Intelligence and Brand Protection products.",
      "Built dark-web monitoring coverage across Telegram, hacking forums, leak sites, and marketplaces — feeding live signals into the investigative surface.",
      "Architected distributed ETL pipelines for 100M+ PII records and millions of forum and Telegram messages.",
    ],
  },
  {
    id: 4,
    company: "Freelance",
    position: "Software Engineer",
    duration: "Apr 2022 - Nov 2024",
    description: "Delivered custom Python backend and automation solutions end-to-end — from web-scraping rigs and data-engineering pipelines to threat-intelligence tooling and security-research applications for clients across multiple industries.",
    highlights: [
      "Built and customized online stores on Shopify: themes, apps, and integrations for real merchants.",
      "Built custom e-commerce sites from scratch, the same shape of product as Shopify and Salla: product catalog, search, cart, checkout, payments, and order management.",
      "Worked on both sides of these platforms, the merchant dashboard and the buyer-facing store.",
      "Worked as a full stack engineer for Saudi clients as well, designing and building both the backend and the frontend of their sites.",
      "Most of this work was contract work under an NDA, so I cannot share client names, code, or specifics.",
    ],
    technologies: ["Python", "FastAPI", "Django", "PostgreSQL", "MongoDB", "Playwright", "Selenium", "Docker", "Shopify", "JavaScript", "REST APIs"],
  },
];
