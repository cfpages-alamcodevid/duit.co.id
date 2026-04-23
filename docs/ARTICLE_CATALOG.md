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
| 1.1 | 15 Side Hustle Modal Kecil untuk Mahasiswa | side-hustle-mahasiswa | bisnis | unisex | muda | 📝 | Low capital focus |
| 1.2 | Cara Jastip untuk Pemula | jastip-pemula | bisnis | female | muda | 📝 | Step-by-step guide |
| 1.3 | Skill High-Income yang Bisa Dipelajari Otodidak | skill-otodidak | karir | unisex | muda | 📝 | Self-learning resources |
| 1.4 | Bisnis Online Shop dari Nol | online-shop-nol | bisnis | unisex | produktif | 📝 | E-commerce basics |
| 1.5 | Cara Dapat Klien Pertama Freelance | klien-pertama-freelance | karir | unisex | muda | 📝 | Portfolio building |
| 1.6 | Dropship vs Reseller: Mana Lebih Untung? | dropship-vs-reseller | bisnis | unisex | muda | 📝 | Comparison guide |
| 1.7 | Jualan Makanan Online: Panduan Lengkap | jualan-makanan-online | bisnis | unisex | produktif | 📝 | Food business |
| 1.8 | Cara Mulai Jastip Barang Mewah | jastip-barang-mewah | bisnis | female | produktif | 📝 | Luxury goods |
| 1.9 | Content Creator: Dari Hobi Jadi Cuan | content-creator-cuan | karir | unisex | muda | 📝 | Social media income |
| 1.10 | Tutorial Jadi Admin Olshop Professional | admin-olshop-pro | karir | unisex | muda | 📝 | Virtual assistant |
| 1.11 | Cara Hitung Harga Jual Produk | hitung-harga-jual | bisnis | unisex | produktif | 📝 | Pricing strategy |
| 1.12 | 10 Ide Bisnis Modal di Bawah 1 Juta | bisnis-modal-1juta | bisnis | unisex | muda | 📝 | Low capital ideas |
| 1.13 | Tips Negotiasi Gaji untuk Fresh Graduate | negosiasi-gaji | karir | unisex | muda | 📝 | Salary tactics |
| 1.14 | Cara Bikin CV dan Portfolio yang Menarik | cv-portfolio-menarik | karir | unisex | muda | 📝 | Job application |
| 1.15 | Passive Income untuk Karyawan | passive-income-karyawan | bisnis | unisex | produktif | 📝 | Extra income streams |
| 1.16 | Cara Buat PT Perorangan Tanpa Modal Besar | cara-buat-pt-perorangan | hukum | unisex | muda | 📝 | UU Cipta Kerja focus |
| 1.17 | Jastip Hasil Bumi: Peluang Cuan dari Desa ke Kota | jastip-hasil-bumi | bisnis | unisex | produktif | 📝 | Rural-urban arbitrage |
| 1.18 | Bisnis Deep Cleaning: Kasur, Sofa, & AC | bisnis-deep-cleaning | bisnis | unisex | produktif | 📝 | Urban service |
| 1.19 | Panduan Makelar Properti Lokal Tanpa Modal | makelar-properti-lokal | bisnis | unisex | produktif | 📝 | Local brokerage |
| 1.20 | Strategi Bisnis Pre-Order (PO) Anti-Rugi | strategi-bisnis-po | bisnis | unisex | muda | 📝 | Zero risk model |
| 1.21 | Peluang Cuan dari TikTok Live di Desa | tiktok-live-desa | bisnis | unisex | muda | 📝 | Content commerce |
| 1.22 | Jadi Virtual Assistant (VA) Klien Luar Negeri | virtual-assistant-global | karir | unisex | muda | 📝 | Global freelancing |
| 1.23 | Cara Validasi Ide Bisnis Tanpa Modal | validasi-ide-bisnis | bisnis | unisex | muda | 📝 | Market research |
| 1.24 | Ekonomi Jasa Berbasis Keringat (Sweat Equity) | sweat-equity-jasa | bisnis | unisex | produktif | 📝 | Service business |
| 1.25 | Dana Darurat Level 1: Amankan Rp 3 Juta Pertama | emergency-fund-level-1 | keuangan | unisex | muda | 📝 | Financial defense |

**Tier 1 Target:** 25 articles (100% research complete)

---

