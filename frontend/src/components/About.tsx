'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Globe, Zap } from 'lucide-react'
import { getStats, type Stats } from '@/lib/api'

export default function About() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }
    fetchStats()
  }, [])

  const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
      if (!hasStarted) return

      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }, [end, duration, hasStarted])

    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setHasStarted(true)}
      >
        {count}
      </motion.span>
    )
  }

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Scraping',
      description: 'Expert in extracting data from complex websites using advanced scraping techniques and anti-detection methods.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Data Engineering',
      description: 'Building robust data pipelines and ETL processes to transform raw data into actionable insights.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Full-Stack Development',
      description: 'Creating modern web applications with Next.js, FastAPI, and other cutting-edge technologies.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed, scalability, and reliability in production environments.'
    }
  ]

  return (
    <section id="about" className="py-20 bg-dark-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm a passionate software developer with expertise in web scraping, data engineering,
            and full-stack development. Currently working at Buguard, I specialize in creating
            scalable solutions that turn complex data challenges into business opportunities.
          </p>
        </motion.div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl font-bold gradient-text mb-2"
              >
                <AnimatedCounter end={stats.projects_completed} />+
              </motion.div>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-4xl font-bold gradient-text mb-2"
              >
                <AnimatedCounter end={stats.years_experience} />+
              </motion.div>
              <p className="text-gray-400">Years Experience</p>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold gradient-text mb-2"
              >
                <AnimatedCounter end={stats.technologies_mastered} />+
              </motion.div>
              <p className="text-gray-400">Technologies</p>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl font-bold gradient-text mb-2"
              >
                <AnimatedCounter end={stats.clients_satisfied} />+
              </motion.div>
              <p className="text-gray-400">Happy Clients</p>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-xl p-6 text-center card-hover"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-primary-400 mb-4 flex justify-center"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}