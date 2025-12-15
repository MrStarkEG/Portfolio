'use client'

import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 bg-background border-t border-white/10 relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left">
          <h4 className="text-2xl font-bold text-white tracking-tighter">
            MrStark<span className="text-primary-500">.</span>
          </h4>
          <p className="text-gray-500 text-sm mt-1">
            &copy; {new Date().getFullYear()} Ahmed Elshahat. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <span className="text-gray-500 text-sm hidden md:block">
            Designed & Built with <span className="text-red-500">♥</span> in Egypt
          </span>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  )
}