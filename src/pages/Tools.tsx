import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GreenButton } from '@/components/ui/GreenButton';
import { motion } from 'framer-motion';
import { Shield, Rocket, TrendingUp, Building2 } from 'lucide-react';

const TOOL_CATEGORIES = [
  {
    title: "Survival Tools",
    description: "Debt generators, survival budgeting, and pinjol defense calculators.",
    tier: "Tier 0",
    tools: ["Debt Payoff Calculator", "Survival Budgeter", "Legal Defense Template"],
    color: "border-money-green/15",
    icon: Shield
  },
  {
    title: "Hustler Tools",
    description: "Pricing calculators, sales scripts, and income trackers.",
    tier: "Tier 1",
    tools: ["Freelance Rate Calculator", "Sales Script Generator", "ROI Tracker"],
    color: "border-money-green/15",
    icon: Rocket
  },
  {
    title: "Scaler Tools",
    description: "KPI trackers, SOP builders, and hiring frameworks.",
    tier: "Tier 2",
    tools: ["SOP Template Builder", "KPI Dashboard", "Hiring Cost Calculator"],
    color: "border-aureum-gold/15",
    icon: TrendingUp
  },
  {
    title: "Investor Tools",
    description: "ROI, Cap Rate, and Portfolio management calculators.",
    tier: "Tier 3 & 4",
    tools: ["Property ROI Calculator", "Cap Rate Calculator", "Portfolio Rebalancer"],
    color: "border-aureum-gold/15",
    icon: Building2
  }
];

export const Tools: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial <span className="text-money-green">Arsenal</span></h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Interactive tools designed to give you the upper hand in your financial journey, from survival to legacy.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TOOL_CATEGORIES.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className={`p-8 h-full border-2 ${category.color} hover:bg-white/5 transition-all`}>
              <category.icon className="w-12 h-12 text-money-green mb-4" />
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-heading">{category.title}</h2>
                <span className="px-3 py-1 rounded-full glass-card text-xs uppercase font-bold">
                  {category.tier}
                </span>
              </div>
              <p className="text-body mb-6">{category.description}</p>

              <div className="space-y-3 mb-8">
                {category.tools.map((tool, tIndex) => (
                  <div key={tIndex} className="flex items-center gap-3 text-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-money-green"></span>
                    {tool}
                  </div>
                ))}
              </div>

              <GreenButton className="w-full">Access Tools</GreenButton>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
