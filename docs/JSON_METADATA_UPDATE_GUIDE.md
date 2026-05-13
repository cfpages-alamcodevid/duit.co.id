# Panduan Update JSON Metadata Artikel Baru

## 1. Overview

Setiap artikel baru di Duit.co.id memerlukan metadata di 7 file JSON di folder `/JSON/`. Metadata ini digunakan oleh `scripts/generate-article-content.mjs` untuk menghasilkan `public/search-index.json` dan `public/article-content/{slug}.json`.

**Penting:** Article `.md` files harus body-only Markdown. Tidak boleh ada YAML frontmatter.

## 2. Struktur Folder

```
JSON/
├── article-seo.json          # Title, description, author, image
├── article-taxonomy.json     # Tier, category, gender, age, location, education, cluster
├── article-tags.json         # Search/internal tags
├── article-access.json       # Access level, premium, youtube_lock
├── article-media.json        # YouTube URL dan embed position
├── article-dates.json        # Tanggal publish unik per slug (AUTO-GENERATED)
├── article-audit.json        # Catalog row, status, notes, path
└── article-frontmatter-archive.json  # Legacy frontmatter (archive only)
```

## 3. Workflow Update Metadata

### Langkah 1: Pastikan Artikel Sudah Ada di Catalog

Sebelum update JSON, pastikan artikel sudah tercatat di `docs/ARTICLE_CATALOG.md`:

```markdown
| 1.289 | SMK Skill Business | Subtitle Video dan Reels untuk Creator Lokal | subtitle-video | karir | unisex | muda | 📝 | Captioning service |
```

### Langkah 2: Buat File Artikel Markdown

Buat file `/artikel/{tier}/{slug}.md` dengan body-only Markdown:

```markdown
## Kenapa Subtitle Itu Penting

Konten artikel di sini...

## Langkah 1: Siapkan Tools

Isi langkah...
```

### Langkah 3: Update JSON Metadata

Edit 7 file JSON berikut. **Jangan edit `article-dates.json`** — tanggal auto-generated oleh prebuild script.

## 4. Referensi Format JSON per File

### 4.1 article-seo.json

```json
{
  "slug-artikel": {
    "title": "Judul Artikel yang SEO-Friendly",
    "description": "Deskripsi meta description maks 160 karakter untuk SEO",
    "author": "Duit.co.id Team",
    "image": "/images/artikel/slug-artikel.jpg"
  }
}
```

| Field | Tipe | Deskripsi | Contoh |
|-------|------|-----------|--------|
| `title` | string | Judul artikel & SEO title | `"Panduan Lunas Pinjol"` |
| `description` | string | Meta description (maks ~160 char) | `"Strategi melunasi hutang pinjol..."` |
| `author` | string | Nama author atau tim | `"Duit.co.id Team"` |
| `image` | string | URL gambar featured | `"/images/artikel/pinjol.jpg"` |

### 4.2 article-taxonomy.json

```json
{
  "slug-artikel": {
    "tier": "tier-1-hustler",
    "category": ["karir"],
    "gender": "unisex",
    "age": "muda",
    "location": "kota",
    "education": "sma",
    "cluster": "SMK Skill Business"
  }
}
```

| Field | Tipe | Valid Values | Contoh |
|-------|------|-------------|--------|
| `tier` | string | `tier-0-survival`, `tier-1-hustler`, `tier-2-scaler`, `tier-3-asset-builder`, `tier-4-legacy` | `"tier-1-hustler"` |
| `category` | array | `karir`, `bisnis`, `legal`, `investasi`, `hukum`, `keuangan` | `["karir", "bisnis"]` |
| `gender` | string | `male`, `female`, `unisex` | `"unisex"` |
| `age` | string | `muda` (18-25), `produktif` (26-55), `pensiun` (55+) | `"muda"` |
| `location` | string | `desa`, `kota`, `global` | `"kota"` |
| `education` | string | `sma`, `s1`, `s2`, `spesialis` | `"sma"` |
| `cluster` | string | Nama cluster dari ARTICLE_CATALOG | `"SMK Skill Business"` |

### 4.3 article-tags.json

```json
{
  "slug-artikel": ["tag-1", "tag-2", "tag-3"]
}
```

- Tags harus lowercase dengan hyphen
- Minimal 3-5 tags relevan
- Contoh: `["subtitle", "video", "reels", "captioning", "creator"]`

### 4.4 article-access.json

```json
{
  "slug-artikel": {
    "access_level": "open",
    "is_premium": false,
    "youtube_lock": false
  }
}
```

| Field | Tipe | Valid Values | Default |
|-------|------|-------------|---------|
| `access_level` | string | `open`, `share_gate`, `youtube_gate`, `register_gate`, `paid` | `"open"` |
| `is_premium` | boolean | `true`, `false` | `false` |
| `youtube_lock` | boolean | `true`, `false` | `false` |

**Access Level Strategy:**
- `open` — Tier 0-1, konten dasar
- `share_gate` — Tier 2-4, insight premium
- `youtube_gate` — Artikel dengan video companion
- `register_gate` — E-courses, downloadable resources
- `paid` — Premium e-courses (bisa unlock via social actions)

### 4.5 article-media.json

```json
{
  "slug-artikel": {
    "youtube_embed_position": "top"
  }
}
```

| Field | Tipe | Valid Values | Default |
|-------|------|-------------|---------|
| `youtube_url` | string | YouTube video URL | `""` (empty) |
| `youtube_embed_position` | string | `top`, `middle`, `bottom`, `inline` | `"top"` |

**Note:** `youtube_url` hanya diisi jika video sudah tersedia. Jangan placeholder.

