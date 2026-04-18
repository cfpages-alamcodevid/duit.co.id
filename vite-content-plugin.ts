import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Plugin } from "vite"

interface ArticleIndexEntry {
  title: string
  description: string
  slug: string
  tier: string
  gender: string
  age: string
  location: string
  education: string
  category: string[]
  tags: string[]
  image: string
  read_time: string
  date: string
  author: string
  is_premium: boolean
  youtube_lock: boolean
  access_level: string
  youtube_url: string
  youtube_embed_position: string
  excerpt: string
}

interface ArticleContentEntry {
  slug: string
  content: string
}

interface ScanResult {
  index: ArticleIndexEntry[]
  contentBySlug: Record<string, ArticleContentEntry>
}

const REQUIRED_FIELDS = [
  "title",
  "description",
  "date",
  "author",
  "slug",
  "image",
  "read_time",
  "tier",
  "gender",
  "age",
  "location",
  "education",
  "category",
  "tags",
  "is_premium",
  "youtube_lock",
  "access_level",
] as const

const VALID_TIERS = [
  "tier-0-survival",
  "tier-1-hustler",
  "tier-2-scaler",
  "tier-3-asset-builder",
  "tier-4-legacy",
] as const

const VALID_GENDERS = ["male", "female", "unisex"] as const
const VALID_AGES = ["muda", "produktif", "pensiun"] as const
const VALID_LOCATIONS = ["desa", "kota", "global"] as const
const VALID_EDUCATIONS = ["sma", "s1", "s2", "spesialis"] as const
const VALID_ACCESS_LEVELS = [
  "open",
  "share_gate",
  "youtube_gate",
  "register_gate",
  "paid",
] as const
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const WIB_DATETIME_REGEX =
  /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}\sWIB$/

// ─── Excerpt Generation ──────────────────────────────────────────────────────

function generateExcerpt(markdown: string, maxLength: number = 250): string {
  // Remove frontmatter first
  const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]*?---\s*/, '')

  // Get first 2-3 paragraphs
  const paragraphs = contentWithoutFrontmatter.split('\n\n').filter((p) => p.trim())
  let excerpt = ''

  for (const para of paragraphs) {
    // Skip headings, lists, code blocks - only use plain text paragraphs
    if (para.startsWith('#') || para.startsWith('-') || para.startsWith('```')) continue

    const cleanPara = para.replace(/[#*`_\[\]!()]/g, '').trim()
    excerpt += cleanPara + ' '

    if (excerpt.length >= maxLength) break
  }

  // Truncate to max length
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength - 3) + '...'
  }

  return excerpt.trim()
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validateArticle(
  data: Record<string, unknown>,
  filePath: string
): string[] {
  const errors: string[] = []

  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || data[field] === undefined || data[field] === null) {
      errors.push(`Missing required field "${field}" in ${filePath}`)
    }
  }

  if ("tier" in data && !VALID_TIERS.includes(data.tier as string)) {
    errors.push(
      `Invalid tier "${data.tier}" in ${filePath}. Must be one of: ${VALID_TIERS.join(", ")}`
    )
  }

  if ("gender" in data && !VALID_GENDERS.includes(data.gender as string)) {
    errors.push(
      `Invalid gender "${data.gender}" in ${filePath}. Must be one of: ${VALID_GENDERS.join(", ")}`
    )
  }

  if ("age" in data && !VALID_AGES.includes(data.age as string)) {
    errors.push(
      `Invalid age "${data.age}" in ${filePath}. Must be one of: ${VALID_AGES.join(", ")}`
    )
  }

  if ("location" in data && !VALID_LOCATIONS.includes(data.location as string)) {
    errors.push(
      `Invalid location "${data.location}" in ${filePath}. Must be one of: ${VALID_LOCATIONS.join(", ")}`
    )
  }

  if (
    "education" in data &&
    !VALID_EDUCATIONS.includes(data.education as string)
  ) {
    errors.push(
      `Invalid education "${data.education}" in ${filePath}. Must be one of: ${VALID_EDUCATIONS.join(", ")}`
    )
  }

  if (
    "access_level" in data &&
    !VALID_ACCESS_LEVELS.includes(data.access_level as string)
  ) {
    errors.push(
      `Invalid access_level "${data.access_level}" in ${filePath}. Must be one of: ${VALID_ACCESS_LEVELS.join(", ")}`
    )
  }

  if ("slug" in data) {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(data.slug as string)) {
      errors.push(
        `Invalid slug "${data.slug}" in ${filePath}. Must be lowercase with hyphens only.`
      )
    }
  }

  if ("date" in data && !DATE_REGEX.test(data.date as string)) {
    errors.push(
      `Invalid date "${data.date}" in ${filePath}. Must use YYYY-MM-DD format.`
    )
  }

  if (
    "published_at_wib" in data &&
    data.published_at_wib &&
    !WIB_DATETIME_REGEX.test(data.published_at_wib as string)
  ) {
    errors.push(
      `Invalid published_at_wib "${data.published_at_wib}" in ${filePath}. Must use YYYY-MM-DD HH:mm WIB format.`
    )
  }

  if ("category" in data && !Array.isArray(data.category)) {
    errors.push(`Category must be an array in ${filePath}`)
  }

  if ("tags" in data && !Array.isArray(data.tags)) {
    errors.push(`Tags must be an array in ${filePath}`)
  }

  return errors
}

