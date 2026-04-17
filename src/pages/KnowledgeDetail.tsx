import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';

const YouTubeLockGate = () => (
  <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-gold/30">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-10">
      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-4 border border-gold/50">
        <span className="text-3xl text-gold">🔒</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Premium Video Content</h3>
      <p className="text-slate-400 max-w-md mb-6">This masterclass is locked for Tier 1 members and above. Subscribe to our YouTube and link your account to unlock.</p>
      <GoldShineButton>Subscribe & Unlock</GoldShineButton>
    </div>
    <img 
      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200" 
      alt="Video Thumbnail" 
      className="w-full h-full object-cover opacity-30"
    />
  </div>
);

export const KnowledgeDetail: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-money-green/10 text-money-green text-xs font-bold uppercase">Tier 2: Scaler</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 text-sm">15 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Architecture of Autonomy: Building Systems That Scale
          </h1>
          <div className="flex items-center gap-4 border-b border-white/10 pb-10">
            <div className="w-12 h-12 rounded-full bg-slate-800"></div>
            <div>
              <p className="font-bold">Duit.co.id Editorial</p>
              <p className="text-sm text-slate-500">Updated Oct 24, 2023</p>
            </div>
          </div>
        </header>

        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            The greatest trap for any entrepreneur is the "Hustle Paradox." You build a business to gain freedom, only to find yourself working more hours than you ever did as an employee. To escape, you must transition from an operator to an architect.
          </p>
          
          <YouTubeLockGate />

          <h2 className="text-2xl font-bold text-gold mt-12 mb-4">The 3 Pillars of SOPs</h2>
          <p className="mb-6">
            Standard Operating Procedures (SOPs) are the DNA of your business. Without them, your business is just a collection of your own habits. A truly scalable system relies on:
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li><strong>Clarity:</strong> Every step must be unambiguous enough for a junior to execute.</li>
            <li><strong>Accountability:</strong> Every process must have a single owner.</li>
            <li><strong>Evolution:</strong> Systems must be reviewed every 90 days.</li>
          </ul>

          <GlassCard className="p-8 my-10 bg-money-green/5 border-money-green/20">
            <h3 className="text-xl font-bold text-money-green mb-4">💡 Sovereign Tip</h3>
            <p className="m-0 italic">
              "Don't write what you do. Record yourself doing it, then have someone else write the SOP based on the recording. This ensures nothing is missed."
            </p>
          </GlassCard>

          <p>
            In the next section, we will explore the legal structures required to protect these systems through intellectual property filings...
          </p>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button className="text-slate-400 hover:text-white transition-colors">Share</button>
              <button className="text-slate-400 hover:text-white transition-colors">Bookmark</button>
            </div>
            <div className="flex gap-2">
              <span className="text-slate-500 text-sm italic">#Systems</span>
              <span className="text-slate-500 text-sm italic">#Scaling</span>
              <span className="text-slate-500 text-sm italic">#Wealth</span>
            </div>
          </div>
        </footer>
      </motion.article>
    </div>
  );
};

export default KnowledgeDetail;
