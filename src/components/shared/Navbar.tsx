import React from "react"
import { Link } from "react-router-dom"
import { Shield, Menu, User, LayoutDashboard, Scale, Users } from "lucide-react"
import { KnowledgeMegaMenu, ToolsMegaMenu, AcademyMegaMenu } from "@/components/ui/MegaMenu"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export const Navbar = () => {
  return (
    <nav className="w-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border-b border-white/15 dark:border-white/8 px-6 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <Shield className="w-8 h-8 text-money-green" />
        <span className="text-xl font-bold tracking-tight text-heading">
          Duit<span className="text-money-green">.co.id</span>
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-6">
        <Link to="/dashboard" className="flex items-center text-sm font-medium text-body hover:text-money-green transition-colors">
          <LayoutDashboard className="w-4 h-4 mr-1.5" />
          Dashboard
        </Link>
        <KnowledgeMegaMenu />
        <ToolsMegaMenu />
        <Link to="/law" className="flex items-center text-sm font-medium text-body hover:text-money-green transition-colors">
          <Scale className="w-4 h-4 mr-1.5" />
          Hukum
        </Link>
        <AcademyMegaMenu />
        <Link to="/experts" className="flex items-center text-sm font-medium text-body hover:text-aureum-gold transition-colors font-semibold">
          <Users className="w-4 h-4 mr-1.5" />
          Ahli
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link to="/profile" className="hidden sm:flex items-center gap-2 text-sm font-medium text-body hover:text-heading transition-colors">
          <User className="w-4 h-4 text-aureum-gold" />
          Profil
        </Link>
        <Link to="/quiz" className="bg-gradient-to-r from-money-green to-money-green-light hover:from-money-green-light hover:to-money-green text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(0,77,64,0.4)] transition-all">
          Mulai Sekarang
        </Link>
        <button className="lg:hidden text-heading">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}
