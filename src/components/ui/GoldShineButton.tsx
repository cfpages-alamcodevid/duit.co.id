import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface GoldShineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const GoldShineButton = ({ children, className, ...props }: GoldShineButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const xPos = e.clientX - rect.left
    const yPos = e.clientY - rect.top
    mouseX.set(xPos)
    mouseY.set(yPos)
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "gold-shine relative overflow-hidden px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg",
        className
      )}
      style={
        {
          "--mouse-x": `${x.get()}px`,
          "--mouse-y": `${y.get()}px`,
        } as any
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
        }}
      />
    </motion.button>
  )
}
