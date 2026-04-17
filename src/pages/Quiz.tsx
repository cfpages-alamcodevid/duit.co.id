import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"
import { GreenButton } from "@/components/ui/GreenButton"
import { GoldShineButton } from "@/components/ui/GoldShineButton"

const steps = [
  {
    id: "basic-info",
    question: "Berapa kelompok usia Anda saat ini?",
    options: ["Di bawah 20 tahun", "20 - 35 tahun", "36 - 50 tahun", "Di atas 50 tahun"],
    key: "age",
  },
  {
    id: "gender",
    question: "Perspektif apa yang Anda pilih untuk saran keuangan?",
    options: ["Maskulin (Pertumbuhan Agresif)", "Feminin (Stabilitas & Keamanan)", "Netral"],
    key: "gender",
  },
  {
    id: "income",
    question: "Berapa pendapatan rumah tangga bulanan Anda?",
    options: [
      "Kurang dari Rp 5 juta",
      "Rp 5 juta - Rp 20 juta",
      "Rp 20 juta - Rp 100 juta",
      "Lebih dari Rp 100 juta",
    ],
    key: "income",
  },
  {
    id: "debt",
    question: "Apakah Anda memiliki utang berbunga tinggi (misal: Pinjol)?",
    options: ["Ya, beberapa", "Ya, satu", "Tidak, saya bebas utang"],
    key: "debt",
  },
]

export const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isFinished, setIsFinished] = useState(false)

  const handleOptionSelect = (option: string) => {
    const key = steps[currentStep].key
    setAnswers((prev) => ({ ...prev, [key]: option }))

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
    }
  }

  const calculateTier = () => {
    if (answers.debt && answers.debt.includes("Ya")) return "Tier 0: Bertahan"
    if (answers.income === "Lebih dari Rp 100 juta") return "Tier 4: Warisan"
    if (answers.income === "Rp 20 juta - Rp 100 juta") return "Tier 3: Pembangun Aset"
    if (answers.income === "Rp 5 juta - Rp 20 juta") return "Tier 2: Penskala"
    return "Tier 1: Pekerja Keras"
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-body mb-2">
                <span>Langkah {currentStep + 1} dari {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Selesai</span>
              </div>
              <div className="glass-card w-full h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-moneyGreen transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <GlassCard className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-heading">
                {steps[currentStep].question}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="glass-card w-full text-left p-6 rounded-2xl hover:border-moneyGreen hover:bg-moneyGreen/5 transition-all text-lg font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <GlassCard className="space-y-6 py-12">
              <div className="w-20 h-20 bg-moneyGreen/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👑</span>
              </div>
              <h2 className="text-3xl font-bold text-heading">Jalur Anda Sudah Siap</h2>
              <p className="text-body">
                Berdasarkan profil Anda, Anda saat ini berada di:
              </p>
              <div className="text-4xl font-black text-money-green">
                {calculateTier()}
              </div>
              <p className="text-sm text-body max-w-sm mx-auto">
                Kami telah menyesuaikan dashboard Anda dengan hukum, alat, dan ahli yang Anda butuhkan untuk mencapai tingkat berikutnya.
              </p>
              <div className="pt-6">
                <GoldShineButton className="w-full max-w-sm">
                  Masuk ke Vault Pribadi Saya
                </GoldShineButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
