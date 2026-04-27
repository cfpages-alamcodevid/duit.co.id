# Duit.co.id Article Catalog & Progress Tracker

## Overview
Master list of all planned articles organized by tier. Use this document to:
- Plan content creation
- Track writing progress
- Assign taxonomy tags
- Coordinate bulk article generation
- Monitor publication status

**Important:** Every article MUST have a companion YouTube video. The video can be created before or after the article, but both must exist. Add `youtube_url` to frontmatter once video is ready.

## Publication Scheduling Rules (Mandatory for Bulk):
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
| 0.1 | Panduan Lengkap Bebas dari Jerat Pinjol Online | panduan-lunas-pinjol | hukum, keuangan | unisex | produktif | ✅ | Must-read for all tiers |
| 0.2 | Panduan Lengkap: Cara Menghadapi Debt Collector Ilegal Tanpa Takut (Edisi 2025-2026) | menghadapi-debt-collector | hukum | unisex | produktif | ✅ | Phone/Digital harassment |
| 0.3 | Panduan Menghadapi Debt Collector Lapangan (Home Visit): Hak Anda & Aturan OJK Terbaru 2025-2026 | panduan-debt-collector | hukum | unisex | produktif | ✅ | Field collection focus |
| 0.4 | Langkah Hukum Jika Terjerat Pinjol Ilegal | langkah-hukum-pinjol | hukum | unisex | produktif | ✅ | Legal escalation guide |
| 0.5 | Cara Melaporkan Pinjol Ilegal ke OJK & Polisi: Panduan Lengkap & Contoh Surat Laporan | laporkan-pinjol-ilegal | hukum | unisex | produktif | ✅ | Official reporting channels |
| 0.6 | Budgeting Darurat: Hidup dari Gaji UMR | budgeting-darurat-umr | keuangan | unisex | produktif | ✅ | Practical examples |
| 0.7 | Pinjol Legal vs Ilegal 2026: Cara Bedakan dalam 5 Menit (Anti-Jebak) | bedakan-pinjol-legal-ilegal | hukum | unisex | muda | ✅ | Educational basics |
| 0.8 | Cara Negosiasi Utang dengan Kreditur | negosiasi-utang | keuangan | unisex | produktif | ✅ | Negotiation tactics |
| 0.9 | Perlindungan Hukum untuk Debitur | perlindungan-debitur | hukum | unisex | produktif | ✅ | UU protection laws |
| 0.10 | Emergency Fund: Mulai dari Rp 10rb/hari | emergency-fund-murah | keuangan | unisex | muda | ✅ | Micro-saving tips |
| 0.11 | Tanda-Tanda Skema Pinjaman Berbahaya | tanda-pinjol-berbahaya | hukum | unisex | muda | ✅ | Prevention focused |

**Tier 0 Target:** 11 articles (0% complete)

---

