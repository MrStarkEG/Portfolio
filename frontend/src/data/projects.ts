export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Threat Intelligence Hacking-Forums Monitor",
    description: "Real-time monitoring system for hacking forums to gather threat intelligence data with automated scraping and analysis capabilities",
    technologies: ["Python", "Celery", "FastAPI", "Camoufox", "Docker", "Elasticsearch"],
    category: "Web Scraping & Backend",
    // Private repository - confidential project
  },
  {
    id: 2,
    title: "Carding",
    description: "Real-time monitoring system to detect leaked credit cards for specific regions with automated alerts and data analysis",
    technologies: ["Python", "httpx", "Docker Compose", "Elasticsearch"],
    category: "Web Scraping & Data Engineering",
    // Private repository - confidential project
  },
  {
    id: 3,
    title: "Leaks Backend",
    description: "Secure backend system for monitoring and processing leaked data from confidential resources with real-time processing",
    technologies: ["Python", "FastAPI", "Celery", "Elasticsearch", "Docker"],
    category: "Backend",
    // Private repository - confidential project
  },
  {
    id: 4,
    title: "Socializer - Social Media Scraper",
    description: "Comprehensive social media scraping platform supporting Facebook, Instagram, LinkedIn, and Twitter with unified API with multi-tenancy support",
    technologies: ["Python", "FastAPI", "Camoufox", "Playwright", "httpx", "Docker", "PostgreSQL", "APIs with Scraping"],
    category: "Web Scraping & Backend",
    // Private repository - confidential project
  },
  {
    id: 5,
    title: "SQLizer - SQL Leak Parser",
    description: "Advanced parser for SQL leak files with automated indexing to Elasticsearch for searchable database of leaked SQL data",
    technologies: ["Python", "Elasticsearch", "SQLGlot", "Pydantic"],
    category: "Data Engineering",
    // Private repository - confidential project
  },
  {
    id: 6,
    title: "AI Portfolio Generator",
    description: "AI-powered agent that generates professional portfolios using Claude Sonnet-4 API and automatically deploys to GitHub",
    technologies: ["Python", "Langchain", "Anthropic API", "Claude Sonnet-4"],
    category: "Backend & AI",
    github_url: "https://github.com/yourusername/portfolio-ai",
  },
  {
    id: 7,
    title: "Bounty-Hunty",
    description: "Web scraping service monitoring latest bug bounty programs on platforms like Immunefi and HackerOne ...etc",
    technologies: ["Python", "Requests", "PostgreSQL"],
    category: "Web Scraping",
    // Private repository
  },
  {
    id: 8,
    title: "ViciDialer Automator",
    description: "Browser automation tool for ViciDial with multiple utilities for call center operations",
    technologies: ["Python", "Selenium", "Browser Automation"],
    category: "Automation",
    // Private repository
  },
  {
    id: 9,
    title: "Telemon - Telegram Monitor",
    description: "Telegram monitoring system for tracking multiple channels and groups with message archiving for threat intelligence",
    technologies: ["Python", "Telethon", "Elasticsearch"],
    category: "Backend & Web Scraping",
    // Private repository - confidential project
  },
  {
    id: 10,
    title: "UHost Landing Page",
    description: "Modern, responsive landing page for a hosting service with optimized performance and conversion-focused design",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    github_url: "https://github.com/MrStarkEG/uHost",
    demo_url: "https://mrstarkeg.github.io/uHost/",
  },
  {
    id: 11,
    title: "Forkify Recipe App",
    description: "Interactive web application for searching and managing food recipes with modern UI and recipe API integration",
    technologies: ["HTML", "CSS", "Sass", "JavaScript"],
    category: "Full Stack",
    github_url: "https://github.com/MrStarkEG/Forkify",
    demo_url: "https://forkify-stark.netlify.app/",
  },
  {
    id: 12,
    title: "Mapty Workout Tracker",
    description: "Fitness tracking application with map integration for logging workouts and runs with distance and time calculations",
    technologies: ["HTML", "CSS", "JavaScript", "Leaflet.js"],
    category: "Frontend",
    github_url: "https://github.com/MrStarkEG/Mapty",
    demo_url: "https://mrstarkeg.github.io/Mapty",
  }
];