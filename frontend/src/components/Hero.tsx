'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import FloatingLines from './FloatingLines'

const roles = [
  { text: "WEB SCRAPING EXPERT", gradient: "from-orange-400 via-amber-500 to-yellow-500" },
  { text: "DATA ENGINEER", gradient: "from-emerald-400 via-green-500 to-lime-500" },
  { text: "BACKEND DEVELOPER", gradient: "from-blue-400 via-indigo-500 to-purple-500" }
]


const roleColors = [
  ['#fb923c', '#f59e0b', '#eab308'], // Web Scraping (Orange/Amber)
  ['#34d399', '#10b981', '#15803d'], // Data Engineer (Emerald)
  ['#60a5fa', '#6366f1', '#8b5cf6']  // Backend Dev (Blue/Indigo)
]

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Loading state for orchestrated animations
  const [isLoaded, setIsLoaded] = useState(false)

  // Role rotation logic
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Split name into characters for animation
  const nameChars = "AHMED ELSHAHAT".split("")

  return (
    <section ref={containerRef} id="home" className="h-dvh w-full relative flex items-center justify-center overflow-hidden bg-background">

      {/* Dynamic Background - Enhanced Entrance */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/20 to-background/80 z-10 pointer-events-none" />

        {/* Floating Lines with Entrance Animation */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <FloatingLines
            linesGradient={roleColors[currentRoleIndex]}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[4, 6, 8]}
            lineDistance={[6, 5, 4]}
            animationSpeed={1.5}
            bendStrength={0.5}
          />
        </motion.div>

        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] md:w-[50vw] md:h-[50vw] bg-primary-900/10 rounded-full blur-[100px] mix-blend-screen"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isLoaded ? {
            opacity: [0, 1, 0.8, 1],
            scale: 1
          } : {}}
          transition={{
            duration: 2.5,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] bg-secondary-900/10 rounded-full blur-[80px] mix-blend-screen"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isLoaded ? {
            opacity: [0, 1, 0.8, 1],
            scale: 1
          } : {}}
          transition={{
            duration: 2.5,
            delay: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      </motion.div>

      {/* Main Hero Content - Centered Minimal Design */}
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">

        {/* Centered Content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="max-w-6xl mx-auto text-center select-none"
        >

          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={isLoaded ? {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)"
            } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 md:mb-12"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-xs sm:text-sm text-gray-400 font-mono">Available for new projects</span>
          </motion.div>

          {/* Main Headline - Character by Character Animation */}
          <div className="space-y-2 md:space-y-4 mb-8 md:mb-12">
            <div className="overflow-hidden">
              <motion.h1
                className="text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5rem] 2xl:text-[6rem] font-bold leading-[1] tracking-tighter text-white"
                initial={{ y: 120 }}
                animate={isLoaded ? { y: 0 } : {}}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4
                }}
              >
                {nameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 50,
                      filter: "blur(10px)",
                      scale: 0.3
                    }}
                    animate={isLoaded ? {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      scale: 1
                    } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + (index * 0.03),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block"
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                      width: char === " " ? "0.3em" : "auto"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Animated Role with Burst Effect */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  initial={{
                    opacity: 0,
                    y: 60,
                    scale: 0.8,
                    filter: "blur(20px)"
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)"
                  }}
                  exit={{
                    opacity: 0,
                    y: -60,
                    scale: 1.2,
                    filter: "blur(20px)"
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5rem] 2xl:text-[6rem] font-bold leading-[1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${roles[currentRoleIndex].gradient}`}
                  spellCheck={false}
                >
                  {roles[currentRoleIndex].text}
                </motion.h2>
              </AnimatePresence>

              {/* Glitch overlay effect on role change */}
              <motion.div
                key={`glitch-${currentRoleIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mix-blend-overlay pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{
              opacity: 0,
              y: 30,
              filter: "blur(10px)"
            }}
            animate={isLoaded ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)"
            } : {}}
            transition={{
              duration: 1.2,
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-10 md:mb-16"
          >
            Crafting scalable backend systems, intelligent data pipelines, and automated solutions that transform complex challenges into elegant digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.9
            }}
            animate={isLoaded ? {
              opacity: 1,
              y: 0,
              scale: 1
            } : {}}
            transition={{
              duration: 1,
              delay: 1.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#work"
              className="group relative px-8 py-4 rounded-full border border-white/20 bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold text-sm sm:text-base overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="group relative px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 font-semibold text-sm sm:text-base w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Talk
            </motion.a>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 py-6 md:py-8 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">

          {/* Left: Location & Status */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
              filter: "blur(10px)"
            }}
            animate={isLoaded ? {
              opacity: 1,
              x: 0,
              filter: "blur(0px)"
            } : {}}
            transition={{
              duration: 1,
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-[10px] sm:text-xs text-gray-500 font-mono text-center sm:text-left"
          >
            EGYPT, {new Date().getFullYear()}
          </motion.div>

          {/* Center: Social Links (Desktop) */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              filter: "blur(10px)"
            }}
            animate={isLoaded ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)"
            } : {}}
            transition={{
              duration: 1,
              delay: 2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="hidden md:flex items-center gap-6"
          >
            {[
              { name: 'GitHub', url: 'https://github.com/MrStarkEG' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mrstarkeg/' },
              { name: 'Telegram', url: 'https://t.me/MrStarkEG' },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-white transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 2 + (index * 0.1),
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -2, scale: 1.05 }}
              >
                {social.name}
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Scroll Indicator */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
              filter: "blur(10px)"
            }}
            animate={isLoaded ? {
              opacity: 1,
              x: 0,
              filter: "blur(0px)"
            } : {}}
            transition={{
              duration: 1,
              delay: 2.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="hidden sm:flex items-center gap-2 text-xs text-gray-500"
          >
            <span className="hidden lg:inline">Scroll to explore</span>
            <motion.div
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowDownRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}