## Tier 1: The Hustler (Side Hustles & High-Income Skills)
**Target Audience:** Youth, fresh graduates, UMR workers
**Content Focus:** Extra income, skill development, zero-risk business models

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 1.1 | 15 Side Hustle Modal Kecil untuk Mahasiswa | side-hustle-mahasiswa | bisnis | unisex | muda | ✅ | Low capital focus |
| 1.2 | Cara Jastip untuk Pemula | jastip-pemula | bisnis | female | muda | ✅ | Step-by-step guide |
| 1.3 | Skill High-Income yang Bisa Dipelajari Otodidak | skill-otodidak | karir | unisex | muda | ✅ | Self-learning resources |
| 1.4 | Bisnis Online Shop dari Nol | online-shop-nol | bisnis | unisex | produktif | ✅ | E-commerce basics |
| 1.5 | Cara Dapat Klien Pertama Freelance | klien-pertama-freelance | karir | unisex | muda | ✅ | Portfolio building |
| 1.6 | Dropship vs Reseller: Mana Lebih Untung? | dropship-vs-reseller | bisnis | unisex | muda | ✅ | Comparison guide |
| 1.7 | Jualan Makanan Online: Panduan Lengkap | jualan-makanan-online | bisnis | unisex | produktif | ✅ | Food business |
| 1.8 | Cara Mulai Jastip Barang Mewah | jastip-barang-mewah | bisnis | female | produktif | ✅ | Luxury goods |
| 1.9 | Content Creator: Dari Hobi Jadi Cuan | content-creator-cuan | karir | unisex | muda | ✅ | Social media income |
| 1.10 | Tutorial Jadi Admin Olshop Professional | admin-olshop-pro | karir | unisex | muda | ✅ | Virtual assistant |
| 1.11 | Cara Hitung Harga Jual Produk | hitung-harga-jual | bisnis | unisex | produktif | ✅ | Pricing strategy |
| 1.12 | 10 Ide Bisnis Modal di Bawah 1 Juta | bisnis-modal-1juta | bisnis | unisex | muda | ✅ | Low capital ideas |
| 1.13 | Tips Negotiasi Gaji untuk Fresh Graduate | negosiasi-gaji | karir | unisex | muda | ✅ | Salary tactics |
| 1.14 | Cara Bikin CV dan Portfolio yang Menarik | cv-portfolio-menarik | karir | unisex | muda | ✅ | Job application |
| 1.15 | Passive Income untuk Karyawan | passive-income-karyawan | bisnis | unisex | produktif | ✅ | Extra income streams |
| 1.16 | Cara Buat PT Perorangan Tanpa Modal Besar | cara-buat-pt-perorangan | hukum | unisex | muda | ✅ | UU Cipta Kerja focus |
| 1.17 | Jastip Hasil Bumi: Peluang Cuan dari Desa ke Kota | jastip-hasil-bumi | bisnis | unisex | produktif | ✅ | Rural-urban arbitrage |
| 1.18 | Bisnis Deep Cleaning: Kasur, Sofa, & AC | bisnis-deep-cleaning | bisnis | unisex | produktif | ✅ | Urban service |
| 1.19 | Panduan Makelar Properti Lokal Tanpa Modal | makelar-properti-lokal | bisnis | unisex | produktif | ✅ | Local brokerage |
| 1.20 | Strategi Bisnis Pre-Order (PO) Anti-Rugi | strategi-bisnis-po | bisnis | unisex | muda | ✅ | Zero risk model |
| 1.21 | Peluang Cuan dari TikTok Live di Desa | tiktok-live-desa | bisnis | unisex | muda | ✅ | Content commerce |
| 1.22 | Jadi Virtual Assistant (VA) Klien Luar Negeri | virtual-assistant-global | karir | unisex | muda | ✅ | Global freelancing |
| 1.23 | Cara Validasi Ide Bisnis Tanpa Modal | validasi-ide-bisnis | bisnis | unisex | muda | ✅ | Market research |
| 1.24 | Ekonomi Jasa Berbasis Keringat (Sweat Equity) | sweat-equity-jasa | bisnis | unisex | produktif | ✅ | Service business |
| 1.25 | Dana Darurat Level 1: Amankan Rp 3 Juta Pertama | emergency-fund-level-1 | keuangan | unisex | muda | ✅ | Financial defense |
| 1.26 | Makelar Sayur/Buah via TikTok Live | makelar-sayur-tiktok | bisnis | unisex | muda | ✅ | Rural arbitrage |
| 1.27 | Pengepul Kardus & Barang Bekas | pengepul-kardus | bisnis | unisex | produktif | ✅ | Recycling business |
| 1.28 | Budidaya Maggot (BSF) untuk Pakan Ternak | budidaya-maggot | bisnis | unisex | produktif | ✅ | Agribusiness |
| 1.29 | Agen BRILink / PPOB di Desa | agen-brilink | bisnis | unisex | produktif | ✅ | Financial services |
| 1.30 | Ternak Kambing Sistem Aqiqah/Qurban | ternak-kambing-aqiqah | bisnis | unisex | produktif | ✅ | Religious livestock |
| 1.31 | Makelar Tanah Desa (Broker Lokal) | makelar-tanah-desa | bisnis | unisex | produktif | ✅ | Property brokerage |
| 1.32 | Supplier Daun Pisang ke Restoran | supplier-daun-pisang | bisnis | unisex | produktif | ✅ | Supply chain |
| 1.33 | Budidaya Jamur Tiram / Kuping | budidaya-jamur | bisnis | unisex | produktif | ✅ | Mushroom farming |
| 1.34 | Jasa Tebang & Potong Kayu (Chainsaw) | jasa-tebang-kayu | bisnis | unisex | muda | ✅ | Chainsaw service |
| 1.35 | Jastip Hasil Bumi Spesifik (Madu, Kopi) | jastip-hasil-bumi | bisnis | unisex | muda | ✅ | Specialty products |
| 1.35a | Jastip Hasil Bumi Spesifik | jastip-hasil-bumi-spesifik | bisnis | unisex | produktif | ✅ | Specialty products |
| 1.36 | Ternak Lele Sistem Bioflok | ternak-lele-bioflok | bisnis | unisex | produktif | ✅ | Fish farming |
| 1.37 | Produsen Pupuk Kompos Mandiri | produsen-pupuk-kompos | bisnis | unisex | produktif | ✅ | Organic fertilizer |
| 1.38 | Makelar Hewan Ternak Online | makelar-hewan-ternak | bisnis | unisex | produktif | ✅ | Livestock broker |
| 1.39 | Budidaya Ikan Hias (Channa/Cupang) | budidaya-ikan-hias | bisnis | unisex | muda | ✅ | Ornamental fish |
| 1.40 | Jasa Bor Air / Sumur Artesis | jasa-bor-air | bisnis | unisex | produktif | ✅ | Well drilling |
| 1.41 | Pembuat Arang Batok Kelapa | pembuat-arang | bisnis | unisex | produktif | ✅ | Charcoal production |
| 1.42 | Supplier Kayu Bakar / Serbuk Gergaji | supplier-kayu-bakar | bisnis | unisex | produktif | ✅ | Wood supply |
| 1.43 | Jasa Semprot Hama Pertanian (Drone) | jasa-semprot-hama | bisnis | unisex | muda | ✅ | Pest control |
| 1.44 | Pengepul minyak Jelantah | pengepul-minyak-jelantah | bisnis | unisex | produktif | ✅ | Used oil recycling |
| 1.45 | Produsen Bibit Tanaman / Stek | produsen-bibit-tanaman | bisnis | unisex | produktif | ✅ | Plant nursery |
| 1.46 | Konsultan Legalitas & HAKI UMKM | konsultan-legalitas-haki | bisnis | unisex | muda | ✅ | Legal consultant |
| 1.47 | Virtual Bookkeeper & Tax Filer | virtual-bookkeeper | karir | unisex | muda | ✅ | Accounting services |
| 1.48 | Freelance Headhunter Lokal | headhunter-lokal | karir | unisex | produktif | ✅ | Recruitment |
| 1.49 | Jasa Hitung RAB & Drafter Bangunan | jasa-rab-drafter | bisnis | unisex | muda | ✅ | Construction |
| 1.50 | Konsultan Gizi & Katering Diet | konsultan-gizi-katering | bisnis | unisex | muda | ✅ | Nutrition business |
| 1.51 | Penerjemah Tersumpah | penerjemah-tersumpah | karir | unisex | produktif | ✅ | Translation |
| 1.52 | Ghostwriter Buku Biografi | ghostwriter-biografi | karir | unisex | produktif | ✅ | Writing services |
| 1.53 | Konsultan Amdal / Lingkungan | konsultan-amdal | bisnis | unisex | produktif | ✅ | Environmental |
| 1.54 | Psikolog Online / Konselor | psikolog-online | karir | unisex | produktif | ✅ | Mental health |
| 1.55 | Tutor Privat Kurikulum Internasional | tutor-kurikulum-internasional | karir | unisex | muda | ✅ | Education |
| 1.56 | Data Analyst Freelance (UMKM) | data-analyst-umkm | karir | unisex | muda | ✅ | Analytics |
| 1.57 | Konsultan K3 (Keselamatan Kerja) | konsultan-k3 | bisnis | unisex | produktif | ✅ | Safety consulting |
| 1.58 | Jasa Pembuatan SOP Perusahaan | jasa-sop-perusahaan | bisnis | unisex | muda | ✅ | SOP services |
| 1.59 | Bimbingan Skripsi / Tesis | bimbingan-skripsi-tesis | karir | unisex | muda | ✅ | Academic consulting |
| 1.60 | Konsultan Digital Marketing | konsultan-digital-marketing | karir | unisex | muda | ✅ | Digital marketing |
| 1.61 | Jasa Konsultan Ekspor UMKM | jasa-konsultan-ekspor | bisnis | unisex | produktif | ✅ | Export consulting |
| 1.62 | Auditor Independen Skala Kecil | auditor-independen | bisnis | unisex | produktif | ✅ | Auditing |
| 1.63 | Desainer Interior Niche (Spesialis Kosan) | desainer-interior-kosan | bisnis | unisex | muda | ✅ | Interior design |
| 1.64 | Konselor Pendidikan LN | konselor-pendidikan-ln | karir | unisex | produktif | ✅ | Education abroad |
| 1.65 | Jasa Pitch Deck & Business Plan | jasa-pitch-deck | bisnis | unisex | muda | ✅ | Startup services |
| 1.66 | Deep Cleaning Kasur & Sofa | bisnis-deep-cleaning | bisnis | unisex | produktif | ✅ | Cleaning service |
| 1.67 | Spesialis Cuci AC & Maintenance | spesialis-cuci-ac | bisnis | unisex | produktif | ✅ | HVAC service |
| 1.68 | Jasa Perbaikan Pipa Mampet | jasa-perbaikan-pipa | bisnis | unisex | produktif | ✅ | Plumbing |
| 1.69 | MUA Spesialis Wisuda/Karakter | mua-spesialis | bisnis | female | muda | ✅ | Makeup artist |
| 1.70 | Jasa Seni Balon & Dekor | jasa-seni-balon | bisnis | unisex | muda | ✅ | Event decoration |
| 1.71 | Cuci Sepatu & Tas Premium | cuci-sepatu-tas | bisnis | unisex | muda | ✅ | Shoe cleaning |
| 1.72 | Jasa Poles Lantai | jasa-poles-lantai | bisnis | unisex | produktif | ✅ | Floor polishing |
| 1.73 | Jasa Pet Sitter | jasa-pet-sitter | bisnis | unisex | muda | ✅ | Pet care |
| 1.74 | Jasa Grooming Hewan Panggilan | jasa-grooming-hewan | bisnis | unisex | muda | ✅ | Mobile pet grooming |
| 1.75 | Jasa Pindahan Rumah | jasa-pindahan-rumah | bisnis | unisex | produktif | ✅ | Moving service |
| 1.76 | Jasa Instalasi Smart Home | jasa-instalasi-smart | bisnis | unisex | muda | ✅ | Smart home |
| 1.77 | Pembersihan Pasca Renovasi | pembersihan-pasca-renovasi | bisnis | unisex | produktif | ✅ | Post-con cleaning |
| 1.78 | Salon Mobil Panggilan | salon-mobil-panggilan | bisnis | unisex | produktif | ✅ | Mobile car wash |
| 1.79 | Jasa Rakit & Servis PC | jasa-rakit-servis-pc | bisnis | unisex | muda | ✅ | PC services |
| 1.80 | Jasa Hias Seserahan | jasa-hias-seserahan | bisnis | female | muda | ✅ | Wedding decoration |
| 1.81 | Jastip IKEA / Informa / Ace | jastip-ikea-informa | bisnis | unisex | muda | ✅ | Errand service |
| 1.82 | Jasa Sedot WC / Limbah | jasa-sedot-wc | bisnis | unisex | produktif | ✅ | Septic service |
| 1.83 | Tukang Kunci Panggilan | tukang-kunci-panggilan | bisnis | unisex | produktif | ✅ | Locksmith |
| 1.84 | Sewa Genset Portable | sewa-genset-portable | bisnis | unisex | produktif | ✅ | Generator rental |
| 1.85 | Sewa Panggung & Tenda | sewa-panggung-tenda | bisnis | unisex | produktif | ✅ | Event rental |
| 1.86 | Sewa Peralatan Bayi | sewa-peralatan-bayi | bisnis | unisex | produktif | ✅ | Baby equipment |
| 1.87 | Sewa Mainan Besar (Istana Balon) | sewa-mainan-besar | bisnis | unisex | produktif | ✅ | Party rental |
| 1.88 | Sewa HT / Alat Komunikasi | sewa-ht-komunikasi | bisnis | unisex | muda | ✅ | Radio rental |
| 1.89 | Sewa Alat Mendaki | sewa-alat-mendaki | bisnis | unisex | muda | ✅ | Camping gear |
| 1.90 | Sewa Kamera / Proyektor | sewa-kamera-proyektor | bisnis | unisex | muda | 📋 | AV equipment |
| 1.91 | Sewa Baju Adat / Kostum | sewa-baju-adat | bisnis | unisex | produktif | 📋 | Costume rental |
| 1.92 | Sewa Scaffolding | sewa-scaffolding | bisnis | unisex | produktif | 📋 | Construction rental |
| 1.93 | Sewa Mobil Box / Pick Up | sewa-mobil-box | bisnis | unisex | produktif | 📋 | Vehicle rental |
| 1.94 | Makelar Motor / Mobil Bekas | makelar-motor-mobil | bisnis | unisex | produktif | 📋 | Vehicle broker |
| 1.95 | Makelar Kost / Kontrakan | makelar-kost-kontrakan | bisnis | unisex | muda | 📋 | Housing broker |
| 1.96 | Sewa PlayStation ke Rumah | sewa-playstation-rumah | bisnis | unisex | muda | 📋 | Gaming rental |
| 1.97 | Dropship Bahan Bangunan | dropship-bahan-bangunan | bisnis | unisex | produktif | 📋 | Building materials |
| 1.98 | Sewa Gaun Pengantin | sewa-gaun-pengantin | bisnis | female | produktif | 📋 | Wedding gown |
| 1.99 | Sewa Kipas Angin Air (Misty Fan) / AC Standing | sewa-kipas-angin | bisnis | unisex | produktif | 📋 | Cooling equipment |
| 1.100 | Makelar Kayu Jati | makelar-kayu-jati | bisnis | unisex | produktif | 📋 | Timber broker |
| 1.101 | Admin Sosmed Toko Lokal | admin-sosmed-toko | karir | unisex | muda | 📋 | Social media manager |
| 1.102 | Jasa Optimasi Google My Business | optimasi-gmb | bisnis | unisex | muda | 📋 | GMB optimization |
| 1.103 | Food Reviewer Lokal | food-reviewer-lokal | karir | unisex | muda | 📋 | Content creator |
| 1.104 | Jasa Fotografi Menu Makanan | jasa-fotografi-menu | bisnis | unisex | muda | 📋 | Food photography |
| 1.105 | Host Live Streaming E-commerce | host-live-streaming | karir | unisex | muda | 📋 | Live streaming |
| 1.106 | Makelar Influencer Lokal | makelar-influencer | bisnis | unisex | muda | 📋 | Influencer manager |
| 1.107 | Jasa Bikin Web UMKM Lokal | jasa-bikin-web-umkm | bisnis | unisex | muda | 📋 | Web development |
| 1.108 | Filter IG / TikTok Pernikahan | filter-ig-tiktok | bisnis | unisex | muda | 📋 | AR filters |
| 1.109 | Jasa Voice Over Iklan Lokal | voice-over-iklan | karir | unisex | muda | 📋 | Voice over |
| 1.110 | Desainer Grafis / PPT Premium | desainer-grafis-ppt | karir | unisex | muda | 📋 | Design services |
| 1.111 | Pembuat Video Profil Desa | video-profil-desa | bisnis | unisex | muda | 📋 | Video production |
| 1.112 | Jasa Undangan Website & Video | undangan-website-video | bisnis | unisex | muda | 📋 | Digital invitation |
| 1.113 | Dropshipper Sayur Organik via WA Grup | dropshipper-sayur | bisnis | unisex | produktif | 📋 | Organic produce |
| 1.114 | Jasa Hapus Latar Foto | hapus-latar-foto | bisnis | unisex | muda | 📋 | Photo editing |
| 1.115 | Jasa Setting FB Ads Lokal | setting-fb-ads | bisnis | unisex | muda | 📋 | Ads manager |
| 1.116 | Jasa Tulis Caption / Copywriting | tulis-caption | karir | unisex | muda | 📋 | Copywriting |
| 1.117 | Penyedia Jasa Talent UGC | penyedia-jasa-talent | bisnis | unisex | muda | 📋 | UGC services |
| 1.118 | Jasa Setup POS Toko/Resto | setup-pos-toko | bisnis | unisex | muda | 📋 | POS setup |
| 1.119 | Jasa Digitalisasi Dokumen | digitalisasi-dokumen | bisnis | unisex | muda | 📋 | Document scanning |
| 1.120 | Jasa Buka Toko Online | buka-toko-online | bisnis | unisex | muda | 📋 | E-commerce setup |
| 1.121 | YouTube Cashcow Video Editor | youtube-editor | karir | unisex | muda | 📋 | Video editing |
| 1.122 | Short-Form Video Repurposer | short-form-video | karir | unisex | muda | 📋 | Content repurposing |
| 1.123 | Thumbnail Designer Spesialis | thumbnail-designer | karir | unisex | muda | 📋 | Thumbnail design |
| 1.124 | UI/UX Designer (Figma) | ui-ux-designer | karir | unisex | muda | 📋 | UI/UX design |
| 1.125 | Webflow / Framer Developer | webflow-framer | karir | unisex | muda | 📋 | No-code development |
| 1.126 | Pitch Deck Designer | pitch-deck-designer | karir | unisex | muda | 📋 | Presentation design |
| 1.127 | 3D Modeler & Renderer | 3d-modeler | karir | unisex | muda | 📋 | 3D modeling |
| 1.128 | Notion Template Creator | notion-template | karir | unisex | muda | 📋 | Template design |
| 1.129 | Podcast Audio Editor | podcast-editor | karir | unisex | muda | 📋 | Audio editing |
| 1.130 | Font / Typeface Creator | font-creator | karir | unisex | muda | 📋 | Typography |
| 1.131 | Direct Response Copywriter | direct-response-copywriter | karir | unisex | muda | 📋 | Copywriting |
| 1.132 | B2B SaaS Blog Writer | saas-blog-writer | karir | unisex | muda | 📋 | Content writing |
| 1.133 | Twitter/LinkedIn Ghostwriter | twitter-ghostwriter | karir | unisex | muda | 📋 | Ghostwriting |
| 1.134 | Subtitle / Caption Translator | subtitle-translator | karir | unisex | muda | 📋 | Translation |
| 1.135 | Technical Writer | technical-writer | karir | unisex | muda | 📋 | Technical writing |
| 1.136 | Email Deliverability Specialist | email-deliverability | karir | unisex | muda | 📋 | Email marketing |
| 1.137 | Resume / LinkedIn Makeover | resume-linkedin | karir | unisex | muda | 📋 | Career services |
| 1.138 | Grant Writer | grant-writer | karir | unisex | produktif | 📋 | Proposal writing |
| 1.139 | E-book Formatter (KDP) | ebook-formatter | karir | unisex | muda | 📋 | Publishing |
| 1.140 | Indonesian Tutor for Foreigners | indonesian-tutor | karir | unisex | muda | 📋 | Language tutoring |
| 1.141 | Executive Virtual Assistant | executive-va | karir | unisex | muda | 📋 | Language tutoring |
| 1.142 | Customer Support Ticket Manager | customer-support | karir | unisex | muda | 📋 | Support services |
| 1.143 | Online Community Manager | community-manager | karir | unisex | muda | 📋 | Community management |
| 1.144 | Lead Generation / Data Scraper | lead-generation | karir | unisex | muda | 📋 | Data services |
| 1.145 | Appointment Setter (DM Closer) | appointment-setter | karir | unisex | muda | 📋 | Sales |
| 1.146 | E-commerce Product Lister | product-lister | karir | unisex | muda | 📋 | Listing services |
| 1.147 | Podcast Booker | podcast-boker | karir | unisex | muda | 📋 | Booking services |
| 1.148 | Discord Server Architect | discord-architect | karir | unisex | muda | 📋 | Tech services |
| 1.149 | Airtable / Notion Database Builder | notion-database | karir | unisex | muda | 📋 | Database services |
| 1.150 | QA Tester | qa-tester | karir | unisex | muda | 📋 | Testing services |
| 1.151 | Google Ads Specialist (Local US) | google-ads-specialist | karir | unisex | muda | 📋 | PPC advertising |
| 1.152 | Pinterest Account Manager | pinterest-manager | karir | unisex | muda | 📋 | Social media |
| 1.153 | SEO Link Builder | seo-link-builder | karir | unisex | muda | 📋 | SEO services |
| 1.154 | UGC Creator | ugc-creator | karir | unisex | muda | 📋 | Content creation |
| 1.155 | Affiliate Marketing | affiliate-marketing | karir | unisex | muda | 📋 | Affiliate |
| 1.156 | Zapier / Make Automation Expert | zapier-automation | karir | unisex | muda | 📋 | Automation |
| 1.157 | Facebook/TikTok Ads Media Buyer | fb-tiktok-ads | karir | unisex | muda | 📋 | Ads management |
| 1.158 | Dropship to US (Shopify) | dropship-shopify | bisnis | unisex | muda | 📋 | E-commerce |
| 1.159 | Cold Email Campaign Manager | cold-email-manager | karir | unisex | muda | 📋 | Email campaigns |
| 1.160 | CRO Specialist | cro-specialist | karir | unisex | muda | 📋 | Optimization |
| 1.161 | Drop Servicing Agency | drop-servicing | bisnis | unisex | muda | 📋 | Agency business |
| 1.162 | Remote Travel Planner | remote-travel | bisnis | unisex | muda | 📋 | Travel services |
| 1.163 | Spotify Playlist Curator | spotify-curator | karir | unisex | muda | 📋 | Music curation |
| 1.164 | Music / Beat Producer | music-producer | karir | unisex | muda | 📋 | Music production |
| 1.165 | Voice Over Artist (Bahasa Indonesia) | voice-over-artist | karir | unisex | muda | 📋 | Voice over |
| 1.166 | Shopify Store Developer | shopify-developer | karir | unisex | muda | 📋 | E-commerce dev |
| 1.167 | Discord/Telegram Crypto Moderator | crypto-moderator | karir | unisex | muda | 📋 | Moderation |
| 1.168 | Print on Demand (Etsy/Redbubble) | print-on-demand | bisnis | unisex | muda | 📋 | Print business |
| 1.169 | Etsy Digital Printables | etsy-printables | bisnis | unisex | muda | 📋 | Digital products |
| 1.170 | Software Tester | software-tester | karir | unisex | muda | 📋 | QA testing |

