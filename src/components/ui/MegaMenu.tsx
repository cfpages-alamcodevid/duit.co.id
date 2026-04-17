import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Shield, TrendingUp, Users, Building2, Landmark, Calculator, BookOpen, Scale, GraduationCap, FileText, DollarSign, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface MegaMenuItemProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
}

interface MegaMenuSectionProps {
  title: string
  items: MegaMenuItemProps[]
}

interface MegaMenuProps {
  label: string
  sections: MegaMenuSectionProps[]
}

const MegaMenuItem = ({ icon: Icon, title, description, href }: MegaMenuItemProps) => (
  <Link
    to={href}
    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors group"
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-lg glass-card flex items-center justify-center group-hover:border-aureum-gold/15 transition-colors">
      <Icon className="w-5 h-5 text-money-green" />
    </div>
    <div className="flex-grow">
      <h4 className="text-sm font-bold text-heading group-hover:text-money-green transition-colors">{title}</h4>
      <p className="text-xs text-body mt-0.5">{description}</p>
    </div>
  </Link>
)

const MegaMenuSection = ({ title, items }: MegaMenuSectionProps) => (
  <div className="space-y-3">
    <h3 className="text-xs font-bold text-body uppercase tracking-wider px-3 pb-2 border-b border-white/10">{title}</h3>
    <div className="space-y-1">
      {items.map((item, idx) => (
        <MegaMenuItem key={idx} {...item} />
      ))}
    </div>
  </div>
)

export const MegaMenu = ({ label, sections }: MegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1.5 text-sm font-medium text-body hover:text-money-green transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-3 w-[600px] glass-card rounded-2xl p-6 shadow-[0px_20px_60px_rgba(0,0,0,0.1)] border border-white/15 z-50"
          >
            <div className="grid grid-cols-2 gap-6">
              {sections.map((section, idx) => (
                <MegaMenuSection key={idx} {...section} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Pre-configured mega menus for common use cases
export const KnowledgeMegaMenu = () => (
  <MegaMenu
    label="Pengetahuan"
    sections={[
      {
        title: "Tingkatan Finansial",
        items: [
          {
            icon: Shield,
            title: "Tier 0: Survival",
            description: "Pertahanan utang & literasi dasar",
            href: "/knowledge/tier-0-survival"
          },
          {
            icon: TrendingUp,
            title: "Tier 1: Hustler",
            description: "Skill pendapatan tinggi & side hustle",
            href: "/knowledge/tier-1-hustler"
          },
          {
            icon: Users,
            title: "Tier 2: Scaler",
            description: "Sistem bisnis & skalabilitas",
            href: "/knowledge/tier-2-scaler"
          }
        ]
      },
      {
        title: "Tingkat Lanjutan",
        items: [
          {
            icon: Building2,
            title: "Tier 3: Asset Builder",
            description: "Properti, waralaba & investasi",
            href: "/knowledge/tier-3-asset-builder"
          },
          {
            icon: Landmark,
            title: "Tier 4: Legacy",
            description: "Family office & proteksi kekayaan",
            href: "/knowledge/tier-4-legacy"
          }
        ]
      }
    ]}
  />
)

export const ToolsMegaMenu = () => (
  <MegaMenu
    label="Alat Keuangan"
    sections={[
      {
        title: "Alat Bertahan Hidup",
        items: [
          {
            icon: Calculator,
            title: "Kalkulator Utang",
            description: "Rencana pelunasan utang",
            href: "/tools/debt-calculator"
          },
          {
            icon: DollarSign,
            title: "Anggaran Survival",
            description: "Budget pertahanan hidup",
            href: "/tools/survival-budget"
          }
        ]
      },
      {
        title: "Alat Investor",
        items: [
          {
            icon: PieChart,
            title: "Kalkulator ROI",
            description: "Analisis return investasi",
            href: "/tools/roi-calculator"
          },
          {
            icon: FileText,
            title: "Manajemen Portofolio",
            description: "Rebalancing & tracking",
            href: "/tools/portfolio"
          }
        ]
      }
    ]}
  />
)

export const AcademyMegaMenu = () => (
  <MegaMenu
    label="Akademi"
    sections={[
      {
        title: "Kursus Populer",
        items: [
          {
            icon: GraduationCap,
            title: "Debt Free Blueprint",
            description: "Bebas utang dalam 12 bulan",
            href: "/academy/debt-free"
          },
          {
            icon: TrendingUp,
            title: "Freelancing High-Ticket",
            description: "Raih pendapatan global",
            href: "/academy/freelancing"
          },
          {
            icon: Building2,
            title: "SOP Systemization",
            description: "Sistem bisnis otomatis",
            href: "/academy/sop-system"
          }
        ]
      },
      {
        title: "Level Lanjutan",
        items: [
          {
            icon: Landmark,
            title: "Struktur Holding Company",
            description: "Proteksi aset maksimal",
            href: "/academy/holding-company"
          }
        ]
      }
    ]}
  />
)
