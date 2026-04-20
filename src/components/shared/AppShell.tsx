import React from "react"
import { Link } from "react-router-dom"
import { Shield, Menu, User, LayoutDashboard, Scale, Users } from "lucide-react"
import { KnowledgeMegaMenu, ToolsMegaMenu, AcademyMegaMenu, HukumMegaMenu, AhliMegaMenu } from "@/components/ui/MegaMenu"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Footer } from "./Footer"

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#F1F8E9] to-[#F9FBE7] dark:from-black dark:via-[#0A0F0D] dark:to-black transition-colors duration-500">
      {/* Decorative background elements - Money Green orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-money-green/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-aureum-gold/8 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-money-green/5 rounded-full blur-3xl" />
      </div>

      {/* Main glass wrapper with rounded corners */}
      <div className="relative z-10 min-h-screen flex flex-col rounded-none sm:rounded-[28px] sm:m-3 lg:m-5 overflow-hidden glass-body">
        {/* Single Navbar Row - Logo (left), Centered Menu, User Icons (right) */}
        <div className="w-full bg-white/15 dark:bg-black/15 border-b border-white/10 dark:border-white/5 px-4 sm:px-6 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Site Title */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <Shield className="w-7 h-7 text-money-green" />
              <span className="text-lg font-bold tracking-tight text-etched-heading hidden sm:block">
                Duit<span className="text-money-green">.co.id</span>
              </span>
            </Link>

            {/* Centered Main Menu */}
            <div className="flex items-center gap-5">
              <KnowledgeMegaMenu />
              <ToolsMegaMenu />
              <HukumMegaMenu />
              <AcademyMegaMenu />
              <AhliMegaMenu />
            </div>

            {/* User Icons + CTA */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <ThemeToggle />
              <div className="relative group">
                <Link to="/dashboard" className="p-2 rounded-lg text-etched hover:text-money-green hover:bg-white/10 transition-all" title="Dashboard">
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Dashboard
                </span>
              </div>
              <div className="relative group">
                <Link to="/profil" className="p-2 rounded-lg text-etched hover:text-heading hover:bg-white/10 transition-all" title="Profil">
                  <User className="w-5 h-5 text-aureum-gold" />
                </Link>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Profil
                </span>
              </div>
              <Link to="/quiz" className="gold-button text-white px-5 py-2 rounded-[12px] text-sm font-bold transition-all">
                Mulai
              </Link>
            </div>
          </div>
        </div>
        
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
