import React from "react"
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/5 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <span className="text-2xl font-bold tracking-tight text-white">
            Duit<span className="text-money-green">.co.id</span>
          </span>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            The definitive platform for Indonesian financial sovereignty. From debt liquidation to family office management.
          </p>
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs hover:border-gold transition-colors cursor-pointer">TW</span>
            <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs hover:border-gold transition-colors cursor-pointer">IG</span>
            <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs hover:border-gold transition-colors cursor-pointer">YT</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Ecosystem</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link to="/dashboard" className="hover:text-money-green transition-colors">My Feed</Link></li>
            <li><Link to="/knowledge" className="hover:text-money-green transition-colors">Knowledge Hub</Link></li>
            <li><Link to="/tools" className="hover:text-money-green transition-colors">Financial Tools</Link></li>
            <li><Link to="/law" className="hover:text-money-green transition-colors">Law Library</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Solutions</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link to="/academy" className="hover:text-money-green transition-colors">Academy</Link></li>
            <li><Link to="/experts" className="hover:text-gold transition-colors">Expert Directory</Link></li>
            <li><Link to="/quiz" className="hover:text-money-green transition-colors">Financial Quiz</Link></li>
            <li><Link to="/about" className="hover:text-money-green transition-colors">About the Vault</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Sovereignty</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Protocol</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Sovereign Terms</Link></li>
            <li><Link to="/disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link></li>
            <li><Link to="/profile" className="hover:text-white transition-colors">Account Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        <p>© 2024 Duit.co.id. All rights reserved.</p>
        <p className="text-gold/50">Engineered for the Elite</p>
        <p>A part of the Sovereign Financial Network.</p>
      </div>
    </footer>
  )
}
