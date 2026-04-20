import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Twitter, Instagram, Youtube, LayoutDashboard, BookOpen, Wrench, Scale, GraduationCap, Users, ClipboardCheck, Info, Shield, FileText, AlertTriangle, Lock } from "lucide-react"
import { VERSION, BUILD_DATE } from "@/version"

export const Footer = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="w-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border-t border-white/10 dark:border-white/8 py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <span className="text-2xl font-bold tracking-tight text-heading">
            Duit<span className="text-money-green">.co.id</span>
          </span>
          <p className="text-sm text-body leading-relaxed max-w-xs">
            Platform keuangan #1 Indonesia untuk kedaulatan finansial. Dari pelunasan utang hingga pengelolaan Family Office.
          </p>
          <div className="flex gap-3">
            <a href="https://twitter.com/duitcoid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/15 flex items-center justify-center hover:border-aureum-gold/30 transition-all cursor-pointer text-[#454748] dark:text-[#B0B3B8] hover:text-aureum-gold hover:scale-110">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/duitcoid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/15 flex items-center justify-center hover:border-aureum-gold/30 transition-all cursor-pointer text-[#454748] dark:text-[#B0B3B8] hover:text-aureum-gold hover:scale-110">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/c/duitcoid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/15 flex items-center justify-center hover:border-aureum-gold/30 transition-all cursor-pointer text-[#454748] dark:text-[#B0B3B8] hover:text-aureum-gold hover:scale-110">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-heading uppercase tracking-widest text-xs flex items-center gap-2">
            <LayoutDashboard className="w-3 h-3" />
            Ecosystem
          </h4>
          <ul className="space-y-4 text-sm text-body">
            <li>
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-money-green transition-colors">
                <LayoutDashboard className="w-3.5 h-3.5" />
                My Feed
              </Link>
            </li>
            <li>
              <Link to="/artikel" className="flex items-center gap-2 hover:text-money-green transition-colors">
                <BookOpen className="w-3.5 h-3.5" />
                Knowledge Hub
              </Link>
            </li>
            <li>
              <Link to="/tools" className="flex items-center gap-2 hover:text-money-green transition-colors">
                <Wrench className="w-3.5 h-3.5" />
                Financial Tools
              </Link>
            </li>
            <li>
              <Link to="/law" className="flex items-center gap-2 hover:text-money-green transition-colors">
                <Scale className="w-3.5 h-3.5" />
                Law Library
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-heading uppercase tracking-widest text-xs flex items-center gap-2">
            <GraduationCap className="w-3 h-3" />
            Solutions
          </h4>
          <ul className="space-y-4 text-sm text-body">
            <li>
              <Link to="/academy" className="flex items-center gap-2 hover:text-money-green transition-colors">
                <GraduationCap className="w-3.5 h-3.5" />
                Academy
              </Link>
            </li>
            <li>
              <Link to="/experts" className="flex items-center gap-2 hover:text-aureum-gold transition-colors">
                <Users className="w-3.5 h-3.5" />
                Expert Directory
              </Link>
            </li>
            <li>
              <Link to="/quiz" className="flex items-center gap-2 hover:text-money-green transition-colors">
                <ClipboardCheck className="w-3.5 h-3.5" />
                Financial Quiz
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center gap-2 hover:text-money-green transition-colors">
                <Info className="w-3.5 h-3.5" />
                About the Vault
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-heading uppercase tracking-widest text-xs flex items-center gap-2">
            <Shield className="w-3 h-3" />
            Sovereignty
          </h4>
          <ul className="space-y-4 text-sm text-body">
            <li>
              <Link to="/privacy" className="flex items-center gap-2 hover:text-heading transition-colors">
                <Lock className="w-3.5 h-3.5" />
                Privacy Protocol
              </Link>
            </li>
            <li>
              <Link to="/terms" className="flex items-center gap-2 hover:text-heading transition-colors">
                <FileText className="w-3.5 h-3.5" />
                Sovereign Terms
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="flex items-center gap-2 hover:text-heading transition-colors">
                <AlertTriangle className="w-3.5 h-3.5" />
                Legal Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center gap-2 hover:text-heading transition-colors">
                <Shield className="w-3.5 h-3.5" />
                Account Security
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-body uppercase tracking-widest font-bold">
        <div className="flex items-center gap-4">
          <p>© {year} Duit.co.id. All rights reserved.</p>
          <span className="text-white/20">|</span>
          <code className="text-xs text-money-green/60 font-mono">v{VERSION}</code>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-aureum-gold/50">Engineered for the Elite</p>
          <span className="text-white/20">|</span>
          <p>A part of the Sovereign Financial Network.</p>
        </div>
      </div>
    </footer>
  )
}