### 4.6 article-audit.json

```json
{
  "slug-artikel": {
    "catalog_row": "1.289",
    "catalog_status": "📝",
    "catalog_notes": "Deskripsi singkat dari catalog",
    "path": "artikel/tier-1-hustler/slug-artikel.md"
  }
}
```

| Field | Tipe | Deskripsi | Contoh |
|-------|------|-----------|--------|
| `catalog_row` | string | Nomor baris dari ARTICLE_CATALOG.md | `"1.289"` |
| `catalog_status` | string | Status emoji | `"📝"`, `"✅"`, `"✍️"` |
| `catalog_notes` | string | Catatan dari catalog | `"Captioning service"` |
| `path` | string | Path file artikel | `"artikel/tier-1-hustler/slug.md"` |

### 4.7 article-dates.json (JANGAN EDIT)

**Tanggal publish auto-generated** oleh `scripts/generate-article-content.mjs` saat `npm run prebuild`. Script ini:
- Mempertahankan tanggal yang sudah ada
- Menghasilkan tanggal unik historis untuk artikel baru
- Menulis kembali ke `article-dates.json`

**Jangan tambahkan tanggal secara manual.**

## 5. Contoh Lengkap: Artikel Baru

Misalnya artikel baru `subtitle-video` di tier-1-hustler:

### article-seo.json
```json
"subtitle-video": {
  "title": "Subtitle Video dan Reels untuk Creator Lokal",
  "description": "Panduan lengkap jadi subtitle creator freelance untuk video dan reels. Skill SMK Multimedia, tools CapCut/Aegisub, dan cara dapat klien pertama.",
  "author": "Duit.co.id Team",
  "image": "/images/artikel/subtitle-video.jpg"
}
```

### article-taxonomy.json
```json
"subtitle-video": {
  "tier": "tier-1-hustler",
  "category": ["karir"],
  "gender": "unisex",
  "age": "muda",
  "location": "kota",
  "education": "sma",
  "cluster": "SMK Skill Business"
}
```

### article-tags.json
```json
"subtitle-video": ["subtitle", "video", "reels", "captioning", "creator", "smk", "freelance"]
```

### article-access.json
```json
"subtitle-video": {
  "access_level": "open",
  "is_premium": false,
  "youtube_lock": false
}
```

### article-media.json
```json
"subtitle-video": {
  "youtube_embed_position": "top"
}
```

### article-audit.json
```json
"subtitle-video": {
  "catalog_row": "1.289",
  "catalog_status": "📝",
  "catalog_notes": "Captioning/subtitle service, short-form workflow, batch pricing, and content calendar upsell",
  "path": "artikel/tier-1-hustler/subtitle-video.md"
}
```

## 6. Checklist Update Metadata

- [ ] Artikel sudah ada di `docs/ARTICLE_CATALOG.md` dengan nomor baris yang benar
- [ ] File `.md` sudah dibuat di `/artikel/{tier}/{slug}.md` (body-only, tanpa frontmatter)
- [ ] `article-seo.json` — title, description, author, image sudah diisi
- [ ] `article-taxonomy.json` — tier, category, gender, age, location, education, cluster sudah diisi
- [ ] `article-tags.json` — tags array sudah diisi (lowercase, hyphenated)
- [ ] `article-access.json` — access_level, is_premium, youtube_lock sudah diisi
- [ ] `article-media.json` — youtube_embed_position sudah diisi
- [ ] `article-audit.json` — catalog_row, catalog_status, catalog_notes, path sudah diisi
- [ ] `article-dates.json` — **TIDAK PERLU DIEDIT** (auto-generated)
- [ ] Jalankan `npm run prebuild` untuk generate public JSON
- [ ] Test artikel di browser

## 7. Update Status di ARTICLE_CATALOG.md

Setelah metadata lengkap, update status di ARTICLE_CATALOG.md:

| Status | Emoji | Kapan |
|--------|-------|-------|
| Research | 📋 | Fase riset |
| Planned | 📝 | Riset selesai, siap ditulis |
| Writing | ✍️ | Sedang ditulis |
| Review | 👀 | Selesai ditulis, perlu review |
| Published | ✅ | Selesai dan live |
| Update | 🔄 | Perlu refresh konten |

**Workflow:**
1. 📋 → 📝 (riset selesai)
2. 📝 → ✍️ (mulai tulis)
3. ✍️ → 👀 (selesai tulis)
4. 👀 → ✅ (selesai review, update JSON metadata)

## 8. Troubleshooting

### Artikel tidak muncul di search
- Cek `article-seo.json` — pastikan slug sudah ada
- Cek `article-taxonomy.json` — pastikan tier sudah benar
- Jalankan `npm run prebuild`

### Artikel tidak muncul di feed personalisasi
- Cek `article-taxonomy.json` — pastikan tier, gender, age sesuai filter
- Cek `article-access.json` — pastikan access_level = `open`

### Tanggal publish salah
- Cek `article-dates.json` — jangan edit manual
- Jalankan `npm run prebuild` untuk auto-generate tanggal baru

### YouTube video tidak muncul
- Cek `article-media.json` — pastikan `youtube_url` terisi
- Pastikan URL valid (format: `https://youtube.com/watch?v=VIDEO_ID`)

## 9. Referensi

- `docs/CMS.md` — Dokumentasi lengkap CMS
- `docs/ARTICLE_CATALOG.md` — Planning/progress tracker
- `docs/TAXONOMY.md` — Filtering dan kategorisasi
- `docs/VIRALITY_STRATEGY.md` — Access level strategy
- `scripts/generate-article-content.mjs` — Prebuild script
- `AGENTS.md` — Project context
