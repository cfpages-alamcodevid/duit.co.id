import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const artikelDir = path.join(root, "artikel")
const jsonDir = path.join(root, "JSON")
const publicDir = path.join(root, "public")
const articleContentDir = path.join(publicDir, "article-content")
const searchIndexPath = path.join(publicDir, "search-index.json")
const articleDatesPath = path.join(jsonDir, "article-dates.json")
const articleSeoPath = path.join(jsonDir, "article-seo.json")
const articleTaxonomyPath = path.join(jsonDir, "article-taxonomy.json")
const articleTagsPath = path.join(jsonDir, "article-tags.json")
const articleAccessPath = path.join(jsonDir, "article-access.json")
const articleMediaPath = path.join(jsonDir, "article-media.json")

const VALID_TIERS = new Set([
  "tier-0-survival",
  "tier-1-hustler",
  "tier-2-scaler",
  "tier-3-asset-builder",
  "tier-4-legacy",
])
const VALID_GENDERS = new Set(["male", "female", "unisex", "other"])
const VALID_AGES = new Set(["muda", "produktif", "pensiun"])
const VALID_LOCATIONS = new Set(["desa", "kota", "global"])
const VALID_EDUCATIONS = new Set(["sma", "s1", "s2", "spesialis"])
const VALID_CATEGORIES = new Set(["karir", "bisnis", "legal", "investasi", "hukum", "keuangan"])
const VALID_ACCESS_LEVELS = new Set(["open", "share_gate", "youtube_gate", "register_gate", "paid"])
const VALID_YOUTUBE_POSITIONS = new Set(["top", "middle", "bottom", "inline"])
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function cleanJsonDir(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      cleanJsonDir(fullPath)
      continue
    }
    if (entry.isFile() && entry.name.endsWith(".json")) fs.unlinkSync(fullPath)
  }
}

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return []

  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkMarkdown(fullPath))
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(fullPath)
  }
  return files
}

function readJsonObject(filePath) {
  if (!fs.existsSync(filePath)) return {}
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"))
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function sortObject(value) {
  if (Array.isArray(value)) return value.map(sortObject)
  if (!value || typeof value !== "object") return value
  return Object.fromEntries(
    Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, sortObject(item)]),
  )
}

function generateExcerpt(markdown, maxLength = 250) {
  const paragraphs = markdown
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean)

  let excerpt = ""
  for (const paragraph of paragraphs) {
    if (/^(#{1,6}\s|[-*]\s|\d+\.\s|```|>)/.test(paragraph)) continue
    const clean = paragraph
      .replace(/\{youtube\}.*?\{\/youtube\}/g, "")
      .replace(/!\[[^\]]*]\([^)]*\)/g, "")
      .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
      .replace(/[#*_`~]/g, "")
      .replace(/\s+/g, " ")
      .trim()
    if (!clean) continue
    excerpt += `${clean} `
    if (excerpt.length >= maxLength) break
  }

  const trimmed = excerpt.trim()
  return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength - 3).trim()}...` : trimmed
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean)
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean)
  return []
}

function normalizeCategories(value) {
  return [...new Set(
    normalizeArray(value)
      .map((item) => item.toLowerCase())
      .map((item) => (item === "asuransi" ? "keuangan" : item))
      .filter((item) => VALID_CATEGORIES.has(item)),
  )]
}

function wordsFromTitle(title) {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 4)
}

function estimateReadTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min`
}

function todayWib() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date()).reduce((carry, part) => {
    carry[part.type] = part.value
    return carry
  }, {})

  return `${parts.year}-${parts.month}-${parts.day}`
}

function previousDate(dateString) {
  const date = new Date(`${dateString}T00:00:00.000Z`)
  date.setUTCDate(date.getUTCDate() - 1)
  return date.toISOString().slice(0, 10)
}

function resolveUniqueDate(rawDate, usedDates, fallbackSeed) {
  const currentDate = todayWib()
  let candidate = DATE_REGEX.test(String(rawDate || "")) ? String(rawDate) : fallbackSeed
  if (!DATE_REGEX.test(candidate) || candidate >= currentDate) candidate = previousDate(currentDate)

  while (usedDates.has(candidate)) candidate = previousDate(candidate)
  usedDates.add(candidate)
  return candidate
}

function firstValid(value, validSet, fallback) {
  const normalized = String(value || "").trim()
  return validSet.has(normalized) ? normalized : fallback
}

function fallbackDescription(title, excerpt) {
  const base = excerpt || `Panduan praktis Duit.co.id tentang ${title}.`
  return base.length > 160 ? `${base.slice(0, 157).trim()}...` : base
}

function isExternalAsset(value) {
  return /^(https?:)?\/\//.test(value) || value.startsWith("data:")
}

function publicAssetExists(value) {
  if (!value || isExternalAsset(value)) return true
  if (!value.startsWith("/")) return true
  return fs.existsSync(path.join(publicDir, value.slice(1)))
}

function resolveImage(value) {
  const image = String(value || "").trim()
  if (!image) return ""
  return publicAssetExists(image) ? image : ""
}

if (!fs.existsSync(artikelDir)) throw new Error(`Artikel directory not found: ${artikelDir}`)
if (!fs.existsSync(jsonDir)) throw new Error(`JSON metadata directory not found: ${jsonDir}`)

