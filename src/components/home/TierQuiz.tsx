"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useAuth, useUser } from "@clerk/react"
import {
  ArrowRight,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  Home,
  Loader2,
  RefreshCcw,
  ShieldAlert,
  UserRound,
  WalletCards,
} from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"

type Activity = "employee" | "business" | "both" | "student" | "not_working"
type Residence = "kos" | "kontrak" | "parents" | "own_paid" | "own_mortgage" | "other"
type StepId = "age" | "activity" | "income" | "business" | "debts" | "vehicles" | "residence" | "wealth" | "result"
type Tier =
  | "tier-0-survival"
  | "tier-1-hustler"
  | "tier-2-scaler"
  | "tier-3-asset-builder"
  | "tier-4-legacy"

type DebtKey = "creditCard" | "motorcycleLoan" | "carLoan" | "mortgage" | "pinjol" | "familyLoan" | "businessLoan"

type QuizState = {
  age: string
  activity: Activity | ""
  salaryIdr: number
  businessRevenueIdr: number
  businessName: string
  businessType: string
  businessUrl: string
  staffCount: number
  netProfitPercent: number
  debts: Record<DebtKey, { checked: boolean; monthlyPaymentIdr: number }>
  motorcycleCount: number
  carCount: number
  residence: Residence | ""
  mortgagePaidOffYear: string
  investableAssetsIdr: number
  companyOwnershipValueIdr: number
}

const storageKey = "duit.homepage.financial-assessment.v2"

const emptyQuiz: QuizState = {
  age: "",
  activity: "",
  salaryIdr: 0,
  businessRevenueIdr: 0,
  businessName: "",
  businessType: "",
  businessUrl: "",
  staffCount: 0,
  netProfitPercent: 20,
  debts: {
    creditCard: { checked: false, monthlyPaymentIdr: 0 },
    motorcycleLoan: { checked: false, monthlyPaymentIdr: 0 },
    carLoan: { checked: false, monthlyPaymentIdr: 0 },
    mortgage: { checked: false, monthlyPaymentIdr: 0 },
    pinjol: { checked: false, monthlyPaymentIdr: 0 },
    familyLoan: { checked: false, monthlyPaymentIdr: 0 },
    businessLoan: { checked: false, monthlyPaymentIdr: 0 },
  },
  motorcycleCount: 0,
  carCount: 0,
  residence: "",
  mortgagePaidOffYear: "",
  investableAssetsIdr: 0,
  companyOwnershipValueIdr: 0,
}

const debtOptions: { key: DebtKey; label: string }[] = [
  { key: "creditCard", label: "Kartu kredit" },
  { key: "motorcycleLoan", label: "Kredit motor" },
  { key: "carLoan", label: "Kredit mobil" },
  { key: "mortgage", label: "KPR / kredit rumah" },
  { key: "pinjol", label: "Pinjol" },
  { key: "familyLoan", label: "Utang keluarga/teman" },
  { key: "businessLoan", label: "Utang bisnis" },
]

const activityOptions: { value: Activity; label: string; description: string }[] = [
  { value: "employee", label: "Kerja", description: "Gaji atau upah tetap dari pekerjaan." },
  { value: "business", label: "Bisnis", description: "Usaha sendiri menjadi sumber utama." },
  { value: "both", label: "Kerja dan bisnis", description: "Ada gaji, ada usaha sampingan/utama." },
  { value: "student", label: "Masih sekolah/kuliah", description: "Belum punya penghasilan stabil." },
  { value: "not_working", label: "Belum bekerja", description: "Sedang mencari kerja atau jeda." },
]

const residenceOptions: { value: Residence; label: string }[] = [
  { value: "kos", label: "Kos" },
  { value: "kontrak", label: "Kontrak/sewa rumah" },
  { value: "parents", label: "Rumah orang tua/keluarga" },
  { value: "own_paid", label: "Rumah sendiri, sudah lunas" },
  { value: "own_mortgage", label: "Rumah sendiri, masih cicilan" },
  { value: "other", label: "Lainnya" },
]

const tierOrder: Record<Tier, number> = {
  "tier-0-survival": 0,
  "tier-1-hustler": 1,
  "tier-2-scaler": 2,
  "tier-3-asset-builder": 3,
  "tier-4-legacy": 4,
}

