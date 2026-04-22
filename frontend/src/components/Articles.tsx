'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Article {
  id: number
  title: string
  description: string
  url: string
  readTime: string
  publishDate: string
}

const articles: Article[] = [
  {
    id: 1,
    title: "Bulletproof Web Scraping: Dockerization and Exception Handling",
    description: "Learn how to build reliable data extraction systems with proper dockerization and robust exception handling strategies.",
    url: "https://medium.com/@mrstarkeg/bulletproof-web-scraping-dockerization-and-exception-handling-for-reliable-data-extraction-a41ad7a789dd",
    readTime: "8 min read",
    publishDate: "2024"
  },
  {
    id: 2,
    title: "Is Web Scraping Dead in 2025?",
    description: "Exploring the current state of web scraping, new challenges, and emerging technologies that keep this field evolving.",
    url: "https://medium.com/@mrstarkeg/is-web-scraping-dead-in-2025-99785cd24fb2",
    readTime: "6 min read",
    publishDate: "2024"
  },
  {
    id: 3,
    title: "Selenium, Playwright, or Puppeteer?",
    description: "A comprehensive comparison of the most popular browser automation tools and when to use each one.",
    url: "https://medium.com/@mrstarkeg/selenium-playwright-or-puppeteer-77f0c4eaf7ce",
    readTime: "7 min read",
    publishDate: "2024"
  },
  {
    id: 4,
    title: "I Used Robots to Destroy Robots",
    description: "An interesting perspective on automation with AI.",
    url: "https://medium.com/@mrstarkeg/i-used-robots-to-destroy-robots-77f0c4eaf7ce",
    readTime: "5 min read",
    publishDate: "2024"
  }
]

export default function Articles() {
  return (
    <section id="articles" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <span className="text-primary-500 font-mono text-sm tracking-widest uppercase mb-4 block">Thoughts</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            INSIGHTS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border border-white/10 p-8 md:p-12 hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-white" size={24} />
              </div>

              <div className="flex gap-4 text-xs font-mono text-gray-500 mb-6 uppercase tracking-wider">
                <span>{article.publishDate}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                {article.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {article.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}