'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('ahmedelshahat70000@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20 gap-8 md:gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[12vw] sm:text-[10vw] md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-white leading-[0.85]"
          >
            LET'S <br />
            WORK <br />
            TOGETHER
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-auto lg:max-w-md"
          >
            <p className="text-gray-400 text-base sm:text-lg mb-6 md:mb-8 leading-relaxed">
              I'm currently available for freelance projects and open to new opportunities.
              If you have a project in mind, let's make it happen.
            </p>
            <button
              onClick={copyEmail}
              className="flex items-center gap-3 text-white border border-white/20 rounded-full px-4 sm:px-6 py-3 hover:bg-white hover:text-black transition-colors group text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start overflow-hidden"
            >
              <span className="truncate">ahmedelshahat70000@gmail.com</span>
              {copied ? <Check size={18} className="shrink-0" /> : <Copy size={18} className="shrink-0" />}
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 border-t border-white/10 pt-10 md:pt-12">
          {[
            { name: 'Github', url: 'https://github.com/MrStarkEG' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mrstarkeg/' },
            { name: 'Telegram', url: 'https://t.me/MrStarkEG' },
            { name: 'Medium', url: 'https://medium.com/@mrstarkeg' }
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest block mb-2 group-hover:text-primary-500 transition-colors">Social</span>
              <div className="flex items-center gap-2 text-base sm:text-xl font-bold text-white group-hover:translate-x-2 transition-transform">
                {social.name}
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}