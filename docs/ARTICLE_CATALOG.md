# Duit.co.id Article Catalog & Progress Tracker

## Overview
Master list of all planned articles organized by tier. Use this document to:
- Plan content creation
- Track writing progress
- Assign taxonomy tags
- Coordinate bulk article generation
- Monitor publication status

**Important:** Every article MUST have a companion YouTube video. The video can be created before or after the article, but both must exist. Add `youtube_url` to frontmatter once video is ready.

## Publication Scheduling Rules (Mandatory for Bulk)

- Use `docs/PUBLICATION_SCHEDULE.json` as the scheduling source-of-truth.
- `date` in frontmatter is the public publish date and must be unique per slug.
- Bulk creation must be backdated with **max 1 article per day**.
- Optional `published_at_wib` can be added for internal ordering (format: `YYYY-MM-DD HH:mm WIB`).
- Never publish hundreds of slugs on the same date; allocate sequential historical dates.

---

## Status Legend
- 📋 **Research** - Research phase, gathering data and market info
- 📝 **Planned** - Research complete, ready to write
- ✍️ **Writing** - Currently being written
- 👀 **Review** - Written, needs editing/review
- ✅ **Published** - Complete and live on site
- 🔄 **Update** - Needs content refresh

---

## Tier 0: Survival (Debt Relief & Survival)
**Target Audience:** People in financial crisis, debt traps, pinjol victims
**Content Focus:** Immediate relief, legal protection, survival strategies

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 0.1 | Panduan Lengkap Bebas dari Jerat Pinjol Online | panduan-lunas-pinjol | hukum, keuangan | unisex | produktif | 📝 | Must-read for all tiers |
| 0.2 | Cara Menghadapi Debt Collector Ilegal | hadapi-debt-collector | hukum | unisex | produktif | 📝 | Phone/Digital harassment |
| 0.3 | Panduan Menghadapi Debt Collector Lapangan (Home Visit) | panduan-dc-lapangan | hukum | unisex | produktif | 📝 | Field collection focus |
| 0.4 | Langkah Hukum Jika Terjerat Pinjol Ilegal | langkah-hukum-pinjol | hukum | unisex | produktif | 📝 | Legal escalation guide |
| 0.5 | Cara Melaporkan Pinjol Ilegal ke OJK & Polisi | lapor-pinjol-ilegal | hukum | unisex | produktif | 📝 | Official reporting channels |
| 0.6 | Budgeting Darurat: Hidup dari Gaji UMR | budgeting-darurat-umr | keuangan | unisex | produktif | 📝 | Practical examples |
| 0.7 | Apa Itu Pinjol Legal vs Ilegal? | pinjol-legal-ilegal | hukum | unisex | muda | 📝 | Educational basics |
| 0.8 | Cara Negosiasi Utang dengan Kreditur | negosiasi-utang | keuangan | unisex | produktif | 📝 | Negotiation tactics |
| 0.9 | Perlindungan Hukum untuk Debitur | perlindungan-debitur | hukum | unisex | produktif | 📝 | UU protection laws |
| 0.10 | Emergency Fund: Mulai dari Rp 10rb/hari | emergency-fund-murah | keuangan | unisex | muda | 📝 | Micro-saving tips |
| 0.11 | Tanda-Tanda Skema Pinjaman Berbahaya | tanda-pinjol-berbahaya | hukum | unisex | muda | 📝 | Prevention focused |

**Tier 0 Target:** 11 articles (0% complete)

---

## Tier 1: The Hustler (Side Hustles & High-Income Skills)
**Target Audience:** Youth, fresh graduates, UMR workers
**Content Focus:** Extra income, skill development, zero-risk business models

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 1.1 | 15 Side Hustle Modal Kecil untuk Mahasiswa | side-hustle-mahasiswa | bisnis | unisex | muda | 📋 | Low capital focus |
| 1.2 | Cara Jastip untuk Pemula | jastip-pemula | bisnis | female | muda | 📋 | Step-by-step guide |
| 1.3 | Skill High-Income yang Bisa Dipelajari Otodidak | skill-otodidak | karir | unisex | muda | 📋 | Self-learning resources |
| 1.4 | Bisnis Online Shop dari Nol | online-shop-nol | bisnis | unisex | produktif | 📋 | E-commerce basics |
| 1.5 | Cara Dapat Klien Pertama Freelance | klien-pertama-freelance | karir | unisex | muda | 📋 | Portfolio building |
| 1.6 | Dropship vs Reseller: Mana Lebih Untung? | dropship-vs-reseller | bisnis | unisex | muda | 📋 | Comparison guide |
| 1.7 | Jualan Makanan Online: Panduan Lengkap | jualan-makanan-online | bisnis | unisex | produktif | 📋 | Food business |
| 1.8 | Cara Mulai Jastip Barang Mewah | jastip-barang-mewah | bisnis | female | produktif | 📋 | Luxury goods |
| 1.9 | Content Creator: Dari Hobi Jadi Cuan | content-creator-cuan | karir | unisex | muda | 📋 | Social media income |
| 1.10 | Tutorial Jadi Admin Olshop Professional | admin-olshop-pro | karir | unisex | muda | 📋 | Virtual assistant |
| 1.11 | Cara Hitung Harga Jual Produk | hitung-harga-jual | bisnis | unisex | produktif | 📋 | Pricing strategy |
| 1.12 | 10 Ide Bisnis Modal di Bawah 1 Juta | bisnis-modal-1juta | bisnis | unisex | muda | 📋 | Low capital ideas |
| 1.13 | Tips Negotiasi Gaji untuk Fresh Graduate | negosiasi-gaji | karir | unisex | muda | 📋 | Salary tactics |
| 1.14 | Cara Bikin CV dan Portfolio yang Menarik | cv-portfolio-menarik | karir | unisex | muda | 📋 | Job application |
| 1.15 | Passive Income untuk Karyawan | passive-income-karyawan | bisnis | unisex | produktif | 📋 | Extra income streams |

