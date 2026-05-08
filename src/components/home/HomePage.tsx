"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useAuth, useUser } from "@clerk/react"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Landmark,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { GoldShineButton } from "@/components/ui/GoldShineButton"

type Tier =
  | "tier-0-survival"
  | "tier-1-hustler"
  | "tier-2-scaler"
  | "tier-3-asset-builder"
  | "tier-4-legacy"

type QuizState = {
  income: number | null
  assets: number | null
  debtPressure: "low" | "medium" | "high" | null
  businessStatus: "none" | "idea" | "running" | null
  businessName: string
  businessType: string
  businessUrl: string
  businessRevenue: number | null
  businessConfirmed: boolean
}

const initialQuiz: QuizState = {
  income: null,
  assets: null,
  debtPressure: null,
  businessStatus: null,
  businessName: "",
  businessType: "",
  businessUrl: "",
  businessRevenue: null,
  businessConfirmed: false,
}

const tiers: Record<Tier, { label: string; short: string; description: string; href: string }> = {
  "tier-0-survival": {
    label: "Tier 0: Survival",
    short: "Survival",
    description: "Fokus ke arus kas aman, utang terkendali, dan keputusan harian yang tidak menambah tekanan.",
    href: "/artikel/tier-0-survival",
  },
  "tier-1-hustler": {
    label: "Tier 1: Hustler",
    short: "Hustler",
    description: "Fokus ke peningkatan pendapatan, skill bernilai tinggi, dan validasi usaha kecil dengan risiko wajar.",
    href: "/artikel/tier-1-hustler",
  },
  "tier-2-scaler": {
    label: "Tier 2: Scaler",
    short: "Scaler",
    description: "Fokus ke sistem bisnis, laporan keuangan, SOP, rekrutmen, dan keputusan investasi yang lebih rapi.",
    href: "/artikel/tier-2-scaler",
  },
  "tier-3-asset-builder": {
    label: "Tier 3: Asset Builder",
    short: "Asset Builder",
    description: "Fokus ke properti, waralaba, diversifikasi aset, struktur bisnis, dan perlindungan kekayaan.",
    href: "/artikel/tier-3-asset-builder",
  },
  "tier-4-legacy": {
    label: "Tier 4: Legacy",
    short: "Legacy",
    description: "Fokus ke holding, suksesi, family office, proteksi aset, dan tata kelola lintas generasi.",
    href: "/artikel/tier-4-legacy",
  },
}

const incomeOptions = [
  { label: "< Rp 5 juta", value: 3_000_000 },
  { label: "Rp 5-10 juta", value: 7_500_000 },
  { label: "Rp 10-50 juta", value: 25_000_000 },
  { label: "Rp 50-100 juta", value: 75_000_000 },
  { label: "Rp 100 juta-1 miliar", value: 250_000_000 },
  { label: "> Rp 1 miliar", value: 1_250_000_000 },
]

const assetOptions = [
  { label: "< Rp 50 juta", value: 25_000_000 },
  { label: "Rp 50-500 juta", value: 150_000_000 },
  { label: "Rp 500 juta-5 miliar", value: 750_000_000 },
  { label: "Rp 5-50 miliar", value: 7_500_000_000 },
  { label: "> Rp 50 miliar", value: 60_000_000_000 },
]

const revenueOptions = [
  { label: "< Rp 10 juta / bulan", value: 5_000_000 },
  { label: "Rp 10-50 juta / bulan", value: 20_000_000 },
  { label: "Rp 50-100 juta / bulan", value: 75_000_000 },
  { label: "Rp 100 juta-1 miliar / bulan", value: 250_000_000 },
  { label: "> Rp 1 miliar / bulan", value: 1_250_000_000 },
]

const tierOrder: Record<Tier, number> = {
  "tier-0-survival": 0,
  "tier-1-hustler": 1,
  "tier-2-scaler": 2,
  "tier-3-asset-builder": 3,
  "tier-4-legacy": 4,
}

function formatRupiah(value: number | null) {
  if (!value) return ""
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value)
}

