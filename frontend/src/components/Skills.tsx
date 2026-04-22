'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getSkills, type Skill } from '@/lib/api'

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills()
        setSkills(data)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
      }
    }
    fetchSkills()
  }, [])

  // Group skills
  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex items-end justify-between border-b border-white/20 pb-8"
        >
          <h2 className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white">
            TECHNICAL<br />EXPERTISE
          </h2>
          <span className="hidden md:inline-block text-sm font-mono text-gray-500 mb-2">
            FULL_STACK_ARSENAL
          </span>
        </motion.div>

        <div className="flex flex-col">
          {Object.entries(skillCategories).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group py-8 border-b border-white/10 flex flex-col md:flex-row md:items-start gap-8"
            >
              {/* Category Name */}
              <div className="md:w-1/3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-primary-500">0{index + 1}</span>
                  <h3 className="text-2xl text-white font-bold tracking-tight uppercase group-hover:text-primary-300 transition-colors duration-300">
                    {category}
                  </h3>
                </div>
              </div>

              {/* Skills List */}
              <div className="md:w-2/3">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {items.map((skill) => (
                    <div key={skill.name} className="relative group/skill">
                      <span className="text-lg md:text-xl text-gray-400 group-hover/skill:text-white transition-colors cursor-default">
                        {skill.name}
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-500 transition-all duration-300 group-hover/skill:w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}