**Tier 1 Target:** 15 articles (0% complete)

---

## Tier 2: The Scaler (Business Scaling & Financial Planning)
**Target Audience:** Managers, professionals, small business owners
**Content Focus:** Systematization, scaling, paper assets, financial planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 2.1 | Cara Scale-Up UMKM dari 0 ke 100 Juta/bulan | scale-up-umkm | bisnis | unisex | produktif | 📋 | Growth strategy |
| 2.2 | Panduan Lengkap Reksa Dana untuk Pemula | reksa-dana-pemula | investasi | unisex | produktif | 📋 | Investment basics |
| 2.3 | Cara Buat SOP Bisnis yang Efektif | sop-bisnis-efektif | bisnis | unisex | produktif | 📋 | Operations management |
| 2.4 | Obligasi Negara vs Obligasi Korporasi | obligasi-negara-korporasi | investasi | unisex | produktif | 📋 | Bond comparison |
| 2.5 | Financial Planning untuk Keluarga Muda | financial-planning-keluarga | keuangan | unisex | produktif | 📋 | Family finance |
| 2.6 | Cara Mulai Investasi Saham Blue-Chip | saham-blue-chip | investasi | unisex | produktif | 📋 | Stock investing |
| 2.7 | Pajak untuk Freelancer dan Pengusaha | pajak-freelancer | hukum | unisex | produktif | 📋 | Tax obligations |
| 2.8 | Asuransi Kesehatan vs Asuransi Jiwa | asuransi-kesehatan-jiwa | keuangan | unisex | produktif | 📋 | Insurance guide |
| 2.9 | Cara Analisis Bisnis Sebelum Ekspansi | analisis-bisnis-expansi | bisnis | unisex | produktif | 📋 | Due diligence |
| 2.10 | Dividen Investing: Panduan Lengkap | dividen-investing | investasi | unisex | produktif | 📋 | Dividend strategy |
| 2.11 | Cara Hire dan Train Tim Pertama Anda | hire-tim-pertama | bisnis | unisex | produktif | 📋 | Team building |
| 2.12 | Manajemen Cash Flow untuk UMKM | cash-flow-umkm | keuangan | unisex | produktif | 📋 | Cash management |
| 2.13 | ETF vs Saham Individual: Mana Lebih Baik? | etf-vs-saham | investasi | unisex | produktif | 📋 | Investment vehicles |
| 2.14 | Cara Bikin Business Plan yang Menarik | business-plan | bisnis | unisex | produktif | 📋 | Planning template |
| 2.15 | Retirement Planning di Usia 30-an | retirement-30an | keuangan | unisex | produktif | 📋 | Early retirement |

**Tier 2 Target:** 15 articles (0% complete)

---

