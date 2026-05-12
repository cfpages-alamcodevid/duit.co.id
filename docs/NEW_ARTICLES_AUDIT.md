# New Articles Audit Checklist

Standar audit untuk artikel dan research baru di Duit.co.id. Disarikan dari `article-writer.md` dan `researcher.md`.

---

## A. Audit Research File (`/research/[tier]/[slug]-research.md`)

### A1. Struktur Wajib Research
- [ ] **Article Brief** — Title, Slug, Tier, Target Audience, Primary/Secondary Category, Estimated Word Count
- [ ] **Competitor Analysis** — Minimal 3 kompetitor (Google + YouTube), masing-masing: URL, angle, yang dicover well, yang MISS, peluang kita
- [ ] **Key Data & Statistics** — Data 2025-2026, sumber eksplisit, relevance jelas, quote-ready
- [ ] **Market Research** (jika topik bisnis) — Capital breakdown (item + harga), revenue potential (conservative/moderate/optimistic), market demand (search volume, trend, seasonality)
- [ ] **Legal & Regulatory** — UU/regulasi relevan, proses, biaya, timeline, otoritas, link resmi
- [ ] **Case Studies** — Minimal 2, format: Background, Starting point, Result, Timeline, Key learning, Source
- [ ] **Practical Examples** — Persona-based (minimal 2 persona), calculation example dengan angka realistis
- [ ] **Common Myths & Misconceptions** — Myth vs Reality + why it matters + source
- [ ] **Action Steps Outline** — Step-by-step terstruktur dengan details, example, warning per step
- [ ] **Resources & References** — Semua sumber dikompilasi dengan URL, tipe, dan relevance
- [ ] **Suggested Article Structure** — H1 + H2 outline yang direkomendasikan untuk writer

### A2. Kualitas Data Research
- [ ] Data **current** (2025-2026 preferred), jika lebih tua harus dicatat
- [ ] Data **verifiable** — bisa dicek reader
- [ ] Data **spesifik** — angka exact, bukan "sekitar 5 juta"
- [ ] Data **relevan** — konteks Indonesia
- [ ] Data **cited** — sumber terdokumentasi per data point
- [ ] Tidak ada asumsi yang dipresentasikan sebagai fakta
- [ ] Tidak ada konteks asing yang tidak applicable ke Indonesia

### A3. Laptop/Computer Capital Rule (jika applicable)
- [ ] Laptop diperlakukan sebagai production equipment, bukan afterthought
- [ ] Tidak asumsi "laptop Rp 0" kecuali persona sudah punya
- [ ] Tidak rekomendasikan laptop Rp 1-2 juta untuk serious digital work
- [ ] Spesifikasi disebut: CPU generation, RAM, SSD, workload class
- [ ] Baseline 2026: Intel Core i5 Gen 10 / Ryzen 5 4000, RAM 16GB, SSD 256-512GB
- [ ] Prefer used business laptops (ThinkPad T14, Dell Latitude, HP EliteBook)

### A4. Penyimpanan Research
- [ ] Disimpan di folder tier yang benar: `research/[tier]/[slug]-research.md`
- [ ] Slug sesuai dengan entry di `docs/ARTICLE_CATALOG.md`
- [ ] Tidak ada research yang ditulis langsung ke `ARTICLE_CATALOG.md`

---

## B. Audit Artikel (`/artikel/[tier]/[slug].md`)

### B1. Voice & Style (Syamsul Alam)
- [ ] Terdengar seperti Facebook post Syamsul Alam (bukan corporate/AI)
- [ ] Menggunakan campuran formal-informal: "saya" + "nggak/ndak" dalam paragraf sama
- [ ] Ada conversational intimacy — seperti ngobrol dengan teman
- [ ] Ada strategic self-deprecation — tidak bragging
- [ ] Authority through specific numbers dan data, bukan klaim kosong
- [ ] Tidak ada klaim yang tidak kredibel ("sudah bantu 1000+ orang", "expert terkemuka")
- [ ] Ada unsur humor kasual Indonesia (wkwkwk, parenthetical asides, ellipsis)