**Tier 1 Target:** 170 articles (90 complete, 80 research pending)

---

## Tier 2: The Scaler (Business Scaling & Financial Planning)
**Target Audience:** Managers, professionals, small business owners
**Content Focus:** Systematization, scaling, paper assets, financial planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 2.1 | Cara Scale-Up UMKM dari 0 ke 100 Juta/bulan | scale-up-umkm | bisnis | unisex | produktif | ✅ | Growth strategy |
| 2.2 | Panduan Lengkap Reksa Dana untuk Pemula | reksa-dana-pemula | investasi | unisex | produktif | ✅ | Investment basics |
| 2.3 | Cara Buat SOP Bisnis yang Efektif | sop-bisnis-efektif | bisnis | unisex | produktif | ✅ | Operations management |
| 2.4 | Obligasi Negara vs Obligasi Korporasi | obligasi-negara-korporasi | investasi | unisex | produktif | ✅ | Bond comparison |
| 2.5 | Financial Planning untuk Keluarga Muda | financial-planning-keluarga | keuangan | unisex | produktif | ✅ | Family finance |
| 2.6 | Cara Mulai Investasi Saham Blue-Chip | saham-blue-chip | investasi | unisex | produktif | ✅ | Stock investing |
| 2.7 | Pajak untuk Freelancer dan Pengusaha | pajak-freelancer | hukum | unisex | produktif | ✅ | Tax obligations |
| 2.8 | Asuransi Kesehatan vs Asuransi Jiwa | asuransi-kesehatan-jiwa | keuangan | unisex | produktif | ✅ | Insurance guide |
| 2.9 | Cara Analisis Bisnis Sebelum Ekspansi | analisis-bisnis-expansi | bisnis | unisex | produktif | ✅ | Due diligence |
| 2.9a | Cara Analisis Bisnis Sebelum Ekspansi | analisis-bisnis-ekspansi | bisnis | unisex | produktif | ✅ | Expansion strategy |
| 2.10 | Dividen Investing | dividen-investing | investasi | unisex | produktif | ✅ | Dividend strategy |
| 2.11 | The First Hire: Strategi Rekrut Tim Pertama | rekrutmen-tim-pertama | bisnis | unisex | produktif | ✅ | Team building |
| 2.11a | Cara Hire dan Train Tim Pertama Anda | hire-tim-pertama | bisnis | unisex | produktif | ✅ | Hiring |
| 2.12 | Manajemen Cash Flow untuk UMKM | cash-flow-umkm | keuangan | unisex | produktif | ✅ | Cash management |
| 2.13 | ETF vs Saham Individual: Mana Lebih Baik? | etf-vs-saham | investasi | unisex | produktif | ✅ | Investment vehicles |
| 2.14 | Cara Bikin Business Plan yang Menarik | business-plan | bisnis | unisex | produktif | ✅ | Planning template |
| 2.15 | Retirement Planning di Usia 30-an | retirement-30an | keuangan | unisex | produktif | ✅ | Early retirement |
| 2.16 | Jebakan Lifestyle Creep: Gaji Naik Tabungan Nol | jebakan-lifestyle-creep | keuangan | unisex | produktif | ✅ | Financial psychology |
| 2.17 | Pemisahan Entitas: Rekening Pribadi vs Bisnis | pemisahan-rekening-bisnis | keuangan | unisex | produktif | ✅ | Cash management |
| 2.18 | Konsep War Chest (Dana Perang Bisnis) | war-chest-bisnis | keuangan | unisex | produktif | ✅ | Business reserves |
| 2.19 | Dasar-dasar Paper Asset | paper-asset | investasi | unisex | produktif | 📝 | Investment basics |
| 2.20 | Visualisasi Alur Kerja (Workflow Mapping) | workflow-mapping-bisnis | bisnis | unisex | produktif | ✅ | Operations |
| 2.21 | Pembuatan SOP Berbasis Video & Checklist | sop-video-checklist | bisnis | unisex | produktif | 📝 | SOP development |
| 2.22 | Automasi Digital Dasar (No-Code Tools) | automasi-umkm-nocode | bisnis | unisex | produktif | ✅ | Automation |
| 2.23 | Quality Control (QC) & Standarisasi | qc-standarisasi | bisnis | unisex | produktif | 📝 | Quality management |
| 2.24 | The First Hire Framework | first-hire-framework | bisnis | unisex | produktif | 📝 | Recruitment |
| 2.25 | Manajemen Kompensasi (Gaji vs Komisi) | manajemen-kompensasi-tim | bisnis | unisex | produktif | ✅ | HR strategy |
| 2.26 | Transformasi Digital untuk UMKM | transformasi-digital-umkm | bisnis | unisex | produktif | 📝 | Digital transformation |
| 2.27 | Strategi Pelanggan (Customer Retention) | retensi-pelanggan | bisnis | unisex | produktif | 📝 | Loyalty strategy |
| 2.28 | Strategi Pricing & Markup Calculation | pricing-markup-bisnis | bisnis | unisex | produktif | 📝 | Pricing strategy |
| 2.29 | Memahami Rasio Keuangan Bisnis | rasio-keuangan-bisnis | keuangan | unisex | produktif | 📝 | Financial analysis |
| 2.30 | Passive Income vs Active Income | passive-active-income | keuangan | unisex | produktif | 📝 | Income types |
| 2.31 | Membangun Skor Kredit Bisnis (SLIK OJK) | skor-kredit-bisnis | keuangan | unisex | produktif | 📝 | Business credit |
| 2.32 | Vendor Management & Negosiasi | vendor-management | bisnis | unisex | produktif | 📝 | Supplier relations |
| 2.33 | Sistem Manajemen Inventori | manajemen-inventori | bisnis | unisex | produktif | 📝 | Inventory control |
| 2.34 | Monthly Financial Review Process | review-keuangan-bulanan | keuangan | unisex | produktif | 📝 | Financial routine |
| 2.35 | Tools & Software untuk Business Scaling | tools-scaling-bisnis | bisnis | unisex | produktif | 📝 | Tech stack |
| 2.36 | Mengoptimalkan Customer Acquisition Cost | optimalisasi-cac | bisnis | unisex | produktif | 📝 | Marketing cost |
| 2.37 | KPI & Metrik Kinerja Bisnis | kpi-bisnis | bisnis | unisex | produktif | 📝 | Performance metrics |
| 2.38 | Membangun Identitas Brand Bisnis | brand-identity-bisnis | bisnis | unisex | produktif | 📝 | Branding |
| 2.39 | Email Marketing untuk B2B | email-marketing-b2b | bisnis | unisex | produktif | 📝 | B2B marketing |
| 2.40 | A/B Testing & Conversion Optimization | ab-testing | bisnis | unisex | produktif | 📝 | Conversion |
| 2.41 | Profit Margin Analysis | analisis-margin-keuntungan | keuangan | unisex | produktif | 📝 | Profitability |
| 2.42 | Dasar Exit Planning Bisnis | exit-planning-bisnis | bisnis | unisex | pensiun | 📝 | Business exit |
| 2.43 | Crowdfunding & Alternatif Pinjaman Bisnis | crowdfunding-bisnis | keuangan | unisex | produktif | 📝 | Alternative funding |
| 2.44 | Membangun Model Pendapatan Berulang | recurring-revenue-model | bisnis | unisex | produktif | 📝 | Subscription model |
| 2.45 | Mengukur ROI Digital Marketing | roi-digital-marketing | bisnis | unisex | produktif | 📝 | Marketing analytics |
| 2.46 | Decision Matrix untuk Prioritas Proyek | decision-matrix-proyek | bisnis | unisex | produktif | 📝 | Project prioritization |
| 2.47 | Document Management System (DMS) | dms-bisnis | bisnis | unisex | produktif | 📝 | Document handling |
| 2.48 | Standard Operating Environment (SOE) | standard-operating-environment | bisnis | unisex | produktif | 📝 | IT standardization |
| 2.49 | Business Continuity Planning (BCP) | business-continuity-plan | bisnis | unisex | produktif | 📝 | Risk mitigation |
| 2.50 | Knowledge Management System | knowledge-management | bisnis | unisex | produktif | 📝 | Knowledge transfer |
| 2.51 | Change Management dalam Bisnis | change-management-bisnis | bisnis | unisex | produktif | 📝 | Organizational change |
| 2.52 | Process Documentation Best Practices | process-documentation | bisnis | unisex | produktif | 📝 | Documentation |
| 2.53 | Dashboard Metrics untuk Bisnis | dashboard-metrics-bisnis | bisnis | unisex | produktif | 📝 | Data visualization |
| 2.54 | Problem Solving Framework untuk Bisnis | problem-solving-framework | bisnis | unisex | produktif | 📝 | Decision making |
| 2.55 | Meeting Management & Agenda | meeting-management | bisnis | unisex | produktif | 📝 | Productivity |
| 2.56 | Product-Market Fit Validation | product-market-fit | bisnis | unisex | produktif | 📝 | Validation |
| 2.57 | Channel Distribution Strategy | channel-distribution | bisnis | unisex | produktif | 📝 | Distribution |
| 2.58 | Partnership & Strategic Alliance | partnership-strategic | bisnis | unisex | produktif | 📝 | Collaborations |
| 2.59 | Market Segmentation Strategy | market-segmentation | bisnis | unisex | produktif | 📝 | Targeting |
| 2.60 | Competitor Analysis Framework | competitor-analysis | bisnis | unisex | produktif | 📝 | Market intelligence |
| 2.61 | Growth Hacking Techniques | growth-hacking | bisnis | unisex | muda | 📝 | Rapid growth |
| 2.62 | Freemium to Premium Conversion | freemium-conversion | bisnis | unisex | produktif | 📝 | Monetization |
| 2.63 | Geographic Expansion Strategy | geographic-expansion | bisnis | unisex | produktif | 📝 | Regional scaling |
| 2.64 | Franchise Model vs Licensing | franchise-vs-licensing | bisnis | unisex | produktif | 📝 | Business model |
| 2.65 | Vertical Integration Strategy | vertical-integration | bisnis | unisex | produktif | 📝 | Supply chain |
| 2.66 | Horizontal Integration & Acquisition | horizontal-integration | bisnis | unisex | produktif | 📝 | Growth via M&A |
| 2.67 | Unit Economics & LTV:CAC Ratio | unit-economics-ltv-cac | bisnis | unisex | produktif | 📝 | Economics |
| 2.67a | Pivot ke B2B: Cara UMKM Mendapatkan Kontrak Korporat dan Pemerintah | strategi-b2b-umkm | bisnis | unisex | produktif | ✅ | B2B transition |
| 2.67b | Panduan Pajak UMKM 2026: Cara Bayar PPh Final 0.5% dan Update Coretax | panduan-pajak-umkm | legal | unisex | produktif | ✅ | UMKM tax |
| 2.67c | Strategi Customer Retention (CRM) untuk UMKM: Cara Bikin Pelanggan "Kecanduan" Belanja | strategi-crm-umkm | bisnis | unisex | produktif | ✅ | Customer retention |
| 2.68 | Viral Coefficient & Network Effects | viral-coefficient | bisnis | unisex | muda | 📝 | Organic growth |
| 2.69 | Referrals & Word-of-Mouth Program | referrals-program | bisnis | unisex | produktif | 📝 | Acquisition |
| 2.70 | Customer Journey Mapping | customer-journey-mapping | bisnis | unisex | produktif | 📝 | CX optimization |
| 2.71 | Upselling & Cross-selling Strategy | upselling-crossselling-strategy | bisnis | unisex | produktif | 📝 | Revenue optimization |
| 2.72 | Launch Strategy & Go-to-Market | launch-strategy-gtm | bisnis | unisex | produktif | 📝 | Market entry |
| 2.73 | Cost Structure Analysis | cost-structure-analysis | keuangan | unisex | produktif | 📝 | Cost management |
| 2.74 | Break-even Analysis | break-even-analysis | keuangan | unisex | produktif | 📝 | Profitability |
| 2.75 | Working Capital Management | working-capital | keuangan | unisex | produktif | 📝 | Liquidity |
| 2.76 | Arus Kas Operasional vs Non-Operasional | arus-kas-operasional | keuangan | unisex | produktif | 📝 | Cashflow |
| 2.77 | Debt Restructuring Strategy | debt-restructuring | keuangan | unisex | produktif | 📝 | Debt management |
| 2.78 | Profit Distribution Strategy | profit-distribution | keuangan | unisex | produktif | 📝 | Reinvestment |
| 2.79 | Emergency Fund untuk Bisnis | emergency-fund-bisnis | keuangan | unisex | produktif | 📝 | Reserves |
| 2.80 | Cost of Goods Sold (COGS) Optimization | cogs-optimization | keuangan | unisex | produktif | 📝 | Pricing |
| 2.81 | Overhead Cost Reduction | overhead-cost-reduction | keuangan | unisex | produktif | 📝 | Efficiency |
| 2.82 | Financial Ratio Analysis (Current, Quick, Debt) | financial-ratio-analysis | keuangan | unisex | produktif | 📝 | Analysis |
| 2.83 | Budget vs Actual Variance Analysis | budget-variance-analysis | keuangan | unisex | produktif | 📝 | Control |
| 2.84 | Capital Budgeting Decision | capital-budgeting | keuangan | unisex | produktif | 📝 | Investment decisions |
| 2.85 | Lease vs Buy Decision | lease-vs-buy | keuangan | unisex | produktif | 📝 | Asset decisions |
| 2.86 | Tax Planning untuk Bisnis | tax-planning-bisnis | keuangan | unisex | produktif | 📝 | Optimization |
| 2.87 | Portfolio Rebalancing Strategy | portfolio-rebalancing | investasi | unisex | produktif | 📝 | Portfolio management |
| 2.88 | Risk-Return Profile Assessment | risk-return-profile | investasi | unisex | produktif | 📝 | Risk assessment |
| 2.89 | Dollar Cost Averaging (DCA) | dollar-cost-averaging | investasi | unisex | produktif | 📝 | Investment strategy |
| 2.90 | Indeks Saham Indonesia (IDX) | indeks-saham-indonesia | investasi | unisex | produktif | 📝 | Market indices |
| 2.91 | Sukuk vs Obligasi: Mana Lebih Cocok? | sukuk-vs-obligasi | investasi | unisex | produktif | 📝 | Islamic finance |
| 2.92 | Reksa Dana Pasar Uang | reksa-dana-pasar-uang | investasi | unisex | produktif | 📝 | Low risk |
| 2.93 | Reksa Dana Pendapatan Tetap | reksa-dana-pendapatan-tetap | investasi | unisex | produktif | 📝 | Medium risk |
| 2.94 | Reksa Dana Campuran | reksa-dana-campuran | investasi | unisex | produktif | 📝 | Balanced |
| 2.95 | Robo-Advisor untuk Investasi | robo-advisor | investasi | unisex | produktif | 📝 | Automation |
| 2.96 | Compound Interest dalam Investasi | compound-interest | investasi | unisex | produktif | 📝 | Time value |
| 2.97 | Behavioral Finance dalam Investasi | behavioral-finance | investasi | unisex | produktif | 📝 | Psychology |
| 2.98 | Asset Allocation Strategy | asset-allocation | investasi | unisex | produktif | 📝 | Diversification |
| 2.99 | Organizational Structure Design | org-structure-design | bisnis | unisex | produktif | 📝 | Structure |
| 2.100 | Performance Management System | performance-management | bisnis | unisex | produktif | 📝 | Appraisal |
| 2.101 | Employee Onboarding Process | employee-onboarding | bisnis | unisex | produktif | 📝 | Integration |
| 2.102 | Compensation Package Design | compensation-package | bisnis | unisex | produktif | 📝 | Rewards |
| 2.103 | Employee Benefits Optimization | employee-benefits | bisnis | unisex | produktif | 📝 | Retention |
| 2.104 | Remote Team Management | remote-team-management | bisnis | unisex | produktif | 📝 | Distributed teams |
| 2.105 | Leadership Development Program | leadership-development | bisnis | unisex | produktif | 📝 | Talent pipeline |
| 2.106 | Conflict Resolution dalam Tim | conflict-resolution | bisnis | unisex | produktif | 📝 | Team dynamics |
| 2.107 | Employee Retention Strategy | employee-retention | bisnis | unisex | produktif | 📝 | Turnover reduction |
| 2.108 | Delegation Framework | delegation-framework | bisnis | unisex | produktif | 📝 | Empowerment |
| 2.109 | Team Motivation Techniques | team-motivation | bisnis | unisex | produktif | 📝 | Engagement |
| 2.110 | Performance Bonus System | performance-bonus | bisnis | unisex | produktif | 📝 | Incentives |

