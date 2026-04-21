import React from "react"
import { Link } from "react-router-dom"
import { Shield, Menu, User, LayoutDashboard } from "lucide-react"
import { KnowledgeMegaMenu, ToolsMegaMenu, AcademyMegaMenu, HukumMegaMenu, AhliMegaMenu } from "@/components/ui/MegaMenu"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export const Navbar = () => {
  return (
    <nav className="w-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border-b border-white/15 dark:border-white/8 px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <Shield className="w-7 h-7 text-money-green" />
        <span className="text-lg font-bold tracking-tight text-etched-heading hidden sm:block">
          Duit<span className="text-money-green">.co.id</span>
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-5">
        <KnowledgeMegaMenu />
        <ToolsMegaMenu />
        <HukumMegaMenu />
        <AcademyMegaMenu />
        <AhliMegaMenu />
      </div>

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
          <Link to="/profile" className="p-2 rounded-lg text-etched hover:text-heading hover:bg-white/10 transition-all" title="Profil">
            <User className="w-5 h-5 text-aureum-gold" />
          </Link>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Profil
          </span>
        </div>
        <Link to="/quiz" className="gold-button text-white px-5 py-2 rounded-[12px] text-sm font-bold transition-all">
          Mulai
        </Link>
        <button className="lg:hidden text-heading">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}
