import React from "react"
import { Link } from "react-router-dom"
import { Shield, Menu, User } from "lucide-react"

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="w-full max-w-7xl glass-card rounded-full px-6 py-3 flex items-center justify-between border border-white/10 backdrop-blur-xl bg-white/5">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-money-green" />
          <span className="text-xl font-bold tracking-tight text-white">
            Duit<span className="text-money-green">.co.id</span>
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-money-green transition-colors">Dashboard</Link>
          <Link to="/knowledge" className="text-sm font-medium text-slate-300 hover:text-money-green transition-colors">Knowledge</Link>
          <Link to="/tools" className="text-sm font-medium text-slate-300 hover:text-money-green transition-colors">Tools</Link>
          <Link to="/law" className="text-sm font-medium text-slate-300 hover:text-money-green transition-colors">Law</Link>
          <Link to="/academy" className="text-sm font-medium text-slate-300 hover:text-money-green transition-colors">Academy</Link>
          <Link to="/experts" className="text-sm font-medium text-slate-300 hover:text-gold transition-colors font-semibold">Experts</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/profile" className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <User className="w-4 h-4 text-gold" />
            Profile
          </Link>
          <Link to="/quiz" className="bg-money-green text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(0,77,64,0.4)] transition-all">
            Get Started
          </Link>
          <button className="lg:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}
