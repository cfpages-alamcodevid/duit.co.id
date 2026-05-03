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

| # | Cluster | Title | Slug | Category | Gender | Age | Status | Notes |
|---|---------|-------|------|----------|--------|-----|--------|-------|
| 0.1 | Scam & Digital Safety | Panduan Lengkap Bebas dari Jerat Pinjol Online | panduan-lunas-pinjol | hukum, keuangan | unisex | produktif | ✅ | Must-read for all tiers |
| 0.2 | Scam & Digital Safety | Panduan Lengkap: Cara Menghadapi Debt Collector Ilegal Tanpa Takut (Edisi 2025-2026) | menghadapi-debt-collector | hukum | unisex | produktif | ✅ | Phone/Digital harassment |
| 0.3 | Scam & Digital Safety | Panduan Menghadapi Debt Collector Lapangan (Home Visit): Hak Anda & Aturan OJK Terbaru 2025-2026 | panduan-debt-collector | hukum | unisex | produktif | ✅ | Field collection focus |
| 0.4 | Scam & Digital Safety | Langkah Hukum Jika Terjerat Pinjol Ilegal | langkah-hukum-pinjol | hukum | unisex | produktif | ✅ | Legal escalation guide |
| 0.5 | Scam & Digital Safety | Cara Melaporkan Pinjol Ilegal ke OJK & Polisi: Panduan Lengkap & Contoh Surat Laporan | laporkan-pinjol-ilegal | hukum | unisex | produktif | ✅ | Official reporting channels |
| 0.6 | Budget Defense | Budgeting Darurat: Hidup dari Gaji UMR | budgeting-darurat-umr | keuangan | unisex | produktif | ✅ | Practical examples |
| 0.7 | Scam & Digital Safety | Pinjol Legal vs Ilegal 2026: Cara Bedakan dalam 5 Menit (Anti-Jebak) | bedakan-pinjol-legal-ilegal | hukum | unisex | muda | ✅ | Educational basics |
| 0.8 | Debt & Bill Management | Cara Negosiasi Utang dengan Kreditur | negosiasi-utang | keuangan | unisex | produktif | ✅ | Negotiation tactics |
| 0.9 | Scam & Digital Safety | Perlindungan Hukum untuk Debitur | perlindungan-debitur | hukum | unisex | produktif | ✅ | UU protection laws |
| 0.10 | Household Survival | Emergency Fund: Mulai dari Rp 10rb/hari | emergency-fund-murah | keuangan | unisex | muda | ✅ | Micro-saving tips |
| 0.11 | Scam & Digital Safety | Tanda-Tanda Skema Pinjaman Berbahaya | tanda-pinjol-berbahaya | hukum | unisex | muda | ✅ | Prevention focused |
| 0.12 | Income Shock & Recovery | Cara Bertahan Saat PHK Mendadak | survive-phk-mendadak | keuangan | unisex | produktif | ✅ | Income shock defense |
| 0.13 | Income Shock & Recovery | Cara Cari Kerja Kilat Setelah PHK | cari-kerja-kilat-phk | keuangan | unisex | produktif | ✅ | Rapid recovery |
| 0.14 | Income Shock & Recovery | Cara Jual Barang Cepat Tanpa Rugi Besar | jual-barang-cepat | keuangan | unisex | produktif | ✅ | Quick cash |
| 0.15 | Income Shock & Recovery | Cara Dapat Uang Darurat dari Skill Sederhana | uang-darurat-skill | keuangan | unisex | muda | ✅ | Emergency income |
| 0.16 | Budget Defense | Cara Bagi Gaji Mingguan Biar Aman Sampai Akhir Bulan | gaji-mingguan-aman | keuangan | unisex | produktif | ✅ | Weekly budgeting |
| 0.17 | Budget Defense | Cara Hemat Ongkos Transport Harian | hemat-transport-harian | keuangan | unisex | produktif | ✅ | Commute control |
| 0.18 | Budget Defense | Cara Masak Hemat 1 Minggu dengan Budget Ketat | masak-hemat-1minggu | keuangan | unisex | produktif | ✅ | Meal planning |
| 0.19 | Budget Defense | Cara Hemat Listrik, Air, dan Data | hemat-listrik-air-data | keuangan | unisex | produktif | ✅ | Utility cuts |
| 0.20 | Budget Defense | Cara Mengatur THR Biar Nggak Habis Sekejap | kelola-thr-hemat | keuangan | unisex | produktif | ✅ | Bonus allocation |
| 0.21 | Debt & Bill Management | Cara Prioritaskan Utang Kecil vs Utang Besar | prioritaskan-utang | keuangan | unisex | produktif | ✅ | Debt triage |
| 0.22 | Debt & Bill Management | Cara Minta Restrukturisasi Cicilan Saat Seret | restrukturisasi-cicilan-seret | keuangan | unisex | produktif | ✅ | Bill negotiation |
| 0.23 | Debt & Bill Management | Cara Catat Utang Biar Nggak Tumpang Tindih | catat-utang-rapi | keuangan | unisex | produktif | ✅ | Debt tracking |
| 0.24 | Debt & Bill Management | Cara Simpan Bukti Chat dan Telepon Penagihan | simpan-bukti-penagihan | hukum | unisex | produktif | ✅ | Evidence hygiene |
| 0.25 | Debt & Bill Management | Cara Hentikan Telepon Penagihan yang Mengganggu | stop-telepon-penagihan | hukum | unisex | produktif | ✅ | Call harassment |
| 0.26 | Scam & Digital Safety | Cara Cek Koperasi Bodong sebelum Setor | cek-koperasi-bodong | hukum | unisex | muda | ✅ | Scam detection |
| 0.27 | Scam & Digital Safety | Cara Hindari Arisan Online Palsu | hindari-arisan-palsu | hukum | female | muda | ✅ | Social scam defense |
| 0.28 | Scam & Digital Safety | Cara Lindungi KTP dan OTP dari Penipuan | lindungi-ktp-otp | hukum | unisex | muda | ✅ | Identity protection |
| 0.29 | Scam & Digital Safety | Cara Cek Investasi Bodong yang Nyamar | cek-investasi-bodong | hukum | unisex | produktif | ✅ | Fraud filter |
| 0.30 | Scam & Digital Safety | Cara Bedakan Debt Collector Asli vs Palsu | dc-asli-vs-palsu | hukum | unisex | produktif | ✅ | Verification |
| 0.31 | Debt & Bill Management | Cara Atur Uang Kalau Numpang Tinggal | atur-uang-numpang-tinggal | keuangan | unisex | muda | ✅ | Shared housing |
| 0.32 | Debt & Bill Management | Cara Kirim Uang ke Rumah Tanpa Boncos | kirim-uang-ke-rumah | keuangan | unisex | produktif | ✅ | Remittance |
| 0.33 | Debt & Bill Management | Cara Nego Tunggakan Kontrakan | nego-tunggakan-kontrakan | keuangan | unisex | produktif | ✅ | Housing arrears |
| 0.34 | Budget Defense | Cara Nego Tunggakan Listrik dan Air | nego-tunggakan-utilities | keuangan | unisex | produktif | ✅ | Utility arrears |
| 0.35 | Budget Defense | Cara Belanja Makan Murah Tapi Masih Layak | makan-murah-layak | keuangan | unisex | produktif | ✅ | Food budget |
| 0.36 | Scam & Digital Safety | Cara Lindungi HP dari Aplikasi Scam | lindungi-hp-scam | hukum | unisex | muda | ✅ | Device safety |
| 0.37 | Scam & Digital Safety | Cara Cek Link WhatsApp dan APK Penipuan | cek-link-scam | hukum | unisex | muda | ✅ | Link verification |
| 0.38 | Scam & Digital Safety | Cara Hapus Akses Aplikasi Berbahaya | hapus-aplikasi-berbahaya | hukum | unisex | muda | ✅ | Cleanup steps |
| 0.39 | Scam & Digital Safety | Cara Cek Pinjol Asli dari Nomor WA | cek-pinjol-asli-wa | hukum | unisex | muda | ✅ | WA scam check |
| 0.40 | Scam & Digital Safety | Cara Cabut Akses Aplikasi Pinjol | cabut-akses-aplikasi-pinjol | hukum | unisex | muda | ✅ | App permissions |
| 0.41 | Debt & Bill Management | Cara Nego Sewa Kos Saat Seret | nego-sewa-kos-seret | keuangan | unisex | produktif | ✅ | Rent negotiation |
| 0.42 | Budget Defense | Cara Hemat Pulsa, Internet, dan Kuota | hemat-pulsa-data | keuangan | unisex | muda | 📝 | Connectivity budget |
| 0.43 | Income Shock & Recovery | Cara Tabung Kembalian Harian | tabung-kembalian-harian | keuangan | unisex | muda | ✅ | Micro-saving |
| 0.44 | Household Survival | Cara Jual HP Lama dengan Aman | jual-hp-lama-aman | keuangan | unisex | muda | ✅ | Quick resale |
| 0.45 | Income Shock & Recovery | Cara Cari Uang Sampingan dari Jasa Harian | jasa-harian-sampingan | keuangan | unisex | produktif | ✅ | Side income |
| 0.46 | Debt & Bill Management | Cara Bagi Uang Saat Bantu Orang Tua | bantu-orang-tua-bulanan | keuangan | unisex | produktif | ✅ | Family support |
| 0.47 | Budget Defense | Cara Bikin Daftar Belanja Makan Bulanan | daftar-belanja-makan-bulanan | keuangan | unisex | produktif | 📝 | Meal budget |
| 0.48 | Household Survival | Cara Nolak Pinjaman Teman Tanpa Putus Silaturahmi | tolak-pinjaman-teman | keuangan | unisex | muda | 📝 | Social debt |
| 0.49 | Financial Literacy | Konsep Dasar Keuangan untuk Keluarga Berpenghasilan Rendah | konsep-dasar-keuangan-keluarga-berpenghasilan-rendah | keuangan | unisex | produktif | ✅ | Cover basic financial concepts for low-income families |
| 0.50 | Financial Literacy | Cara Membaca Kontrak Pinjaman Online dan Konvensional dengan Benar | cara-baca-kontrak-pinjaman-online-dan-konvensional | hukum | unisex | produktif | ✅ | Cover how to read loan contracts (interest, penalties, terms) |
| 0.51 | Financial Literacy | Membangun Skor Kredit dari Nol untuk Pemula | membangun-skor-kredit-dari-nol-untuk-pemula | keuangan | unisex | produktif | 📝 | Cover building credit score from zero |
| 0.52 | Financial Literacy | Literasi Keuangan untuk Ibu Rumah Tangga dan Pengangguran | literasi-keuangan-untuk-ibu-rumah-tangga-dan-pengangguran | keuangan | unisex | muda | ✅ | Cover financial literacy for non-workers (housewives, unemployed youth) |
| 0.53 | Legal Aid | Direktori Lengkap Lembaga Bantuan Hukum (LBH) dan Konsultasi Hukum Gratis di Indonesia | direktori-lbh-konsultasi-hukum-gratis | hukum | unisex | produktif | ✅ | MERGED: daftar lembaga LBH + peta yayasan LBH seluruh Indonesia. Cover both organization directory AND geographic mapping |
| 0.54 | Gov & Social Safety Nets | Daftar Program Bantuan Pemerintah: Bansos, PKH, BPN, KIS, KIP | daftar-program-bantuan-pemerintah-bansos-pkh-bpnt-kis-kip | keuangan | unisex | produktif | ✅ | Cover government assistance programs (Bansos, PKH, BPN, KIS, KIP) |
| 0.55 | Gov & Social Safety Nets | Alternatif Pendanaan Gotong Royong: Arisan dan Koperasi Simpan Pinjam | alternatif-pendanaan-gotong-royong-arisan-dan-koperasi-simpan-pinjam | keuangan | unisex | produktif | ✅ | Cover community mutual aid / gotong royong financing (arisan, koperasi simpan pinjam) |
| 0.56 | Gov & Social Safety Nets | Asuransi Mikro dan Bantuan Premi BPJS Kesehatan untuk Keluarga Berpenghasilan Rendah | asuransi-mikro-dan-bantuan-premi-bpjs-kesehatan-keluarga-berpenghasilan-rendah | keuangan | unisex | produktif | 📝 | Cover micro-insurance for low-income (asuransi mikro, BPJS Kesehatan premium assistance) |
| 0.57 | Mental Health | Mengelola Stres Keuangan dan Kesehatan Mental Korban Utang Pinjol | mengelola-stres-keuangan-dan-kesehatan-mental-korban-utang-pinjol | keuangan | unisex | produktif | ✅ | Cover mental health / financial stress management for debt victims |
| 0.58 | Family Support | Cara Komunikasi Keuangan Keluarga saat Krisis Utang | cara-komunikasi-keuangan-keluarga-saat-krisis-utang | keuangan | unisex | produktif | ✅ | Cover family financial communication during crisis |
| 0.59 | Family Support | Biaya Sekolah Anak saat Krisis Keuangan: Beasiswa, KIP, Sekolah Gratis | biaya-sekolah-anak-saat-krisis-keuangan-beasiswa-kip-sekolah-gratis | keuangan | unisex | produktif | 📝 | Cover children's education funding during financial crisis (beasiswa, KIP, sekolah gratis) |
| 0.60 | Housing & Utilities | Negosiasi Sewa Kontrakan untuk Jangka Panjang | negosiasi-sewa-kontrakan-untuk-jangka-panjang | keuangan | unisex | produktif | ✅ | Cover rent negotiation for long-term leases |
| 0.61 | Housing & Utilities | Program Perumahan Pemerintah untuk Masyarakat Berpenghasilan Rendah: Rusunawa, BP2BT, FLPP | program-perumahan-pemerintah-untuk-masyarakat-berpenghasilan-rendah | keuangan | unisex | produktif | ✅ | Cover government housing programs for low-income (Rusunawa, BP2BT, FLPP) |
| 0.62 | Housing & Utilities | Subsidi Panel Surya untuk Rumah Tangga Berpenghasilan Rendah | subsidi-panel-surya-untuk-rumah-tangga-berpenghasilan-rendah | keuangan | unisex | produktif | ✅ | Cover solar panel subsidies for low-income households |
| 0.63 | Financial Literacy | Koperasi Simpan Pinjam vs Rentenir: Alternatif Legal untuk Hindari Pinjol Ilegal | koperasi-simpan-pinjam-vs-rentenir-alternatif-legal-hindari-pinjol-ilegal | hukum | unisex | produktif | 📝 | Cover cooperative alternatives to loan sharks (koperasi simpan pinjam vs rentenir) |
| 0.64 | Digital & Device Management | Literasi Digital untuk Mencegah Penipuan Online dan Pinjol Ilegal | literasi-digital-untuk-mencegah-penipuan-online-dan-pinjol-ilegal | keuangan | unisex | muda | ✅ | Cover digital literacy for scam prevention |
| 0.65 | Digital & Device Management | Cara Mengelola Berbagai Aplikasi Pinjol dan Utang Secara Bersamaan | cara-mengelola-berbagai-aplikasi-pinjol-dan-utang-secara-bersamaan | keuangan | unisex | produktif | 📝 | Cover managing multiple debt apps simultaneously |

