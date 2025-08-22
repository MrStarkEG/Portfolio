'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MessageCircle, MapPin, Phone, Linkedin, Code2, Zap, Shield, Users } from 'lucide-react'
import { getStats } from '@/lib/api'

export default function Contact() {
  const [stats, setStats] = useState({ projects_completed: 0, years_experience: 0, technologies_mastered: 0, clients_satisfied: 0 })

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

    useEffect(() => {
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
    }, [end, duration])

    return <span>{count}</span>
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      label: 'Telegram',
      value: '@MrStarkEG',
      link: 'https://t.me/MrStarkEG'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'ahmedelshahat70000@gmail.com',
      link: 'mailto:ahmedelshahat70000@gmail.com'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'Ahmed Elshahat',
      link: 'https://www.linkedin.com/in/ahmed-elshahat-25690b27b/'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      ),
      label: 'Medium',
      value: '@mrstarkeg',
      link: 'https://medium.com/@mrstarkeg'
    }
  ]

  const whyWorkWithMe = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Quick turnaround times without compromising quality",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Expert Developer",
      description: "Specialized in web scraping, automation & backend systems",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security First",
      description: "Built-in security practices and threat intelligence expertise",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Great Communication",
      description: "Clear updates, collaborative approach, and reliable delivery",
      color: "from-purple-400 to-pink-500"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-dark-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's connect and create something extraordinary together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Let's start a <span className="gradient-text">conversation</span>
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:bg-primary-600/10 transition-all duration-300"
                >
                  <div className="text-primary-400">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{info.label}</p>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Why Work With <span className="gradient-text">Me?</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whyWorkWithMe.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.3 }
                  }}
                  style={{ willChange: 'transform' }}
                  className="glass-effect rounded-xl p-6 card-hover relative overflow-hidden group transform-gpu"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4`}
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        delay: index * 0.5
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  
                  <motion.div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} rounded-full blur-sm opacity-15`}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}