## Tier 2: The Scaler (Business Scaling & Financial Planning)
**Target Audience:** Managers, professionals, small business owners
**Content Focus:** Systematization, scaling, paper assets, financial planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 2.1 | Cara Scale-Up UMKM dari 0 ke 100 Juta/bulan | scale-up-umkm | bisnis | unisex | produktif | 📝 | Growth strategy |
| 2.2 | Panduan Lengkap Reksa Dana untuk Pemula | reksa-dana-pemula | investasi | unisex | produktif | 📝 | Investment basics |
| 2.3 | Cara Buat SOP Bisnis yang Efektif | sop-bisnis-efektif | bisnis | unisex | produktif | 📝 | Operations management |
| 2.4 | Obligasi Negara vs Obligasi Korporasi | obligasi-negara-korporasi | investasi | unisex | produktif | 📝 | Bond comparison |
| 2.5 | Financial Planning untuk Keluarga Muda | financial-planning-keluarga | keuangan | unisex | produktif | 📝 | Family finance |
| 2.6 | Cara Mulai Investasi Saham Blue-Chip | saham-blue-chip | investasi | unisex | produktif | 📝 | Stock investing |
| 2.7 | Pajak untuk Freelancer dan Pengusaha | pajak-freelancer | hukum | unisex | produktif | 📝 | Tax obligations |
| 2.8 | Asuransi Kesehatan vs Asuransi Jiwa | asuransi-kesehatan-jiwa | keuangan | unisex | produktif | 📝 | Insurance guide |
| 2.9 | Cara Analisis Bisnis Sebelum Ekspansi | analisis-bisnis-expansi | bisnis | unisex | produktif | 📝 | Due diligence |
| 2.10 | Dividen Investing: Panduan Lengkap | dividen-investing | investasi | unisex | produktif | 📝 | Dividend strategy |
| 2.11 | The First Hire: Strategi Rekrut Tim Pertama | rekrutmen-tim-pertama | bisnis | unisex | produktif | 📝 | Team building |
| 2.12 | Manajemen Cash Flow untuk UMKM | cash-flow-umkm | keuangan | unisex | produktif | 📝 | Cash management |
| 2.13 | ETF vs Saham Individual: Mana Lebih Baik? | etf-vs-saham | investasi | unisex | produktif | 📝 | Investment vehicles |
| 2.14 | Cara Bikin Business Plan yang Menarik | business-plan | bisnis | unisex | produktif | 📝 | Planning template |
| 2.15 | Retirement Planning di Usia 30-an | retirement-30an | keuangan | unisex | produktif | 📝 | Early retirement |
| 2.16 | Jebakan Lifestyle Creep: Gaji Naik Tabungan Nol | jebakan-lifestyle-creep | keuangan | unisex | produktif | 📝 | Financial psychology |
| 2.17 | Cara Memisahkan Rekening Pribadi dan Bisnis | pemisahan-rekening-bisnis | keuangan | unisex | produktif | 📝 | Cashflow mastery |
| 2.18 | Konsep War Chest: Kelola Dana Perang Bisnis | war-chest-bisnis | keuangan | unisex | produktif | 📝 | Business reserves |
| 2.19 | Visualisasi Alur Kerja Bisnis (Workflow Mapping) | workflow-mapping-bisnis | bisnis | unisex | produktif | 📝 | Optimization |
| 2.20 | Automasi Digital Dasar untuk UMKM (No-Code) | automasi-umkm-nocode | bisnis | unisex | produktif | 📝 | Efficiency |
| 2.21 | Strategi Customer Retention (CRM) untuk UMKM | strategi-crm-umkm | bisnis | unisex | produktif | 📝 | Loyalty & LTV |
| 2.22 | Manajemen Kompensasi: Gaji vs Komisi | manajemen-kompensasi-tim | bisnis | unisex | produktif | 📝 | HR strategy |
| 2.23 | Strategi Pivot dari B2C ke B2B untuk UMKM | strategi-b2b-umkm | bisnis | unisex | produktif | 📝 | Revenue scaling |
| 2.24 | Cara Merapikan Laporan Keuangan agar Bankable | laporan-keuangan-bankable | keuangan | unisex | produktif | 📝 | Access to capital |
| 2.25 | Panduan Pajak UMKM (PPh Final 0.5%) | panduan-pajak-umkm | hukum | unisex | produktif | 📝 | Compliance |

