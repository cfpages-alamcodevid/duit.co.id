# Duit.co.id Article Catalog & Progress Tracker

## Overview
Master list of all planned articles organized by tier. Use this document to:
- Plan content creation
- Track writing progress
- Assign taxonomy tags
- Coordinate bulk article generation
- Monitor publication status

**Important:** Every article MUST have a companion YouTube video. The video can be created before or after the article, but both must exist. Add `youtube_url` to `JSON/article-media.json` once video is ready.

## Article Metadata Rules (Mandatory):
- This catalog is the planning/progress table for topic coverage and status.
- `/JSON` is the runtime metadata source of truth.
- `JSON/article-dates.json` stores stable public publish dates per slug.
- `JSON/article-seo.json`, `JSON/article-taxonomy.json`, `JSON/article-tags.json`, `JSON/article-access.json`, and `JSON/article-media.json` store generated article metadata by slug.
- Article writer agents should focus on body content. Do not add YAML frontmatter to `/artikel/*.md`.

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
| 0.3 | Scam & Digital Safety | Panduan Menghadapi Debt Collector Lapangan (Home Visit): Hak Anda & Aturan OJK Terbaru 2025-2026 | debt-collector-lapangan | hukum | unisex | produktif | ✅ | Field collection focus |
| 0.4 | Scam & Digital Safety | Langkah Hukum Jika Terjerat Pinjol Ilegal | langkah-hukum-pinjol | hukum | unisex | produktif | ✅ | Legal escalation guide |
| 0.5 | Scam & Digital Safety | Cara Melaporkan Pinjol Ilegal ke OJK & Polisi: Panduan Lengkap & Contoh Surat Laporan | laporkan-pinjol-ilegal | hukum | unisex | produktif | ✅ | Official reporting channels |
| 0.6 | Budget Defense | Budgeting Darurat: Hidup dari Gaji UMR | budgeting-darurat-umr | keuangan | unisex | produktif | ✅ | Practical examples |
| 0.7 | Scam & Digital Safety | Pinjol Legal vs Ilegal 2026: Cara Bedakan dalam 5 Menit (Anti-Jebak) | pinjol-legal-ilegal | hukum | unisex | muda | ✅ | Educational basics |
| 0.8 | Debt & Bill Management | Cara Negosiasi Utang dengan Kreditur | negosiasi-utang | keuangan | unisex | produktif | ✅ | Negotiation tactics |
| 0.9 | Scam & Digital Safety | Perlindungan Hukum untuk Debitur | perlindungan-debitur | hukum | unisex | produktif | ✅ | UU protection laws |
| 0.10 | Household Survival | Emergency Fund: Mulai dari Rp 10rb/hari | emergency-fund-murah | keuangan | unisex | muda | ✅ | Micro-saving tips |
| 0.11 | Scam & Digital Safety | Tanda-Tanda Skema Pinjaman Berbahaya | tanda-pinjol-berbahaya | hukum | unisex | muda | ✅ | Prevention focused |
| 0.12 | Income Shock & Recovery | Cara Bertahan Saat PHK Mendadak | survive-phk-mendadak | keuangan | unisex | produktif | ✅ | Income shock defense |
| 0.13 | Income Shock & Recovery | Cara Cari Kerja Kilat Setelah PHK | kerja-kilat-phk | keuangan | unisex | produktif | ✅ | Rapid recovery |
| 0.14 | Income Shock & Recovery | Cara Jual Barang Cepat Tanpa Rugi Besar | jual-barang-cepat | keuangan | unisex | produktif | ✅ | Quick cash |
| 0.15 | Income Shock & Recovery | Cara Dapat Uang Darurat dari Skill Sederhana | uang-darurat-skill | keuangan | unisex | muda | ✅ | Emergency income |
| 0.16 | Budget Defense | Cara Bagi Gaji Mingguan Biar Aman Sampai Akhir Bulan | gaji-mingguan-aman | keuangan | unisex | produktif | ✅ | Weekly budgeting |
| 0.17 | Budget Defense | Cara Hemat Ongkos Transport Harian | hemat-transport-harian | keuangan | unisex | produktif | ✅ | Commute control |
| 0.18 | Budget Defense | Cara Masak Hemat 1 Minggu dengan Budget Ketat | masak-hemat-1minggu | keuangan | unisex | produktif | ✅ | Meal planning |
| 0.19 | Budget Defense | Cara Hemat Listrik, Air, dan Data | hemat-listrik-air-data | keuangan | unisex | produktif | ✅ | Utility cuts |
| 0.20 | Budget Defense | Cara Mengatur THR Biar Nggak Habis Sekejap | kelola-thr-hemat | keuangan | unisex | produktif | ✅ | Bonus allocation |
| 0.21 | Debt & Bill Management | Cara Prioritaskan Utang Kecil vs Utang Besar | prioritaskan-utang | keuangan | unisex | produktif | ✅ | Debt triage |
| 0.22 | Debt & Bill Management | Cara Minta Restrukturisasi Cicilan Saat Seret | restrukturisasi-cicilan | keuangan | unisex | produktif | ✅ | Bill negotiation |
| 0.23 | Debt & Bill Management | Cara Catat Utang Biar Nggak Tumpang Tindih | catat-utang-rapi | keuangan | unisex | produktif | ✅ | Debt tracking |
| 0.24 | Debt & Bill Management | Cara Simpan Bukti Chat dan Telepon Penagihan | simpan-bukti-penagihan | hukum | unisex | produktif | ✅ | Evidence hygiene |
| 0.25 | Debt & Bill Management | Cara Hentikan Telepon Penagihan yang Mengganggu | stop-telepon-penagihan | hukum | unisex | produktif | ✅ | Call harassment |
| 0.26 | Scam & Digital Safety | Cara Cek Koperasi Bodong sebelum Setor | cek-koperasi-bodong | hukum | unisex | muda | ✅ | Scam detection |
| 0.27 | Scam & Digital Safety | Cara Hindari Arisan Online Palsu | hindari-arisan-palsu | hukum | female | muda | ✅ | Social scam defense |
| 0.28 | Scam & Digital Safety | Cara Lindungi KTP dan OTP dari Penipuan | lindungi-ktp-otp | hukum | unisex | muda | ✅ | Identity protection |
| 0.29 | Scam & Digital Safety | Cara Cek Investasi Bodong yang Nyamar | cek-investasi-bodong | hukum | unisex | produktif | ✅ | Fraud filter |
| 0.30 | Scam & Digital Safety | Cara Bedakan Debt Collector Asli vs Palsu | dc-asli-vs-palsu | hukum | unisex | produktif | ✅ | Verification |
| 0.31 | Debt & Bill Management | Cara Atur Uang Kalau Numpang Tinggal | uang-numpang-tinggal | keuangan | unisex | muda | ✅ | Shared housing |
| 0.32 | Debt & Bill Management | Cara Kirim Uang ke Rumah Tanpa Boncos | kirim-uang-rumah | keuangan | unisex | produktif | ✅ | Remittance |
| 0.33 | Debt & Bill Management | Cara Nego Tunggakan Kontrakan | nego-tunggakan-kontrakan | keuangan | unisex | produktif | ✅ | Housing arrears |
| 0.34 | Budget Defense | Cara Nego Tunggakan Listrik dan Air | nego-tunggakan-utilitas | keuangan | unisex | produktif | ✅ | Utility arrears |
| 0.35 | Budget Defense | Cara Belanja Makan Murah Tapi Masih Layak | makan-murah-layak | keuangan | unisex | produktif | ✅ | Food budget |
| 0.36 | Scam & Digital Safety | Cara Lindungi HP dari Aplikasi Scam | lindungi-hp-scam | hukum | unisex | muda | ✅ | Device safety |
| 0.37 | Scam & Digital Safety | Cara Cek Link WhatsApp dan APK Penipuan | cek-link-scam | hukum | unisex | muda | ✅ | Link verification |
| 0.38 | Scam & Digital Safety | Cara Hapus Akses Aplikasi Berbahaya | hapus-aplikasi-berbahaya | hukum | unisex | muda | ✅ | Cleanup steps |
| 0.39 | Scam & Digital Safety | Cara Cek Pinjol Asli dari Nomor WA | cek-pinjol-asli-wa | hukum | unisex | muda | ✅ | WA scam check |
| 0.40 | Scam & Digital Safety | Cara Cabut Akses Aplikasi Pinjol | cabut-akses-pinjol | hukum | unisex | muda | ✅ | App permissions |
| 0.41 | Debt & Bill Management | Cara Nego Sewa Kos Saat Seret | nego-sewa-kos-seret | keuangan | unisex | produktif | ✅ | Rent negotiation |
| 0.42 | Budget Defense | Cara Hemat Pulsa, Internet, dan Kuota | hemat-pulsa-data | keuangan | unisex | muda | ✅ | Connectivity budget |
| 0.43 | Income Shock & Recovery | Cara Tabung Kembalian Harian | tabung-kembalian-harian | keuangan | unisex | muda | ✅ | Micro-saving, 1611 words, data from BI/GoodStats/YouGov 2025, case studies (Legiman, Lorenza, Sukabumi family), Syamsul Alam voice |
| 0.44 | Household Survival | Cara Jual HP Lama dengan Aman | jual-hp-lama-aman | keuangan | unisex | muda | ✅ | Quick resale |
| 0.45 | Income Shock & Recovery | Cara Cari Uang Sampingan dari Jasa Harian | jasa-harian-sampingan | keuangan | unisex | produktif | ✅ | Side income |
| 0.46 | Debt & Bill Management | Cara Bagi Uang Saat Bantu Orang Tua | bantu-orang-tua | keuangan | unisex | produktif | ✅ | Family support |
| 0.47 | Budget Defense | Cara Bikin Daftar Belanja Makan Bulanan | belanja-makan-bulanan | keuangan | unisex | produktif | ✅ | Meal budget |
| 0.48 | Household Survival | Cara Nolak Pinjaman Teman Tanpa Putus Silaturahmi | tolak-pinjaman-teman | keuangan | unisex | muda | ✅ | Social debt |
| 0.49 | Financial Literacy | Konsep Dasar Keuangan untuk Keluarga Berpenghasilan Rendah | keuangan-keluarga-rendah | keuangan | unisex | produktif | ✅ | Cover basic financial concepts for low-income families |
| 0.50 | Financial Literacy | Cara Membaca Kontrak Pinjaman Online dan Konvensional dengan Benar | baca-kontrak-pinjaman | hukum | unisex | produktif | ✅ | Cover how to read loan contracts (interest, penalties, terms) |
| 0.51 | Financial Literacy | Membangun Skor Kredit dari Nol untuk Pemula | skor-kredit-pemula | keuangan | unisex | produktif | ✅ | Cover building credit score from zero |
| 0.52 | Financial Literacy | Literasi Keuangan untuk Ibu Rumah Tangga dan Pengangguran | literasi-keuangan-rumah | keuangan | unisex | muda | ✅ | Cover financial literacy for non-workers (housewives, unemployed youth) |
| 0.53 | Legal Aid | Direktori Lengkap Lembaga Bantuan Hukum (LBH) dan Konsultasi Hukum Gratis di Indonesia | direktori-lbh-gratis | hukum | unisex | produktif | ✅ | MERGED: daftar lembaga LBH + peta yayasan LBH seluruh Indonesia. Cover both organization directory AND geographic mapping |
| 0.54 | Gov & Social Safety Nets | Daftar Program Bantuan Pemerintah: Bansos, PKH, BPN, KIS, KIP | bantuan-pemerintah | keuangan | unisex | produktif | ✅ | Cover government assistance programs (Bansos, PKH, BPN, KIS, KIP) |
| 0.55 | Gov & Social Safety Nets | Alternatif Pendanaan Gotong Royong: Arisan dan Koperasi Simpan Pinjam | pendanaan-gotong-royong | keuangan | unisex | produktif | ✅ | Cover community mutual aid / gotong royong financing (arisan, koperasi simpan pinjam) |
| 0.56 | Gov & Social Safety Nets | Asuransi Mikro dan Bantuan Premi BPJS Kesehatan untuk Keluarga Berpenghasilan Rendah | asuransi-mikro-bpjs | keuangan | unisex | produktif | ✅ | Cover micro-insurance for low-income (asuransi mikro, BPJS Kesehatan premium assistance) |
| 0.57 | Mental Health | Mengelola Stres Keuangan dan Kesehatan Mental Korban Utang Pinjol | stres-keuangan-pinjol | keuangan | unisex | produktif | ✅ | Cover mental health / financial stress management for debt victims |
| 0.58 | Family Support | Cara Komunikasi Keuangan Keluarga saat Krisis Utang | komunikasi-krisis-utang | keuangan | unisex | produktif | ✅ | Cover family financial communication during crisis |
| 0.59 | Family Support | Biaya Sekolah Anak saat Krisis Keuangan: Beasiswa, KIP, Sekolah Gratis | biaya-sekolah-krisis | keuangan | unisex | produktif | ✅ | Cover children's education funding during financial crisis (beasiswa, KIP, sekolah gratis) |
| 0.60 | Housing & Utilities | Negosiasi Sewa Kontrakan untuk Jangka Panjang | negosiasi-sewa-panjang | keuangan | unisex | produktif | ✅ | Cover rent negotiation for long-term leases |
| 0.61 | Housing & Utilities | Program Perumahan Pemerintah untuk Masyarakat Berpenghasilan Rendah: Rusunawa, BP2BT, FLPP | program-perumahan-rakyat | keuangan | unisex | produktif | ✅ | Cover government housing programs for low-income (Rusunawa, BP2BT, FLPP) |
| 0.62 | Housing & Utilities | Subsidi Panel Surya untuk Rumah Tangga Berpenghasilan Rendah | subsidi-panel-surya | keuangan | unisex | produktif | ✅ | Cover solar panel subsidies for low-income households |
| 0.63 | Financial Literacy | Koperasi Simpan Pinjam vs Rentenir: Alternatif Legal untuk Hindari Pinjol Ilegal | koperasi-vs-rentenir | hukum | unisex | produktif | ✅ | Cover cooperative alternatives to loan sharks (koperasi simpan pinjam vs rentenir) |
| 0.64 | Digital & Device Management | Literasi Digital untuk Mencegah Penipuan Online dan Pinjol Ilegal | literasi-digital-anti-scam | keuangan | unisex | muda | ✅ | Cover digital literacy for scam prevention |
| 0.65 | Digital & Device Management | Cara Mengelola Berbagai Aplikasi Pinjol dan Utang Secara Bersamaan | kelola-banyak-pinjol | keuangan | unisex | produktif | ✅ | Cover managing multiple debt apps simultaneously |
| 0.66 | Mindset & Survival Psychology | Berani Meski Takut: Cara Menghadapi Hidup Apapun yang Terjadi | berani-meski-takut | keuangan | unisex | produktif | 📋 | Satu masalah: dominasi ketakutan. Fokus pada cara bangun keberanian meski kondisi sulit |
| 0.67 | Mindset & Survival Psychology | Berhenti Jadi Korban: Kenapa Anda Harus Ambil Kendali Hidup Sendiri | ambil-kendali-hidup | keuangan | unisex | produktif | 📋 | Satu masalah: reaktif. Fokus pada pergeseran dari merespon ke mengantisipasi |
| 0.68 | Mindset & Survival Psychology | Berpikir Jangka Panjang: Cara Keluar dari Pola Hidup Hari ke Hari | berpikir-jangka-panjang | keuangan | unisex | produktif | 📋 | Satu masalah: jangka pendek. Fokus pada cara mulai merencanakan 3-6 bulan ke depan |
| 0.69 | Mindset & Survival Psychology | Lepaskan Rasa Malu: Utang Itu Masalah Finansial, Bukan Masalah Moral | lepaskan-rasa-malu-utang | keuangan | unisex | produktif | 📋 | Satu masalah: shame loop. Fokus pada cara menghadapi utang tanpa malu |
| 0.70 | Mindset & Survival Psychology | Anda Bisa Berubah: Mengapa 'Nasib' Bukan Penentu Masa Depan Anda | nasib-bukan-penentu | keuangan | unisex | produktif | 📋 | Satu masalah: learned helplessness. Fokus pada bukti bahwa orang bisa naik tier |
| 0.71 | Mindset & Survival Psychology | Bukan Zero-Sum: Cara Melihat Peluang yang Menguntungkan Semua Pihak | bukan-zero-sum | keuangan | unisex | produktif | 📋 | Satu masalah: zero-sum thinking. Fokus pada kolaborasi dan win-win |
| 0.72 | Mindset & Survival Psychology | Mulai dari Diri Sendiri: Kenapa Menunggu Bantuan Itu Melelahkan | mulai-dari-diri-sendiri | keuangan | unisex | produktif | 📋 | Satu masalah: ketergantungan. Fokus pada self-reliance dan langkah mandiri |
| 0.73 | Mindset & Survival Psychology | Hadapi Realitas: Cara Membuka Hitungan Utang dan Pengeluaran Anda | hadapi-realitas-hitungan | keuangan | unisex | produktif | 📋 | Satu masalah: avoidance. Fokus pada cara face the numbers tanpa panik |
| 0.74 | Mindset & Survival Psychology | Memulai dari Nol: Cara Bangun Dari Peninggalan Masa Lalu yang Suram | memulai-dari-nol | keuangan | unisex | produktif | 📋 | Satu masalah: trauma finansial. Fokus pada cara move on dari kegagalan sebelumnya |
| 0.75 | Mindset & Survival Psychology | Anda Punya Kuasa: Kenapa Agency Adalah Kunci Keluar dari Zona Survival | anda-punya-kuasa | keuangan | unisex | produktif | 📋 | Satu masalah: no sense of agency. Fokus pada kesadaran bahwa Anda punya kendali |
| 0.76 | Mindset & Survival Psychology | Upgrade Lingkaran: Cara Keluar dari Komunitas yang Saling Memvalidasi Keterpurukan | upgrade-lingkaran | keuangan | unisex | produktif | 📋 | Satu masalah: circle yang sama. Fokus pada cara cari komunitas yang produktif |
| 0.77 | Mindset & Survival Psychology | Uang Pertama: Cara Mulai Dari Rp 0 (Bukan Rp 500 Ribu) | uang-pertama | keuangan | unisex | produktif | 📋 | Satu masalah: tidak punya uang pertama. Fokus pada langkah very first untuk mulai |
| 0.78 | Mindset & Survival Psychology | Kontrol vs Khawatir: Bedakan yang Bisa Anda Ubah dan yang Tidak | kontrol-vs-khawatir | keuangan | unisex | produktif | 📋 | Satu masalah: tidak bisa bedakan kontrol. Fokus pada circle of control |

