import fs from "fs"
import path from "path"
import matter from "gray-matter"

const ROOT = process.cwd()
const ARTIKEL_DIR = path.join(ROOT, "artikel")
const SCHEDULE_PATH = path.join(ROOT, "docs", "PUBLICATION_SCHEDULE.json")

function parseArgs(argv) {
  const args = {
    slugs: [],
    slugsFile: "",
    allUnscheduled: false,
    startDate: "",
    direction: "backward",
    time: "09:00",
    status: "planned",
    apply: false,
    help: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    const next = argv[i + 1]

    if (token === "--help" || token === "-h") args.help = true
    else if (token === "--apply") args.apply = true
    else if (token === "--all-unscheduled") args.allUnscheduled = true
    else if (token === "--slugs") {
      if (!next) throw new Error("Missing value for --slugs")
      args.slugs = next
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      i += 1
    } else if (token === "--slugs-file") {
      if (!next) throw new Error("Missing value for --slugs-file")
      args.slugsFile = next
      i += 1
    } else if (token === "--start-date") {
      if (!next) throw new Error("Missing value for --start-date")
      args.startDate = next
      i += 1
    } else if (token === "--direction") {
      if (!next) throw new Error("Missing value for --direction")
      args.direction = next
      i += 1
    } else if (token === "--time") {
      if (!next) throw new Error("Missing value for --time")
      args.time = next
      i += 1
    } else if (token === "--status") {
      if (!next) throw new Error("Missing value for --status")
      args.status = next
      i += 1
    } else {
      throw new Error(`Unknown argument: ${token}`)
    }
  }

  return args
}

function usage() {
  return `
Publication scheduler for Duit.co.id articles.

Examples:
  npm run schedule:publish -- --slugs hadapi-debt-collector,budgeting-darurat-umr --start-date 2026-04-17 --direction backward
  npm run schedule:publish -- --all-unscheduled --start-date 2026-04-17 --direction backward --apply

Options:
  --slugs <a,b,c>         Comma-separated slug list to schedule.
  --slugs-file <path>     Text file with one slug per line.
  --all-unscheduled       Schedule all article slugs not yet in docs/PUBLICATION_SCHEDULE.json.
  --start-date <YYYY-MM-DD>  Starting date for assignment (required).
  --direction <backward|forward>  Date progression direction. Default: backward.
  --time <HH:mm>          WIB time for published_at_wib. Default: 09:00.
  --status <planned|published|review>  Entry status in schedule JSON. Default: planned.
  --apply                 Persist changes. Without this flag, runs in dry-run mode.
  --help                  Show this help.
`.trim()
}

function assertDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid --start-date "${value}". Use YYYY-MM-DD.`)
  }
}

function assertTime(value) {
  if (!/^\d{2}:\d{2}$/.test(value)) {
    throw new Error(`Invalid --time "${value}". Use HH:mm (24-hour).`)
  }
}

function assertDirection(value) {
  if (!["backward", "forward"].includes(value)) {
    throw new Error(`Invalid --direction "${value}". Use backward or forward.`)
  }
}

function parseDateOnly(dateStr) {
  const d = new Date(`${dateStr}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid date "${dateStr}"`)
  }
  return d
}

function formatDateOnly(dateObj) {
  return dateObj.toISOString().slice(0, 10)
}

function addDays(dateObj, days) {
  const next = new Date(dateObj.getTime())
  next.setUTCDate(next.getUTCDate() + days)
  return next
}

function readSchedule() {
  if (!fs.existsSync(SCHEDULE_PATH)) {
    throw new Error(
      `Missing ${path.relative(ROOT, SCHEDULE_PATH)}. Create it before scheduling.`
    )
  }

  const raw = fs.readFileSync(SCHEDULE_PATH, "utf-8")
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed.entries)) {
    throw new Error("docs/PUBLICATION_SCHEDULE.json must contain an entries array.")
  }
  return parsed
}

function scanArticles() {
  const out = []

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue

      const raw = fs.readFileSync(fullPath, "utf-8")
      const parsed = matter(raw)
      const slug = String(parsed.data.slug || "").trim()
      if (!slug) continue
      out.push({
        slug,
        pathAbs: fullPath,
        pathRel: path.relative(ROOT, fullPath).replace(/\\/g, "/"),
        data: parsed.data,
        content: parsed.content,
      })
    }
  }

  walk(ARTIKEL_DIR)
  return out
}

function getSlugList(args, allArticles, schedule) {
  const slugSet = new Set()

  if (args.slugs.length > 0) {
    for (const slug of args.slugs) slugSet.add(slug)
  }

  if (args.slugsFile) {
    const filePath = path.resolve(ROOT, args.slugsFile)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Slugs file not found: ${args.slugsFile}`)
    }
    const lines = fs
      .readFileSync(filePath, "utf-8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
    for (const slug of lines) slugSet.add(slug)
  }

  if (args.allUnscheduled) {
    const existing = new Set(schedule.entries.map((e) => e.slug))
    for (const article of allArticles) {
      if (!existing.has(article.slug)) slugSet.add(article.slug)
    }
  }

  return [...slugSet]
}

