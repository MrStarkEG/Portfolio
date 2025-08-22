'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building, Calendar, MapPin } from 'lucide-react'
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
    <section id="experience" className="py-20 bg-dark-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            My professional journey and the impact I've made in various organizations
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-12 last:mb-0"
            >
              <div className="flex items-center mb-8">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full z-10" />
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary-500 to-transparent" />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`glass-effect rounded-xl p-8 ${index % 2 === 0 ? 'ml-8 md:ml-0 md:mr-1/2' : 'mr-8 md:mr-0 md:ml-1/2'
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {experience.position}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Building size={16} />
                        <span className="font-semibold text-primary-400">
                          {experience.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{experience.duration}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  >
                    {experience.company.charAt(0)}
                  </motion.div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {experience.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full text-sm border border-primary-500/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Currently at Buguard
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I'm currently contributing to innovative projects at Buguard, where I focus on
              developing scalable web scraping solutions, building robust data pipelines, and
              creating efficient backend systems that power modern applications.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}