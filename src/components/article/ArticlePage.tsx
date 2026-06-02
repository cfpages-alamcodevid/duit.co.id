"use client"

import React, { useRef, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth, useUser } from "@/components/auth/DuitClerkProvider"
import { getArticleBySlug, getArticlesByTier, getTierOrder, type Article, type TierType } from "@/utils/content"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { TableOfContents } from "@/components/ui/TableOfContents"
import { ArticleCard } from "@/components/ui/ArticleCard"
import { TierBadge } from "@/components/ui/TierBadge"
import { GlassCard } from "@/components/ui/GlassCard"
import { ExtraDownloadButton } from "@/components/extra/ExtraDownloadButton"
import { ArrowLeft, ArrowRight, Calendar, Clock, LockKeyhole, Loader2, User } from "lucide-react"

export function ArticlePage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params?.slug
  const contentRef = useRef<HTMLDivElement>(null)
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()

  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [profileTier, setProfileTier] = useState<TierType | null>(null)
  const [accessLoading, setAccessLoading] = useState(false)
  const [accessError, setAccessError] = useState("")

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return

      setLoading(true)
      setNotFound(false)

      const found = await getArticleBySlug(slug, { includeContent: true })

      if (!found) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setArticle(found)

      const tierArticles = await getArticlesByTier(found.tier)
      setRelatedArticles(
        tierArticles.filter((a) => a.slug !== slug).slice(0, 3)
      )

      setLoading(false)
    }

    loadArticle()
  }, [slug])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!article || getTierOrder(article.tier) < 2 || !isLoaded || !isSignedIn) return

    const loadProfile = async () => {
      setAccessLoading(true)
      setAccessError("")

      try {
        const token = await getToken()
        const response = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message ?? "Akses akun belum bisa diperiksa.")

        setProfileTier((data.profile?.income_tier as TierType) || "tier-0-survival")
      } catch (err) {
        setAccessError(err instanceof Error ? err.message : "Akses akun belum bisa diperiksa.")
      } finally {
        setAccessLoading(false)
      }
    }

    void loadProfile()
  }, [article, getToken, isLoaded, isSignedIn])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-32 bg-black/5 dark:bg-white/5 rounded-full" />
          <div className="h-12 w-3/4 bg-black/5 dark:bg-white/5 rounded-xl" />
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-black/5 dark:bg-white/5 rounded-full" />
            <div className="h-4 w-24 bg-black/5 dark:bg-white/5 rounded-full" />
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded-lg w-full" />
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded-lg w-5/6" />
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded-lg w-4/6" />
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <GlassCard className="py-16 space-y-6">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-3xl font-bold text-heading">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-body max-w-md mx-auto">
            Artikel yang Anda cari tidak ditemukan. Mungkin artikel telah dihapus atau URL salah.
          </p>
          <div className="pt-4">
            <button
              onClick={() => router.push("/artikel")}
              className="inline-flex items-center gap-2 text-money-green font-semibold hover:text-aureum-gold transition-colors"
            >
              <ArrowLeft className="w-4 w-4" />
              Kembali ke Pusat Pengetahuan
            </button>
          </div>
        </GlassCard>
      </div>
    )
  }

  const articleTierOrder = getTierOrder(article.tier)
  const profileTierOrder = profileTier ? getTierOrder(profileTier) : -1
  const requiresTierAccess = articleTierOrder >= 2
  const hasTierAccess = !requiresTierAccess || (isSignedIn && profileTierOrder >= articleTierOrder)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <nav className="mb-8" aria-label="Breadcrumb">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 text-sm text-body hover:text-money-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Pusat Pengetahuan
        </Link>
      </nav>

      <header className="mb-10 space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <TierBadge tier={article.tier} size="md" />
          {article.category.map((cat) => (
            <span
              key={cat}
              className="text-xs font-medium text-body/70 capitalize"
            >
              {cat}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-heading leading-tight tracking-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-body flex-wrap">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.read_time} baca
          </span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">
          {requiresTierAccess && (!isLoaded || accessLoading) ? (
            <GlassCard className="py-12 text-center">
              <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-money-green" />
              <p className="text-sm font-semibold text-heading">Memeriksa akses tier...</p>
            </GlassCard>
          ) : null}

          {requiresTierAccess && !hasTierAccess && isLoaded && !accessLoading ? (
            <TierAccessGate
              articleTier={article.tier}
              profileTier={profileTier}
              isSignedIn={Boolean(isSignedIn)}
              userName={user?.firstName || user?.username || ""}
              error={accessError}
            />
          ) : null}

          {hasTierAccess && !accessLoading ? (
            <motion.article
              ref={contentRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {article.youtube_url &&
                article.youtube_embed_position === "top" && (
                  <div className="mb-8">
                    <MarkdownRenderer
                      content=""
                      youtubeUrl={article.youtube_url}
                      youtubePosition={article.youtube_embed_position}
                    />
                  </div>
                )}

              <MarkdownRenderer
                content={article.content || article.excerpt}
                youtubeUrl={
                  article.youtube_embed_position !== "top" &&
                  article.youtube_embed_position !== "inline"
                    ? article.youtube_url
                    : undefined
                }
                youtubePosition={article.youtube_embed_position}
              />

              <ExtraDownloadButton articleSlug={article.slug} articleTitle={article.title} />

              <footer className="mt-16 pt-8 border-t border-white/10 dark:border-white/5">
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-body text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-body/60 italic">
                    Bagikan artikel ini jika bermanfaat
                  </p>
                </div>
              </footer>
            </motion.article>
          ) : null}
        </div>

        <aside className="lg:w-72 lg:flex-shrink-0">
          <TableOfContents contentRef={contentRef} />
        </aside>
      </div>

      {relatedArticles.length > 0 && (
        <section className="mt-20 pt-12 border-t border-white/10 dark:border-white/5">
          <h2 className="text-2xl font-bold text-heading mb-8">
            Artikel Terkait
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <ArticleCard
                key={related.slug}
                title={related.title}
                description={related.description}
                slug={related.slug}
                tier={related.tier}
                category={related.category}
                image={related.image}
                readTime={related.read_time}
                date={related.date}
                accessLevel={related.access_level}
                youtubeUrl={related.youtube_url}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function TierAccessGate({
  articleTier,
  profileTier,
  isSignedIn,
  userName,
  error,
}: {
  articleTier: TierType
  profileTier: TierType | null
  isSignedIn: boolean
  userName: string
  error: string
}) {
  return (
    <GlassCard className="space-y-5 py-10">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-money-green/10 text-money-green">
          <LockKeyhole className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-semibold text-money-green">Akses tier diperlukan</p>
          <h2 className="mt-2 text-2xl font-bold text-heading">
            Artikel ini untuk pembaca dengan kesiapan {tierName(articleTier)}.
          </h2>
          <p className="mt-3 text-sm leading-6 text-body">
            {isSignedIn
              ? `${userName || "Akun Anda"} saat ini berada di ${profileTier ? tierName(profileTier) : "tier dasar"}. Selesaikan quiz di homepage untuk memperbarui akses bila kondisi Anda sudah naik.`
              : "Login dan isi quiz singkat agar Duit.co.id bisa menyimpan tier Anda sebelum membuka materi lanjutan."}
          </p>
          {error ? <p className="mt-3 text-sm font-semibold text-amber-700 dark:text-amber-200">{error}</p> : null}
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
        >
          Isi quiz tier
          <ArrowRight className="h-4 w-4" />
        </Link>
        {!isSignedIn ? (
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-heading transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
          >
            Login
          </Link>
        ) : null}
      </div>
    </GlassCard>
  )
}

function tierName(tier: TierType) {
  const labels: Record<TierType, string> = {
    "tier-0-survival": "Tier 0 Survival",
    "tier-1-hustler": "Tier 1 Hustler",
    "tier-2-scaler": "Tier 2 Scaler",
    "tier-3-asset-builder": "Tier 3 Asset Builder",
    "tier-4-legacy": "Tier 4 Legacy",
  }
  return labels[tier]
}
