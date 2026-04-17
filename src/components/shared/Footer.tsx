import React from "react"
import { Link } from "react-router-dom"
import { Twitter, Instagram, Youtube } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="w-full glass-card border-t border-white/15 py-16 px-4 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <span className="text-2xl font-bold tracking-tight text-heading">
            Duit<span className="text-money-green">.co.id</span>
          </span>
          <p className="text-sm text-body leading-relaxed max-w-xs">
            The definitive platform for Indonesian financial sovereignty. From debt liquidation to family office management.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com/duitcoid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card border border-white/15 flex items-center justify-center hover:border-aureum-gold/15 transition-colors cursor-pointer text-body hover:text-aureum-gold">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/duitcoid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card border border-white/15 flex items-center justify-center hover:border-aureum-gold/15 transition-colors cursor-pointer text-body hover:text-aureum-gold">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/c/duitcoid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card border border-white/15 flex items-center justify-center hover:border-aureum-gold/15 transition-colors cursor-pointer text-body hover:text-aureum-gold">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-heading uppercase tracking-widest text-xs">Ecosystem</h4>
          <ul className="space-y-4 text-sm text-body">
            <li><Link to="/dashboard" className="hover:text-money-green transition-colors">My Feed</Link></li>
            <li><Link to="/knowledge" className="hover:text-money-green transition-colors">Knowledge Hub</Link></li>
            <li><Link to="/tools" className="hover:text-money-green transition-colors">Financial Tools</Link></li>
            <li><Link to="/law" className="hover:text-money-green transition-colors">Law Library</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-heading uppercase tracking-widest text-xs">Solutions</h4>
          <ul className="space-y-4 text-sm text-body">
            <li><Link to="/academy" className="hover:text-money-green transition-colors">Academy</Link></li>
            <li><Link to="/experts" className="hover:text-aureum-gold transition-colors">Expert Directory</Link></li>
            <li><Link to="/quiz" className="hover:text-money-green transition-colors">Financial Quiz</Link></li>
            <li><Link to="/about" className="hover:text-money-green transition-colors">About the Vault</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-heading uppercase tracking-widest text-xs">Sovereignty</h4>
          <ul className="space-y-4 text-sm text-body">
            <li><Link to="/privacy" className="hover:text-heading transition-colors">Privacy Protocol</Link></li>
            <li><Link to="/terms" className="hover:text-heading transition-colors">Sovereign Terms</Link></li>
            <li><Link to="/disclaimer" className="hover:text-heading transition-colors">Legal Disclaimer</Link></li>
            <li><Link to="/profile" className="hover:text-heading transition-colors">Account Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-body uppercase tracking-widest font-bold">
        <p>© 2024 Duit.co.id. All rights reserved.</p>
        <p className="text-aureum-gold/50">Engineered for the Elite</p>
        <p>A part of the Sovereign Financial Network.</p>
      </div>
    </footer>
  )
}
