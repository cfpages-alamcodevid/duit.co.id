import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const root = process.cwd()
const artikelDir = path.join(root, "artikel")
const publicDir = path.join(root, "public")
const articleContentDir = path.join(publicDir, "article-content")
const searchIndexPath = path.join(publicDir, "search-index.json")

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
const VALID_ACCESS_LEVELS = new Set(["open", "share_gate", "youtube_gate", "register_gate", "paid"])
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
]
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function cleanJsonDir(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      cleanJsonDir(fullPath)
      continue
    }
    if (entry.isFile() && entry.name.endsWith(".json")) {
      fs.unlinkSync(fullPath)
    }
  }
}

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return []

  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(fullPath))
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath)
    }
  }
  return files
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
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean)
  }
  return []
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
  if (!DATE_REGEX.test(candidate) || candidate >= currentDate) {
    candidate = previousDate(currentDate)
  }

  while (usedDates.has(candidate)) {
    candidate = previousDate(candidate)
  }

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

if (!fs.existsSync(artikelDir)) {
  throw new Error(`Artikel directory not found: ${artikelDir}`)
}

ensureDir(publicDir)
ensureDir(articleContentDir)

const index = []
const contentBySlug = new Map()
const dateToSlug = new Map()
const slugToPath = new Map()
const usedDates = new Set()
const warnings = []
let skipped = 0

for (const filePath of walkMarkdown(artikelDir)) {
  const relativePath = path.relative(artikelDir, filePath).replace(/\\/g, "/")
  const tierFolder = relativePath.split("/")[0]
  const filenameSlug = path.basename(filePath, ".md")
  const raw = fs.readFileSync(filePath, "utf8")
  let parsed
  try {
    parsed = matter(raw)
  } catch (error) {
    warnings.push(`${relativePath}: skipped because YAML frontmatter is invalid: ${error.message}`)
    skipped += 1
    continue
  }
  const data = parsed.data || {}

  const frontmatterSlug = String(data.slug || "").trim()
  const slug = SLUG_REGEX.test(frontmatterSlug) && frontmatterSlug === filenameSlug ? frontmatterSlug : filenameSlug
  if (!SLUG_REGEX.test(slug)) {
    warnings.push(`${relativePath}: skipped because slug "${slug}" is not route-safe.`)
    skipped += 1
    continue
  }

  if (frontmatterSlug && frontmatterSlug !== slug) {
    warnings.push(`${relativePath}: generated slug "${slug}" from filename because frontmatter slug was "${frontmatterSlug}".`)
  }

  const existingSlugPath = slugToPath.get(slug)
  if (existingSlugPath && existingSlugPath !== relativePath) {
    warnings.push(`${relativePath}: skipped duplicate slug "${slug}" already used by "${existingSlugPath}".`)
    skipped += 1
    continue
  }
  slugToPath.set(slug, relativePath)

  const excerpt = generateExcerpt(parsed.content)
  const date = resolveUniqueDate(data.date, usedDates, "2025-01-01")
  if (data.date && String(data.date) !== date) {
    warnings.push(`${relativePath}: generated unique public date "${date}" from frontmatter date "${data.date}".`)
  }
  dateToSlug.set(date, slug)

  const tier = firstValid(data.tier, VALID_TIERS, VALID_TIERS.has(tierFolder) ? tierFolder : "tier-0-survival")
  if (data.tier && data.tier !== tier) {
    warnings.push(`${relativePath}: generated tier "${tier}" from folder/default because frontmatter tier was "${data.tier}".`)
  }

  const category = normalizeArray(data.category)
  const tags = normalizeArray(data.tags)
  const rawImage = String(data.image || `/images/artikel/${slug}.jpg`)
  const image = publicAssetExists(rawImage) ? rawImage : ""
  if (rawImage && !image) {
    warnings.push(`${relativePath}: omitted image "${rawImage}" because the file does not exist in public/.`)
  }

  const payload = {
    title: String(data.title || slug.replace(/-/g, " ")),
    description: String(data.description || fallbackDescription(data.title || slug, excerpt)),
    slug,
    tier,
    gender: firstValid(data.gender, VALID_GENDERS, "unisex"),
    age: firstValid(data.age, VALID_AGES, "produktif"),
    location: firstValid(data.location, VALID_LOCATIONS, "kota"),
    education: firstValid(data.education, VALID_EDUCATIONS, "sma"),
    category: category.length > 0 ? category : ["keuangan"],
    tags: tags.length > 0 ? tags : slug.split("-").slice(0, 5),
    image,
    read_time: String(data.read_time || estimateReadTime(parsed.content)),
    date,
    author: String(data.author || "Duit.co.id Team"),
    is_premium: data.is_premium === true,
    youtube_lock: data.youtube_lock === true,
    access_level: firstValid(data.access_level, VALID_ACCESS_LEVELS, "open"),
    youtube_url: String(data.youtube_url || ""),
    youtube_embed_position: String(data.youtube_embed_position || "top"),
    excerpt,
  }

  index.push(payload)
  contentBySlug.set(slug, {
    slug,
    content: parsed.content,
  })
}

if (index.length === 0) {
  throw new Error("[article-content] No valid article markdown files were found.")
}

index.sort((a, b) => {
  const dateCompare = b.date.localeCompare(a.date)
  return dateCompare !== 0 ? dateCompare : a.slug.localeCompare(b.slug)
})

cleanJsonDir(articleContentDir)
fs.writeFileSync(searchIndexPath, JSON.stringify(index, null, 2), "utf8")

for (const [slug, payload] of contentBySlug.entries()) {
  fs.writeFileSync(path.join(articleContentDir, `${slug}.json`), JSON.stringify(payload, null, 2), "utf8")
}

console.log(`Wrote ${index.length} article index row(s) to ${path.relative(root, searchIndexPath)}`)
console.log(`Wrote ${contentBySlug.size} article content file(s) to ${path.relative(root, articleContentDir)}`)
if (warnings.length > 0) {
  console.warn(`[article-content] Completed with ${warnings.length} warning(s); ${skipped} file(s) skipped.`)
  for (const warning of warnings.slice(0, 80)) {
    console.warn(`- ${warning}`)
  }
  if (warnings.length > 80) {
    console.warn(`- ...and ${warnings.length - 80} more warning(s).`)
  }
}
