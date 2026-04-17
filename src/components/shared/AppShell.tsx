import React from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F9FA] to-[#F5F6F7] dark:bg-black transition-colors duration-500">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-money-green/3 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-aureum-gold/3 rounded-full blur-3xl" />
      </div>
      
      {/* Main glass container */}
      <div className="relative z-10 min-h-screen flex flex-col glass-card rounded-none sm:rounded-2xl sm:m-4 sm:border border-white/15 dark:border-white/10">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
