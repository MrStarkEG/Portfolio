'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, MessageCircle, Mail } from 'lucide-react'

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const roles = [
    'Web Scraping Expert',
    'Data Engineer',
    'Backend Developer'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setIsTransitioning(false)
      }, 500) // Smooth transition delay
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden section-gradient-1 gradient-overlay">
      {/* Dynamic animated background gradients */}
      <motion.div
        key={currentRole}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {currentRole === 0 && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/15 animate-pulse" />
        )}
        {currentRole === 1 && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-teal-900/20 to-green-900/15 animate-pulse" />
        )}
        {currentRole === 2 && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/20 to-purple-900/15 animate-pulse" />
        )}
      </motion.div>

      {/* Subtle floating particles that change color with roles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${currentRole === 0 ? 'bg-blue-400' :
              currentRole === 1 ? 'bg-emerald-400' :
                'bg-indigo-400'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced floating particles with role-based colors */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full particle-float ${currentRole === 0 ? 'bg-blue-400' :
              currentRole === 1 ? 'bg-emerald-400' :
                'bg-indigo-400'
              } transition-all duration-1000`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Smooth transition overlay */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-sm"
        />
      )}

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Hi, I'm{' '}
            <span className="gradient-text">MrStarkEG</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center"
          >
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }
              }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              className="inline-block relative"
            >
              <span className={`font-semibold ${currentRole === 0 ? 'text-blue-400 text-glow-blue' :
                currentRole === 1 ? 'text-emerald-400 text-glow-emerald' :
                  'text-indigo-400 text-glow-indigo'
                } transition-all duration-1000`}>
                {roles[currentRole]}
              </span>

              {/* Subtle glow effect that changes with roles */}
              <motion.div
                className={`absolute inset-0 blur-lg opacity-30 ${currentRole === 0 ? 'bg-blue-400' :
                  currentRole === 1 ? 'bg-emerald-400' :
                    'bg-indigo-400'
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Passionate about extracting insights from data and building scalable web solutions.
            Currently working at <span className="text-primary-400 font-semibold">Buguard</span>,
            crafting innovative solutions for complex data challenges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center space-x-6"
          >
            <motion.a
              href="https://t.me/MrStarkEG"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              title="Telegram"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:ahmedelshahat70000@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              title="Email"
            >
              <Mail size={28} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/mrstarkeg/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              title="LinkedIn"
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a
              href="https://github.com/MrStarkEG"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              title="GitHub"
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              href="https://medium.com/@mrstarkeg"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              title="Medium"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>



        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}