function parseStoredQuiz(value: string | null) {
  if (!value) return emptyQuiz
  try {
    return { ...emptyQuiz, ...JSON.parse(value) } as QuizState
  } catch {
    return emptyQuiz
  }
}

function formatRupiah(value: number) {
  if (!value) return ""
  return new Intl.NumberFormat("id-ID").format(value)
}

function parseNumber(value: string) {
  const parsed = Number(value.replace(/\D/g, ""))
  return Number.isFinite(parsed) ? parsed : 0
}

function selectedDebtTotal(quiz: QuizState) {
  return Object.values(quiz.debts).reduce(
    (total, item) => total + (item.checked ? item.monthlyPaymentIdr : 0),
    0,
  )
}

function hasPinjol(quiz: QuizState) {
  return quiz.debts.pinjol.checked && quiz.debts.pinjol.monthlyPaymentIdr > 0
}

function monthlyNetIncome(quiz: QuizState) {
  const businessProfit = Math.round(quiz.businessRevenueIdr * (quiz.netProfitPercent / 100))
  return quiz.salaryIdr + businessProfit
}

function calculateInternalTier(quiz: QuizState): Tier {
  const age = Number(quiz.age) || 0
  const income = monthlyNetIncome(quiz)
  const debtPayment = selectedDebtTotal(quiz)
  const debtRatio = income > 0 ? debtPayment / income : debtPayment > 0 ? 1 : 0
  const investableAssets = quiz.investableAssetsIdr + quiz.companyOwnershipValueIdr

  let tier: Tier = "tier-1-hustler"
  if (hasPinjol(quiz) || debtRatio > 0.45 || income < 5_000_000 || (!income && age < 26)) {
    tier = "tier-0-survival"
  } else if (income < 10_000_000) {
    tier = "tier-1-hustler"
  } else if (income < 100_000_000) {
    tier = "tier-2-scaler"
  } else if (income < 1_000_000_000) {
    tier = "tier-3-asset-builder"
  } else {
    tier = "tier-4-legacy"
  }

  if (investableAssets >= 50_000_000_000) return "tier-4-legacy"
  if (investableAssets >= 5_000_000_000 && tierOrder[tier] < 3) return "tier-3-asset-builder"
  if (investableAssets >= 500_000_000 && tierOrder[tier] < 2) return "tier-2-scaler"

  return tier
}

function getAssessment(quiz: QuizState) {
  const income = monthlyNetIncome(quiz)
  const debtPayment = selectedDebtTotal(quiz)
  const debtRatio = income > 0 ? debtPayment / income : debtPayment > 0 ? 1 : 0
  const tier = calculateInternalTier(quiz)

  if (hasPinjol(quiz) || debtRatio > 0.45) {
    return {
      tier,
      title: "Arus kas sedang perlu diamankan dulu.",
      summary:
        "Prioritas Anda bukan menambah strategi rumit, tetapi menghentikan kebocoran cicilan, menyusun urutan pelunasan, dan menjaga kebutuhan pokok tetap aman.",
      focus: ["Audit semua cicilan bulanan", "Buat rencana lunas utang berbunga tinggi", "Tunda eksperimen bisnis yang butuh modal"],
      href: "/artikel/tier-0-survival",
      cta: "Buka panduan pemulihan arus kas",
    }
  }

  if (quiz.activity === "business" || quiz.activity === "both") {
    if (quiz.businessRevenueIdr >= 10_000_000 && quiz.netProfitPercent >= 10) {
      return {
        tier,
        title: "Bisnis sudah layak mulai dirapikan sebagai sistem.",
        summary:
          "Omzet sudah menunjukkan ada permintaan. Fokus berikutnya adalah margin, pencatatan, SOP, channel penjualan, dan keputusan rekrutmen yang tidak asal tumbuh.",
        focus: ["Pisahkan uang pribadi dan bisnis", "Rapikan laporan laba rugi", "Tentukan SOP penjualan dan layanan"],
        href: "/artikel/tier-2-scaler",
        cta: "Buka materi sistem bisnis",
      }
    }
  }

  if (income >= 100_000_000 || quiz.investableAssetsIdr >= 5_000_000_000) {
    return {
      tier,
      title: "Keputusan aset mulai lebih penting daripada sekadar menambah income.",
      summary:
        "Anda perlu mulai melihat struktur kepemilikan, risiko pajak, properti, bisnis, dan pembagian aset agar kekayaan tidak rapuh.",
      focus: ["Petakan aset dan risiko hukum", "Evaluasi properti atau bisnis produktif", "Mulai pikirkan struktur kepemilikan"],
      href: "/artikel/tier-3-asset-builder",
      cta: "Buka materi pembangunan aset",
    }
  }

  if (income >= 5_000_000) {
    return {
      tier,
      title: "Fondasi mulai ada, sekarang fokus menaikkan daya hasil.",
      summary:
        "Kondisi Anda lebih cocok belajar skill bernilai tinggi, negosiasi gaji, side income yang ringan modal, dan kebiasaan cashflow yang stabil.",
      focus: ["Naikkan penghasilan aktif", "Bangun dana darurat bertahap", "Validasi side income tanpa utang baru"],
      href: "/artikel/tier-1-hustler",
      cta: "Buka materi peningkatan income",
    }
  }

  return {
    tier,
    title: "Fondasi penghasilan perlu dibangun dari yang paling praktis.",
    summary:
      "Belajar yang paling berguna sekarang adalah cara menekan pengeluaran wajib, mencari sumber penghasilan pertama, dan menghindari utang mahal.",
    focus: ["Cari income pertama yang cepat dicoba", "Jaga biaya hidup tetap ringan", "Hindari pinjaman konsumtif"],
    href: "/artikel/tier-0-survival",
    cta: "Buka materi fondasi keuangan",
  }
}