**Tier 0 Target**: 65 articles (57 complete, 8 ready to write)

---

## Tier 1: The Hustler (Side Hustles & High-Income Skills)
**Target Audience:** Youth, fresh graduates, UMR workers
**Content Focus:** Extra income, skill development, zero-risk business models

| # | Cluster | Title | Slug | Category | Gender | Age | Status | Notes |
|---|---------|-------|------|----------|--------|-----|--------|-------|
| 1.1 | Career Starter | 15 Side Hustle Modal Kecil untuk Mahasiswa | side-hustle-mahasiswa | bisnis | unisex | muda | ✅ | Low capital focus |
| 1.2 | Commerce & Brokerage | Cara Jastip untuk Pemula | jastip-pemula | bisnis | female | muda | ✅ | Step-by-step guide |
| 1.3 | Career Starter | Skill High-Income yang Bisa Dipelajari Otodidak | skill-otodidak | karir | unisex | muda | ✅ | Self-learning resources; Bisa dikembangkan dengan: Daftar platform sertifikasi gratis (Coursera, Google Skillshop, Dicoding) |
| 1.4 | Commerce & Brokerage | Bisnis Online Shop dari Nol | online-shop-nol | bisnis | unisex | produktif | ✅ | E-commerce basics |
| 1.5 | Digital & Knowledge Work | Cara Dapat Klien Pertama Freelance | klien-pertama-freelance | karir | unisex | muda | ✅ | Portfolio building |
| 1.6 | Commerce & Brokerage | Dropship vs Reseller: Mana Lebih Untung? | dropship-vs-reseller | bisnis | unisex | muda | ✅ | Comparison guide |
| 1.7 | Commerce & Brokerage | Jualan Makanan Online: Panduan Lengkap | jualan-makanan-online | bisnis | unisex | produktif | ✅ | Food business |
| 1.8 | Agribusiness & Recycling | Cara Mulai Jastip Barang Mewah | jastip-barang-mewah | bisnis | female | produktif | ✅ | Luxury goods |
| 1.9 | Commerce & Brokerage | Content Creator: Dari Hobi Jadi Cuan | content-creator-cuan | karir | unisex | muda | ✅ | Social media income |
| 1.10 | Digital & Knowledge Work | Tutorial Jadi Admin Olshop Professional | admin-olshop-pro | karir | unisex | muda | ✅ | Virtual assistant |
| 1.11 | Career Starter | Cara Hitung Harga Jual Produk | hitung-harga-jual | bisnis | unisex | produktif | ✅ | Pricing strategy |
| 1.12 | Career Starter | 10 Ide Bisnis Modal di Bawah 1 Juta | bisnis-modal-1juta | bisnis | unisex | muda | ✅ | Low capital ideas |
| 1.13 | Career Starter | Tips Negotiasi Gaji untuk Fresh Graduate | negosiasi-gaji | karir | unisex | muda | ✅ | Salary tactics |
| 1.14 | Career Starter | Cara Bikin CV dan Portfolio yang Menarik | cv-portfolio-menarik | karir | unisex | muda | ✅ | Job application; Bisa dikembangkan dengan: 5 contoh portofolio freelance spesifik per bidang (design, writing, tech) |
| 1.15 | Career Starter | Passive Income untuk Karyawan | passive-income-karyawan | bisnis | unisex | produktif | ✅ | Extra income streams |
| 1.16 | Career Starter | Cara Buat PT Perorangan Tanpa Modal Besar | cara-buat-pt-perorangan | hukum | unisex | muda | ✅ | UU Cipta Kerja focus |
| 1.17 | Commerce & Brokerage | Jastip Hasil Bumi: Peluang Cuan dari Desa ke Kota | jastip-hasil-bumi | bisnis | unisex | produktif | ✅ | Rural-urban arbitrage |
| 1.18 | Local Services | Bisnis Deep Cleaning AC: Cuci dan Perawatan AC Profesional | deep-cleaning-ac | bisnis | unisex | produktif | ✅ | Fokus khusus jasa cuci & perawatan AC. Differentiate from 1.66 yang fokus niche kasur & sofa |
| 1.19 | Digital & Knowledge Work | Panduan Makelar Properti Lokal Tanpa Modal | makelar-properti-lokal | bisnis | unisex | produktif | ✅ | Local brokerage |
| 1.20 | Career Starter | Strategi Bisnis Pre-Order (PO) Anti-Rugi | strategi-bisnis-po | bisnis | unisex | muda | ✅ | Zero risk model |
| 1.21 | Commerce & Brokerage | Peluang Cuan dari TikTok Live di Desa | tiktok-live-desa | bisnis | unisex | muda | ✅ | Content commerce |
| 1.22 | Digital & Knowledge Work | Jadi Virtual Assistant (VA) Klien Luar Negeri | virtual-assistant-global | karir | unisex | muda | ✅ | Global freelancing |
| 1.23 | Digital & Knowledge Work | Cara Validasi Ide Bisnis Tanpa Modal | validasi-ide-bisnis | bisnis | unisex | muda | ✅ | Market research |
| 1.24 | Local Services | Ekonomi Jasa Berbasis Keringat (Sweat Equity) | sweat-equity-jasa | bisnis | unisex | produktif | ✅ | Service business |
| 1.25 | Career Starter | Dana Darurat Level 1: Amankan Rp 3 Juta Pertama | emergency-fund-level-1 | keuangan | unisex | muda | ✅ | Financial defense |
| 1.26 | Digital & Knowledge Work | Makelar Sayur/Buah via TikTok Live | makelar-sayur-tiktok | bisnis | unisex | muda | ✅ | Rural arbitrage |
| 1.27 | Agribusiness & Recycling | Pengepul Kardus & Barang Bekas | pengepul-kardus | bisnis | unisex | produktif | ✅ | Recycling business |
| 1.28 | Agribusiness & Recycling | Budidaya Maggot (BSF) untuk Pakan Ternak | budidaya-maggot | bisnis | unisex | produktif | ✅ | Agribusiness |
| 1.29 | Commerce & Brokerage | Agen BRILink / PPOB di Desa | agen-brilink | bisnis | unisex | produktif | ✅ | Financial services |
| 1.30 | Agribusiness & Recycling | Ternak Kambing Sistem Aqiqah/Qurban | ternak-kambing-aqiqah | bisnis | unisex | produktif | ✅ | Religious livestock |
| 1.31 | Digital & Knowledge Work | Makelar Tanah Desa (Broker Lokal) | makelar-tanah-desa | bisnis | unisex | produktif | ✅ | Property brokerage |
| 1.32 | Agribusiness & Recycling | Supplier Daun Pisang ke Restoran | supplier-daun-pisang | bisnis | unisex | produktif | ✅ | Supply chain |
| 1.33 | Agribusiness & Recycling | Budidaya Jamur Tiram / Kuping | budidaya-jamur | bisnis | unisex | produktif | ✅ | Mushroom farming |
| 1.34 | Local Services | Jasa Tebang & Potong Kayu (Chainsaw) | jasa-tebang-kayu | bisnis | unisex | muda | ✅ | Chainsaw service |
| 1.35 | Commerce & Brokerage | Jastip Hasil Bumi Spesifik (Madu, Kopi) | jastip-hasil-bumi | bisnis | unisex | muda | ✅ | Specialty products |
| 1.35a | Commerce & Brokerage | Jastip Hasil Bumi Spesifik | jastip-hasil-bumi-spesifik | bisnis | unisex | produktif | ✅ | Specialty products |
| 1.36 | Agribusiness & Recycling | Ternak Lele Sistem Bioflok | ternak-lele-bioflok | bisnis | unisex | produktif | ✅ | Fish farming |
| 1.37 | Agribusiness & Recycling | Produsen Pupuk Kompos Mandiri | produsen-pupuk-kompos | bisnis | unisex | produktif | ✅ | Organic fertilizer |
| 1.38 | Digital & Knowledge Work | Makelar Hewan Ternak Online | makelar-hewan-ternak | bisnis | unisex | produktif | ✅ | Livestock broker |
| 1.39 | Agribusiness & Recycling | Budidaya Ikan Hias (Channa/Cupang) | budidaya-ikan-hias | bisnis | unisex | muda | ✅ | Ornamental fish |
| 1.40 | Local Services | Jasa Bor Air / Sumur Artesis | jasa-bor-air | bisnis | unisex | produktif | ✅ | Well drilling |
| 1.41 | Agribusiness & Recycling | Pembuat Arang Batok Kelapa | pembuat-arang | bisnis | unisex | produktif | ✅ | Charcoal production |
| 1.42 | Agribusiness & Recycling | Supplier Kayu Bakar / Serbuk Gergaji | supplier-kayu-bakar | bisnis | unisex | produktif | ✅ | Wood supply |
| 1.43 | Local Services | Jasa Semprot Hama Pertanian (Drone) | jasa-semprot-hama | bisnis | unisex | muda | ✅ | Pest control |
| 1.44 | Agribusiness & Recycling | Pengepul minyak Jelantah | pengepul-minyak-jelantah | bisnis | unisex | produktif | ✅ | Used oil recycling |
| 1.45 | Agribusiness & Recycling | Produsen Bibit Tanaman / Stek | produsen-bibit-tanaman | bisnis | unisex | produktif | ✅ | Plant nursery |
| 1.46 | Professional Services | Konsultan Legalitas & HAKI UMKM | konsultan-legalitas-haki | bisnis | unisex | muda | ✅ | Legal consultant |
| 1.47 | Professional Services | Virtual Bookkeeper & Tax Filer | virtual-bookkeeper | karir | unisex | muda | ✅ | Accounting services |
| 1.48 | Professional Services | Freelance Headhunter Lokal | headhunter-lokal | karir | unisex | produktif | ✅ | Recruitment |
| 1.49 | Local Services | Jasa Hitung RAB & Drafter Bangunan | jasa-rab-drafter | bisnis | unisex | muda | ✅ | Construction |
| 1.50 | Professional Services | Konsultan Gizi & Katering Diet | konsultan-gizi-katering | bisnis | unisex | muda | ✅ | Nutrition business |
| 1.51 | Professional Services | Penerjemah Tersumpah | penerjemah-tersumpah | karir | unisex | produktif | ✅ | Translation |
| 1.52 | Digital & Knowledge Work | Ghostwriter Buku Biografi | ghostwriter-biografi | karir | unisex | produktif | ✅ | Writing services |
| 1.53 | Professional Services | Konsultan Amdal / Lingkungan | konsultan-amdal | bisnis | unisex | produktif | ✅ | Environmental |
| 1.54 | Professional Services | Psikolog Online / Konselor | psikolog-online | karir | unisex | produktif | ✅ | Mental health |
| 1.55 | Digital & Knowledge Work | Tutor Privat Kurikulum Internasional | tutor-kurikulum-internasional | karir | unisex | muda | ✅ | Education |
| 1.56 | Professional Services | Data Analyst Freelance (UMKM) | data-analyst-umkm | karir | unisex | muda | ✅ | Analytics |
| 1.57 | Professional Services | Konsultan K3 (Keselamatan Kerja) | konsultan-k3 | bisnis | unisex | produktif | ✅ | Safety consulting |
| 1.58 | Professional Services | Jasa Pembuatan SOP Perusahaan | jasa-sop-perusahaan | bisnis | unisex | muda | ✅ | SOP services |
| 1.59 | Professional Services | Bimbingan Skripsi / Tesis | bimbingan-skripsi-tesis | karir | unisex | muda | ✅ | Academic consulting |
| 1.60 | Professional Services | Konsultan Digital Marketing | konsultan-digital-marketing | karir | unisex | muda | ✅ | Digital marketing |
| 1.61 | Professional Services | Jasa Konsultan Ekspor UMKM | jasa-konsultan-ekspor | bisnis | unisex | produktif | ✅ | Export consulting |
| 1.62 | Professional Services | Auditor Independen Skala Kecil | auditor-independen | bisnis | unisex | produktif | ✅ | Auditing |
| 1.63 | Digital & Knowledge Work | Desainer Interior Niche (Spesialis Kosan) | desainer-interior-kosan | bisnis | unisex | muda | ✅ | Interior design |
| 1.64 | Professional Services | Konselor Pendidikan LN | konselor-pendidikan-ln | karir | unisex | produktif | ✅ | Education abroad |
| 1.65 | Professional Services | Jasa Pitch Deck & Business Plan | jasa-pitch-deck | bisnis | unisex | muda | ✅ | Startup services |
| 1.66 | Local Services | Jasa Deep Cleaning Kasur dan Sofa: Niche Spesialis | deep-cleaning-kasur-sofa | bisnis | unisex | produktif | ✅ | MERGED angle: fokus niche khusus kasur & sofa (tanpa AC). Differentiate from 1.18 yang cover AC only |
| 1.67 | Digital & Knowledge Work | Spesialis Cuci AC & Maintenance | spesialis-cuci-ac | bisnis | unisex | produktif | ✅ | HVAC service |
| 1.68 | Local Services | Jasa Perbaikan Pipa Mampet | jasa-perbaikan-pipa | bisnis | unisex | produktif | ✅ | Plumbing |
| 1.69 | Digital & Knowledge Work | MUA Spesialis Wisuda/Karakter | mua-spesialis | bisnis | female | muda | ✅ | Makeup artist |
| 1.70 | Local Services | Jasa Seni Balon & Dekor | jasa-seni-balon | bisnis | unisex | muda | ✅ | Event decoration |
| 1.71 | Local Services | Cuci Sepatu & Tas Premium | cuci-sepatu-tas | bisnis | unisex | muda | ✅ | Shoe cleaning |
| 1.72 | Local Services | Jasa Poles Lantai | jasa-poles-lantai | bisnis | unisex | produktif | ✅ | Floor polishing |
| 1.73 | Local Services | Jasa Pet Sitter | jasa-pet-sitter | bisnis | unisex | muda | ✅ | Pet care |
| 1.74 | Local Services | Jasa Grooming Hewan Panggilan | jasa-grooming-hewan | bisnis | unisex | muda | ✅ | Mobile pet grooming |
| 1.75 | Local Services | Jasa Pindahan Rumah | jasa-pindahan-rumah | bisnis | unisex | produktif | ✅ | Moving service |
| 1.76 | Local Services | Jasa Instalasi Smart Home | jasa-instalasi-smart | bisnis | unisex | muda | ✅ | Smart home |
| 1.77 | Digital & Knowledge Work | Pembersihan Pasca Renovasi | pembersihan-pasca-renovasi | bisnis | unisex | produktif | ✅ | Post-con cleaning |
| 1.78 | Local Services | Salon Mobil Panggilan | salon-mobil-panggilan | bisnis | unisex | produktif | ✅ | Mobile car wash |
| 1.79 | Local Services | Jasa Rakit & Servis PC | jasa-rakit-servis-pc | bisnis | unisex | muda | ✅ | PC services |
| 1.80 | Local Services | Jasa Hias Seserahan | jasa-hias-seserahan | bisnis | female | muda | ✅ | Wedding decoration |
| 1.81 | Commerce & Brokerage | Jastip IKEA / Informa / Ace | jastip-ikea-informa | bisnis | unisex | muda | ✅ | Errand service |
| 1.82 | Local Services | Jasa Sedot WC / Limbah | jasa-sedot-wc | bisnis | unisex | produktif | ✅ | Septic service |
| 1.83 | Local Services | Tukang Kunci Panggilan | tukang-kunci-panggilan | bisnis | unisex | produktif | ✅ | Locksmith |
| 1.84 | Local Services | Sewa Genset Portable | sewa-genset-portable | bisnis | unisex | produktif | ✅ | Generator rental |
| 1.85 | Local Services | Sewa Panggung & Tenda | sewa-panggung-tenda | bisnis | unisex | produktif | ✅ | Event rental |
| 1.86 | Local Services | Sewa Peralatan Bayi | sewa-peralatan-bayi | bisnis | unisex | produktif | ✅ | Baby equipment |
| 1.87 | Local Services | Sewa Mainan Besar (Istana Balon) | sewa-mainan-besar | bisnis | unisex | produktif | ✅ | Party rental |
| 1.88 | Local Services | Sewa HT / Alat Komunikasi | sewa-ht-komunikasi | bisnis | unisex | muda | ✅ | Radio rental |
| 1.89 | Local Services | Sewa Alat Mendaki | sewa-alat-mendaki | bisnis | unisex | muda | ✅ | Camping gear |
| 1.90 | Local Services | Sewa Kamera / Proyektor | sewa-kamera-proyektor | bisnis | unisex | muda | ✅ | AV equipment |
| 1.91 | Local Services | Sewa Baju Adat / Kostum | sewa-baju-adat | bisnis | unisex | produktif | ✅ | Costume rental |
| 1.92 | Local Services | Sewa Scaffolding | sewa-scaffolding | bisnis | unisex | produktif | ✅ | Construction rental |
| 1.93 | Local Services | Sewa Mobil Box / Pick Up | sewa-mobil-box | bisnis | unisex | produktif | 📝 | Vehicle rental |
| 1.94 | Digital & Knowledge Work | Makelar Motor / Mobil Bekas | makelar-motor-mobil | bisnis | unisex | produktif | ✅ | Vehicle broker |
| 1.95 | Digital & Knowledge Work | Makelar Kost / Kontrakan | makelar-kost-kontrakan | bisnis | unisex | muda | ✅ | Housing broker |
| 1.96 | Local Services | Sewa PlayStation ke Rumah | sewa-playstation-rumah | bisnis | unisex | muda | ✅ | Gaming rental |
| 1.97 | Commerce & Brokerage | Dropship Bahan Bangunan | dropship-bahan-bangunan | bisnis | unisex | produktif | ✅ | Building materials |
| 1.98 | Local Services | Sewa Gaun Pengantin | sewa-gaun-pengantin | bisnis | female | produktif | ✅ | Wedding gown |
| 1.99 | Local Services | Sewa Kipas Angin Air (Misty Fan) / AC Standing | sewa-kipas-angin | bisnis | unisex | produktif | 📝 | Cooling equipment |
| 1.100 | Digital & Knowledge Work | Makelar Kayu Jati | makelar-kayu-jati | bisnis | unisex | produktif | ✅ | Timber broker |
| 1.101 | Commerce & Brokerage | Admin Sosmed Toko Lokal | admin-sosmed-toko | karir | unisex | muda | ✅ | Social media manager |
| 1.102 | Commerce & Brokerage | Jasa Optimasi Google My Business | optimasi-gmb | bisnis | unisex | muda | 📝 | GMB optimization |
| 1.103 | Commerce & Brokerage | Food Reviewer Lokal | food-reviewer-lokal | karir | unisex | muda | ✅ | Content creator |
| 1.104 | Commerce & Brokerage | Jasa Fotografi Menu Makanan | jasa-fotografi-menu | bisnis | unisex | muda | ✅ | Food photography |
| 1.105 | Commerce & Brokerage | Host Live Streaming E-commerce | host-live-streaming | karir | unisex | muda | ✅ | Live streaming |
| 1.106 | Digital & Knowledge Work | Makelar Influencer Lokal | makelar-influencer | bisnis | unisex | muda | ✅ | Influencer manager |
| 1.107 | Local Services | Jasa Bikin Web UMKM Lokal | jasa-bikin-web-umkm | bisnis | unisex | muda | 📝 | Web development |
| 1.108 | Commerce & Brokerage | Filter IG / TikTok Pernikahan | filter-ig-tiktok | bisnis | unisex | muda | ✅ | AR filters |
| 1.109 | Digital & Knowledge Work | Voice Over Artist: Iklan Lokal dan Bahasa Indonesia | voice-over-artist-indonesia | karir | unisex | muda | ✅ | MERGED: voice over untuk iklan lokal DAN voice over artist Bahasa Indonesia. Cover both local commercial VO work AND Indonesian language VO for global clients |
| 1.110 | Digital & Knowledge Work | Desainer Grafis / PPT Premium | desainer-grafis-ppt | karir | unisex | muda | ✅ | Design services |
| 1.111 | Commerce & Brokerage | Pembuat Video Profil Desa | video-profil-desa | bisnis | unisex | muda | ✅ | Video production |
| 1.112 | Commerce & Brokerage | Undangan Website & Video | undangan-website-video | bisnis | unisex | muda | ✅ | Digital invitation website & video service |
| 1.113 | Agribusiness & Recycling | Dropshipper Sayur Organik via WA Grup | dropshipper-sayur | bisnis | unisex | produktif | ✅ | Organic produce |
| 1.114 | Commerce & Brokerage | Jasa Hapus Latar Foto | hapus-latar-foto | bisnis | unisex | muda | ✅ | Photo background removal service guide |
| 1.115 | Local Services | Jasa Setting FB Ads Lokal | setting-fb-ads | bisnis | unisex | muda | 📝 | Ads manager |
| 1.116 | Digital & Knowledge Work | Jasa Tulis Caption / Copywriting | tulis-caption | karir | unisex | muda | ✅ | Copywriting |
| 1.117 | Digital & Knowledge Work | Penyedia Jasa Talent UGC | penyedia-jasa-talent | bisnis | unisex | muda | ✅ | UGC services |
| 1.118 | Local Services | Jasa Setup POS Toko/Resto | setup-pos-toko | bisnis | unisex | muda | ✅ | POS setup |
| 1.119 | Local Services | Jasa Digitalisasi Dokumen | digitalisasi-dokumen | bisnis | unisex | muda | 📝 | Document scanning |
| 1.120 | Commerce & Brokerage | Jasa Buka Toko Online | buka-toko-online | bisnis | unisex | muda | ✅ | E-commerce setup |
| 1.121 | Digital & Knowledge Work | YouTube Cashcow Video Editor | youtube-editor | karir | unisex | muda | ✅ | Video editing |
| 1.122 | Digital & Knowledge Work | Short-Form Video Repurposer | short-form-video | karir | unisex | muda | ✅ | Content repurposing |
| 1.123 | Digital & Knowledge Work | Thumbnail Designer Spesialis | thumbnail-desainer | karir | unisex | muda | ✅ | Thumbnail design |
| 1.124 | Digital & Knowledge Work | UI/UX Designer (Figma) | ui-ux-designer | karir | unisex | muda | 📝 | UI/UX design |
| 1.125 | Digital & Knowledge Work | Webflow / Framer Developer | webflow-framer | karir | unisex | muda | 📝 | No-code development |
| 1.126 | Professional Services | Pitch Deck Designer | pitch-deck-designer | karir | unisex | muda | ✅ | Presentation design |
| 1.127 | Career Starter | 3D Modeler & Renderer | 3d-modeler | karir | unisex | muda | 📝 | 3D modeling |
| 1.128 | Digital & Knowledge Work | Notion Template Creator | notion-template | karir | unisex | muda | ✅ | Template design |
| 1.129 | Digital & Knowledge Work | Podcast Audio Editor | podcast-editor | karir | unisex | muda | ✅ | Audio editing |
| 1.130 | Career Starter | Font / Typeface Creator | font-creator | karir | unisex | muda | ✅ | Typography |
| 1.131 | Digital & Knowledge Work | Direct Response Copywriter | direct-response-copywriter | karir | unisex | muda | ✅ | Copywriting |
| 1.132 | Digital & Knowledge Work | B2B SaaS Blog Writer | saas-blog-writer | karir | unisex | muda | 📝 | Content writing |
| 1.133 | Digital & Knowledge Work | Twitter/LinkedIn Ghostwriter | twitter-ghostwriter | karir | unisex | muda | 📝 | Ghostwriting |
| 1.134 | Career Starter | Subtitle / Caption Translator | subtitle-translator | karir | unisex | muda | ✅ | Translation |
| 1.135 | Digital & Knowledge Work | Technical Writer | technical-writer | karir | unisex | muda | 📝 | Technical writing |
| 1.136 | Digital & Knowledge Work | Email Deliverability Specialist | email-deliverability | karir | unisex | muda | 📝 | Email marketing |
| 1.137 | Digital & Knowledge Work | Resume / LinkedIn Makeover | resume-linkedin | karir | unisex | muda | 📝 | Career services |
| 1.138 | Professional Services | Grant Writer | grant-writer | karir | unisex | produktif | 📝 | Proposal writing |
| 1.139 | Career Starter | E-book Formatter (KDP) | ebook-formatter | karir | unisex | muda | 📝 | Publishing |
| 1.140 | Digital & Knowledge Work | Indonesian Tutor for Foreigners | indonesian-tutor | karir | unisex | muda | ✅ | Language tutoring |
| 1.141 | Digital & Knowledge Work | Executive Virtual Assistant | executive-va | karir | unisex | muda | 📝 | Language tutoring |
| 1.142 | Digital & Knowledge Work | Customer Support Ticket Manager | customer-support | karir | unisex | muda | ✅ | Support services |
| 1.143 | Digital & Knowledge Work | Online Community Manager | community-manager | karir | unisex | muda | ✅ | Community management |
| 1.144 | Digital & Knowledge Work | Lead Generation / Data Scraper | lead-generation | karir | unisex | muda | 📝 | Data services |
| 1.145 | Digital & Knowledge Work | Appointment Setter (DM Closer) | appointment-setter | karir | unisex | muda | ✅ | Sales |
| 1.146 | Digital & Knowledge Work | E-commerce Product Lister | product-lister | karir | unisex | muda | 📝 | Listing services |
| 1.147 | Digital & Knowledge Work | Podcast Booker | podcast-boker | karir | unisex | muda | ✅ | Booking services |
| 1.148 | Digital & Knowledge Work | Discord Server Architect | discord-architect | karir | unisex | muda | 📝 | Tech services |
| 1.149 | Digital & Knowledge Work | Airtable / Notion Database Builder | notion-database | karir | unisex | muda | ✅ | Database services |
| 1.150 | Digital & Knowledge Work | QA Tester dan Software Tester: Panduan Lengkap | qa-software-tester | karir | unisex | muda | 📝 | MERGED: QA testing DAN software testing. Cover both manual QA testing methodologies AND automated software testing tools |
| 1.151 | Career Starter | Google Ads Specialist (Local US) | google-ads-specialist | karir | unisex | muda | 📝 | PPC advertising |
| 1.152 | Commerce & Brokerage | Pinterest Account Manager | pinterest-manager | karir | unisex | muda | 📝 | Social media |
| 1.153 | Digital & Knowledge Work | SEO Link Builder | seo-link-builder | karir | unisex | muda | 📝 | SEO services |
| 1.154 | Digital & Knowledge Work | UGC Creator | ugc-creator | karir | unisex | muda | ✅ | Content creation |
| 1.155 | Commerce & Brokerage | Affiliate Marketing | affiliate-marketing | karir | unisex | muda | 📝 | Affiliate |
| 1.156 | Digital & Knowledge Work | Zapier / Make Automation Expert | zapier-automation | karir | unisex | muda | 📝 | Automation |
| 1.157 | Career Starter | Facebook/TikTok Ads Media Buyer | fb-tiktok-ads | karir | unisex | muda | 📝 | Ads management |
| 1.158 | Commerce & Brokerage | Dropship to US (Shopify) | dropship-shopify | bisnis | unisex | muda | 📝 | E-commerce |
| 1.159 | Digital & Knowledge Work | Cold Email Campaign Manager | cold-email-manager | karir | unisex | muda | ✅ | Email campaigns |
| 1.160 | Digital & Knowledge Work | CRO Specialist | cro-specialist | karir | unisex | muda | 📝 | Optimization |
| 1.161 | Commerce & Brokerage | Drop Servicing Agency | drop-servicing | bisnis | unisex | muda | 📝 | Agency business |
| 1.162 | Digital & Knowledge Work | Remote Travel Planner | remote-travel | bisnis | unisex | muda | 📝 | Travel services |
| 1.163 | Career Starter | Spotify Playlist Curator | spotify-curator | karir | unisex | muda | 📝 | Music curation |
| 1.164 | Career Starter | Music / Beat Producer | music-producer | karir | unisex | muda | ✅ | Music production |
| 1.165 | Career Starter | Shopify Store Developer | shopify-developer | karir | unisex | muda | ✅ | E-commerce dev |
| 1.166 | Digital & Knowledge Work | Discord/Telegram Crypto Moderator | crypto-moderator | karir | unisex | muda | ✅ | Moderation |
| 1.167 | Commerce & Brokerage | Print on Demand (Etsy/Redbubble) | print-on-demand | bisnis | unisex | muda | ✅ | Print business |
| 1.168 | Commerce & Brokerage | Etsy Digital Printables | etsy-printables | bisnis | unisex | muda | 📝 | Digital products |
| 1.169 | Career Starter | Cara Dapat Sertifikasi Gratis untuk Naik Gaji | sertifikasi-gratis-naik-gaji | karir | unisex | muda | ✅ | Free certification platforms & tips |
| 1.170 | Career Starter | Freelance di Fiverr/Upwork: Panduan Pemula | fiverr-upwork-pemula | karir | unisex | muda | ✅ | Global freelancing platforms |
| 1.171 | Commerce & Brokerage | Jastip Skincare & Makeup Korea | jastip-skincare-korea | bisnis | female | muda | ✅ | Korean beauty arbitrage |
| 1.172 | Local Services | Jasa Cuci Karpet & Permadani | jasa-cuci-karpet | bisnis | unisex | produktif | ✅ | Home textile cleaning |
| 1.173 | Digital & Knowledge Work | Social Media Manager untuk UMKM Kecil | sosmed-manager-umkm | karir | unisex | muda | ✅ | SMM for micro-enterprises |
| 1.174 | Agribusiness & Recycling | Ternak Ayam Kampung Organik | ternak-ayam-kampung-organik | bisnis | unisex | produktif | 📝 | Organic free-range chicken |
| 1.175 | Professional Services | Jasa Pembuatan Laporan Keuangan UMKM | jasa-laporan-keuangan-umkm | bisnis | unisex | produktif | 📝 | SME financial reporting |
| 1.176 | Career Starter | Cara Negosiasi Kerja Freelance (Rate & Deadline) | negosiasi-freelance | karir | unisex | muda | 📝 | Freelance contract negotiation |
| 1.177 | Local Services | Jasa Service AC Panggilan | jasa-service-ac-panggilan | bisnis | unisex | produktif | ✅ | AC repair & maintenance |
| 1.178 | Commerce & Brokerage | Reseller Produk Lokal (UMKM) di Shopee/Tokopedia | reseller-produk-lokal-shopee | bisnis | unisex | muda | ✅ | Local product marketplace reselling |
| 1.179 | Personal Development | Cara Public Speaking Efektif untuk Profesional | cara-public-speaking-efektif-untuk-profesional | karir | unisex | produktif | 📝 | Cover fundamental public speaking skills for working professionals |
| 1.180 | Personal Development | Latihan Public Speaking Mandiri untuk Pemula | latihan-public-speaking-mandiri-untuk-pemula | karir | unisex | muda | ✅ | Self-practice routines for public speaking beginners |
| 1.183 | Productivity | Manajemen Waktu untuk Pekerja Sampingan: Balance Kerja Utama dan Side Hustle | manajemen-waktu-pekerja-sampingan | karir | unisex | produktif | 📝 | MERGED: time blocking, prioritization, DAN balancing full-time job with side hustle. Cover both time management techniques AND work-life balance strategies |
| 1.184 | Personal Development | Membangun Personal Branding untuk Pertumbuhan Karir | membangun-personal-branding-untuk-pertumbuhan-karir | karir | unisex | muda | ✅ | LinkedIn and social media personal branding for fresh graduates |
| 1.185 | Personal Development | Tips Personal Branding untuk Pekerja Muda | tips-personal-branding-untuk-pekerja-muda | karir | unisex | produktif | ✅ | Building professional reputation in early career stages |
| 1.186 | Networking | Strategi Networking Efektif untuk Freelancer | strategi-networking-efektif-untuk-freelancer | karir | unisex | produktif | 📝 | Online and offline networking strategies for freelancers |
| 1.187 | Networking | Cara Membangun Hubungan dengan Klien Freelance | cara-membangun-hubungan-dengan-klien-freelance | bisnis | unisex | produktif | 📝 | Client retention networking for freelance workers |
| 1.188 | Productivity | Rekomendasi Tools Produktivitas untuk Hustler | rekomendasi-tools-produktivitas-untuk-hustler | karir | unisex | muda | ✅ | Free and low-cost task management, focus tools for hustlers |
| 1.189 | Productivity | Cara Menggunakan Notion untuk Manajemen Side Hustle | cara-menggunakan-notion-untuk-manajemen-side-hustle | bisnis | unisex | produktif | 📝 | Notion template setup for side hustle management |
| 1.190 | Basic Business Ops | Akuntansi dan Pembukuan Dasar untuk Solopreneur | akuntansi-pembukuan-solopreneur | keuangan | unisex | produktif | ✅ | MERGED (1.191-1.194): cash vs accrual, transaction recording, simple bookkeeping for non-accountants, DAN free templates. Comprehensive guide with embedded template resources |
| 1.191 | Basic Business Ops | Script Layanan Pelanggan dan Penanganan Komplain untuk Bisnis Kecil | script-layanan-komplain-pelanggan | bisnis | unisex | produktif | 📝 | MERGED (1.195-1.196): WhatsApp/email/chat customer service scripts DAN de-escalation/complaint resolution. Include both proactive scripts AND reactive complaint handling |
| 1.192 | Basic Business Ops | Manajemen Email Bisnis: Setup Profesional dan Pemisahan Akun | manajemen-email-bisnis-setup | bisnis | unisex | produktif | 📝 | MERGED (1.197-1.198): inbox organization, labeling, auto-reply DAN professional email setup for hustlers. Cover both email management AND personal/business separation |
| 1.193 | Basic Business Ops | WhatsApp Business Setup dan Optimasi untuk Penjualan | whatsapp-business-setup-optimasi | bisnis | unisex | produktif | ✅ | MERGED (1.199-1.200): profile setup, catalog creation, auto-reply DAN broadcast, label, chatbot for sales. Complete WA Business guide from setup to optimization |
| 1.194 | Digital Marketing | Fotografi Dasar untuk Listing Produk Online | fotografi-dasar-untuk-listing-produk-online | bisnis | unisex | muda | ✅ | Smartphone photography tips for product listing shots |
| 1.195 | Digital Marketing | Cara Edit Foto Produk dengan HP untuk Marketplace | cara-edit-foto-produk-dengan-hp-untuk-marketplace | bisnis | unisex | produktif | ✅ | Free mobile editing apps for marketplace product photos |
| 1.196 | Digital Marketing | Editing Video Sederhana untuk Konten Sosmed Hustler | editing-video-sederhana-untuk-konten-sosmed-hustler | bisnis | unisex | muda | ✅ | CapCut, InShot basics for Reels, TikTok, and Shorts content |
| 1.197 | Digital Marketing | Ide Konten Video Produk untuk Penjualan | ide-konten-video-produk-untuk-penjualan | bisnis | unisex | produktif | ✅ | Short video content ideas to drive small business sales |
| 1.198 | Digital Marketing | Email Marketing untuk Bisnis Kecil: Build List dan Tools Gratis | email-marketing-bisnis-kecil | bisnis | unisex | produktif | 📝 | MERGED (1.205-1.206): lead magnet setup, opt-in forms DAN free tier tools (Mailchimp, ConvertKit). Complete email marketing guide from list building to tool selection |
| 1.199 | Finance Basics | Cara Memisahkan Keuangan Pribadi dan Bisnis | cara-memisahkan-keuangan-pribadi-dan-bisnis | keuangan | unisex | produktif | 📝 | Separate bank accounts, business expense tracking methods |
| 1.200 | Finance Basics | Tips Mengelola Arus Kas Bisnis Kecil | tips-mengelola-arus-kas-bisnis-kecil | keuangan | unisex | produktif | ✅ | Cash flow management basics for solopreneurs |
| 1.201 | Finance Basics | Memahami Laporan Laba Rugi untuk Pemula | memahami-laporan-laba-rugi-untuk-pemula | keuangan | unisex | produktif | ✅ | Profit & loss statement basics and calculation for beginners |
| 1.202 | Finance Basics | Cara Menghitung Margin Keuntungan Bisnis | cara-menghitung-margin-keuntungan-bisnis | keuangan | unisex | produktif | ✅ | Gross vs net profit calculation for small businesses |
| 1.203 | Finance Basics | Kontrak Kerja Freelance: Cara Baca dan Identifikasi Klausul Berbahaya | kontrak-freelance-baca-klausul | hukum | unisex | produktif | 📝 | MERGED (1.211-1.212): key clauses to check DAN red flag clauses to avoid. Complete freelance contract guide from reading to risk identification |
| 1.204 | Technology | Google Workspace untuk Solopreneur: Setup dan Manfaat Kolaborasi | google-workspace-solopreneur | bisnis | unisex | produktif | 📝 | MERGED (1.213-1.214): Gmail/Drive/Docs setup DAN collaboration benefits. Complete guide from installation to team collaboration |
| 1.205 | Technology | Keamanan Akun Bisnis: Password Manager, 2FA, dan Anti-Phishing | keamanan-akun-bisnis | karir | unisex | produktif | 📝 | MERGED (1.215-1.216): password manager recommendations, 2FA setup DAN phishing prevention, secure password practices. Complete account security guide |
| 1.206 | Technology | Cloud Storage dan Backup Otomatis untuk Bisnis Kecil | cloud-storage-backup-bisnis | bisnis | unisex | produktif | 📝 | MERGED (1.217-1.218): Google Drive/Dropbox allocation, backup strategy DAN automated cloud backup setup. Complete cloud storage and data protection guide |
| 1.207 | Digital & Knowledge Work | Cara Menjadi 3D Modeler & Renderer Freelance: Panduan Lengkap dari Nol | 3d-modeler-renderer | bisnis | unisex | muda | 📝 | Complete guide from software selection to freelance monetization, with ROI calculations and Indonesian market data |

