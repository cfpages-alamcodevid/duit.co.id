import type { TierType } from "@/utils/content"

export interface ExtraContent {
  title: string
  description: string
  slug: string
  article_slug: string
  tier: TierType
  extra_type: string
  download_label: string
  version: string
  updated_at: string
  requires_login: boolean
  pdf_enabled: boolean
  content: string
}

const extraCache = new Map<string, ExtraContent | null>()
let extraIndexCache: Set<string> | null = null

interface ExtraIndexItem {
  article_slug: string
}

async function hasExtraForArticle(articleSlug: string): Promise<boolean> {
  if (!extraIndexCache) {
    try {
      const response = await fetch("/extra-index.json")
      if (!response.ok) {
        extraIndexCache = new Set()
      } else {
        const index = (await response.json()) as ExtraIndexItem[]
        extraIndexCache = new Set(index.map((item) => item.article_slug).filter(Boolean))
      }
    } catch {
      extraIndexCache = new Set()
    }
  }

  return extraIndexCache.has(articleSlug)
}

export async function getExtraByArticleSlug(articleSlug: string): Promise<ExtraContent | null> {
  const cached = extraCache.get(articleSlug)
  if (cached !== undefined) return cached

  if (!(await hasExtraForArticle(articleSlug))) {
    extraCache.set(articleSlug, null)
    return null
  }

  try {
    const response = await fetch(`/extra-content/${articleSlug}.json`)
    if (!response.ok) {
      extraCache.set(articleSlug, null)
      return null
    }

    const payload = (await response.json()) as ExtraContent
    extraCache.set(articleSlug, payload)
    return payload
  } catch {
    extraCache.set(articleSlug, null)
    return null
  }
}