## Tier 3: Asset Builder (Property, Franchise & Investments)
**Target Audience:** Successful entrepreneurs, high-level executives
**Content Focus:** Real estate, franchising, advanced investing, retirement planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 3.1 | Panduan Lengkap Investasi Properti | investasi-properti | investasi | unisex | produktif | 📋 | Real estate basics |
| 3.2 | Cara Pilih Franchise yang Menguntungkan | pilih-franchise | bisnis | unisex | produktif | 📋 | Franchise selection |
| 3.3 | Hitung ROI Properti Sewaan | roi-properti-sewaan | investasi | unisex | produktif | 📋 | ROI calculation |
| 3.4 | KPR vs Cash Keras: Strategi Beli Properti | kpr-vs-cash | investasi | unisex | produktif | 📋 | Purchase strategy |
| 3.5 | Cara Mulai Bisnis Franchise dari Nol | franchise-dari-nol | bisnis | unisex | produktif | 📋 | Franchise startup |
| 3.6 | Investasi Tanah: Tips dan Trik | investasi-tanah | investasi | unisex | produktif | 📋 | Land investment |
| 3.7 | Portofolio Diversifikasi untuk Investor | diversifikasi-portofolio | investasi | unisex | produktif | 📋 | Portfolio strategy |
| 3.8 | Cara Nilai Bisnis untuk Exit Strategy | nilai-bisnis-exit | bisnis | unisex | pensiun | 📋 | Business valuation |
| 3.9 | Passive Income dari Properti Sewa | passive-income-properti | investasi | unisex | produktif | 📋 | Rental income |
| 3.10 | Pajak Properti: Apa Saja yang Harus Dibayar? | pajak-properti | hukum | unisex | produktif | 📋 | Property taxes |
| 3.11 | Family Office: Apa dan Kenapa? | family-office | bisnis | unisex | pensiun | 📋 | Wealth management |
| 3.12 | Cara Negosiasi Harga Properti | negosiasi-properti | investasi | unisex | produktif | 📋 | Negotiation tactics |
| 3.13 | REITs vs Properti Fisik: Perbandingan | reits-vs-properti | investasi | unisex | produktif | 📋 | Investment comparison |
| 3.14 | Retirement Business Planning | retirement-business | bisnis | unisex | pensiun | 📋 | Exit planning |
| 3.15 | Legal Structure untuk Bisnis Properti | legal-bisnis-properti | hukum | unisex | produktif | 📋 | Business structure |

**Tier 3 Target:** 15 articles (0% complete)

---

## Tier 4: Legacy Maker (Wealth Protection & Succession)
**Target Audience:** Ultra-High Net Worth Individuals (UHNWI)
**Content Focus:** Corporate structuring, tax optimization, wealth protection, succession planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 4.1 | Panduan Setup Holding Company di Indonesia | holding-company | bisnis | unisex | pensiun | 📋 | Corporate structure |
| 4.2 | Suksesi Bisnis: Transfer ke Generasi Berikutnya | suksesi-bisnis | bisnis | unisex | pensiun | 📋 | Succession planning |
| 4.3 | Tax Optimization untuk UHNW Individuals | tax-optimization | hukum | unisex | pensiun | 📋 | Tax strategy |
| 4.4 | Wealth Protection: Asuransi vs Trust Fund | wealth-protection | keuangan | unisex | pensiun | 📋 | Asset protection |
| 4.5 | Cara Setup Family Office di Indonesia | setup-family-office | bisnis | unisex | pensiun | 📋 | Family office guide |
| 4.6 | Estate Planning: Warisan dan Wasit | estate-planning | hukum | unisex | pensiun | 📋 | Estate law |
| 4.7 | Philanthropy Strategy untuk Keluarga Kaya | philanthropy | keuangan | unisex | pensiun | 📋 | Charitable giving |
| 4.8 | Offshore Investing: Legal atau Ilegal? | offshore-investing | hukum | unisex | pensiun | 📋 | Legal boundaries |
| 4.9 | Cara Lindungi Aset dari Tuntutan Hukum | lindungi-aset | hukum | unisex | pensiun | 📋 | Asset protection |
| 4.10 | Generational Wealth: Mindset dan Strategi | generational-wealth | keuangan | unisex | pensiun | 📋 | Wealth mindset |
| 4.11 | Trust Fund vs Yayasan: Perbandingan | trust-vs-yayasan | hukum | unisex | pensiun | 📋 | Legal structures |
| 4.12 | Corporate Governance untuk Bisnis Keluarga | corporate-governance | bisnis | unisex | pensiun | 📋 | Governance structure |
| 4.13 | Insurance Planning untuk UHNW Individuals | insurance-uwn | keuangan | unisex | pensiun | 📋 | Insurance strategy |
| 4.14 | Cara Pilih Financial Advisor untuk UHNW | pilih-advisor | keuangan | unisex | pensiun | 📋 | Advisor selection |
| 4.15 | Legacy Planning: Meninggalkan Dampak | legacy-planning | keuangan | unisex | pensiun | 📋 | Impact legacy |

**Tier 4 Target:** 15 articles (0% complete)

---

## Summary Statistics

| Tier | Target Articles | Published | % Complete |
|------|----------------|-----------|------------|
| Tier 0: Survival | 11 | 0 | 0% |
| Tier 1: Hustler | 15 | 0 | 0% |
| Tier 2: Scaler | 15 | 0 | 0% |
| Tier 3: Asset Builder | 15 | 0 | 0% |
| Tier 4: Legacy | 15 | 0 | 0% |
| **TOTAL** | **71** | **0** | **0%** |