**Tier 1 Target**: 207 articles (156 complete, 46 ready to write)

---

## Tier 2: The Scaler (Business Scaling & Financial Planning)
**Target Audience:** Managers, professionals, small business owners
**Content Focus:** Systematization, scaling, paper assets, financial planning

| # | Cluster | Title | Slug | Category | Gender | Age | Status | Notes |
|---|---------|-------|------|----------|--------|-----|--------|-------|
| 2.1 | Growth & Expansion | Cara Scale-Up UMKM dari 0 ke 100 Juta/bulan | scale-up-umkm | bisnis | unisex | produktif | ✅ | Growth strategy |
| 2.2 | Investing | Panduan Lengkap Reksa Dana untuk Pemula | reksa-dana-pemula | investasi | unisex | produktif | ✅ | Investment basics; Bisa dikembangkan dengan: Perbandingan reksa dana indeks vs reksa dana aktif |
| 2.3 | Operations & Systems | Cara Buat SOP Bisnis yang Efektif | sop-bisnis-efektif | bisnis | unisex | produktif | ✅ | Operations management |
| 2.4 | Investing | Obligasi Negara vs Obligasi Korporasi | obligasi-negara-korporasi | investasi | unisex | produktif | ✅ | Bond comparison |
| 2.5 | Finance Control | Financial Planning untuk Keluarga Muda | financial-planning-keluarga | keuangan | unisex | produktif | ✅ | Family finance |
| 2.6 | Investing | Cara Mulai Investasi Saham Blue-Chip | saham-blue-chip | investasi | unisex | produktif | ✅ | Stock investing |
| 2.7 | Legal & Risk | Pajak untuk Freelancer dan Pengusaha | pajak-freelancer | hukum | unisex | produktif | ✅ | Tax obligations; Bisa dikembangkan dengan: Panduan lapor SPT Tahunan badan vs pribadi |
| 2.8 | Legal & Risk | Asuransi Kesehatan vs Asuransi Jiwa | asuransi-kesehatan-jiwa | keuangan | unisex | produktif | ✅ | Insurance guide |
| 2.9 | Growth & Expansion | Cara Analisis Bisnis Sebelum Ekspansi | analisis-bisnis-ekspansi | bisnis | unisex | produktif | ✅ | Expansion strategy |
| 2.10 | Investing | Dividen Investing untuk Pemula | dividen-investing-pemula | investasi | unisex | produktif | 📝 | Dividend strategy basics; Differentiated from 3.28 (advanced dividend portfolio) |
| 2.11 | People & HR | The First Hire: Strategi Rekrut Tim Pertama | rekrutmen-tim-pertama | bisnis | unisex | produktif | ✅ | Team building |
| 2.12 | Finance Control | Manajemen Cash Flow untuk UMKM | cash-flow-umkm | keuangan | unisex | produktif | ✅ | Cash management |
| 2.13 | Investing | ETF vs Saham Individual: Mana Lebih Baik? | etf-vs-saham | investasi | unisex | produktif | ✅ | Investment vehicles |
| 2.14 | Growth & Expansion | Cara Bikin Business Plan yang Menarik | business-plan | bisnis | unisex | produktif | ✅ | Planning template |
| 2.15 | Legal & Risk | Retirement Planning di Usia 30-an | retirement-30an | keuangan | unisex | produktif | ✅ | Early retirement |
| 2.16 | Legal & Risk | Jebakan Lifestyle Creep: Gaji Naik Tabungan Nol | jebakan-lifestyle-creep | keuangan | unisex | produktif | ✅ | Financial psychology |
| 2.17 | Finance Control | Pemisahan Entitas: Rekening Pribadi vs Bisnis | pemisahan-rekening-bisnis | keuangan | unisex | produktif | ✅ | Cash management |
| 2.18 | Legal & Risk | Konsep War Chest (Dana Perang Bisnis) | war-chest-bisnis | keuangan | unisex | produktif | ✅ | Business reserves |
| 2.19 | Investing | Dasar-dasar Paper Asset | paper-asset | investasi | unisex | produktif | ✅ | Investment basics |
| 2.20 | Operations & Systems | Visualisasi Alur Kerja (Workflow Mapping) | workflow-mapping-bisnis | bisnis | unisex | produktif | ✅ | Operations |
| 2.21 | Operations & Systems | Pembuatan SOP Berbasis Video & Checklist | sop-video-checklist | bisnis | unisex | produktif | ✅ | SOP development |
| 2.22 | Operations & Systems | Automasi Digital Dasar (No-Code Tools) | automasi-umkm-nocode | bisnis | unisex | produktif | ✅ | Automation |
| 2.23 | Operations & Systems | Quality Control (QC) & Standarisasi | qc-standarisasi | bisnis | unisex | produktif | ✅ | Quality management |
| 2.24 | People & HR | Template dan Framework Rekrutmen Karyawan Pertama | framework-rekrutmen-karyawan | bisnis | unisex | produktif | ✅ | Framework & template focus; Differentiated from 2.11 (strategy) and 2.184 (training/onboarding) |
| 2.25 | People & HR | Manajemen Kompensasi (Gaji vs Komisi) | manajemen-kompensasi-tim | bisnis | unisex | produktif | ✅ | HR strategy |
| 2.26 | Operations & Systems | Transformasi Digital untuk UMKM | transformasi-digital-umkm | bisnis | unisex | produktif | ✅ | Digital transformation |
| 2.27 | Growth & Expansion | Strategi Pelanggan (Customer Retention) | retensi-pelanggan | bisnis | unisex | produktif | ✅ | General loyalty strategy & retention principles; Differentiated from 2.113 (CRM tools for UMKM) |
| 2.28 | Legal & Risk | Strategi Pricing & Markup Calculation | pricing-markup-bisnis | bisnis | unisex | produktif | ✅ | Pricing strategy |
| 2.29 | Legal & Risk | Memahami Rasio Keuangan Bisnis | rasio-keuangan-bisnis | keuangan | unisex | produktif | ✅ | Overview of key business financial ratios (profitability, liquidity, solvency); Differentiated from 2.82 (detailed ratio calculations & formulas) |
| 2.30 | Finance Control | Passive Income vs Active Income | passive-active-income | keuangan | unisex | produktif | ✅ | Income types |
| 2.31 | Legal & Risk | Membangun Skor Kredit Bisnis (SLIK OJK) | skor-kredit-bisnis | keuangan | unisex | produktif | ✅ | Business credit |
| 2.32 | Operations & Systems | Vendor Management & Negosiasi | vendor-management | bisnis | unisex | produktif | ✅ | Supplier relations |
| 2.33 | Operations & Systems | Sistem Manajemen Inventori | manajemen-inventori | bisnis | unisex | produktif | ✅ | Inventory control |
| 2.34 | Finance Control | Monthly Financial Review Process | review-keuangan-bulanan | keuangan | unisex | produktif | ✅ | Financial routine |
| 2.35 | Operations & Systems | Tools & Software untuk Business Scaling | tools-scaling-bisnis | bisnis | unisex | produktif | ✅ | Tech stack |
| 2.36 | Growth & Expansion | Mengoptimalkan Customer Acquisition Cost | optimalisasi-cac | bisnis | unisex | produktif | ✅ | Marketing cost |
| 2.37 | Legal & Risk | KPI & Metrik Kinerja Bisnis | kpi-bisnis | bisnis | unisex | produktif | ✅ | Performance metrics |
| 2.38 | Legal & Risk | Membangun Identitas Brand Bisnis | brand-identity-bisnis | bisnis | unisex | produktif | ✅ | Branding |
| 2.39 | Legal & Risk | Email Marketing untuk B2B | email-marketing-b2b | bisnis | unisex | produktif | ✅ | B2B marketing |
| 2.40 | Legal & Risk | A/B Testing & Conversion Optimization | ab-testing | bisnis | unisex | produktif | ✅ | Conversion |
| 2.41 | Legal & Risk | Profit Margin Analysis | analisis-margin-keuntungan | keuangan | unisex | produktif | ✅ | Profitability |
| 2.42 | Legal & Risk | Dasar Exit Planning Bisnis | exit-planning-bisnis | bisnis | unisex | pensiun | ✅ | Business exit |
| 2.43 | Legal & Risk | Crowdfunding & Alternatif Pinjaman Bisnis | crowdfunding-bisnis | keuangan | unisex | produktif | ✅ | Alternative funding |
| 2.44 | Legal & Risk | Membangun Model Pendapatan Berulang | recurring-revenue-model | bisnis | unisex | produktif | ✅ | Subscription model |
| 2.45 | Growth & Expansion | Mengukur ROI Digital Marketing | roi-digital-marketing | bisnis | unisex | produktif | ✅ | Marketing analytics |
| 2.46 | Growth & Expansion | Decision Matrix untuk Prioritas Proyek | decision-matrix-proyek | bisnis | unisex | produktif | ✅ | Project prioritization |
| 2.47 | Operations & Systems | Document Management System (DMS) | dms-bisnis | bisnis | unisex | produktif | ✅ | Document handling |
| 2.48 | Operations & Systems | Standard Operating Environment (SOE) | standard-operating-environment | bisnis | unisex | produktif | ✅ | IT standardization |
| 2.49 | Operations & Systems | Business Continuity Planning (BCP) | business-continuity-plan | bisnis | unisex | produktif | ✅ | Risk mitigation |
| 2.50 | Operations & Systems | Knowledge Management System | knowledge-management | bisnis | unisex | produktif | ✅ | Knowledge transfer |
| 2.51 | Operations & Systems | Change Management dalam Bisnis | change-management-bisnis | bisnis | unisex | produktif | ✅ | Organizational change |
| 2.52 | Operations & Systems | Process Documentation Best Practices | process-documentation | bisnis | unisex | produktif | ✅ | Documentation |
| 2.53 | Operations & Systems | Dashboard Metrics untuk Bisnis | dashboard-metrics-bisnis | bisnis | unisex | produktif | ✅ | Data visualization |
| 2.54 | Legal & Risk | Problem Solving Framework untuk Bisnis | problem-solving-framework | bisnis | unisex | produktif | ✅ | Decision making |
| 2.55 | Operations & Systems | Meeting Management & Agenda | meeting-management | bisnis | unisex | produktif | ✅ | Productivity |
| 2.56 | Growth & Expansion | Product-Market Fit Validation | product-market-fit | bisnis | unisex | produktif | ✅ | Validation |
| 2.57 | Growth & Expansion | Channel Distribution Strategy | channel-distribution | bisnis | unisex | produktif | ✅ | Distribution |
| 2.58 | Growth & Expansion | Partnership & Strategic Alliance | partnership-strategic | bisnis | unisex | produktif | ✅ | Collaborations |
| 2.59 | Growth & Expansion | Market Segmentation Strategy | market-segmentation | bisnis | unisex | produktif | ✅ | Targeting |
| 2.60 | Growth & Expansion | Competitor Analysis Framework | competitor-analysis | bisnis | unisex | produktif | ✅ | Market intelligence |
| 2.61 | Growth & Expansion | Growth Hacking Techniques | growth-hacking | bisnis | unisex | muda | ✅ | Rapid growth |
| 2.62 | Growth & Expansion | Freemium to Premium Conversion | freemium-conversion | bisnis | unisex | produktif | ✅ | Monetization |
| 2.63 | Growth & Expansion | Geographic Expansion Strategy | geographic-expansion | bisnis | unisex | produktif | ✅ | Regional scaling |
| 2.64 | Legal & Risk | Franchise Model vs Licensing | franchise-vs-licensing | bisnis | unisex | produktif | ✅ | Business model |
| 2.65 | Finance Control | Vertical Integration Strategy | vertical-integration | bisnis | unisex | produktif | ✅ | Supply chain |
| 2.66 | Finance Control | Horizontal Integration & Acquisition | horizontal-integration | bisnis | unisex | produktif | ✅ | Growth via M&A |
| 2.67 | Growth & Expansion | Unit Economics & LTV:CAC Ratio | unit-economics-ltv-cac | bisnis | unisex | produktif | ✅ | Economics |
| 2.68 | Growth & Expansion | Viral Coefficient & Network Effects | viral-coefficient | bisnis | unisex | muda | ✅ | Organic growth |
| 2.69 | Growth & Expansion | Referrals & Word-of-Mouth Program | referrals-program | bisnis | unisex | produktif | ✅ | Acquisition |
| 2.70 | Growth & Expansion | Customer Journey Mapping | customer-journey-mapping | bisnis | unisex | produktif | ✅ | CX optimization |
| 2.71 | Growth & Expansion | Upselling & Cross-selling Strategy | upselling-crossselling-strategy | bisnis | unisex | produktif | ✅ | Revenue optimization |
| 2.72 | Growth & Expansion | Launch Strategy & Go-to-Market | launch-strategy-gtm | bisnis | unisex | produktif | ✅ | Market entry |
| 2.73 | Finance Control | Cost Structure Analysis | cost-structure-analysis | keuangan | unisex | produktif | ✅ | Cost management |
| 2.74 | Finance Control | Break-even Analysis | break-even-analysis | keuangan | unisex | produktif | ✅ | Profitability |
| 2.75 | Finance Control | Working Capital Management | working-capital | keuangan | unisex | produktif | ✅ | Liquidity |
| 2.76 | Legal & Risk | Arus Kas Operasional vs Non-Operasional | arus-kas-operasional | keuangan | unisex | produktif | ✅ | Cashflow |
| 2.77 | Legal & Risk | Debt Restructuring Strategy | debt-restructuring | keuangan | unisex | produktif | ✅ | Debt management |
| 2.78 | Legal & Risk | Profit Distribution Strategy | profit-distribution | keuangan | unisex | produktif | ✅ | Reinvestment |
| 2.79 | Finance Control | Emergency Fund untuk Bisnis | emergency-fund-bisnis | keuangan | unisex | produktif | ✅ | Reserves |
| 2.80 | Legal & Risk | Cost of Goods Sold (COGS) Optimization | cogs-optimization | keuangan | unisex | produktif | ✅ | Pricing |
| 2.81 | Finance Control | Overhead Cost Reduction | overhead-cost-reduction | keuangan | unisex | produktif | ✅ | Efficiency |
| 2.82 | Finance Control | Financial Ratio Analysis: Current, Quick, Debt Ratio | financial-ratio-analysis | keuangan | unisex | produktif | ✅ | Detailed ratio calculations & formulas (current ratio, quick ratio, debt-to-equity); Differentiated from 2.29 (overview) |
| 2.83 | Finance Control | Budget vs Actual Variance Analysis | budget-variance-analysis | keuangan | unisex | produktif | ✅ | Control |
| 2.84 | Finance Control | Capital Budgeting Decision | capital-budgeting | keuangan | unisex | produktif | ✅ | Investment decisions |
| 2.85 | Finance Control | Lease vs Buy Decision | lease-vs-buy | keuangan | unisex | produktif | ✅ | Asset decisions |
| 2.86 | Legal & Risk | Tax Planning untuk Bisnis | tax-planning-bisnis | keuangan | unisex | produktif | ✅ | Optimization |
| 2.87 | Investing | Portfolio Rebalancing Strategy | portfolio-rebalancing | investasi | unisex | produktif | ✅ | Portfolio management |
| 2.88 | Investing | Risk-Return Profile Assessment | risk-return-profile | investasi | unisex | produktif | ✅ | Risk assessment |
| 2.89 | Investing | Dollar Cost Averaging (DCA) | dollar-cost-averaging | investasi | unisex | produktif | ✅ | Investment strategy |
| 2.90 | Investing | Indeks Saham Indonesia (IDX) | indeks-saham-indonesia | investasi | unisex | produktif | ✅ | Market indices |
| 2.91 | Investing | Sukuk vs Obligasi: Mana Lebih Cocok? | sukuk-vs-obligasi | investasi | unisex | produktif | ✅ | Islamic finance |
| 2.92 | Investing | Reksa Dana Pasar Uang | reksa-dana-pasar-uang | investasi | unisex | produktif | ✅ | Low risk |
| 2.93 | Investing | Reksa Dana Pendapatan Tetap | reksa-dana-pendapatan-tetap | investasi | unisex | produktif | ✅ | Medium risk |
| 2.94 | Investing | Reksa Dana Campuran | reksa-dana-campuran | investasi | unisex | produktif | ✅ | Balanced |
| 2.95 | Operations & Systems | Robo-Advisor untuk Investasi | robo-advisor | investasi | unisex | produktif | ✅ | Automation |
| 2.96 | Investing | Compound Interest dalam Investasi | compound-interest | investasi | unisex | produktif | ✅ | Time value |
| 2.97 | Investing | Behavioral Finance dalam Investasi | behavioral-finance | investasi | unisex | produktif | ✅ | Psychology |
| 2.98 | Investing | Asset Allocation Strategy | asset-allocation | investasi | unisex | produktif | ✅ | Diversification |
| 2.99 | People & HR | Organizational Structure Design | org-structure-design | bisnis | unisex | produktif | ✅ | Structure |
| 2.100 | People & HR | Performance Management System | performance-management | bisnis | unisex | produktif | ✅ | Appraisal |
| 2.101 | Finance Control | Employee Onboarding Process | employee-onboarding | bisnis | unisex | produktif | ✅ | Integration |
| 2.102 | People & HR | Compensation Package Design | compensation-package | bisnis | unisex | produktif | ✅ | Rewards |
| 2.103 | People & HR | Employee Benefits Optimization | employee-benefits | bisnis | unisex | produktif | ✅ | Retention |
| 2.104 | People & HR | Remote Team Management | remote-team-management | bisnis | unisex | produktif | ✅ | Distributed teams |
| 2.105 | People & HR | Leadership Development Program | leadership-development | bisnis | unisex | produktif | ✅ | Talent pipeline |
| 2.106 | Legal & Risk | Conflict Resolution dalam Tim | conflict-resolution | bisnis | unisex | produktif | ✅ | Team dynamics |
| 2.107 | People & HR | Employee Retention Strategy | employee-retention | bisnis | unisex | produktif | ✅ | Turnover reduction |
| 2.108 | People & HR | Delegation Framework | delegation-framework | bisnis | unisex | produktif | ✅ | Empowerment |
| 2.109 | People & HR | Team Motivation Techniques | team-motivation | bisnis | unisex | produktif | ✅ | Engagement |
| 2.110 | People & HR | Performance Bonus System | performance-bonus | bisnis | unisex | produktif | ✅ | Incentives |
| 2.111 | Legal & Risk | Pivot ke B2B: Cara UMKM Mendapatkan Kontrak Korporat dan Pemerintah | strategi-b2b-umkm | bisnis | unisex | produktif | ✅ | B2B transition |
| 2.112 | Legal & Risk | Panduan Pajak UMKM 2026: Cara Bayar PPh Final 0.5% dan Update Coretax | panduan-pajak-umkm | legal | unisex | produktif | ✅ | UMKM tax |
| 2.113 | Growth & Expansion | Strategi Customer Retention (CRM) untuk UMKM: Cara Bikin Pelanggan "Kecanduan" Belanja | strategi-crm-umkm | bisnis | unisex | produktif | ✅ | Customer retention |
| 2.114 | Operations & Systems | Implementasi ISO 9001 untuk UMKM | iso-9001-umkm | bisnis | unisex | produktif | 📝 | Quality management certification |
| 2.115 | Finance Control | Manajemen Piutang Usaha | manajemen-piutang-usaha | keuangan | unisex | produktif | 📝 | Accounts receivable management |
| 2.116 | Investing | Reksa Dana Indeks (ETF) Lokal | reksa-dana-indeks-etf | investasi | unisex | produktif | 📝 | Local index fund guide |
| 2.117 | People & HR | Kebijakan Cuti Karyawan UMKM | kebijakan-cuti-karyawan | bisnis | unisex | produktif | 📝 | Leave policy design |
| 2.118 | Growth & Expansion | Strategi Ekspansi ke Luar Kota | ekspansi-luar-kota | bisnis | unisex | produktif | 📝 | Inter-city expansion steps |
| 2.119 | Legal & Risk | Perlindungan HAKI untuk Produk UMKM | perlindungan-haki-umkm | hukum | unisex | produktif | 📝 | Intellectual property protection |
| 2.120 | Operations & Systems | Sistem Antrian & Manajemen Pelanggan | sistem-antrian-pelanggan | bisnis | unisex | produktif | 📝 | Queue & customer flow management |
| 2.121 | Finance Control | Perencanaan Pajak Penghasilan Badan | pph-badan-planning | hukum | unisex | produktif | 📝 | Corporate income tax planning |
| 2.122 | Investing | Investasi Emas Batangan vs Logam Mulia | emas-batangan-vs-logam-mulia | investasi | unisex | produktif | 📝 | Gold investment comparison |
| 2.123 | People & HR | Pelatihan Karyawan (Training & Development) | pelatihan-karyawan | bisnis | unisex | produktif | 📝 | Employee skills training |
| 2.124 | Operations & Systems | SOP untuk Customer Service | sop-customer-service | bisnis | unisex | produktif | 📝 | Standardized CS response guidelines |
| 2.125 | Operations & Systems | Sistem Ticketing & Follow-up Pelanggan | sistem-ticketing-followup | bisnis | unisex | produktif | 📋 | Customer query tracking system |
| 2.126 | Operations & Systems | Manajemen Aset Tetap (Fixed Asset) | manajemen-aset-tetap | bisnis | unisex | produktif | 📋 | Asset tracking & depreciation |
| 2.127 | Operations & Systems | Sistem Audit Internal UMKM | audit-internal-umkm | bisnis | unisex | produktif | 📋 | Internal control checks |
| 2.128 | Operations & Systems | Standardisasi Produk & Kemasan | standardisasi-produk-kemasan | bisnis | unisex | produktif | 📋 | Product consistency protocol |
| 2.129 | Operations & Systems | Sistem Penjadwalan Tim (Roster) | sistem-jadwal-tim | bisnis | unisex | produktif | 📋 | Shift & task scheduling |
| 2.130 | Operations & Systems | Manajemen Limbah Usaha | manajemen-limbah-usaha | bisnis | unisex | produktif | 📝 | Waste management compliance |
| 2.131 | Growth & Expansion | Strategi Influencer Marketing Lokal | influencer-marketing-lokal | bisnis | unisex | produktif | 📝 | Local influencer collaboration |
| 2.132 | Growth & Expansion | User Generated Content (UGC) Campaign | ugc-campaign-umkm | bisnis | unisex | produktif | 📝 | Customer content strategy |
| 2.133 | Growth & Expansion | Google Ads untuk UMKM | google-ads-umkm | bisnis | unisex | produktif | 📝 | Search ads setup guide |
| 2.134 | Growth & Expansion | TikTok Ads untuk Penjualan | tiktok-ads-penjualan | bisnis | unisex | muda | 📝 | Short video ads strategy |
| 2.135 | Growth & Expansion | Content Marketing Blog Bisnis | content-marketing-blog | bisnis | unisex | produktif | 📝 | SEO-driven content creation |
| 2.136 | Growth & Expansion | Strategi Dropshipping Lokal | dropshipping-lokal-scaler | bisnis | unisex | produktif | 📝 | Local dropship scaling |
| 2.137 | Growth & Expansion | Loyalty Program Digital | loyalty-program-digital | bisnis | unisex | produktif | 📝 | Points & rewards system |
| 2.138 | Growth & Expansion | Review Management Online | review-management-online | bisnis | unisex | produktif | 📝 | Google/Tokopedia review optimization |
| 2.139 | Finance Control | Manajemen Utang Bisnis (Debt Service) | manajemen-utang-bisnis | keuangan | unisex | produktif | 📝 | Loan repayment planning |
| 2.140 | Finance Control | Penyusutan Aset (Depreciation) | penyusutan-aset | keuangan | unisex | produktif | 📝 | Asset depreciation calculation |
| 2.141 | Finance Control | Pajak PPN: Cara Lapor & Bayar | pajak-ppn-umkm | keuangan | unisex | produktif | 📝 | VAT compliance guide |
| 2.142 | Finance Control | Pajak PPh 21 Karyawan | pph-21-karyawan | keuangan | unisex | produktif | 📝 | Employee income tax filing |
| 2.143 | Finance Control | Laporan Laba Rugi (P&L) | laporan-laba-rugi | keuangan | unisex | produktif | 📝 | Profit & loss statement prep |
| 2.144 | Finance Control | Laporan Neraca (Balance Sheet) | laporan-neraca | keuangan | unisex | produktif | 📝 | Balance sheet analysis |
| 2.145 | Finance Control | Laporan Arus Kas (Cash Flow Statement) | laporan-arus-kas | keuangan | unisex | produktif | 📝 | Cash flow statement creation |
| 2.146 | Finance Control | Manajemen Kas Kecil (Petty Cash) | manajemen-kas-kecil | keuangan | unisex | produktif | 📝 | Small cash control system |
| 2.147 | Finance Control | Budgeting Operasional Tahunan | budgeting-operasional-tahunan | keuangan | unisex | produktif | 📝 | Annual ops budget planning |
| 2.148 | People & HR | Kebijakan Disiplin Karyawan | kebijakan-disiplin-karyawan | bisnis | unisex | produktif | 📋 | Disciplinary action guidelines |
| 2.149 | People & HR | Rekrutmen Karyawan Remote | rekrutmen-remote | bisnis | unisex | produktif | 📋 | Remote hiring process |
| 2.150 | People & HR | Penilaian Kinerja 360 Derajat | penilaian-kinerja-360 | bisnis | unisex | produktif | 📋 | 360-degree performance appraisal |
| 2.151 | People & HR | Kesehatan Mental Karyawan | kesehatan-mental-karyawan | bisnis | unisex | produktif | 📋 | Workplace mental health program |
| 2.152 | People & HR | Sistem Promosi & Demosi | sistem-promosi-demosi | bisnis | unisex | produktif | 📋 | Career progression rules |
| 2.153 | People & HR | Outsourcing vs Karyawan Tetap | outsourcing-vs-tetap | bisnis | unisex | produktif | 📋 | Hiring model comparison |
| 2.154 | People & HR | Pelatihan Soft Skills Karyawan | pelatihan-soft-skills | bisnis | unisex | produktif | 📋 | Communication & teamwork training |
| 2.155 | People & HR | Manajemen Kinerja Freelancer | manajemen-freelancer | bisnis | unisex | produktif | 📋 | Contractor performance tracking |
| 2.156 | Legal & Risk | Perjanjian Kerja Sama (PKS) | perjanjian-kerja-sama | hukum | unisex | produktif | 📋 | Partnership agreement drafting |
| 2.157 | Legal & Risk | Perlindungan Data Pribadi (UU PDP) | uu-pdp-bisnis | hukum | unisex | produktif | 📋 | Personal Data Protection compliance |
| 2.158 | Legal & Risk | Izin Usaha (NIB, SIUP, TDP) | izin-usaha-nib | hukum | unisex | produktif | 📋 | Business license guide |
| 2.159 | Legal & Risk | Perjanjian Sewa Tempat Usaha | perjanjian-sewa-tempat | hukum | unisex | produktif | 📋 | Lease agreement checklist |
| 2.160 | Legal & Risk | Sengketa Konsumen (LPSK) | sengketa-konsumen | hukum | unisex | produktif | 📋 | Consumer dispute resolution |
| 2.161 | Legal & Risk | Ketenagakerjaan (UU Cipta Kerja) | uu-cipta-kerja-bisnis | hukum | unisex | produktif | 📋 | Labor law compliance |
| 2.162 | Legal & Risk | Perlindungan Merek Dagang | perlindungan-merek-dagang | hukum | unisex | produktif | 📋 | Trademark registration guide |
| 2.163 | Operations & Systems | E-commerce Integration (Shopee/Tokopedia) | ecommerce-integration | bisnis | unisex | produktif | 📋 | Multi-platform inventory sync |
| 2.164 | Operations & Systems | Sistem Pembayaran Digital (QRIS) | sistem-pembayaran-qris | bisnis | unisex | produktif | 📋 | QRIS implementation guide |
| 2.165 | Operations & Systems | Analitik Data Bisnis Sederhana | analitik-data-bisnis | bisnis | unisex | produktif | 📋 | Basic business data analytics |
| 2.166 | Operations & Systems | Keamanan Siber UMKM | keamanan-siber-umkm | bisnis | unisex | produktif | 📋 | Cybersecurity basics for SMEs |
| 2.167 | Operations & Systems | Chatbot CS Otomatis | chatbot-cs-otomatis | bisnis | unisex | produktif | 📋 | Automated customer support setup |
| 2.168 | Operations & Systems | Seleksi Vendor Baru | seleksi-vendor-baru | bisnis | unisex | produktif | 📋 | Vendor evaluation criteria |
| 2.169 | Operations & Systems | Manajemen Stok Barang (Stock Opname) | stock-opname | bisnis | unisex | produktif | 📋 | Regular inventory stock check |
| 2.170 | Operations & Systems | Logistik Distribusi Mandiri | logistik-distribusi-mandiri | bisnis | unisex | produktif | 📋 | Self-distribution network setup |
| 2.171 | Operations & Systems | Quality Control Bahan Baku | qc-bahan-baku | bisnis | unisex | produktif | 📋 | Raw material quality control |
| 2.172 | Investing | Reksa Dana Terproteksi | reksa-dana-terproteksi | investasi | unisex | produktif | 📋 | Protected mutual funds guide |
| 2.173 | Investing | Investasi Surat Berharga Negara (SBN) | investasi-sbn | investasi | unisex | produktif | 📋 | Government securities investment |
| 2.174 | Export & Trade | Dokumen Ekspor-Impor Lengkap | dokumen-ekspor-impor | hukum | unisex | produktif | 📋 | Export-import paperwork |
| 2.175 | Export & Trade | Cara Pakai Letter of Credit (L/C) | letter-of-credit | keuangan | unisex | produktif | 📋 | L/C for exporters |
| 2.176 | Export & Trade | Incoterms 2020 untuk Eksportir | incoterms-eksportir | bisnis | unisex | produktif | 📋 | International trade terms |
| 2.177 | Advanced Tax | Transfer Pricing untuk Grup Bisnis | transfer-pricing | hukum | unisex | produktif | 📋 | Related party pricing |
| 2.178 | Advanced Tax | Tax Holiday & Insentif Penanaman Modal | tax-holiday | hukum | unisex | produktif | 📋 | Investment incentives |
| 2.179 | Industry Cert | Sertifikasi Halal MUI untuk UMKM | sertifikasi-halal | hukum | unisex | produktif | 📋 | Halal certification |
| 2.180 | Industry Cert | Pendaftaran BPOM untuk UMKM | pendaftaran-bpom | hukum | unisex | produktif | 📋 | BPOM registration |
| 2.181 | Insurance | Asuransi Siber untuk UMKM | asuransi-siber | keuangan | unisex | produktif | 📋 | Cyber insurance |
| 2.182 | Insurance | Asuransi Karyawan Kunci (Key Person) | asuransi-key-person | keuangan | unisex | produktif | 📋 | Key person coverage |
| 2.183 | Growth | Investor Pitch Preparation | investor-pitch | bisnis | unisex | produktif | 📋 | Pitch deck mastery |
| 2.184 | People & HR | Cara Train dan Onboard Tim Pertama Anda | train-onboard-tim-pertama | bisnis | unisex | produktif | 📋 | Training & onboarding focus; Differentiated from 2.11 (recruitment strategy) and 2.24 (framework template) |
| 2.185 | Finance Control | Laporan Laba Rugi (P&L): Panduan Lengkap | laporan-laba-rugi | keuangan | unisex | produktif | 📝 | Profit & loss statement guide |

