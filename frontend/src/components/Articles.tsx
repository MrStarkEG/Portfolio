'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Calendar, Clock } from 'lucide-react'

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
    <section id="articles" className="py-20 section-bg-1 section-transition">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights and tutorials on web scraping, automation, and modern development practices
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-xl p-6 card-hover group"
            >
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                <Calendar size={16} />
                <span>{article.publishDate}</span>
                <span>•</span>
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                {article.title}
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {article.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                  <span className="text-sm font-medium">Medium</span>
                </div>

                <motion.a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 font-semibold"
                >
                  Read More
                  <ExternalLink size={16} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://medium.com/@mrstarkeg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
            View All Articles
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}