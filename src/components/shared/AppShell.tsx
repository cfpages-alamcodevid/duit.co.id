import React from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] dark:bg-black transition-colors duration-300">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  )
}