**Tier 2 Target:** 110 articles (26 complete, 84 research pending)

---

## Tier 3: Asset Builder (Property, Franchise & Investments)
**Target Audience:** Successful entrepreneurs, high-level executives
**Content Focus:** Real estate, franchising, advanced investing, retirement planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 3.1 | Panduan Lengkap Investasi Properti | investasi-properti | investasi | unisex | produktif | ✅ | Real estate basics |
| 3.2 | Cara Pilih Franchise yang Menguntungkan | pilih-franchise | bisnis | unisex | produktif | ✅ | Franchise selection |
| 3.3 | Hitung ROI Properti Sewaan | roi-properti-sewaan | investasi | unisex | produktif | ✅ | ROI calculation |
| 3.4 | KPR vs Cash Keras: Strategi Beli Properti | kpr-vs-cash | investasi | unisex | produktif | ✅ | Purchase strategy |
| 3.5 | Cara Mulai Bisnis Franchise dari Nol | franchise-dari-nol | bisnis | unisex | produktif | ✅ | Franchise startup |
| 3.6 | Investasi Tanah: Tips dan Trik | investasi-tanah | investasi | unisex | produktif | ✅ | Land investment |
| 3.7 | Portofolio Diversifikasi untuk Investor | diversifikasi-portofolio | investasi | unisex | produktif | ✅ | Portfolio strategy |
| 3.8 | Cara Nilai Bisnis untuk Exit Strategy | nilai-bisnis-exit | bisnis | unisex | pensiun | ✅ | Business valuation |
| 3.9 | Passive Income dari Properti Sewa | passive-income-properti | investasi | unisex | produktif | ✅ | Rental income |
| 3.10 | Pajak Properti: Apa Saja yang Harus Dibayar? | pajak-properti | hukum | unisex | produktif | ✅ | Property taxes |
| 3.11 | Family Office: Apa dan Kenapa? | family-office | bisnis | unisex | pensiun | ✅ | Wealth management |
| 3.12 | Cara Negosiasi Harga Properti | negosiasi-properti | investasi | unisex | produktif | ✅ | Negotiation tactics |
| 3.13 | REITs vs Properti Fisik: Perbandingan | reits-vs-properti | investasi | unisex | produktif | ✅ | Investment comparison |
| 3.14 | Retirement Business Planning | retirement-business | bisnis | unisex | pensiun | ✅ | Exit planning |
| 3.15 | Legal Structure untuk Bisnis Properti | legal-bisnis-properti | hukum | unisex | produktif | ✅ | Business structure |
| 3.16 | Transisi Kuadran: Dari "S" ke "I" | transisi-kuadran | investasi | unisex | produktif | ✅ | Investor mindset |
| 3.17 | Memerangi Pajak Siluman (Inflasi) | pajak-siluman | keuangan | unisex | produktif | ✅ | Inflation defense |
| 3.18 | Strategi Tiga Keranjang Dana | strategi-keranjang | investasi | unisex | produktif | ✅ | Portfolio allocation |
| 3.19 | Seni Melakukan Due Diligence | due-diligence | investasi | unisex | produktif | ✅ | Investment analysis |
| 3.20 | Matematika Properti: Cap Rate & ROI | matematika-properti | investasi | unisex | produktif | ✅ | Property math |
| 3.21 | Ekonomi Kos-kosan & Co-Living | ekonomi-kos-kosan | investasi | unisex | produktif | ✅ | Rental business |
| 3.22 | Properti Komersial (Minimarket/Bank) | properti-komersial | investasi | unisex | produktif | ✅ | Commercial property |
| 3.23 | Flipping Properti Kusam | flippping-properti | investasi | unisex | produktif | ✅ | Property flipping |
| 3.24 | Anatomi Franchise yang Sehat | anatomi-franchise | bisnis | unisex | produktif | ✅ | Franchise analysis |
| 3.25 | Model Operator vs Auto-Pilot | operator-vs-autopilot | bisnis | unisex | produktif | ✅ | Franchise types |
| 3.26 | Strategi Multi-Unit Franchising | multi-unit-franchising | bisnis | unisex | produktif | ✅ | Scaling strategy |
| 3.27 | Akuisisi Bisnis Lokal (M&A) | akuisisi-bisnis-lokal | bisnis | unisex | produktif | ✅ | Business acquisition |
| 3.28 | Dividend Investing | dividen-investing | investasi | unisex | produktif | ✅ | Stock dividends |
| 3.29 | Obligasi Korporasi & SBN Besar | obligasi-korporasi-besar | investasi | unisex | produktif | ✅ | Bond investing |
| 3.30 | Menjadi Angel Investor | angel-investor | investasi | unisex | produktif | ✅ | Angel investing |
| 3.31 | Diversifikasi Saham Global | diversifikasi-saham-global | investasi | unisex | produktif | ✅ | Global stocks |
| 3.32 | OPM: Hutang Baik vs Buruk | opm-hutang-baik | keuangan | unisex | produktif | ✅ | Debt strategy |
| 3.33 | Menyiasati Pajak Lewat Aset | pajak-lewat-aset | hukum | unisex | produktif | ✅ | Tax optimization |
| 3.34 | Exit Strategy Bisnis | exit-strategy-bisnis | bisnis | unisex | produktif | ✅ | Business exit |
| 3.35 | Mitigasi Risiko Multi-Aset | mitigasi-risiko | keuangan | unisex | produktif | ✅ | Risk management |
**Tier 3 Target:** 35 articles (35 complete)

