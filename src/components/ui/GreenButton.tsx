import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GreenButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export const GreenButton = ({ children, className, onClick, disabled, type = "button" }: GreenButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-gradient-to-r from-money-green to-money-green-light hover:from-money-green-light hover:to-money-green text-white px-8 py-4 rounded-full font-bold shadow-[0px_20px_40px_rgba(0,77,64,0.2)] transition-all",
        className
      )}
    >
      {children}
    </motion.button>
  )
}
