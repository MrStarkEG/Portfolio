'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GitPullRequest, ArrowUpRight, Github } from 'lucide-react'
import { getOpenSource, type OpenSourceContribution } from '@/lib/api'

export default function OpenSource() {
  const [contributions, setContributions] = useState<OpenSourceContribution[]>([])

  useEffect(() => {
    getOpenSource().then(setContributions).catch(() => setContributions([]))
  }, [])

  return (
    <section id="open-source" className="py-24 bg-background relative z-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-primary-900/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 flex items-end justify-between border-b border-white/20 pb-8"
        >
          <div>
            <span className="text-primary-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary-500" />
              Community
            </span>
            <h2 className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white">
              OPEN<br />SOURCE
            </h2>
          </div>
          <span className="hidden md:inline-block text-sm font-mono text-gray-500 mb-2">
            UPSTREAM_CONTRIBUTIONS ({contributions.length})
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {contributions.map((contribution, index) => (
            <motion.a
              key={contribution.id}
              href={contribution.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 hover:border-primary-500/40 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary-500/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                    <GitPullRequest size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-primary-400 uppercase tracking-widest">
                      {contribution.project}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mt-0.5">
                      <Github size={12} />
                      {contribution.repo}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {contribution.status}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-gray-500 group-hover:text-primary-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                {contribution.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base font-light">
                {contribution.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {contribution.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono text-gray-500 border border-white/10 px-2.5 py-1 rounded-md uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
