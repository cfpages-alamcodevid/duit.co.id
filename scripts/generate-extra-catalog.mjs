import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const articleCatalogPath = path.join(root, "docs", "ARTICLE_CATALOG.md")
const outputPath = path.join(root, "docs", "EXTRA_CATALOG.md")

const source = fs.readFileSync(articleCatalogPath, "utf8")

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function clean(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\|/g, "/")
    .trim()
}

function subjectFromTitle(title) {
  return title
    .replace(/^(panduan lengkap|panduan|cara|strategi|tips|tutorial)\s*:?\s+/i, "")
    .replace(/^(panduan lengkap|panduan|cara|strategi|tips|tutorial)\s*:?\s+/i, "")
    .trim()
}

function inferExtra(row) {
  const cluster = row.cluster.toLowerCase()
  const title = row.title.toLowerCase()
  const category = row.category.toLowerCase()
  const tier = row.tier
  const subject = subjectFromTitle(row.title)

  if (cluster.includes("scam") || title.includes("pinjol") || title.includes("penipuan") || title.includes("debt collector") || title.includes("bodong") || title.includes("scam")) {
    return {
      type: "Checklist + tabel verifikasi",
      title: `Checklist aman: ${subject}`,
      format: "One-page checklist + tabel bukti/kanal resmi",
      content: "Langkah cek cepat, red flag, bukti yang perlu disimpan, kontak/kanal resmi, dan keputusan lanjut/tidak.",
      cta: "Simpan sebagai pegangan saat butuh verifikasi cepat.",
      priority: "P0",
    }
  }

  if (cluster.includes("debt") || title.includes("utang") || title.includes("cicilan") || title.includes("tunggakan") || title.includes("restrukturisasi") || title.includes("sewa")) {
    return {
      type: "Worksheet + skrip negosiasi",
      title: `Worksheet keputusan: ${subject}`,
      format: "One-page worksheet + template chat/telepon",
      content: "Kolom nominal, jatuh tempo, prioritas bayar, opsi negosiasi, skrip pendek, dan catatan hasil follow-up.",
      cta: "Pakai sebelum bicara dengan kreditur, pemilik kos, atau pihak penagih.",
      priority: "P0",
    }
  }

  if (cluster.includes("budget") || cluster.includes("household") || title.includes("hemat") || title.includes("budget") || title.includes("gaji") || title.includes("thr") || title.includes("belanja") || title.includes("makan")) {
    return {
      type: "Worksheet anggaran",
      title: `Template hitung cepat: ${subject}`,
      format: "One-page budgeting sheet",
      content: "Rumus alokasi, daftar pos biaya, batas aman, contoh angka Rupiah, dan area yang bisa dipangkas minggu ini.",
      cta: "Isi angkanya agar keputusan penghematan tidak cuma kira-kira.",
      priority: "P0",
    }
  }

  if (cluster.includes("income shock") || title.includes("phk") || title.includes("uang darurat") || title.includes("jual barang") || title.includes("jasa harian") || title.includes("sampingan")) {
    return {
      type: "Action plan",
      title: `Rencana 7 hari: ${subject}`,
      format: "One-page sprint plan",
      content: "Urutan tindakan harian, daftar aset/skill yang bisa diuangkan, template penawaran, dan target cash-in realistis.",
      cta: "Mulai dari langkah pertama yang bisa dilakukan hari ini.",
      priority: "P0",
    }
  }

  if (cluster.includes("legal aid") || cluster.includes("gov") || title.includes("lbh") || title.includes("bantuan") || title.includes("bpjs") || title.includes("program pemerintah") || title.includes("beasiswa")) {
    return {
      type: "Direktori + eligibility checklist",
      title: `Daftar cek akses bantuan: ${subject}`,
      format: "One-page directory table",
      content: "Syarat, dokumen, link/kanal, estimasi proses, kesalahan umum, dan urutan kontak yang paling masuk akal.",
      cta: "Cek kelayakan sebelum mengurus dokumen.",
      priority: "P0",
    }
  }

  if (cluster.includes("digital") || title.includes("freelance") || title.includes("virtual assistant") || title.includes("admin") || title.includes("content creator") || title.includes("tiktok")) {
    return {
      type: "Resource table",
      title: `Peta resource: ${subject}`,
      format: "One-page tabel platform/tool",
      content: "Nama platform, URL, kegunaan, kelebihan, kekurangan, biaya, dan langkah pertama yang harus dilakukan.",
      cta: "Pilih 1-2 platform saja agar tidak lompat-lompat.",
      priority: "P1",
    }
  }

  if (cluster.includes("career") || category.includes("karir") || title.includes("cv") || title.includes("portfolio") || title.includes("gaji") || title.includes("skill")) {
    return {
      type: "Template karier",
      title: `Template eksekusi: ${subject}`,
      format: "One-page template + resource table",
      content: "Checklist skill, contoh headline/profil, daftar resource belajar, template outreach, dan metrik progress 14 hari.",
      cta: "Gunakan untuk mempercepat lamaran, portfolio, atau negosiasi.",
      priority: "P1",
    }
  }

  if (cluster.includes("commerce") || cluster.includes("local services") || cluster.includes("agribusiness") || title.includes("bisnis") || title.includes("jualan") || title.includes("reseller") || title.includes("dropship") || title.includes("jastip")) {
    return {
      type: "Business starter canvas",
      title: `Canvas validasi: ${subject}`,
      format: "One-page business checklist",
      content: "Modal awal, supplier/channel, harga jual, margin, risiko operasional, target 10 pelanggan pertama, dan stop-loss rule.",
      cta: "Validasi kecil dulu sebelum keluar modal besar.",
      priority: "P1",
    }
  }

  if (cluster.includes("investment") || cluster.includes("portfolio") || cluster.includes("capital") || category.includes("investasi") || title.includes("investasi") || title.includes("saham") || title.includes("sukuk") || title.includes("reksa")) {
    return {
      type: "Decision checklist",
      title: `Checklist investasi: ${subject}`,
      format: "One-page decision sheet",
      content: "Profil risiko, horizon waktu, biaya, risiko utama, skenario rugi, batas alokasi, dan pertanyaan sebelum beli.",
      cta: "Baca sebelum menaruh uang agar keputusan tidak FOMO.",
      priority: tier.includes("2") ? "P1" : "P2",
    }
  }

  if (cluster.includes("property") || title.includes("properti") || title.includes("tanah") || title.includes("sertifikat") || title.includes("kos") || title.includes("sewa")) {
    return {
      type: "Due diligence sheet",
      title: `Checklist due diligence: ${subject}`,
      format: "One-page checklist + tabel angka",
      content: "Dokumen, biaya tersembunyi, asumsi sewa/yield, red flag lokasi, pertanyaan ke penjual, dan keputusan lanjut/tolak.",
      cta: "Pakai sebelum survei, negosiasi, atau tanda tangan.",
      priority: "P2",
    }
  }

  if (cluster.includes("franchise") || title.includes("franchise") || title.includes("waralaba")) {
    return {
      type: "Franchise review sheet",
      title: `Checklist review franchise: ${subject}`,
      format: "One-page contract/unit economics checklist",
      content: "Biaya awal, royalty, BEP, support franchisor, klausul kontrak, risiko lokasi, dan pertanyaan wajib sebelum deal.",
      cta: "Bawa saat ngobrol dengan franchisor.",
      priority: "P2",
    }
  }

  if (cluster.includes("tax") || cluster.includes("legal") || category.includes("hukum") || title.includes("pajak") || title.includes("legal") || title.includes("kontrak") || title.includes("pt")) {
    return {
      type: "Legal/tax checklist",
      title: `Memo cek legal: ${subject}`,
      format: "One-page issue checklist",
      content: "Dokumen yang perlu dicek, pertanyaan untuk notaris/konsultan, risiko pajak, dan batas kapan perlu bantuan profesional.",
      cta: "Gunakan sebagai bahan diskusi sebelum mengambil keputusan legal.",
      priority: "P2",
    }
  }

  if (cluster.includes("governance") || cluster.includes("estate") || cluster.includes("family") || cluster.includes("asset shield") || cluster.includes("philanthropy") || title.includes("family office") || title.includes("suksesi") || title.includes("warisan") || title.includes("trust")) {
    return {
      type: "Board/family memo",
      title: `Memo keluarga: ${subject}`,
      format: "One-page agenda + decision log",
      content: "Agenda rapat, pihak yang perlu hadir, dokumen pendukung, keputusan yang harus dicatat, dan follow-up advisor.",
      cta: "Pakai untuk memulai percakapan keluarga yang biasanya sensitif.",
      priority: "P3",
    }
  }

  return {
    type: "Action checklist",
    title: `Checklist praktis: ${subject}`,
    format: "One-page action list",
    content: "Ringkasan langkah, data yang perlu dikumpulkan, keputusan yang perlu dibuat, dan kesalahan yang harus dihindari.",
    cta: "Simpan sebagai versi ringkas untuk dipraktikkan.",
    priority: "P2",
  }
}

