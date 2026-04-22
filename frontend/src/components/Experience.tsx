
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getExperience, type Experience } from '@/lib/api'

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await getExperience()
        setExperiences(data)
      } catch (error) {
        console.error('Failed to fetch experience:', error)
      }
    }
    fetchExperience()
  }, [])

  return (
    <section id="experience" className="py-32 bg-background relative z-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Sticky Header */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary-500 font-mono text-sm tracking-widest uppercase mb-4 block flex items-center gap-2">
                <span className="w-8 h-px bg-primary-500" />
                Career Path
              </span>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-8">
                Professional<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-purple-600">
                  Experience
                </span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed text-lg max-w-md">
                A chronological overview of my journey in software engineering, focusing on building scalable systems and secure infrastructure.
              </p>
            </motion.div>
          </div>

          {/* Timeline Content */}
          <div className="lg:w-2/3 relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-primary-500/50 via-white/10 to-transparent hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative md:pl-12 group"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[-6px] top-8 hidden md:block">
                    <div className="w-[13px] h-[13px] rounded-full bg-background border-2 border-primary-500 group-hover:scale-125 group-hover:bg-primary-500 transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>

                  {/* Card */}
                  <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-primary-500/30 transition-all duration-300 group-hover:translate-x-2">

                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono uppercase tracking-wider mb-6">
                      <span className={`w-1.5 h-1.5 rounded-full ${exp.duration.includes('Present') ? 'bg-green-500 animate-pulse' : 'bg-primary-500'}`} />
                      {exp.duration}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                          {exp.company}
                        </h3>
                        <div className="text-xl text-gray-300 font-light">
                          {exp.position}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6 font-light text-base border-l-2 border-white/10 pl-4">
                      {exp.description}
                    </p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="mb-8 space-y-3">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm md:text-base text-gray-300 leading-relaxed"
                          >
                            <span className="mt-[0.55rem] shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map(tech => (
                          <span
                            key={tech}
                            className="text-xs font-mono text-gray-500 border border-white/10 px-3 py-1.5 rounded-md uppercase tracking-wider hover:text-white hover:border-primary-500/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-primary-500/10 to-transparent rounded-tr-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}