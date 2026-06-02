import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Shield, TrendingUp, Users, Building2, Landmark, Calculator, BookOpen, Scale, GraduationCap, FileText, DollarSign, Wrench, Gavel, Briefcase, MessageSquare, Star, ClipboardCheck, FolderOpen, SearchCheck, Library } from "lucide-react"
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
  icon: React.ComponentType<{ className?: string }>
  href: string
  sections: MegaMenuSectionProps[]
}

const MegaMenuItem = ({ icon: Icon, title, description, href }: MegaMenuItemProps) => (
  <Link
    href={href}
    className="flex items-start gap-3 p-3 rounded-xl hover:bg-money-green/5 dark:hover:bg-money-green/10 transition-colors group"
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-money-green/10 dark:bg-money-green/20 flex items-center justify-center group-hover:bg-money-green/20 transition-colors">
      <Icon className="w-5 h-5 text-money-green" />
    </div>
    <div className="flex-grow">
      <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-money-green transition-colors">{title}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{description}</p>
    </div>
  </Link>
)

const MegaMenuSection = ({ title, items }: MegaMenuSectionProps) => (
  <div className="space-y-3">
    <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">{title}</h3>
    <div className="space-y-1">
      {items.map((item, idx) => (
        <MegaMenuItem key={idx} {...item} />
      ))}
    </div>
  </div>
)

export const MegaMenu = ({ label, icon: Icon, href, sections }: MegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [opensLeft, setOpensLeft] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if menu is near right edge on open
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const menuWidth = 600 // width of dropdown
      const spaceOnRight = viewportWidth - rect.right
      
      if (spaceOnRight < menuWidth) {
        setOpensLeft(true)
      } else {
        setOpensLeft(false)
      }
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
  <Link
    href={href}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-money-green transition-colors pt-4 pb-2"
      >
        <Icon className="w-4 h-4" />
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </Link>

      <div className="absolute top-full left-0 right-0 h-4" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full mt-0 w-[600px] bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl shadow-[0px_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 dark:border-gray-700 z-[70] !rounded-2xl !p-6",
              opensLeft ? "right-0 left-auto" : "left-0 right-auto"
            )}
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
    label="Artikel"
    icon={BookOpen}
    href="/artikel"
    sections={[
      {
        title: "Tingkatan Finansial",
        items: [
          {
            icon: Shield,
            title: "Tier 0: Survival",
            description: "Pertahanan utang & literasi dasar",
            href: "/artikel/tier-0-survival"
          },
          {
            icon: TrendingUp,
            title: "Tier 1: Hustler",
            description: "Skill pendapatan tinggi & side hustle",
            href: "/artikel/tier-1-hustler"
          },
          {
            icon: Users,
            title: "Tier 2: Scaler",
            description: "Sistem bisnis & skalabilitas",
            href: "/artikel/tier-2-scaler"
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
            href: "/artikel/tier-3-asset-builder"
          },
          {
            icon: Landmark,
            title: "Tier 4: Legacy",
            description: "Family office & proteksi kekayaan",
            href: "/artikel/tier-4-legacy"
          }
        ]
      }
    ]}
  />
)

export const ToolsMegaMenu = () => (
  <MegaMenu
    label="Alat Keuangan"
    icon={Wrench}
    href="/tools"
    sections={[
      {
        title: "Tools Utama",
        items: [
          {
            icon: Calculator,
            title: "Semua Kalkulator",
            description: "Simulasi utang, budget, dana darurat, pajak, dan investasi",
            href: "/kalkulator"
          },
          {
            icon: ClipboardCheck,
            title: "Checklist Praktis",
            description: "Audit keamanan digital, bukti kasus, dan langkah tindakan",
            href: "/ceklist"
          },
          {
            icon: SearchCheck,
            title: "Direktori Bantuan",
            description: "LBH, bantuan pemerintah, kanal resmi, dan kontak penting",
            href: "/direktori"
          }
        ]
      },
      {
        title: "Resources & Template",
        items: [
          {
            icon: FolderOpen,
            title: "Template Siap Pakai",
            description: "CV, budget keluarga, negosiasi, dan dokumen kerja",
            href: "/template"
          },
          {
            icon: Library,
            title: "Resources",
            description: "Kamus, panduan, dan referensi yang mendukung artikel",
            href: "/resources"
          },
          {
            icon: Wrench,
            title: "Pusat Tools",
            description: "Lihat semua tools dan resources Duit.co.id",
            href: "/tools"
          }
        ]
      }
    ]}
  />
)