function isFoundationCase(quiz: QuizState) {
  const age = Number(quiz.age) || 0
  const income = monthlyNetIncome(quiz)
  const debtPayment = selectedDebtTotal(quiz)
  const debtRatio = income > 0 ? debtPayment / income : debtPayment > 0 ? 1 : 0
  return hasPinjol(quiz) || debtRatio > 0.45 || (age > 0 && age < 26 && income > 0 && income < 5_000_000)
}

function stepsForQuiz(quiz: QuizState): StepId[] {
  const steps: StepId[] = ["age", "activity"]
  if (quiz.activity === "employee" || quiz.activity === "both") steps.push("income")
  if (quiz.activity === "business" || quiz.activity === "both") steps.push("business")
  steps.push("debts")

  const hasCoreInput =
    Boolean(quiz.age) &&
    Boolean(quiz.activity) &&
    (quiz.activity === "student" ||
      quiz.activity === "not_working" ||
      quiz.salaryIdr > 0 ||
      quiz.businessRevenueIdr > 0)

  if (hasCoreInput && !isFoundationCase(quiz)) {
    steps.push("vehicles", "residence")
    if (monthlyNetIncome(quiz) >= 50_000_000 || quiz.businessRevenueIdr >= 100_000_000) {
      steps.push("wealth")
    }
  }

  steps.push("result")
  return steps
}

function canAdvance(step: StepId, quiz: QuizState) {
  if (step === "age") return Number(quiz.age) >= 13
  if (step === "activity") return Boolean(quiz.activity)
  if (step === "income") return quiz.salaryIdr > 0
  if (step === "business") return quiz.businessRevenueIdr > 0
  if (step === "debts") return true
  if (step === "vehicles") return true
  if (step === "residence") return Boolean(quiz.residence)
  if (step === "wealth") return true
  return true
}

