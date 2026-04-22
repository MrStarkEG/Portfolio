export interface Skill {
  name: string;
  level: number;
  category: string;
  tag?: string;
}

export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", level: 95, category: "Programming Languages", tag: "Languages" },
  { name: "Node.js", level: 80, category: "Programming Languages", tag: "Languages" },
  { name: "Rust", level: 65, category: "Programming Languages", tag: "Languages" },

  // Frameworks & Libraries
  { name: "FastAPI", level: 95, category: "Frameworks & Libraries", tag: "Frameworks" },
  { name: "Express.js", level: 80, category: "Frameworks & Libraries", tag: "Frameworks" },
  { name: "Playwright", level: 95, category: "Frameworks & Libraries", tag: "Frameworks" },

  // DevOps & Infrastructure
  { name: "CI/CD", level: 80, category: "DevOps & Infrastructure", tag: "DevOps" },
  { name: "GitHub Actions", level: 85, category: "DevOps & Infrastructure", tag: "DevOps" },
  { name: "Docker", level: 90, category: "DevOps & Infrastructure", tag: "DevOps" },
  { name: "Kubernetes", level: 80, category: "DevOps & Infrastructure", tag: "DevOps" },
  { name: "AWS", level: 75, category: "DevOps & Infrastructure", tag: "DevOps" },
  { name: "Bash Scripting", level: 85, category: "DevOps & Infrastructure", tag: "DevOps" },
  { name: "Linux Administration", level: 85, category: "DevOps & Infrastructure", tag: "DevOps" },

  // Messaging & Distributed Systems
  { name: "RabbitMQ", level: 85, category: "Messaging & Distributed Systems", tag: "Messaging" },
  { name: "Kafka", level: 80, category: "Messaging & Distributed Systems", tag: "Messaging" },
  { name: "Celery", level: 90, category: "Messaging & Distributed Systems", tag: "Messaging" },

  // Databases & Storage
  { name: "Elasticsearch", level: 90, category: "Databases & Storage", tag: "Databases" },
  { name: "PostgreSQL", level: 90, category: "Databases & Storage", tag: "Databases" },
  { name: "MongoDB", level: 80, category: "Databases & Storage", tag: "Databases" },
  { name: "Redis", level: 80, category: "Databases & Storage", tag: "Databases" },

  // Data Engineering & Observability
  { name: "ETL Pipelines", level: 90, category: "Data Engineering & Observability", tag: "Data" },
  { name: "Logstash", level: 80, category: "Data Engineering & Observability", tag: "Data" },
  { name: "Kibana", level: 80, category: "Data Engineering & Observability", tag: "Data" },
  { name: "ELK Stack", level: 85, category: "Data Engineering & Observability", tag: "Data" },

  // Tools & Workflows
  { name: "Jira", level: 85, category: "Tools & Workflows", tag: "Tools" },
  { name: "Git / GitHub", level: 90, category: "Tools & Workflows", tag: "Tools" },

  // Core Strengths
  { name: "Automation", level: 95, category: "Core Strengths", tag: "Strengths" },
  { name: "Large-Scale Web Scraping", level: 95, category: "Core Strengths", tag: "Strengths" },
  { name: "Distributed Data Pipelines", level: 90, category: "Core Strengths", tag: "Strengths" },
  { name: "Algorithmic Problem Solving", level: 90, category: "Core Strengths", tag: "Strengths" },
  { name: "Systems Design", level: 85, category: "Core Strengths", tag: "Strengths" },

  // Leadership & Soft Skills
  { name: "Team Leadership", level: 85, category: "Leadership & Soft Skills", tag: "Soft" },
  { name: "Mentoring", level: 85, category: "Leadership & Soft Skills", tag: "Soft" },
  { name: "Project Planning", level: 85, category: "Leadership & Soft Skills", tag: "Soft" },
  { name: "Communication", level: 90, category: "Leadership & Soft Skills", tag: "Soft" },

  // Languages
  { name: "Arabic (Native)", level: 100, category: "Spoken Languages", tag: "Languages" },
  { name: "English (Fluent)", level: 95, category: "Spoken Languages", tag: "Languages" },
];
