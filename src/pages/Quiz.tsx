import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"
import { GreenButton } from "@/components/ui/GreenButton"
import { GoldShineButton } from "@/components/ui/GoldShineButton"

const steps = [
  {
    id: "basic-info",
    question: "What is your current age group?",
    options: ["Under 20", "20 - 35", "36 - 50", "Over 50"],
    key: "age",
  },
  {
    id: "gender",
    question: "Which perspective do you prefer for financial advice?",
    options: ["Masculine (Aggressive Growth)", "Feminine (Stability & Security)", "Neutral"],
    key: "gender",
  },
  {
    id: "income",
    question: "What is your monthly household income?",
    options: [
      "Less than Rp 5jt",
      "Rp 5jt - Rp 20jt",
      "Rp 20jt - Rp 100jt",
      "Over Rp 100jt",
    ],
    key: "income",
  },
  {
    id: "debt",
    question: "Do you have active high-interest debt (e.g. Pinjol)?",
    options: ["Yes, multiple", "Yes, one", "No, I am debt-free"],
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
    if (answers.debt && answers.debt.includes("Yes")) return "Tier 0: Survival"
    if (answers.income === "Over Rp 100jt") return "Tier 4: Legacy"
    if (answers.income === "Rp 20jt - Rp 100jt") return "Tier 3: Asset Builder"
    if (answers.income === "Rp 5jt - Rp 20jt") return "Tier 2: Scaler"
    return "Tier 1: Hustler"
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
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
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
              <h2 className="text-3xl font-bold text-heading">Your Path is Ready</h2>
              <p className="text-body">
                Based on your profile, you are currently in:
              </p>
              <div className="text-4xl font-black text-money-green">
                {calculateTier()}
              </div>
              <p className="text-sm text-body max-w-sm mx-auto">
                We've customized your dashboard with the laws, tools, and experts you need to reach the next tier.
              </p>
              <div className="pt-6">
                <GoldShineButton className="w-full max-w-sm">
                  Enter My Private Vault
                </GoldShineButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