**Tier 0 Target**: 78 articles (65 complete, 0 ready to write, 13 research)

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
| 1.35 | Commerce & Brokerage | Agen Produk Desa Premium: Madu, Kopi, dan Rempah | agen-produk-desa | bisnis | unisex | muda | ✅ | Specialty rural products |
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
| 1.93 | Local Services | Sewa Mobil Box / Pick Up | sewa-mobil-box | bisnis | unisex | produktif | ✅ | Vehicle rental |
| 1.94 | Digital & Knowledge Work | Makelar Motor / Mobil Bekas | makelar-motor-mobil | bisnis | unisex | produktif | ✅ | Vehicle broker |
| 1.95 | Digital & Knowledge Work | Makelar Kost / Kontrakan | makelar-kost-kontrakan | bisnis | unisex | muda | ✅ | Housing broker |
| 1.96 | Local Services | Sewa PlayStation ke Rumah | sewa-playstation-rumah | bisnis | unisex | muda | ✅ | Gaming rental |
| 1.97 | Commerce & Brokerage | Dropship Bahan Bangunan | dropship-bahan-bangunan | bisnis | unisex | produktif | ✅ | Building materials |
| 1.98 | Local Services | Sewa Gaun Pengantin | sewa-gaun-pengantin | bisnis | female | produktif | ✅ | Wedding gown |
| 1.99 | Local Services | Sewa Kipas Angin Air (Misty Fan) / AC Standing | sewa-kipas-angin | bisnis | unisex | produktif | ✅ | Cooling equipment |
| 1.100 | Digital & Knowledge Work | Makelar Kayu Jati | makelar-kayu-jati | bisnis | unisex | produktif | ✅ | Timber broker |
| 1.101 | Commerce & Brokerage | Admin Sosmed Toko Lokal | admin-sosmed-toko | karir | unisex | muda | ✅ | Social media manager |
| 1.102 | Commerce & Brokerage | Jasa Optimasi Google My Business | optimasi-gmb | bisnis | unisex | muda | ✅ | GMB optimization |
| 1.103 | Commerce & Brokerage | Food Reviewer Lokal | food-reviewer-lokal | karir | unisex | muda | ✅ | Content creator |
| 1.104 | Commerce & Brokerage | Jasa Fotografi Menu Makanan | jasa-fotografi-menu | bisnis | unisex | muda | ✅ | Food photography |
| 1.105 | Commerce & Brokerage | Host Live Streaming E-commerce | host-live-streaming | karir | unisex | muda | ✅ | Live streaming |
| 1.106 | Digital & Knowledge Work | Makelar Influencer Lokal | makelar-influencer | bisnis | unisex | muda | ✅ | Influencer manager |
| 1.107 | Local Services | Jasa Bikin Web UMKM Lokal | jasa-bikin-web-umkm | bisnis | unisex | muda | ✅ | Web development |
| 1.108 | Commerce & Brokerage | Filter IG / TikTok Pernikahan | filter-ig-tiktok | bisnis | unisex | muda | ✅ | AR filters |
| 1.109 | Digital & Knowledge Work | Voice Over Artist: Iklan Lokal dan Bahasa Indonesia | voice-over-artist-indonesia | karir | unisex | muda | ✅ | MERGED: voice over untuk iklan lokal DAN voice over artist Bahasa Indonesia. Cover both local commercial VO work AND Indonesian language VO for global clients |
| 1.110 | Digital & Knowledge Work | Desainer Grafis / PPT Premium | desainer-grafis-ppt | karir | unisex | muda | ✅ | Design services |
| 1.111 | Commerce & Brokerage | Pembuat Video Profil Desa | video-profil-desa | bisnis | unisex | muda | ✅ | Video production |
| 1.112 | Commerce & Brokerage | Undangan Website & Video | undangan-website-video | bisnis | unisex | muda | ✅ | Digital invitation website & video service |
| 1.113 | Agribusiness & Recycling | Dropshipper Sayur Organik via WA Grup | dropshipper-sayur | bisnis | unisex | produktif | ✅ | Organic produce |
| 1.114 | Commerce & Brokerage | Jasa Hapus Latar Foto | hapus-latar-foto | bisnis | unisex | muda | ✅ | Photo background removal service guide |
| 1.115 | Local Services | Jasa Setting FB Ads Lokal | setting-fb-ads | bisnis | unisex | muda | ✅ | Ads manager |
| 1.116 | Digital & Knowledge Work | Jasa Tulis Caption / Copywriting | tulis-caption | karir | unisex | muda | ✅ | Copywriting |
| 1.117 | Digital & Knowledge Work | Penyedia Jasa Talent UGC | penyedia-jasa-talent | bisnis | unisex | muda | ✅ | UGC services |
| 1.118 | Local Services | Jasa Setup POS Toko/Resto | setup-pos-toko | bisnis | unisex | muda | ✅ | POS setup |
| 1.119 | Local Services | Jasa Digitalisasi Dokumen | digitalisasi-dokumen | bisnis | unisex | muda | ✅ | Document scanning |
| 1.120 | Commerce & Brokerage | Jasa Buka Toko Online | buka-toko-online | bisnis | unisex | muda | ✅ | E-commerce setup |
| 1.121 | Digital & Knowledge Work | YouTube Cashcow Video Editor | youtube-editor | karir | unisex | muda | ✅ | Video editing |
| 1.122 | Digital & Knowledge Work | Short-Form Video Repurposer | short-form-video | karir | unisex | muda | ✅ | Content repurposing |
| 1.123 | Digital & Knowledge Work | Thumbnail Designer Spesialis | thumbnail-desainer | karir | unisex | muda | ✅ | Thumbnail design |
| 1.124 | Digital & Knowledge Work | UI/UX Designer (Figma) | ui-ux-designer | karir | unisex | muda | ✅ | UI/UX design |
| 1.125 | Digital & Knowledge Work | Webflow / Framer Developer | webflow-framer | karir | unisex | muda | ✅ | No-code development career guide with Syamsul Alam voice, market data, case studies, 2000+ words |
| 1.126 | Professional Services | Pitch Deck Designer | pitch-deck-designer | karir | unisex | muda | ✅ | Presentation design |
| 1.127 | Career Starter | 3D Modeler & Renderer | 3d-modeler | karir | unisex | muda | ✅ | 3D modeling |
| 1.128 | Digital & Knowledge Work | Notion Template Creator | notion-template | karir | unisex | muda | ✅ | Template design |
| 1.129 | Digital & Knowledge Work | Podcast Audio Editor | podcast-editor | karir | unisex | muda | ✅ | Audio editing |
| 1.130 | Career Starter | Font / Typeface Creator | font-creator | karir | unisex | muda | ✅ | Typography |
| 1.131 | Digital & Knowledge Work | Direct Response Copywriter | direct-response-copywriter | karir | unisex | muda | ✅ | Copywriting |
| 1.132 | Digital & Knowledge Work | B2B SaaS Blog Writer | saas-blog-writer | karir | unisex | muda | ✅ | Content writing |
| 1.133 | Digital & Knowledge Work | Twitter/LinkedIn Ghostwriter | twitter-ghostwriter | karir | unisex | muda | ✅ | Ghostwriting |
| 1.134 | Career Starter | Subtitle / Caption Translator | subtitle-translator | karir | unisex | muda | ✅ | Translation |
| 1.135 | Digital & Knowledge Work | Technical Writer | technical-writer | karir | unisex | muda | ✅ | Technical writing |
| 1.136 | Digital & Knowledge Work | Email Deliverability Specialist | email-deliverability | karir | unisex | muda | ✅ | Email marketing |
| 1.137 | Digital & Knowledge Work | Resume / LinkedIn Makeover | resume-linkedin | karir | unisex | muda | ✅ | Resume & LinkedIn makeover career guide with Syamsul Alam voice, research data, case studies, 2500+ words |
| 1.138 | Professional Services | Grant Writer | grant-writer | karir | unisex | produktif | ✅ | Proposal writing |
| 1.139 | Career Starter | E-book Formatter (KDP) | ebook-formatter | karir | unisex | muda | ✅ | Publishing |
| 1.140 | Digital & Knowledge Work | Indonesian Tutor for Foreigners | indonesian-tutor | karir | unisex | muda | ✅ | Language tutoring |
| 1.141 | Digital & Knowledge Work | Executive Virtual Assistant | executive-va | karir | unisex | muda | ✅ | Complete VA career guide with market data, case studies, pricing strategy |
| 1.142 | Digital & Knowledge Work | Customer Support Ticket Manager | customer-support | karir | unisex | muda | ✅ | Support services |
| 1.143 | Digital & Knowledge Work | Online Community Manager | community-manager | karir | unisex | muda | ✅ | Community management |
| 1.144 | Digital & Knowledge Work | Lead Generation / Data Scraper | lead-generation | karir | unisex | muda | ✅ | Data services |
| 1.145 | Digital & Knowledge Work | Appointment Setter (DM Closer) | appointment-setter | karir | unisex | muda | ✅ | Sales |
| 1.146 | Digital & Knowledge Work | E-commerce Product Lister | product-lister | karir | unisex | muda | ✅ | Product listing career guide with Syamsul Alam voice, research data, 2000+ words |
| 1.147 | Digital & Knowledge Work | Podcast Booker | podcast-boker | karir | unisex | muda | ✅ | Booking services |
| 1.148 | Digital & Knowledge Work | Discord Server Architect | discord-architect | karir | unisex | muda | ✅ | Tech services |
| 1.149 | Digital & Knowledge Work | Airtable / Notion Database Builder | notion-database | karir | unisex | muda | ✅ | Database services |
| 1.150 | Digital & Knowledge Work | QA Tester dan Software Tester: Panduan Lengkap | qa-software-tester | karir | unisex | muda | ✅ | MERGED: QA testing DAN software testing. Cover both manual QA testing methodologies AND automated software testing tools |
| 1.151 | Career Starter | Google Ads Specialist (Local US) | google-ads-specialist | karir | unisex | muda | ✅ | PPC advertising career guide with Syamsul Alam voice, research data ($218.3B market), case studies (Ahmad/Sari), pricing strategy (Rp 5-50 juta/month), 2000+ words |
| 1.152 | Commerce & Brokerage | Pinterest Account Manager | pinterest-manager | karir | unisex | muda | ✅ | Social media |
| 1.153 | Digital & Knowledge Work | SEO Link Builder | seo-link-builder | karir | unisex | muda | ✅ | SEO Link Builder career guide with market data, case studies, pricing strategy for young hustlers |
| 1.154 | Digital & Knowledge Work | UGC Creator | ugc-creator | karir | unisex | muda | ✅ | Content creation |
| 1.155 | Commerce & Brokerage | Affiliate Marketing | affiliate-marketing | karir | unisex | muda | ✅ | Affiliate marketing career guide with Syamsul Alam voice, market data, case studies, 2000+ words |
| 1.156 | Digital & Knowledge Work | Zapier / Make Automation Expert | zapier-automation | karir | unisex | muda | ✅ | Automation |
| 1.157 | Career Starter | Facebook/TikTok Ads Media Buyer | fb-tiktok-ads | karir | unisex | muda | ✅ | Ads management |
| 1.158 | Commerce & Brokerage | Dropship to US (Shopify) | dropship-shopify | bisnis | unisex | muda | ✅ | E-commerce |
| 1.159 | Digital & Knowledge Work | Cold Email Campaign Manager | cold-email-manager | karir | unisex | muda | ✅ | Email campaigns |
| 1.160 | Digital & Knowledge Work | CRO Specialist | cro-specialist | karir | unisex | muda | ✅ | Optimization |
| 1.161 | Commerce & Brokerage | Drop Servicing Agency | drop-servicing | bisnis | unisex | muda | ✅ | Agency business |
| 1.162 | Digital & Knowledge Work | Remote Travel Planner | remote-travel | bisnis | unisex | muda | ✅ | Travel services |
| 1.163 | Career Starter | Spotify Playlist Curator | spotify-curator | karir | unisex | muda | ✅ | Music curation |
| 1.164 | Career Starter | Music / Beat Producer | music-producer | karir | unisex | muda | ✅ | Music production |
| 1.165 | Career Starter | Shopify Store Developer | shopify-developer | karir | unisex | muda | ✅ | E-commerce dev |
| 1.166 | Digital & Knowledge Work | Discord/Telegram Crypto Moderator | crypto-moderator | karir | unisex | muda | ✅ | Moderation |
| 1.167 | Commerce & Brokerage | Print on Demand (Etsy/Redbubble) | print-on-demand | bisnis | unisex | muda | ✅ | Print on Demand business guide with Syamsul Alam voice, market data, case studies, pricing strategy for young hustlers |
| 1.168 | Commerce & Brokerage | Etsy Digital Printables | etsy-printables | bisnis, investasi, karir | unisex | muda | ✅ | Digital products business guide with Syamsul Alam voice, research data (90M buyers, 15-20% growth), case studies, 2000+ words |
| 1.169 | Career Starter | Cara Dapat Sertifikasi Gratis untuk Naik Gaji | sertifikasi-gratis-naik-gaji | karir | unisex | muda | ✅ | Free certification platforms & tips |
| 1.170 | Career Starter | Freelance di Fiverr/Upwork: Panduan Pemula | fiverr-upwork-pemula | karir | unisex | muda | ✅ | Global freelancing platforms |
| 1.171 | Commerce & Brokerage | Jastip Skincare & Makeup Korea | jastip-skincare-korea | bisnis | female | muda | ✅ | Korean beauty arbitrage |
| 1.172 | Local Services | Jasa Cuci Karpet & Permadani | jasa-cuci-karpet | bisnis | unisex | produktif | ✅ | Home textile cleaning |
| 1.173 | Digital & Knowledge Work | Social Media Manager untuk UMKM Kecil | sosmed-manager-umkm | karir | unisex | muda | ✅ | SMM for micro-enterprises |
| 1.174 | Agribusiness & Recycling | Ternak Ayam Kampung Organik | ternak-ayam-kampung-organik | bisnis | unisex | produktif | ✅ | Organic free-range chicken |
| 1.175 | Professional Services | Jasa Pembuatan Laporan Keuangan UMKM | jasa-laporan-keuangan-umkm | bisnis | unisex | produktif | ✅ | SME financial reporting |
| 1.176 | Career Starter | Cara Negosiasi Kerja Freelance (Rate & Deadline) | negosiasi-freelance | karir | unisex | muda | ✅ | Freelance contract negotiation |
| 1.177 | Local Services | Jasa Service AC Panggilan | jasa-service-ac-panggilan | bisnis | unisex | produktif | ✅ | AC repair & maintenance |
| 1.178 | Commerce & Brokerage | Reseller Produk Lokal (UMKM) di Shopee/Tokopedia | reseller-produk-lokal-shopee | bisnis | unisex | muda | ✅ | Local product marketplace reselling |
| 1.179 | Personal Development | Cara Public Speaking Efektif untuk Profesional | cara-public-speaking-efektif-untuk-profesional | karir | unisex | produktif | ✅ | Cover fundamental public speaking skills for working professionals |
| 1.180 | Personal Development | Latihan Public Speaking Mandiri untuk Pemula | latihan-public-speaking-mandiri-untuk-pemula | karir | unisex | muda | ✅ | Self-practice routines for public speaking beginners |
| 1.183 | Productivity | Manajemen Waktu untuk Pekerja Sampingan: Balance Kerja Utama dan Side Hustle | manajemen-waktu-pekerja-sampingan | karir | unisex | produktif | ✅ | MERGED: time blocking, prioritization, DAN balancing full-time job with side hustle. Cover both time management techniques AND work-life balance strategies |
| 1.184 | Personal Development | Membangun Personal Branding untuk Pertumbuhan Karir | membangun-personal-branding-untuk-pertumbuhan-karir | karir | unisex | muda | ✅ | LinkedIn and social media personal branding for fresh graduates |
| 1.185 | Personal Development | Tips Personal Branding untuk Pekerja Muda | tips-personal-branding-untuk-pekerja-muda | karir | unisex | produktif | ✅ | Building professional reputation in early career stages |
| 1.186 | Networking | Strategi Networking Efektif untuk Freelancer | strategi-networking-efektif-untuk-freelancer | karir | unisex | produktif | ✅ | Online and offline networking strategies for freelancers |
| 1.187 | Networking | Cara Membangun Hubungan dengan Klien Freelance | cara-membangun-hubungan-dengan-klien-freelance | bisnis | unisex | produktif | ✅ | Client retention networking for freelance workers, 2175 words, Syamsul Alam voice, case study (Budi Rp 18M/6mo), 7-step framework |
| 1.188 | Legal & Contract | Kontrak Kerja Freelance: Cara Baca dan Identifikasi Klausul Berbahaya | kontrak-freelance-baca-klausul | hukum, karir | unisex | produktif | ✅ | Freelance contract reading guide, 10 dangerous clauses, negotiation tips, case studies, 2411 words |
| 1.189 | Productivity | Rekomendasi Tools Produktivitas untuk Hustler | rekomendasi-tools-produktivitas-untuk-hustler | karir | unisex | muda | ✅ | Free and low-cost task management, focus tools for hustlers |
| 1.190 | Basic Business Ops | Akuntansi dan Pembukuan Dasar untuk Solopreneur | akuntansi-pembukuan-solopreneur | keuangan | unisex | produktif | ✅ | MERGED (1.191-1.194): cash vs accrual, transaction recording, simple bookkeeping for non-accountants, DAN free templates. Comprehensive guide with embedded template resources |
| 1.191 | Basic Business Ops | Script Layanan Pelanggan dan Penanganan Komplain untuk Bisnis Kecil | script-layanan-komplain-pelanggan | bisnis | unisex | produktif | ✅ | MERGED (1.195-1.196): WhatsApp/email/chat customer service scripts DAN de-escalation/complaint resolution. Include both proactive scripts AND reactive complaint handling |
| 1.192 | Basic Business Ops | Manajemen Email Bisnis: Setup Profesional dan Pemisahan Akun | manajemen-email-bisnis-setup | bisnis | unisex | produktif | ✅ | MERGED (1.197-1.198): inbox organization, labeling, auto-reply DAN professional email setup for hustlers. Cover both email management AND personal/business separation |
| 1.193 | Basic Business Ops | WhatsApp Business Setup dan Optimasi untuk Penjualan | whatsapp-business-setup-optimasi | bisnis | unisex | produktif | ✅ | MERGED (1.199-1.200): profile setup, catalog creation, auto-reply DAN broadcast, label, chatbot for sales. Complete WA Business guide from setup to optimization |
| 1.194 | Digital Marketing | Fotografi Dasar untuk Listing Produk Online | fotografi-dasar-untuk-listing-produk-online | bisnis | unisex | muda | ✅ | Smartphone photography tips for product listing shots |
| 1.195 | Digital Marketing | Cara Edit Foto Produk dengan HP untuk Marketplace | cara-edit-foto-produk-dengan-hp-untuk-marketplace | bisnis | unisex | produktif | ✅ | Free mobile editing apps for marketplace product photos |
| 1.196 | Digital Marketing | Editing Video Sederhana untuk Konten Sosmed Hustler | editing-video-sederhana-untuk-konten-sosmed-hustler | bisnis | unisex | muda | ✅ | CapCut, InShot basics for Reels, TikTok, and Shorts content |
| 1.197 | Digital Marketing | Ide Konten Video Produk untuk Penjualan | ide-konten-video-produk-untuk-penjualan | bisnis | unisex | produktif | ✅ | Short video content ideas to drive small business sales |
| 1.198 | Digital Marketing | Email Marketing untuk Bisnis Kecil: Build List dan Tools Gratis | email-marketing-bisnis-kecil | bisnis | unisex | produktif | ✅ | MERGED (1.205-1.206): lead magnet setup, opt-in forms DAN free tier tools (Mailchimp, ConvertKit). Complete email marketing guide from list building to tool selection |
| 1.199 | Finance Basics | Cara Memisahkan Keuangan Pribadi dan Bisnis | cara-memisahkan-keuangan-pribadi-dan-bisnis | keuangan | unisex | produktif | ✅ | Separate bank accounts, business expense tracking methods |
| 1.200 | Finance Basics | Tips Mengelola Arus Kas Bisnis Kecil | tips-mengelola-arus-kas-bisnis-kecil | keuangan | unisex | produktif | ✅ | Cash flow management basics for solopreneurs |
| 1.201 | Finance Basics | Memahami Laporan Laba Rugi untuk Pemula | memahami-laporan-laba-rugi-untuk-pemula | keuangan | unisex | produktif | ✅ | Profit & loss statement basics and calculation for beginners |
| 1.202 | Finance Basics | Cara Menghitung Margin Keuntungan Bisnis | cara-menghitung-margin-keuntungan-bisnis | keuangan | unisex | produktif | ✅ | Gross vs net profit calculation for small businesses |
| 1.203 | Finance Basics | Template Invoice Freelance agar Cepat Dibayar | invoice-freelance | keuangan | unisex | produktif | ✅ | Billing workflow, payment terms, and follow-up templates |
| 1.204 | Technology | Google Workspace untuk Solopreneur: Setup dan Manfaat Kolaborasi | google-workspace-solopreneur | bisnis | unisex | produktif | ✅ | MERGED (1.213-1.214): Gmail/Drive/Docs setup DAN collaboration benefits. Complete guide from installation to team collaboration |
| 1.205 | Technology | Keamanan Akun Bisnis: Password Manager, 2FA, dan Anti-Phishing | keamanan-akun-bisnis | karir | unisex | produktif | ✅ | MERGED (1.215-1.216): password manager recommendations, 2FA setup DAN phishing prevention, secure password practices. Complete account security guide |
| 1.206 | Technology | Cloud Storage dan Backup Otomatis untuk Bisnis Kecil | cloud-storage-backup-bisnis | bisnis | unisex | produktif | ✅ | MERGED (1.217-1.218): Google Drive/Dropbox allocation, backup strategy DAN automated cloud backup setup. Complete cloud storage and data protection guide |
| 1.207 | Digital & Knowledge Work | Cara Menjadi 3D Modeler & Renderer Freelance: Panduan Lengkap dari Nol | 3d-modeler-renderer | bisnis | unisex | muda | ✅ | Complete guide from software selection to freelance monetization, with ROI calculations and Indonesian market data |
| 1.208 | Technology | Backup Data Bisnis Kecil yang Murah dan Aman | backup-data-bisnis | bisnis | unisex | produktif | ✅ | Backup habit, storage options, and device-loss recovery |
| 1.209 | Productivity | Cara Menggunakan Notion untuk Manajemen Side Hustle | cara-menggunakan-notion-untuk-manajemen-side-hustle | bisnis | unisex | produktif | ✅ | Notion template setup for side hustle management |
| 1.210 | Graduate Skill Business | Peluang Usaha Sarjana Hukum: Dari Review Kontrak sampai Legal Compliance UMKM | peluang-usaha-sarjana-hukum | hukum, bisnis | unisex | muda | ✅ | Degree-to-business path for S.H.; separate legal education/admin services from licensed legal practice |
| 1.211 | Graduate Skill Business | Jasa Review Kontrak UMKM untuk Lulusan Hukum | review-kontrak-umkm-sarjana-hukum | hukum | unisex | muda | ✅ | Starter legal document review service with clear scope and referral boundaries |
| 1.212 | Graduate Skill Business | Peluang Usaha Sarjana Akuntansi: Pembukuan, Pajak, dan Laporan Keuangan UMKM | pembukuan-pajak-sarjana-akuntansi | keuangan, bisnis | unisex | muda | ✅ | Bookkeeping and tax admin service path for accounting graduates |
| 1.213 | Graduate Skill Business | Feasibility Study Mini untuk Lulusan Manajemen dan Bisnis | feasibility-study-sarjana-manajemen | bisnis | unisex | muda | ✅ | Low-ticket feasibility study package for cafes, kiosks, branches, and small online businesses |
| 1.214 | Graduate Skill Business | Riset Pasar Lokal untuk Lulusan Ekonomi | riset-pasar-lokal-sarjana-ekonomi | bisnis | unisex | muda | ✅ | Local market survey and competitor mapping as first paid service |
| 1.215 | Graduate Skill Business | Inventory Audit untuk Lulusan Teknik Industri | inventory-audit-teknik-industri | bisnis | unisex | muda | ✅ | Stock opname, shrinkage, layout, and process audit for small retailers |
| 1.216 | Graduate Skill Business | Jasa SOP Produksi UMKM untuk Lulusan Teknik Industri | sop-produksi-teknik-industri | bisnis | unisex | muda | ✅ | Production checklist and workflow standardization for small factories |
| 1.217 | Graduate Skill Business | Dashboard Keuangan UMKM untuk Lulusan Sistem Informasi | dashboard-keuangan-sistem-informasi | keuangan, bisnis | unisex | muda | ✅ | Spreadsheet, Airtable, or Looker Studio dashboard service |
| 1.218 | Graduate Skill Business | Automation Ops UMKM untuk Lulusan Informatika | automation-ops-informatika | bisnis | unisex | muda | ✅ | WhatsApp, spreadsheet, forms, and no-code automation service |
| 1.219 | Graduate Skill Business | Audit Renovasi Kecil untuk Lulusan Teknik Sipil | audit-renovasi-teknik-sipil | bisnis | unisex | muda | ✅ | RAB sanity check, vendor comparison, and progress checklist |
| 1.220 | Graduate Skill Business | Paket Desain Warung, Kos, dan Klinik Kecil untuk Lulusan Arsitektur | desain-warung-kosan-arsitektur | bisnis | unisex | muda | ✅ | Layout and low-cost space design package for small commercial spaces |
| 1.221 | Graduate Skill Business | Brand Kit UMKM untuk Lulusan DKV | brand-kit-umkm-dkv | bisnis | unisex | muda | ✅ | Logo refresh, packaging, menu board, and social template package |
| 1.222 | Graduate Skill Business | Press Release Lokal untuk Lulusan Ilmu Komunikasi | press-release-lokal-komunikasi | bisnis | unisex | muda | ✅ | Local PR service for launches, community events, and small businesses |
| 1.223 | Graduate Skill Business | Asesmen Rekrutmen UMKM untuk Lulusan Psikologi | asesmen-rekrutmen-umkm-psikologi | bisnis | unisex | muda | ✅ | Non-clinical hiring screen, interview guide, and culture-fit rubric |
| 1.224 | Graduate Skill Business | Desain Kurikulum Training Karyawan untuk Lulusan Pendidikan | kurikulum-training-karyawan | bisnis | unisex | muda | ✅ | Training module design for onboarding, sales, service, and SOP adoption |
| 1.225 | Graduate Skill Business | Audit Menu Katering Sehat untuk Lulusan Gizi | audit-menu-katering-gizi | bisnis | unisex | muda | ✅ | Nutrition-aware menu review with clear non-clinical boundaries |
| 1.226 | Graduate Skill Business | Audit Sanitasi Usaha Makanan untuk Lulusan Kesehatan Masyarakat | audit-sanitasi-usaha-makanan | bisnis | unisex | muda | ✅ | Hygiene checklist and food handling SOP for micro food businesses |
| 1.227 | Graduate Skill Business | Persiapan Label dan Izin Produk Pangan untuk Lulusan Teknologi Pangan | legal-produk-pangan-teknologi-pangan | hukum, bisnis | unisex | muda | ✅ | PIRT/BPOM/halal readiness checklist and label compliance support |
| 1.228 | Graduate Skill Business | Konsultan Urban Farming untuk Lulusan Pertanian | konsultan-urban-farming | bisnis | unisex | muda | ✅ | Hydroponic, rooftop, and small-space farming starter package |
| 1.229 | Graduate Skill Business | Formulasi Pakan Ternak Kecil untuk Lulusan Peternakan | formulasi-pakan-ternak-kecil | bisnis | unisex | muda | ✅ | Feed cost optimization and small-farm productivity guide |
| 1.230 | Graduate Skill Business | Budidaya Ikan Skala Rumah untuk Lulusan Perikanan | budidaya-ikan-skala-rumah | bisnis | unisex | muda | ✅ | Small aquaculture setup, water quality checklist, and buyer mapping |
| 1.231 | Graduate Skill Business | Audit Sampah dan ESG Ringan untuk Lulusan Lingkungan | audit-sampah-esg-lingkungan | bisnis | unisex | muda | ✅ | Waste audit and simple sustainability report for cafes, offices, and shops |
| 1.232 | Graduate Skill Business | Localization Specialist untuk Lulusan Sastra Inggris dan Bahasa | localization-specialist-sastra | karir | unisex | muda | ✅ | Translation, subtitle, app copy, and Indonesian localization service |
| 1.233 | Graduate Skill Business | Knowledge Base UMKM untuk Lulusan Ilmu Perpustakaan | knowledge-base-umkm | bisnis | unisex | muda | ✅ | Document organization, SOP library, and searchable company wiki |
| 1.234 | Graduate Skill Business | Riset Perilaku Konsumen untuk Lulusan Sosiologi dan Antropologi | riset-perilaku-konsumen-sosiologi | bisnis | unisex | muda | ✅ | Customer interviews, field notes, persona, and behavior insight package |
| 1.235 | Graduate Skill Business | Pemetaan Lokasi Usaha dengan GIS untuk Lulusan Geografi dan PWK | pemetaan-lokasi-usaha-gis | bisnis | unisex | muda | ✅ | Site selection using radius, traffic, competitor, and demographic mapping |
| 1.236 | Graduate Skill Business | Jasa OSS dan Izin Dasar untuk Lulusan Administrasi Publik | jasa-oss-administrasi-publik | hukum, bisnis | unisex | muda | ✅ | Ethical licensing admin help for NIB, OSS, and basic business documents |
| 1.237 | Graduate Skill Business | Desk Ekspor Pemula untuk Lulusan Hubungan Internasional | desk-ekspor-hubungan-internasional | bisnis | unisex | muda | ✅ | Export readiness, country brief, buyer research, and document checklist |
| 1.238 | Graduate Skill Business | Medical Content Writer untuk Lulusan Kedokteran dan Kesehatan | medical-content-writer-kesehatan | karir | unisex | muda | ✅ | Evidence-based health content with non-diagnostic editorial boundaries |
| 1.239 | Graduate Skill Business | Research Consultant untuk Lulusan Sains Murni | research-consultant-sains | karir, bisnis | unisex | muda | ✅ | Literature review, experiment summary, and technical research support |
| 1.240 | Local Services | Bisnis Deep Cleaning Rumahan | bisnis-deep-cleaning | bisnis | unisex | produktif | ✅ | General deep-cleaning service overview covering kasur, sofa, AC, karpet, kos, rumah, and kantor |
| 1.241 | SMK Skill Business | Lulusan SMK Otomotif: Jasa Inspeksi Mobil Bekas dari Nol | inspeksi-mobil-bekas | bisnis | unisex | muda | ✅ | Monetize automotive skill via used-car inspection, checklist, pricing, and buyer trust |
| 1.242 | SMK Skill Business | Lulusan TKJ: Pasang WiFi Kos dan CCTV Toko | wifi-cctv-kos-toko-tkj | bisnis | unisex | muda | ✅ | Local technical service for kos, shops, small offices, router setup, CCTV, and maintenance |
| 1.243 | SMK Skill Business | Lulusan Tata Boga: Frozen Food Kecil dengan SOP Rapi | frozen-food-tata-boga | bisnis | unisex | muda | ✅ | Small frozen food business with costing, hygiene, batch SOP, packaging, and PIRT/halal readiness |
| 1.244 | SMK Skill Business | Lulusan Akuntansi SMK: Jasa Input Nota UMKM | input-nota-akuntansi | bisnis, keuangan | unisex | muda | ✅ | Receipt input, invoice cleanup, cash book, simple monthly report, and non-audit boundaries |
| 1.245 | SMK Skill Business | Lulusan Tata Busana: Permak Premium dan Seragam Komunitas | permak-premium-tata-busana | bisnis | unisex | muda | ✅ | Alteration service, uniform batches, measurement SOP, QC, and local repeat customers |
| 1.246 | SMK Skill Business | Servis Motor Panggilan untuk Lulusan SMK | servis-motor-panggilan | bisnis | unisex | muda | ✅ | Home service tune-up, oil change, basic maintenance, route planning, and repeat customer packages |
| 1.247 | SMK Skill Business | Jasa Inspeksi Motor Bekas untuk Pembeli Pemula | inspeksi-motor-bekas | bisnis | unisex | muda | ✅ | Checklist engine, frame, document, accident risk, and buyer report for used motor purchases |
| 1.248 | SMK Skill Business | Jasa Rak Gudang dan Etalase dari Skill Fabrikasi SMK | rak-gudang-fabrikasi | bisnis | unisex | muda | ✅ | Welding/fabrication service for storage racks, shop displays, QC, costing, and delivery |
| 1.249 | SMK Skill Business | Meja Stainless untuk UMKM Makanan | meja-stainless-umkm | bisnis | unisex | muda | ✅ | Stainless table niche for food stalls, prep kitchens, hygiene angle, pricing, and vendor sourcing |
| 1.250 | SMK Skill Business | Instalasi Listrik Toko Kecil untuk Lulusan SMK | instalasi-listrik-toko | bisnis | unisex | muda | ✅ | Safe small-shop electrical setup, lighting, outlet planning, load estimate, and license guardrails |
| 1.251 | SMK Skill Business | Audit Listrik Kos dan Kontrakan | audit-listrik-kos | bisnis | unisex | muda | ✅ | Basic electrical risk checklist for kos owners, overload detection, cost-saving, and referral boundaries |
| 1.252 | SMK Skill Business | Servis AC dan Kulkas Komersial untuk Warung | servis-ac-kulkas | bisnis | unisex | muda | ✅ | Refrigeration and AC maintenance for warung, cafe, minimarket, cold storage, and monthly service packages |
| 1.253 | SMK Skill Business | Repair Elektronik Rumahan yang Bisa Jadi Cashflow | repair-elektronik-rumahan | bisnis | unisex | muda | ✅ | Small appliance repair, diagnostic fee, sparepart sourcing, warranty policy, and trust building |
| 1.254 | SMK Skill Business | Smart Home dan Sensor Murah untuk Rumah Sewa | smart-home-iot | bisnis | unisex | muda | ✅ | IoT setup for landlords, motion sensor, smart lock, leak alarm, and maintenance package |
| 1.255 | SMK Skill Business | Landing Page Murah untuk UMKM oleh Lulusan RPL | landing-page-rpl | bisnis | unisex | muda | ✅ | Fixed-scope landing page service, copy blocks, WhatsApp CTA, hosting, and maintenance upsell |
| 1.256 | SMK Skill Business | POS Kasir Sederhana untuk Warung dan Salon | pos-kasir-sederhana | bisnis | unisex | muda | ✅ | Lightweight POS setup, product list, daily sales report, barcode option, and training |
| 1.257 | SMK Skill Business | Foto Produk Murah untuk Seller Marketplace | foto-produk-multimedia | bisnis | unisex | muda | ✅ | Product photography package, simple lighting, background, editing, and marketplace-ready output |
| 1.258 | SMK Skill Business | Video Short UMKM untuk TikTok dan Reels | video-short-umkm | bisnis | unisex | muda | ✅ | Short video production package, script, shoot, edit, caption, and monthly retainer path |
| 1.259 | SMK Skill Business | Animasi Iklan Pendek untuk Produk Lokal | animasi-iklan-pendek | bisnis | unisex | muda | ✅ | Motion graphics and simple animation ads for local brands, pricing, storyboard, and IP ownership |
| 1.260 | SMK Skill Business | Admin Marketplace untuk Toko yang Mulai Ramai | admin-marketplace | bisnis | unisex | muda | ✅ | Product upload, catalog cleanup, chat response, voucher setup, order follow-up, and KPI |
| 1.261 | SMK Skill Business | Live Host Produk Lokal untuk Lulusan Pemasaran SMK | live-host | bisnis | unisex | muda | ✅ | Live selling service, script, offer stack, commission model, and performance tracking |
| 1.262 | SMK Skill Business | Jasa Packing Harian untuk Seller Online | jasa-packing-umkm | bisnis | unisex | muda | ✅ | Packing service for online sellers, per-package pricing, QC, cut-off time, and damage claims |
| 1.263 | SMK Skill Business | Stock Opname Gudang Kecil untuk UMKM | stock-opname-gudang | bisnis | unisex | muda | ✅ | Inventory counting service, barcode/simple spreadsheet, variance report, and shrinkage notes |
| 1.264 | SMK Skill Business | Virtual Admin untuk Owner Solo | virtual-admin | karir, bisnis | unisex | muda | ✅ | Remote admin package for calendar, inbox, order recap, data entry, and weekly reporting |
| 1.265 | SMK Skill Business | Arsip Digital Dokumen Usaha Kecil | arsip-digital | bisnis | unisex | muda | ✅ | Document scanning, folder structure, naming SOP, access control, and confidentiality |
| 1.266 | SMK Skill Business | Jasa Kas Kecil dan Rekap Pengeluaran Harian | kas-kecil-umkm | keuangan, bisnis | unisex | muda | ✅ | Petty cash recording, receipt capture, weekly recap, owner dashboard, and bookkeeping boundaries |
| 1.267 | SMK Skill Business | Admin Koperasi dan Arisan yang Rapi | admin-koperasi | keuangan, bisnis | unisex | muda | ✅ | Member dues, loan records, payment reminders, monthly recap, and data privacy |
| 1.268 | SMK Skill Business | Katering Harian Kecil dari Skill Tata Boga | katering-harian-tata-boga | bisnis | unisex | muda | ✅ | Lunch box/catering starter, menu rotation, costing, preorder, hygiene, and delivery |
| 1.269 | SMK Skill Business | Meal Prep Murah untuk Karyawan dan Anak Kos | meal-prep | bisnis | unisex | muda | ✅ | Weekly meal prep package, nutrition-aware menu, subscription, packaging, and food safety |
| 1.270 | SMK Skill Business | Sabun dan Pembersih Rumahan Skala Kecil | sabun-pembersih-kimia | bisnis | unisex | muda | ✅ | Simple cleaning product business, formula safety, label, batch record, and regulatory guardrails |
| 1.271 | SMK Skill Business | QC Produk Rumahan untuk Seller Kecil | qc-produk-rumahan | bisnis | unisex | muda | ✅ | Basic quality control service for food/craft/cosmetic sellers, checklist, sampling, and report |
| 1.272 | SMK Skill Business | Jahit Seragam Komunitas dan Usaha Kecil | jahit-seragam-komunitas | bisnis | unisex | muda | ✅ | Small-batch uniform service, measurement day, deposit, production schedule, and QC |
| 1.273 | SMK Skill Business | Jasa Pola Baju untuk Brand Fashion Kecil | jasa-pola-baju | bisnis | unisex | muda | ✅ | Pattern-making support for small fashion brands, sample iteration, sizing, and IP boundaries |
| 1.274 | SMK Skill Business | MUA Wisuda dan Lamaran dari Skill Kecantikan SMK | mua-wisuda | bisnis | female | muda | ✅ | Makeup service package, portfolio, hygiene, booking deposit, and seasonal demand |
| 1.275 | SMK Skill Business | Nail Art Home Service untuk Pasar Lokal | nail-art-home-service | bisnis | female | muda | ✅ | Home beauty service, hygiene kit, menu pricing, repeat booking, and product safety |
| 1.276 | SMK Skill Business | Housekeeping Airbnb dan Rumah Sewa Harian | housekeeping-airbnb | bisnis | unisex | muda | ✅ | Cleaning turnover service, checklist, photo proof, linen handling, and owner reporting |
| 1.277 | SMK Skill Business | Operator Homestay Kecil untuk Pemilik Sibuk | operator-homestay | bisnis | unisex | muda | ✅ | Guest messaging, check-in, cleaning coordination, review management, and revenue share |
| 1.278 | SMK Skill Business | Guide Lokal Niche untuk Wisatawan Keluarga | guide-lokal | bisnis | unisex | muda | ✅ | Local guiding niche, route design, safety, pricing, and review collection |
| 1.279 | SMK Skill Business | Itinerary Lokal untuk Liburan Hemat | itinerary-lokal | bisnis | unisex | muda | ✅ | Paid itinerary planning, local transport, food route, family-friendly options, and affiliate angle |
| 1.280 | SMK Skill Business | Bibit Tanaman dan Nursery Mini dari Rumah | bibit-tanaman | bisnis | unisex | muda | ✅ | Plant nursery starter, propagation, packaging, local delivery, and seasonal demand |
| 1.281 | SMK Skill Business | Hidroponik Rumah untuk Supply Sayur Lokal | hidroponik-rumah | bisnis | unisex | muda | ✅ | Small hydroponic setup, buyer mapping, recurring harvest, and quality control |
| 1.282 | SMK Skill Business | Formulasi Pakan Ternak Murah untuk Peternak Kecil | formulasi-pakan | bisnis | unisex | muda | ✅ | Feed cost optimization service, ingredient sourcing, simple formulation, and result tracking |
| 1.283 | SMK Skill Business | Audit Kandang Kecil untuk Peternak Lokal | audit-kandang | bisnis | unisex | muda | ✅ | Biosecurity, feed, ventilation, waste, productivity checklist, and non-veterinary boundaries |
| 1.284 | SMK Skill Business | Audit Kolam Ikan dan Kualitas Air | audit-kolam-ikan | bisnis | unisex | muda | ✅ | Water quality checklist, aeration, feed, mortality log, and practical improvement report |
| 1.285 | SMK Skill Business | Budidaya Ikan Hias Kecil untuk Cashflow Rumah | budidaya-ikan-hias | bisnis | unisex | muda | ✅ | Ornamental fish starter, breeding, buyer communities, packaging, and mortality risk |
| 1.286 | SMK Skill Business | Drafter dan RAB Renovasi Kecil untuk Lulusan SMK Bangunan | drafter-rab-renovasi | bisnis | unisex | muda | ✅ | Drawing and cost estimate service for small renovation, vendor comparison, and engineering guardrails |
| 1.287 | SMK Skill Business | Ukur Lahan GPS dan Peta Lokasi Usaha | ukur-lahan-gps | bisnis | unisex | muda | ✅ | Simple land/site measurement support, map output, location notes, and legal surveyor boundaries |
| 1.288 | SMK Skill Business | Desain Spanduk, Menu, dan Katalog untuk Warung | desain-spanduk-menu | bisnis | unisex | muda | ✅ | Fast local design package for food stalls and small shops, print-ready files, and revision limits |
| 1.289 | SMK Skill Business | Subtitle Video dan Reels untuk Creator Lokal | subtitle-video | bisnis | unisex | muda | ✅ | Captioning/subtitle service, short-form workflow, batch pricing, and content calendar upsell |
| 1.290 | SMK Skill Business | Setup Printer Barcode dan Label untuk Toko | setup-printer-barcode | bisnis | unisex | muda | ✅ | Barcode printer setup, label template, SKU discipline, and staff training |
| 1.291 | SMK Skill Business | Service Laptop Sekolah dan Kantor Kecil | service-laptop | bisnis | unisex | muda | ✅ | Laptop cleaning, SSD upgrade, OS reinstall, backup, warranty policy, and trust signal |
| 1.292 | SMK Skill Business | Maintenance Komputer Bulanan untuk UMKM | maintenance-komputer-umkm | bisnis | unisex | muda | ✅ | Monthly IT maintenance for shops/offices, antivirus, backup, printer, network, and SLA |
| 1.293 | Digital & Knowledge Work | Panduan Laptop Bekas untuk Modal Usaha Digital 2026 | laptop-bekas-modal-usaha | bisnis, karir | unisex | muda | ✅ | Minimum viable laptop specs, used business laptop checklist, price ranges, workload tiers, and red flags before buying |
| 1.294 | Mindset & Hustle Psychology | Fokus itu Kunci: Kenapa Banyak Mulai Tapi Sedikit Selesai | fokus-ini-kunci | karir | unisex | muda | ✅ | Satu masalah: action-oriented tapi scattered. Fokus pada cara commit ke satu bidang |
| 1.295 | Mindset & Hustle Psychology | Shiny Object Syndrome: Cara Berhenti Gonta-Ganti Bisnis | shiny-object-syndrome | karir | unisex | muda | ✅ | Satu masalah: shiny object syndrome. Fokus pada cara mengenali dan menghentikan pola ini |
| 1.296 | Mindset & Hustle Psychology | Sabar Itu Produktif: Cara Bertahan saat Belum Ada Hasil | sabar-itu-produktif | karir | unisex | muda | ✅ | Satu masalah: instant gratification. Fokus pada delayed gratification dan bertahan di masa awal |
| 1.297 | Mindset & Hustle Psychology | Berhenti Bandingkan: Cara Melihat Progress Sendiri Tanpa Iri | berhenti-bandingkan | karir | unisex | muda | ✅ | Satu masalah: comparison trap. Fokus pada self-comparison dan personal growth |
| 1.298 | Mindset & Hustle Psychology | Anda Lebih Mampu dari yang Anda Kira: Mengatasi Imposter Syndrome | anda-lebih-mampu | karir | unisex | muda | ✅ | Satu masalah: imposter syndrome. Fokus pada bukti kompetensi dan cara claim expertise |
| 1.299 | Mindset & Hustle Psychology | Dari Jual Waktu ke Jual Sistem: Kenapa Income Harus Terlepas dari Jam Kerja | jual-waktu-ke-sistem | karir | unisex | muda | ✅ | Satu masalah: selling time. Fokus pada passive income dan system thinking |
| 1.300 | Mindset & Hustle Psychology | Mulai Delegate: Kenapa Mengerjakan Semua Sendiri Itu Jebakan | mulai-delegate | karir | unisex | muda | ✅ | Satu masalah: no delegation. Fokus pada cara mulai serahkan tugas ke orang lain |
| 1.301 | Mindset & Hustle Psychology | Jangan Tunggu Klien Datang: Cara Bangun Sistem Marketing yang Jalan | jangan-tunggu-klien | karir | unisex | muda | ✅ | Satu masalah: reactive business. Fokus pada proactive marketing dan lead generation |
| 1.302 | Mindset & Hustle Psychology | Komitmen itu Kunci: Kenapa Anda Harus Pilih Satu Bidang dan Bertahan | komitmen-itu-kunci | karir | unisex | muda | ✅ | Satu masalah: fear of commitment. Fokus pada cara commit tanpa takut salah pilih |
| 1.303 | Mindset & Hustle Psychology | Kedalaman Lebih Berharga dari Kebanyakan Pilihan | kedalaman-lebih-berharga | karir | unisex | muda | ✅ | Satu masalah: fear of depth. Fokus pada T-shaped skills dan value jadi ahli |
| 1.304 | Mindset & Hustle Psychology | SOP untuk Bisnis Kecil: Kenapa Anda Harus Dokumentasikan Semuanya | sop-bisnis-kecil | karir | unisex | muda | ✅ | Satu masalah: no SOP. Fokus pada cara bikin SOP sederhana yang bisa dijalankan siapa saja |
| 1.305 | Mindset & Hustle Psychology | Harga Murah itu Jebakan: Kenapa You Should Charge More | harga-murah-jebakan | karir | unisex | muda | ✅ | Satu masalah: underpricing. Fokus pada psychology pricing dan value-based pricing |
| 1.306 | Mindset & Hustle Psychology | Prediktabilitas Income: Cara Dari Project ke Retainer Bulanan | prediktabilitas-income | karir | unisex | muda | ✅ | Satu masalah: income tidak stabil. Fokus pada retainer model dan recurring revenue |

