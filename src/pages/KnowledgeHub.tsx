import React from "react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Link } from "react-router-dom"
import { BookOpen, ShieldAlert, Rocket, Briefcase, Building2, Landmark } from "lucide-react"

const tiers = [
  {
    id: "tier-0",
    title: "Tier 0: Survival",
    desc: "Debt management and defensive financial strategies.",
    icon: ShieldAlert,
    color: "text-money-green",
    path: "/knowledge/tier-0-survival"
  },
  {
    id: "tier-1",
    title: "Tier 1: Hustler",
    desc: "Increasing income through high-value skills.",
    icon: Rocket,
    color: "text-aureum-gold",
    path: "/knowledge/tier-1-hustler"
  },
  {
    id: "tier-2",
    title: "Tier 2: Scaler",
    desc: "Systems, delegation, and business automation.",
    icon: Briefcase,
    color: "text-money-green-light",
    path: "/knowledge/tier-2-scaler"
  },
  {
    id: "tier-3",
    title: "Tier 3: Asset Builder",
    desc: "Investment in property, franchises, and paper assets.",
    icon: Building2,
    color: "text-aureum-gold",
    path: "/knowledge/tier-3-asset-builder"
  },
  {
    id: "tier-4",
    title: "Tier 4: Legacy",
    desc: "Family Office, Holding Companies, and Succession.",
    icon: Landmark,
    color: "text-aureum-gold",
    path: "/knowledge/tier-4-legacy"
  }
]

export const KnowledgeHub = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-heading">Knowledge Hub</h1>
        <p className="text-body max-w-2xl mx-auto">
          Explore the siloes of wealth mastery. Each level contains specific laws, tools, and strategies for your current economic stage.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Link key={tier.id} to={tier.path}>
            <GlassCard className="h-full hover:border-money-green/15 transition-colors group">
              <tier.icon className={`w-12 h-12 mb-6 ${tier.color} group-hover:scale-110 transition-transform`} />
              <h2 className="text-xl font-bold mb-3 text-heading">{tier.title}</h2>
              <p className="text-sm text-body leading-relaxed mb-6">
                {tier.desc}
              </p>
              <span className="text-sm font-bold text-money-green group-hover:text-aureum-gold transition-colors">Explore Silo →</span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  )
}
