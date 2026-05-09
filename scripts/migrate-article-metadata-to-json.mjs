import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const root = process.cwd()
const artikelDir = path.join(root, "artikel")
const docsDir = path.join(root, "docs")
const jsonDir = path.join(root, "JSON")
const catalogPath = path.join(docsDir, "ARTICLE_CATALOG.md")
const articleDatesPath = path.join(jsonDir, "article-dates.json")
const legacyDatePath = path.join(docsDir, "ARTICLE_DATE_REGISTRY.json")
const legacyOverridesPath = path.join(docsDir, "ARTICLE_METADATA_OVERRIDES.json")

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const VALID_CATEGORIES = new Set(["karir", "bisnis", "legal", "investasi", "hukum", "keuangan"])
const TIER_HEADING_MAP = [
  [/^## Tier 0:/, "tier-0-survival"],
  [/^## Tier 1:/, "tier-1-hustler"],
  [/^## Tier 2:/, "tier-2-scaler"],
  [/^## Tier 3:/, "tier-3-asset-builder"],
  [/^## Tier 4:/, "tier-4-legacy"],
]

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return {}
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"))
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function writeJson(filename, value) {
  fs.writeFileSync(path.join(jsonDir, filename), `${JSON.stringify(sortObject(value), null, 2)}\n`, "utf8")
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

function parseInlineValue(raw) {
  const value = raw.trim()
  if (!value) return ""
  if (value === "true") return true
  if (value === "false") return false
  if (value === "null") return null
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }
  if (value.startsWith("[") && value.endsWith("]")) {
    return value.slice(1, -1)
      .split(",")
      .map((item) => parseInlineValue(item))
      .filter((item) => item !== "")
  }
  return value
}

function parseSimpleYaml(frontmatter) {
  const data = {}
  for (const line of frontmatter.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!match) continue
    data[match[1]] = parseInlineValue(match[2])
  }
  return data
}

function extractFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) {
    return { rawFrontmatter: "", data: {}, body: raw, parseError: "" }
  }

  const rawFrontmatter = match[1]
  try {
    const parsed = matter(raw)
    return {
      rawFrontmatter,
      data: parsed.data || {},
      body: raw.slice(match[0].length),
      parseError: "",
    }
  } catch (error) {
    return {
      rawFrontmatter,
      data: parseSimpleYaml(rawFrontmatter),
      body: raw.slice(match[0].length),
      parseError: error.message,
    }
  }
}

function parseCatalog(filePath) {
  const catalog = {}
  if (!fs.existsSync(filePath)) return catalog

  let currentTier = ""
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/)
  for (const line of lines) {
    for (const [regex, tier] of TIER_HEADING_MAP) {
      if (regex.test(line)) currentTier = tier
    }

    if (!/^\| [0-9]/.test(line)) continue
    const columns = line.split("|").map((item) => item.trim())
    const slug = columns[4]
    if (!SLUG_REGEX.test(slug) || catalog[slug]) continue
    catalog[slug] = {
      row: columns[1],
      cluster: columns[2],
      title: columns[3],
      tier: currentTier,
      category: normalizeCategories(columns[5]),
      gender: columns[6],
      age: columns[7],
      status: columns[8],
      notes: columns[9],
    }
  }
  return catalog
}

function clean(value) {
  if (value === undefined || value === null) return undefined
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed === "" ? undefined : trimmed
  }
  return value
}

function compact(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined))
}

function wordsFromTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 4)
}

ensureDir(jsonDir)

const catalog = parseCatalog(catalogPath)
const legacyDates = { ...readJson(legacyDatePath), ...readJson(articleDatesPath) }
const legacyOverrides = readJson(legacyOverridesPath)

const dates = {}
const seo = {}
const taxonomy = {}
const tags = {}
const access = {}
const media = {}
const audit = {}
const archive = {}

let stripped = 0
let withFrontmatter = 0
let withoutFrontmatter = 0