**Tier 2 Target**: 185 articles (123 complete, 1 research pending)

---

## Tier 3: Asset Builder (Property, Franchise & Investments)
**Target Audience:** Successful entrepreneurs, high-level executives
**Content Focus:** Real estate, franchising, advanced investing, retirement planning

| # | Cluster | Title | Slug | Category | Gender | Age | Status | Notes |
|---|---------|-------|------|----------|--------|-----|--------|-------|
| 3.1 | Property Strategy | Panduan Lengkap Investasi Properti | investasi-properti | investasi | unisex | produktif | ✅ | Real estate basics; Bisa dikembangkan dengan: Cara mencari properti undervalue di situs jual beli |
| 3.2 | Franchise Ops | Cara Pilih Franchise yang Menguntungkan | pilih-franchise | bisnis | unisex | produktif | ✅ | Franchise selection; Bisa dikembangkan dengan: Ceklis audit kinerja franchise bulanan |
| 3.3 | Property Strategy | Hitung ROI Properti Sewaan | roi-properti-sewaan | investasi | unisex | produktif | ✅ | ROI calculation |
| 3.4 | Property Strategy | KPR vs Cash Keras: Strategi Beli Properti | kpr-vs-cash | investasi | unisex | produktif | ✅ | Purchase strategy |
| 3.5 | Franchise Ops | Cara Mulai Bisnis Franchise dari Nol | franchise-dari-nol | bisnis | unisex | produktif | ✅ | Franchise startup |
| 3.6 | Property Strategy | Investasi Tanah: Tips dan Trik | investasi-tanah | investasi | unisex | produktif | ✅ | Land investment |
| 3.7 | Portfolio & Capital | Portofolio Diversifikasi untuk Investor | diversifikasi-portofolio | investasi | unisex | produktif | ✅ | Portfolio strategy |
| 3.8 | Governance & Exit | Cara Nilai Bisnis untuk Exit Strategy | nilai-bisnis-exit | bisnis | unisex | pensiun | ✅ | Business valuation |
| 3.9 | Property Strategy | Passive Income dari Properti Sewa | passive-income-properti | investasi | unisex | produktif | ✅ | Rental income |
| 3.10 | Property Legal | Pajak Properti: Apa Saja yang Harus Dibayar? | pajak-properti | hukum | unisex | produktif | ✅ | Property taxes |
| 3.11 | Governance & Exit | Family Office: Apa dan Kenapa? | family-office | bisnis | unisex | pensiun | ✅ | Wealth management |
| 3.12 | Property Strategy | Cara Negosiasi Harga Properti | negosiasi-properti | investasi | unisex | produktif | ✅ | Negotiation tactics |
| 3.13 | Portfolio & Capital | REITs vs Properti Fisik: Perbandingan | reits-vs-properti | investasi | unisex | produktif | ✅ | Investment comparison |
| 3.14 | Governance & Exit | Retirement Business Planning | retirement-business | bisnis | unisex | pensiun | ✅ | Exit planning |
| 3.15 | Property Strategy | Legal Structure untuk Bisnis Properti | legal-bisnis-properti | hukum | unisex | produktif | ✅ | Business structure |
| 3.16 | Portfolio & Capital | Transisi Kuadran: Dari "S" ke "I" | transisi-kuadran | investasi | unisex | produktif | ✅ | Investor mindset |
| 3.17 | Property Strategy | Memerangi Pajak Siluman (Inflasi) | pajak-siluman | keuangan | unisex | produktif | ✅ | Inflation defense |
| 3.18 | Portfolio & Capital | Strategi Tiga Keranjang Dana | strategi-keranjang | investasi | unisex | produktif | ✅ | Portfolio allocation |
| 3.19 | Property Legal | Seni Melakukan Due Diligence | due-diligence | investasi | unisex | produktif | ✅ | Investment analysis |
| 3.20 | Property Strategy | Matematika Properti: Cap Rate & ROI | matematika-properti | investasi | unisex | produktif | ✅ | Property math |
| 3.21 | Property Strategy | Ekonomi Kos-kosan & Co-Living | ekonomi-kos-kosan | investasi | unisex | produktif | ✅ | Rental business |
| 3.22 | Property Strategy | Properti Komersial (Minimarket/Bank) | properti-komersial | investasi | unisex | produktif | ✅ | Commercial property |
| 3.23 | Property Strategy | Flipping Properti Kusam | flippping-properti | investasi | unisex | produktif | ✅ | Property flipping |
| 3.24 | Franchise Ops | Anatomi Franchise yang Sehat | anatomi-franchise | bisnis | unisex | produktif | ✅ | Franchise analysis |
| 3.25 | Franchise Ops | Model Operator vs Auto-Pilot | operator-vs-autopilot | bisnis | unisex | produktif | ✅ | Franchise types |
| 3.26 | Franchise Ops | Strategi Multi-Unit Franchising | multi-unit-franchising | bisnis | unisex | produktif | ✅ | Scaling strategy |
| 3.27 | Governance & Exit | Akuisisi Bisnis Lokal (M&A) | akuisisi-bisnis-lokal | bisnis | unisex | produktif | ✅ | Business acquisition |
| 3.28 | Portfolio & Capital | Dividend Investing: Strategi Portofolio Lanjutan | dividen-investing-advanced | investasi | unisex | produktif | 📝 | Advanced dividend portfolio strategy (DRIP, yield optimization, dividend aristocrats); Differentiated from 2.10 (pemula basics) |
| 3.29 | Portfolio & Capital | Obligasi Korporasi & SBN Besar | obligasi-korporasi-besar | investasi | unisex | produktif | ✅ | Bond investing |
| 3.30 | Portfolio & Capital | Menjadi Angel Investor | angel-investor | investasi | unisex | produktif | ✅ | Angel investing |
| 3.31 | Portfolio & Capital | Diversifikasi Saham Global | diversifikasi-saham-global | investasi | unisex | produktif | ✅ | Global stocks |
| 3.32 | Portfolio & Capital | OPM: Hutang Baik vs Buruk | opm-hutang-baik | keuangan | unisex | produktif | ✅ | Debt strategy |
| 3.33 | Property Legal | Menyiasati Pajak Lewat Aset | pajak-lewat-aset | hukum | unisex | produktif | ✅ | Tax optimization |
| 3.34 | Governance & Exit | Exit Strategy Bisnis | exit-strategy-bisnis | bisnis | unisex | produktif | ✅ | Business exit |
| 3.35 | Portfolio & Capital | Mitigasi Risiko Multi-Aset | mitigasi-risiko | keuangan | unisex | produktif | ✅ | Risk management |
| 3.36 | Property Strategy | Pisah Aset Pribadi dan Bisnis Properti | pisah-aset-pribadi-bisnis | hukum | unisex | produktif | 📝 | Ring-fencing aset |
| 3.37 | Property Legal | Due Diligence Sertifikat dan Sengketa Tanah | due-diligence-sertifikat-tanah | hukum | unisex | produktif | ✅ | Cek legal tanah |
| 3.38 | Property Legal | PPJB, AJB, dan HGB yang Wajib Dicek | ppjb-ajb-hgb | hukum | unisex | produktif | 📝 | Dokumen transaksi |
| 3.39 | Property Strategy | Sewa Jangka Panjang vs Short Stay | sewa-jangka-panjang-short-stay | investasi | unisex | produktif | ✅ | Bandingkan yield |
| 3.40 | Property Strategy | Renovasi yang Naikkan Harga Jual Properti | renovasi-naikkan-harga-jual | investasi | unisex | produktif | 📝 | Fokus value-add |
| 3.41 | Franchise Ops | Cek Kontrak Franchise Sebelum Tanda Tangan | cek-kontrak-franchise | hukum | unisex | produktif | ✅ | Red flag kontrak |
| 3.42 | Franchise Ops | Lokasi Franchise: Cara Pilih Titik yang Tepat | lokasi-franchise-tepat | bisnis | unisex | produktif | 📝 | Site selection |
| 3.43 | Property Strategy | Skema Joint Venture Properti Keluarga | joint-venture-properti | bisnis | unisex | produktif | ✅ | Bagi hasil aman |
| 3.44 | Governance & Exit | Buy-Sell Agreement untuk Bisnis Keluarga | buy-sell-agreement-bisnis-keluarga | hukum | unisex | pensiun | 📝 | Aturan keluar-masuk |
| 3.45 | Governance & Exit | Suksesi Aset ke Anak tanpa Ribut | suksesi-aset-ke-anak | hukum | unisex | pensiun | 📝 | Transisi mulus |
| 3.46 | Property Strategy | Proteksi Aset dengan Holding dan Asuransi | proteksi-aset-holding-asuransi | hukum | unisex | produktif | 📝 | Shield tingkat lanjut |
| 3.47 | Property Legal | Pajak BPHTB, PPh, dan Biaya Akta Properti | pajak-bphtb-pph-properti | hukum | unisex | produktif | 📝 | Biaya transaksi |
| 3.48 | Property Strategy | Investasi Properti di Bawah Biaya Pasar (Under Value) | investasi-properti-undervalue | investasi | unisex | produktif | 📝 | Undervalued property hunting |
| 3.49 | Franchise Ops | Audit Kinerja Franchise Bulanan | audit-kinerja-franchise | bisnis | unisex | produktif | ✅ | Monthly franchise performance review |
| 3.50 | Portfolio & Capital | Investasi Saham Syariah Indonesia | saham-syariah-indonesia | investasi | unisex | produktif | ✅ | Sharia-compliant stock guide |
| 3.51 | Governance & Exit | Valuasi Bisnis metode DCF & Aset | valuasi-bisnis-dcf | bisnis | unisex | pensiun | 📝 | Business valuation methods |
| 3.52 | Property Legal | Sengketa Batas Tanah Antar Tetangga | sengketa-batas-tanah | hukum | unisex | produktif | 📝 | Boundary dispute resolution |
| 3.53 | Property Strategy | Konversi Rumah Jadi Kos-Kosan atau Komersial | konversi-rumah-kos-komersial | investasi | unisex | produktif | 📝 | Residential conversion guide |
| 3.54 | Portfolio & Capital | Investasi Sukuk Ritel & Korporasi | investasi-sukuk-ritel | investasi | unisex | produktif | ✅ | Retail & corporate sukuk guide |
| 3.55 | Governance & Exit | Pembagian Warisan Sesuai Hukum Keluarga | pembagian-warisan-hukum-keluarga | hukum | unisex | pensiun | 📝 | Inheritance law compliance |
| 3.56 | Franchise Ops | Franchise Makanan Cepat Saji: Pros & Cons | franchise-makanan-cepat-saji | bisnis | unisex | produktif | 📝 | Fast food franchise analysis |
| 3.57 | Property Strategy | Investasi Properti di Kawasan Industri | investasi-properti-kawasan-industri | investasi | unisex | produktif | 📝 | Industrial property investment |
| 3.58 | Alternative Investments | Investasi Ekuitas Privat (Private Equity) | private-equity | investasi | unisex | produktif | 📝 | PE for high net worth |
| 3.59 | Alternative Investments | Dasar-dasar Venture Capital | venture-capital | investasi | unisex | produktif | ✅ | VC investing guide |
| 3.60 | Alternative Investments | Reksa Dana Lindung Nilai (Hedge Fund) | hedge-fund | investasi | unisex | produktif | ✅ | Hedge funds explained |
| 3.61 | Alternative Investments | Investasi Kripto untuk UHNW | kripto-uhnw | investasi | unisex | produktif | ✅ | Crypto for wealthy |
| 3.62 | Alternative Investments | NFT & Aset Digital: Investasi atau Jebakan? | nft-aset-digital | investasi | unisex | produktif | 📝 | NFT investment analysis |
| 3.63 | ESG & Impact | Investasi ESG Indonesia | esg-investing | investasi | unisex | produktif | ✅ | Environmental, Social, Governance |
| 3.64 | ESG & Impact | Investasi Dampak Sosial (Impact Investing) | impact-investing | investasi | unisex | produktif | ✅ | Social impact strategies |
| 3.65 | Advanced Property | Penyusutan Properti untuk Pajak | penyusutan-properti-pajak | keuangan | unisex | produktif | 📝 | Property tax depreciation |
| 3.66 | Advanced Property | Sindikasi Properti Indonesia | sindikasi-properti | investasi | unisex | produktif | 📝 | Real estate syndication |
| 3.67 | Sharia Wealth | Manajemen Kekayaan Syariah | kekayaan-syariah | investasi | unisex | produktif | ✅ | Sharia wealth management |
| 3.68 | Property + Business | Strategi Kombinasi Properti Komersial dengan Waralaba Retail Alfamart/Indomaret | strategi-properti-komersial-waralaba-retail-alfamart-indomaret | bisnis | unisex | produktif | 📝 | Panduan integrasi aset properti dengan waralaba retail nasional |
| 3.69 | Property + Business | Investasi Properti Gym dan Studio Yoga: Analisis ROI dan Model Pasif untuk Pensiunan | investasi-properti-gym-studio-yoga | investasi | unisex | produktif | 📝 | MERGED: ROI analysis untuk properti gym+yoga premium DAN model passive income untuk pensiunan. Cover both active ROI calculation and retirement-focused passive model |
| 3.70 | Property Hybrid | Model Bisnis Properti Kos-Kosan Gabungan Co-Living untuk Pekerja Migran | model-bisnis-properti-kos-kosan-gabungan-co-living-pekerja-migran | bisnis | unisex | produktif | 📝 | Strategi properti hunian dengan layanan co-living |
| 3.71 | Property + Business | Panduan Investasi Properti Komersial untuk Food Court dan Cafe Premium | panduan-investasi-properti-komersial-food-court-cafe-premium | investasi | unisex | produktif | 📝 | Analisis lokasi, bagi hasil dengan tenan F&B |
| 3.72 | Property Hybrid | Strategi Properti Gudang Modern Gabungan Layanan Logistik Last-Mile | strategi-properti-gudang-modern | bisnis | unisex | produktif | ✅ | Kombinasi aset gudang dengan jasa logistik e-commerce |
| 3.73 | Property + Business | Investasi Properti Kantor Gabungan Co-Working Space untuk Startup | investasi-properti-kantor-gabungan-co-working-space-startup | investasi | unisex | produktif | 📝 | Monetisasi aset properti kantor |
| 3.74 | Property Hybrid | Cara Pasang Panel Surya di Atap Properti Komersial: Hitung Penghematan Energi | cara-pasang-panel-surya-atap-properti-komersial-hitung-penghematan-energi | investasi | unisex | produktif | 📝 | Kombinasi aset properti dengan energi terbarukan |
| 3.75 | Property + Business | Model Bisnis Properti Komersial dengan Stasiun Pengisian EV Berbayar | model-bisnis-properti-komersial-stasiun-pengisian-ev-berbayar | bisnis | unisex | produktif | 📝 | Integrasi lahan parkir properti dengan SPKLU |
| 3.76 | Property Hybrid | Investasi Properti Gabungan Klinik Pratama dan Rumah Sakit Spesialis | investasi-properti-gabungan-klinik-pratama-rumah-sakit-spesialis | investasi | unisex | produktif | 📝 | Panduan kombinasi aset properti dengan layanan kesehatan |
| 3.77 | Property + Business | Strategi Properti Komersial untuk Pusat Kursus dan Sekolah Vokasi Karyawan | strategi-properti-komersial-pusat-kursus-sekolah-vokasi-karyawan | bisnis | unisex | produktif | 📝 | Monetisasi properti dengan menyewakan ruang ke lembaga pendidikan |
| 3.78 | Property Hybrid | Aspek Hukum Kombinasi Properti Waralaba Retail: Izin Usaha dan Pajak | aspek-hukum-kombinasi-properti-waralaba-retail-izin-usaha-pajak | hukum | unisex | produktif | 📝 | Review regulasi perizinan |
| 3.79 | Property Hybrid | Strategi Properti Hotel Bintang 3 Gabungan Layanan Co-Living Digital | strategi-properti-hotel-bintang-3-gabungan-layanan-co-living-digital | bisnis | unisex | produktif | 📝 | Integrasi properti hotel dengan platform co-living digital |
| 3.80 | Property + Business | Properti Industri dengan Panel Surya Atap: Subsidi Pemerintah dan ROI 10 Tahun | properti-industri-panel-surya-atap-subsidi-pemerintah-roi-10-tahun | investasi | unisex | produktif | 📝 | Analisis investasi properti industri besar dengan energi terbarukan |
| 3.81 | Property Hybrid | Properti Apartemen Gabungan Stasiun Pengisian EV Eksklusif untuk Penghuni | properti-apartemen-gabungan-stasiun-pengisian-ev-eksklusif-penghuni | investasi | unisex | produktif | 📝 | Tambahan nilai jual apartemen dengan fasilitas SPKLU eksklusif |
| 3.82 | Governance & Exit | Suksesi Aset ke Anak tanpa Ribut | suksesi-aset-keluarga | hukum | unisex | pensiun | ✍️ (Writing) | Transisi mulus |