### B2. Language Boundaries
- [ ] Hanya Bahasa Indonesia dan Inggris
- [ ] Tidak ada karakter China, Rusia, Korea, Jepang, Arab (kecuali istilah agama lazim)
- [ ] Tidak ada mojibake (`??`, kotak kosong, karakter aneh)
- [ ] Tidak ada typo atau kurang spasi
- [ ] Ejaan kata asing menggunakan ejaan fonetik Indonesia

### B3. Struktur Artikel
- [ ] Hook/Introduction — 1-2 paragraf, mulai dari pain point reader
- [ ] Main Content — 4-8 section dengan `##` headings
- [ ] Action Steps — 3-5 langkah konkret yang bisa dilakukan HARI INI
- [ ] Conclusion — 1-2 paragraf, summary + encouragement + CTA
- [ ] Tidak ada H1 (`#`) di body artikel (title sudah jadi H1)
- [ ] Menggunakan `##` untuk main sections, `###` untuk subsections
- [ ] Bold untuk important terms di first mention
- [ ] Blockquotes untuk warnings/tips (`> **Warning:** ...`)
- [ ] Tables untuk comparisons
- [ ] Numbered lists untuk steps, bullet points untuk tips

### B4. Content Quality
- [ ] Problem-first approach — mulai dari pain point reader
- [ ] Actionable — setiap section ada practical takeaway
- [ ] Local context — regulasi Indonesia, mata uang Rupiah, contoh lokal
- [ ] Data-driven — ada statistik/data temuan (jika relevan)
- [ ] Step-by-step — topik kompleks dipecah jadi numbered steps
- [ ] Realistic examples — angka dan scenario believable
- [ ] Legal accuracy — UU/regulasi yang benar untuk topik hukum
- [ ] No fluff — setiap paragraf adds value
- [ ] Word count: 1500-3000 kata

### B5. Number Formatting (Wajib)
- [ ] Tidak ada suffix "M", "B", "jt" — tulis "juta", "miliar", "ribu" lengkap
- [ ] Desimal pakai koma: "Rp 1,5 juta" (BUKAN "Rp 1.5M")
- [ ] Format: "Rp 2 juta", "Rp 15 juta", "Rp 1 miliar", "Rp 5 ribu"
- [ ] Tidak ada singkatan angka finansial

### B6. SEO & Metadata
- [ ] Slug lowercase, hyphens only, under 60 characters
- [ ] Slug ada di `docs/ARTICLE_CATALOG.md`
- [ ] 2-3 internal links dengan descriptive anchor text
- [ ] Tidak ada anchor text "click here", "read more", "here"
- [ ] External links (jika ada) ke authoritative sources (ojk.go.id, bi.go.id, BPS)
- [ ] Tidak ada YAML frontmatter di file artikel
- [ ] Tidak ada editorial meta paragraphs ("Artikel ini ditulis untuk...")

### B7. CMS Compatibility
- [ ] File disimpan di `/artikel/[tier]/[slug].md`
- [ ] Body only, tanpa frontmatter
- [ ] Markdown/MDX-safe syntax only (headings, paragraphs, lists, tables, blockquotes, links, code blocks)
- [ ] Tidak ada `import` statements, raw HTML, script tags, JSX components
- [ ] Media paths menggunakan repo/public paths (`/images/artikel/{slug}.jpg`)

### B8. Content Rules
- [ ] Tidak menyebutkan "Tier 0", "Tier 2", "Scaler", dll di body copy
- [ ] Tidak ada internal platform copy ("monetize your skill", "become a partner")
- [ ] Tidak ada boilerplate "Artikel ini bukan untuk semua orang"
- [ ] Tidak ada bahasa yang terdengar seperti catatan untuk site owner
- [ ] Reader-first, bukan platform-first

---

## C. Audit Catalog & Metadata (`docs/ARTICLE_CATALOG.md`)

### C1. Entry Validation
- [ ] Slug ada di catalog dengan status yang benar:
  - `📋` = Research phase (belum ada research file)
  - `📝` = Research complete, siap ditulis
  - `✅` = Published (artikel sudah ada di `/artikel/`)
- [ ] Status emoji sesuai dengan keberadaan file:
  - Research file ada → minimal `📝`
  - Artikel file ada → `✅`
  - Tidak ada keduanya → `📋`
- [ ] Tier, Category, Gender, Age sesuai dengan konten

