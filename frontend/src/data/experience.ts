export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export const experience: Experience[] = [
  {
    id: 1,
    company: "BuGuard",
    position: "Software Engineer",
    duration: "Nov 2024 - Present",
    description: "Developing robust backend systems using Django and FastAPI with PostgreSQL and MongoDB. Building scalable applications, security tools, web scraping solutions, and data processing pipelines.",
    technologies: ["Python", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Elasticsearch", "Docker", "Web Scraping", "Celery"],
  },
  {
    id: 2,
    company: "Freelance",
    position: "Python Developer",
    duration: "Apr 2022 - Nov 2024",
    description: "Delivered custom Python solutions including backend systems with Django and FastAPI, integrated with PostgreSQL and MongoDB databases. Specialized in web scraping systems, automation tools, data engineering pipelines, threat intelligence tools, and security research applications.",
    technologies: ["Python", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Selenium", "Playwright", "Docker", "Elasticsearch", "Web Scraping"],
  },
  {
    id: 3,
    company: "Norma Global Solutions",
    position: "Telesales Specialist",
    duration: "Apr 2024 - Nov 2024",
    description: "Worked as a telesales agent with clients from USA and Canada, achieving strong performance metrics. Gained valuable cross-cultural communication experience and developed automation tools to improve workflow efficiency.",
    technologies: ["Communication", "CRM Systems", "Python", "Automation", "ViciDial"],
  }
];