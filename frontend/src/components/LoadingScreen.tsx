'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const intervalTime = 20
    const steps = duration / intervalTime
    const increment = 100 / steps

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-end justify-start p-10 cursor-none">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <motion.h1
            className="text-[15vw] leading-none font-bold text-white tracking-tighter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(count)}
          </motion.h1>
          <span className="text-2xl text-primary-500 font-bold mb-4 md:mb-8">%</span>
        </div>
        <div className="w-full h-[1px] bg-white/20 mt-4 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary-500"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  )
}