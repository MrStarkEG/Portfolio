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
                {index > 0 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-primary-500 to-transparent z-0 -top-12 h-16" />
                )}
                {index < experiences.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-primary-500 to-transparent z-0 top-4 h-full" />
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`glass-effect rounded-xl p-8 relative z-10 ${index % 2 === 0 ? 'ml-8 md:ml-0 md:mr-1/2' : 'mr-8 md:mr-0 md:ml-1/2'
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
                  <div className="w-16 h-16 flex items-center justify-center">
                    {experience.company === "Buguard" ? (
                      <img 
                        src="https://buguard.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-white.25a8471d.png&w=96&q=75" 
                        alt="Buguard Logo" 
                        className="w-14 h-14 object-contain rounded-lg"
                      />
                    ) : experience.company === "Freelance" ? (
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center p-2">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {experience.company.charAt(0)}
                      </div>
                    )}
                  </div>
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