**Tier 2 Target:** 25 articles (100% research complete)

---

## Tier 3: Asset Builder (Property, Franchise & Investments)
**Target Audience:** Successful entrepreneurs, high-level executives
**Content Focus:** Real estate, franchising, advanced investing, retirement planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 3.1 | Panduan Lengkap Investasi Properti | investasi-properti | investasi | unisex | produktif | 📝 | Real estate basics |
| 3.2 | Cara Pilih Franchise yang Menguntungkan | pilih-franchise | bisnis | unisex | produktif | 📝 | Franchise selection |
| 3.3 | Hitung ROI Properti Sewaan | roi-properti-sewaan | investasi | unisex | produktif | 📝 | ROI calculation |
| 3.4 | KPR vs Cash Keras: Strategi Beli Properti | kpr-vs-cash | investasi | unisex | produktif | 📝 | Purchase strategy |
| 3.5 | Cara Mulai Bisnis Franchise dari Nol | franchise-dari-nol | bisnis | unisex | produktif | 📝 | Franchise startup |
| 3.6 | Investasi Tanah: Tips dan Trik | investasi-tanah | investasi | unisex | produktif | 📝 | Land investment |
| 3.7 | Portofolio Diversifikasi untuk Investor | diversifikasi-portofolio | investasi | unisex | produktif | 📝 | Portfolio strategy |
| 3.8 | Cara Nilai Bisnis untuk Exit Strategy | nilai-bisnis-exit | bisnis | unisex | pensiun | 📝 | Business valuation |
| 3.9 | Passive Income dari Properti Sewa | passive-income-properti | investasi | unisex | produktif | 📝 | Rental income |
| 3.10 | Pajak Properti: Apa Saja yang Harus Dibayar? | pajak-properti | hukum | unisex | produktif | 📝 | Property taxes |
| 3.11 | Family Office: Apa dan Kenapa? | family-office | bisnis | unisex | pensiun | 📝 | Wealth management |
| 3.12 | Cara Negosiasi Harga Properti | negosiasi-properti | investasi | unisex | produktif | 📝 | Negotiation tactics |
| 3.13 | REITs vs Properti Fisik: Perbandingan | reits-vs-properti | investasi | unisex | produktif | 📝 | Investment comparison |
| 3.14 | Retirement Business Planning | retirement-business | bisnis | unisex | pensiun | 📝 | Exit planning |
| 3.15 | Legal Structure untuk Bisnis Properti | legal-bisnis-properti | hukum | unisex | produktif | 📝 | Business structure |

**Tier 3 Target:** 15 articles (100% research complete)

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

## Tier 1 Extended: Side Hustles & Skills
*150 business ideas and high-income skills for extra income*

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 1.26 | Makelar Sayur/Buah via TikTok Live | makelar-sayur-tiktok | bisnis | unisex | muda | 📝 | Rural arbitrage |
| 1.27 | Pengepul Kardus & Barang Bekas | pengepul-kardus | bisnis | unisex | produktif | 📝 | Recycling business |
| 1.28 | Budidaya Maggot (BSF) untuk Pakan Ternak | budidaya-maggot | bisnis | unisex | produktif | 📝 | Agribusiness |
| 1.29 | Agen BRILink / PPOB di Desa | agen-brilink | bisnis | unisex | produktif | 📝 | Financial services |
| 1.30 | Ternak Kambing Sistem Aqiqah/Qurban | ternak-kambing-aqiqah | bisnis | unisex | produktif | 📝 | Religious livestock |
| 1.31 | Makelar Tanah Desa | makelar-tanah-desa | bisnis | unisex | produktif | 📝 | Property brokerage |
| 1.32 | Supplier Daun Pisang ke Restoran | supplier-daun-pisang | bisnis | unisex | produktif | 📝 | Supply chain |
| 1.33 | Budidaya Jamur Tiram / Kuping | budidaya-jamur | bisnis | unisex | produktif | 📝 | Mushroom farming |
| 1.34 | Jasa Tebang & Potong Kayu | jasa-tebang-kayu | bisnis | unisex | muda | 📝 | Chainsaw service |
| 1.35 | Jastip Hasil Bumi Spesifik | jastip-hasil-bumi-spesifik | bisnis | unisex | muda | 📝 | Specialty products |
| 1.36 | Ternak Lele Sistem Bioflok | ternak-lele-bioflok | bisnis | unisex | produktif | 📝 | Fish farming |
| 1.37 | Produsen Pupuk Kompos | produsen-pupuk-kompos | bisnis | unisex | produktif | 📝 | Organic fertilizer |
| 1.38 | Makelar Hewan Ternak Online | makelar-hewan-ternak | bisnis | unisex | produktif | 📝 | Livestock broker |
| 1.39 | Budidaya Ikan Hias (Channa/Cupang) | budidaya-ikan-hias | bisnis | unisex | muda | 📝 | Ornamental fish |
| 1.40 | Jasa Bor Air / Sumur Artesis | jasa-bor-air | bisnis | unisex | produktif | 📝 | Well drilling |
| 1.41 | Pembuat Arang Batok Kelapa | pembuat-arang | bisnis | unisex | produktif | 📝 | Charcoal production |
| 1.42 | Supplier Kayu Bakar | supplier-kayu-bakar | bisnis | unisex | produktif | 📝 | Wood supply |
| 1.43 | Jasa Semprot Hama Pertanian | jasa-semprot-hama | bisnis | unisex | muda | 📝 | Pest control |
| 1.44 | Pengepul minyak Jelantah | pengepul-minyak-jelantah | bisnis | unisex | produktif | 📝 | Used oil recycling |
| 1.45 | Produsen Bibit Tanaman / Stek | produsen-bibit-tanaman | bisnis | unisex | produktif | 📝 | Plant nursery |

