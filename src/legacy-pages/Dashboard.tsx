import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useAuth, useUser } from "@clerk/react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Loader2,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
  UserRound,
  WalletCards,
} from "lucide-react"
import { ArticleCard } from "@/components/ui/ArticleCard"
import { GlassCard } from "@/components/ui/GlassCard"
import { TierQuiz } from "@/components/home/TierQuiz"
import {
  getAllArticles,
  getTierLabel,
  getTierOrder,
  type Article,
  type TierType,
} from "@/utils/content"
import { formatCoursePrice } from "@/data/academyCourses"

type D1Profile = {
  clerk_user_id: string
  email: string | null
  full_name: string | null
  income_tier: TierType | null
  access_role: string | null
  tier_source: string | null
  last_article_slug: string | null
  last_article_read_at: string | null
}

type PendingCourseOrder = {
  merchant_order_id: string
  product_name: string
  course_slug: string
  amount_idr: number
  duitku_reference?: string | null
  duitku_payment_method?: string | null
  duitku_payment_code?: string | null
  duitku_payment_url?: string | null
  status: string
  created_at?: string | null
}

const unknownTierSources = new Set(["self_heal", "migration_self_heal", "", null])

function hasKnownTier(profile: D1Profile | null) {
  if (!profile?.income_tier) return false
  return !unknownTierSources.has(profile.tier_source ?? null)
}

function getFocusCopy(tier: TierType) {
  const copy: Record<TierType, { title: string; description: string; cta: string; href: string }> = {
    "tier-0-survival": {
      title: "Amankan arus kas dulu",
      description: "Mulai dari utang, kebutuhan pokok, dan keputusan harian yang mencegah tekanan bertambah.",
      cta: "Buka panduan pemulihan",
      href: "/artikel/tier-0-survival",
    },
    "tier-1-hustler": {
      title: "Naikkan daya hasil",
      description: "Fokus ke skill, negosiasi penghasilan, dana darurat, dan side income yang tidak menambah utang.",
      cta: "Buka materi peningkatan income",
      href: "/artikel/tier-1-hustler",
    },
    "tier-2-scaler": {
      title: "Rapikan sistem bisnis",
      description: "Perkuat laporan, SOP, channel penjualan, rekrutmen, dan keputusan investasi yang lebih disiplin.",
      cta: "Buka materi sistem bisnis",
      href: "/artikel/tier-2-scaler",
    },
    "tier-3-asset-builder": {
      title: "Bangun dan lindungi aset",
      description: "Mulai petakan properti, bisnis, struktur kepemilikan, risiko hukum, dan diversifikasi aset.",
      cta: "Buka materi pembangunan aset",
      href: "/artikel/tier-3-asset-builder",
    },
    "tier-4-legacy": {
      title: "Rapikan tata kelola kekayaan",
      description: "Fokus ke holding, suksesi, family office, proteksi aset, dan keberlanjutan lintas generasi.",
      cta: "Buka materi legacy",
      href: "/artikel/tier-4-legacy",
    },
  }

  return copy[tier]
}

