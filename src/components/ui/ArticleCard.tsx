import React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/GlassCard"
import { TierBadge } from "@/components/ui/TierBadge"
import { Badge } from "@/components/ui/badge"
import { Youtube, Clock, Calendar } from "lucide-react"
import type { TierType, AccessLevelType, CategoryType } from "@/utils/content"

// ─── Types ───────────────────────────────────────────────────────────────────

interface ArticleCardProps {
  title: string
  description: string
  slug: string
  tier: TierType
  category: CategoryType[]
  image?: string
  readTime?: string
  date?: string
  isPremium?: boolean
  accessLevel?: AccessLevelType
  youtubeUrl?: string
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    karir: "Karir",
    bisnis: "Bisnis",
    legal: "Legal",
    investasi: "Investasi",
    hukum: "Hukum",
    keuangan: "Keuangan",
  }
  return labels[cat] || cat
}

// ─── Component ───────────────────────────────────────────────────────────────

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  slug,
  tier,
  category,
  image,
  readTime,
  date,
  isPremium = false,
  accessLevel = "open",
  youtubeUrl,
  className,
}) => {
  return (
    <Link to={`/artikel/${slug}`} className="block h-full">
      <GlassCard
        className={cn(
          "group overflow-hidden flex flex-col h-full hover:border-aureum-gold/20 transition-all duration-500 hover:shadow-xl hover:shadow-aureum-gold/5",
          className
        )}
      >
        {/* Featured Image */}
        {image && (
          <div className="relative h-48 overflow-hidden rounded-t-[23px] -mt-px -mx-px">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* YouTube indicator */}
            {youtubeUrl && (
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center">
                <Youtube className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Premium badge */}
            {isPremium && (
              <div className="absolute top-3 left-3">
                <Badge
                  variant="aureum-gold"
                  className="text-[10px] font-bold uppercase"
                >
                  Premium
                </Badge>
              </div>
            )}

            {/* Access level badge */}
            {accessLevel && accessLevel !== "open" && !isPremium && (
              <div className="absolute top-3 left-3">
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold uppercase bg-black/20 backdrop-blur-sm border-white/20 text-white"
                >
                  {accessLabel(accessLevel)}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Tier Badge + Date */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <TierBadge tier={tier} size="sm" />
            {date && (
              <span className="flex items-center gap-1 text-body/60 text-xs">
                <Calendar className="w-3 h-3" />
                {formatDate(date)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 text-heading group-hover:text-aureum-gold transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-body text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Footer: Categories + Read Time */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* Category badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {category.slice(0, 2).map((cat) => (
                <Badge
                  key={cat}
                  variant="money-green"
                  className="text-[10px]"
                >
                  {getCategoryLabel(cat)}
                </Badge>
              ))}
              {category.length > 2 && (
                <span className="text-body/60 text-[10px]">
                  +{category.length - 2}
                </span>
              )}
            </div>

            {/* Read time */}
            {readTime && (
              <span className="flex items-center gap-1 text-body/60 text-xs whitespace-nowrap">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}

// ─── Helpers (local) ─────────────────────────────────────────────────────────

function accessLabel(level: AccessLevelType): string {
  const labels: Record<AccessLevelType, string> = {
    open: "",
    share_gate: "Share to Unlock",
    youtube_gate: "YT Subscribe",
    register_gate: "Register",
    paid: "Premium",
  }
  return labels[level] || ""
}
