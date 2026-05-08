import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const root = process.cwd()
const extraDir = path.join(root, "extra")
const publicDir = path.join(root, "public")
const outputDir = path.join(publicDir, "extra-content")
const indexPath = path.join(publicDir, "extra-index.json")

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function removeJsonFiles(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      removeJsonFiles(fullPath)
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
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(fullPath))
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath)
    }
  }
  return files
}

ensureDir(publicDir)
ensureDir(outputDir)
removeJsonFiles(outputDir)

const entries = []

for (const filePath of walkMarkdown(extraDir)) {
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  const data = parsed.data || {}
  const articleSlug = String(data.article_slug || "").trim()
  const tier = String(data.tier || path.basename(path.dirname(filePath))).trim()
  const slug = String(data.slug || path.basename(filePath, ".md")).trim()

  if (!articleSlug || !tier || !slug) {
    console.warn(`[extra-content] Skipping ${path.relative(root, filePath)} because frontmatter is incomplete.`)
    continue
  }

  const payload = {
    title: String(data.title || ""),
    description: String(data.description || ""),
    slug,
    article_slug: articleSlug,
    tier,
    extra_type: String(data.extra_type || "checklist"),
    download_label: String(data.download_label || "Download bonus PDF"),
    version: String(data.version || "1.0"),
    updated_at: String(data.updated_at || ""),
    requires_login: data.requires_login !== false,
    pdf_enabled: data.pdf_enabled !== false,
    content: parsed.content,
  }

  fs.writeFileSync(
    path.join(outputDir, `${articleSlug}.json`),
    JSON.stringify(payload, null, 2),
    "utf8",
  )

  entries.push({
    title: payload.title,
    slug: payload.slug,
    article_slug: articleSlug,
    tier,
    extra_type: payload.extra_type,
    download_label: payload.download_label,
    updated_at: payload.updated_at,
  })
}

fs.writeFileSync(indexPath, JSON.stringify(entries, null, 2), "utf8")
console.log(`Wrote ${entries.length} extra content file(s) to ${path.relative(root, outputDir)}`)