**Tier 1 Target**: 306 articles (306 complete, 0 ready to write, 0 research)

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
| 2.10 | Investing | Dividen Investing untuk Pemula | dividen-investing-pemula | investasi | unisex | produktif | ✅ | Dividend strategy basics; Differentiated from 3.28 (advanced dividend portfolio) |
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
| 2.23 | Operations & Systems | Quality Control (QC) & Standarisasi | qc-standarisasi | bisnis | unisex | produktif | ✅ | Quality management, 2200+ words, Syamsul Alam voice, research data integration, case studies, Duit.co.id ecosystem integration, backdated 2025-07-06 |
| 2.24 | People & HR | Template dan Framework Rekrutmen Karyawan Pertama | framework-rekrutmen-karyawan | bisnis | unisex | produktif | ✅ | Framework & template focus; Differentiated from 2.11 (strategy) and 2.184 (training/onboarding) |
| 2.25 | People & HR | Manajemen Kompensasi (Gaji vs Komisi) | manajemen-kompensasi-tim | bisnis | unisex | produktif | ✅ | HR strategy |
| 2.26 | Operations & Systems | Transformasi Digital untuk UMKM | transformasi-digital-umkm | bisnis | unisex | produktif | ✅ | Digital transformation |
| 2.27 | Growth & Expansion | Strategi Pelanggan (Customer Retention) | retensi-pelanggan | bisnis | unisex | produktif | ✅ | 2870 words, Syamsul Alam voice, BPS/Ken Research/Statista 2025-2026 data (70-80% avg retention, 5x acquisition cost, 25-95% profit increase), 3 case studies (Alfamart 4x member growth, Indosat 10x revenue, Cool-Vita 60% sales growth), 7 strategies (personalization, loyalty, communication, feedback, referral, consistency, CRM), ROI calculations 460-600%, legal compliance UU PDP 27/2022 & UU 5/1999, Duit.co.id ecosystem integration, differentiated from CRM tools article (2.113) by focusing on strategy not tools, backdated 2025-05-10 |
| 2.28 | Legal & Risk | Strategi Pricing & Markup Calculation | pricing-markup-bisnis | bisnis | unisex | produktif | ✅ | Pricing strategy, 2768 words, Syamsul Alam voice, 4 pricing strategies (Cost-Plus, Penetration, Value-Based, Dynamic), case studies (Tahu Suwardi 25% profit increase, Kopi Janji Jiwa 300% market share), psychology pricing (charm pricing, anchoring, decoy effect), legal compliance (UU 5/1999 anti-monopoly, UU 36/2008 tax), tools (Accurate, Kledo), Duit.co.id ecosystem integration, backdated 2025-05-16 |
| 2.29 | Legal & Risk | Memahami Rasio Keuangan Bisnis | rasio-keuangan-bisnis | keuangan | unisex | produktif | ✅ | Overview of key business financial ratios (profitability, liquidity, solvency); Differentiated from 2.82 (detailed ratio calculations & formulas), 2000+ words, Syamsul Alam voice, research data from OJK/BI/Kadin, case studies (Jaya Ponsel, Retail UMKM, Indofood), benchmarks 2025-2026, action steps, Duit.co.id ecosystem integration |
| 2.30 | Finance Control | Passive Income vs Active Income | passive-active-income | keuangan | unisex | produktif | ✅ | 2485 words, Syamsul Alam voice, BPS 2025 data (PDB Rp83.7M, financial literacy 66.46%), tax implications (UU PPh Pasal 4 ayat 2, Pasal 23), case studies (Budi Santoso 5 units Rp25M/month, Rina Kartika Rp150M portfolio Rp6M/month dividend), active vs passive comparison table, transition strategies, Duit.co.id ecosystem integration, backdated 2025-05-11 |
| 2.31 | Legal & Risk | Membangun Skor Kredit Bisnis (SLIK OJK) | skor-kredit-bisnis | keuangan | unisex | produktif | ✅ | Business credit |
| 2.32 | Operations & Systems | Vendor Management & Negosiasi | vendor-management | bisnis | unisex | produktif | ✅ | Supplier relations |
| 2.33 | Operations & Systems | Sistem Manajemen Inventori | manajemen-inventori | bisnis | unisex | produktif | ✅ | Inventory control |
| 2.34 | Finance Control | Monthly Financial Review Process | review-keuangan-bulanan | keuangan | unisex | produktif | ✅ | Financial routine |
| 2.35 | Operations & Systems | Tools & Software untuk Business Scaling | tools-scaling-bisnis | bisnis | unisex | produktif | ✅ | Tech stack |
| 2.36 | Growth & Expansion | Mengoptimalkan Customer Acquisition Cost | optimalisasi-cac | bisnis | unisex | produktif | ✅ | Marketing cost |
| 2.37 | Growth & Expansion | User Generated Content (UGC) Campaign: Strategi Murah untuk UMKM Naik Kelas | ugc-campaign-umkm | bisnis | unisex | produktif | ✅ | UGC campaign strategy for UMKM scaling, Rp 1.5M capital, 2026 data, case studies, 10-step implementation, legal compliance |
| 2.38 | Finance Control | Break-Even Analysis untuk Bisnis | break-even-analysis | keuangan | unisex | produktif | ✅ | Profitability |
| 2.39 | Finance Control | Cost Structure Analysis | cost-structure-analysis | keuangan | unisex | produktif | ✅ | Cost management |
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
| 2.73 | Finance Control | Analisis Sensitivitas Harga | analisis-sensitivitas-harga | keuangan | unisex | produktif | ✅ | Price sensitivity and margin impact |
| 2.74 | Finance Control | Analisis Skenario Keuangan Bisnis | analisis-skenario-keuangan | keuangan | unisex | produktif | ✅ | Scenario planning |
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
| 2.114 | Operations & Systems | Implementasi ISO 9001 untuk UMKM | iso-9001-umkm | bisnis | unisex | produktif | ✅ | Quality management certification |
| 2.115 | Finance Control | Manajemen Piutang Usaha | manajemen-piutang-usaha | keuangan | unisex | produktif | ✅ | Accounts receivable management |
| 2.116 | Investing | Reksa Dana Indeks (ETF) Lokal | reksa-dana-indeks-etf | investasi | unisex | produktif | ✅ | Local index fund guide, Syamsul Alam voice, 2000+ words, backdated 2025-01-10 |
| 2.117 | People & HR | Kebijakan Cuti Karyawan UMKM | kebijakan-cuti-karyawan | bisnis | unisex | produktif | ✅ | Leave policy design |
| 2.118 | Growth & Expansion | Strategi Ekspansi ke Luar Kota | ekspansi-luar-kota | bisnis | unisex | produktif | ✅ | Inter-city expansion steps |
| 2.119 | Legal & Risk | Perlindungan HAKI untuk Produk UMKM | perlindungan-haki-umkm | hukum | unisex | produktif | ✅ | Complete guide with case studies, 2026 HAKI costs (Rp 500k-4M), registration steps, ROI calculations, 1932 words |
| 2.120 | Operations & Systems | Sistem Antrian & Manajemen Pelanggan | sistem-antrian-pelanggan | bisnis | unisex | produktif | ✅ | Queue & customer flow management |
| 2.121 | Finance Control | Perencanaan Pajak Penghasilan Badan | pph-badan-planning | hukum | unisex | produktif | ✅ | Corporate income tax planning guide for Tier2 Scalers, 2622 words, Syamsul Alam voice, UU 36/2008 & UU HPP 7/2021 compliance, 7 planning strategies (biaya operasional, penyusutan, kompensasi kerugian, dividen bebas pajak, hindari sanksi, fasilitas pembebasan, restrukturisasi), 3 case studies (PT Makanan Sehat Rp176M savings, PT Manufaktur Andika Rp590M savings, PT Konsultan IT), PMK 90/2025 update, Duit.co.id ecosystem integration, backdated 2025-05-20 |
| 2.122 | Investing | Investasi Emas Batangan vs Logam Mulia | emas-batangan-vs-logam-mulia | investasi | unisex | produktif | ✅ | Gold investment comparison |
| 2.123 | People & HR | Pelatihan Karyawan (Training & Development) | pelatihan-karyawan | bisnis | unisex | produktif | ✅ | Employee skills training |
| 2.124 | Operations & Systems | SOP untuk Customer Service | sop-customer-service | bisnis, karir | unisex | produktif | ✅ | SOP CS guide with case studies (Tokopedia, Gojek), legal compliance (UU 8/1999, UU 27/2022, PP 80/2019), ROI 170% first year, 2000+ words |
| 2.125 | Operations & Systems | Sistem Ticketing & Follow-up Pelanggan | sistem-ticketing-followup | bisnis | unisex | produktif | ✅ | Customer query tracking system |
| 2.126 | Operations & Systems | Manajemen Aset Tetap (Fixed Asset) | manajemen-aset-tetap | bisnis | unisex | produktif | ✅ | Asset tracking & depreciation |
| 2.127 | Finance Control | Penyusutan Aset (Depreciation) untuk Bisnis | penyusutan-aset | keuangan, bisnis | unisex | produktif | ✅ | PMK 72/2023, PSAK 16/17, case studies (Ahmad/Siti), calculations, 2338 words |
| 2.128 | Operations & Systems | Sistem Audit Internal UMKM | audit-internal-umkm | bisnis | unisex | produktif | ✅ | Internal control checks |
| 2.129 | Operations & Systems | Sistem Penjadwalan Tim (Roster) | sistem-jadwal-tim | bisnis | unisex | produktif | ✅ | Shift & task scheduling |
| 2.130 | Operations & Systems | Manajemen Limbah Usaha | manajemen-limbah-usaha | bisnis | unisex | produktif | ✅ | Waste management compliance |
| 2.131 | Growth & Expansion | Strategi Influencer Marketing Lokal | influencer-marketing-lokal | bisnis | unisex | produktif | ✅ | Local influencer collaboration |
| 2.132 | Growth & Expansion | Referral Program untuk UMKM | referral-program-umkm | bisnis | unisex | produktif | ✅ | Customer referral engine |
| 2.133 | Growth & Expansion | Google Ads untuk UMKM | google-ads-umkm | bisnis | unisex | produktif | ✅ | Search ads setup guide, CPC benchmarks 2026, ROI calculations, case studies (Budi/Sari), legal compliance (UU 8/1999, UU 27/2022), 1817 words |
| 2.134 | Growth & Expansion | TikTok Ads untuk Penjualan | tiktok-ads-penjualan | bisnis | unisex | muda | ✅ | Short video ads strategy |
| 2.135 | Growth & Expansion | Content Marketing Blog Bisnis | content-marketing-blog | bisnis | unisex | produktif | ✅ | SEO-driven content creation, 2213 words, case studies (Gojek, Bibit), market data 2026 |
| 2.136 | Growth & Expansion | Strategi Dropshipping Lokal | dropshipping-lokal-scaler | bisnis | unisex | produktif | ✅ | Local dropship scaling, 2000+ words, Syamsul Alam voice, case studies |
| 2.137 | Growth & Expansion | Loyalty Program Digital | loyalty-program-digital | bisnis | unisex | produktif | ✅ | Points & rewards system |
| 2.138 | Growth & Expansion | Review Management Online | review-management-online | bisnis | unisex | produktif | ✅ | Google/Tokopedia review optimization, 2000+ words, Syamsul Alam voice |
| 2.139 | Finance Control | Manajemen Utang Bisnis (Debt Service) | manajemen-utang-bisnis | keuangan | unisex | produktif | ✅ | Loan repayment planning |
| 2.140 | Finance Control | Jadwal Penggantian Aset Usaha | jadwal-ganti-aset | keuangan | unisex | produktif | ✅ | Asset replacement planning |
| 2.141 | Finance Control | Pajak PPN: Cara Lapor & Bayar | pajak-ppn-umkm | keuangan | unisex | produktif | ✅ | VAT compliance guide |
| 2.142 | Finance Control | Pajak PPh 21 Karyawan | pph-21-karyawan | keuangan | unisex | produktif | ✅ | Employee income tax filing |
| 2.143 | Finance Control | Laporan Laba Rugi (P&L): Panduan Lengkap | laporan-laba-rugi | keuangan, bisnis | unisex | produktif | ✅ | PSAK 118, PP 43/2025, case studies (Cemindo, Indofood, Phapros), 2151 words, Syamsul Alam voice |
| 2.144 | Finance Control | Laporan Neraca (Balance Sheet) | laporan-neraca | keuangan | unisex | produktif | ✅ | Balance sheet analysis, 2168 words, Syamsul Alam voice, comprehensive guide with examples, ratios, common mistakes, action steps, Duit.co.id ecosystem integration |
| 2.145 | Finance Control | Laporan Arus Kas (Cash Flow Statement) | laporan-arus-kas | keuangan | unisex | produktif | ✅ | Cash flow statement creation |
| 2.146 | Finance Control | Manajemen Kas Kecil (Petty Cash) | manajemen-kas-kecil | keuangan | unisex | produktif | ✅ | Small cash control system |
| 2.147 | Finance Control | Budgeting Operasional Tahunan | budgeting-operasional-tahunan | keuangan | unisex | produktif | ✅ | Annual ops budget planning |
| 2.148 | People & HR | Kebijakan Disiplin Karyawan | kebijakan-disiplin-karyawan | bisnis | unisex | produktif | ✅ | Disciplinary action guidelines |
| 2.149 | People & HR | Rekrutmen Karyawan Remote | rekrutmen-remote | bisnis | unisex | produktif | ✅ | Remote hiring process |
| 2.150 | People & HR | Penilaian Kinerja 360 Derajat | penilaian-kinerja-360 | bisnis | unisex | produktif | ✅ | 360-degree performance appraisal |
| 2.151 | People & HR | Kesehatan Mental Karyawan | kesehatan-mental-karyawan | bisnis | unisex | produktif | ✅ | Workplace mental health program |
| 2.152 | People & HR | Sistem Promosi & Demosi | sistem-promosi-demosi | bisnis | unisex | produktif | ✅ | Career progression rules |
| 2.153 | People & HR | Outsourcing vs Karyawan Tetap | outsourcing-vs-tetap | bisnis | unisex | produktif | ✅ | Hiring model comparison |
| 2.154 | People & HR | Pelatihan Soft Skills Karyawan | pelatihan-soft-skills | bisnis | unisex | produktif | ✅ | Communication & teamwork training |
| 2.155 | People & HR | Manajemen Kinerja Freelancer | manajemen-freelancer | bisnis | unisex | produktif | ✅ | Contractor performance tracking |
| 2.156 | Legal & Risk | Perjanjian Kerja Sama (PKS) | perjanjian-kerja-sama | hukum | unisex | produktif | ✅ | Partnership agreement drafting |
| 2.157 | Legal & Risk | Perlindungan Data Pribadi (UU PDP) | uu-pdp-bisnis | hukum | unisex | produktif | ✅ | Personal Data Protection compliance |
| 2.158 | Legal & Risk | Izin Usaha (NIB, SIUP, TDP) | izin-usaha-nib | hukum | unisex | produktif | ✅ | Business license guide |
| 2.159 | Legal & Risk | Perjanjian Sewa Tempat Usaha | perjanjian-sewa-tempat | hukum | unisex | produktif | ✅ | Lease agreement checklist |
| 2.160 | Legal & Risk | Sengketa Konsumen (LPSK) | sengketa-konsumen | hukum | unisex | produktif | ✅ | Consumer dispute resolution |
| 2.161 | Legal & Risk | Ketenagakerjaan (UU Cipta Kerja) | uu-cipta-kerja-bisnis | hukum | unisex | produktif | ✅ | Labor law compliance |
| 2.162 | Legal & Risk | Perlindungan Merek Dagang | perlindungan-merek-dagang | hukum | unisex | produktif | ✅ | Trademark registration guide |
| 2.163 | Operations & Systems | E-commerce Integration (Shopee/Tokopedia) | ecommerce-integration | bisnis | unisex | produktif | ✅ | Multi-platform inventory sync |
| 2.164 | Operations & Systems | Sistem Pembayaran Digital (QRIS) | sistem-pembayaran-qris | bisnis | unisex | produktif | ✅ | QRIS implementation guide |
| 2.165 | Operations & Systems | Analitik Data Bisnis Sederhana | analitik-data-bisnis | bisnis | unisex | produktif | ✅ | Basic business data analytics |
| 2.166 | Operations & Systems | Keamanan Siber UMKM | keamanan-siber-umkm | bisnis | unisex | produktif | ✅ | Cybersecurity basics for SMEs |
| 2.167 | Operations & Systems | Chatbot CS Otomatis | chatbot-cs-otomatis | bisnis | unisex | produktif | ✅ | Automated customer support setup |
| 2.168 | Operations & Systems | Seleksi Vendor Baru | seleksi-vendor-baru | bisnis | unisex | produktif | ✅ | Vendor evaluation criteria |
| 2.169 | Operations & Systems | Manajemen Stok Barang (Stock Opname) | stock-opname | bisnis | unisex | produktif | ✅ | Regular inventory stock check |
| 2.170 | Operations & Systems | Logistik Distribusi Mandiri | logistik-distribusi-mandiri | bisnis | unisex | produktif | ✅ | Self-distribution network setup |
| 2.171 | Operations & Systems | Quality Control Bahan Baku | qc-bahan-baku | bisnis | unisex | produktif | ✅ | Raw material quality control |
| 2.172 | Investing | Reksa Dana Terproteksi | reksa-dana-terproteksi | investasi | unisex | produktif | ✅ | Protected mutual funds guide |
| 2.173 | Investing | Investasi Surat Berharga Negara (SBN) | investasi-sbn | investasi | unisex | produktif | ✅ | Government securities investment |
| 2.174 | Export & Trade | Dokumen Ekspor-Impor Lengkap | dokumen-ekspor-impor | hukum | unisex | produktif | ✅ | Export-import paperwork |
| 2.175 | Export & Trade | Cara Pakai Letter of Credit (L/C) | letter-of-credit | keuangan | unisex | produktif | ✅ | L/C for exporters |
| 2.176 | Export & Trade | Incoterms 2020 untuk Eksportir | incoterms-eksportir | bisnis | unisex | produktif | ✅ | International trade terms |
| 2.177 | Advanced Tax | Transfer Pricing untuk Grup Bisnis | transfer-pricing | hukum | unisex | produktif | ✅ | Related party pricing |
| 2.178 | Advanced Tax | Tax Holiday & Insentif Penanaman Modal | tax-holiday | hukum | unisex | produktif | ✅ | Investment incentives |
| 2.179 | Industry Cert | Sertifikasi Halal MUI untuk UMKM | sertifikasi-halal | hukum | unisex | produktif | ✅ | Halal certification |
| 2.180 | Industry Cert | Pendaftaran BPOM untuk UMKM | pendaftaran-bpom | hukum | unisex | produktif | ✅ | BPOM registration |
| 2.181 | Insurance | Asuransi Siber untuk UMKM | asuransi-siber | keuangan | unisex | produktif | ✅ | Cyber insurance |
| 2.182 | Insurance | Asuransi Karyawan Kunci (Key Person) | asuransi-key-person | keuangan | unisex | produktif | ✅ | Key person coverage |
| 2.183 | Growth | Investor Pitch Preparation | investor-pitch | bisnis | unisex | produktif | ✅ | Pitch deck mastery |
| 2.184 | People & HR | Cara Train dan Onboard Tim Pertama Anda | train-onboard-tim-pertama | bisnis | unisex | produktif | ✅ | Training & onboarding focus; Differentiated from 2.11 (recruitment strategy) and 2.24 (framework template) |
| 2.185 | Finance Control | Laporan Arus Kas Metode Tidak Langsung | arus-kas-tidak-langsung | keuangan | unisex | produktif | ✅ | Indirect cash flow statement guide |
| 2.186 | Growth & Expansion | Strategi Pembukaan Cabang Kedua | buka-cabang-kedua | bisnis | unisex | produktif | ✅ | Second branch readiness |
| 2.187 | Legal & Risk | KPI & Metrik Kinerja Bisnis | kpi-bisnis | bisnis | unisex | produktif | ✅ | Performance metrics |
| 2.188 | Legal & Risk | Membangun Identitas Brand Bisnis | brand-identity-bisnis | bisnis | unisex | produktif | ✅ | Branding |
| 2.189 | Legal & Risk | Email Marketing untuk B2B | email-marketing-b2b | bisnis | unisex | produktif | ✅ | B2B marketing |
| 2.190 | Operations & Systems | Standardisasi Produk & Kemasan | standardisasi-produk-kemasan | bisnis | unisex | produktif | ✅ | Product consistency protocol |
| 2.191 | Productized Advisory | Praktik Konsultan Pajak UMKM Berbasis Retainer | konsultan-pajak-retainer-umkm | hukum, keuangan | unisex | produktif | ✅ | Turn accounting/tax competence into monthly retainers with compliance guardrails |
| 2.192 | Productized Advisory | Paket Feasibility Study untuk Pembukaan Cabang | feasibility-study-cabang | bisnis | unisex | produktif | ✅ | Repeatable feasibility package for new outlets, kiosks, and branches |
| 2.193 | Productized Advisory | Inventory Audit dan Shrinkage Control untuk Retail Kecil | inventory-audit-shrinkage | bisnis | unisex | produktif | ✅ | Stock loss diagnosis, process control, and monthly audit service |
| 2.194 | Productized Advisory | Holding Strategy untuk Pemilik Banyak Usaha Kecil | holding-strategy-umkm | hukum, bisnis | unisex | produktif | ✅ | Entity separation, risk ring-fencing, and owner reporting for multi-business operators |
| 2.195 | Professional Service Systems | Sistem Kompensasi dan KPI untuk Tim Kecil | sistem-kompensasi-kpi-tim | bisnis | unisex | produktif | ✅ | HR psychology/management competence packaged for 5-30 person teams |
| 2.196 | Professional Service Systems | Dashboard Manajemen untuk Owner Operator | dashboard-manajemen-owner | keuangan, bisnis | unisex | produktif | ✅ | Management dashboard from sales, inventory, cashflow, and people metrics |
| 2.197 | Professional Service Systems | SOP dan Internal Control untuk Bisnis Keluarga | sop-internal-control-keluarga | bisnis | unisex | produktif | ✅ | Controls for cash handling, approvals, roles, and family employee boundaries |
| 2.198 | Productized Advisory | Audit Kepatuhan PIRT, BPOM, dan Halal untuk UMKM | audit-pirt-bpom-halal | hukum, bisnis | unisex | produktif | ✅ | Food/product compliance readiness checklist with referral boundaries |
| 2.199 | B2B Expert Ops | Vendor Due Diligence untuk UMKM Naik Kelas | vendor-due-diligence-umkm | bisnis | unisex | produktif | ✅ | Supplier checks, scoring matrix, contract risks, and replacement planning |
| 2.200 | Productized Advisory | Productized Consulting: Jual Jasa Ahli tanpa Mulai dari Agency Besar | productized-consulting-ahli | bisnis | unisex | produktif | ✅ | Convert expertise into fixed-scope diagnostic, report, and implementation packages |
| 2.201 | People & HR | First Hire Framework untuk Owner Bisnis | first-hire-framework | bisnis | unisex | produktif | ✅ | Decision framework for deciding when, who, and how to recruit the first employee |
| 2.202 | People & HR | Hire Tim Pertama Tanpa Membebani Cashflow | hire-tim-pertama | bisnis | unisex | produktif | ✅ | Practical hiring trigger, role selection, and salary-risk checklist for the first team member |
| 2.203 | Lean Automation | Kapan UMKM Harus Beli Mesin Packing Sendiri? | beli-mesin-packing-sendiri | bisnis | unisex | produktif | ✅ | Make-or-buy decision for packaging, payback, QC, operator cost, and hidden machine costs |
| 2.204 | Lean Automation | Mesin China Murah untuk UMKM: Cara Hitung Payback | mesin-china-umkm-payback | bisnis, keuangan | unisex | produktif | ✅ | Imported low-cost machine due diligence, landed cost, sparepart risk, downtime, and ROI model |
| 2.205 | Lean Automation | SOP Operator Mesin Semi Otomatis untuk Tim Kecil | sop-operator-mesin | bisnis | unisex | produktif | ✅ | Visual SOP, startup/shutdown checklist, safety, maintenance, and training for low-skill operators |
| 2.206 | Lean Workforce Legal | Magang dan Trainee Legal untuk Bisnis Kecil | magang-trainee-legal | hukum, bisnis | unisex | produktif | ✅ | Permenaker-based internship/trainee guardrails, curriculum, mentor, evaluation, and anti-exploitation boundaries |
| 2.207 | Lean Workforce Legal | PKWT, Freelance, Mitra, atau Karyawan Tetap? | pkwt-freelance-mitra-karyawan | hukum, bisnis | unisex | produktif | ✅ | Legal workforce model comparison for variable revenue businesses, with disguised employment risks |
| 2.208 | Lean Workforce Legal | Sistem Borongan Packing yang Adil dan Legal | borongan-packing-legal | hukum, bisnis | unisex | produktif | ✅ | Output-based packing work, QC rules, reject handling, payout model, and worker protection |
| 2.209 | SMK Talent System | Cara Bikin SOP Visual agar Staf Baru Cepat Bisa | sop-visual-staf-baru | bisnis | unisex | produktif | ✅ | Photo/video/checklist SOP to duplicate operator skill and shorten onboarding time |
| 2.210 | Lean Automation | Mesin Filling Minuman untuk UMKM | mesin-filling-minuman-umkm | bisnis | unisex | produktif | ✅ | Semi-auto filling machine, capacity, cleaning, reject rate, operator training, and payback |
| 2.211 | Lean Automation | Continuous Band Sealer untuk Produk Kemasan | continuous-band-sealer-umkm | bisnis | unisex | produktif | ✅ | Sealing speed, bag material, maintenance, electricity, packaging quality, and cost comparison |
| 2.212 | Lean Automation | Coding Tanggal Produksi dan Expired yang Rapi | coding-tanggal-produk-umkm | bisnis | unisex | produktif | ✅ | Date coding options, ink, label, batch traceability, compliance readiness, and SOP |
| 2.213 | Lean Automation | QC Murah untuk Produk Pangan Rumahan | qc-murah-produk-pangan | bisnis | unisex | produktif | ✅ | pH meter, thermometer, moisture check, batch record, sampling, and food safety boundaries |
| 2.214 | Lean Automation | Conveyor Meja untuk Produksi Kecil | conveyor-meja-produksi-kecil | bisnis | unisex | produktif | ✅ | Tabletop conveyor use case, bottleneck reduction, layout, operator rhythm, and ROI |
| 2.215 | Lean Automation | Jig dan Mold agar Produksi Tidak Bergantung pada Tukang Ahli | jig-mold-produksi-kecil | bisnis | unisex | produktif | ✅ | Fixtures, molds, templates, standard work, defect reduction, and training low-skill operators |
| 2.216 | Lean Automation | Maintenance Mesin Murah agar Tidak Cepat Rusak | maintenance-mesin-murah | bisnis | unisex | produktif | ✅ | Preventive maintenance, sparepart list, lubrication, cleaning schedule, and downtime log |
| 2.217 | Lean Automation | Checklist Import Mesin China untuk Owner UMKM | import-mesin-china-checklist | bisnis | unisex | produktif | ✅ | Supplier verification, landed cost, warranty, sparepart, customs, voltage, and safety checks |
| 2.218 | Lean Automation | Hitung Operator vs Mesin: Mana Lebih Murah? | hitung-operator-vs-mesin | keuangan, bisnis | unisex | produktif | ✅ | Labor cost, machine depreciation, output/hour, downtime, defect rate, and sensitivity analysis |
| 2.219 | Lean Automation | Outsource atau In-House Packing? | outsourcing-vs-inhouse-packing | bisnis | unisex | produktif | ✅ | Compare outsource packaging, in-house machines, MOQ, lead time, QC, and cashflow |
| 2.220 | Lean Workforce Legal | Skema Komisi Sales yang Legal dan Tidak Abu-abu | skema-komisi-sales-legal | hukum, bisnis | unisex | produktif | ✅ | Commission rules, closing definition, refund, payout timing, clawback, and written agreement |
| 2.221 | Lean Workforce Legal | Kontrak Mitra Teknisi Panggilan | kontrak-mitra-teknisi-panggilan | hukum, bisnis | unisex | produktif | ✅ | Technician partner model, job assignment, payout, quality control, liability, and disguised employment guardrail |
| 2.222 | Lean Workforce Legal | Sistem Agen dan Reseller tanpa Perang Harga | agen-reseller-tanpa-perang-harga | bisnis | unisex | produktif | ✅ | Channel rules, MAP-like pricing guardrail, territory, margin, content asset, and stock policy |
| 2.223 | Lean Workforce Legal | Pekerja Part-Time Shift untuk Cafe dan Retail | pekerja-part-time-shift-umkm | hukum, bisnis | unisex | produktif | ✅ | Shift planning, attendance, wages, overtime risk, documentation, and legal boundaries |
| 2.224 | Lean Workforce Legal | Outsourcing Fungsi Non-Core untuk UMKM | outsourcing-non-core-umkm | hukum, bisnis | unisex | produktif | ✅ | Cleaning, security, payroll, admin, CS, SLA, data protection, vendor legality, and cost control |
| 2.225 | SMK Talent System | Cross-Training Tim Kecil agar Tidak Bergantung pada Satu Orang | cross-training-tim-kecil | bisnis | unisex | produktif | ✅ | Backup roles, training rotation, skill matrix, incentive, burnout prevention, and continuity |
| 2.226 | SMK Talent System | Skill Matrix Operator untuk Bisnis Produksi | skill-matrix-operator | bisnis | unisex | produktif | ✅ | Map operator capability, training gap, certification internal, pay grade, and scheduling |
| 2.227 | SMK Talent System | Training Lulusan SMK Jadi Operator Produksi Andal | training-operator-produksi | bisnis | unisex | produktif | ✅ | Onboarding curriculum, buddy system, SOP visual, QC test, and first 30 days evaluation |
| 2.228 | Lean Workforce Legal | Admin Harian vs Karyawan Tetap: Mana yang Cocok? | admin-harian-vs-karyawan-tetap | hukum, bisnis | unisex | produktif | ✅ | Admin workload, legal relationship, documentation, cost, control level, and compliance risk |
| 2.229 | Lean Ops | Konsinyasi Stok agar Cashflow Tidak Terkunci | konsinyasi-stok-umkm | bisnis, keuangan | unisex | produktif | ✅ | Consignment terms, stock count, shrinkage, return, payout schedule, and supplier relationship |
| 2.230 | Lean Ops | Dual-Source Vendor agar Bisnis Tidak Disandera Supplier | dual-source-vendor-umkm | bisnis | unisex | produktif | ✅ | Backup supplier, vendor scoring, sample testing, switching cost, and procurement discipline |
| 2.231 | Lean Ops | Template SLA Vendor Kecil untuk Owner UMKM | template-sla-vendor-kecil | bisnis, hukum | unisex | produktif | ✅ | Service level agreement, penalty, escalation, reporting, quality standard, and renewal terms |
| 2.232 | Lean Automation | Audit K3 Mesin Kecil sebelum Terjadi Kecelakaan | audit-k3-mesin-kecil | hukum, bisnis | unisex | produktif | ✅ | Machine safety checklist, guards, electricity, operator PPE, incident log, and training |
| 2.233 | Lean Automation | Printer Label dan Barcode untuk Kontrol Stok | mesin-label-printer-barcode-umkm | bisnis | unisex | produktif | ✅ | SKU discipline, barcode printer, label design, stock movement, and staff training |
| 2.234 | Lean Workforce Legal | Piece Rate Legal: Bayar per Unit tanpa Eksploitasi | sistem-piece-rate-legal | hukum, bisnis | unisex | produktif | ✅ | Output-based pay, minimum fairness, QC, reject handling, documentation, and legal risk |
| 2.235 | Mindset & Scaling Psychology | Operator vs Owner: Kenapa Anda Harus Berhenti Kerja di Bisnis Sendiri | operator-vs-owner | bisnis | unisex | produktif | ✅ | Satu masalah: operator mentality. Fokus pada pergeseran dari mengerjakan ke mengelola |
| 2.236 | Mindset & Scaling Psychology | Lepaskan Kontrol: Kenapa Micromanagement Membunuh Bisnis | lepaskan-kontrol | bisnis | unisex | produktif | ✅ | Satu masalah: micromanagement. Fokus pada trust building dan delegation framework |
| 2.237 | Mindset & Scaling Psychology | Comfort Zone itu Mahal: Kenapa Stagnan Lebih Berbahaya dari Gagal | comfort-zone-mahal | bisnis | unisex | produktif | ✅ | Satu masalah: comfort zone. Fokus pada cost of inaction dan competitive threat |
| 2.238 | Mindset & Scaling Psychology | Lepaskan dengan Aman: Cara Delegasi Tanpa Takut Kualitas Turun | lepaskan-dengan-aman | bisnis | unisex | produktif | ✅ | Satu masalah: fear of letting go. Fokus pada SOP + QC system untuk delegasi aman |
| 2.239 | Mindset & Scaling Psychology | Sibuk Bukan Berarti Produktif: Kenapa Anda Harus Audit Waktu Anda | sibuk-bukan-produktif | bisnis | unisex | produktif | ✅ | Satu masalah: busy=productive. Fokus pada time audit dan high-value activities |
| 2.240 | Mindset & Scaling Psychology | Exit Ready: Kenapa Bisnis yang Tidak Bisa Dijual Itu Bukan Aset | exit-ready | bisnis | unisex | produktif | ✅ | Satu masalah: no exit thinking. Fokus pada valuasi bisnis dan exit strategy |
| 2.241 | Mindset & Scaling Psychology | Bisnis itu Aset, Bukan Pekerjaan: Cara Melihat Usaha dari Sudut Investor | bisnis-aset-bukan-pekerjaan | bisnis | unisex | produktif | ✅ | Satu masalah: income=job. Fokus pada asset thinking dan investor mindset |
| 2.242 | Mindset & Scaling Psychology | Berani Ambil Risiko yang Terukur: Kenapa Tidak Expand Itu Justru Rugi | berani-ambil-risiko | bisnis | unisex | produktif | ✅ | Satu masalah: risk aversion. Fokus pada calculated risk dan cost of inaction |
| 2.243 | Mindset & Scaling Psychology | Founder's Dilemma: Kenapa Bisnis Anda Tidak Bisa Scale Tanpa Anda | founders-dilemma | bisnis | unisex | produktif | ✅ | Satu masalah: founder's dilemma. Fokus pada self-imposed limitation dan solusi |
| 2.244 | Mindset & Scaling Psychology | Perfect is the Enemy: Kenapa Perfectionism Membunuh Bisnis | perfectionism-membunuh | bisnis | unisex | produktif | ✅ | Satu masalah: perfectionism. Fokus pada good enough vs perfect dan action bias |
| 2.245 | Mindset & Scaling Psychology | Financial Literacy Tingkat Lanjut: Apa yang Harus Dikuasai Pemilik Bisnis | financial-literacy-lanjut | keuangan | unisex | produktif | ✅ | Satu masalah: no financial literacy lanjut. Fokus pada valuasi, LTV, dan aset vs income. Complete research with 3 case studies, OJK SNLIK 2025 data (66.46%), valuation multiples, LTV/CAC benchmarks, asset vs income framework, income/asset thinking personas |
| 2.246 | Mindset & Scaling Psychology | Risiko Terbesar Itu Stagnan: Cara Reframe Fear of Expansion | risiko-terbesar-stagnan | bisnis | unisex | produktif | ✅ | Satu masalah: fear of bigger risk. Fokus pada reframe risiko dan inflasi |
| 2.247 | Mindset & Scaling Psychology | Aset sebagai Hedge: Kenapa Bisnis Harus Punya Lapisan Bawah | aset-sebagai-hedge | bisnis | unisex | produktif | ✅ | Satu masalah: tidak lihat aset sebagai hedge. Fokus pada value stacking dan bankability |
| 2.248 | Mindset & Scaling Psychology | Legacy Thinking: Kenapa Anda Harus Pikirkan Warisan Sekarang, Bukan Nanti | legacy-thinking | bisnis | unisex | produktif | ✅ | Satu masalah: no legacy thinking. Fokus pada succession planning dan estate basics |
| 2.249 | Mindset & Scaling Psychology | Siapa Saya Tanpa Bisnis?: Mengatasi Identity Crisis saat Delegate | siapa-saya-tanpa-bisnis | bisnis | unisex | produktif | ✅ | Satu masalah: identity crisis. Fokus pada identity di luar bisnis dan new role |

