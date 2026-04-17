import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GreenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const GreenButton = ({ children, className, ...props }: GreenButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "bg-[#004D40] hover:bg-[#00695C] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
