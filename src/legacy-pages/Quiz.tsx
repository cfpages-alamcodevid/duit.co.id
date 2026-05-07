import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"
import { GreenButton } from "@/components/ui/GreenButton"
import { GoldShineButton } from "@/components/ui/GoldShineButton"
import { getTierLabel } from "@/utils/content"

// ─── Types ───────────────────────────────────────────────────────────────────

interface QuizAnswers {
  age_group: "muda" | "produktif" | "pensiun" | ""
  gender: "male" | "female" | "unisex" | ""
  monthly_income_net: number
  has_business: boolean
  monthly_business_revenue: number
  total_assets: number
  debt_level: "high" | "medium" | "none" | ""
  edu_level: "sma" | "s1" | "s2" | "spesialis" | ""
  location_type: "desa" | "kota" | "global" | ""
}

interface TierResult {
  tier: string
  label: string
  override_reason?: "asset_based" | "debt_based"
  original_tier?: string
}

type QuizStepId =
  | "age"
  | "gender"
  | "income"
  | "business"
  | "business-revenue"
  | "assets"
  | "debt"
  | "education"
  | "location"

// ─── Step Definitions ────────────────────────────────────────────────────────

interface QuizStep {
  id: QuizStepId
  question: string
  options: { label: string; value: string }[]
  key: keyof QuizAnswers
  type?: "select" | "conditional"
  required?: boolean
}

const QUIZ_STEPS: QuizStep[] = [
  // Step 1: Age Group
  {
    id: "age",
    question: "Berapa kelompok usia Anda saat ini?",
    key: "age_group",
    options: [
      { label: "Di bawah 20 tahun", value: "muda" },
      { label: "20 - 35 tahun", value: "produktif" },
      { label: "36 - 50 tahun", value: "produktif" },
      { label: "Di atas 50 tahun", value: "pensiun" },
    ],
  },
  // Step 2: Gender Perspective
  {
    id: "gender",
    question: "Perspektif apa yang Anda pilih untuk saran keuangan?",
    key: "gender",
    options: [
      { label: "Maskulin (Pertumbuhan Agresif)", value: "male" },
      { label: "Feminin (Stabilitas & Keamanan)", value: "female" },
      { label: "Netral", value: "unisex" },
    ],
  },
  // Step 3: Primary Monthly Income
  {
    id: "income",
    question: "Berapa pendapatan bersih Anda per bulan?",
    key: "monthly_income_net",
    options: [
      { label: "Kurang dari Rp 5 juta", value: "4999999" },
      { label: "Rp 5 juta - Rp 10 juta", value: "7500000" },
      { label: "Rp 10 juta - Rp 50 juta", value: "30000000" },
      { label: "Rp 50 juta - Rp 100 juta", value: "75000000" },
      { label: "Rp 100 juta - Rp 500 juta", value: "300000000" },
      { label: "Rp 500 juta - Rp 1 milyar", value: "750000000" },
      { label: "Lebih dari Rp 1 milyar", value: "1000000001" },
    ],
  },
  // Step 4: Business Ownership (branching)
  {
    id: "business",
    question: "Apakah Anda memiliki bisnis sendiri?",
    key: "has_business",
    options: [
      { label: "Ya, saya memiliki bisnis", value: "true" },
      { label: "Ya, saya freelance/pekerja lepas", value: "true" },
      { label: "Tidak, saya karyawan/freelancer", value: "false" },
    ],
  },
  // Step 4a: Business Revenue (conditional - shown only if business owner)
  {
    id: "business-revenue",
    question: "Berapa omzet bisnis Anda per bulan?",
    key: "monthly_business_revenue",
    options: [
      { label: "Kurang dari Rp 10 juta", value: "9999999" },
      { label: "Rp 10 juta - Rp 50 juta", value: "30000000" },
      { label: "Rp 50 juta - Rp 100 juta", value: "75000000" },
      { label: "Rp 100 juta - Rp 500 juta", value: "300000000" },
      { label: "Lebih dari Rp 500 juta", value: "500000001" },
    ],
  },
  // Step 5: Asset Assessment
  {
    id: "assets",
    question: "Berapa estimasi total aset Anda (properti, investasi, tabungan)?",
    key: "total_assets",
    options: [
      { label: "Kurang dari Rp 100 juta", value: "99999999" },
      { label: "Rp 100 juta - Rp 500 juta", value: "300000000" },
      { label: "Rp 500 juta - Rp 1 milyar", value: "750000000" },
      { label: "Rp 1 milyar - Rp 5 milyar", value: "3000000000" },
      { label: "Rp 5 milyar - Rp 50 milyar", value: "27500000000" },
      { label: "Lebih dari Rp 50 milyar", value: "50000000001" },
    ],
  },
  // Step 6: Debt Situation
  {
    id: "debt",
    question:
      "Apakah Anda memiliki utang berbunga tinggi (misal: Pinjol, Kartu Kredit)?",
    key: "debt_level",
    options: [
      { label: "Ya, beberapa dan memberatkan", value: "high" },
      { label: "Ya, tapi masih terkelola", value: "medium" },
      { label: "Tidak, saya bebas utang", value: "none" },
    ],
  },
  // Step 7: Education Level
  {
    id: "education",
    question: "Apa tingkat pendidikan terakhir Anda?",
    key: "edu_level",
    options: [
      { label: "SMA atau sederajat", value: "sma" },
      { label: "S1 / D4 / Sarjana", value: "s1" },
      { label: "S2 / Magister", value: "s2" },
      { label: "S3 / Doktor / Spesialis", value: "spesialis" },
    ],
  },
  // Step 8: Location Type
  {
    id: "location",
    question: "Di mana Anda tinggal saat ini?",
    key: "location_type",
    options: [
      { label: "Desa / Kawasan rural", value: "desa" },
      { label: "Kota kecil", value: "kota" },
      { label: "Kota besar (Jakarta, Surabaya, dll)", value: "kota" },
      { label: "Luar Indonesia / Global", value: "global" },
    ],
  },
]

