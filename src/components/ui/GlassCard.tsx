import React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-[24px] p-6 sm:p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
