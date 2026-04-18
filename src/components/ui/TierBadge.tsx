import React from "react"
import { cn } from "@/lib/utils"
import type { TierType } from "@/utils/content"

// ─── Types ───────────────────────────────────────────────────────────────────

interface TierBadgeProps {
  tier: TierType
  size?: "sm" | "md" | "lg"
  className?: string
}

// ─── Config ──────────────────────────────────────────────────────────────────

const TIER_CONFIG: Record<
  TierType,
  { label: string; bgColor: string; textColor: string; borderColor: string }
> = {
  "tier-0-survival": {
    label: "Survival",
    bgColor: "bg-red-500/10",
    textColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-500/20",
  },
  "tier-1-hustler": {
    label: "Hustler",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-500/20",
  },
  "tier-2-scaler": {
    label: "Scaler",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20",
  },
  "tier-3-asset-builder": {
    label: "Asset Builder",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  "tier-4-legacy": {
    label: "Legacy",
    bgColor: "bg-aureum-gold/10",
    textColor: "text-aureum-gold",
    borderColor: "border-aureum-gold/20",
  },
}

const SIZE_CLASSES: Record<string, string> = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
  lg: "text-sm px-3 py-1.5",
}

// ─── Component ───────────────────────────────────────────────────────────────

export const TierBadge: React.FC<TierBadgeProps> = ({
  tier,
  size = "sm",
  className,
}) => {
  const config = TIER_CONFIG[tier]

  if (!config) {
    return null
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-bold uppercase tracking-wider transition-colors",
        SIZE_CLASSES[size],
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
      aria-label={`Tier: ${config.label}`}
    >
      {config.label}
    </span>
  )
}
