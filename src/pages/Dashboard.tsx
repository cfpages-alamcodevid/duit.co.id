import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';

const DUMMY_ARTICLES = [
  {
    title: "The Art of Debt Liquidation",
    excerpt: "Learn the specific legal strategies to navigate high-interest debt and pinjol pressure in Indonesia.",
    tier: "Tier 0",
    category: "Survival",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1554224155-1696413575b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Side Hustles for the Digital Age",
    excerpt: "How to leverage global platforms to earn USD while living in Indonesia.",
    tier: "Tier 1",
    category: "Hustler",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Scaling Your SOPs",
    excerpt: "Transition from operator to owner by building robust systems that run without you.",
    tier: "Tier 2",
    category: "Scaler",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  }
];

const RecommendationSection = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <span className="w-2 h-8 bg-gold rounded-full block"></span>
      Recommended for You
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlassCard className="p-6 border-gold/20 bg-gold/5">
        <h3 className="text-lg font-bold text-gold mb-2">Complete Your Profile</h3>
        <p className="text-slate-400 text-sm mb-4">Unlock more personalized financial strategies by completing your detailed profile.</p>
        <GoldShineButton className="w-full">Get Started</GoldShineButton>
      </GlassCard>
      <GlassCard className="p-6 border-money-green/20">
        <h3 className="text-lg font-bold text-money-green mb-2">Debt Calculator</h3>
        <p className="text-slate-400 text-sm mb-4">Plan your path to freedom with our advanced debt payoff tool.</p>
        <button className="w-full py-2 rounded-lg border border-money-green/50 text-money-green hover:bg-money-green/10 transition-colors">
          Open Tool
        </button>
      </GlassCard>
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold mb-2">Legal Vault</h3>
        <p className="text-slate-400 text-sm mb-4">Browse the latest regulations affecting your business and assets.</p>
        <button className="w-full py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors">
          Explore Laws
        </button>
      </GlassCard>
    </div>
  </section>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Welcome Back, <span className="text-gold">Sovereign</span>
        </motion.h1>
        <p className="text-slate-400 text-lg">Your personalized path to financial independence and legacy.</p>
      </header>

      <RecommendationSection />

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-8 bg-money-green rounded-full block"></span>
            My Feed
          </h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full border border-white/10 text-xs bg-white/5">Tier 0</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-xs bg-white/5">Tier 1</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_ARTICLES.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ArticleCard {...article} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
