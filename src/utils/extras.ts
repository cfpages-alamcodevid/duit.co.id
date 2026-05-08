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

export async function getExtraByArticleSlug(articleSlug: string): Promise<ExtraContent | null> {
  const cached = extraCache.get(articleSlug)
  if (cached !== undefined) return cached

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
