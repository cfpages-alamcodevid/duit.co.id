import React, { useRef, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { motion } from "framer-motion"
import { getArticleBySlug, getArticlesByTier, type Article } from "@/utils/content"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { TableOfContents } from "@/components/ui/TableOfContents"
import { ArticleCard } from "@/components/ui/ArticleCard"
import { TierBadge } from "@/components/ui/TierBadge"
import { GlassCard } from "@/components/ui/GlassCard"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

// ─── Component ───────────────────────────────────────────────────────────────

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)

  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

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

      // Load related articles from same tier
      const tierArticles = await getArticlesByTier(found.tier)
      setRelatedArticles(
        tierArticles.filter((a) => a.slug !== slug).slice(0, 3)
      )

      setLoading(false)
    }

    loadArticle()
  }, [slug])

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // ─── Loading State ──────────────────────────────────────────────────────

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

  // ─── Not Found State ────────────────────────────────────────────────────

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
              onClick={() => navigate("/artikel")}
              className="inline-flex items-center gap-2 text-money-green font-semibold hover:text-aureum-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Pusat Pengetahuan
            </button>
          </div>
        </GlassCard>
      </div>
    )
  }

  // ─── Render ─────────────────────────────────────────────────────────────

  const canonicalUrl = `https://duit.co.id/artikel/${article.slug}`

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{article.title} | Duit.co.id</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        {article.image && (
          <meta
            property="og:image"
            content={`https://duit.co.id${article.image}`}
          />
        )}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:tag" content={article.tags.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 text-sm text-body hover:text-money-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Pusat Pengetahuan
          </Link>
        </nav>

        {/* Article Header */}
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

          {/* Meta info */}
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

        {/* Main Content + Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Body */}
          <div className="flex-1 min-w-0">
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

              {/* Article Footer */}
              <footer className="mt-16 pt-8 border-t border-white/10 dark:border-white/5">
                {/* Tags */}
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

                {/* Share / Save */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-body/60 italic">
                    Bagikan artikel ini jika bermanfaat
                  </p>
                </div>
              </footer>
            </motion.article>
          </div>

          {/* Sidebar: Table of Contents */}
          <aside className="lg:w-72 lg:flex-shrink-0">
            <TableOfContents contentRef={contentRef} />
          </aside>
        </div>

        {/* Related Articles */}
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
    </>
  )
}
