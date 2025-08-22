export interface Skill {
  name: string;
  level: number;
  category: string;
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", level: 95, category: "Programming" },
  { name: "JavaScript", level: 85, category: "Programming" },
  { name: "TypeScript", level: 80, category: "Programming" },
  { name: "HTML/CSS", level: 90, category: "Programming" },
  { name: "SQL", level: 85, category: "Programming" },
  
  // Backend & APIs
  { name: "FastAPI", level: 92, category: "Backend" },
  { name: "Celery", level: 88, category: "Backend" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "RESTful APIs", level: 90, category: "Backend" },
  
  // Web Scraping & Automation
  { name: "Web Scraping", level: 98, category: "Specialization" },
  { name: "Playwright", level: 90, category: "Automation" },
  { name: "Selenium", level: 92, category: "Automation" },
  { name: "Camoufox", level: 88, category: "Automation" },
  { name: "BeautifulSoup", level: 90, category: "Web Scraping" },
  { name: "Scrapy", level: 85, category: "Web Scraping" },
  
  // Data Engineering
  { name: "Elasticsearch", level: 90, category: "Database" },
  { name: "PostgreSQL", level: 85, category: "Database" },
  { name: "Redis", level: 80, category: "Database" },
  { name: "MongoDB", level: 75, category: "Database" },
  { name: "Data Pipelines", level: 88, category: "Data Engineering" },
  { name: "ETL Processes", level: 85, category: "Data Engineering" },
  
  // DevOps & Cloud
  { name: "Docker", level: 90, category: "DevOps" },
  { name: "Docker Compose", level: 88, category: "DevOps" },
  { name: "Kubernetes", level: 70, category: "DevOps" },
  { name: "CI/CD", level: 80, category: "DevOps" },
  { name: "AWS", level: 75, category: "Cloud" },
  
  // Frontend
  { name: "React", level: 80, category: "Frontend" },
  { name: "Next.js", level: 75, category: "Frontend" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
  { name: "Sass", level: 80, category: "Frontend" },
  
  // AI & Machine Learning
  { name: "Langchain", level: 82, category: "AI/ML" },
  { name: "Claude/OpenAI APIs", level: 85, category: "AI/ML" },
  { name: "NLP", level: 75, category: "AI/ML" },
  
  // Security & Threat Intel
  { name: "Threat Intelligence", level: 88, category: "Security" },
  { name: "OSINT", level: 85, category: "Security" },
  { name: "Security Research", level: 82, category: "Security" },
  
  // Tools & Libraries
  { name: "Git/GitHub", level: 90, category: "Tools" },
  { name: "httpx", level: 88, category: "Tools" },
  { name: "Pydantic", level: 85, category: "Tools" },
  { name: "SQLGlot", level: 80, category: "Tools" },
  { name: "Telethon", level: 85, category: "Tools" },
];