**Total: 20 ideas from KATEGORI 1 (Rural Hustler) - Full list continues below with next entries...**

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 1.46 | Konsultan Legalitas & HAKI UMKM | konsultan-legalitas-haki | bisnis | unisex | muda | 📝 | Legal consultant |
| 1.47 | Virtual Bookkeeper & Tax Filer | virtual-bookkeeper | karir | unisex | muda | 📝 | Accounting services |
| 1.48 | Freelance Headhunter Lokal | headhunter-lokal | karir | unisex | produktif | 📝 | Recruitment |
| 1.49 | Jasa Hitung RAB & Drafter Bangunan | jasa-rab-drafter | bisnis | unisex | muda | 📝 | Construction |
| 1.50 | Konsultan Gizi & Katering Diet | konsultan-gizi-katering | bisnis | unisex | muda | 📝 | Nutrition business |
| 1.51 | Penerjemah Tersumpah | penerjemah-tersumpah | karir | unisex | produktif | 📝 | Translation |
| 1.52 | Ghostwriter Buku Biografi | ghostwriter-biografi | karir | unisex | produktif | 📝 | Writing services |
| 1.53 | Konsultan Amdal / Lingkungan | konsultan-amdal | bisnis | unisex | produktif | 📝 | Environmental |
| 1.54 | Psikolog Online / Konselor | psikolog-online | karir | unisex | produktif | 📝 | Mental health |
| 1.55 | Tutor Privat Kurikulum Internasional | tutor-kurikulum-internasional | karir | unisex | muda | 📝 | Education |
| 1.56 | Data Analyst Freelance (UMKM) | data-analyst-umkm | karir | unisex | muda | 📋 | Analytics |
| 1.57 | Konsultan K3 (Keselamatan Kerja) | konsultan-k3 | bisnis | unisex | produktif | 📋 | Safety consulting |
| 1.58 | Jasa Pembuatan SOP Perusahaan | jasa-sop-perusahaan | bisnis | unisex | muda | 📋 | SOP services |
| 1.59 | Bimbingan Skripsi / Tesis | bimbingan-skripsi-tesis | karir | unisex | muda | 📋 | Academic consulting |
| 1.60 | Konsultan Digital Marketing | konsultan-digital-marketing | karir | unisex | muda | 📋 | Digital marketing |
| 1.61 | Jasa Konsultan Ekspor UMKM | bisnis | unisex | produktif | 📋 | Export consulting |
| 1.62 | Auditor Independen Skala Kecil | bisnis | unisex | produktif | 📋 | Auditing |
| 1.63 | Desainer Interior Niche Kosan | bisnis | unisex | muda | 📋 | Interior design |
| 1.64 | Konselor Pendidikan LN | karir | unisex | produktif | 📋 | Education abroad |
| 1.65 | Jasa Pitch Deck & Business Plan | bisnis | unisex | muda | 📋 | Startup services |
| 1.66 | Deep Cleaning Kasur & Sofa | bisnis | unisex | produktif | 📋 | Cleaning service |
| 1.67 | Spesialis Cuci AC & Maintenance | bisnis | unisex | produktif | 📋 | HVAC service |
| 1.68 | Jasa Perbaikan Pipa Mampet | bisnis | unisex | produktif | 📋 | Plumbing |
| 1.69 | MUA Spesialis Wisuda/Karakter | bisnis | female | muda | 📋 | Makeup artist |
| 1.70 | Jasa Seni Balon & Dekor | bisnis | unisex | muda | 📋 | Event decoration |
| 1.71 | Cuci Sepatu & Tas Premium | bisnis | unisex | muda | 📋 | Shoe cleaning |
| 1.72 | Jasa Poles Lantai | bisnis | unisex | produktif | 📋 | Floor polishing |
| 1.73 | Jasa Pet Sitter | bisnis | unisex | muda | 📋 | Pet care |
| 1.74 | Jasa Grooming Hewan Panggilan | bisnis | unisex | muda | 📋 | Mobile pet grooming |
| 1.75 | Jasa Pindahan Rumah | bisnis | unisex | produktif | 📋 | Moving service |
| 1.76 | Jasa Instalasi Smart Home | bisnis | unisex | muda | 📋 | Smart home |
| 1.77 | Pembersihan Pasca Renovasi | bisnis | unisex | produktif | 📋 | Post-con cleaning |
| 1.78 | Salon Mobil Panggilan | bisnis | unisex | produktif | 📋 | Mobile car wash |
| 1.79 | Jasa Rakit & Servis PC | bisnis | unisex | muda | 📋 | PC services |
| 1.80 | Jasa Hias Seserahan | bisnis | female | muda | 📋 | Wedding decoration |
| 1.81 | Jastip IKEA / Informa / Ace | bisnis | unisex | muda | 📋 | Errand service |
| 1.82 | Jasa Sedot WC / Limbah | bisnis | unisex | produktif | 📋 | Septic service |
| 1.83 | Tukang Kunci Panggilan | bisnis | unisex | produktif | 📋 | Locksmith |
| 1.84 | Sewa Genset Portable | bisnis | unisex | produktif | 📋 | Generator rental |
| 1.85 | Sewa Panggung & Tenda | bisnis | unisex | produktif | 📋 | Event rental |
| 1.86 | Sewa Peralatan Bayi | bisnis | unisex | produktif | 📋 | Baby equipment |
| 1.87 | Sewa Mainan Besar (Istana Balon) | bisnis | unisex | produktif | 📋 | Party rental |
| 1.88 | Sewa HT / Alat Komunikasi | bisnis | unisex | muda | 📋 | Radio rental |
| 1.89 | Sewa Alat Mendaki | bisnis | unisex | muda | 📋 | Camping gear |
| 1.90 | Sewa Kamera / Proyektor | bisnis | unisex | muda | 📋 | AV equipment |
| 1.91 | Sewa Baju Adat / Kostum | bisnis | unisex | produktif | 📋 | Costume rental |
| 1.92 | Sewa Scaffolding | bisnis | unisex | produktif | 📋 | Construction rental |
| 1.93 | Sewa Mobil Box / Pick Up | bisnis | unisex | produktif | 📋 | Vehicle rental |
| 1.94 | Makelar Motor / Mobil Bekas | bisnis | unisex | produktif | 📋 | Vehicle broker |
| 1.95 | Makelar Kost / Kontrakan | bisnis | unisex | muda | 📋 | Housing broker |
| 1.96 | Sewa PlayStation ke Rumah | bisnis | unisex | muda | 📋 | Gaming rental |
| 1.97 | Dropship Bahan Bangunan | bisnis | unisex | produktif | 📋 | Building materials |
| 1.98 | Sewa Gaun Pengantin | bisnis | female | produktif | 📋 | Wedding gown |
| 1.99 | Sewa Kipas Air / AC Standing | bisnis | unisex | produktif | 📋 | Cooling equipment |
| 1.100 | Makelar Kayu Jati | bisnis | unisex | produktif | 📋 | Timber broker |
| 1.101 | Admin Sosmed Toko Lokal | karir | unisex | muda | 📋 | Social media manager |
| 1.102 | Jasa Optimasi Google My Business | bisnis | unisex | muda | 📋 | GMB optimization |
| 1.103 | Food Reviewer Lokal | karir | unisex | muda | 📋 | Content creator |
| 1.104 | Jasa Fotografi Menu Makanan | bisnis | unisex | muda | 📋 | Food photography |
| 1.105 | Host Live Streaming E-commerce | karir | unisex | muda | 📋 | Live streaming |
| 1.106 | Makelar Influencer Lokal | bisnis | unisex | muda | 📋 | Influencer manager |
| 1.107 | Jasa Bikin Web UMKM Lokal | bisnis | unisex | muda | 📋 | Web development |
| 1.108 | Filter IG / TikTok Pernikahan | bisnis | unisex | muda | 📋 | AR filters |
| 1.109 | Jasa Voice Over Iklan Lokal | karir | unisex | muda | 📋 | Voice over |
| 1.110 | Desainer Grafis / PPT Premium | karir | unisex | muda | 📋 | Design services |
| 1.111 | Pembuat Video Profil Desa | bisnis | unisex | muda | 📋 | Video production |
| 1.112 | Jasa Undangan Website & Video | bisnis | unisex | muda | 📋 | Digital invitation |
| 1.113 | Dropshipper Sayur Organik | bisnis | unisex | produktif | 📋 | Organic produce |
| 1.114 | Jasa Hapus Latar Foto | bisnis | unisex | muda | 📋 | Photo editing |
| 1.115 | Jasa Setting FB Ads Lokal | bisnis | unisex | muda | 📋 | Ads manager |
| 1.116 | Jasa Tulis Caption Copywriting | karir | unisex | muda | 📋 | Copywriting |
| 1.117 | Penyedia Jasa Talent UGC | bisnis | unisex | muda | 📋 | UGC services |
| 1.118 | Jasa Setup POS Toko/Resto | bisnis | unisex | muda | 📋 | POS setup |
| 1.119 | Jasa Digitalisasi Dokumen | bisnis | unisex | muda | 📋 | Document scanning |
| 1.120 | Jasa Buka Toko Online | bisnis | unisex | muda | 📋 | E-commerce setup |
| 1.121 | YouTube Cashcow Video Editor | karir | unisex | muda | 📋 | Video editing |
| 1.122 | Short-Form Video Repurposer | karir | unisex | muda | 📋 | Content repurposing |
| 1.123 | Thumbnail Designer Spesialis | karir | unisex | muda | 📋 | Thumbnail design |
| 1.124 | UI/UX Designer (Figma) | karir | unisex | muda | 📋 | UI/UX design |
| 1.125 | Webflow / Framer Developer | karir | unisex | muda | 📋 | No-code development |
| 1.126 | Pitch Deck Designer | karir | unisex | muda | 📋 | Presentation design |
| 1.127 | 3D Modeler & Renderer | karir | unisex | muda | 📋 | 3D modeling |
| 1.128 | Notion Template Creator | karir | unisex | muda | 📋 | Template design |
| 1.129 | Podcast Audio Editor | karir | unisex | muda | 📋 | Audio editing |
| 1.130 | Font / Typeface Creator | karir | unisex | muda | 📋 | Typography |
| 1.131 | Direct Response Copywriter | karir | unisex | muda | 📋 | Copywriting |
| 1.132 | B2B SaaS Blog Writer | karir | unisex | muda | 📋 | Content writing |
| 1.133 | Twitter/LinkedIn Ghostwriter | karir | unisex | muda | 📋 | Ghostwriting |
| 1.134 | Subtitle / Caption Translator | karir | unisex | muda | 📋 | Translation |
| 1.135 | Technical Writer | karir | unisex | muda | 📋 | Technical writing |
| 1.136 | Email Deliverability Specialist | karir | unisex | muda | 📋 | Email marketing |
| 1.137 | Resume / LinkedIn Makeover | karir | unisex | muda | 📋 | Career services |
| 1.138 | Grant Writer | karir | unisex | produktif | 📋 | Proposal writing |
| 1.139 | E-book Formatter (KDP) | karir | unisex | muda | 📋 | Publishing |
| 1.140 | Indonesian Tutor for Foreigners | karir | unisex | muda | 📋 | Language tutoring |
| 1.141 | Executive Virtual Assistant | karir | unisex | muda | 📋 | VA services |
| 1.142 | Customer Support Ticket Manager | karir | unisex | muda | 📋 | Support services |
| 1.143 | Online Community Manager | karir | unisex | muda | 📋 | Community management |
| 1.144 | Lead Generation / Data Scraper | karir | unisex | muda | 📋 | Data services |
| 1.145 | Appointment Setter (DM Closer) | karir | unisex | muda | 📋 | Sales |
| 1.146 | E-commerce Product Lister | karir | unisex | muda | 📋 | Listing services |
| 1.147 | Podcast Booker | karir | unisex | muda | 📋 | Booking services |
| 1.148 | Discord Server Architect | karir | unisex | muda | 📋 | Tech services |
| 1.149 | Airtable / Notion Database Builder | karir | unisex | muda | 📋 | Database services |
| 1.150 | QA Tester | karir | unisex | muda | 📋 | Testing services |
| 1.151 | Google Ads Specialist (Local US) | karir | unisex | muda | 📋 | PPC advertising |
| 1.152 | Pinterest Account Manager | karir | unisex | muda | 📋 | Social media |
| 1.153 | SEO Link Builder | karir | unisex | muda | 📋 | SEO services |
| 1.154 | UGC Creator | karir | unisex | muda | 📋 | Content creation |
| 1.155 | Affiliate Marketing | karir | unisex | muda | 📋 | Affiliate |
| 1.156 | Zapier / Make Automation Expert | karir | unisex | muda | 📋 | Automation |
| 1.157 | Facebook/TikTok Ads Media Buyer | karir | unisex | muda | 📋 | Ads management |
| 1.158 | Dropship to US (Shopify) | bisnis | unisex | muda | 📋 | E-commerce |
| 1.159 | Cold Email Campaign Manager | karir | unisex | muda | 📋 | Email campaigns |
| 1.160 | CRO Specialist | karir | unisex | muda | 📋 | Optimization |
| 1.161 | Drop Servicing Agency | bisnis | unisex | muda | 📋 | Agency business |
| 1.162 | Remote Travel Planner | bisnis | unisex | muda | 📋 | Travel services |
| 1.163 | Spotify Playlist Curator | karir | unisex | muda | 📋 | Music curation |
| 1.164 | Music / Beat Producer | karir | unisex | muda | 📋 | Music production |
| 1.165 | Voice Over Artist (Bahasa Indonesia) | karir | unisex | muda | 📋 | Voice over |
| 1.166 | Shopify Store Developer | karir | unisex | muda | 📋 | E-commerce dev |
| 1.167 | Discord/Telegram Crypto Moderator | karir | unisex | muda | 📋 | Moderation |
| 1.168 | Print on Demand (Etsy/Redbubble) | bisnis | unisex | muda | 📋 | Print business |
| 1.169 | Etsy Digital Printables | bisnis | unisex | muda | 📋 | Digital products |
| 1.170 | Software Tester | karir | unisex | muda | 📋 | QA testing |