export const AcademyMegaMenu = () => (
  <MegaMenu
    label="Akademi"
    icon={GraduationCap}
    href="/akademi"
    sections={[
      {
        title: "Kursus Populer",
        items: [
          {
            icon: GraduationCap,
            title: "Debt Free Blueprint",
            description: "Bebas utang dalam 12 bulan",
            href: "/akademi/blueprint-bebas-utang"
          },
          {
            icon: TrendingUp,
            title: "Freelance Global",
            description: "Raih pendapatan global",
            href: "/akademi/freelance-global"
          },
          {
            icon: Building2,
            title: "SOP Bisnis",
            description: "Sistem bisnis otomatis",
            href: "/akademi/sop-bisnis-owner"
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
            href: "/akademi/holding-company-legal"
          }
        ]
      }
    ]}
  />
)

export const HukumMegaMenu = () => (
  <MegaMenu
    label="Hukum"
    icon={Gavel}
    href="/hukum"
    sections={[
      {
        title: "Regulasi Keuangan",
        items: [
          {
            icon: Scale,
            title: "UU Perbankan & OJK",
            description: "Regulasi perbankan dan pengawasan OJK",
            href: "/hukum"
          },
          {
            icon: FileText,
            title: "UU Perlindungan Konsumen",
            description: "Hak konsumen dalam transaksi finansial",
            href: "/hukum"
          },
          {
            icon: Shield,
            title: "UU Perlindungan Data Pribadi",
            description: "Keamanan data dan privasi digital",
            href: "/hukum"
          }
        ]
      },
      {
        title: "Hukum Bisnis & Pajak",
        items: [
          {
            icon: Briefcase,
            title: "UU Perseroan Terbatas",
            description: "Pendirian dan pengelolaan PT",
            href: "/hukum"
          },
          {
            icon: DollarSign,
            title: "Regulasi Perpajakan",
            description: "PPh, PPN, dan pajak UMKM",
            href: "/hukum"
          },
          {
            icon: Gavel,
            title: "Hukum Pinjol & Fintech",
            description: "POJK dan regulasi fintech lending",
            href: "/hukum"
          }
        ]
      }
    ]}
  />
)

export const AhliMegaMenu = () => (
  <MegaMenu
    label="Ahli"
    icon={Star}
    href="/ahli"
    sections={[
      {
        title: "Konsultasi Finansial",
        items: [
          {
            icon: Users,
            title: "Perencana Keuangan",
            description: "Financial planner bersertifikat",
            href: "/ahli"
          },
          {
            icon: DollarSign,
            title: "Konsultan Pajak",
            description: "Brevet A, B, C terverifikasi",
            href: "/ahli"
          },
          {
            icon: MessageSquare,
            title: "Konsultasi Gratis",
            description: "Sesi tanya jawab dengan ahli",
            href: "/ahli"
          }
        ]
      },
      {
        title: "Legal & Bisnis",
        items: [
          {
            icon: Scale,
            title: "Notaris & Pengacara",
            description: "Akta, PT, dan pendirian bisnis",
            href: "/ahli"
          },
          {
            icon: Briefcase,
            title: "Konsultan Waralaba",
            description: "Spesialis franchise & licensing",
            href: "/ahli"
          },
          {
            icon: Landmark,
            title: "Family Office Advisor",
            description: "Pengelolaan kekayaan antar generasi",
            href: "/ahli"
          }
        ]
      }
    ]}
  />
)