// ─── Tier Calculation ────────────────────────────────────────────────────────

function calculateTier(answers: QuizAnswers): TierResult {
  let tier: string
  let override_reason: "asset_based" | "debt_based" | undefined
  let original_tier: string | undefined

  // Debt override (highest priority)
  if (answers.debt_level === "high") {
    return {
      tier: "tier-0-survival",
      label: getTierLabel("tier-0-survival"),
      override_reason: "debt_based",
    }
  }

  // Primary: Income-based
  if (answers.monthly_income_net < 5_000_000) {
    tier = "tier-0-survival"
  } else if (answers.monthly_income_net < 10_000_000) {
    tier = "tier-1-hustler"
  } else if (answers.monthly_income_net < 100_000_000) {
    tier = "tier-2-scaler"
  } else if (answers.monthly_income_net < 1_000_000_000) {
    tier = "tier-3-asset-builder"
  } else {
    tier = "tier-4-legacy"
  }

  original_tier = tier

  // Asset-based override
  if (answers.total_assets > 50_000_000_000) {
    tier = "tier-4-legacy"
    override_reason = "asset_based"
  } else if (answers.total_assets > 5_000_000_000) {
    if (
      tier === "tier-0-survival" ||
      tier === "tier-1-hustler" ||
      tier === "tier-2-scaler"
    ) {
      tier = "tier-3-asset-builder"
      override_reason = "asset_based"
    }
  } else if (answers.total_assets > 500_000_000) {
    if (
      tier === "tier-0-survival" ||
      tier === "tier-1-hustler"
    ) {
      tier = "tier-2-scaler"
      override_reason = "asset_based"
    }
  }

  return {
    tier,
    label: getTierLabel(tier as any),
    override_reason,
    original_tier,
  }
}

// ─── Format Helpers ──────────────────────────────────────────────────────────

function formatIncome(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(value % 1_000_000_000 === 0 ? 0 : 1)} M`
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 0)} jt`
  return `Rp ${value.toLocaleString("id-ID")}`
}

function formatAsset(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(0)} M`
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(0)} jt`
  return `Rp ${value.toLocaleString("id-ID")}`
}

// ─── Main Component ──────────────────────────────────────────────────────────

