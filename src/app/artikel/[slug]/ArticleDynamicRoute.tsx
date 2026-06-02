"use client"

import { ArticlePage } from "@/components/article/ArticlePage"
import { KnowledgeHub } from "@/components/article/KnowledgeHub"

const VALID_TIERS = new Set([
  "tier-0-survival",
  "tier-1-hustler",
  "tier-2-scaler",
  "tier-3-asset-builder",
  "tier-4-legacy",
])

interface ArticleDynamicRouteProps {
  slug: string
}

export function ArticleDynamicRoute({ slug }: ArticleDynamicRouteProps) {
  if (VALID_TIERS.has(slug)) {
    return <KnowledgeHub initialTier={slug} />
  }

  return <ArticlePage />
}