function calculateTier(quiz: QuizState): Tier {
  const income = quiz.income ?? 0
  const assets = quiz.assets ?? 0
  let tier: Tier = "tier-1-hustler"

  if (quiz.debtPressure === "high" || income < 5_000_000) tier = "tier-0-survival"
  else if (income < 10_000_000) tier = "tier-1-hustler"
  else if (income < 100_000_000) tier = "tier-2-scaler"
  else if (income < 1_000_000_000) tier = "tier-3-asset-builder"
  else tier = "tier-4-legacy"

  if (assets >= 50_000_000_000) return "tier-4-legacy"
  if (assets >= 5_000_000_000 && tierOrder[tier] < 3) return "tier-3-asset-builder"
  if (assets >= 500_000_000 && tierOrder[tier] < 2) return "tier-2-scaler"

  return tier
}

function calculateBusinessTier(quiz: QuizState): Tier | null {
  if (!quiz.businessConfirmed || !quiz.businessRevenue) return null
  if (quiz.businessRevenue >= 1_000_000_000) return "tier-4-legacy"
  if (quiz.businessRevenue >= 100_000_000) return "tier-3-asset-builder"
  if (quiz.businessRevenue >= 10_000_000) return "tier-2-scaler"
  return null
}

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 pb-10">
      <HeroWithQuiz />
      <TierPath />
      <FeatureGrid />
    </div>
  )
}

function HeroWithQuiz() {
  return (
    <section className="grid gap-10 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-14">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-money-green/10 px-4 py-2 text-sm font-semibold text-money-green">
          <Sparkles className="h-4 w-4" />
          Peta belajar finansial sesuai kondisi Anda
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-6xl">
          Belajar keuangan dari tahap yang benar, bukan dari topik yang paling ramai.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-body sm:text-lg">
          Jawab beberapa pertanyaan singkat untuk mengetahui tier Anda. Setelah itu, Duit.co.id
          akan mengarahkan Anda ke artikel, tools, dan kelas yang relevan dengan posisi sekarang.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, label: "Mulai dari prioritas yang tepat" },
            { icon: LockKeyhole, label: "Akses tier sesuai kesiapan" },
            { icon: TrendingUp, label: "Naik tier saat bisnis siap" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 text-sm font-semibold text-heading backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <item.icon className="h-5 w-5 shrink-0 text-money-green" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <TierQuiz />
    </section>
  )
}