**Tier 3 Target**: 82 articles (48 complete, 33 research pending)

---

## Tier 4: Legacy Maker (Wealth Protection & Succession)
**Target Audience:** Ultra-High Net Worth Individuals (UHNWI)
**Content Focus:** Corporate structuring, tax optimization, wealth protection, succession planning

| # | Cluster | Title | Slug | Category | Gender | Age | Status | Notes |
|---|---------|-------|------|----------|--------|-----|--------|-------|
| 4.1 | Asset Shield | Panduan Setup Holding Company di Indonesia | holding-company | bisnis | unisex | pensiun | ✅ | Corporate structure |
| 4.2 | Estate Planning | Suksesi Bisnis: Transfer ke Generasi Berikutnya | suksesi-bisnis | bisnis | unisex | pensiun | ✅ | Succession planning |
| 4.3 | Tax & Cross-Border | Tax Optimization untuk UHNW Individuals | tax-optimization | hukum | unisex | pensiun | ✅ | Tax strategy; Bisa dikembangkan dengan: Panduan manfaatkan tax treaty Indonesia dengan negara tujuan investasi |
| 4.4 | Asset Shield | Wealth Protection: Asuransi vs Trust Fund | wealth-protection | keuangan | unisex | pensiun | ✅ | Asset protection |
| 4.5 | Family Office Ops | Cara Setup Family Office di Indonesia | setup-family-office | bisnis | unisex | pensiun | ✅ | Family office guide |
| 4.6 | Estate Planning | Estate Planning: Warisan dan Wasiat | estate-planning | hukum | unisex | pensiun | ✅ | Estate law; Bisa dikembangkan dengan: Contoh redaksi wasiat hibah untuk aset properti |
| 4.7 | Philanthropy & Legacy | Philanthropy Strategy untuk Keluarga Kaya | philanthropy | keuangan | unisex | pensiun | ✅ | Charitable giving |
| 4.8 | Asset Shield | Offshore Investing: Legal atau Ilegal? | offshore-investing | hukum | unisex | pensiun | ✅ | Legal boundaries |
| 4.9 | Asset Shield | Cara Lindungi Aset dari Tuntutan Hukum | lindungi-aset | hukum | unisex | pensiun | ✅ | Asset protection |
| 4.10 | Tax & Cross-Border | Generational Wealth: Mindset dan Strategi | generational-wealth | keuangan | unisex | pensiun | ✅ | Wealth mindset |
| 4.11 | Tax & Cross-Border | Trust Fund vs Yayasan: Perbandingan | trust-vs-yayasan | hukum | unisex | pensiun | ✅ | Legal structures |
| 4.12 | Governance | Corporate Governance untuk Bisnis Keluarga | corporate-governance | bisnis | unisex | pensiun | ✅ | Governance structure |
| 4.13 | Tax & Cross-Border | Insurance Planning untuk UHNW Individuals | insurance-uwn | keuangan | unisex | pensiun | ✅ | Insurance strategy |
| 4.14 | Tax & Cross-Border | Cara Pilih Financial Advisor untuk UHNW | pilih-advisor | keuangan | unisex | pensiun | ✅ | Advisor selection |
| 4.15 | Philanthropy & Legacy | Legacy Planning: Meninggalkan Dampak | legacy-planning | keuangan | unisex | pensiun | ✅ | Impact legacy |
| 4.16 | Family Office Ops | SOP Family Office: Reporting, Meeting, dan Dashboard | sop-family-office | bisnis | unisex | pensiun | 📋 | Operasi harian |
| 4.17 | Governance | Investment Policy Statement untuk Keluarga | investment-policy-statement | investasi | unisex | pensiun | 📋 | Aturan investasi |
| 4.18 | Governance | Family Constitution: Aturan Main Keluarga | family-constitution | hukum | unisex | pensiun | 📋 | Tata kelola keluarga |
| 4.19 | Asset Shield | SPV, Subholding, dan Ring-Fencing Aset | spv-subholding-ring-fencing | hukum | unisex | pensiun | 📋 | Struktur proteksi |
| 4.20 | Estate Planning | Wasiat, Hibah, dan Asuransi Jiwa | wasiat-hibah-asuransi-jiwa | hukum | unisex | pensiun | 📋 | Waris terencana |
| 4.21 | Asset Shield | Perjanjian Pra-Nikah untuk Proteksi Aset | perjanjian-pra-nikah-proteksi-aset | hukum | unisex | pensiun | 📋 | Lindungi harta |
| 4.22 | Tax & Cross-Border | Aset Lintas Negara: Struktur dan Pelaporan | aset-lintas-negara | keuangan | unisex | pensiun | 📋 | Multi-jurisdiksi |
| 4.23 | Tax & Cross-Border | Tax Residency dan Pajak Berganda | tax-residency-pajak-berganda | hukum | unisex | pensiun | 📋 | Domisili fiskal |
| 4.24 | Philanthropy & Legacy | Tata Kelola Filantropi Keluarga | tata-kelola-filantropi-keluarga | keuangan | unisex | pensiun | 📋 | Donasi terstruktur |
| 4.25 | Family Office Ops | Rekrut CFO, GC, dan Investment Officer | rekrut-cfo-gc-investment-officer | bisnis | unisex | pensiun | 📋 | Tim inti family office |
| 4.26 | Estate Planning | Perwalian Anak dan Aset untuk Ahli Waris Minor | perwalian-anak-aset-minor | hukum | unisex | pensiun | 📋 | MERGED: perwalian anak, warisan, dan minor asset trust setup. Cover both child guardianship AND asset trust for minors |
| 4.27 | Governance | Crisis Playbook saat Pemilik Tak Cakap | crisis-playbook-pemilik-tak-cakap | hukum | unisex | pensiun | 📋 | Kondisi darurat |
| 4.28 | Tax & Cross-Border | Pajak Dividen Luar Negeri untuk UHNW | pajak-dividen-luar-negeri | hukum | unisex | pensiun | 📋 | Foreign dividend tax planning |
| 4.29 | Asset Shield | Lindungi Aset dari Gugatan Kreditur | lindungi-aset-gugatan-kreditur | hukum | unisex | pensiun | 📋 | Creditor claim protection |
| 4.30 | Estate Planning | Pembentukan Yayasan Keluarga untuk Filantropi | yayasan-keluarga-filantropi | hukum | unisex | pensiun | 📋 | Family foundation setup |
| 4.31 | Family Office Ops | Pelaporan Pajak Terintegrated Family Office | pelaporan-pajak-family-office | hukum | unisex | pensiun | 📋 | Integrated tax reporting |
| 4.32 | Governance | Komite Investasi Keluarga | komite-investasi-keluarga | bisnis | unisex | pensiun | 📋 | Family investment committee |
| 4.33 | Tax & Cross-Border | Pemanfaatan Tax Treaty Indonesia | tax-treaty-indonesia | hukum | unisex | pensiun | 📋 | Tax treaty utilization |
| 4.34 | Asset Shield | Asset Protection melalui Perusahaan Terbatas (PT) | asset-protection-pt | hukum | unisex | pensiun | 📋 | PT-based asset shielding |
| 4.35 | Philanthropy & Legacy | Strategi Dampak Sosial Berkelanjutan | dampak-sosial-berkelanjutan | keuangan | unisex | pensiun | 📋 | Sustainable social impact |
| 4.36 | Governance | Protokol Krisis untuk Family Office | protokol-krisis-family-office | hukum | unisex | pensiun | 📋 | Family office crisis playbook |
| 4.37 | Advanced Trusts | Dynasty Trust: Struktur Abadi Keluarga | dynasty-trust | hukum | unisex | pensiun | 📋 | Perpetual trust structures |
| 4.38 | Advanced Trusts | Trust Grantor Cacat Disengaja (IDGT) | idgt-trust | hukum | unisex | pensiun | 📋 | Intentionally defective grantor trust |
| 4.39 | Advanced Trusts | Grantor Retained Annuity Trust (GRAT) | grat-trust | hukum | unisex | pensiun | 📋 | Annuity trust for wealth transfer |
| 4.40 | Advanced Trusts | Qualified Personal Residence Trust (QPRT) | qprt-trust | hukum | unisex | pensiun | 📋 | Home transfer trust |
| 4.41 | Advanced Trusts | Family Limited Partnership (FLP) | flp-kemitraan | hukum | unisex | pensiun | 📋 | Family limited partnership |
| 4.42 | Asset Protection | Trust Perlindungan Aset Domestik | trust-perlindungan-aset | hukum | unisex | pensiun | 📋 | Domestic asset protection trust |
| 4.43 | Asset Protection | Private Placement Life Insurance | private-placement-life | asuransi | unisex | pensiun | 📋 | Premium financing vehicle |
| 4.44 | Philanthropy | Donor-Advised Funds (DAF) | donor-advised-funds | keuangan | unisex | pensiun | 📋 | Charitable giving vehicle |
| 4.45 | Philanthropy | Charitable Lead Trust (CLT) | charitable-lead-trust | hukum | unisex | pensiun | 📋 | Lead trust for charity |
| 4.46 | Family Office | Investment Beliefs Statement | investment-beliefs | bisnis | unisex | pensiun | 📋 | Family investment philosophy |
| 4.47 | Family Office | Next-Gen Education Programs | nextgen-education | bisnis | unisex | pensiun | 📋 | Succession education |
| 4.48 | Family Office | Family Retreat Planning | family-retreat | bisnis | unisex | pensiun | 📋 | Family retreat planning |
| 4.49 | Sustainable Finance | ESG Integration di Family Office | esg-family-office | investasi | unisex | pensiun | 📋 | ESG for family offices |

**Tier 4 Target**: 49 articles (15 complete, 34 research pending)

---

## Summary Statistics

| Tier | Target Articles | Published | % Complete |
|------|----------------|-----------|------------|
| Tier 0: Survival | 65 | 57 | 88% |
| Tier 1: Hustler | 207 | 156 | 75% |
| Tier 2: Scaler | 185 | 112 | 61% |
| Tier 3: Asset Builder | 82 | 48 | 59% |
| Tier 4: Legacy | 49 | 15 | 31% |
| **TOTAL** | **588** | **388** | **66%** |