const tierHeadingMap = {
  "Tier 0": "tier-0-survival",
  "Tier 1": "tier-1-hustler",
  "Tier 2": "tier-2-scaler",
  "Tier 3": "tier-3-asset-builder",
  "Tier 4": "tier-4-legacy",
}

const rows = []
let currentTier = ""
for (const line of source.split(/\r?\n/)) {
  const tierMatch = line.match(/^##\s+(Tier\s+[0-4])/)
  if (tierMatch) {
    currentTier = tierHeadingMap[tierMatch[1]] || ""
    continue
  }

  if (!currentTier || !line.startsWith("|")) continue
  if (line.includes("| # | Cluster | Title | Slug |") || /^\|\s*-+/.test(line)) continue

  const cells = splitTableRow(line)
  if (cells.length < 8) continue
  const [number, cluster, title, slug, category, gender, age, status, notes = ""] = cells
  if (!number || !slug || slug.toLowerCase() === "slug") continue

  rows.push({
    number: clean(number),
    tier: currentTier,
    cluster: clean(cluster),
    title: clean(title),
    slug: clean(slug),
    category: clean(category),
    gender: clean(gender),
    age: clean(age),
    status: clean(status),
    notes: clean(notes),
  })
}

const seen = new Set()
const catalogRows = []
for (const row of rows) {
  const key = `${row.tier}/${row.slug}`
  const extra = inferExtra(row)
  const duplicate = seen.has(key)
  seen.add(key)
  catalogRows.push({
    ...row,
    articleTitle: row.title,
    duplicate,
    extraSlug: `${row.slug}-extra`,
    extraPath: `/extra/${row.tier}/${row.slug}-extra.md`,
    extraStatus: duplicate
      ? "⚠️"
      : fs.existsSync(path.join(root, "extra", row.tier, `${row.slug}-extra.md`))
        ? "✅"
        : "🧠",
    ...extra,
  })
}

const now = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}).format(new Date()).replace(",", "")