export function TierQuiz({ onSaved }: { onSaved?: () => void } = {}) {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const [quiz, setQuiz] = useState<QuizState>(emptyQuiz)
  const [stepIndex, setStepIndex] = useState(0)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [savedSignature, setSavedSignature] = useState("")
  const steps = useMemo(() => stepsForQuiz(quiz), [quiz])
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)]
  const assessment = useMemo(() => getAssessment(quiz), [quiz])
  const signature = useMemo(() => JSON.stringify(quiz), [quiz])
  const resultReady = currentStep === "result"

  useEffect(() => {
    setQuiz(parseStoredQuiz(window.localStorage.getItem(storageKey)))
  }, [])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(quiz))
  }, [quiz])

  useEffect(() => {
    if (stepIndex > steps.length - 1) setStepIndex(steps.length - 1)
  }, [stepIndex, steps.length])

  useEffect(() => {
    if (!resultReady || !isLoaded || !isSignedIn || signature === savedSignature) return
    void saveAssessment({ silent: true })
  }, [isLoaded, isSignedIn, resultReady, savedSignature, signature])

  const updateQuiz = (patch: Partial<QuizState>) => setQuiz((current) => ({ ...current, ...patch }))

  const saveAssessment = async ({ silent = false } = {}) => {
    if (!isLoaded || !isSignedIn) {
      if (!silent) setError("Daftar atau login agar hasil assessment ini tersimpan.")
      return
    }

    setSaving(true)
    setError("")
    if (!silent) setMessage("")

    try {
      const token = await getToken()
      const response = await fetch("/api/tier", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizType: "financial_assessment",
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          fullName: user?.fullName ?? user?.username ?? "",
          imageUrl: user?.imageUrl ?? "",
          monthlyIncomeIdr: monthlyNetIncome(quiz),
          totalAssetsIdr: quiz.investableAssetsIdr + quiz.companyOwnershipValueIdr,
          monthlyBusinessRevenueIdr: quiz.businessRevenueIdr,
          hasHighDebt: hasPinjol(quiz) || selectedDebtTotal(quiz) > monthlyNetIncome(quiz) * 0.45,
          businessName: quiz.businessName,
          businessType: quiz.businessType,
          businessUrl: quiz.businessUrl,
          businessConfirmed: quiz.businessRevenueIdr >= 10_000_000,
          assessmentStatus: assessment.title,
          assessmentFocus: assessment.focus,
          quizAnswers: quiz,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message ?? "Assessment belum bisa disimpan.")

      setSavedSignature(signature)
      if (!silent) setMessage("Assessment tersimpan di akun Anda.")
      await user?.update({
        unsafeMetadata: {
          ...(user.unsafeMetadata ?? {}),
          duitProfile: {
            ...((user.unsafeMetadata?.duitProfile as Record<string, unknown>) ?? {}),
            incomeTier: data.tier,
            accessRole: data.accessRole,
          },
        },
      })
      onSaved?.()
    } catch (err) {
      if (!silent) setError(err instanceof Error ? err.message : "Assessment belum bisa disimpan.")
    } finally {
      setSaving(false)
    }
  }

  const resetQuiz = () => {
    setQuiz(emptyQuiz)
    setStepIndex(0)
    setMessage("")
    setError("")
    setSavedSignature("")
    window.localStorage.removeItem(storageKey)
  }

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-money-green">Assessment finansial</p>
          <h2 className="mt-1 text-2xl font-bold text-heading">Cek posisi uang Anda</h2>
          <p className="mt-2 text-sm leading-6 text-body">
            Jawaban tersimpan di browser ini. Saat login, hasilnya ikut tersimpan ke akun.
          </p>
        </div>
        <button
          type="button"
          onClick={resetQuiz}
          className="rounded-xl border border-black/10 p-2 text-body transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
          aria-label="Ulang assessment"
        >
          <RefreshCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-6 h-2 rounded-full bg-black/5 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-money-green transition-all"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {currentStep === "age" ? (
        <Panel icon={UserRound} title="Berapa umur Anda sekarang?">
          <input
            inputMode="numeric"
            value={quiz.age}
            onChange={(event) => updateQuiz({ age: event.target.value.replace(/\D/g, "").slice(0, 3) })}
            placeholder="Contoh: 27"
            className="h-12 w-full rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
          />
        </Panel>
      ) : null}

      {currentStep === "activity" ? (
        <Panel icon={Briefcase} title="Saat ini aktivitas utama Anda apa?">
          <div className="grid gap-3">
            {activityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateQuiz({ activity: option.value })}
                className={`rounded-2xl border p-4 text-left transition ${
                  quiz.activity === option.value
                    ? "border-money-green bg-money-green/10"
                    : "border-black/10 bg-white/50 hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <span className="font-semibold text-heading">{option.label}</span>
                <span className="mt-1 block text-sm leading-6 text-body">{option.description}</span>
              </button>
            ))}
          </div>
        </Panel>
      ) : null}

      {currentStep === "income" ? (
        <Panel icon={CircleDollarSign} title="Kalau kerja, berapa gaji bersih bulanan Anda?">
          <MoneyInput value={quiz.salaryIdr} onChange={(salaryIdr) => updateQuiz({ salaryIdr })} />
        </Panel>
      ) : null}

      {currentStep === "business" ? (
        <Panel icon={Building2} title="Kalau bisnis, seperti apa kondisinya sekarang?">
          <div className="grid gap-4">
            <input
              value={quiz.businessName}
              onChange={(event) => updateQuiz({ businessName: event.target.value })}
              placeholder="Nama bisnis"
              className="h-12 rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
            />
            <input
              value={quiz.businessType}
              onChange={(event) => updateQuiz({ businessType: event.target.value })}
              placeholder="Bidang bisnis, contoh: kuliner, jasa, retail, online shop"
              className="h-12 rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
            />
            <input
              value={quiz.businessUrl}
              onChange={(event) => updateQuiz({ businessUrl: event.target.value })}
              placeholder="Website, marketplace, landing page, atau akun toko"
              className="h-12 rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
            />
            <label className="space-y-2">
              <span className="text-sm font-semibold text-heading">Omzet rata-rata bulanan</span>
              <MoneyInput value={quiz.businessRevenueIdr} onChange={(businessRevenueIdr) => updateQuiz({ businessRevenueIdr })} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-heading">Jumlah staf</span>
                <input
                  inputMode="numeric"
                  value={quiz.staffCount ? String(quiz.staffCount) : ""}
                  onChange={(event) => updateQuiz({ staffCount: parseNumber(event.target.value) })}
                  placeholder="0 kalau masih sendiri"
                  className="h-12 w-full rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-heading">Profit bersih</span>
                <div className="flex h-12 items-center rounded-xl border border-black/10 bg-white/70 px-4 dark:border-white/10 dark:bg-white/10">
                  <input
                    inputMode="numeric"
                    value={quiz.netProfitPercent ? String(quiz.netProfitPercent) : ""}
                    onChange={(event) =>
                      updateQuiz({ netProfitPercent: Math.min(100, parseNumber(event.target.value)) })
                    }
                    className="w-full bg-transparent text-sm text-heading outline-none"
                    placeholder="20"
                  />
                  <span className="text-sm font-semibold text-body">%</span>
                </div>
              </label>
            </div>
          </div>
        </Panel>
      ) : null}

      {currentStep === "debts" ? (
        <Panel icon={WalletCards} title="Apakah sedang punya cicilan atau utang?">
          <div className="grid gap-3">
            {debtOptions.map((option) => {
              const item = quiz.debts[option.key]
              return (
                <div
                  key={option.key}
                  className={`rounded-2xl border p-4 transition ${
                    item.checked
                      ? "border-money-green bg-money-green/10"
                      : "border-black/10 bg-white/50 dark:border-white/10 dark:bg-white/5"
                  }`}
                >
                  <label className="flex items-center gap-3 text-sm font-semibold text-heading">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(event) =>
                        setQuiz((current) => ({
                          ...current,
                          debts: {
                            ...current.debts,
                            [option.key]: { ...item, checked: event.target.checked },
                          },
                        }))
                      }
                    />
                    {option.label}
                  </label>
                  {item.checked ? (
                    <div className="mt-3">
                      <MoneyInput
                        value={item.monthlyPaymentIdr}
                        onChange={(monthlyPaymentIdr) =>
                          setQuiz((current) => ({
                            ...current,
                            debts: {
                              ...current.debts,
                              [option.key]: { ...item, monthlyPaymentIdr },
                            },
                          }))
                        }
                        placeholder="Cicilan per bulan"
                      />
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </Panel>
      ) : null}

      {currentStep === "vehicles" ? (
        <Panel icon={Car} title="Kendaraan apa yang Anda miliki?">
          <div className="grid gap-4 sm:grid-cols-2">
            <Counter label="Motor" value={quiz.motorcycleCount} onChange={(motorcycleCount) => updateQuiz({ motorcycleCount })} />
            <Counter label="Mobil" value={quiz.carCount} onChange={(carCount) => updateQuiz({ carCount })} />
          </div>
        </Panel>
      ) : null}

      {currentStep === "residence" ? (
        <Panel icon={Home} title="Status tempat tinggal Anda sekarang?">
          <div className="grid gap-3 sm:grid-cols-2">
            {residenceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateQuiz({ residence: option.value })}
                className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                  quiz.residence === option.value
                    ? "border-money-green bg-money-green/10 text-money-green"
                    : "border-black/10 bg-white/50 text-heading hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {quiz.residence === "own_mortgage" ? (
            <label className="mt-4 block space-y-2">
              <span className="text-sm font-semibold text-heading">Kira-kira lunas tahun berapa?</span>
              <input
                inputMode="numeric"
                value={quiz.mortgagePaidOffYear}
                onChange={(event) =>
                  updateQuiz({ mortgagePaidOffYear: event.target.value.replace(/\D/g, "").slice(0, 4) })
                }
                placeholder="Contoh: 2032"
                className="h-12 w-full rounded-xl border border-black/10 bg-white/70 px-4 text-sm text-heading outline-none focus:border-money-green/40 dark:border-white/10 dark:bg-white/10"
              />
            </label>
          ) : null}
        </Panel>
      ) : null}

      {currentStep === "wealth" ? (
        <Panel icon={ShieldAlert} title="Untuk aset besar, apa yang paling mendekati kondisi Anda?">
          <div className="grid gap-4">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-heading">Aset investasi likuid</span>
              <MoneyInput
                value={quiz.investableAssetsIdr}
                onChange={(investableAssetsIdr) => updateQuiz({ investableAssetsIdr })}
                placeholder="Saham, reksa dana, deposito, kas investasi"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-heading">Estimasi nilai kepemilikan bisnis</span>
              <MoneyInput
                value={quiz.companyOwnershipValueIdr}
                onChange={(companyOwnershipValueIdr) => updateQuiz({ companyOwnershipValueIdr })}
                placeholder="Kosongkan jika belum relevan"
              />
            </label>
          </div>
        </Panel>
      ) : null}

      {currentStep === "result" ? (
        <Panel icon={CheckCircle2} title={assessment.title}>
          <p className="text-sm leading-6 text-body">{assessment.summary}</p>
          <div className="mt-4 grid gap-2">
            {assessment.focus.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-heading">
                <CheckCircle2 className="h-4 w-4 text-money-green" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={assessment.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
            >
              {assessment.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {!isSignedIn ? (
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-heading transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                Daftar untuk simpan progress
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => saveAssessment()}
                disabled={saving}
                className="inline-flex items-center justify-center rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-heading transition hover:bg-black/5 disabled:opacity-60 dark:border-white/10 dark:hover:bg-white/10"
              >
                {saving ? "Menyimpan..." : savedSignature === signature ? "Sudah tersimpan" : "Simpan progress"}
              </button>
            )}
          </div>
        </Panel>
      ) : null}

      {message ? <p className="mt-4 rounded-xl bg-money-green/10 p-3 text-sm font-semibold text-money-green">{message}</p> : null}
      {error ? <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">{error}</p> : null}
      {saving && resultReady ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-body">
          <Loader2 className="h-4 w-4 animate-spin" />
          Menyimpan assessment...
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
          disabled={stepIndex === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-heading transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali
        </button>

        {currentStep !== "result" ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            {steps.includes("result") && stepIndex >= steps.indexOf("debts") ? (
              <button
                type="button"
                onClick={() => setStepIndex(steps.length - 1)}
                className="inline-flex items-center justify-center rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold text-heading transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
              >
                Lihat arahan sekarang
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setStepIndex((current) => Math.min(steps.length - 1, current + 1))}
              disabled={!canAdvance(currentStep, quiz)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Lanjut
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </GlassCard>
  )
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-money-green/10 text-money-green">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold text-heading">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function MoneyInput({
  value,
  onChange,
  placeholder = "0",
}: {
  value: number
  onChange: (value: number) => void
  placeholder?: string
}) {
  return (
    <div className="flex h-12 items-center rounded-xl border border-black/10 bg-white/70 px-4 focus-within:border-money-green/40 dark:border-white/10 dark:bg-white/10">
      <span className="mr-2 text-sm font-semibold text-body">Rp</span>
      <input
        inputMode="numeric"
        value={formatRupiah(value)}
        onChange={(event) => onChange(parseNumber(event.target.value))}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-heading outline-none"
      />
    </div>
  )
}

function Counter({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-sm font-semibold text-heading">{label}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 text-lg font-bold text-heading dark:border-white/10"
        >
          -
        </button>
        <span className="text-xl font-bold text-heading">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 text-lg font-bold text-heading dark:border-white/10"
        >
          +
        </button>
      </div>
    </div>
  )
}