export const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    age_group: "",
    gender: "",
    monthly_income_net: 0,
    has_business: false,
    monthly_business_revenue: 0,
    total_assets: 0,
    debt_level: "",
    edu_level: "",
    location_type: "",
  })
  const [isFinished, setIsFinished] = useState(false)
  const [tierResult, setTierResult] = useState<TierResult | null>(null)

  // Determine which steps to show (handle branching)
  const visibleSteps = React.useMemo(() => {
    const steps = [...QUIZ_STEPS]
    // If user doesn't have a business, skip the business-revenue step
    return steps.filter((step) => {
      if (step.id === "business-revenue") {
        return answers.has_business === true
      }
      return true
    })
  }, [answers.has_business])

  const totalSteps = visibleSteps.length
  const currentVisibleStep = visibleSteps[currentStep]

  const handleOptionSelect = (value: string) => {
    const key = currentVisibleStep.key

    // Parse value based on key type
    let parsedValue: string | number | boolean = value
    if (key === "monthly_income_net" || key === "monthly_business_revenue" || key === "total_assets") {
      parsedValue = parseInt(value, 10)
    } else if (key === "has_business") {
      parsedValue = value === "true"
    }

    setAnswers((prev) => ({ ...prev, [key]: parsedValue }))

    // Advance to next step or finish
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate tier and show results
      const result = calculateTier({
        ...answers,
        [key]: parsedValue,
      })
      setTierResult(result)
      setIsFinished(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getProfileSummary = (): string[] => {
    const lines: string[] = []

    if (answers.monthly_income_net > 0) {
      lines.push(`Pendapatan: ${formatIncome(answers.monthly_income_net)}/bulan`)
    }
    if (answers.total_assets > 0) {
      lines.push(`Aset: ${formatAsset(answers.total_assets)}`)
    }
    if (answers.has_business) {
      lines.push("Status: Pemilik Bisnis")
    } else {
      lines.push("Status: Karyawan/Freelancer")
    }
    if (answers.debt_level === "none") {
      lines.push("Utang: Bebas utang")
    } else if (answers.debt_level === "medium") {
      lines.push("Utang: Terkelola")
    } else if (answers.debt_level === "high") {
      lines.push("Utang: Memberatkan")
    }
    if (answers.location_type) {
      const locLabels: Record<string, string> = {
        desa: "Desa",
        kota: "Kota",
        global: "Global",
      }
      lines.push(`Lokasi: ${locLabels[answers.location_type] || answers.location_type}`)
    }

    return lines
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-body mb-2">
                <span>
                  Langkah {currentStep + 1} dari {totalSteps}
                </span>
                <span>
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}% Selesai
                </span>
              </div>
              <div className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden glass-card">
                <div
                  className="h-full bg-money-green rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStep + 1) / totalSteps) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <GlassCard className="space-y-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-heading leading-snug">
                {currentVisibleStep.question}
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {currentVisibleStep.options.map((option, idx) => (
                  <motion.button
                    key={option.value + idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleOptionSelect(option.value)}
                    className="glass-card w-full text-left p-4 sm:p-5 rounded-2xl hover:border-money-green/30 hover:bg-money-green/5 transition-all text-base sm:text-lg font-medium text-heading"
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>

              {/* Back Button */}
              {currentStep > 0 && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleBack}
                    className="text-sm text-body/70 hover:text-heading transition-colors"
                  >
                    ← Kembali
                  </button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ) : (
          /* ─── Results Screen ──────────────────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6"
          >
            <GlassCard className="space-y-8 py-10 sm:py-12">
              {/* Crown Icon */}
              <div className="w-20 h-20 bg-money-green/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">👑</span>
              </div>

              {/* Tier Result */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-2">
                  Jalur Anda Sudah Siap
                </h2>
                <p className="text-body max-w-md mx-auto">
                  Berdasarkan profil Anda, Anda saat ini berada di:
                </p>
              </div>

              {/* Tier Badge */}
              <div className="py-4">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-money-green/10 border border-money-green/20">
                  <span className="text-2xl font-black text-money-green">
                    {tierResult?.label}
                  </span>
                </div>
                {tierResult?.override_reason && (
                  <p className="text-xs text-body mt-2">
                    {tierResult.override_reason === "debt_based"
                      ? "⚠️ Klasifikasi disesuaikan karena status utang tinggi. Fokus pada pelunasan utang terlebih dahulu."
                      : "📈 Klasifikasi disesuaikan berdasarkan aset Anda yang signifikan."}
                  </p>
                )}
              </div>

              {/* Profile Summary */}
              <div className="text-left max-w-sm mx-auto glass-card p-6 space-y-2">
                <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-3">
                  Profil Keuangan Anda
                </h3>
                {getProfileSummary().map((line, i) => (
                  <p key={i} className="text-sm text-body">
                    • {line}
                  </p>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 space-y-3">
                <GoldShineButton className="w-full max-w-sm mx-auto">
                  Masuk ke Dashboard Saya
                </GoldShineButton>
                <GreenButton
                  onClick={() => (window.location.href = "/artikel")}
                  className="w-full max-w-sm mx-auto"
                >
                  Jelajahi Konten Sekarang
                </GreenButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
