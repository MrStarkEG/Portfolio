'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getSkills, type Skill } from '@/lib/api'

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')

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

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))]
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-500 to-emerald-500'
    if (level >= 80) return 'from-blue-500 to-cyan-500'
    if (level >= 70) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <section id="skills" className="py-20 bg-dark-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'glass-effect text-gray-300 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 card-hover"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <span className="text-primary-400 font-bold">{skill.level}%</span>
              </div>
              
              <div className="w-full bg-dark-700 rounded-full h-3 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)}`}
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>{skill.category}</span>
                <span>
                  {skill.level >= 90 ? 'Expert' : 
                   skill.level >= 80 ? 'Advanced' : 
                   skill.level >= 70 ? 'Intermediate' : 'Beginner'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Continuous Learning
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I'm constantly expanding my skill set and staying up-to-date with the latest 
              technologies and best practices in software development. My passion for learning 
              drives me to explore new tools and methodologies that can enhance my work and 
              deliver better solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}