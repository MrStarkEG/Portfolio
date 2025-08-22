export interface Skill {
  name: string;
  level: number;
  category: string;
  tag?: string;
}

export const skills: Skill[] = [
  // Backend
  { name: "Python", level: 80, category: "Backend", tag: "Backend" },
  { name: "Node.js", level: 70, category: "Backend", tag: "Backend" },
  { name: "RESTful APIs", level: 80, category: "Backend", tag: "Backend" },
  
  // Frontend
  { name: "HTML/CSS", level: 80, category: "Frontend", tag: "Frontend" },
  { name: "TypeScript", level: 70, category: "Frontend", tag: "Frontend" },
  { name: "Next.js", level: 70, category: "Frontend", tag: "Frontend" },
  { name: "Tailwind CSS", level: 70, category: "Frontend", tag: "Frontend" },
  { name: "Sass", level: 80, category: "Frontend", tag: "Frontend" },
  
  // Framework
  { name: "FastAPI", level: 80, category: "Framework", tag: "Framework" },
  { name: "Celery", level: 70, category: "Framework", tag: "Framework" },
  { name: "Langchain", level: 80, category: "Framework", tag: "Framework" },
  { name: "httpx", level: 80, category: "Framework", tag: "Framework" },
  { name: "Pydantic", level: 80, category: "Framework", tag: "Framework" },
  { name: "SQLGlot", level: 80, category: "Framework", tag: "Framework" },
  { name: "Telethon", level: 80, category: "Framework", tag: "Framework" },
  
  // Automation
  { name: "Web Scraping", level: 95, category: "Automation", tag: "Automation" },
  { name: "Playwright", level: 95, category: "Automation", tag: "Automation" },
  { name: "Selenium", level: 95, category: "Automation", tag: "Automation" },
  { name: "Camoufox", level: 95, category: "Automation", tag: "Automation" },
  
  // Database
  { name: "PostgreSQL", level: 80, category: "Database", tag: "Database" },
  { name: "Elasticsearch", level: 70, category: "Database", tag: "Database" },
  { name: "Redis", level: 70, category: "Database", tag: "Database" },
  { name: "MongoDB", level: 70, category: "Database", tag: "Database" },
  
  // DevOps
  { name: "Git/GitHub", level: 80, category: "DevOps", tag: "DevOps" },
  { name: "Docker", level: 80, category: "DevOps", tag: "DevOps" },
  { name: "Docker Compose", level: 80, category: "DevOps", tag: "DevOps" },
  { name: "Kubernetes", level: 70, category: "DevOps", tag: "DevOps" },
  { name: "CI/CD", level: 70, category: "DevOps", tag: "DevOps" },
  { name: "GitHub Actions", level: 70, category: "DevOps", tag: "DevOps" },
  { name: "AWS", level: 70, category: "DevOps", tag: "DevOps" },
  
  // Intel Research
  { name: "Threat Intelligence", level: 70, category: "Intel Research", tag: "Intel Research" },
  { name: "OSINT", level: 70, category: "Intel Research", tag: "Intel Research" },
];