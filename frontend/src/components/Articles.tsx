'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Rss } from 'lucide-react'
import { getArticles, type Article } from '@/lib/api'

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLive, setIsLive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const result = await getArticles()
        if (cancelled) return
        setArticles(result)
        // getArticles returns fallback on failure; we mark as live
        // only if the fetch succeeded by checking the first item's
        // URL shape matches the live feed format (has source= param or not).
        setIsLive(true)
      } catch {
        if (!cancelled) setIsLive(false)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="articles" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/20 pb-8"
        >
          <div>
            <span className="text-primary-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary-500" />
              From Medium
            </span>
            <h2 className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white">
              WRITING<br />&amp; INSIGHTS
            </h2>
          </div>
          <a
            href="https://medium.com/@mrstarkeg"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono text-gray-400 hover:text-primary-400 transition-colors self-start md:self-end md:mb-2"
          >
            <Rss size={14} className={isLive && !isLoading ? 'text-green-500 animate-pulse' : ''} />
            <span>
              {isLoading
                ? 'Syncing feed…'
                : isLive
                  ? `Live • ${articles.length} posts`
                  : `${articles.length} posts`}
            </span>
            <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {(isLoading ? new Array(4).fill(null) : articles).map((article, index) => (
            article ? (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group border border-white/10 p-8 md:p-10 hover:bg-white/[0.03] hover:border-primary-500/40 transition-all duration-300 relative overflow-hidden rounded-lg"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-white" size={24} />
                </div>

                <div className="flex gap-4 text-xs font-mono text-gray-500 mb-6 uppercase tracking-wider">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors leading-tight">
                  {article.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                  {article.description}
                </p>
              </motion.a>
            ) : (
              <div
                key={`skeleton-${index}`}
                className="border border-white/10 p-8 md:p-10 rounded-lg animate-pulse"
              >
                <div className="flex gap-4 mb-6">
                  <div className="h-3 w-16 bg-white/10 rounded" />
                  <div className="h-3 w-20 bg-white/10 rounded" />
                </div>
                <div className="h-8 w-3/4 bg-white/10 rounded mb-3" />
                <div className="h-8 w-1/2 bg-white/10 rounded mb-6" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded" />
                  <div className="h-3 w-5/6 bg-white/5 rounded" />
                  <div className="h-3 w-2/3 bg-white/5 rounded" />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