**Tier 1 Expansion Target:** 145 articles (0% complete)

---

## Tier 2 Expansion: Business Growth & Systematization

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 2.26 | Jebakan Lifestyle Creep & Inflasi Gaya Hidup | keuangan | unisex | produktif | 📋 | Financial psychology |
| 2.27 | Pemisahan Entitas: Rekening Pribadi vs Bisnis | keuangan | unisex | produktif | 📋 | Cash management |
| 2.28 | Konsep War Chest (Dana Perang Bisnis) | keuangan | unisex | productiva | 📋 | Business reserves |
| 2.29 | Dasar-dasar Paper Asset | investasi | unisex | productiva | 📋 | Investment basics |
| 2.30 | Visualisasi Alur Kerja (Workflow Mapping) | bisnis | unisex | productiva | 📋 | Operations |
| 2.31 | Pembuatan SOP Berbasis Video & Checklist | bisnis | unisex | productiva | 📋 | SOP development |
| 2.32 | Automasi Digital Dasar (No-Code Tools) | bisnis | unisex | productiva | 📋 | Automation |
| 2.33 | Quality Control (QC) & Standarisasi | bisnis | unisex | productiva | 📋 | Quality management |
| 2.34 | The First Hire Framework | bisnis | unisex | produktif | 📋 | Recruitment |
| 2.35 | Manajemen Kompensasi (Gaji vs Komisi) | bisnis | unisex | produktif | 📋 | HR strategy |
| 2.36 | Kepemimpinan Jarak Jauh | bisnis | unisex | produktif | 📋 | Remote management |
| 2.37 | Psikologi Delegasi | bisnis | unisex | produktif | 📋 | Leadership |
| 2.38 | Pivot B2C ke B2B | bisnis | unisex | produktif | 📋 | Revenue scaling |
| 2.39 | Model Bisnis Retainer | bisnis | unisex | produktif | 📋 | Recurring revenue |
| 2.40 | Upselling & Cross-Selling | bisnis | unisex | produktif | 📋 | Sales strategy |
| 2.41 | Skalabilitas Anggaran Iklan | bisnis | unisex | produktif | 📋 | Paid ads |
| 2.42 | Merapikan Laporan Keuangan | keuangan | unisex | produktif | 📋 | Financial reporting |
| 2.43 | Legalitas Badan Usaha Menengah | hukum | unisex | produktif | 📋 | Business entity |
| 2.44 | Mengelola Skor Kredit (SLIK OJK) | keuangan | unisex | produktif | 📋 | Credit score |
| 2.45 | Pajak UMKM & Pribadi | hukum | unisex | produktif | 📋 | Tax compliance |

