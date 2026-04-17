import React, { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface GoldShineButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  style?: React.CSSProperties
}

export const GoldShineButton = ({ children, className, onClick, disabled, type = "button", ...props }: GoldShineButtonProps) => {
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

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden px-8 py-4 rounded-full font-bold text-white transition-all active:scale-95 shadow-[0px_20px_40px_rgba(0,0,0,0.15)]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #AA8238 100%)",
        ["--mouse-x" as any]: x,
        ["--mouse-y" as any]: y,
      }}
      {...(props as any)}
    >
      {/* Cursor-tracking shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.35) 0%, transparent 60%)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
