export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  readTime: string;
  publishDate: string;
}

// Fallback list used if the live Medium RSS fetch fails.
// Kept in sync with https://medium.com/@mrstarkeg
export const fallbackArticles: Article[] = [
  {
    id: 1,
    title: "Scrapers vs. Rate Limits: A Love Story Gone Wrong",
    description: "How APIs defend against abusive traffic — rate limits, fingerprinting, header validation, and behavioral anomaly detection — with a working SlowAPI + FastAPI implementation.",
    url: "https://medium.com/@mrstarkeg/scrapers-vs-rate-limits-a-love-story-gone-wrong-72dcdf0687d8",
    readTime: "8 min read",
    publishDate: "Nov 2025",
  },
  {
    id: 2,
    title: "The Hidden Inefficiency of Using LLMs for Data Extraction",
    description: "Benchmarking BeautifulSoup against a Gemini-powered extractor shows traditional selectors are still 4x faster and dramatically cheaper for structured scraping.",
    url: "https://medium.com/@mrstarkeg/the-hidden-inefficiency-of-using-llms-for-data-extraction-e6f8a92fdf72",
    readTime: "7 min read",
    publishDate: "Oct 2025",
  },
  {
    id: 3,
    title: "I Used Robots to Destroy Robots",
    description: "Using AI to bypass WAFs and CAPTCHAs — Camoufox fingerprints, LLM-solved image CAPTCHAs, and MCP-driven browser agents against modern anti-bot stacks.",
    url: "https://medium.com/@mrstarkeg/i-used-robots-to-destroy-robots-5489a8110a14",
    readTime: "6 min read",
    publishDate: "Aug 2025",
  },
  {
    id: 4,
    title: "Bulletproof Web Scraping: Dockerization and Exception Handling",
    description: "Production-grade scraper stability through graceful exception handling and Docker-based isolation — the patterns that keep long-running pipelines upright.",
    url: "https://medium.com/@mrstarkeg/bulletproof-web-scraping-dockerization-and-exception-handling-for-reliable-data-extraction-a41ad7a789dd",
    readTime: "8 min read",
    publishDate: "Jul 2025",
  },
  {
    id: 5,
    title: "Is Web Scraping Dead in 2025?",
    description: "Modern anti-bot stacks are harder, but scraping is far from dead. A working playbook with CurlCFFI, browser automation, and fingerprint libraries.",
    url: "https://medium.com/@mrstarkeg/is-web-scraping-dead-in-2025-99785cd24fb2",
    readTime: "6 min read",
    publishDate: "Jun 2025",
  },
  {
    id: 6,
    title: "Selenium, Playwright, or Puppeteer?",
    description: "A head-to-head comparison of the three major browser-automation frameworks — why Playwright wins on performance, stealth, and ergonomics for modern scraping.",
    url: "https://medium.com/@mrstarkeg/selenium-playwright-or-puppeteer-77f0c4eaf7ce",
    readTime: "7 min read",
    publishDate: "Feb 2025",
  },
];