**Tier 2 Target**: 249 articles (249 complete, 0 ready to write, 0 research)

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
| 3.28 | Portfolio & Capital | Dividend Investing: Strategi Portofolio Lanjutan | dividen-investing-advanced | investasi | unisex | produktif | ✅ | Advanced dividend portfolio strategy (DRIP, yield optimization, dividend aristocrats); Differentiated from 2.10 (pemula basics) |
| 3.29 | Portfolio & Capital | Obligasi Korporasi & SBN Besar | obligasi-korporasi-besar | investasi | unisex | produktif | ✅ | Bond investing |
| 3.30 | Portfolio & Capital | Menjadi Angel Investor | angel-investor | investasi | unisex | produktif | ✅ | Angel investing |
| 3.31 | Portfolio & Capital | Diversifikasi Saham Global | diversifikasi-saham-global | investasi | unisex | produktif | ✅ | Global stocks |
| 3.32 | Portfolio & Capital | OPM: Hutang Baik vs Buruk | opm-hutang-baik | keuangan | unisex | produktif | ✅ | Debt strategy |
| 3.33 | Property Legal | Menyiasati Pajak Lewat Aset | pajak-lewat-aset | hukum | unisex | produktif | ✅ | Tax optimization |
| 3.34 | Governance & Exit | Exit Strategy Bisnis | exit-strategy-bisnis | bisnis | unisex | produktif | ✅ | Business exit |
| 3.35 | Portfolio & Capital | Mitigasi Risiko Multi-Aset | mitigasi-risiko | keuangan | unisex | produktif | ✅ | Risk management |
| 3.36 | Property Strategy | Pisah Aset Pribadi dan Bisnis Properti | pisah-aset-pribadi-bisnis | hukum | unisex | produktif | ✅ | Ring-fencing aset |
| 3.37 | Property Legal | Due Diligence Sertifikat dan Sengketa Tanah | due-diligence-sertifikat-tanah | hukum | unisex | produktif | ✅ | Cek legal tanah |
| 3.38 | Property Legal | PPJB, AJB, dan HGB yang Wajib Dicek | ppjb-ajb-hgb | hukum | unisex | produktif | ✅ | Dokumen transaksi |
| 3.39 | Property Strategy | Sewa Jangka Panjang vs Short Stay | sewa-jangka-panjang-short-stay | investasi | unisex | produktif | ✅ | Bandingkan yield |
| 3.40 | Property Strategy | Renovasi yang Naikkan Harga Jual Properti | renovasi-naikkan-harga-jual | investasi | unisex | produktif | ✅ | Fokus value-add |
| 3.41 | Franchise Ops | Cek Kontrak Franchise Sebelum Tanda Tangan | cek-kontrak-franchise | hukum | unisex | produktif | ✅ | Red flag kontrak |
| 3.42 | Franchise Ops | Lokasi Franchise: Cara Pilih Titik yang Tepat | lokasi-franchise-tepat | bisnis | unisex | pensiun | ✅ | Site selection |
| 3.43 | Property Strategy | Skema Joint Venture Properti Keluarga | joint-venture-properti | bisnis | unisex | produktif | ✅ | Bagi hasil aman |
| 3.44 | Governance & Exit | Buy-Sell Agreement untuk Bisnis Keluarga | buy-sell-agreement-bisnis-keluarga | hukum | unisex | pensiun | ✅ | Aturan keluar-masuk |
| 3.45 | Governance & Exit | Suksesi Aset ke Anak Dewasa tanpa Konflik | suksesi-aset-ke-anak | hukum | unisex | pensiun | ✅ | Transfer aset langsung ke anak dewasa, komunikasi keluarga, pajak, dan dokumen pendukung |
| 3.46 | Property Strategy | Proteksi Aset dengan Holding dan Asuransi | proteksi-aset-holding-asuransi | hukum | unisex | produktif | ✅ | Shield tingkat lanjut |
| 3.47 | Property Legal | Pajak BPHTB, PPh, dan Biaya Akta Properti | pajak-bphtb-pph-properti | hukum | unisex | produktif | ✅ | Biaya transaksi |
| 3.48 | Property Strategy | Investasi Properti di Bawah Biaya Pasar (Under Value) | investasi-properti-undervalue | investasi | unisex | produktif | ✅ | Undervalued property hunting |
| 3.49 | Franchise Ops | Audit Kinerja Franchise Bulanan | audit-kinerja-franchise | bisnis | unisex | produktif | ✅ | Monthly franchise performance review |
| 3.50 | Portfolio & Capital | Investasi Saham Syariah Indonesia | saham-syariah-indonesia | investasi | unisex | produktif | ✅ | Sharia-compliant stock guide |
| 3.51 | Governance & Exit | Valuasi Bisnis metode DCF & Aset | valuasi-bisnis-dcf | bisnis | unisex | pensiun | ✅ | Business valuation methods |
| 3.52 | Property Legal | Sengketa Batas Tanah Antar Tetangga | sengketa-batas-tanah | hukum | unisex | produktif | ✅ | Boundary dispute resolution |
| 3.53 | Property Strategy | Konversi Rumah Jadi Kos-Kosan atau Komersial | konversi-rumah-kos-komersial | investasi | unisex | produktif | ✅ | Residential conversion guide, permits PBG/NIB/SPPL, ROI 93% calculation, 1772 words, backdated 2025-06-16 |
| 3.54 | Portfolio & Capital | Investasi Sukuk Ritel & Korporasi | investasi-sukuk-ritel | investasi | unisex | produktif | ✅ | Retail & corporate sukuk guide |
| 3.55 | Governance & Exit | Pembagian Warisan Sesuai Hukum Keluarga | pembagian-warisan-hukum-keluarga | hukum | unisex | pensiun | ✅ | Inheritance law compliance |
| 3.56 | Franchise Ops | Franchise Makanan Cepat Saji: Pros & Cons | franchise-makanan-cepat-saji | bisnis | unisex | produktif | ✅ | Fast food franchise analysis |
| 3.57 | Property Strategy | Investasi Properti di Kawasan Industri | investasi-properti-kawasan-industri | investasi | unisex | produktif | ✅ | Industrial property investment guide for Tier3 Asset Builders, 2251 words, Syamsul Alam voice, ROI calculations, case studies, legal aspects (HGB, IUKI), location strategies, Duit.co.id ecosystem integration |
| 3.58 | Alternative Investments | Dasar-dasar Private Equity | private-equity | investasi | unisex | produktif | ✅ | Private equity guide, PE vs VC comparison, LBO strategies, Indonesian market data, case studies, risk analysis, and action steps |
| 3.59 | Alternative Investments | Dasar-dasar Venture Capital | venture-capital | investasi | unisex | produktif | ✅ | VC investing guide |
| 3.60 | Alternative Investments | Reksa Dana Lindung Nilai (Hedge Fund) | hedge-fund | investasi | unisex | produktif | ✅ | Hedge funds explained |
| 3.61 | Alternative Investments | Investasi Kripto untuk UHNW | kripto-uhnw | investasi | unisex | produktif | ✅ | Crypto for wealthy |
| 3.62 | Alternative Investments | NFT & Aset Digital: Investasi atau Jebakan? | nft-aset-digital | investasi | unisex | produktif | ✅ | NFT investment analysis, 2094 words, Syamsul Alam voice, OJK/Bappebti regulations, case study (Budi Rp 1.92B loss), comparison table (NFT vs stocks vs property), safe strategies 1-2% allocation, Duit.co.id ecosystem integration |
| 3.63 | ESG & Impact | Investasi ESG Indonesia | esg-investing | investasi | unisex | produktif | ✅ | Environmental, Social, Governance |
| 3.64 | ESG & Impact | Investasi Dampak Sosial (Impact Investing) | impact-investing | investasi | unisex | produktif | ✅ | Social impact strategies |
| 3.65 | Advanced Property | Penyusutan Properti untuk Pajak | penyusutan-properti-pajak | keuangan | unisex | produktif | ✅ | Property tax depreciation guide for Tier3 Asset Builders, 2000+ words, Syamsul Alam voice, UU PPh Pasal 11A compliance, metode garis lurus vs saldo menurun, calculation examples (Rp 2M ruko, Rp 350M apartemen), tax savings Rp 26.5M/year, case studies (Budi, Ibu Sari), common mistakes, 5 action steps, Duit.co.id ecosystem integration, backdated 2025-04-23 |
| 3.66 | Advanced Property | Sindikasi Properti Indonesia: Cara Investasi Properti Tanpa Modal Besar | sindikasi-properti | investasi | unisex | produktif | ✅ | Real estate syndication complete guide for Tier 3 Asset Builders, 2300+ words, Syamsul Alam voice, legal structure (PT vs CV), case study (Ruko Margonda Rp 4.5B, 10 investors, 12% ROI), risk mitigation, platform recommendations (LandX, Crowdo), Duit.co.id ecosystem integration |
| 3.67 | Sharia Wealth | Manajemen Kekayaan Syariah | kekayaan-syariah | investasi | unisex | produktif | ✅ | Sharia wealth management |
| 3.68 | Property + Business | Strategi Kombinasi Properti Komersial dengan Waralaba Retail Alfamart/Indomaret | strategi-properti-komersial-waralaba-retail-alfamart-indomaret | bisnis | unisex | produktif | ✅ | Panduan integrasi aset properti dengan waralaba retail nasional |
| 3.69 | Property + Business | Investasi Properti Gym dan Studio Yoga: Analisis ROI dan Model Pasif untuk Pensiunan | investasi-properti-gym-studio-yoga | investasi | unisex | produktif | ✅ | MERGED: ROI analysis untuk properti gym+yoga premium DAN model passive income untuk pensiunan. Cover both active ROI calculation and retirement-focused passive model |
| 3.70 | Property Hybrid | Model Bisnis Properti Kos-Kosan Gabungan Co-Living untuk Pekerja Migran | model-bisnis-properti-kos-kosan-gabungan-co-living-pekerja-migran | bisnis | unisex | produktif | ✅ | Strategi properti hunian dengan layanan co-living |
| 3.71 | Property + Business | Panduan Investasi Properti Komersial untuk Food Court dan Cafe Premium | panduan-investasi-properti-komersial-food-court-cafe-premium | investasi | unisex | produktif | ✅ | Location analysis (3-5km rule, visibility index, competition gap), 3 profit sharing models (hybrid, pure, turnkey), case study (Budi SCBD Rp 6.2B, ROI 135% realistic), legal aspects (PKS, NIB, tax), Duit.co.id ecosystem integration, 2000+ words |
| 3.72 | Property Hybrid | Strategi Properti Gudang Modern Gabungan Layanan Logistik Last-Mile | strategi-properti-gudang-modern | bisnis | unisex | produktif | ✅ | Kombinasi aset gudang dengan jasa logistik e-commerce |
| 3.73 | Property + Business | Investasi Properti Kantor Gabungan Co-Working Space untuk Startup | investasi-properti-kantor-gabungan-co-working-space-startup | investasi | unisex | produktif | ✅ | Monetisasi aset properti kantor |
| 3.74 | Property Hybrid | Cara Pasang Panel Surya di Atap Properti Komersial: Hitung Penghematan Energi | cara-pasang-panel-surya-atap-properti-komersial-hitung-penghematan-energi | investasi | unisex | produktif | ✅ | Solar panel installation guide for commercial properties, 1963 words, Syamsul Alam voice, ROI calculations (10.08% per tahun), case study (Budi Rp 450M, Rp 64.2M/year savings), 5-step installation, tax incentives (Permenkeu 130/2020), Net Metering PLN, Duit.co.id ecosystem integration |
| 3.75 | Property + Business | Model Bisnis Properti Komersial dengan Stasiun Pengisian EV Berbayar | model-bisnis-properti-komersial-stasiun-pengisian-ev-berbayar | bisnis | unisex | produktif | ✅ | Integrasi lahan parkir properti dengan SPKLU |
| 3.76 | Property Hybrid | Investasi Properti Gabungan Klinik Pratama dan Rumah Sakit Spesialis | investasi-properti-gabungan-klinik-pratama-rumah-sakit-spesialis | investasi | unisex | produktif | ✅ | Panduan kombinasi aset properti dengan layanan kesehatan |
| 3.77 | Property + Business | Strategi Properti Komersial untuk Pusat Kursus dan Sekolah Vokasi Karyawan | strategi-properti-komersial-pusat-kursus-sekolah-vokasi-karyawan | bisnis | unisex | produktif | ✅ | Monetisasi properti dengan menyewakan ruang ke lembaga pendidikan |
| 3.78 | Property Hybrid | Aspek Hukum Kombinasi Properti Waralaba Retail: Izin Usaha dan Pajak | aspek-hukum-kombinasi-properti-waralaba-retail-izin-usaha-pajak | hukum | unisex | produktif | ✅ | Review regulasi perizinan |
| 3.79 | Property Hybrid | Strategi Properti Hotel Bintang 3 Gabungan Layanan Co-Living Digital | strategi-properti-hotel-bintang-3-gabungan-layanan-co-living-digital | bisnis | unisex | produktif | ✅ | Integrasi properti hotel dengan platform co-living digital |
| 3.80 | Property + Business | Properti Industri dengan Panel Surya Atap: Subsidi Pemerintah dan ROI 10 Tahun | properti-industri-panel-surya-atap-subsidi-pemerintah-roi-10-tahun | investasi | unisex | produktif | ✅ | Analisis investasi properti industri besar dengan energi terbarukan |
| 3.81 | Property Hybrid | Properti Apartemen Gabungan Stasiun Pengisian EV Eksklusif untuk Penghuni | properti-apartemen-gabungan-stasiun-pengisian-ev-eksklusif-penghuni | investasi | unisex | produktif | ✅ | Exclusive EV charging station guide for apartment investors, ROI calculations (1.9-4.8 years), 3 charging levels (Level 1/2/3), case study (Budi Greensuit 15 months ROI), legal compliance (PLN permit, SNI IEC 61851, insurance), Duit.co.id ecosystem integration, 1615 words, backdated 2026-01-06 |
| 3.82 | Governance & Exit | Suksesi Aset Keluarga Lintas Generasi | suksesi-aset-keluarga | hukum | unisex | pensiun | ✅ | Family-wide succession planning across heirs, governance, ownership rules, and conflict prevention |
| 3.83 | Property Strategy | Properti Komersial untuk Sport (Gym, Studio Yoga) | properti-komersial-sport | investasi | unisex | produktif | ✅ | ROI analysis for gym/yoga premium properties |
| 3.84 | Boutique Advisory Firm | Membeli Praktik Jasa Profesional Kecil | akuisisi-praktik-profesional | bisnis | unisex | produktif | ✅ | Acquire small accounting, design, legal admin, or consulting practices for cashflow |
| 3.85 | Boutique Advisory Firm | Membangun Boutique Advisory Firm dari Keahlian Kampus | boutique-advisory-firm | bisnis | unisex | produktif | ✅ | Upgrade solo expert services into a small specialist advisory firm |
| 3.86 | Expert Capital | Partner Model untuk Konsultan Independen | partner-model-konsultan | bisnis | unisex | produktif | ✅ | Partnership, revenue share, client ownership, and quality control for expert networks |
| 3.87 | Expert Capital | Licensing Template dan SOP Konsultan | licensing-template-sop-konsultan | bisnis | unisex | produktif | ✅ | Turn methods, templates, and SOPs into licensed products or training |
| 3.88 | Expert Capital | Expert Network untuk Investor dan Owner Bisnis | expert-network-investor | bisnis | unisex | produktif | ✅ | Build paid access to vetted experts for due diligence and operating decisions |
| 3.89 | Boutique Advisory Firm | Retainer Advisory untuk Bisnis Menengah | retainer-advisory-bisnis-menengah | bisnis | unisex | produktif | ✅ | Monthly advisory model for SMEs that need expertise but not full-time executives |
| 3.90 | Property Strategy | Pisah Aset Pribadi dan Bisnis Properti Lanjutan | pisah-aset-pribadi-bisnis-properti | hukum | unisex | produktif | ✅ | Property-specific entity separation, tax exposure, and lawsuit risk containment |
| 3.91 | Property + Business | Properti Kantor sebagai Aset Produktif | properti-kantor | investasi | unisex | produktif | ✅ | Office property ROI, rent model, occupancy risk, and co-working monetization angle |
| 3.92 | Property Strategy | Renovasi Properti yang Benar-Benar Naikkan Harga Jual | renovasi-naikkan-harga-jual-properti | investasi | unisex | produktif | ✅ | Value-add renovation choices with ROI calculation and contractor risk controls |
| 3.93 | Lean Expansion | Revenue Share Operator untuk Cabang Baru | revenue-share-operator-cabang | bisnis | unisex | produktif | ✅ | Expand with operator partners, revenue split, audit controls, capex/opex ownership, and moral hazard guardrails |
| 3.94 | Lean Manufacturing | Micro Factory: Pabrik Kecil yang Selalu Profit | micro-factory-profit | bisnis | unisex | produktif | ✅ | Semi-automatic machines, SOP, QC, capacity planning, demand validation, and lean profit discipline |
| 3.95 | Alternative Asset Protection | Jam Mewah sebagai Aset Alternatif | jam-mewah-aset-alternatif | investasi | unisex | produktif | ✅ | Luxury watch liquidity, brand risk, authentication, storage, insurance, tax, and exit spread |
| 3.96 | Alternative Asset Protection | Mobil Sport Collectible: Aset atau Beban? | mobil-sport-collectible | investasi | unisex | produktif | ✅ | Collectible car economics, depreciation, maintenance, tax, insurance, scarcity, and resale liquidity |
| 3.97 | Workshop Roll-Up | Roll-Up Bengkel Kecil: Beli Kapasitas, Bukan Mulai dari Nol | workshop-rollup-bengkel-kecil | bisnis | unisex | produktif | ✅ | Acquire small workshops, retain technicians, standardize service, centralize procurement, and control quality |
| 3.98 | Workshop Roll-Up | Akuisisi Workshop Jahit untuk Brand Fashion Kecil | akuisisi-workshop-jahit | bisnis | unisex | produktif | ✅ | Buy or partner with sewing workshop, capacity audit, operator retention, QC, and order pipeline |
| 3.99 | Lean Manufacturing | Contract Manufacturing untuk Merek Kecil | contract-manufacturing-merek-kecil | bisnis | unisex | produktif | ✅ | Monetize idle machines, production agreement, MOQ, QC, formula/IP ownership, and payment terms |
| 3.100 | Lean Manufacturing | Packing House sebagai Bisnis B2B | packing-house-bisnis | bisnis | unisex | produktif | ✅ | Build packaging service business, machines, labor model, QC, pricing per unit, and client risk |
| 3.101 | Productive Assets | Cold Storage Mini sebagai Investasi Produktif | cold-storage-mini-investasi | investasi, bisnis | unisex | produktif | ✅ | Small cold storage economics, tenant demand, electricity, maintenance, insurance, and payback |
| 3.102 | Productive Assets | Leasing Mesin Produksi untuk UMKM | leasing-mesin-produksi-umkm | investasi, bisnis | unisex | produktif | ✅ | Own machines rented to operators, collateral, maintenance, revenue share, and default risk |
| 3.103 | Asset-Light Expansion | Franchise-Lite: Lisensi SOP tanpa Buka Cabang Sendiri | franchise-lite-sop-lisensi | bisnis, hukum | unisex | produktif | ✅ | License operating system, brand control, training, audit, royalty, and franchise-law guardrails |
| 3.104 | Asset-Light Expansion | Partner Outlet Asset-Light untuk Ekspansi Lokal | partner-outlet-asset-light | bisnis | unisex | produktif | ✅ | Expand through partner-operated locations, capex split, revenue share, audit, and termination clauses |
| 3.105 | Alternative Asset Protection | Seni Lokal sebagai Aset Alternatif | art-lokal-aset-alternatif | investasi | unisex | produktif | ✅ | Local art acquisition, provenance, artist risk, storage, insurance, appraisal, and resale market |
| 3.106 | Alternative Asset Protection | Tas Mewah sebagai Aset: Realita vs Gengsi | tas-mewah-aset-alternatif | investasi | unisex | produktif | ✅ | Luxury bag resale, authentication, condition, brand concentration, storage, and exit spread |
| 3.107 | Alternative Asset Protection | Emas Premium vs Jam Mewah: Mana Lebih Liquid? | emas-premium-vs-jam-mewah | investasi | unisex | produktif | ✅ | Compare physical gold, jewelry, luxury watches, liquidity, spread, storage, tax, and portability |
| 3.108 | Workshop Roll-Up | Holding Workshop Produksi Kecil | holding-workshop-produksi-kecil | bisnis, hukum | unisex | produktif | ✅ | Group small production workshops under one holding, shared procurement, finance control, and succession |
| 3.109 | Business-as-Investment | Glamping sebagai Investasi: Tanah + Bisnis = Pinjaman Lebih Besar | glamping-investasi | investasi, bisnis | unisex | produktif | ✅ | LTV tanah vs tanah+bisnis glamping, ROI analysis, lokasi strategis, studi kasus perhitungan modal dan cicilan bank |
| 3.110 | Business-as-Investment | Wisata Petik Buah: Kebun yang Bayar Sendiri | wisata-petik-buah | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis kebun wisata petik, varietas tanaman, musim, pricing tiket, tanah sebagai hedge utama |
| 3.111 | Business-as-Investment | Villa Kecil di Kota Wisata: Investasi Aset + Cashflow | villa-kota-wisata | investasi | unisex | produktif | ✅ | Cara pilih lokasi villa, hitung occupancy, bandingkan return properti vs properti+bisnis, exit strategy |
| 3.112 | Business-as-Investment | Kolam Renang Mini + Café: Bisnis yang Jaminannya Tetap Bernilai | kolam-renang-mini | investasi, bisnis | unisex | produktif | ✅ | Analisis biaya bangun kolam renang, pricing membership, LTV kolam renang vs tanah kosong |
| 3.113 | Business-as-Investment | Bengkel Mobil Listrik: Investasi Masa Depan | bengkel-ev | investasi, bisnis | unisex | produktif | ✅ | Peluang EV di Indonesia, biaya setup, equipment bernilai, tanah+bengkel sebagai pinjaman bank |
| 3.114 | Business-as-Investment | Camping Ground: Tanah Luas yang Menghasilkan | camping-ground | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis camping/outbound, infrastruktur ringan, repeat visitors, tanah sebagai hedge |
| 3.115 | Business-as-Investment | Kebun Kopi + Coffee Shop: Bisnis yang Tanahnya Makin Mahal | kebun-kopi-investasi | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis kopi specialty, kebun sebagai hedge, coffee shop sebagai showroom, ekspor |
| 3.116 | Business-as-Investment | Klinik Kecantikan sebagai Investasi Aset | klinik-kecantikan-investasi | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis klinik kecantikan, equipment bernilai tinggi, recurring revenue, aset sebagai jaminan |
| 3.117 | Business-as-Investment | Water Park Mini: Wahana Air yang Jaminannya Tetap Bernilai | water-park-mini | investasi, bisnis | unisex | produktif | ✅ | Tanah + wahana air + bangunan; wisata keluarga selalu dicari; tanah sebagai hedge utama |
| 3.118 | Business-as-Investment | Taman Bunga + Wedding Venue: Estetika yang Menghasilkan | taman-bunga-wedding | investasi, bisnis | unisex | produktif | ✅ | Tanah + taman + gazebo; wedding venue selalu ada demand; tanah apresiasi tinggi di lokasi strategis |
| 3.119 | Business-as-Investment | Workshop Mebel Niche: Pabrik Kecil dengan Margin Besar | mebel-niche | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis mebel custom, workshop sebagai aset, aset mesin, kontrak B2B restoran/café |
| 3.120 | Business-as-Investment | Mini Zoo: Satwa yang Menghasilkan dari Tiket dan Tanah | mini-zoo | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis mini zoo, hewan sebagai aset, tiket masuk, edukasi, tanah sebagai hedge utama |
| 3.121 | Business-as-Investment | Restoran Seafood + Kolam Ikan: Bisnis yang Ikan tetap Bernilai | restoran-seafood-tambak | investasi, bisnis | unisex | produktif | ✅ | Double income dari restoran + jual ikan; freshness jadi diferensiasi; tanah tambak sebagai hedge |
| 3.122 | Business-as-Investment | Lapangan Futsal Indoor: Olahraga yang Asetnya Naik | futsal-investasi | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis futsal/basket indoor, booking rutin komunitas, aset bangunan dan tanah |
| 3.123 | Business-as-Investment | Klinik Gigi Mini: Alat Mahal yang Jaminan Bank Besar | klinik-gigi-investasi | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis klinik gigi, equipment dental bernilai tinggi, recurring revenue, aset sebagai collateral |
| 3.124 | Business-as-Investment | Cuci Mobil Premium + Café: Service yang Jaminannya Tetap | cuci-mobil-premium | investasi, bisnis | unisex | produktif | ✅ | Analisis bisnis cuci mobil premium, café sebagai waiting area, tanah+bangunan sebagai hedge |
| 3.125 | Business-as-Investment | Villa Tepi Sungai + Water Activities: Aset Alam yang Produktif | villa-sungai | investasi, bisnis | unisex | produktif | ✅ | Villa tepi sungai, aktivitas air (tubing, arung jeram), tanah tepi sungai sebagai hedge |
| 3.126 | Business-as-Investment | Kebun Bunga + Wisata Self-Photo: Instagramable yang Menghasilkan | kebun-bunga-wisata | investasi, bisnis | unisex | produktif | ✅ | Wisata self-photo viral, tanah sebagai hedge, diversifikasi tanaman musiman |
| 3.127 | Business-as-Investment | Pantai Privat + Resort Kecil: Aset Premium yang Produktif | pantai-resort | investasi, bisnis | unisex | produktif | ✅ | Boutique resort di pantai, tanah pantai apresiasi tinggi, aktivitas laut sebagai revenue tambahan |
| 3.128 | Business-as-Investment | Farm Stay + Agrowisata: Kebun yang Menginapkan Tamu | farm-stay | investasi, bisnis | unisex | produktif | ✅ | Kombinasi pertanian + penginapan, dual income dari hasil panen + menginap, tanah produktif sebagai hedge |
| 3.129 | Business-as-Investment | Pusat Fisioterapi + Rehabilitasi: Klinik yang Asetnya Naik | fisioterapi-investasi | investasi, bisnis | unisex | produktif | ✅ | Tanah + bangunan + alat rehabilitasi; demand dari demam olahraga; aset alat bernilai tinggi |
| 3.130 | Business-as-Investment | Outdoor Adventure Park: Tanah yang Aktivitasnya Menghasilkan | adventure-park | investasi, bisnis | unisex | produktif | ✅ | Arung jeram, tubing, rappelling, zip line; tanah luas sebagai hedge; wisata petualangan booming |
| 3.131 | Business-as-Investment | Niche Hotel: Capsule, Heritage, atau Themed yang Bank Suka | niche-hotel | investasi, bisnis | unisex | produktif | ✅ | Hotel niche tidak head-to-head dengan chain besar; bangunan bernilai; occupancy stabil di lokasi tepat |
| 3.132 | Business-as-Investment | Kos Eksekutif untuk Dokter dan Profesional | kos-eksekutif-dokter | investasi | unisex | produktif | ✅ | Kos premium dekat RS/r Sentra Bisnis; tenant high-value; occupancy stabil; tanah+bangunan sebagai hedge |
| 3.133 | Business-as-Investment | Kos Eksekutif untuk Ekspat Digital | kos-eksekutif-ekspat | investasi | unisex | produktif | ✅ | Kos premium untuk digital nomad dan ekspat; WiFi kencang; co-living angle; tanah di lokasi strategis |
| 3.134 | Business-as-Investment | Lapangan Padel: Olahraga Niche yang Booming | padel-investasi | investasi, bisnis | unisex | produktif | ✅ | Padel booming di Indonesia; booking komunitas rutin; tanah+bangunan arena sebagai hedge |
| 3.135 | Business-as-Investment | Lapangan Badminton Indoor: Olahraga Nasional | badminton-investasi | investasi, bisnis | unisex | produktif | ✅ | Badminton olahraga #1 Indonesia; booking tinggi; tanah+bangunan lapangan sebagai hedge |
| 3.136 | Business-as-Investment | Lapangan Tenis Meja + Cafe Komunitas | tenis-meja-investasi | investasi, bisnis | unisex | produktif | ✅ | Tenis meja modal lebih ringan dari futsal; komunitas kuat; cafe sebagai revenue tambahan |
| 3.137 | Business-as-Investment | Bengkel Spesialis AC & Chiller Komersial | bengkel-chiller | investasi, bisnis | unisex | produktif | ✅ | AC komersial/chiller modal besar; kontrak maintenance rutin; tanah+bengkel sebagai hedge |
| 3.138 | Business-as-Investment | Bengkel Spesialis Kelistrikan & Panel Surya | bengkel-panel-surya | investasi, bisnis | unisex | produktif | ✅ | Panel surya booming; instalasi+maintenance rutin; equipment bernilai; tanah+bengkel sebagai hedge |
| 3.139 | Business-as-Investment | Bengkel Spesialis Kolam Renang & Water Treatment | bengkel-kolam-renang | investasi, bisnis | unisex | produktif | ✅ | Maintenance kolam renang komersial; kontrak rutin; equipment khusus bernilai; tanah+bengkel |
| 3.140 | Business-as-Investment | Co-Working Space Niche: Creative, Tech, atau Health | coworking-niche | investasi, bisnis | unisex | produktif | ✅ | Co-working spesialis (design studio, health practitioners, tech startup) lebih sustainable dari generic |
| 3.141 | Business-as-Investment | Sanggar Seni + Gallery + Art Cafe | sanggar-seni-investasi | investasi, bisnis | unisex | produktif | ✅ | Tanah+bangunan; sanggar sebagai recurring revenue; gallery sebagai event venue; seni makin dihargai |
| 3.142 | Business-as-Investment | Indoor Playground + Kids Activity Center | indoor-playground | investasi, bisnis | unisex | produktif | ✅ | Anak-anak selalu ada; birthday party venue; edutainment; tanah+bangunan sebagai hedge |
| 3.143 | Business-as-Investment | Yoga Retreat Center: Wellness yang Produktif | yoga-retreat | investasi, bisnis | unisex | produktif | ✅ | Wellness tourism booming; retreat korporat; tanah+bangunan sebagai hedge; villa kecil sebagai akomodasi |
| 3.144 | Business-as-Investment | Workshop Keramik/Artisan + Kiln | workshop-keramik | investasi, bisnis | unisex | produktif | ✅ | Keramik artisan booming; workshop bisa jadi showroom+kelas; kiln sebagai aset bernilai |
| 3.145 | Business-as-Investment | Mini Brewery + Tasting Room | mini-brewery | investasi, bisnis | unisex | produktif | ✅ | Craft beverage booming; equipment bernilai; tasting room sebagai atraksi wisata |
| 3.146 | Business-as-Investment | Pabrik Gula Aren/Kelapa Mini + Toko | gula-aren-mini | investasi, bisnis | unisex | produktif | ✅ | Gula aren premium makin dicari; pabrik mini bisa jadi showroom turis; tanah kebun sebagai hedge |
| 3.147 | Business-as-Investment | Kebun Teh + Tea House + Workshop | kebun-teh-investasi | investasi, bisnis | unisex | produktif | ✅ | Teh premium Indonesia makin diakui; kebun teh indah; tea house sebagai revenue tambahan |
| 3.148 | Business-as-Investment | Showroom Mobil Bekas Premium + Detailing | showroom-mobil-bekas | investasi, bisnis | unisex | produktif | ✅ | Mobil bekas premium margin tinggi; showroom juga jadi aset; mobil sendiri bisa dijaminkan |
| 3.149 | Business-as-Investment | Charging Station EV + Minimarket | charging-ev-minimarket | investasi, bisnis | unisex | produktif | ✅ | EV booming; charging station langka; minimarket sebagai waiting area; tanah+bangunan sebagai hedge |
| 3.150 | Business-as-Investment | Kandang + Jual Hewan Peliharaan + Grooming | pet-shop-grooming | investasi, bisnis | unisex | produktif | ✅ | Pet economy booming; grooming recurring; boarding revenue; tanah+kandang sebagai hedge |
| 3.151 | Business-as-Investment | Area Berkuda + Edukasi Anak | berkuda-edukasi | investasi, bisnis | unisex | produktif | ✅ | Berkuda populer untuk anak; aset kuda bernilai; tanah luas sebagai hedge; edutainment angle |
| 3.152 | Business-as-Investment | Hutan Pinus + Cafe + Glamping Hutan | hutan-cafe-glamping | investasi, bisnis | unisex | produktif | ✅ | Cafe di hutan sangat Instagramable; glamping hutan unik; tanah sebagai hedge |
| 3.153 | Mindset & Legacy Psychology | Kumpul Terus tanpa Tujuan: Kenapa Mengumpul Aset Tanpa Strategi Itu Sia-Sia | akumulasi-tanpa-tujuan | bisnis | unisex | produktif | ✅ | Satu masalah: accumulation mindset. Fokus pada tujuan jelas setiap investasi |
| 3.154 | Mindset & Legacy Psychology | Hoarding vs Investing: Kenapa Lebih Banyak Tidak Selalu Lebih Baik | hoarding-vs-investing | investasi | unisex | produktif | ✅ | Satu masalah: hoarding. Fokus pada optimalisasi portofolio dan quality over quantity |
| 3.155 | Mindset & Legacy Psychology | Bukan Hanya Saya: Kenapa Keputusan Bisnis Tidak Harus Sentralisasi | bukan-hanya-saya | bisnis | unisex | produktif | ✅ | Satu masalah: individual-centric. Fokus pada distributed decision making |
| 3.156 | Mindset & Legacy Psychology | Siapa yang Meneruskan?: Kenapa Succession Planning Harus Dimulai Sekarang | siapa-yang-meneruskan | bisnis | unisex | produktif | ✅ | Satu masalah: no succession planning. Fokus pada urgency dan cara memulai |
| 3.157 | Mindset & Legacy Psychology | Kekayaan dengan Dampak: Kenapa Mengumpul Saja Tidak Cukup | kekayaan-dengan-dampak | keuangan | unisex | produktif | ✅ | Satu masalah: no impact thinking. Fokus pada philanthropy dan purpose-driven wealth. Research complete — see kekayaan-dengan-dampak-research.md. Sibling article: filantropi-sebagai-strategi (3.165) |
| 3.158 | Mindset & Legacy Psychology | Kekayaan yang Lenyap: Kenapa 90% Kekayaan Hilang dalam 3 Generasi | kekayaan-lenyap-3-generasi | keuangan | unisex | produktif | ✅ | Satu masalah: legacy blindness. Fokus pada statistik dan cara mencegahnya. Research complete — see kekayaan-lenyap-3-generasi-research.md |
| 3.159 | Mindset & Legacy Psychology | Percaya tapi Verifikasi: Cara Trust Orang Lain Tanpa Rugi Besar | percaya-tapi-verifikasi | bisnis | unisex | produktif | ✅ | Satu masalah: trust issues. Fokus pada trust building dengan safeguard. Research complete — see percaya-tapi-verifikasi-research.md |
| 3.160 | Mindset & Legacy Psychology | Gengsi vs Return: Kenapa Beli Aset untuk Status Itu Jebakan | gengsi-vs-return | investasi | unisex | produktif | ✅ | Satu masalah: status-driven. Fokus pada ROI thinking dan real value. Research complete — see gengsi-vs-return-research.md |
| 3.161 | Mindset & Legacy Psychology | Governance untuk Bisnis Keluarga: Kenapa Anda Butuh Dewan Ahli | governance-bisnis-keluarga | bisnis | unisex | produktif | ✅ | Satu masalah: no governance. Fokus pada investment committee dan family constitution. Research complete — see governance-bisnis-keluarga-research.md |
| 3.162 | Mindset & Legacy Psychology | Profesional Management: Kenapa Feeling Harus Digantikan Data | profesional-management | bisnis | unisex | produktif | ✅ | Satu masalah: no professional management. Fokus pada hire CFO/GC dan data-driven decisions |
| 3.163 | Mindset & Legacy Psychology | Lepaskan Kontrol Aset: Cara Trust Orang Lain Kelola Investasi Anda | lepaskan-kontrol-aset | bisnis | unisex | produktif | ✅ | Satu masalah: fear of letting go of control. Fokus pada trust framework dan monitoring. Research complete — see lepaskan-kontrol-aset-research.md |
| 3.164 | Mindset & Legacy Psychology | Estate Planning untuk Semua: Kenapa Aset Harus Terstruktur Saat Anda Masih Hidup | estate-planning-untuk-semua | hukum | unisex | produktif | ✅ | Satu masalah: no estate planning. Fokus pada basic estate planning dan urgency. Research complete — see estate-planning-untuk-semua-research.md |
| 3.165 | Mindset & Legacy Psychology | Filantropi sebagai Strategi: Dampak Sosial yang Juga Menguntungkan | filantropi-sebagai-strategi | keuangan | unisex | produktif | ✅ | Satu masalah: no philanthropy/impact. Fokus pada strategic philanthropy. Research complete — see filantropi-sebagai-strategi-research.md. Sibling article: kekayaan-dengan-dampak (3.157) — this = HOW/legal/tax, sibling = WHY/mindset. |
| 3.166 | Mindset & Legacy Psychology | Lifestyle Inflation: Kenapa Pengeluaran Naik Seiring Kekayaan Itu Bahaya | lifestyle-inflation | keuangan | unisex | produktif | ✅ | Satu masalah: lifestyle inflation. Fokus pada disiplin cash flow dan wealth preservation |

