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
      className={cn(
        "gold-button px-6 py-2.5 rounded-[12px] font-bold text-white transition-all",
        className
      )}
      style={{
        ["--mouse-x" as any]: x,
        ["--mouse-y" as any]: y,
      }}
      {...(props as any)}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