**Tier 2 Expansion Target:** 20 articles (0% complete)

---

## Tier 3 Expansion: Property, Franchise & Wealth

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 3.16 | Transisi Kuadran: S ke I | investasi | unisex | produktif | 📋 | Investor mindset |
| 3.17 | Memerangi Pajak Siluman (Inflasi) | keuangan | unisex | produktif | 📋 | Inflation defense |
| 3.18 | Strategi Tiga Keranjang Dana | investasi | unisex | produktif | 📋 | Portfolio allocation |
| 3.19 | Seni Melakukan Due Diligence | investasi | unisex | produktif | 📋 | Investment analysis |
| 3.20 | Matematika Properti: Cap Rate & ROI | investasi | unisex | produktif | 📋 | Property math |
| 3.21 | Ekonomi Kos-kosan & Co-Living | investasi | unisex | produktif | 📋 |Rental business |
| 3.22 | Properti Komersial (Minimarket/Bank) | investasi | unisex | produktif | 📋 | Commercial property |
| 3.23 | Flipping Properti Kusam | investasi | unisex | produktif | 📋 | Property flipping |
| 3.24 | Anatomi Franchise yang Sehat | bisnis | unisex | produktif | 📋 | Franchise analysis |
| 3.25 | Model Operator vs Auto-Pilot | bisnis | unisex | produktif | 📋 | Franchise types |
| 3.26 | Strategi Multi-Unit Franchising | bisnis | unisex | produktif | 📋 | Scaling strategy |
| 3.27 | Akuisisi Bisnis Lokal (M&A) | bisnis | unisex | produktif | 📋 | Business acquisition |
| 3.28 | Dividend Investing | investasi | unisex | produktif | 📋 | Stock dividends |
| 3.29 | Obligasi Korporasi & SBN Besar | investasi | unisex | produktif | 📋 | Bond investing |
| 3.30 | Menjadi Angel Investor | investasi | unisex | produktif | 📋 | Angel investing |
| 3.31 | Diversifikasi Saham Global | investasi | unisex | produktif | 📋 | Global stocks |
| 3.32 | OPM: Hutang Baik vs Buruk | keuangan | unisex | produktif | 📋 | Debt strategy |
| 3.33 | Menyiasati Pajak Lewat Aset | hukum | unisex | produktif | 📋 | Tax optimization |
| 3.34 | Exit Strategy Bisnis | bisnis | unisex | produktif | 📋 | Business exit |
| 3.35 | Mitigasi Risiko Multi-Aset | keuangan | unisex | produktif | 📋 | Risk management |

**Tier 3 Expansion Target:** 20 articles (0% complete)

---

## Summary Statistics

| Tier | Target Articles | Published | % Complete |
|------|----------------|-----------|------------|
| Tier 0: Survival | 11 | 0 | 0% |
| Tier 1: Hustler | 25 | 0 | 100% Research |
| Tier 2: Scaler | 25 | 0 | 100% Research |
| Tier 3: Asset Builder | 15 | 0 | 100% Research |
| Tier 4: Legacy | 15 | 0 | 0% |
| Tier 1 Expansion | 145 | 0 | 0% |
| Tier 2 Expansion | 20 | 0 | 0% |
| Tier 3 Expansion | 20 | 0 | 0% |
| **TOTAL** | **261** | **0** | **0%** |