ensureDir(publicDir)
ensureDir(articleContentDir)

const dates = readJsonObject(articleDatesPath)
const seoBySlug = readJsonObject(articleSeoPath)
const taxonomyBySlug = readJsonObject(articleTaxonomyPath)
const tagsBySlug = readJsonObject(articleTagsPath)
const accessBySlug = readJsonObject(articleAccessPath)
const mediaBySlug = readJsonObject(articleMediaPath)

const index = []
const contentBySlug = new Map()
const slugToPath = new Map()
const usedDates = new Set()
const nextDates = {}
const warnings = []
let skipped = 0

for (const filePath of walkMarkdown(artikelDir)) {
  const relativePath = path.relative(artikelDir, filePath).replace(/\\/g, "/")
  const tierFolder = relativePath.split("/")[0]
  const slug = path.basename(filePath, ".md")

  if (!SLUG_REGEX.test(slug)) {
    warnings.push(`${relativePath}: skipped because filename slug "${slug}" is not route-safe.`)
    skipped += 1
    continue
  }

  const existingSlugPath = slugToPath.get(slug)
  if (existingSlugPath && existingSlugPath !== relativePath) {
    warnings.push(`${relativePath}: skipped duplicate slug "${slug}" already used by "${existingSlugPath}".`)
    skipped += 1
    continue
  }
  slugToPath.set(slug, relativePath)

  const content = fs.readFileSync(filePath, "utf8")
  const excerpt = generateExcerpt(content)
  const seo = seoBySlug[slug] || {}
  const taxonomy = taxonomyBySlug[slug] || {}
  const access = accessBySlug[slug] || {}
  const media = mediaBySlug[slug] || {}
  const title = String(seo.title || slug.replace(/-/g, " "))
  const category = normalizeCategories(taxonomy.category)
  const generatedTags = [...new Set([...(category.length ? category : ["keuangan"]), ...wordsFromTitle(title), ...slug.split("-")])].slice(0, 8)
  const tags = normalizeArray(tagsBySlug[slug]).length ? normalizeArray(tagsBySlug[slug]) : generatedTags
  const date = resolveUniqueDate(dates[slug], usedDates, "2025-01-01")
  nextDates[slug] = date

  if (!dates[slug]) warnings.push(`${relativePath}: added public date "${date}" to JSON/article-dates.json.`)
  if (!seoBySlug[slug]) warnings.push(`${relativePath}: missing JSON/article-seo.json metadata; generated fallback SEO metadata.`)
  if (!taxonomyBySlug[slug]) warnings.push(`${relativePath}: missing JSON/article-taxonomy.json metadata; generated fallback taxonomy metadata.`)

  const payload = {
    title,
    description: String(seo.description || fallbackDescription(title, excerpt)),
    slug,
    tier: firstValid(taxonomy.tier, VALID_TIERS, VALID_TIERS.has(tierFolder) ? tierFolder : "tier-0-survival"),
    gender: firstValid(taxonomy.gender, VALID_GENDERS, "unisex"),
    age: firstValid(taxonomy.age, VALID_AGES, "produktif"),
    location: firstValid(taxonomy.location, VALID_LOCATIONS, "kota"),
    education: firstValid(taxonomy.education, VALID_EDUCATIONS, "sma"),
    category: category.length ? category : ["keuangan"],
    tags,
    image: resolveImage(seo.image),
    read_time: estimateReadTime(content),
    date,
    author: String(seo.author || "Duit.co.id Team"),
    is_premium: access.is_premium === true,
    youtube_lock: access.youtube_lock === true,
    access_level: firstValid(access.access_level, VALID_ACCESS_LEVELS, "open"),
    youtube_url: String(media.youtube_url || ""),
    youtube_embed_position: firstValid(media.youtube_embed_position, VALID_YOUTUBE_POSITIONS, "top"),
    excerpt,
  }

  index.push(payload)
  contentBySlug.set(slug, { slug, content })
}

if (index.length === 0) throw new Error("[article-content] No valid article markdown files were found.")

index.sort((a, b) => {
  const dateCompare = b.date.localeCompare(a.date)
  return dateCompare !== 0 ? dateCompare : a.slug.localeCompare(b.slug)
})

cleanJsonDir(articleContentDir)
fs.writeFileSync(articleDatesPath, `${JSON.stringify(sortObject(nextDates), null, 2)}\n`, "utf8")
fs.writeFileSync(searchIndexPath, JSON.stringify(index, null, 2), "utf8")

for (const [slug, payload] of contentBySlug.entries()) {
  fs.writeFileSync(path.join(articleContentDir, `${slug}.json`), JSON.stringify(payload, null, 2), "utf8")
}

console.log(`Wrote ${index.length} article index row(s) to ${path.relative(root, searchIndexPath)}`)
console.log(`Wrote ${contentBySlug.size} article content file(s) to ${path.relative(root, articleContentDir)}`)
console.log(`Wrote ${Object.keys(nextDates).length} article date row(s) to ${path.relative(root, articleDatesPath)}`)
if (warnings.length > 0) {
  console.warn(`[article-content] Completed with ${warnings.length} warning(s); ${skipped} file(s) skipped.`)
  for (const warning of warnings.slice(0, 120)) console.warn(`- ${warning}`)
  if (warnings.length > 120) console.warn(`- ...and ${warnings.length - 120} more warning(s).`)
}