function TierQuiz() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const [step, setStep] = useState(0)
  const [quiz, setQuiz] = useState<QuizState>(initialQuiz)
  const [savedTier, setSavedTier] = useState<Tier | null>(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const baseTier = useMemo(() => calculateTier(quiz), [quiz])
  const businessTier = useMemo(() => calculateBusinessTier(quiz), [quiz])
  const finalTier = businessTier && tierOrder[businessTier] > tierOrder[baseTier] ? businessTier : baseTier
  const shouldShowBusinessStep = baseTier === "tier-1-hustler" && quiz.businessStatus === "running"
  const maxStep = shouldShowBusinessStep ? 4 : 3
  const progress = ((step + 1) / (maxStep + 1)) * 100

  const canContinue =
    (step === 0 && quiz.income !== null) ||
    (step === 1 && quiz.debtPressure !== null) ||
    (step === 2 && quiz.assets !== null) ||
    (step === 3 && quiz.businessStatus !== null) ||
    (step === 4 && quiz.businessRevenue !== null)

  const saveTier = async () => {
    setError("")
    setMessage("")

    if (!isLoaded || !isSignedIn) {
      setError("Login dulu agar hasil quiz dan akses tier tersimpan di akun Anda.")
      return
    }

    setSaving(true)
    try {
      const token = await getToken()
      const quizType = shouldShowBusinessStep && step >= 4 ? "business_upgrade" : "initial"
      const response = await fetch("/api/tier", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizType,
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          fullName: user?.fullName ?? user?.username ?? "",
          imageUrl: user?.imageUrl ?? "",
          monthlyIncomeIdr: quiz.income,
          totalAssetsIdr: quiz.assets,
          hasHighDebt: quiz.debtPressure === "high",
          businessName: quiz.businessName,
          businessType: quiz.businessType,
          businessUrl: quiz.businessUrl,
          monthlyBusinessRevenueIdr: quiz.businessRevenue,
          businessConfirmed: quiz.businessConfirmed,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message ?? "Tier belum bisa disimpan.")

      const tier = data.tier as Tier
      setSavedTier(tier)
      setMessage(`Akses ${tiers[tier].short} tersimpan di akun Anda.`)
      await user?.update({
        unsafeMetadata: {
          ...(user.unsafeMetadata ?? {}),
          duitProfile: {
            ...((user.unsafeMetadata?.duitProfile as Record<string, unknown>) ?? {}),
            incomeTier: tier,
            accessRole: data.accessRole,
          },
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tier belum bisa disimpan.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-money-green">Quiz tier finansial</p>
          <h2 className="mt-1 text-2xl font-bold text-heading">Temukan jalur belajar Anda</h2>
        </div>
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-body dark:bg-white/10">
          {step + 1}/{maxStep + 1}
        </span>
      </div>

      <div className="mb-6 h-2 rounded-full bg-black/5 dark:bg-white/10">
        <div className="h-full rounded-full bg-money-green transition-all" style={{ width: `${progress}%` }} />
      </div>

      {step === 0 ? (
        <Question title="Berapa pendapatan bersih bulanan Anda saat ini?">
          <OptionGrid
            options={incomeOptions}
            selected={quiz.income}
            onSelect={(value) => setQuiz((current) => ({ ...current, income: value }))}
          />
        </Question>
      ) : null}

      {step === 1 ? (
        <Question title="Seberapa berat tekanan cicilan atau utang konsumtif saat ini?">
          <div className="grid gap-3">
            {[
              { label: "Rendah", value: "low", description: "Masih aman dan tidak mengganggu kebutuhan utama." },
              { label: "Sedang", value: "medium", description: "Perlu dirapikan agar tidak makin berat." },
              { label: "Tinggi", value: "high", description: "Sudah menekan arus kas dan perlu prioritas pemulihan." },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  setQuiz((current) => ({ ...current, debtPressure: item.value as QuizState["debtPressure"] }))
                }
                className={`rounded-2xl border p-4 text-left transition ${
                  quiz.debtPressure === item.value
                    ? "border-money-green bg-money-green/10"
                    : "border-black/10 bg-white/50 hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <span className="font-semibold text-heading">{item.label}</span>
                <span className="mt-1 block text-sm leading-6 text-body">{item.description}</span>
              </button>
            ))}
          </div>
        </Question>
      ) : null}

      {step === 2 ? (
        <Question title="Kira-kira berapa total aset produktif dan likuid Anda?">
          <OptionGrid
            options={assetOptions}
            selected={quiz.assets}
            onSelect={(value) => setQuiz((current) => ({ ...current, assets: value }))}
          />
        </Question>
      ) : null}

      {step === 3 ? (
        <Question title="Apakah Anda sedang menjalankan bisnis?">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Belum", value: "none" },
              { label: "Masih ide", value: "idea" },
              { label: "Sudah jalan", value: "running" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  setQuiz((current) => ({ ...current, businessStatus: item.value as QuizState["businessStatus"] }))
                }
                className={`rounded-2xl border p-4 text-center text-sm font-semibold transition ${
                  quiz.businessStatus === item.value
                    ? "border-money-green bg-money-green/10 text-money-green"
                    : "border-black/10 bg-white/50 text-heading hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Question>
      ) : null}

      {step === 4 ? (
        <Question title="Lengkapi data bisnis untuk membuka jalur Scaler.">
          <div className="grid gap-4">
            <input
              value={quiz.businessName}
              onChange={(event) => setQuiz((current) => ({ ...current, businessName: event.target.value }))}
              placeholder="Nama bisnis"
              className="h-12 rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
            />
            <input
              value={quiz.businessType}
              onChange={(event) => setQuiz((current) => ({ ...current, businessType: event.target.value }))}
              placeholder="Bidang bisnis, contoh: kuliner, jasa, retail, online shop"
              className="h-12 rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
            />
            <input
              value={quiz.businessUrl}
              onChange={(event) => setQuiz((current) => ({ ...current, businessUrl: event.target.value }))}
              placeholder="Website, marketplace, landing page, atau akun toko"
              className="h-12 rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
            />
            <OptionGrid
              options={revenueOptions}
              selected={quiz.businessRevenue}
              onSelect={(value) => setQuiz((current) => ({ ...current, businessRevenue: value }))}
            />
            <label className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-50/80 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
              <input
                type="checkbox"
                checked={quiz.businessConfirmed}
                onChange={(event) =>
                  setQuiz((current) => ({ ...current, businessConfirmed: event.target.checked }))
                }
                className="mt-1"
              />
              <span>
                Saya menyatakan bisnis ini berjalan dan omzet bulanan yang dipilih sudah mendekati kondisi aktual.
              </span>
            </label>
          </div>
        </Question>
      ) : null}

      <div className="mt-6 rounded-2xl border border-money-green/15 bg-money-green/10 p-4">
        <p className="text-sm font-semibold text-money-green">Hasil sementara</p>
        <p className="mt-1 text-xl font-bold text-heading">{tiers[finalTier].label}</p>
        <p className="mt-2 text-sm leading-6 text-body">{tiers[finalTier].description}</p>
      </div>

      {message ? <p className="mt-4 rounded-xl bg-money-green/10 p-3 text-sm font-semibold text-money-green">{message}</p> : null}
      {error ? <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">{error}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          disabled={step === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-heading transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali
        </button>

        {step < maxStep ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(maxStep, current + 1))}
            disabled={!canContinue}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Lanjut
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row">
            {!isSignedIn ? (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
              >
                Login untuk simpan akses
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            <GoldShineButton
              onClick={saveTier}
              disabled={saving || !canContinue}
              className="px-5 py-3 text-sm"
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan
                </span>
              ) : (
                "Simpan hasil"
              )}
            </GoldShineButton>
            <Link
              href={tiers[savedTier ?? finalTier].href}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-heading transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            >
              Buka artikel
            </Link>
          </div>
        )}
      </div>
    </GlassCard>
  )
}

function Question({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-heading">{title}</h3>
      {children}
    </div>
  )
}

function OptionGrid({
  options,
  selected,
  onSelect,
}: {
  options: { label: string; value: number }[]
  selected: number | null
  onSelect: (value: number) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelect(option.value)}
          className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${
            selected === option.value
              ? "border-money-green bg-money-green/10 text-money-green"
              : "border-black/10 bg-white/50 text-heading hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
          }`}
        >
          {option.label}
          <span className="mt-1 block text-xs font-medium text-body">{formatRupiah(option.value)}</span>
        </button>
      ))}
    </div>
  )
}

function TierPath() {
  const items = [
    { tier: "tier-0-survival" as Tier, icon: ShieldCheck },
    { tier: "tier-1-hustler" as Tier, icon: TrendingUp },
    { tier: "tier-2-scaler" as Tier, icon: BarChart3 },
    { tier: "tier-3-asset-builder" as Tier, icon: Landmark },
    { tier: "tier-4-legacy" as Tier, icon: GraduationCap },
  ]

  return (
    <section>
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-money-green">Jalur belajar bertingkat</p>
        <h2 className="mt-2 text-3xl font-bold text-heading">Konten dibuka sesuai kesiapan finansial.</h2>
        <p className="mt-4 text-base leading-7 text-body">
          Tier 0 dan Tier 1 terbuka untuk membangun fondasi. Tier 2 ke atas diarahkan untuk pengguna
          yang sudah punya arus kas atau aset yang cukup agar materi yang dipelajari langsung bisa dipakai.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {items.map(({ tier, icon: Icon }) => (
          <Link
            key={tier}
            href={tiers[tier].href}
            className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
          >
            <Icon className="h-7 w-7 text-money-green" />
            <h3 className="mt-4 text-lg font-bold text-heading">{tiers[tier].short}</h3>
            <p className="mt-2 text-sm leading-6 text-body">{tiers[tier].description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function FeatureGrid() {
  const features = [
    {
      icon: BookOpen,
      title: "Artikel yang relevan",
      text: "Mulai dari materi yang sesuai dengan kondisi Anda, lalu naik ketika tindakan dan angka bisnis sudah mendukung.",
    },
    {
      icon: Briefcase,
      title: "Upgrade berbasis bisnis",
      text: "User Tier 1 bisa membuka jalur Scaler setelah mengisi data bisnis dan menyatakan omzet minimal Rp 10 juta per bulan.",
    },
    {
      icon: CheckCircle2,
      title: "Progress tersimpan",
      text: "Akun menyimpan tier, checkout, enrollment, artikel terakhir dibaca, dan progress belajar di D1.",
    },
  ]

  return (
    <section className="grid gap-5 md:grid-cols-3">
      {features.map((feature) => (
        <GlassCard key={feature.title} className="p-6">
          <feature.icon className="h-8 w-8 text-money-green" />
          <h3 className="mt-5 text-xl font-bold text-heading">{feature.title}</h3>
          <p className="mt-3 text-sm leading-6 text-body">{feature.text}</p>
        </GlassCard>
      ))}
    </section>
  )
}