**Tier 3 Target**: 166 articles (166 complete, 0 ready to write, 0 research)

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
| 4.16 | Family Office Ops | SOP Family Office: Reporting, Meeting, dan Dashboard | sop-family-office | bisnis | unisex | pensiun | ✅ | Operasi harian |
| 4.17 | Governance | Investment Policy Statement untuk Keluarga | investment-policy-statement | investasi | unisex | pensiun | ✅ | Aturan investasi |
| 4.18 | Governance | Family Constitution: Aturan Main Keluarga | family-constitution | hukum | unisex | pensiun | ✅ | Tata kelola keluarga |
| 4.19 | Asset Shield | SPV, Subholding, dan Ring-Fencing Aset | spv-subholding-ring-fencing | hukum | unisex | pensiun | ✅ | Struktur proteksi |
| 4.20 | Estate Planning | Wasiat, Hibah, dan Asuransi Jiwa | wasiat-hibah-asuransi-jiwa | hukum | unisex | pensiun | ✅ | Waris terencana |
| 4.21 | Asset Shield | Perjanjian Pra-Nikah untuk Proteksi Aset | perjanjian-pra-nikah-proteksi-aset | hukum | unisex | pensiun | ✅ | Lindungi harta |
| 4.22 | Tax & Cross-Border | Aset Lintas Negara: Struktur dan Pelaporan | aset-lintas-negara | keuangan | unisex | pensiun | ✅ | Multi-jurisdiksi |
| 4.23 | Tax & Cross-Border | Tax Residency dan Pajak Berganda | tax-residency-pajak-berganda | hukum | unisex | pensiun | ✅ | Domisili fiskal |
| 4.24 | Philanthropy & Legacy | Tata Kelola Filantropi Keluarga | tata-kelola-filantropi-keluarga | keuangan | unisex | pensiun | ✅ | Donasi terstruktur |
| 4.25 | Family Office Ops | Rekrut CFO, GC, dan Investment Officer | rekrut-cfo-gc-investment-officer | bisnis | unisex | pensiun | ✅ | Tim inti family office |
| 4.26 | Estate Planning | Perwalian Anak dan Aset untuk Ahli Waris Minor | perwalian-anak-aset-minor | hukum | unisex | pensiun | ✅ | MERGED: perwalian anak, warisan, dan minor asset trust setup. Cover both child guardianship AND asset trust for minors |
| 4.27 | Governance | Crisis Playbook saat Pemilik Tak Cakap | crisis-playbook-pemilik-tak-cakap | hukum | unisex | pensiun | ✅ | Kondisi darurat |
| 4.28 | Tax & Cross-Border | Pajak Dividen Luar Negeri untuk UHNW | pajak-dividen-luar-negeri | hukum | unisex | pensiun | ✅ | Foreign dividend tax planning |
| 4.29 | Asset Shield | Lindungi Aset dari Gugatan Kreditur | lindungi-aset-gugatan-kreditur | hukum | unisex | pensiun | ✅ | Creditor claim protection |
| 4.30 | Estate Planning | Pembentukan Yayasan Keluarga untuk Filantropi | yayasan-keluarga-filantropi | hukum | unisex | pensiun | ✅ | Family foundation setup |
| 4.31 | Family Office Ops | Pelaporan Pajak Terintegrated Family Office | pelaporan-pajak-family-office | hukum | unisex | pensiun | ✅ | Integrated tax reporting |
| 4.32 | Governance | Komite Investasi Keluarga | komite-investasi-keluarga | bisnis | unisex | pensiun | ✅ | Family investment committee |
| 4.33 | Tax & Cross-Border | Pemanfaatan Tax Treaty Indonesia | tax-treaty-indonesia | hukum | unisex | pensiun | ✅ | Tax treaty utilization |
| 4.34 | Asset Shield | Asset Protection melalui Perusahaan Terbatas (PT) | asset-protection-pt | hukum | unisex | pensiun | ✅ | PT-based asset shielding |
| 4.35 | Philanthropy & Legacy | Strategi Dampak Sosial Berkelanjutan | dampak-sosial-berkelanjutan | keuangan | unisex | pensiun | ✅ | Sustainable social impact |
| 4.36 | Governance | Protokol Krisis untuk Family Office | protokol-krisis-family-office | hukum | unisex | pensiun | ✅ | Family office crisis playbook |
| 4.37 | Advanced Trusts | Dynasty Trust: Struktur Abadi Keluarga | dynasty-trust | hukum | unisex | pensiun | ✅ | Perpetual trust structures |
| 4.38 | Advanced Trusts | Trust Grantor Cacat Disengaja (IDGT) | idgt-trust | hukum | unisex | pensiun | ✅ | Intentionally defective grantor trust |
| 4.39 | Advanced Trusts | Grantor Retained Annuity Trust (GRAT) | grat-trust | hukum | unisex | pensiun | ✅ | Annuity trust for wealth transfer |
| 4.40 | Advanced Trusts | Qualified Personal Residence Trust (QPRT) | qprt-trust | hukum | unisex | pensiun | ✅ | Home transfer trust |
| 4.41 | Advanced Trusts | Family Limited Partnership (FLP) | flp-kemitraan | hukum | unisex | pensiun | ✅ | Family limited partnership |
| 4.42 | Asset Protection | Trust Perlindungan Aset Domestik | trust-perlindungan-aset | hukum | unisex | pensiun | ✅ | Domestic asset protection trust |
| 4.43 | Asset Protection | Private Placement Life Insurance | private-placement-life | asuransi | unisex | pensiun | ✅ | Premium financing vehicle |
| 4.44 | Philanthropy | Donor-Advised Funds (DAF) | donor-advised-funds | keuangan | unisex | pensiun | ✅ | Charitable giving vehicle |
| 4.45 | Philanthropy | Charitable Lead Trust (CLT) | charitable-lead-trust | hukum | unisex | pensiun | ✅ | Lead trust for charity |
| 4.46 | Family Office | Investment Beliefs Statement | investment-beliefs | bisnis | unisex | pensiun | ✅ | Family investment philosophy |
| 4.47 | Family Office | Next-Gen Education Programs | nextgen-education | bisnis | unisex | pensiun | ✅ | Succession education |
| 4.48 | Family Office | Family Retreat Planning | family-retreat | bisnis | unisex | pensiun | ✅ | Family retreat planning |
| 4.49 | Sustainable Finance | ESG Integration di Family Office | esg-family-office | investasi | unisex | pensiun | ✅ | ESG for family offices |
| 4.50 | Family Office Expert Network | Multi-Disciplinary Advisory Holding untuk Family Office | advisory-holding-family-office | bisnis | unisex | pensiun | ✅ | Holding structure for legal, tax, investment, property, and operating experts |
| 4.51 | Family Office Expert Network | Talent Pipeline Sarjana ke Family Office | talent-pipeline-family-office | bisnis | unisex | pensiun | ✅ | Recruit and train young domain specialists for family office research and operations |
| 4.52 | Governance | Dewan Ahli Keluarga: Struktur, Mandat, dan Kompensasi | dewan-ahli-keluarga | bisnis | unisex | pensiun | ✅ | External expert council for family business, investment, tax, and governance decisions |
| 4.53 | Family Office Ops | Research Desk Internal untuk Keluarga Bisnis | research-desk-keluarga-bisnis | bisnis | unisex | pensiun | ✅ | Internal research function for deals, policy, markets, and operating risk |
| 4.54 | Luxury Asset Governance | Holding Aset Mewah Keluarga | holding-aset-mewah-keluarga | hukum, investasi | unisex | pensiun | ✅ | Ownership, appraisal, insurance, tax, inheritance, and governance for family luxury assets |
| 4.55 | Productive Luxury Assets | Yacht, Charter, dan Pajak Barang Mewah | yacht-charter-pajak | hukum, investasi | unisex | pensiun | ✅ | Yacht as luxury asset versus productive charter asset, PPnBM, docking, crew, insurance, and compliance |
| 4.56 | Family Office Lean Ops | Captive Service Company untuk Grup Keluarga | captive-service-company | bisnis, hukum | unisex | pensiun | ✅ | Shared service company for finance, HR, legal ops, IT, procurement, governance, and transfer-pricing guardrails |
| 4.57 | Luxury Asset Governance | Asuransi dan Appraisal Aset Mewah Keluarga | luxury-asset-insurance-appraisal | investasi, hukum | unisex | pensiun | ✅ | Insurance, valuation, appraisal schedule, custody, loss documentation, and family reporting |
| 4.58 | Family Office Lean Ops | Procurement Holding untuk Grup Usaha Keluarga | family-office-procurement-holding | bisnis, hukum | unisex | pensiun | ✅ | Centralized procurement, volume discount, governance, related-party pricing, and audit controls |
| 4.59 | Family Office Lean Ops | Shared Service Company untuk Bisnis Keluarga | shared-service-family-business | bisnis, hukum | unisex | pensiun | ✅ | Central finance, HR, legal ops, IT, procurement, SLA, transfer pricing, and service charge model |
| 4.60 | Cross-Border Collectible Planning | Custody Collectible Lintas Negara | collectible-custody-lintas-negara | hukum, investasi | unisex | pensiun | ✅ | Art/watch/wine custody, customs, tax reporting, AML, insurance, storage, and inheritance |
| 4.61 | Cross-Border Collectible Planning | Art dan Collectible dalam Estate Planning | art-collectible-estate-planning | hukum, investasi | unisex | pensiun | ✅ | Provenance, valuation, inheritance, family disputes, museum/charity options, and tax reporting |
| 4.62 | Productive Luxury Assets | Private Aviation: Charter, Fractional, atau Own? | private-aviation-charter-vs-own | investasi, bisnis | unisex | pensiun | ✅ | Time arbitrage, privacy, ownership cost, fractional models, charter, tax, and reputation risk |
| 4.63 | Cross-Border Collectible Planning | Wine dan Rare Collectible untuk Family Office | wine-rare-collectible-family-office | investasi | unisex | pensiun | ✅ | Rare collectible thesis, storage, authentication, insurance, liquidity, and portfolio limits |
| 4.64 | Luxury Asset Governance | AML dan Pajak untuk Transaksi Aset Mewah | aml-pajak-aset-mewah | hukum, investasi | unisex | pensiun | ✅ | Anti-money laundering, tax reporting, source of funds, documentation, and advisor workflow |
| 4.65 | Philanthropy & Legacy | Koleksi Seni sebagai Warisan Filantropi | philanthropic-art-collection | investasi, keuangan | unisex | pensiun | ✅ | Family art collection, cultural legacy, donation, foundation, exhibition, and governance |
| 4.66 | Productive Assets | Thesis Family Office untuk Mesin dan Pabrik Kecil | family-office-manufacturing-thesis | investasi, bisnis | unisex | pensiun | ✅ | Allocate family capital to productive machinery, micro factories, cold storage, and operator partnerships |

**Tier 4 Target**: 66 articles (66 complete, 0 ready to write, 0 research)

---

## Summary Statistics

| Tier | Target Articles | Published | Ready to Write | Research | % Complete |
|------|----------------|-----------|----------------|----------|------------|
| Tier 0: Survival | 78 | 65 | 0 | 13 | 83% |
| Tier 1: Hustler | 306 | 306 | 0 | 0 | 100% |
| Tier 2: Scaler | 249 | 249 | 0 | 0 | 100% |
| Tier 3: Asset Builder | 166 | 166 | 0 | 0 | 100% |
| Tier 4: Legacy | 66 | 66 | 0 | 0 | 100% |
| **TOTAL** | **865** | **852** | **0** | **13** | **98%** |
