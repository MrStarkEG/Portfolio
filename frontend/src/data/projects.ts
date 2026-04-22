export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  featured?: boolean;
  threatIntel?: boolean;
  confidential?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Investigation Model",
    description: "A massive threat-intelligence dataset module powering investigative workflows across the full kill-chain. Aggregates 1B+ malware log records, 100M+ PII records, millions of dark-web forum posts and Telegram messages, leaked credit cards, and 1B+ public breach records — all indexed for sub-second investigative search and correlation.",
    technologies: ["Python", "FastAPI", "Elasticsearch", "PostgreSQL", "Kafka", "Celery", "Kubernetes", "ETL Pipelines"],
    category: "Threat Intelligence • Flagship",
    featured: true,
    threatIntel: true,
    confidential: true,
  },
  {
    id: 2,
    title: "TraceOn",
    description: "Live Telegram intelligence platform tracking 70M+ messages across channels, groups, and threat-actor networks. Built end-to-end as a full product — high-throughput backend, responsive frontend, and investigative UI — designed for real-time monitoring, actor profiling, and automated alerting. Publicly live at traceon.re.",
    technologies: ["Python", "Telethon", "FastAPI", "Next.js", "Elasticsearch", "RabbitMQ", "Celery", "Docker", "Kubernetes"],
    category: "Threat Intelligence • Flagship",
    demo_url: "https://traceon.re/",
    featured: true,
    threatIntel: true,
  },
  {
    id: 3,
    title: "Hacking Forums Monitor",
    description: "Comprehensive dark-web and surface-web forum monitor archiving 2M+ posts across major hacking communities. Captures threads, comments, authors, and attachments for full-context threat-actor intelligence with automated de-duplication and enrichment.",
    technologies: ["Python", "Playwright", "Camoufox", "Tor", "FastAPI", "Elasticsearch", "Celery", "Docker"],
    category: "Threat Intelligence",
    threatIntel: true,
    confidential: true,
  },
  {
    id: 4,
    title: "Socializer",
    description: "Unified social-media intelligence platform for brand protection and impersonation detection. Scrapes Facebook, Instagram, LinkedIn, X/Twitter, and TikTok through a single API with multi-tenancy, rate-limit evasion, and continuous profile monitoring.",
    technologies: ["Python", "FastAPI", "Playwright", "Camoufox", "httpx", "PostgreSQL", "Docker", "Kubernetes"],
    category: "Web Scraping • Brand Protection",
    threatIntel: true,
    confidential: true,
  },
  {
    id: 5,
    title: "Tg-Monitor",
    description: "Specialized credit-card leak monitoring pipeline scanning Telegram channels for freshly leaked payment data. Normalizes, validates, and indexes cards in real time for downstream fraud-prevention and brand-protection alerting.",
    technologies: ["Python", "Telethon", "httpx", "Elasticsearch", "Docker Compose"],
    category: "Threat Intelligence",
    threatIntel: true,
    confidential: true,
  },
  {
    id: 6,
    title: "CVSS-Enricher for OpenCTI",
    description: "OpenCTI connector that enriches vulnerability entities with authoritative CVSS scoring data for downstream prioritisation inside OpenCTI-powered SOCs.",
    technologies: ["Python", "OpenCTI", "STIX2", "REST APIs", "Docker"],
    category: "Threat Intelligence • OpenCTI",
    threatIntel: true,
    confidential: true,
  },
  {
    id: 7,
    title: "Threat-Actor-Groups Enricher for OpenCTI",
    description: "OpenCTI connector enriching threat-actor group entities with curated public intelligence to strengthen actor attribution inside CTI workflows.",
    technologies: ["Python", "OpenCTI", "STIX2", "REST APIs", "Docker"],
    category: "Threat Intelligence • OpenCTI",
    threatIntel: true,
    confidential: true,
  },
  {
    id: 8,
    title: "SQLizer",
    description: "High-throughput parser for leaked SQL dumps that normalizes heterogeneous schemas into a unified searchable model. Auto-indexes millions of rows into Elasticsearch with schema-inference, PII tagging, and type coercion.",
    technologies: ["Python", "SQLGlot", "Pydantic", "Elasticsearch", "Celery"],
    category: "Data Engineering",
    threatIntel: true,
    confidential: true,
  },
  {
    id: 9,
    title: "Bounty-Hunty",
    description: "Cross-platform bug-bounty program aggregator that scrapes HackerOne, Bugcrowd, Immunefi, and WAF-protected vendor portals. Normalizes scope, rewards, and asset data into a single queryable feed for hunters.",
    technologies: ["Python", "Playwright", "Camoufox", "httpx", "PostgreSQL"],
    category: "Web Scraping",
    confidential: true,
  },
  {
    id: 10,
    title: "AI Portfolio Generator",
    description: "LLM-powered agent that generates and deploys developer portfolios end-to-end — this site was built with it. Orchestrates Claude Sonnet-4 via LangChain, scaffolds a Next.js app, and ships it to GitHub automatically.",
    technologies: ["Python", "LangChain", "Anthropic API", "Claude Sonnet-4", "Next.js"],
    category: "AI • Automation",
    confidential: true,
  },
  {
    id: 11,
    title: "Judy Records Archiver",
    description: "Targeted query-based archiver for Judy public-records data. Executes structured queries, deduplicates hits, and archives result sets for long-term investigative reference.",
    technologies: ["Python", "httpx", "PostgreSQL"],
    category: "OSINT • Archival",
    threatIntel: true,
    github_url: "https://github.com/MrStarkEG/judy-records",
  },
  {
    id: 12,
    title: "Zone-H Scraper",
    description: "Lightweight scraper for the Zone-H defacement archive — extracts defacement notifications, attacker handles, and target metadata for threat-landscape analysis.",
    technologies: ["Python", "httpx", "BeautifulSoup"],
    category: "OSINT • Scraping",
    threatIntel: true,
    github_url: "https://github.com/MrStarkEG/zone-h-scraper",
  },
  {
    id: 13,
    title: "UHost",
    description: "Responsive marketing landing page for a hosting service — focused on conversion, performance, and clean visual hierarchy.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    github_url: "https://github.com/MrStarkEG/uHost",
  },
  {
    id: 14,
    title: "Forkify",
    description: "Recipe discovery and management web app built against a public recipe API — early frontend-fundamentals project.",
    technologies: ["HTML", "CSS", "Sass", "JavaScript"],
    category: "Frontend • Archive",
    github_url: "https://github.com/MrStarkEG/Forkify",
  },
  {
    id: 15,
    title: "Mapty",
    description: "Map-based workout tracker using Leaflet.js for geolocated run/cycle logging — early frontend-fundamentals project.",
    technologies: ["HTML", "CSS", "JavaScript", "Leaflet.js"],
    category: "Frontend • Archive",
    github_url: "https://github.com/MrStarkEG/Mapty",
  },
];
