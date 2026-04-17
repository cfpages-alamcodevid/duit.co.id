import React from "react"
import { motion } from "framer-motion"
import { GoldShineButton } from "@/components/ui/GoldShineButton"
import { GlassCard } from "@/components/ui/GlassCard"
import { Shield, TrendingUp, Users, Building2, Landmark } from "lucide-react"
import { Link } from "react-router-dom"

const HeroSection = () => (
  <section className="relative py-20 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-heading"
      >
        Protect Your Legacy.<br />
        <span className="text-money-green">Build Your Sovereignty.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-body max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        The elite financial ecosystem for Indonesians. From debt management to Family Office structures, we provide the tools, law, and knowledge to secure your future.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link to="/quiz">
          <GoldShineButton className="text-lg px-12 py-6">
            Start Financial Assessment
          </GoldShineButton>
        </Link>
        <Link to="/about" className="text-sm font-bold text-body hover:text-money-green transition-colors">
          Learn Our Philosophy →
        </Link>
      </motion.div>
    </div>

    {/* Background Decorative Elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-money-green/5 rounded-full blur-3xl -z-10" />
  </section>
)

const ValuePropGrid = () => {
  const tiers = [
    {
      title: "Tier 0: Survival",
      desc: "Debt defense and financial literacy fundamentals.",
      icon: Shield,
    },
    {
      title: "Tier 1: Hustler",
      desc: "High-income skills and side hustle optimization.",
      icon: TrendingUp,
    },
    {
      title: "Tier 2: Scaler",
      desc: "Business systems, SOPs, and organizational growth.",
      icon: Users,
    },
    {
      title: "Tier 3: Asset Builder",
      desc: "Property, franchises, and paper asset investments.",
      icon: Building2,
    },
    {
      title: "Tier 4: Legacy",
      desc: "Family Offices, Holding Companies, and Wealth Protection.",
      icon: Landmark,
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-heading">Master the 5 Tiers of Wealth</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {tiers.map((tier, idx) => (
            <GlassCard key={idx} className="hover:scale-105 hover:shadow-[0px_30px_60px_rgba(0,0,0,0.08)] transition-all cursor-default">
              <tier.icon className="w-12 h-12 text-money-green mb-6" />
              <h3 className="text-xl font-bold mb-3 text-heading">{tier.title}</h3>
              <p className="text-sm text-body leading-relaxed">{tier.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export const Home = () => {
  return (
    <div className="space-y-20">
      <HeroSection />
      <ValuePropGrid />
      {/* Social Proof and other sections can go here */}
    </div>
  )
}