function scanArticles(artikelDir: string): ScanResult {
  const index: ArticleIndexEntry[] = []
  const contentBySlug: Record<string, ArticleContentEntry> = {}
  const allErrors: string[] = []
  const hardErrors: string[] = []
  const publishDateToSlug = new Map<string, string>()

  if (!fs.existsSync(artikelDir)) {
    console.warn(`[vite-content-plugin] Artikel directory not found: ${artikelDir}`)
    return { index, contentBySlug }
  }

  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        walkDir(fullPath)
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const fileContent = fs.readFileSync(fullPath, "utf-8")
        const parsed = matter(fileContent)
        const data = parsed.data as Record<string, unknown>
        const relativePath = path.relative(artikelDir, fullPath)

        const errors = validateArticle(data, relativePath)
        if (errors.length > 0) {
          allErrors.push(...errors)
          console.warn(`[vite-content-plugin] Validation errors in ${relativePath}:`)
          errors.forEach((e) => console.warn(`  - ${e}`))
          continue
        }

        const slug = (data.slug as string) || ""
        const publishDate = (data.date as string) || ""

        const existingSlug = publishDateToSlug.get(publishDate)
        if (existingSlug && existingSlug !== slug) {
          hardErrors.push(
            `Duplicate publish date "${publishDate}" detected for slugs "${existingSlug}" and "${slug}". Each article must use a unique date.`
          )
          continue
        }
        publishDateToSlug.set(publishDate, slug)

        index.push({
          title: (data.title as string) || "",
          description: (data.description as string) || "",
          slug,
          tier: (data.tier as string) || "",
          gender: (data.gender as string) || "unisex",
          age: (data.age as string) || "produktif",
          location: (data.location as string) || "kota",
          education: (data.education as string) || "sma",
          category: (data.category as string[]) || [],
          tags: (data.tags as string[]) || [],
          image: (data.image as string) || "",
          read_time: (data.read_time as string) || "5 min",
          date: (data.date as string) || "",
          author: (data.author as string) || "Duit.co.id Team",
          is_premium: (data.is_premium as boolean) || false,
          youtube_lock: (data.youtube_lock as boolean) || false,
          access_level: (data.access_level as string) || "open",
          youtube_url: (data.youtube_url as string) || "",
          youtube_embed_position:
            (data.youtube_embed_position as string) || "top",
          excerpt: generateExcerpt(parsed.content),
        })

        contentBySlug[slug] = {
          slug,
          content: parsed.content,
        }
      }
    }
  }

  walkDir(artikelDir)

  if (allErrors.length > 0) {
    console.warn(
      `[vite-content-plugin] Found ${allErrors.length} validation error(s). Build will continue but some articles were skipped.`
    )
  }

  if (hardErrors.length > 0) {
    const messageLines = [
      "[vite-content-plugin] Blocking publish-date conflict(s):",
      ...hardErrors.map((e) => `  - ${e}`),
      "Resolve date conflicts in frontmatter and docs/PUBLICATION_SCHEDULE.json, then rerun build.",
    ]
    throw new Error(messageLines.join("\n"))
  }

  console.log(
    `[vite-content-plugin] Indexed ${index.length} article(s) from ${artikelDir}`
  )

  return { index, contentBySlug }
}

export function viteContentPlugin(): Plugin {
  const artikelDir = path.resolve(__dirname, "artikel")
  const outputDir = path.resolve(__dirname, "public")
  const searchIndexPath = path.join(outputDir, "search-index.json")
  const articleContentDir = path.join(outputDir, "article-content")

  function writeGeneratedContent(
    index: ArticleIndexEntry[],
    contentBySlug: Record<string, ArticleContentEntry>
  ) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(searchIndexPath, JSON.stringify(index, null, 2), "utf-8")

    if (!fs.existsSync(articleContentDir)) {
      fs.mkdirSync(articleContentDir, { recursive: true })
    }

    // Clean stale generated content files before rewriting.
    const existingFiles = fs.readdirSync(articleContentDir, {
      withFileTypes: true,
    })
    for (const entry of existingFiles) {
      if (entry.isFile() && entry.name.endsWith(".json")) {
        fs.unlinkSync(path.join(articleContentDir, entry.name))
      }
    }

    for (const [slug, payload] of Object.entries(contentBySlug)) {
      const contentPath = path.join(articleContentDir, `${slug}.json`)
      fs.writeFileSync(contentPath, JSON.stringify(payload, null, 2), "utf-8")
    }
  }

  return {
    name: "vite-content-plugin",

    buildStart() {
      const { index, contentBySlug } = scanArticles(artikelDir)
      writeGeneratedContent(index, contentBySlug)
      this.addWatchFile(artikelDir)

      // Watch all markdown files for changes
      function watchDir(dir: string) {
        if (!fs.existsSync(dir)) return
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          this.addWatchFile(fullPath)
          if (entry.isDirectory()) {
            watchDir.call(this, fullPath)
          }
        }
      }
      watchDir.call(this, artikelDir)
    },

    handleHotUpdate({ file, server }) {
      if (file.endsWith(".md") && file.includes(path.normalize("artikel"))) {
        console.log("[vite-content-plugin] Article changed, rebuilding index...")
        const { index, contentBySlug } = scanArticles(artikelDir)
        writeGeneratedContent(index, contentBySlug)
        server.ws.send({
          type: "custom",
          event: "content-update",
          data: { articles: index },
        })
      }
    },
  }
}

export default viteContentPlugin