### C2. Field Validation
- [ ] **Tier:** `tier-0-survival`, `tier-1-hustler`, `tier-2-scaler`, `tier-3-asset-builder`, `tier-4-legacy`
- [ ] **Gender:** `unisex` (default), `male`, `female`
- [ ] **Age:** `muda` (18-25), `produktif` (26-55), `pensiun` (55+)
- [ ] **Location:** `kota` (default), `desa`, `global`
- [ ] **Education:** `sma`, `s1`, `s2`, `spesialis`
- [ ] **Category:** `karir`, `bisnis`, `legal`, `investasi`, `hukum`, `keuangan`
- [ ] **Access Level:** `open`, `share_gate`, `youtube_gate`, `register_gate`, `paid`

### C3. Orphan Detection
- [ ] File di `/artikel/` atau `/research/` yang TIDAK ada di catalog → log ke `docs/ARTICLE_MISMATCH.md`
- [ ] Entry di catalog yang TIDAK punya file research → status tetap `📋`
- [ ] Tidak ada file yang dihapus tanpa permintaan eksplisit user

---

## D. Audit JSON Metadata (`/JSON/`)

### D1. File Integrity
- [ ] `JSON/article-seo.json` — title, description (150-160 chars), slug
- [ ] `JSON/article-taxonomy.json` — tier, gender, age, location, education, category
- [ ] `JSON/article-tags.json` — tags array
- [ ] `JSON/article-access.json` — access level
- [ ] `JSON/article-media.json` — image path, youtube_url (jika ada)
- [ ] `JSON/article-dates.json` — publish date (auto-generated, jangan manual edit)

### D2. Consistency
- [ ] Metadata di JSON konsisten dengan entry di `ARTICLE_CATALOG.md`
- [ ] Tidak ada duplikasi slug
- [ ] Description 150-160 karakter, keyword di 100 karakter pertama

---

## E. Quick Audit Command Reference

```bash
# Cek research files yang belum ada di catalog
python check_missing_research.py
python check_missing_research_full.py

# Cek status slug di catalog
rg "[slug]" docs/ARTICLE_CATALOG.md

# Cek apakah artikel sudah ada
Test-Path -LiteralPath "artikel/[tier]/[slug].md"

# Cek apakah research sudah ada
Test-Path -LiteralPath "research/[tier]/[slug]-research.md"

# Cek semua emoji status per tier
rg "## Tier [X]" -A 300 docs/ARTICLE_CATALOG.md | rg -c "📋|📝|✅"

# Cek orphan files (ada file tapi tidak di catalog)
# Bandingkan output glob dengan entries di catalog
```

---

## F. Audit Scoring

Gunakan scoring ini untuk menentukan kesiapan artikel:

| Score | Kriteria | Status |
|-------|----------|--------|
| 0-4 | Research incomplete, banyak section kosong | ❌ Belum siap |
| 5-7 | Research ada tapi data kurang spesifik | ⚠️ Perlu improvement |
| 8-10 | Research complete, semua section terisi, data verified | ✅ Siap ditulis |

**Artikel Audit:**

| Score | Kriteria | Status |
|-------|----------|--------|
| 0-5 | Voice tidak konsisten, struktur salah, data tidak ada | ❌ Perlu rewrite |
| 6-8 | Struktur benar, voice perlu improvement, data cukup | ⚠️ Perlu edit |
| 9-11 | Voice authentic, struktur benar, data lengkap, SEO ok | ✅ Siap publish |

---

## G. Red Flags (Auto-Fail)

Jika ditemukan salah satu dari ini, artikel/research **gagal audit**:

- [ ] Karakter mojibake (China, Rusia, Korea, Jepang)
- [ ] Klaim kredibilitas palsu ("sudah bantu 1000+ orang")
- [ ] Data tanpa sumber
- [ ] Angka finansial dengan suffix "M", "B", "jt"
- [ ] H1 (`#`) di body artikel
- [ ] YAML frontmatter di file artikel
- [ ] Editorial meta paragraphs ("Artikel ini ditulis untuk...")
- [ ] Bahasa internal platform ("Tier 2", "monetize your skill")
- [ ] Slug tidak ada di `ARTICLE_CATALOG.md`
- [ ] Research disimpan di folder tier yang salah