const lines = []
lines.push("# Duit.co.id Extra Catalog")
lines.push("")
lines.push(`Generated from \`docs/ARTICLE_CATALOG.md\` on ${now} WIB.`)
lines.push("")
lines.push("## Purpose")
lines.push("")
lines.push("Extra adalah bonus pelengkap artikel yang dipakai untuk mengubah pembaca menjadi member. Bentuk idealnya PDF kecil, satu sampai tiga halaman, yang dibuat client-side dari file Markdown saat user menekan tombol download. File PDF tidak disimpan; sumber konten tetap Git-based Markdown di `/extra/{tier}/{slug}-extra.md`.")
lines.push("")
lines.push("## Download Mechanism")
lines.push("")
lines.push("- Artikel menampilkan tombol download extra jika file `/extra/{tier}/{slug}-extra.md` tersedia.")
lines.push("- Saat tombol diklik, tampilkan modal viewport-fixed di tengah layar, bukan relatif terhadap parent/container.")
lines.push("- Jika user belum login, modal menampilkan login/register tabs Clerk dan Google sign-in.")
lines.push("- Setelah login, Markdown extra dirender dengan CSS Duit.co.id lalu dikonversi menjadi PDF client-side.")
lines.push("- Tidak ada PDF statis yang disimpan. Yang disimpan hanya Markdown extra dan event analytics/download jika perlu.")
lines.push("")
lines.push("## Priority")
lines.push("")
lines.push("- P0: extra berdampak langsung untuk kondisi krisis, hukum, atau tindakan cepat.")
lines.push("- P1: extra membantu eksekusi karier, bisnis, atau budgeting dengan dampak praktis.")
lines.push("- P2: extra membantu keputusan investasi, properti, legal, atau sistem bisnis.")
lines.push("- P3: extra untuk topik UHNW/legacy yang lebih cocok sebagai memo keluarga/advisor.")
lines.push("")
lines.push("## Status Legend")
lines.push("")
lines.push("- 🧠 Planned: ide extra sudah direncanakan di katalog.")
lines.push("- ✍️ Drafting: extra sedang ditulis oleh agent.")
lines.push("- 👀 Review: extra sudah ada tetapi perlu dicek kualitas/akurasi.")
lines.push("- ✅ Ready: file Markdown extra sudah ada dan siap ditampilkan.")
lines.push("- 🔄 Refresh: extra perlu update karena artikel, regulasi, harga, atau resource berubah.")
lines.push("- ⚠️ Needs Catalog Check: slug duplikat atau butuh validasi katalog sebelum dibuat.")
lines.push("")

