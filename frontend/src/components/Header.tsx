'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Graph', href: '#threat-intel' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Open Source', href: '#open-source' },
  { name: 'Writing', href: '#articles' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-2xl shadow-black/20">
          {/* Logo */}
          <a href="#" className="font-bold text-xl tracking-tighter text-white hover:text-primary-400 transition-colors">
            MrStark<span className="text-primary-500">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-white/5 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:block px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-full transition-colors"
            onMouseEnter={() => document.body.classList.add('cursor-hover')}
            onMouseLeave={() => document.body.classList.remove('cursor-hover')}
          >
            Let's Talk
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}