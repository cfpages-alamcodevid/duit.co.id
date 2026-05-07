import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { getAllArticles, getTierLabel, filterArticles, type TierType, type Article } from "@/utils/content"
import { ArticleCard } from "@/components/ui/ArticleCard"
import { TierBadge } from "@/components/ui/TierBadge"
import { GlassCard } from "@/components/ui/GlassCard"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Filter } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface KnowledgeHubProps {
  // Optionally pre-filter by tier (used when accessed via /artikel/:tier)
  initialTier?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ALL_TIERS: { value: string; label: string }[] = [
  { value: "all", label: "Semua Tingkat" },
  { value: "tier-0-survival", label: "Survival" },
  { value: "tier-1-hustler", label: "Hustler" },
  { value: "tier-2-scaler", label: "Scaler" },
  { value: "tier-3-asset-builder", label: "Asset Builder" },
  { value: "tier-4-legacy", label: "Legacy" },
]

// ─── Component ───────────────────────────────────────────────────────────────

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  initialTier,
}) => {
  const params = useParams<{ tier?: string; slug?: string }>()
  const resolvedTier = initialTier || params.tier

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTier, setActiveTier] = useState<string>(
    resolvedTier || "all"
  )

  // Load articles on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const all = await getAllArticles()
      setArticles(all)
      setLoading(false)
    }
    load()
  }, [])

  // Update active tier when URL changes
  useEffect(() => {
    if (resolvedTier) {
      setActiveTier(resolvedTier)
    }
  }, [resolvedTier])

  // Filter articles
  const filteredArticles = useMemo(() => {
    let result = articles

    // Tier filter
    if (activeTier && activeTier !== "all") {
      result = result.filter((a) => a.tier === activeTier)
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((a) => {
        const searchable = `${a.title} ${a.description} ${a.tags.join(" ")}`.toLowerCase()
        return searchable.includes(query)
      })
    }

    return result
  }, [articles, activeTier, searchQuery])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-money-green/10 text-money-green text-sm font-semibold">
          <BookOpen className="w-4 h-4" />
          Pustaka Pengetahuan
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-heading tracking-tight">
          Pusat Pengetahuan
        </h1>
        <p className="text-body max-w-2xl mx-auto leading-relaxed">
          Jelajahi artikel dan panduan keuangan berdasarkan tingkat ekonomi Anda.
          Semua konten gratis dan dapat diakses oleh semua pengguna.
        </p>
      </header>

      {/* Filter Bar */}
      <GlassCard className="p-4 sm:p-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body/50" />
          <Input
            type="text"
            placeholder="Cari artikel berdasarkan judul, deskripsi, atau tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass-card border-0 bg-white/30 dark:bg-black/30 rounded-xl"
          />
        </div>

        {/* Tier Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-body/50" />
          {ALL_TIERS.map((tier) => (
            <button
              key={tier.value}
              onClick={() => setActiveTier(tier.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTier === tier.value
                  ? "bg-money-green text-white shadow-lg shadow-money-green/20"
                  : "bg-black/5 dark:bg-white/5 text-body hover:bg-black/10 dark:hover:bg-white/10"
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-body">
          Menampilkan <span className="font-semibold text-heading">{filteredArticles.length}</span> artikel
          {activeTier !== "all" && (
            <span> untuk <span className="font-semibold">{getTierLabel(activeTier as TierType)}</span></span>
          )}
        </p>
        {activeTier !== "all" && (
          <TierBadge tier={activeTier as TierType} size="md" />
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="glass-card rounded-2xl h-80 animate-pulse"
            >
              <div className="h-48 bg-black/5 dark:bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-20 bg-black/5 dark:bg-white/5 rounded-full" />
                <div className="h-6 w-full bg-black/5 dark:bg-white/5 rounded-lg" />
                <div className="h-4 w-3/4 bg-black/5 dark:bg-white/5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Grid */}
      {!loading && filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              description={article.description}
              slug={article.slug}
              tier={article.tier}
              category={article.category}
              image={article.image}
              readTime={article.read_time}
              date={article.date}
              isPremium={article.is_premium}
              accessLevel={article.access_level}
              youtubeUrl={article.youtube_url}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredArticles.length === 0 && (
        <GlassCard className="py-16 text-center space-y-4">
          <div className="text-5xl mb-2">🔍</div>
          <h3 className="text-xl font-bold text-heading">
            Tidak Ada Artikel Ditemukan
          </h3>
          <p className="text-body max-w-sm mx-auto">
            Coba ubah filter atau kata kunci pencarian Anda untuk menemukan artikel yang relevan.
          </p>
          <button
            onClick={() => {
              setSearchQuery("")
              setActiveTier("all")
            }}
            className="text-money-green font-semibold hover:text-aureum-gold transition-colors"
          >
            Reset Filter
          </button>
        </GlassCard>
      )}
    </div>
  )
}

export default KnowledgeHub