for (const filePath of walkMarkdown(artikelDir)) {
  const relativePath = path.relative(root, filePath).replace(/\\/g, "/")
  const tierFolder = path.relative(artikelDir, filePath).split(path.sep)[0]
  const slug = path.basename(filePath, ".md")
  if (!SLUG_REGEX.test(slug)) continue

  const raw = fs.readFileSync(filePath, "utf8")
  const extracted = extractFrontmatter(raw)
  const data = extracted.data || {}
  const catalogEntry = catalog[slug] || {}
  const override = legacyOverrides[slug] || {}

  if (extracted.rawFrontmatter) {
    withFrontmatter += 1
    const archiveKey = archive[slug]
      ? `${slug}__${relativePath.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}`
      : slug
    archive[archiveKey] = compact({
      path: relativePath,
      raw: extracted.rawFrontmatter,
      parsed: data,
      parse_error: clean(extracted.parseError),
    })
    if (extracted.body !== raw) {
      fs.writeFileSync(filePath, extracted.body, "utf8")
      stripped += 1
    }
  } else {
    withoutFrontmatter += 1
  }

  const title = clean(override.title) || clean(data.title) || clean(catalogEntry.title) || slug.replace(/-/g, " ")
  const category = catalogEntry.category?.length ? catalogEntry.category : normalizeCategories(data.category)
  const tagList = normalizeArray(override.tags).length
    ? normalizeArray(override.tags)
    : normalizeArray(data.tags).length
      ? normalizeArray(data.tags)
      : [...new Set([...(category || []), ...wordsFromTitle(title), ...slug.split("-")])].slice(0, 8)

  const date = clean(legacyDates[slug]) || clean(data.date)
  if (DATE_REGEX.test(String(date || ""))) dates[slug] = String(date)

  seo[slug] = compact({
    title,
    description: clean(override.description) || clean(data.description),
    image: clean(override.image) || clean(data.image),
    author: clean(override.author) || clean(data.author) || "Duit.co.id Team",
  })

  taxonomy[slug] = compact({
    tier: clean(catalogEntry.tier) || clean(data.tier) || tierFolder,
    category: category?.length ? category : undefined,
    gender: clean(catalogEntry.gender) || clean(data.gender),
    age: clean(catalogEntry.age) || clean(data.age),
    location: clean(override.location) || clean(data.location),
    education: clean(override.education) || clean(data.education),
    cluster: clean(catalogEntry.cluster) || clean(data.cluster),
  })

  tags[slug] = tagList

  access[slug] = compact({
    access_level: clean(override.access_level) || clean(data.access_level) || clean(data.access) || "open",
    is_premium: override.is_premium === true || data.is_premium === true,
    youtube_lock: override.youtube_lock === true || data.youtube_lock === true || data.youtube_gate === true,
  })

  media[slug] = compact({
    youtube_url: clean(override.youtube_url) || clean(data.youtube_url),
    youtube_embed_position: clean(override.youtube_embed_position) || clean(data.youtube_embed_position) || "top",
  })

  audit[slug] = compact({
    path: relativePath,
    catalog_row: clean(catalogEntry.row),
    catalog_status: clean(catalogEntry.status),
    catalog_notes: clean(catalogEntry.notes),
    published_at_wib: clean(data.published_at_wib),
    legacy_read_time: clean(data.read_time),
    legacy_status: clean(data.status),
    legacy_access: clean(data.access),
    legacy_youtube_gate: data.youtube_gate === undefined ? undefined : data.youtube_gate,
  })
}

writeJson("article-dates.json", dates)
writeJson("article-seo.json", seo)
writeJson("article-taxonomy.json", taxonomy)
writeJson("article-tags.json", tags)
writeJson("article-access.json", access)
writeJson("article-media.json", media)
writeJson("article-audit.json", audit)
writeJson("article-frontmatter-archive.json", archive)

console.log(`Wrote article metadata JSON to ${path.relative(root, jsonDir)}`)
console.log(`Frontmatter blocks found: ${withFrontmatter}`)
console.log(`Markdown files without frontmatter: ${withoutFrontmatter}`)
console.log(`Markdown files stripped: ${stripped}`)
