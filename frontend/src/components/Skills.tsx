'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Cloud, Shield, Cpu, Sparkles } from 'lucide-react'
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

  const getSkillLevel = (level: number) => {
    if (level >= 90) return { text: 'Expert', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20', borderColor: 'border-emerald-500/50', dots: 5 }
    if (level >= 80) return { text: 'Advanced', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/50', dots: 4 }
    if (level >= 70) return { text: 'Proficient', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/50', dots: 3 }
    return { text: 'Learning', color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/50', dots: 2 }
  }

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'backend':
      case 'programming':
        return <Code2 className="w-5 h-5" />
      case 'database':
      case 'data engineering':
        return <Database className="w-5 h-5" />
      case 'cloud':
      case 'devops':
        return <Cloud className="w-5 h-5" />
      case 'security':
        return <Shield className="w-5 h-5" />
      case 'ai/ml':
        return <Sparkles className="w-5 h-5" />
      default:
        return <Cpu className="w-5 h-5" />
    }
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
            Technologies and tools I work with to build amazing solutions
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredSkills.map((skill, index) => {
            const skillLevel = getSkillLevel(skill.level)
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
                className={`relative group`}
              >
                <div className={`glass-effect rounded-xl p-4 text-center border ${skillLevel.borderColor} ${skillLevel.bgColor} backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                  <motion.div 
                    className="flex justify-center mb-3"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1
                    }}
                  >
                    <div className={`p-2 rounded-lg ${skillLevel.bgColor}`}>
                      {getCategoryIcon(skill.category)}
                    </div>
                  </motion.div>
                  
                  <h3 className="text-white font-semibold text-sm mb-1">{skill.name}</h3>
                  
                  {skill.tag && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary-600/20 text-primary-300 border border-primary-500/30 mb-2">
                      {skill.tag}
                    </span>
                  )}
                  
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.2,
                          delay: index * 0.02 + i * 0.05
                        }}
                        className={`w-2 h-2 rounded-full ${
                          i < skillLevel.dots 
                            ? `${skillLevel.bgColor} ring-2 ring-offset-1 ring-offset-dark-900 ring-${skillLevel.color.replace('text-', '').replace('-400', '-500')}`
                            : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <span className={`text-xs font-medium ${skillLevel.color}`}>
                    {skillLevel.text}
                  </span>
                  
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`absolute inset-0 rounded-xl ${skillLevel.bgColor} blur-xl opacity-50`} />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
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