export const Dashboard: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const [profile, setProfile] = useState<D1Profile | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [pendingOrders, setPendingOrders] = useState<PendingCourseOrder[]>([])
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [error, setError] = useState("")

  const loadProfile = async () => {
    if (!isLoaded || !isSignedIn) return

    setIsLoadingProfile(true)
    setError("")

    try {
      const token = await getToken()
      const response = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message ?? "Dashboard belum bisa dimuat.")
      setProfile(data.profile)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Dashboard belum bisa dimuat.")
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const loadPendingOrders = async () => {
    if (!isLoaded || !isSignedIn) return

    try {
      const token = await getToken()
      const response = await fetch("/api/orders/pending?limit=6", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) {
        setPendingOrders(Array.isArray(data.orders) ? data.orders : [])
      }
    } catch {
      setPendingOrders([])
    }
  }

  useEffect(() => {
    void loadProfile()
    void loadPendingOrders()
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    const loadArticles = async () => {
      const all = await getAllArticles()
      setArticles(all)
    }

    if (hasKnownTier(profile)) {
      void loadArticles()
    }
  }, [profile])

  const visibleArticles = useMemo(() => {
    if (!profile?.income_tier) return []
    const order = getTierOrder(profile.income_tier)
    return articles
      .filter((article) => getTierOrder(article.tier) <= order)
      .slice(0, 6)
  }, [articles, profile])

  if (!isLoaded || isLoadingProfile) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-money-green" />
        <p className="text-sm font-semibold text-body">Memuat dashboard...</p>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <GlassCard>
          <UserRound className="mx-auto h-10 w-10 text-money-green" />
          <h1 className="mt-5 text-3xl font-bold text-heading">Masuk untuk membuka dashboard</h1>
          <p className="mt-4 text-sm leading-6 text-body">
            Dashboard menyimpan assessment, progres belajar, checkout, dan rekomendasi yang sesuai kondisi Anda.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white"
          >
            Login
          </Link>
        </GlassCard>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl py-16">
        <GlassCard className="text-center">
          <h1 className="text-2xl font-bold text-heading">Dashboard belum bisa dimuat</h1>
          <p className="mt-3 text-sm leading-6 text-body">{error}</p>
          <button
            type="button"
            onClick={() => void loadProfile()}
            className="mt-6 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white"
          >
            Coba lagi
          </button>
        </GlassCard>
      </div>
    )
  }

  if (!hasKnownTier(profile)) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 py-8">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
            Dashboard Duit.co.id
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Lengkapi assessment dulu agar dashboard bisa dipersonalisasi.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-body">
            Kami belum punya cukup konteks untuk menampilkan artikel, kelas, dan tools yang tepat.
            Jawab beberapa pertanyaan singkat, lalu progress Anda akan tersimpan otomatis.
          </p>
        </header>
        <PendingPaymentsSection orders={pendingOrders} />
        <TierQuiz onSaved={() => void loadProfile()} />
      </div>
    )
  }

  const tier = profile?.income_tier as TierType
  const focus = getFocusCopy(tier)
  const displayName = user?.firstName || user?.username || profile?.full_name || "Pengguna"

  return (
    <div className="mx-auto max-w-7xl space-y-10 py-8">
      <header className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green"
          >
            Dashboard personal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-4xl font-bold leading-tight text-heading sm:text-5xl"
          >
            Selamat datang, {displayName}.
          </motion.h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">
            Fokus dashboard Anda saat ini: {focus.description}
          </p>
        </div>
        <GlassCard className="p-5">
          <ShieldCheck className="h-7 w-7 text-money-green" />
          <p className="mt-4 text-sm font-semibold text-body">Jalur belajar aktif</p>
          <p className="mt-1 text-xl font-bold text-heading">{getTierLabel(tier)}</p>
        </GlassCard>
      </header>

      <PendingPaymentsSection orders={pendingOrders} />

      <section className="grid gap-5 md:grid-cols-3">
        <GlassCard className="p-6">
          <WalletCards className="h-8 w-8 text-money-green" />
          <h2 className="mt-5 text-xl font-bold text-heading">{focus.title}</h2>
          <p className="mt-3 text-sm leading-6 text-body">{focus.description}</p>
          <Link
            href={focus.href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-money-green"
          >
            {focus.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </GlassCard>
        <GlassCard className="p-6">
          <BookOpen className="h-8 w-8 text-money-green" />
          <h2 className="mt-5 text-xl font-bold text-heading">Lanjut baca</h2>
          <p className="mt-3 text-sm leading-6 text-body">
            Mulai dari artikel yang sesuai jalur Anda. Materi lanjutan terbuka saat assessment menunjukkan sudah relevan.
          </p>
          <Link href="/artikel" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-money-green">
            Buka artikel
            <ArrowRight className="h-4 w-4" />
          </Link>
        </GlassCard>
        <GlassCard className="p-6">
          <GraduationCap className="h-8 w-8 text-money-green" />
          <h2 className="mt-5 text-xl font-bold text-heading">Akademi</h2>
          <p className="mt-3 text-sm leading-6 text-body">
            Pelajari modul yang membantu Anda naik dari kondisi sekarang tanpa mempelajari topik yang belum perlu.
          </p>
          <Link href="/akademi" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-money-green">
            Buka akademi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </GlassCard>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-heading">
            <span className="block h-8 w-2 rounded-full bg-money-green" />
            Rekomendasi artikel
          </h2>
          <Link href="/artikel" className="text-sm font-semibold text-money-green">
            Lihat semua
          </Link>
        </div>

        {visibleArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <ArticleCard
                  title={article.title}
                  description={article.description}
                  slug={article.slug}
                  tier={article.tier}
                  category={article.category}
                  image={article.image}
                  readTime={article.read_time}
                  date={article.date}
                  accessLevel={article.access_level}
                  youtubeUrl={article.youtube_url}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <GlassCard className="py-12 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-money-green" />
            <p className="mt-4 text-sm font-semibold text-heading">Artikel rekomendasi sedang disiapkan.</p>
          </GlassCard>
        )}
      </section>
    </div>
  )
}

function PendingPaymentsSection({ orders }: { orders: PendingCourseOrder[] }) {
  if (orders.length === 0) return null

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-200">
          <ReceiptText className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-2xl font-bold text-heading">Kursus menunggu pembayaran</h2>
          <p className="text-sm leading-6 text-body">
            Lanjutkan dari order yang sudah dibuat agar pembayaran tidak dobel.
          </p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {orders.map((order) => {
          const href =
            order.duitku_payment_url ||
            `/akademi/${order.course_slug}?payment=processing&orderId=${encodeURIComponent(
              order.merchant_order_id,
            )}`

          return (
            <GlassCard key={order.merchant_order_id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-money-green">{formatCoursePrice(order.amount_idr)}</p>
                  <h3 className="mt-2 text-xl font-bold text-heading">{order.product_name}</h3>
                  <p className="mt-2 text-sm leading-6 text-body">
                    Order {order.merchant_order_id}
                  </p>
                </div>
                <Clock3 className="h-5 w-5 shrink-0 text-amber-600" />
              </div>
              <dl className="mt-4 grid gap-3 text-sm text-body sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-heading">Metode</dt>
                  <dd>{order.duitku_payment_method || "-"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-heading">Kode bayar</dt>
                  <dd className="break-all">{order.duitku_payment_code || order.duitku_reference || "-"}</dd>
                </div>
              </dl>
              <a
                href={href}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-money-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
              >
                Lanjutkan pembayaran
                <ArrowRight className="h-4 w-4" />
              </a>
            </GlassCard>
          )
        })}
      </div>
    </section>
  )
}

export default Dashboard