---

## Tier 4: Legacy Maker (Wealth Protection & Succession)
**Target Audience:** Ultra-High Net Worth Individuals (UHNWI)
**Content Focus:** Corporate structuring, tax optimization, wealth protection, succession planning

| # | Title | Slug | Category | Gender | Age | Status | Notes |
|---|-------|------|----------|--------|-----|--------|-------|
| 4.1 | Panduan Setup Holding Company di Indonesia | holding-company | bisnis | unisex | pensiun | ✅ | Corporate structure |
| 4.2 | Suksesi Bisnis: Transfer ke Generasi Berikutnya | suksesi-bisnis | bisnis | unisex | pensiun | ✅ | Succession planning |
| 4.3 | Tax Optimization untuk UHNW Individuals | tax-optimization | hukum | unisex | pensiun | ✅ | Tax strategy |
| 4.4 | Wealth Protection: Asuransi vs Trust Fund | wealth-protection | keuangan | unisex | pensiun | ✅ | Asset protection |
| 4.5 | Cara Setup Family Office di Indonesia | setup-family-office | bisnis | unisex | pensiun | ✅ | Family office guide |
| 4.6 | Estate Planning: Warisan dan Wasiat | estate-planning | hukum | unisex | pensiun | ✅ | Estate law |
| 4.7 | Philanthropy Strategy untuk Keluarga Kaya | philanthropy | keuangan | unisex | pensiun | ✅ | Charitable giving |
| 4.8 | Offshore Investing: Legal atau Ilegal? | offshore-investing | hukum | unisex | pensiun | ✅ | Legal boundaries |
| 4.9 | Cara Lindungi Aset dari Tuntutan Hukum | lindungi-aset | hukum | unisex | pensiun | ✅ | Asset protection |
| 4.10 | Generational Wealth: Mindset dan Strategi | generational-wealth | keuangan | unisex | pensiun | ✅ | Wealth mindset |
| 4.11 | Trust Fund vs Yayasan: Perbandingan | trust-vs-yayasan | hukum | unisex | pensiun | ✅ | Legal structures |
| 4.12 | Corporate Governance untuk Bisnis Keluarga | corporate-governance | bisnis | unisex | pensiun | ✅ | Governance structure |
| 4.13 | Insurance Planning untuk UHNW Individuals | insurance-uwn | keuangan | unisex | pensiun | ✅ | Insurance strategy |
| 4.14 | Cara Pilih Financial Advisor untuk UHNW | pilih-advisor | keuangan | unisex | pensiun | ✅ | Advisor selection |
| 4.15 | Legacy Planning: Meninggalkan Dampak | legacy-planning | keuangan | unisex | pensiun | ✅ | Impact legacy |

**Tier 4 Target:** 15 articles (15 complete)

---

## Summary Statistics

| Tier | Target Articles | Published | % Complete |
|------|----------------|-----------|------------|
| Tier 0: Survival | 11 | 11 | 100% |
| Tier 1: Hustler | 170 | 90 | 53% |
| Tier 2: Scaler | 110 | 26 | 24% |
| Tier 3: Asset Builder | 35 | 35 | 100% |
| Tier 4: Legacy | 15 | 15 | 100% |
| **TOTAL** | **341** | **177** | **52%** |
