import React from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen">
      {/* Decorative background elements - Money Green orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-money-green/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-aureum-gold/8 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-money-green/5 rounded-full blur-3xl" />
      </div>

      {/* Main glass wrapper - full viewport, no white gaps */}
      <div className="relative z-10 min-h-screen flex flex-col rounded-none sm:rounded-[24px] m-0 sm:m-2 lg:m-8 overflow-hidden glass-body border border-white/25 dark:border-white/10">
        <Navbar />
        
        {/* Main content area with proper padding */}
        <main className="flex-grow px-4 sm:px-6 lg:px-12 py-8">
          {children}
        </main>
        
        {/* Footer - part of the unified body, no glass-card needed */}
        <Footer />
      </div>
    </div>
  )
}