function resolveTargetArticles(targetSlugs, articlesBySlug) {
  const missing = []
  const targets = []
  for (const slug of targetSlugs) {
    const hit = articlesBySlug.get(slug)
    if (!hit) missing.push(slug)
    else targets.push(hit)
  }
  if (missing.length > 0) {
    throw new Error(`Slug(s) not found under artikel/: ${missing.join(", ")}`)
  }
  return targets
}

function buildUsedDateSet(entries, targetSlugs) {
  const excluded = new Set(targetSlugs)
  const used = new Set()
  for (const entry of entries) {
    if (excluded.has(entry.slug)) continue
    if (entry.date) used.add(entry.date)
  }
  return used
}

function nextAvailableDate(cursor, direction, usedDates) {
  let probe = new Date(cursor.getTime())
  const step = direction === "forward" ? 1 : -1
  while (usedDates.has(formatDateOnly(probe))) {
    probe = addDays(probe, step)
  }
  return probe
}

function sortEntries(entries) {
  return [...entries].sort((a, b) => {
    const dateCmp = String(a.date || "").localeCompare(String(b.date || ""))
    if (dateCmp !== 0) return dateCmp
    return String(a.slug || "").localeCompare(String(b.slug || ""))
  })
}

function run() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    console.log(usage())
    return
  }

  assertDirection(args.direction)
  assertTime(args.time)
  if (!args.startDate) {
    throw new Error("--start-date is required.")
  }
  assertDate(args.startDate)

  const schedule = readSchedule()
  const allArticles = scanArticles()
  const articlesBySlug = new Map(allArticles.map((a) => [a.slug, a]))
  const targetSlugs = getSlugList(args, allArticles, schedule)

  if (targetSlugs.length === 0) {
    throw new Error(
      "No target slugs selected. Use --slugs, --slugs-file, or --all-unscheduled."
    )
  }

  const targets = resolveTargetArticles(targetSlugs, articlesBySlug)
  const usedDates = buildUsedDateSet(schedule.entries, targetSlugs)

  let cursor = parseDateOnly(args.startDate)
  const step = args.direction === "forward" ? 1 : -1
  const planned = []

  for (const article of targets) {
    const assignedDateObj = nextAvailableDate(cursor, args.direction, usedDates)
    const assignedDate = formatDateOnly(assignedDateObj)
    const publishedAt = `${assignedDate} ${args.time} WIB`
    usedDates.add(assignedDate)

    planned.push({
      slug: article.slug,
      pathRel: article.pathRel,
      date: assignedDate,
      published_at_wib: publishedAt,
      status: args.status,
    })

    cursor = addDays(assignedDateObj, step)
  }

  console.log(
    `\n[publication-scheduler] ${args.apply ? "APPLY" : "DRY-RUN"} mode\n`
  )
  for (const row of planned) {
    console.log(
      `${row.slug} -> ${row.date} (${row.published_at_wib}) [${row.status}]`
    )
  }

  if (!args.apply) {
    console.log(
      "\nNo files were changed. Re-run with --apply to persist frontmatter and docs/PUBLICATION_SCHEDULE.json."
    )
    return
  }

  const entryBySlug = new Map(schedule.entries.map((e) => [e.slug, e]))

  for (const row of planned) {
    const article = articlesBySlug.get(row.slug)
    if (!article) continue

    const nextData = {
      ...article.data,
      date: row.date,
      published_at_wib: row.published_at_wib,
    }
    const nextRaw = matter.stringify(article.content, nextData)
    fs.writeFileSync(article.pathAbs, nextRaw, "utf-8")

    const existing = entryBySlug.get(row.slug)
    if (existing) {
      existing.date = row.date
      existing.published_at_wib = row.published_at_wib
      existing.status = row.status
      existing.path = row.pathRel
      if (!existing.notes) existing.notes = "Scheduled by auto-scheduler"
    } else {
      schedule.entries.push({
        slug: row.slug,
        date: row.date,
        published_at_wib: row.published_at_wib,
        status: row.status,
        path: row.pathRel,
        notes: "Scheduled by auto-scheduler",
      })
    }
  }

  schedule.entries = sortEntries(schedule.entries)
  fs.writeFileSync(SCHEDULE_PATH, `${JSON.stringify(schedule, null, 2)}\n`, "utf-8")

  console.log(
    `\nUpdated ${planned.length} article file(s) and docs/PUBLICATION_SCHEDULE.json.`
  )
}

try {
  run()
} catch (error) {
  console.error(`[publication-scheduler] ${error.message}`)
  process.exit(1)
}
