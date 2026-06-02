/**
 * Content utility functions for the Duit.co.id file-based CMS.
 * Loads and filters articles from the pre-generated search-index.json.
 *
 * Metadata lives entirely in JSON sidecars under /JSON — see:
 * - JSON/article-seo.json
 * - JSON/article-taxonomy.json
 * - JSON/article-tags.json
 * - JSON/article-dates.json
 * - JSON/article-access.json
 * - JSON/article-media.json
 *
 * Article bodies in /artikel/*.md are plain Markdown with NO frontmatter.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type TierType =
  | "tier-0-survival"
  | "tier-1-hustler"
  | "tier-2-scaler"
  | "tier-3-asset-builder"
  | "tier-4-legacy"

export type GenderType = "male" | "female" | "unisex" | "other"
export type AgeType = "muda" | "produktif" | "pensiun"
export type LocationType = "desa" | "kota" | "global"
export type EducationType = "sma" | "s1" | "s2" | "spesialis"
export type CategoryType = "karir" | "bisnis" | "legal" | "investasi" | "hukum" | "keuangan"
export type AccessLevelType =
  | "open"
  | "share_gate"
  | "youtube_gate"
  | "register_gate"
  | "paid"

export interface Article {
  title: string
  description: string
  slug: string
  tier: TierType
  gender: GenderType
  age: AgeType
  location: LocationType
  education: EducationType
  category: CategoryType[]
  tags: string[]
  image: string
  read_time: string
  date: string
  author: string
  is_premium: boolean
  youtube_lock: boolean
  access_level: AccessLevelType
  youtube_url: string
  youtube_embed_position: "top" | "middle" | "bottom" | "inline"
  excerpt: string
  content?: string
}

interface ArticleContentPayload {
  slug: string
  content: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const VALID_TIERS: TierType[] = [
  "tier-0-survival",
  "tier-1-hustler",
  "tier-2-scaler",
  "tier-3-asset-builder",
  "tier-4-legacy",
]

const VALID_GENDERS: GenderType[] = ["male", "female", "unisex", "other"]
const VALID_AGES: AgeType[] = ["muda", "produktif", "pensiun"]
const VALID_LOCATIONS: LocationType[] = ["desa", "kota", "global"]
const VALID_EDUCATIONS: EducationType[] = ["sma", "s1", "s2", "spesialis"]
const VALID_ACCESS_LEVELS: AccessLevelType[] = [
  "open",
  "share_gate",
  "youtube_gate",
  "register_gate",
  "paid",
]

// ─── Cached Articles ─────────────────────────────────────────────────────────

let cachedArticles: Article[] | null = null
const articleContentCache = new Map<string, string>()

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Loads all articles from the pre-generated search-index.json.
 * Results are cached after first load.
 */
export async function getAllArticles(): Promise<Article[]> {
  if (cachedArticles) return cachedArticles

  try {
    const response = await fetch("/search-index.json")
    if (!response.ok) {
      throw new Error(
        `Failed to load search-index.json: ${response.status} ${response.statusText}`
      )
    }
    const articles: Article[] = await response.json()
    cachedArticles = articles
    return articles
  } catch {
    // Return empty array if index doesn't exist yet
    console.warn(
      "[content] search-index.json not found. Run `npm run dev` or `npm run build` to generate it."
    )
    cachedArticles = []
    return []
  }
}

/**
 * Returns a single article by its slug.
 */
export async function getArticleBySlug(
  slug: string,
  options?: { includeContent?: boolean }
): Promise<Article | undefined> {
  const articles = await getAllArticles()
  const base = articles.find((a) => a.slug === slug)
  if (!base) return undefined

  if (!options?.includeContent) {
    return base
  }

  const content = await getArticleContentBySlug(slug)
  return {
    ...base,
    content: content ?? base.excerpt,
  }
}

export async function getArticleContentBySlug(
  slug: string
): Promise<string | undefined> {
  const cached = articleContentCache.get(slug)
  if (cached !== undefined) {
    return cached
  }

  try {
    const response = await fetch(`/article-content/${slug}.json`)
    if (!response.ok) {
      throw new Error(
        `Failed to load article content for ${slug}: ${response.status} ${response.statusText}`
      )
    }
    const payload: ArticleContentPayload = await response.json()
    articleContentCache.set(slug, payload.content)
    return payload.content
  } catch {
    console.warn(
      `[content] article-content/${slug}.json not found. Showing excerpt fallback.`
    )
    return undefined
  }
}

/**
 * Returns all articles for a specific tier.
 */
export async function getArticlesByTier(tier: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter((a) => a.tier === tier)
}

/**
 * Returns articles filtered by multiple criteria.
 */
export interface ArticleFilter {
  tier?: string
  gender?: GenderType
  age?: AgeType
  location?: LocationType
  education?: EducationType
  category?: CategoryType
  search?: string
}

export async function filterArticles(
  filters: ArticleFilter
): Promise<Article[]> {
  const articles = await getAllArticles()

  return articles.filter((article) => {
    if (filters.tier && article.tier !== filters.tier) return false
    if (filters.gender) {
      const allowed =
        filters.gender === "other"
          ? ["unisex"]
          : [filters.gender, "unisex"]
      if (!allowed.includes(article.gender)) return false
    }
    if (filters.age && article.age !== filters.age) return false
    if (filters.location && article.location !== filters.location) return false
    if (filters.education && article.education !== filters.education)
      return false
    if (filters.category && !article.category.includes(filters.category))
      return false
    if (filters.search) {
      const query = filters.search.toLowerCase()
      const searchable = `${article.title} ${article.description} ${article.tags.join(" ")} ${article.excerpt}`.toLowerCase()
      if (!searchable.includes(query)) return false
    }
    return true
  })
}

/**
 * Estimates reading time from content string.
 * Assumes ~200 words per minute.
 */
export function estimateReadTime(content: string): string {
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min`
}

/**
 * Gets the tier label in Indonesian.
 */
export function getTierLabel(tier: TierType): string {
  const labels: Record<TierType, string> = {
    "tier-0-survival": "Survival (Bertahan)",
    "tier-1-hustler": "Hustler (Pekerja Keras)",
    "tier-2-scaler": "Scaler (Penskala)",
    "tier-3-asset-builder": "Asset Builder (Pembangun Aset)",
    "tier-4-legacy": "Legacy Maker (Pewaris)",
  }
  return labels[tier] || tier
}

/**
 * Gets the tier order number for comparison.
 */
export function getTierOrder(tier: TierType): number {
  const order: Record<TierType, number> = {
    "tier-0-survival": 0,
    "tier-1-hustler": 1,
    "tier-2-scaler": 2,
    "tier-3-asset-builder": 3,
    "tier-4-legacy": 4,
  }
  return order[tier] ?? -1
}

/**
 * Gets articles visible to a user based on their tier.
 * Users can see their tier and all lower tiers.
 */
export async function getVisibleArticlesForTier(
  userTier: TierType
): Promise<Article[]> {
  const articles = await getAllArticles()
  const userOrder = getTierOrder(userTier)

  return articles.filter((a) => getTierOrder(a.tier) <= userOrder)
}