for (const tier of Object.values(tierHeadingMap)) {
  const tierRows = catalogRows.filter((row) => row.tier === tier)
  lines.push(`## ${tier}`)
  lines.push("")
  lines.push("| # | Status | Article Slug | Article Title | Cluster | Extra Title | Extra Type | Suggested Content | Extra Path | Priority | Notes |")
  lines.push("|---|---|---|---|---|---|---|---|---|---|---|")
  for (const row of tierRows) {
    const note = row.duplicate ? "Duplicate slug in article catalog; verify before generating extra." : ""
    lines.push(
      `| ${row.number} | ${row.extraStatus} | ${row.slug} | ${row.articleTitle} | ${row.cluster} | ${row.title} | ${row.type}: ${row.extraSlug} | ${row.content} | ${row.extraPath} | ${row.priority} | ${note} |`,
    )
  }
  lines.push("")
}

lines.push("## Frontmatter Template")
lines.push("")
lines.push("```yaml")
lines.push("---")
lines.push('title: "Checklist praktis: [judul extra]"')
lines.push('description: "Bonus PDF pelengkap artikel [judul artikel] dari Duit.co.id."')
lines.push('slug: "[article-slug]-extra"')
lines.push('article_slug: "[article-slug]"')
lines.push('tier: "tier-0-survival"')
lines.push('extra_type: "checklist"')
lines.push('download_label: "Download bonus PDF"')
lines.push('version: "1.0"')
lines.push('updated_at: "2026-05-08"')
lines.push("requires_login: true")
lines.push("pdf_enabled: true")
lines.push("---")
lines.push("```")
lines.push("")
lines.push("## Quality Rules")
lines.push("")
lines.push("- Extra harus melengkapi artikel, bukan mengulang isi artikel.")
lines.push("- Target 500-1.200 kata, kecuali direktori yang membutuhkan tabel lebih panjang.")
lines.push("- Gunakan tabel, checklist, worksheet, skrip, atau template yang bisa langsung dipakai.")
lines.push("- Jangan pakai H1 di body. Title dari frontmatter adalah H1.")
lines.push("- Jangan tulis copy internal seperti mockup, sandbox, backlog, atau catatan untuk founder.")
lines.push("- Gunakan angka Rupiah lengkap: `Rp 1 juta`, bukan `Rp 1M` atau `1jt`.")
lines.push("- Untuk direktori/link eksternal, sertakan URL, fungsi, kelebihan, kekurangan, dan catatan biaya/risiko.")

fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8")
console.log(`Wrote ${catalogRows.length} extra rows to ${path.relative(root, outputPath)}`)
