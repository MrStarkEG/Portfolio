'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getStats, type Stats } from '@/lib/api'

export default function About() {
  const [stats, setStats] = useState<Stats | null>(null)

  // Fetch stats (mock or real)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats()
        setStats(data)
      } catch (error) {
        // Fallback if API fails
        setStats({
          years_experience: "2+",
          projects_completed: "15+",
          articles_written: 6,
          skills_mastered: 30
        })
      }
    }
    fetchStats()
  }, [])

  return (
    <section id="about" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex items-end justify-between border-b border-white/20 pb-8"
        >
          <h2 className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white">
            ABOUT<br />ME
          </h2>
          <div className="hidden md:block text-right">
            <span className="block text-sm font-mono text-gray-500 mb-1">CURRENT_LOCATION</span>
            <span className="text-xl text-white">Cairo, EGYPT</span>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          <div className="md:w-1/3">
            <h3 className="text-2xl text-white font-bold leading-tight">
              More than just code.<br />
              I build engines for data.
            </h3>
          </div>

          <div className="md:w-2/3">
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-400 font-light mb-12">
              <span className="text-white font-normal">I specialize in the unseen.</span> While others build the facade, I architect the infrastructure.
              From high-scale <span className="text-white hover:text-primary-400 transition-colors cursor-default">web scraping</span> systems to complex <span className="text-white hover:text-primary-400 transition-colors cursor-default">data pipelines</span>,
              my work ensures that information flows seamlessly and efficiently.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 pt-12 border-t border-white/10">
              {[
                { label: 'Years Exp', value: stats?.years_experience ?? '2+' },
                { label: 'Projects', value: stats?.projects_completed ?? '15+' },
                { label: 'Articles', value: stats?.articles_written ?? 6 },
                { label: 'Commits', value: '1k+' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest border-t border-white/10 pt-2 inline-block max-w-[100px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}