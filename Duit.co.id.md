# **Product Requirement Document (PRD): Duit.co.id**

## **1\. Project Vision**

Menjadi platform ekosistem finansial nomor \#1 di Indonesia yang menyediakan solusi personalisasi berdasarkan tingkatan ekonomi (Tier 0 \- Tier 4), pendidikan, domisili, dan usia melalui konten edukasi, alat bantu (tools) praktis, dan jembatan ke layanan profesional.

## **2\. Tech Stack Dashboard**

| Komponen | Teknologi | Alasan |
| :---- | :---- | :---- |
| **Frontend** | React \+ Vite \+ Tailwind CSS | Performa cepat, *developer experience* yang baik, dan SEO-friendly. |
| **Backend API** | Cloudflare Workers \+ Hono | *Edge computing* (latensi rendah), *scaling* otomatis, dan integrasi mulus. |
| **Deployment** | Cloudflare Pages | Gratis, cepat, dan terintegrasi dengan Workers. |
| **Database** | **Cloudflare D1 (SQLite)** | Database SQL di *edge*. **Kelebihan:** Tidak dipause saat idle (berbeda dengan Supabase), gratis di tier tertentu, dan terintegrasi native dengan Workers. |
| **Authentication** | **Clerk** atau **Kinde** | Free tier sangat luas (hingga 10.000+ MAU), tidak dipause, integrasi React sangat mudah. |
| **Content Management** | **Sanity.io** atau Markdown-based | Headless CMS untuk mengelola artikel dan data UU/Tools secara terpisah dari kode. |
| **Caching/Session** | Cloudflare KV | Untuk menyimpan data session atau cache hasil kuis sementara. |

## **3\. Revised Sitemap (Arsitektur Situs)**

🌐 Duit.co.id (Root)  
│  
├── 🏠 Landing Page (Value Proposition & Social Proof)  
├── 🎯 Financial Quiz (Pintu Masuk Utama)  
├── 👤 User Dashboard (My Feed \- Personalisasi Artikel/Tools)  
│  
├── 📚 Knowledge Hub (Edukasi & UU)  
│   ├── /tier-0-survival (Utang, Pinjol, Defense)  
│   ├── /tier-1-hustler (Side Hustle, Freelance, Skill)  
│   ├── /tier-2-scaler (System, Delegasi, HR, Pajak)  
│   ├── /tier-3-asset (Properti, Franchise, Saham)  
│   └── /tier-4-legacy (Holding, Family Office, Wasiat)  
│  
├── 🛠️ Tools Center (Kalkulator & Generator)  
│   ├── /survival-tools (Debt Generator, Budgeting)  
│   ├── /hustler-tools (Pricing Calculator, Script TikTok)  
│   ├── /scaler-tools (KPI Tracker, SOP Builder)  
│   └── /investor-tools (ROI Properti, BEP Franchise)  
│  
├── ⚖️ Law Library (Database UU Relevan per Tier)  
│   └── /regulasi (Filterable by Category: Pajak, Bisnis, Waris, UU ITE)  
│  
├── 🛒 Marketplace & Solutions  
│   ├── /academy (E-course & Digital Products)  
│   ├── /experts (Direktori Konsultan/Notaris/Pajak)  
│   ├── 🔗 External: Franchise.id  
│   └── 🔗 External: Properti.id (Manajemen Aset)  
│

└── 🔐 Auth (Login/Register/YouTube Connect)

---

## **4\. Mekanisme Proteksi Konten (YouTube Gate)**

Karena YouTube API memiliki batasan ketat untuk verifikasi subscription secara *real-time* (memerlukan izin audit level tinggi), kita akan menggunakan pendekatan **"Verified Interaction"**:

1. **Custom Script Gate:**  
   * User mengklik tombol "Unlock Tool/PDF".  
   * Sistem memunculkan modal: "Langkah Terakhir: Subscribe YouTube Kami".  
   * **Teknis:** Gunakan *event listener* pada tombol subscribe. Saat user klik, kita arahkan ke link youtube.com/c/duitcoid?sub\_confirmation=1.  
   * Sistem mencatat di database (Clerk/D1) bahwa user sudah melakukan *action*.  
2. **Google OAuth (Advanced):**  
   * Jika ingin verifikasi asli, user login menggunakan Google.  
   * Minta scope https://www.googleapis.com/auth/youtube.readonly.  
   * Backend (Hono) mengecek via API YouTube apakah ID channel Duit.co.id ada di daftar subscriptions.list user tersebut.  
   * *Catatan:* Cara ini lebih rumit tapi 100% akurat.

## **5\. Fitur Utama & Spesifikasi Fungsional**

### **A. Smart Financial Quiz**

* **Fungsi:** Form dinamis (multi-step) untuk menentukan profil user.  
* **Data Captured:** Pendapatan, Usia, Domisili, Pendidikan, Status Utang.  
* **Logic:** Mengarahkan user ke label (Tag) artikel dan tools yang sesuai secara otomatis.

### **B. Tools Center (Kalkulator & Generator)**

* **Frontend Logic:** Kalkulator berbasis JavaScript (Client-side) agar cepat.  
* **PDF Generator:** Menggunakan library jspdf atau react-pdf untuk meng-generate surat negosiasi pinjol atau SOP secara instan dari input user.

### **C. Law Library (Database UU)**

* **Struktur Data:** Database D1 menyimpan metadata UU (Nomor, Tahun, Tentang, Link Download, Tier Terkait).  
* **Fitur:** Pencarian cepat dan filter berdasarkan kategori (Pajak, Perburuhan, Properti).

## **6\. Strategi Monetisasi Terintegrasi**

1. **Affiliate Hooks:** Di setiap hasil kalkulator, backend Hono akan menyisipkan link afiliasi yang relevan (misal: link hosting untuk tools web UMKM).  
2. **Lead Gen Pipeline:** Form konsultasi di Tier 3 & 4 akan langsung mengirim notifikasi ke WhatsApp/Email partner (Notaris/Agen Pajak) melalui Cloudflare Workers (integrasi Mailchannels atau Twilio).  
3. **Digital Goods:** Integrasi pembayaran (Midtrans/Xendit) untuk pembelian E-course di halaman /academy.

## **7\. Non-Functional Requirements (Performance & Security)**

* **SEO:** Menggunakan react-helmet-async untuk metadata dinamis tiap artikel agar terindeks Google dengan kata kunci UU dan Peluang Usaha.  
* **Security:** Cloudflare WAF (Web Application Firewall) untuk proteksi dari bot dan serangan DDOS.  
* **Speed:** Target LCP (Largest Contentful Paint) \< 1.2 detik menggunakan Cloudflare Global Edge Network.  
* **Idle Management:** Karena menggunakan Cloudflare D1 dan Workers, sistem akan tetap "on" dan responsif meskipun tidak ada trafik selama berbulan-bulan (0ms cold start).

## **8\. Development Roadmap**

1. **Phase 1 (MVP):** Setup Auth (Clerk), Landing Page, Quiz, dan 10 Artikel Tier 0 & 1 beserta kalkulator dasarnya.  
2. **Phase 2 (Content & UU):** Implementasi Law Library dan integrasi YouTube Gate.  
3. **Phase 3 (Scaling):** Integrasi ke Franchise.id & Properti.id serta peluncuran fitur Marketplace Academy.

### **1\. Struktur Folder & Markdown (CMS)**

Anda akan meletakkan file .md di dalam folder /content/artikel/. Setiap file wajib memiliki **Frontmatter** (metadata di bagian atas file) untuk keperluan SEO, Label, dan Taksonomi.

**Contoh struktur file:** /content/artikel/cara-buat-pt-perorangan.md

\---  
title: "Cara Membuat PT Perorangan Tanpa Modal Besar"  
description: "Panduan lengkap langkah demi langkah mendirikan PT Perorangan berdasarkan UU Cipta Kerja untuk Tier 1."  
date: "2024-05-20"  
author: "Admin Duit"  
slug: "cara-buat-pt-perorangan"  
image: "/images/thumb-pt-perorangan.jpg"

\# Taksonomi & Labeling (Sesuai Arsitektur Sebelumnya)  
tier: "tier-1-hustler"  
category: "peluang-usaha"  
tags: \["pt-perorangan", "legalitas", "modal-kecil", "edu-sarjana"\]  
location: "kota"  
income\_bracket: "income-hustler"

\# Fitur Proteksi  
youtube\_lock: true  
is\_premium: false  
\---

Isi artikel dimulai di sini...

Gunakan format markdown biasa untuk konten.

**Proses Build:**  
Anda bisa menggunakan plugin Vite seperti vite-plugin-markdown atau library gray-matter (untuk parse metadata) dan remark/rehype (untuk ubah MD ke HTML). Saat build, React akan men-generate halaman statis berdasarkan metadata ini.

### **2\. Skema Database (Cloudflare D1 \- SQLite)**

Karena konten artikel sudah ada di file Markdown, database D1 akan fokus pada **Data User, Hasil Kuis, Tracking Tool, dan Lead Generation.**

#### **Tabel 1: users**

Menyimpan profil dasar hasil kuis untuk personalisasi "My Feed".

CREATE TABLE users (  
    id TEXT PRIMARY KEY, \-- ID dari Clerk/Kinde  
    email TEXT UNIQUE,  
    full\_name TEXT,  
    income\_tier TEXT,    \-- tier-0, tier-1, dsb  
    location\_type TEXT,  \-- desa, kota, global  
    edu\_level TEXT,      \-- sma, s1, s2, spesialis  
    age\_group TEXT,      \-- muda, produktif, pensiun  
    yt\_subscribed INTEGER DEFAULT 0, \-- 0: No, 1: Yes  
    created\_at DATETIME DEFAULT CURRENT\_TIMESTAMP,  
    updated\_at DATETIME DEFAULT CURRENT\_TIMESTAMP

);

#### **Tabel 2: user\_unlocks**

Mencatat konten apa saja yang sudah di-unlock user (setelah subscribe YouTube).

CREATE TABLE user\_unlocks (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    user\_id TEXT,  
    content\_slug TEXT, \-- Slug dari file markdown  
    unlocked\_at DATETIME DEFAULT CURRENT\_TIMESTAMP,  
    FOREIGN KEY(user\_id) REFERENCES users(id)

);

#### **Tabel 3: tool\_logs**

Mencatat penggunaan tool (penting untuk analytics bisnis).

CREATE TABLE tool\_logs (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    user\_id TEXT,  
    tool\_name TEXT, \-- misal: 'kalkulator-roi-properti'  
    input\_summary TEXT, \-- ringkasan input dalam format JSON  
    created\_at DATETIME DEFAULT CURRENT\_TIMESTAMP

);

#### **Tabel 4: leads\_referral**

Mencatat ketika user mengklik atau mengisi form menuju partner (Notaris/Franchise/Properti).

CREATE TABLE leads\_referral (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    user\_id TEXT,  
    partner\_type TEXT, \-- 'lawyer', 'tax', 'franchise', 'property'  
    partner\_name TEXT,  
    status TEXT DEFAULT 'pending', \-- 'pending', 'converted', 'rejected'  
    created\_at DATETIME DEFAULT CURRENT\_TIMESTAMP

);

### **3\. Arsitektur Teknis Integrasi**

1. **Build Time (Static):**  
   * Vite membaca semua file .md.  
   * Membuat file search-index.json yang berisi metadata semua artikel. File ini akan di-*load* oleh React untuk fitur filter/search tanpa perlu panggil database.  
2. **Runtime (Dynamic via Cloudflare Workers):**  
   * **Auth:** Saat user login via Clerk, Worker mengecek tabel users. Jika belum ada, arahkan ke Kuis.  
   * **Quiz:** Hasil kuis disimpan ke D1 agar saat user balik lagi, "My Feed" tetap konsisten.  
   * **YouTube Lock:**  
     * Saat user klik "Unlock", Worker mengecek status yt\_subscribed di D1.  
     * Jika belum, jalankan mekanisme verifikasi (seperti yang dibahas di PRD).  
     * Jika berhasil, update tabel users dan masukkan entry ke user\_unlocks.

### **4\. Tambahan Stack & Tooling**

* **Tailwind Typography:** Gunakan plugin @tailwindcss/typography (prose) agar tampilan artikel dari Markdown otomatis cantik dan rapi.  
* **Search Engine:** Gunakan **FlexSearch** (library JS) untuk mencari di dalam search-index.json. Sangat ringan dan cepat untuk ribuan artikel tanpa perlu server search tambahan.  
* **Images:** Taruh image di folder public/images/. Untuk performa maksimal, pertimbangkan gunakan **Cloudflare Images** atau **R2** jika artikel sudah sangat banyak.

## 

## **KOMPONEN REACT**

### **1\. Kategori: Global & Layout**

Komponen yang muncul di hampir semua halaman.

| Nama Komponen | Deskripsi & Fungsi | Fitur Utama |
| :---- | :---- | :---- |
| Navbar | Navigasi utama situs. | Tier indicator (User level), Login/Logout (Clerk), Search bar. |
| Footer | Informasi kaki situs. | Sitemap link, Social media, Disclaimer hukum. |
| AppShell | Wrapper utama untuk layout. | Mengatur layout dashboard vs landing page. |
| Sidebar | Navigasi khusus Dashboard/My Feed. | Filter kategori, shortcut ke tools sesuai Tier. |
| SEO | Wrapper react-helmet-async. | Mengelola Title, Meta Description, & OpenGraph secara dinamis. |

### **2\. Kategori: Discovery & Dashboard (Personalization)**

Komponen untuk menampilkan konten berdasarkan hasil kuis.

| Nama Komponen | Deskripsi & Fungsi | Fitur Utama |
| :---- | :---- | :---- |
| FinancialQuiz | Form multi-step untuk profiling. | Progress bar, logic percabangan, simpan data ke D1. |
| TierBanner | Banner identitas di atas feed. | Menampilkan "Status Ekonomi" user saat ini & target selanjutnya. |
| ArticleCard | Menampilkan ringkasan artikel MD. | Tag kategori, Tier badge, estimasi waktu baca. |
| MyFeedGrid | Container untuk konten personalisasi. | Filter otomatis berdasarkan Tag/Label dari data user. |
| RecommendationSection | Widget rekomendasi tools. | "Berdasarkan profilmu, kamu butuh tool ini..." |

### **3\. Kategori: Content Rendering (Markdown)**

Komponen untuk menampilkan data dari file .md.

| Nama Komponen | Deskripsi & Fungsi | Fitur Utama |
| :---- | :---- | :---- |
| MarkdownRenderer | Mengubah string MD menjadi HTML. | Support Tailwind Typography (prose), Syntax highlighting. |
| TableOfContents | Navigasi dalam artikel panjang. | Auto-generate dari heading (h2, h3). |
| LawBadge | Indikator Undang-Undang. | Menampilkan Nomor UU & Tahun dengan tooltip penjelasan singkat. |
| ExpertCTA | Box ajakan konsultasi di akhir artikel. | Tombol WhatsApp/Form sesuai kategori (Tier 3/4). |

### **4\. Kategori: Financial Tools (Interactive)**

Komponen pembangun kalkulator dan generator.

| Nama Komponen | Deskripsi & Fungsi | Fitur Utama |
| :---- | :---- | :---- |
| CurrencyInput | Input field khusus Rupiah. | Auto-formatting (titik ribuan), prefix "Rp". |
| ResultDisplay | Menampilkan hasil perhitungan tool. | Animasi angka, grafik sederhana (Chart.js/Recharts). |
| ToolWrapper | Frame standar untuk semua tool. | Judul tool, petunjuk penggunaan, tombol reset/share. |
| PDFGeneratorButton | Tombol untuk ekspor hasil tool. | Trigger library jspdf untuk download hasil/skrip. |

### **5\. Kategori: Engagement & Monetization (The Gates)**

Komponen untuk mengunci konten dan mengarahkan ke partner.

| Nama Komponen | Deskripsi & Fungsi | Fitur Utama |
| :---- | :---- | :---- |
| YouTubeLockGate | Overlay/Modal pengunci konten. | Tombol "Subscribe to Unlock", verifikasi simulasi/nyata. |
| LeadGenForm | Form pengumpulan data prospek. | Integrasi ke Cloudflare Workers untuk kirim ke email partner. |
| AffiliateProductCard | Card untuk produk pihak ketiga. | Menampilkan E-course, Produk Keuangan, atau Link Shopee. |
| TrustBadge | Indikator keamanan/legalitas. | "Verified by Duit.co.id", Logo Partner Hukum. |

### **Library Pendukung yang Direkomendasikan:**

1. **Icon:** lucide-react (Ringan dan konsisten).  
2. **Forms:** react-hook-form \+ zod (Untuk validasi kuis dan input kalkulator).  
3. **Animation:** framer-motion (Penting untuk transisi kuis dan progress bar agar terlihat premium).  
4. **Charts:** recharts (Untuk visualisasi ROI Properti atau simulasi utang).  
5. **Markdown:** react-markdown \+ remark-gfm \+ gray-matter.

### **Tips Pengembangan:**

Buatlah folder khusus untuk tools, misalnya /components/tools/. Karena setiap tool (Kalkulator ROI, Debt Generator, dll) akan memiliki logic yang unik, ToolWrapper akan membantu Anda menjaga konsistensi tampilan (UI) sementara logic di dalamnya bisa Anda buat secara modular.

## **KURIKULUM MODUL 1 (THE HUSTLER)**

Berikut adalah **100 Ide High-Income Skill & Business (The Hidden Goldmines)** yang dibagi berdasarkan Domisili, Pendidikan, dan Usia, siap menjadi *database* utama [*Duit.co.id*](http://Duit.co.id):

### **MODUL 1: TIER 1 \- THE HUSTLER (Survival & Income Boosting)**

*Target: Anak muda, fresh graduate, atau pekerja gaji UMR.*

* **Topik 1: High-Income Skills (Skill Penambah Penghasilan)**  
  * Copywriting, Digital Marketing, Coding, Video Editing.  
  * Cara mendapatkan klien freelance (lokal & internasional).  
* **Topik 2: Strategi Karir & Gaji**  
  * Cara negosiasi gaji saat interview dan minta naik gaji.  
  * Cara pindah kuadran dari karyawan ke self-employed.  
* **Topik 3: Bisnis Tanpa Modal / Modal Minim**  
  * Bisnis dropship, affiliate marketing, jasa titip (jastip).  
  * Cara validasi ide bisnis tanpa harus ngutang bank.  
* **Topik 4: Basic Financial Defense**  
  * Cara melunasi utang pinjol / kartu kredit dengan cepat.  
  * Mindset menabung vs investasi leher ke atas (edukasi).

### **MODUL 2: TIER 2 \- THE SCALER (Growth & Optimization)**

*Target: Manajer, Profesional, Pemilik Usaha Kecil.*

* **Topik 1: Fundamental Perencanaan Keuangan**  
  * Alokasi budget (50 / 30 / 20), Dana Darurat, dan Asuransi Kesehatan / Jiwa.  
* **Topik 2: Pengenalan Paper Asset (Investasi Dasar)**  
  * Reksadana, SBN (Surat Berharga Negara), Saham Bluechip.  
* **Topik 3: Scale Up Bisnis (Bagi Pengusaha)**  
  * Cara merekrut tim pertama, membuat SOP dasar, optimasi pajak UMKM.  
* **Topik 4: Persiapan Membeli Aset Keras**  
  * Cara mengelola skor kredit (SLIK OJK) agar mudah dapat KPR / Kredit Usaha.

### **MODUL 3: TIER 3 \- THE ASSET BUILDER (Wealth Creation & Passive Income)**

*Target: Pengusaha sukses, High-level Executive. Di sini ekosistem Anda mulai bekerja.*

* **Topik 1: Franchise Business Strategy** *(Bridge ke Franchise.id)*  
  * Cara memilih franchise yang menguntungkan dan auto-pilot.  
  * Menjadi master franchisee vs multi-unit franchisee.  
* **Topik 2: Property & Real Estate Playbook** *(Bridge ke Manajemen / Properti.id)*  
  * Strategi mengubah properti nganggur (tanah / ruko) menjadi cashflow (Kos-kosan, Co-living, Indomaret).  
  * Menghitung ROI, Yield, dan Cap Rate properti komersial.  
* **Topik 3: Bisnis Masa Pensiun (Khusus Bracket Usia Tua)**  
  * Alokasi uang pesangon / pensiun ke aset rendah risiko (SBN \+ Franchise retail).  
  * Cara berbisnis di masa tua tanpa harus capek operasional.

### **MODUL 4: TIER 4 \- THE LEGACY MAKER (Wealth Protection & Legal Structuring)**

*Target: Ultra-High Net Worth Individuals (UHNWI).*

* **Topik 1: Corporate Structuring & Tax Optimization**  
  * Pentingnya Holding Company (PT Utama) vs Operating Company.  
  * Strategi legal menurunkan beban pajak korporasi dan pribadi.  
* **Topik 2: Wealth Protection (Anti-Gugatan)**  
  * Cara memisahkan aset pribadi dari risiko kebangkrutan / gugatan bisnis.  
* **Topik 3: Succession & Legacy (Family Office)**  
  * Membangun *Family Office* untuk mengelola kekayaan keluarga.  
  * Membuat Yayasan (Foundation) dan Trust untuk menghindari sengketa warisan oleh generasi yang tidak kompeten.

## **KATEGORI 1: THE RURAL HUSTLER (Peluang Desa / Semi-Kota)**

*Fokus pada pemanfaatan lahan, komoditas alam, dan arbitrase (menjual barang desa ke kota).*

| No | Ide Bisnis / Skill | Pendidikan Ideal | Usia Ideal | Domisili | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Makelar Sayur / Buah via TikTok Live | Bebas | 18 \- 40 | Desa / Gunung | Live di kebun, tawarkan hasil panen langsung ke *end-user* di kota. |
| 2 | Pengepul Kardus & Barang Bekas | Bebas | Bebas | Desa / Pinggiran | Kumpulkan dari warga, jual ke pabrik daur ulang. Margin sangat besar. |
| 3 | Budidaya Maggot (BSF) | Bebas | Bebas | Desa | Pakan ternak alternatif bernilai tinggi. Modal sampah organik. |
| 4 | Agen Laku Pandai (BRILink / PPOB) | Min. SMA | Bebas | Desa | Jadi "Bank mini" untuk warga desa yang jauh dari ATM. Profit dari biaya admin. |
| 5 | Ternak Kambing Sistem Aqiqah / Qurban | Bebas | 25 \- 55 | Desa | Jangan jual ke tengkulak. Olah jadi sate / gulai, jual "Paket Aqiqah" ke orang kota. |
| 6 | Makelar Tanah Desa (Broker Lokal) | Bebas | 30 \- 60 | Desa | Cari tanah kebun murah, tawarkan ke orang kota yang mau investasi / bikin villa. |
| 7 | Supplier Daun Pisang ke Restoran | Bebas | Bebas | Desa | Potong dan bersihkan daun pisang, suplai rutin ke restoran Padang / Sunda di kota. |
| 8 | Budidaya Jamur Tiram / Kuping | Bebas | 20 \- 50 | Desa | Butuh ruang lembab (kumbung). Siklus panen cepat, serapan pasar selalu kurang. |
| 9 | Jasa Tebang & Potong Kayu (Chainsaw) | Bebas | 20 \- 45 | Desa | Punya gergaji mesin, tawarkan jasa tebang pohon bagi warga yang butuh lahan. |
| 10 | Jastip Hasil Bumi Spesifik (Madu, Kopi) | Bebas | 18 \- 35 | Desa / Hutan | Kurasi produk desa yang organik / murni, jual mahal ke komunitas sehat di kota. |
| 11 | Ternak Lele Sistem Bioflok | Bebas | Bebas | Desa / Pinggiran | Hemat lahan, kolam terpal. Suplai ke warung pecel lele lokal. |
| 12 | Produsen Pupuk Kompos Mandiri | Bebas | Bebas | Desa | Kumpulkan kotoran ternak desa, fermentasi, kemas rapi, jual ke pecinta tanaman di kota. |
| 13 | Makelar Hewan Ternak (Blantik Online) | Bebas | 20 \- 50 | Desa | Foto sapi / kambing bagus di desa, tawarkan di grup FB / WA pengusaha ternak. |
| 14 | Budidaya Ikan Hias (Channa / Cupang) | Bebas | 15 \- 35 | Desa / Kota | Butuh modal akuarium kecil, jual via *live streaming* atau grup hobi. |
| 15 | Jasa Bor Air / Sumur Artesis | Min. SMK | 25 \- 50 | Desa / Kota | Modal mesin bor. Setiap ada perumahan / bangunan baru pasti butuh air. |
| 16 | Pembuat Arang Batok Kelapa | Bebas | Bebas | Desa | Limbah kelapa dijadikan briket arang untuk shisha / BBQ (potensi ekspor). |
| 17 | Supplier Kayu Bakar / Serbuk Gergaji | Bebas | Bebas | Desa | Suplai ke pabrik tahu / kerupuk atau peternakan ayam (sebagai alas kandang). |
| 18 | Jasa Semprot Hama Pertanian (Drone / Manual) | Min. SMK / SMA | 20 \- 35 | Desa | Profesi modern di desa. Petani tua sewa jasa anak muda untuk semprot pestisida. |
| 19 | Pengepul Minyak Jelantah | Bebas | Bebas | Desa / Kota | Tampung dari warung-warung, jual ke pabrik biodiesel. |
| 20 | Produsen Bibit Tanaman / Stek | Bebas | Bebas | Desa | Jual bibit durian, alpukat, atau tanaman hias buah (tabulampot) secara online. |

### 

### **KATEGORI 1A: BASIC FINANCIAL DEFENSE (Menutup Kebocoran & Bertahan Hidup)**

*Fokus: Mindset "Kaya itu bertahan, bukan gaya". Mencegah user jatuh ke jurang kehancuran finansial sebelum memulai bisnis.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Tujuan Utama & Kasus Nyata |
| :---- | :---- | :---- |
| **1\. Taktik Keluar dari Jerat Pinjol & Paylater** | Cara negosiasi restrukturisasi dengan aplikasi pinjol legal. *Debt Snowball* vs *Debt Avalanche*. Psikologi menghadapi *Debt Collector* (DC). | Menyelamatkan mental *user* agar bisa fokus kerja, bukan fokus gali lubang tutup lubang. |
| **2\. Jebakan Uang Cepat (Scam & Judi Online)** | Mengapa *Slot*, *Binary Option*, dan Skema Ponzi secara matematis dirancang untuk membuat Anda miskin. Membangun imun terhadap "Janji Cepat Kaya". | Edukasi keras (Tough Love). Uang hasil kerja keras Modul 1 tidak boleh habis di *Zeus* atau investasi bodong. |
| **3\. *Barebones Budgeting* (Anggaran Mode Bertahan)** | Memangkas biaya hidup hingga titik terendah. Konsep membedakan *Kebutuhan (Needs), Keinginan (Wants),* dan *Kewajiban (Obligations)*. | Mengajarkan bahwa "Nabung Rp 500rb/bulan" itu sama nilainya dengan "Gaji naik Rp 500rb/bulan". |
| **4\. Dana Darurat Level 1 (*Starter Emergency Fund*)** | Tidak perlu muluk-muluk 6 bulan gaji. Fokus kumpulkan Rp 1 Juta \- 3 Juta pertama dulu di rekening terpisah agar tidak ngutang saat ban motor bocor atau anak sakit. | Memutus rantai ketergantungan pada utang darurat. |
| **5\. *Decluttering* untuk Modal Cepat** | Cara menyulap barang bekas di rumah (baju tua, buku, TV rusak) menjadi uang tunai cepat via Facebook Marketplace / Carousell. | Cara paling masuk akal untuk mendapatkan Rp 1 \- 2 Juta pertama tanpa hutang dan tanpa skill baru. |

#### 

### **KATEGORI 1B: ZERO-RISK BUSINESS MODEL (Bisnis Tanpa Modal & Anti-Bangkrut)**

*Fokus: Mengubah mindset "Mau bisnis harus pinjam uang bank" menjadi "Bisnis itu jualan dulu, barang urusan belakang". Jika modal Rp 0, risiko bangkrut adalah 0%.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Tujuan Utama & Kasus Nyata |
| :---- | :---- | :---- |
| **1\. Kekuatan Sistem *Pre-Order* (PO) & *Down Payment* (DP)** | Jangan produksi/beli barang sebelum dibayar. Pakai uang DP dari pelanggan A untuk membeli bahan baku, lalu jual ke A. (Konsep OPM \- *Other People's Money* dari *Customer*). | **Kasus:** Bikin usaha katering harian, kue kering lebaran, atau kaos *custom* murni pakai uang dari pembeli duluan. |
| **2\. Ekonomi Jasa Berbasis Keringat (Sweat Equity)** | Modal terbaik adalah energi fisik dan waktu luang Anda. Bisnis jasa tidak butuh kulakan barang, sehingga tidak ada stok mati (Dead Stock). | Menghubungkan *user* ke daftar ide "The Urban Blue Collar" (Cuci sepatu, bersih kosan, makelar makelar motor). |
| **3\. *Dropshipping & Affiliate Marketing* Dasar** | Memasarkan produk orang lain tanpa memegang fisik barangnya. Jika tidak laku, Anda tidak rugi uang (hanya rugi waktu). | Cara tercepat memvalidasi apakah Anda punya "Bakat Jualan" tanpa risiko uang hilang. |
| **4\. Arbitrase Jastip (Jasa Titip) Tanpa Risiko** | Jalan-jalan ke mal/pasar grosir, foto barang, posting. Kalau ada yang mau, minta transfer dulu, baru Anda belikan. Untung dari *markup* harga \+ ongkir. | Sangat cocok untuk anak kuliah/ibu rumah tangga yang tidak punya uang, tapi punya koneksi pertemanan. |
| **5\. Sewa Alat, Jangan Beli (Lean Startup Mode)** | Anda dapat orderan *foto pre-wedding*? Jangan pinjol untuk beli kamera Rp 15 Juta. Sewa kamera Rp 150rb/hari. Potong dari bayaran klien. | Mengajarkan agar pengusaha pemula tidak mengoleksi aset penyusutan (*liabilities*) yang memberatkan *cashflow*. |
| **6\. Kemitraan Bagi Hasil (Sistem *Mudharabah*)** | Punya ide dan tenaga tapi butuh modal alat? Jangan ke Bank. Cari teman/bos yang punya uang, jadikan pemodal pasif. Anda jalankan, bagi hasil 50:50. | Tidak ada cicilan utang bulanan. Kalau bisnis rugi, pemodal rugi uang, Anda rugi tenaga. Anda tidak dikejar utang bank. |

## **KATEGORI 2: THE EDUCATED EXPERT (Peluang Lulusan S1 / S2)**

*Mengubah ijazah menjadi agensi / konsultan mandiri tanpa harus melamar kerja di korporat.*

| No | Ide Bisnis / Skill | Pendidikan Ideal | Usia Ideal | Domisili | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 21 | Konsultan Legalitas & HAKI UMKM | S1 Hukum | 23 \- 40 | Kota | Bantu UKM bikin PT, daftar merek, BPOM, Sertifikat Halal. |
| 22 | Virtual Bookkeeper & Tax Filer | S1 Akuntansi | 23 \- 40 | Kota | Pegang pembukuan 10-20 bisnis lokal (cafe, klinik) dengan sistem langganan. |
| 23 | Freelance Headhunter / Rekrutmen Lokal | S1 Psikologi / HR | 25 \- 45 | Kota | Carikan manajer / staf handal untuk bisnis lokal. Dibayar 1x gaji karyawan yg direkrut. |
| 24 | Jasa Hitung RAB & Drafter Bangunan | S1 / D3 Sipil / Arsitek | 22 \- 40 | Kota / Daerah | Banyak orang bangun rumah tanpa kontraktor besar, butuh gambar dan hitungan bahan. |
| 25 | Konsultan Gizi & Katering Diet Klinis | S1 Ahli Gizi | 23 \- 35 | Kota Besar | Bikin menu spesifik: Katering diet diabetes, diet jantung, atau ibu hamil. |
| 26 | Penerjemah Tersumpah (Sworn Translator) | S1 Sastra | 25 \- 50 | Bebas | Terjemahkan dokumen legal (ijazah, akta) untuk keperluan visa / beasiswa. |
| 27 | Ghostwriter Buku Biografi / Bisnis | S1 Komunikasi | 25 \- 45 | Kota | Tuliskan buku untuk pejabat lokal, bos UMKM, atau tokoh agama. Bayaran puluhan juta. |
| 28 | Konsultan Amdal / Lingkungan Pabrik | S1 Lingkungan | 25 \- 45 | Kota Industri | Pabrik baru wajib punya dokumen lingkungan. Biaya konsultan sangat mahal. |
| 29 | Psikolog Online / Konselor Pernikahan | S2 Profesi Psikologi | 26 \- 50 | Bebas | Buka sesi *tele-counseling* berbayar via Zoom. |
| 30 | Tutor Privat Kurikulum Internasional | S1 (MIPA / Inggris) | 22 \- 35 | Kota Besar | Ngajar Math / Science dalam bahasa Inggris untuk anak sekolah elit (Cambridge / IB). |
| 31 | Data Analyst Freelance (UMKM) | S1 IT / Statistik | 22 \- 35 | Bebas | Bantu ritel lokal analisa data penjualan mereka agar tahu barang apa yg paling laku. |
| 32 | Konsultan K3 (Keselamatan Kerja) | S1 K3 / Teknik | 25 \- 45 | Kota Industri | Proyek konstruksi selalu butuh *Safety Officer* / sertifikasi alat berat. |
| 33 | Jasa Pembuatan Modul / SOP Perusahaan | S1 Manajemen | 24 \- 40 | Kota | Bisnis lokal yg mau di-franchise-kan pasti butuh buku SOP operasional. |
| 34 | Bimbingan Skripsi / Tesis (Legal Consulting) | S1 / S2 Semua | 25 \- 40 | Kota Pelajar | Jasa konsultasi metodologi penelitian, *proofreading*, cek plagiasi (Turnitin). |
| 35 | Konsultan Digital Marketing Spesialis | S1 Ilmu Komunikasi | 22 \- 35 | Kota | Pegang anggaran iklan FB / IG Ads klinik kecantikan atau properti lokal. |
| 36 | Jasa Konsultan Ekspor UMKM | S1 Bisnis / Hub Int | 25 \- 45 | Kota | Bantu perajin lokal (rotan, kopi) mengurus dokumen & mencari *buyer* luar negeri. |
| 37 | Auditor Independen Skala Kecil | S1 Akuntansi \+ CPA | 28 \- 50 | Kota | Audit laporan keuangan yayasan, koperasi, atau startup. |
| 38 | Desainer Interior Niche (Spesialis Kosan) | S1 Desain Interior | 23 \- 40 | Kota | Tawarkan jasa ubah desain rumah tua jadi kamar kos estetik yang sewa-nya mahal. |
| 39 | Konselor Pendidikan Luar Negeri | S1 / S2 Lulusan LN | 25 \- 40 | Kota Besar | Bantu anak SMA merencanakan studi ke luar negeri (esai, visa, beasiswa). |
| 40 | Jasa Pembuatan Business Plan & Pitch Deck | S1 Bisnis / Manajemen | 22 \- 35 | Kota Besar | Bantu startup / orang yang mau cari investor bikin presentasi yang meyakinkan. |

## **KATEGORI 3: THE URBAN BLUE COLLAR (Jasa Praktis di Kota / Spesialis)**

*Kerja fisik atau jasa spesifik yang bayarannya mahal karena orang kota "malas" melakukannya.*

| No | Ide Bisnis / Skill | Pendidikan Ideal | Usia Ideal | Domisili | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 41 | Deep Cleaning Kasur & Sofa | Bebas | 20 \- 40 | Kota | Punya *vacuum hydro*. Target rumah elit / apartemen. Margin besar. |
| 42 | Spesialis Cuci AC & Maintenance | SMK Mesin / Bebas | 20 \- 45 | Kota | Tawarkan kontrak langganan (tiap 3 bulan) ke ruko, minimarket, kos-kosan. |
| 43 | Jasa Perbaikan Pipa Mampet (Plumber) | Bebas | 25 \- 50 | Kota Besar | Modal alat spiral dorong. Bayaran tinggi karena ini masalah darurat di rumah. |
| 44 | MUA Spesialis (Wisuda / Karakter) | SMA / Bebas | 18 \- 35 | Kota | *Niche* spesifik buat rate card mahal. |
| 45 | Jasa Seni Balon & Dekor Pesta | Bebas | 18 \- 35 | Kota | Rangkai *balloon arch* untuk ultah, peresmian toko. Modal murah, jual mahal seni. |
| 46 | Cuci Sepatu & Tas Premium | Bebas | 18 \- 30 | Kota Besar | Jasa spesialis bersihkan sepatu kulit / sneakers mahal. Bisa buka di garasi. |
| 47 | Jasa Poles Lantai (Marmer / Granit) | Bebas | 25 \- 45 | Kota Besar | Target rumah mewah atau gedung kantor. |
| 48 | Jasa Pet Sitter (Pawang Anjing / Kucing) | Bebas | 18 \- 35 | Kota Besar | Kunjungi rumah klien untuk beri makan & ajak jalan anjing saat bosnya kerja / liburan. |
| 49 | Jasa Grooming Hewan Panggilan | Bebas | 20 \- 35 | Kota | Datang ke rumah mandikan anjing / kucing. Pemilik hewan sangat suka kepraktisan ini. |
| 50 | Jasa Pindahan Rumah (Packer Profesional) | Bebas | 20 \- 40 | Kota | Bukan cuma sewa mobil, tapi jasa mem-packing barang pakai kardus / bubble wrap rapi. |
| 51 | Jasa Instalasi Smart Home & CCTV | SMK Elektro / IT | 20 \- 35 | Kota Besar | Pasang kunci pintu digital, CCTV, lampu pintar di perumahan baru. |
| 52 | Pembersihan Pasca Renovasi (Post-Con) | Bebas | 20 \- 45 | Kota | Membersihkan noda semen / cat setelah rumah selesai dibangun. Bayaran per proyek besar. |
| 53 | Salon Mobil Panggilan (Home Service) | Bebas | 20 \- 40 | Kota | Bawa alat poles ke garasi klien. |
| 54 | Jasa Rakit & Servis PC Gaming / Kantor | SMK IT / Bebas | 15 \- 30 | Kota | Orang beli komponen online, sewa jasa Anda untuk merakitnya. |
| 55 | Jasa Hias Seserahan & Mahar Kawin | Bebas | 18 \- 35 | Kota / Daerah | Seni merangkai uang / benda di dalam kotak akrilik. Modal kotak, sistem sewa. |
| 56 | Jasa Trowel & Floor Hardener (Lantai) | Bebas | 25 \- 45 | Kota / Industri | Spesialis mengecor lantai pabrik / gudang agar mulus. Bayaran per meter persegi. |
| 57 | Jastip Barang IKEA / Informa / Ace | Bebas | 20 \- 35 | Kota Tier 2 / 3 | Beli barang di kota besar, kirim ke pembeli di kota kecil yang belum ada mall-nya. |
| 58 | Jasa Sedot WC / Limbah Domestik | Bebas | 25 \- 50 | Kota | Meskipun "kotor", ini monopoli di tingkat lokal. Omset bulanan sangat besar. |
| 59 | Jasa Pembersih Kaca Gedung Ruko | Bebas | 20 \- 40 | Kota | Menggunakan alat *water fed pole* atau gondola mini. Tawarkan langganan ke pemilik ruko. |
| 60 | Tukang Kunci Panggilan (Locksmith) | Bebas | Bebas | Kota | Bayaran darurat sangat mahal, apalagi malam hari (mobil terkunci, brankas macet). |

## **KATEGORI 4: THE ASSET RENTERS & ARBITRAGE (Sewa Barang & Makelar)**

*Tidak perlu bikin produk, cukup sediakan barang yang dibutuhkan sementara oleh orang lain.*

| No | Ide Bisnis / Skill | Pendidikan Ideal | Usia Ideal | Domisili | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 61 | Sewa Genset Portable | Bebas | Bebas | Kota / Daerah | Untuk acara nikahan, bazar, syuting. Bisa sewa harian / mingguan. |
| 62 | Sewa Panggung Rigging & Tenda Terop | Bebas | Bebas | Kota / Daerah | Acara kampung / kantor selalu butuh. Sekali main bisa jutaan rupiah. |
| 63 | Sewa Peralatan Bayi (Stroller, Bouncer) | Bebas | 25 \- 40 | Kota | Bayi cepat besar, ibu-ibu lebih pilih sewa *stroller* mahal bulanan daripada beli. |
| 64 | Sewa Mainan Besar (Perosotan, Istana Balon) | Bebas | Bebas | Kota | Disewakan untuk acara ulang tahun anak. |
| 65 | Sewa Alat Fototerapi Bayi Kuning | Tenaga Medis / Bebas | 25 \- 45 | Kota Besar | Alat sinar biru (*phototherapy*). Tarif sewa harian setara kamar RS. |
| 66 | Sewa HT (Handy Talky) / Alat Komunikasi | Bebas | 18 \- 35 | Kota | Disewa oleh panitia EO, konser, atau nikahan. |
| 67 | Sewa Alat Mendaki / Camping | Bebas | 18 \- 30 | Dekat Gunung | Sewa tenda, *sleeping bag*, kompor portable. Balik modal cepat. |
| 68 | Sewa Kotak Seserahan / Ring Box | Bebas | 18 \- 35 | Bebas | Kotak akrilik kosong disewakan ke calon pengantin. |
| 69 | Sewa Kamera, Lensa & Proyektor | Bebas | 18 \- 35 | Kota Pelajar | Disewa mahasiswa / freelancer untuk tugas atau nonton bareng. |
| 70 | Sewa Baju Adat / Kostum Karnaval | Bebas | Bebas | Kota / Daerah | Ramai saat bulan Agustus (Karnaval) atau Hari Kartini. |
| 71 | Sewa Scaffolding (Perancah Besi) | Bebas | 30 \- 55 | Kota / Daerah | Sewakan ke pemborong bangunan. Barang besi tidak gampang rusak (aset keras). |
| 72 | Sewa Mobil Box / Pick Up (Sistem Lepas Kunci) | Bebas | 25 \- 50 | Kota Besar | Banyak bisnis butuh antar barang sesekali tapi malas beli / rawat mobil pickup. |
| 73 | Makelar Motor / Mobil Bekas (Tanpa Showroom) | Bebas | 20 \- 45 | Bebas | Bantu jualkan mobil tetangga / teman via FB Marketplace, ambil komisi jual. |
| 74 | Makelar Kost-kostan / Kontrakan | Bebas | 18 \- 30 | Kota Pelajar | Cari info kos kosong, tawarkan online ke maba (mahasiswa baru), minta *fee* dari ibu kos. |
| 75 | Sewa Alat Berat Pertanian (Traktor) | Bebas | 30 \- 55 | Desa | Punya modal beli traktor? Sewakan alat \+ supirnya ke petani sekitar harian. |
| 76 | Sewa PlayStation / Console Game ke Rumah | Bebas | 18 \- 30 | Kota | Antar PS5 / PS4 ke rumah klien. Pasang jaminan (KTP+KK asli). |
| 77 | Dropship Bahan Bangunan | Bebas | 25 \- 45 | Kota / Daerah | Kerja sama dengan panglong / toko besi besar. Anda cari *buyer* via online, kirim dari toko. |
| 78 | Sewa Gaun Pengantin / Jas | Bebas | 25 \- 45 | Kota | Beli gaun bagus dari China (Taobao), sewakan dengan harga lokal premium. |
| 79 | Sewa Kipas Angin Air (Misty Fan) / AC Standing | Bebas | Bebas | Kota | Pelengkap bisnis tenda. Margin sewanya besar. |
| 80 | Makelar Kayu Jati / Bahan Furnitur | Bebas | 30 \- 55 | Kota / Daerah | Jembatan antara pemilik pohon di desa dan pabrik furnitur di kota. |

## **KATEGORI 5: THE LOCAL DIGITAL HUSTLER (Peluang Internet Skala Lokal)**

*Peluang digital yang tidak perlu bersaing secara nasional / internasional. Fokus merajai klien di kota sendiri.*

| No | Ide Bisnis / Skill | Pendidikan Ideal | Usia Ideal | Domisili | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 81 | Admin Sosmed Toko Lokal | Bebas | 18 \- 25 | Kota | Pegang akun IG toko emas, bengkel, atau klinik lokal. Bayaran 1-2 juta / bulan / toko. |
| 82 | Jasa Optimasi Google My Business (GMB) | Bebas | 18 \- 30 | Kota | Bantu bisnis lokal agar muncul di Google Maps "Restoran Terdekat". Tarik biaya *setup*. |
| 83 | Food Reviewer / KOL Lokal (TikTok / IG) | Bebas | 15 \- 30 | Kota / Daerah | Bikin akun spesialis "Kuliner Kota X". Jika sudah besar, terima *endorsement* restoran lokal. |
| 84 | Jasa Fotografi / Video Menu Makanan | Bebas | 18 \- 35 | Kota | Datang ke kafe baru, foto menu pakai *lighting* bagus untuk GoFood / GrabFood mereka. |
| 85 | Host Live Streaming E-commerce (Freelance) | Bebas | 18 \- 30 | Kota Besar | Disewa oleh *brand* lokal untuk jualan 2-3 jam di Shopee / TikTok Live mereka. |
| 86 | Makelar Influencer / KOL Management Lokal | Bebas | 20 \- 35 | Kota | Hubungkan toko-toko di kotamu dengan para *selebgram* lokal. Ambil komisi per *deal*. |
| 87 | Jasa Bikin Web / Landing Page UMKM Lokal | SMK / S1 IT | 18 \- 35 | Kota | Tukang jahit / bengkel butuh web agar terlihat elit. Pakai WordPress / Canva cukup. |
| 88 | Pembuat Filter IG / TikTok Pesta Pernikahan | Bebas | 18 \- 30 | Bebas | Bikin *filter augmented reality* *custom* nama pengantin. Cukup pakai *Spark AR* (gratis). |
| 89 | Jasa Voice Over / Pengisi Suara Iklan Lokal | Bebas | Bebas | Bebas | Mengisi suara untuk iklan radio daerah, video profil sekolah, atau sambutan telepon kantor. |
| 90 | Desainer Grafis / Pembuat PPT Premium | Bebas | 18 \- 35 | Bebas | Merapikan *slide presentasi* untuk bos-bos kantor, dosen, atau anak kuliah yang mau sidang. |
| 91 | Pembuat Video Profil Desa / Sekolah | Bebas | 18 \- 35 | Daerah / Kota | Tawarkan jasa buat video profil *cinematic* pakai *drone* kecil untuk kantor lurah / sekolah. |
| 92 | Jasa Undangan Website & Video (Digital) | Bebas | 18 \- 30 | Bebas | Modalnya cuma *template*. Jual Rp 100rb \- Rp 250rb per undangan. Pasarnya tidak pernah habis. |
| 93 | Dropshipper Sayur / Buah Organik via WA Grup | Bebas | 25 \- 45 | Perumahan Kota | Jualan hasil tani dari desa khusus ke grup ibu-ibu perumahan. |
| 94 | Jasa Hapus Latar Belakang Foto (Clipping Path) | Bebas | 15 \- 25 | Bebas | Target klien: Toko online lokal yang butuh foto katalog polos berlatar putih dengan cepat. |
| 95 | Jasa Setting / Pasang Iklan FB Lokal (Traffic) | Bebas | 20 \- 35 | Kota | Pasang iklan promo kafe baru khusus radius 5 km. Klien bayar jasa \+ *budget* iklan. |
| 96 | Jasa Tulis Caption / Copywriting Katalog | Bebas | 18 \- 30 | Bebas | Jasa *freelance* untuk agen properti atau toko *fashion* lokal yang malas ngetik *caption* IG. |
| 97 | Penyedia Jasa "Talent" untuk Konten UGC | Bebas | 18 \- 30 | Kota | Merekrut orang biasa (User Generated Content) untuk pura-pura review produk *brand* lokal. |
| 98 | Jasa Setup POS (Kasir Digital) Toko / Resto | Bebas | 20 \- 35 | Kota / Daerah | Mendaftarkan & pasang *software* kasir (Moka, Pawoon) untuk pedagang konvensional. |
| 99 | Jasa Digitalisasi Dokumen Kertas | Bebas | 18 \- 30 | Kota Besar | Meng-*scan* dan mengarsipkan ribuan dokumen arsip kantor tua ke *Google Drive / Cloud*. |
| 100 | Jasa Buka Toko Online (Shopee / Tokped Setup) | Bebas | 18 \- 30 | Daerah / Kota | Bantu pedagang pasar / tua mendaftarkan toko, mengunggah foto, dan mengatur deskripsi. |

## **KATEGORI 6: THE GLOBAL CREATIVES (Desain, Video, & Visual)**

*Skill visual sangat disukai di pasar global karena tidak membutuhkan bahasa Inggris se-fasih penulis.*

| No | Ide Bisnis / Skill | Pendidikan | Usia | Platform Utama | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 101 | YouTube Cashcow Video Editor | Bebas | 15 \- 35 | Upwork / Fiverr | Mengedit video dokumenter / alur cerita untuk YouTuber AS yang tidak menampilkan wajah (faceless). |
| 102 | Short-Form Video Repurposer | Bebas | 15 \- 30 | Twitter / IG | Mengubah podcast panjang (Joe Rogan dll) milik klien luar jadi video TikTok / Reels pakai *caption* dinamis. |
| 103 | Thumbnail Designer Spesialis | Bebas | 15 \- 30 | Fiverr / Twitter | Bikin *thumbnail* YouTube. Klien luar rela bayar $20 \- $50 (Rp300rb-750rb) per *thumbnail* ber-CTR tinggi. |
| 104 | UI / UX Designer (Figma) | S1 IT / Desain / Bebas | 18 \- 35 | Dribbble / Upwork | Mendesain tampilan aplikasi / web untuk *startup* luar negeri. Bayaran proyekan $500 \- $2000+. |
| 105 | Webflow / Framer Developer | Bebas (No-Code) | 18 \- 35 | Upwork / Twitter | Mengubah desain Figma jadi website fungsional. Sangat *niche*, rate 30 \- 50 / jam. |
| 106 | Pitch Deck / Presentation Designer | Bebas | 20 \- 40 | Fiverr / Upwork | Merapikan *slide* presentasi investor untuk CEO / Startup di Silicon Valley. |
| 107 | 3D Modeler & Renderer | SMK / S1 Arsitek / IT | 18 \- 35 | CGTrader / Upwork | Bikin aset 3D untuk game (Unreal Engine) atau render arsitektur rumah di AS / Eropa. |
| 108 | Notion Template Creator | Bebas | 18 \- 35 | Gumroad / Twitter | Bikin *template* produktivitas / SOP di Notion, jual dalam dollar. Pendapatan pasif (passive income). |
| 109 | Podcast Audio Editor | Bebas | 18 \- 35 | Upwork / Fiverr | Membersihkan *noise*, *mixing*, dan memotong jeda audio untuk *podcaster* luar negeri. |
| 110 | Font / Typeface Creator | S1 Desain / Bebas | 18 \- 40 | Creative Market | Membuat desain *font* unik, jual lisensinya ke agensi desain global. |

### 

### 

### 

### 

### 

### 

## **KATEGORI 7: THE WORDSMITHS (Penulisan, Bahasa, & Komunikasi)**

*Membutuhkan grammar Bahasa Inggris yang baik, atau kejelian menggunakan tools seperti ChatGPT / Grammarly.*

| No | Ide Bisnis / Skill | Pendidikan | Usia | Platform Utama | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 111 | Direct Response Copywriter | S1 Komunikasi / Bebas | 20 \- 40 | LinkedIn / Upwork | Menulis teks *landing page* atau email promosi untuk toko Shopify di AS / Eropa. |
| 112 | B2B SaaS Blog Writer | S1 IT / Bisnis | 22 \- 40 | ProBlogger | Menulis artikel SEO bahasa Inggris untuk perusahaan *software*. Bayaran per kata (bisa $0.10 / kata). |
| 113 | Twitter / LinkedIn Ghostwriter | Bebas | 20 \- 35 | Twitter / LinkedIn | Menulis *thread* atau postingan untuk *founder / CEO* luar negeri demi *personal branding* mereka. |
| 114 | Subtitle / Caption Translator | S1 Sastra / Bebas | 18 \- 40 | Rev / Upwork | Menerjemahkan video edukasi / film dari Inggris ke Indonesia atau sebaliknya. |
| 115 | Technical Writer | S1 IT / Teknik | 22 \- 45 | Upwork / GitHub | Menulis buku panduan (*documentation*) untuk *software* atau API. Bayaran sangat mahal. |
| 116 | Email Deliverability Specialist | IT / Bebas | 22 \- 40 | Upwork | Jasa teknis memastikan email *marketing* klien luar masuk ke kotak masuk (Inbox), bukan Spam. |
| 117 | Resume / LinkedIn Makeover | S1 HR / Psikologi | 22 \- 40 | Fiverr / LinkedIn | Membantu orang asing (India, Afrika, dll) memoles CV bahasa Inggris agar diterima kerja di AS / Eropa. |
| 118 | Grant Writer (Penulis Proposal) | S1 / S2 | 25 \- 50 | Upwork | Menulis proposal untuk NGO atau *startup* yang ingin mencari dana hibah (*grant*) internasional. |
| 119 | E-book Formatter (KDP Amazon) | Bebas | 18 \- 40 | Fiverr / Upwork | Merapikan naskah mentah (Word) klien agar siap diterbitkan (*layouting*) di Kindle Amazon. |
| 120 | Indonesian Tutor for Foreigners | S1 Sastra / Bebas | 20 \- 45 | iTalki / Preply | Mengajarkan Bahasa Indonesia percakapan kepada *bule* atau ekspatriat via Zoom. |

## **KATEGORI 8: THE GLOBAL OPERATORS (Virtual Assistant & Manajemen)**

*Profesi tulang punggung bisnis. Skill dasar administrasi, tapi dibayar standar internasional.*

| No | Ide Bisnis / Skill | Pendidikan | Usia | Platform Utama | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 121 | Executive Virtual Assistant (EVA) | S1 Manajemen / Bebas | 22 \- 40 | Upwork / Remote.co | Mengatur jadwal, balas email, *booking* tiket pesawat untuk *founder* di AS. Gaji tetap bulanan (500 \- 1500). |
| 122 | Customer Support Ticket Manager | Bebas | 18 \- 35 | Zendesk / Upwork | Membalas komplain pelanggan toko online (Shopify / Amazon) milik klien luar via *chat / email*. |
| 123 | Online Community Manager | Bebas | 18 \- 30 | Discord / Skool / Reddit | Menjadi admin dan meramaikan forum grup kripto / NFT / edukasi milik *creator* luar negeri. |
| 124 | Lead Generation / Data Scraper | Bebas | 18 \- 35 | Upwork / Apollo | Mengumpulkan ribuan data email & kontak calon klien menggunakan *tools*, jual *database*\-nya. |
| 125 | Appointment Setter (DM Closer) | Bebas | 18 \- 30 | IG / LinkedIn | Mengirim pesan (DM) ke akun target prospek, mengajak mereka *meeting* dengan bos Anda. Komisi per *deal*. |
| 126 | E-commerce Product Lister | Bebas | 18 \- 30 | Upwork / Fiverr | Jasa *copy-paste* dan mengunggah (*upload*) ratusan produk ke etalase toko Amazon / eBay klien. |
| 127 | Podcast Booker | Bebas | 20 \- 35 | Upwork / Email | Tugasnya hanya mengirim email ke orang-orang terkenal luar negeri agar mau jadi bintang tamu di *podcast* bos Anda. |
| 128 | Discord Server Architect | IT / Bebas | 15 \- 30 | Fiverr | Membangun server Discord (bikin *role*, *bot*, pengamanan anti-spam) untuk komunitas global. |
| 129 | Airtable / Notion Database Builder | IT / Bisnis | 20 \- 35 | Upwork | Merapikan data perusahaan luar negeri menggunakan aplikasi *database* modern (Airtable). |
| 130 | QA (Quality Assurance) Tester | Bebas | 18 \- 35 | UserTesting.com | Dibayar untuk mencoba / mengetes *website* atau aplikasi baru lalu merekam layarnya jika ada *error / bug*. |

## **KATEGORI 9: THE GROWTH HACKERS (Digital Marketing Global)**

*Kategori paling menguntungkan. Jika Anda bisa mendatangkan uang untuk klien luar, mereka rela bayar mahal.*

| No | Ide Bisnis / Skill | Pendidikan | Usia | Platform Utama | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 131 | Google Ads Specialist (Local US) | Bebas | 20 \- 40 | Upwork | Jalankan iklan Google untuk bisnis lokal AS (contoh: tukang ledeng di Texas). Retainer per bulan $500 / klien. |
| 132 | Pinterest Account Manager | Bebas | 18 \- 35 | Fiverr / Upwork | Orang AS pakai Pinterest untuk belanja. Anda bertugas membuat *pin* rutin untuk menaikkan trafik toko *e-commerce* mereka. |
| 133 | SEO Link Builder (Outreach) | Bebas | 20 \- 35 | Upwork / LinkedIn | Mengirim email ke ratusan *website* bule, merayu agar mereka menaruh *link* klien Anda di web mereka (Backlink). |
| 134 | UGC (User Generated Content) | Bebas | 18 \- 30 | Twitter / IG | *Brand* luar mengirim barang gratis ke Indonesia. Anda buat video TikTok / Reels mereview barang itu pakai bahasa Inggris. |
| 135 | Affiliate Marketing (Clickbank / Amazon) | Bebas | 18 \- 40 | Pinterest / Medium | Promosi link *affiliate* *software* atau suplemen luar negeri tanpa perlu berinteraksi dengan orang. Komisi USD. |
| 136 | Zapier / Make Automation Expert | S1 IT / Bebas | 20 \- 35 | Upwork | Menyambungkan antar aplikasi (misal: Jika ada yang isi form Google, otomatis terkirim WA & masuk Excel). Klien luar bayar mahal untuk *automasi* ini. |
| 137 | Facebook / TikTok Ads Media Buyer | Bebas | 20 \- 35 | Upwork | Mengelola dana iklan ribuan dollar milik toko e-commerce luar negeri. Biasa dibayar sistem *revenue share* (bagi hasil omset). |
| 138 | Dropship to US (Shopify) | Bebas | 18 \- 35 | Shopify / AliExpress | Bikin web di Shopify, pasarkan ke orang Amerika. Jika laku, barang dikirim dari pabrik di China langsung ke pembeli di AS. |
| 139 | Cold Email Campaign Manager | Bebas | 20 \- 35 | Upwork / Instantly | Mengatur *software* pengirim ribuan *email marketing* harian tanpa masuk *folder* SPAM. |
| 140 | Conversion Rate Optimization (CRO) | S1 IT / Bisnis | 22 \- 40 | Upwork | Menganalisa *website* toko luar, menyarankan ubah warna tombol / teks agar pembeli meningkat. |

## **KATEGORI 10: NICHE EXPERTS & DROP SERVICING (Tingkat Lanjut)**

*Bagi yang punya modal jaringan, atau ingin membuka "Agensi Internasional" dari kamar tidur.*

| No | Ide Bisnis / Skill | Pendidikan | Usia | Platform Utama | Keterangan Singkat / Cara Kerja |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 141 | Drop Servicing Agency (Arbitrage) | S1 Bisnis / Bebas | 20 \- 40 | LinkedIn / Fiverr | Cari klien bule dengan harga $1000 untuk buat *website*. Lempar proyeknya ke *freelancer* Indonesia dengan harga $300. Anda kantongi $700. |
| 142 | Remote Travel Planner (Bali / Lombok) | Bebas | 20 \- 40 | IG / Fiverr | Bule yang mau ke Bali butuh *itinerary* detail rahasia (bukan jalur *mainstream* turis). Bikin jadwal, kenakan tarif konsultasi. |
| 143 | Spotify Playlist Curator | Bebas | 18 \- 35 | SubmitHub / Playlist | Bikin playlist Spotify (contoh: *Study Lo-Fi*). Jika *followers* banyak, musisi indie luar negeri akan bayar Anda agar lagunya masuk *playlist* tersebut. |
| 144 | Music / Beat Producer | Bebas | 15 \- 35 | BeatStars / YouTube | Bikin nada dasar (*beat*) Hip-Hop / Pop. Rapper / Penyanyi luar negeri akan beli lisensinya dari Anda (sistem royalti). |
| 145 | Voice Over Artist (Bhs Indonesia) | Bebas | 20 \- 45 | Fiverr / Upwork | Perusahaan multinasional yang mau masuk Indonesia butuh pengisi suara lokal untuk video penjelasan perusahaan (*explainer video*) mereka. |
| 146 | Shopify Store Developer | S1 IT / Bebas | 20 \- 35 | Upwork / Shopify | *Setup* *website* toko online dari nol pakai *template* premium untuk klien luar. |
| 147 | Discord / Telegram Crypto Moderator | Bebas | 18 \- 30 | Telegram / Discord | Dibayar dalam bentuk koin kripto (USDT) mingguan / bulanan untuk menjaga agar grup proyek koin luar negeri tidak dimasuki *scammer*. |
| 148 | Print on Demand (Etsy / Redbubble) | Bebas | 18 \- 35 | Etsy / Midjourney | Bikin desain gambar (bisa dibantu AI), *upload* ke *website*. Jika orang AS beli kaos / gelas bergambar itu, pabrik di AS yang cetak & kirim. Anda dapat royalti. |
| 149 | Etsy Digital Printables | Bebas | 18 \- 35 | Etsy / Canva | Jualan *file* PDF digital (Jadwal diet, *wedding planner*, *flashcard* anak) yang bisa dicetak sendiri oleh pembeli di luar negeri. |
| 150 | Software Tester (Game / App) | Bebas | 15 \- 30 | Tester Work / uTest | Dibayar per *bug / error* yang Anda temukan saat memainkan *game* atau mencoba *software* buatan luar negeri sebelum dirilis. |

## **TABEL MONETISASI: MODUL 1 (THE HUSTLER)**

### **1\. Kategori: THE RURAL HUSTLER (Desa / Semi-Kota)**

*Target market ini butuh hal yang sangat praktis, bisa langsung dikerjakan pakai tangan, dan alat yang mudah didapat.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Produk Digital (B2C)** | E-Book / Panduan Teknis Singkat | Jualan panduan: *"SOP Budidaya Maggot Modal Sampah"* atau *"Daftar Pengepul Kardus Terbesar di Tiap Provinsi"*. | Rp 49.000 \- Rp 99.000 / produk |
| **Affiliate E-Commerce** | Shopee / Tokopedia Affiliate | Di dalam artikel *"Cara Ternak Lele Bioflok"*, sisipkan link beli terpal kolam, aerator, & bibit. *Duit.co.id* dapat komisi per klik / beli. | 2% \- 5% dari harga barang |
| **CPA (Cost Per Action)** | Referral Bank Digital & PPOB | Sisipkan link pendaftaran agen BRILink, Bank Neo, atau Seabank. *"Butuh rekening tanpa biaya admin? Daftar di sini."* | Rp 25.000 \- Rp 50.000 / pendaftar |
| **Lead Gen (B2B)** | Pertanian / P2P Lending | Jika mereka butuh modal pupuk, *Duit.co.id* lempar data mereka ke P2P Lending Pertanian (misal: Amartha / Crowde). | Komisi referral dari platform |

### **2\. Kategori: THE EDUCATED EXPERT (S1 / S2 Konsultan Lokal)**

*Target market ini butuh terlihat profesional di depan klien (UMKM / Bos lokal) tanpa harus hire karyawan.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Produk Digital (B2C)** | *Template & Business Kit* | Jual *"Legal Kit untuk Konsultan UMKM"* (Template draft PT, Perjanjian Kerja, Invoice Excel otomatis). | Rp 99.000 \- Rp 150.000 / bundle |
| **Premium Directory** | *Subscription* (Langganan Bulanan) | *Duit.co.id* bikin halaman **"Cari Ahli"**. Para sarjana ini bayar bulanan agar profil jasa mereka dipajang di web kita. | Rp 50.000 / bulan / orang |
| **SaaS Affiliate** | *Software Referral* | Rekomendasikan *software* pembukuan (Accurate / Jurnal.id) di artikel "Virtual Bookkeeper". | Rp 100rb \- 300rb / *closing* (SaaS komisi tinggi) |
| **Webinar Berbayar** | *Masterclass Series* | *Duit.co.id* undang Konsultan Legal senior. Jual tiket Zoom: *"Cara Tembus Proyek Audit Pabrik"* | Rp 100.000 \- Rp 150.000 / tiket |

### **3\. Kategori: THE URBAN BLUE COLLAR (Jasa Praktis Kota)**

*Mereka punya skill teknis (cuci AC, poles lantai, salon hewan), tapi tidak tahu cara marketing dan SOP pelayanan.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Produk Digital (B2C)** | *Marketing Script & SOP* | Jual *"SOP Seragam & Layanan Bintang 5 Jasa Cuci AC"* atau *"Script WA Broadcast untuk Tawarkan Promo ke Kafe Lokal"*. | Rp 49.000 \- Rp 99.000 / produk |
| **B2B Partnership / Makelar Alat** | Jualan "Business in a Box" | *Duit.co.id* kerja sama dengan importir. Jual *"Paket Usaha Deep Cleaning Kasur"* (Mesin Vacuum \+ Chemical \+ Pelatihan Marketing). | Margin Rp 500rb \- Rp 1 Juta / paket terjual |
| **Lead Gen (Sewa Jasa)** | Jembatan ke Manajemen | *Duit.co.id* (lewat Properti.id) butuh tim maintenance kos-kosan. Kita rekrut lulusan dari kategori ini, kita dapat margin perbaikan. | 10% \- 20% dari nilai proyek |
| **Affiliate E-Commerce** | Shopee / Tokopedia Affiliate | Link pembelian alat-alat salon mobil panggilan, alat *grooming* kucing, makeup (MUA kit). | 2% \- 5% dari harga barang |

### **4\. Kategori: THE ASSET RENTERS & ARBITRAGE (Sewa Barang)**

*Target market ini butuh legalitas agar barang tidak dibawa kabur, dan butuh cara menghitung penyusutan barang.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Produk Digital (B2C)** | *Legal Draft & Excel Tool* | Jual *"Template Kontrak Sewa Alat Anti-Maling"* \+ *"Excel Kalkulator ROI (Balik Modal) Bisnis Sewa"*. | Rp 99.000 / bundle |
| **Referral Multifinance** | Leasing Makelar | Artikel *"Cara Bisnis Sewa Pick-Up"*. Jika mereka butuh kredit mobil, klik link dari kita. Kita kerjasama dengan ACC / BFI Finance. | Rp 500rb \- Rp 1 Juta / kredit cair |
| **Marketplace Fee** | (Future Plan) | *Duit.co.id* bikin fitur forum "Sewa Alat Antar Kota". *Duit.co.id* pakai sistem Escrow (Rekening Bersama) ambil potongan transaksi. | 3% \- 5% dari total sewa |

### **5\. Kategori: THE LOCAL DIGITAL HUSTLER (Digital Skala Lokal)**

*Mereka jualan jasa internet (sosmed, web, desain) khusus untuk bos-bos atau kafe di kota mereka sendiri.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Affiliate Hosting & Domain** | *High Payout Affiliate* | Artikel *"Cara Jasa Bikin Web UMKM"*. Mereka harus beli hosting. Arahkan pakai link *Duit.co.id* (Niagahoster / Hostinger). | Komisi hingga 70% dari nilai hosting\! (Bisa Rp 500rb / sale) |
| **Produk Digital (B2C)** | Template Design (Canva / PPT) | Jual *"100 Template Canva Menu Kafe Lokal"* atau *"Template Proposal Penawaran Jasa Kelola IG"*. | Rp 99.000 \- Rp 149.000 |
| **Software Affiliate** | *Tools* Kasir / CRM | Rekomendasikan Moka POS / Pawoon di artikel *"Jasa Setup Kasir Kafe"*. | Komisi referral Rp 100rb \- 200rb |
| **E-Course B2C** | Video Tutorial | Jual E-Course singkat *"Cara Mendominasi Google Maps (GMB) untuk Restoran Daerahmu"*. | Rp 150.000 / Akses |

### **6\. Kategori: THE GLOBAL FREELANCERS (Peluang Internet USD)**

*Target market ini potensinya paling besar. Mereka bisa dapat ribuan Dollar, sehingga mereka rela keluar modal edukasi lebih mahal di depan.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Produk Digital (Mid-Ticket)** | *Global Freelance Kit* | Jual *"Ultimate Upwork Winning Template"*, *"Script Cold Email Inggris"*, dan *"Cara Bikin Resume Tembus Klien US"*. | Rp 199.000 \- Rp 299.000 / bundle |
| **USD Affiliate CPA** | Gateway & Finansial Global | Wajibkan mereka pakai **Payoneer** atau **Wise** untuk narik Dollar ke Rupiah. Pakai *link referral* kita. | $25 \- $50 (Rp 400rb \- 800rb) per akun aktif |
| **Software Affiliate Global** | *Tools Pro* | *Link affiliate* untuk Figma, Adobe, Shopify, Webflow, Instantly, Canva Pro. | Komisi 20-30% bulanan dalam USD |
| **Bootcamp Eksklusif** | *High-Ticket B2C* | *Mentorship* 1 bulan *"Zero to $1000 Pertama sebagai Copywriter Internasional"*. Bekerja sama dengan *expert*. | Rp 1.000.000 \- Rp 2.500.000 / orang |

## 

## **KURIKULUM MODUL 2: THE SCALER (Growth & Optimization)**

### **KATEGORI 2.1: FINANCIAL DEFENSE & CASHFLOW MASTERY**

*Fokus: Mengamankan uang hasil lelah dari Modul 1 agar tidak menguap untuk foya-foya, dan memisahkan nyawa pribadi dengan nyawa bisnis.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Profil Modul 1 |
| :---- | :---- | :---- |
| **1\. Jebakan "Lifestyle Creep" & Inflasi Gaya Hidup** | Psikologi uang: Mengapa penghasilan 50jt tapi tabungan tetap 0\. Aturan *"Parkinson's Law"* dalam keuangan pribadi. | Pekerja *Global Freelance* (USD) atau *Blue Collar* yang tiba-tiba pegang uang cash besar rentan beli mobil / gadget kredit konsumtif. |
| **2\. Pemisahan Entitas (Rekening Pribadi vs Bisnis)** | Cara menggaji diri sendiri. Pemilik bisnis TIDAK BOLEH mengambil uang kasir untuk jajan. Menentukan *Owner's Salary*. | Semua profil Modul 1\. Tukang sewa genset atau makelar sayur sering bangkrut karena uang omset dipakai biaya hidup. |
| **3\. Konsep "War Chest" (Dana Perang Bisnis)** | Mengalokasikan persentase laba untuk: 1\. Pajak, 2\. Dana Darurat Bisnis (6 bulan operasional), 3\. R\&D / Ekspansi. | *Educated Expert* (Konsultan S1) butuh dana untuk sewa kantor atau *upgrade* lisensi *software* berbayar tahunan. |
| **4\. Dasar-dasar Paper Asset (Parkir Uang Aman)** | Mengenalkan Reksadana Pasar Uang (RDPU) dan SBN (Surat Berharga Negara) sebagai tempat parkir uang bisnis agar tahan inflasi. | Mencegah uang nganggur di rekening bank biasa yang habis oleh biaya admin, tapi tetap likuid saat mau ditarik. |

### **KATEGORI 2.2: SYSTEMATIZATION (Sistematisasi & SOP)**

*Fokus: Memindahkan ilmu yang ada di "kepala" si founder menjadi "tulisan" agar bisnis bisa dijalankan orang bodoh sekalipun.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Profil Modul 1 |
| :---- | :---- | :---- |
| **1\. Visualisasi Alur Kerja (Workflow Mapping)** | Membedah siklus bisnis dari A-Z (Cara cari klien \-\> Cara eksekusi \-\> Cara menagih bayaran). Mencari *bottleneck* (kemacetan). | *Rural Hustler* (Makelar Sayur) bikin alur: Jam berapa panen, jam berapa *packing*, jam berapa diserahkan ke kurir logistik. |
| **2\. Pembuatan SOP Berbasis Video & Checklist** | SOP tidak harus tebal seperti buku kampus. Cara merekam layar (Loom) atau merekam HP saat bekerja sebagai modul training karyawan baru. | *Local Digital Hustler* merekam cara dia membalas DM pelanggan atau cara dia mengedit video di CapCut, lalu dijadikan *checklist*. |
| **3\. Automasi Digital Dasar (No-Code Tools)** | Menggantikan kerja manual manusia dengan *software* (Contoh: Auto-reply WA, Zapier, Google Form ke Excel otomatis). | *Urban Blue Collar* (Jasa Cuci AC) tidak lagi mencatat jadwal pakai buku tulis, tapi pakai Google Calendar otomatis dari form *booking*. |
| **4\. Quality Control (QC) & Standarisasi Output** | Bagaimana memastikan kualitas kerja karyawan sama bagusnya dengan kualitas kerja pemilik bisnis. | MUA Spesialis di Modul 1 membuat standar *makeup* yang harus diikuti asistennya agar klien tidak komplain. |

### **KATEGORI 2.3: DELEGATION & TEAM BUILDING (Penggandaan Waktu)**

*Fokus: Mengubah tenaga kerja dari otot sendiri menjadi otot orang lain tanpa kehilangan kontrol.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Profil Modul 1 |
| :---- | :---- | :---- |
| **1\. The "First Hire" Framework** | Siapa yang harus direkrut duluan? (Admin Penjualan vs Teknisi/Eksekutor). Cara menghitung apakah kita mampu bayar gaji. | *Konsultan Legal* tidak lagi mengetik *draft* kontrak. Dia merekrut staf paralegal, dia hanya cek akhir (*review*) dan tanda tangan. |
| **2\. Manajemen Kompensasi (Gaji vs Komisi)** | Cara menggaji tim agar tidak membebani arus kas saat sepi. Sistem *Base Salary \+ Profit Sharing / Bonus KPI*. | Makelar sayur merekrut *Host TikTok Live*. Jangan gaji tetap besar, beri gaji UMR \+ Komisi 2% dari total penjualan *Live*. |
| **3\. Kepemimpinan Jarak Jauh (Remote Management)** | Cara mengelola *Freelancer* atau tim yang bekerja dari rumah (WFH) menggunakan Notion, Trello, atau Asana. | *Global Freelancer* berubah jadi Agensi (*Drop Servicing*). Dia melempar *project* desain dari bule ke 3 desainer junior lokal via Trello. |
| **4\. Psikologi Delegasi (Letting Go)** | Mengatasi penyakit *Micromanagement* ("Ah, kalau dikerjakan orang lain jelek, mending gue kerjain sendiri"). | Mengajarkan pemilik alat *Sewa Genset / Panggung* untuk percaya pada mandor lapangannya. |

### **KATEGORI 2.4: REVENUE SCALING (Melipatgandakan Omset Secara Sistematis)**

*Fokus: Mengubah cara mencari klien dari yang tadinya "Eceran" menjadi "Grosiran" (B2B).*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Profil Modul 1 |
| :---- | :---- | :---- |
| **1\. Pivot B2C ke B2B (Mencari Klien Korporat)** | Berhenti melayani ratusan pelanggan kecil, mulai melayani 5 perusahaan besar. Cara presentasi (*Pitching*) ke Manajer/HRD. | *Jasa Cuci Mobil Panggilan* (Modul 1\) bikin kontrak B2B mencuci mobil operasional kantor Bank setiap jumat sore. Omset langsung pasti. |
| **2\. Model Bisnis Retainer (Langganan Bulanan)** | Cara mengubah jasa putus menjadi jasa langganan berulang (Recurring Revenue). MRR (*Monthly Recurring Revenue*). | Tukang cuci kasur/AC menawarkan paket "Membership 1 Tahun (4x cuci gratis perbaikan)" ke ibu-ibu perumahan. |
| **3\. Upselling & Cross-Selling Ekosistem** | Menaikkan nilai transaksi per pelanggan (LTV / *Lifetime Value*). Jangan biarkan pelanggan beli satu barang saja. | *Jasa Undangan Web* (Digital Hustler) juga menawarkan jasa buku tamu digital, filter IG *wedding*, dan dokumentasi video (*Bundle Package*). |
| **4\. Skalabilitas Anggaran Iklan (Paid Ads Scale-Up)** | Cara memutar uang dari laba bulan lalu ke Facebook/TikTok Ads. Rumus ROAS (*Return on Ad Spend*). Jika masuk Rp 10rb keluar Rp 30rb, maka bakar uang lebih banyak. | *Global E-commerce (Dropshipper)* yang tadinya iklan organik, mulai membakar ribuan Dollar di FB Ads dengan perhitungan matematis yang aman. |

### **KATEGORI 2.5: BANKABILITY & LEGAL STRUCTURING (Jembatan ke Tier 3\)**

*Fokus: Mempersiapkan bisnis agar terlihat seksi dan kredibel di mata Bank, Investor, atau Pemilik Franchise (untuk lanjut ke Modul 3).*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Profil Modul 1 |
| :---- | :---- | :---- |
| **1\. Merapikan Laporan Keuangan (Laba Rugi & Neraca)** | Beralih dari catatan buku kas ke aplikasi akuntansi standar (Jurnal). Membaca rasio kesehatan bisnis (Margin Laba Bersih, Beban Opr). | Semua profil bisnis harus punya Laporan Laba Rugi rapi minimal 6-12 bulan berturut-turut untuk langkah selanjutnya. |
| **2\. Legalitas Badan Usaha Tahap Menengah** | Kapan harus *upgrade* dari CV / PT Perorangan menjadi PT Biasa (Perseroan Terbatas)? Implikasi pajak dan tanggung jawab hukum. | Konsultan Agensi atau Vendor Skala Lokal yang omsetnya mulai mendekati Rp 4,8 Miliar per tahun wajib menjadi PKP (Pengusaha Kena Pajak). |
| **3\. Mengelola Skor Kredit Pribadi (SLIK OJK)** | Cara membersihkan nama dari pinjol masa lalu. Cara membangun histori kredit dengan *Credit Card Secured* atau pinjaman kecil tepat waktu. | Jika *Asset Renter* mau sewa gudang besar atau *Blue Collar* mau beli 5 mobil box baru, mereka butuh skor BI Checking yang mulus. |
| **4\. Pajak UMKM & Pribadi (Dasar Kepatuhan)** | Penjelasan PPh Final 0.5% UMKM vs Pajak Pribadi. Memanfaatkan SPT untuk "mencuci" harta agar diakui negara. | Mengedukasi agar mereka tidak kaget saat nanti di Tier 3 beli properti miliaran dan ditanya petugas pajak *"Uangnya dari mana?"* |

### **TABEL MONETISASI: MODUL 2 (THE SCALER)**

#### **2.1 FINANCIAL DEFENSE & CASHFLOW MASTERY**

*Target: Menghentikan kebocoran uang dan mulai memarkirkan uang dingin ke instrumen paper-asset.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Produk Digital Premium** | Advanced Financial Tool | Jualan *"CEO Cashflow Dashboard"* (Template Notion/Excel canggih yang memisahkan uang pribadi, kas bisnis, & pajak otomatis). | Rp 249.000 \- Rp 399.000 |
| **Lead Gen (B2C Premium)** | Konsultasi CFP (Certified Financial Planner) | User bingung kelola uang 50jt/bulan? *Duit.co.id* arahkan ke partner CFP untuk *1-on-1 Zoom call* audit keuangan. | Komisi 20% \- 30% dari tarif CFP (Bisa Rp 200rb \- 500rb / *deal*) |
| **Affiliate / Referral** | Agen Reksadana / SBN | Di artikel *"Cara Parkir Dana Darurat Bisnis"*, beri link buka akun Bibit / Bareksa kelas prioritas. | Sesuai kebijakan broker (CPA) |
| **Asuransi B2B & Key-Person** | Referral Broker Asuransi | Bisnis bergantung pada si bos. Jual *lead* ke agen asuransi jiwa (Key-Person Insurance) dengan premi besar bulanan. | Komisi referral / *Finder's Fee* tinggi |

#### **2.2 SYSTEMATIZATION & SOP**

*Target: Mengubah kerja manual menjadi otomatis menggunakan software dan SOP agar pemilik bisnis bisa liburan.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **SaaS Affiliate (Recurring\!)** | Rekomendasi Software Otomasi | Wajibkan/sarankan mereka pakai **Zapier, Make, Notion Premium, Trello, Google Workspace**. Gunakan link affiliate. | **Pendapatan Pasif Bulanan** (20-30% dari langganan mereka per bulan, selamanya\!) |
| **Produk Digital B2B** | SOP Blueprint / *Done-for-You* | Jual *"Master Bundle SOP Bisnis"* (Berisi 50+ SOP video/teks siap pakai untuk CS, Admin, HR, Gudang). | Rp 499.000 \- Rp 999.000 / bundle |
| **Premium Service** | Jasa Setup Notion/Sistem Bisnis | *Duit.co.id* punya tim (atau lempar ke vendor) untuk membangun *workspace* Notion/SOP digital khusus perusahaan klien. | Rp 2.500.000 \- Rp 5.000.000 / *setup* |

#### **2.3 DELEGATION & TEAM BUILDING (Penggandaan Waktu)**

*Target: Membantu mereka merekrut, menggaji, dan memecat orang dengan benar tanpa melanggar hukum ketenagakerjaan.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **SaaS Affiliate B2B** | Software HR & Payroll | Di artikel *"Cara Gaji Tim Anti Pusing"*, referensikan Mekari Talenta atau Gadjian. | Komisi Referral SaaS B2B sangat besar (Bisa Rp 500rb \- 1 Juta / closing) |
| **Produk Digital HR** | Dokumen Legal HR / *HR Kit* | Jual *"HR Legal Kit"* (Draft PKWT/PKWTT sesuai UU Ciptaker, Surat Peringatan 1-3, Template KPI Bulanan). | Rp 299.000 / bundle |
| **B2B Matchmaking** | Rekrutmen / Headhunter Niche | *Duit.co.id* bikin **"Job Board"**. Karena kita punya database *Hustler* di Tier 1, kita jual akses database/iklan lowongan kerja ke bos-bos Tier 2\. | Biaya pasang loker Rp 150.000 / slot, atau komisi rekrutmen. |

#### **2.4 REVENUE SCALING (Melipatgandakan Omset)**

*Target: Membantu mereka mendapatkan klien korporat (B2B) yang nilai transaksinya puluhan hingga ratusan juta.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Produk Digital Premium** | Kit Pitching B2B | Jual *"The B2B Closer Kit"* (Template Pitch Deck PPT level korporat, draft kontrak Retainer, *script follow-up* direktur). | Rp 349.000 \- Rp 500.000 |
| **SaaS Affiliate** | Software Email / CRM | Untuk skala *paid ads* / B2B *outreach*, referensikan *tools* mahal seperti Apollo.io, HubSpot, Mailchimp, Meta Ads Manager guide. | Komisi afiliasi USD 20-30% |
| **Lead Gen Agency** | Lempar Klien ke Digital Agency | User butuh tim untuk pegang *budget* iklan Rp 50 juta/bulan? *Duit.co.id* lempar data klien ini ke *Digital Marketing Agency* partner kita. | *Agency Referral Fee* 10% dari nilai kontrak bulan pertama. |
| **High-Ticket Webinar** | *Exclusive Mastermind* | "Cara Meraih Kontrak B2B Rp 100 Juta Pertama Anda bersama Pakar B2B Sales". | Tiket VIP Rp 500.000 \- Rp 1.000.000 |

#### **2.5 BANKABILITY & LEGAL STRUCTURING (Jembatan ke Tier 3\)**

*Target: "Mencuci" dan merapikan bisnis mereka agar diakui negara (PT) dan bank, supaya nanti siap beli franchise/properti.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **SaaS Affiliate Finance** | Software Akuntansi B2B | Di artikel *"Pentingnya Laba Rugi untuk Pinjam Bank"*, sisipkan link affiliate Jurnal.id / Accurate. | Komisi Rp 300.000 \- Rp 1 Juta / closing langganan tahunan. |
| **B2B Lead Generation** | Referral Konsultan Pajak & Legal | Jika bisnis mereka butuh lapor SPT Tahunan Badan atau mau urus pendirian PT, *Duit.co.id* arahkan ke Biro Jasa Hukum / Kantor Akuntan Publik (KAP) partner. | Komisi 15% \- 20% dari nilai jasa urus PT/Pajak (Anda dapat Rp 1 \- 2 Juta per klien). |
| **Kredit Modal Kerja Broker** | Referral ke Bank / P2P Produktif | Bisnis butuh suntikan dana Rp 500 Juta untuk ekspor? Karena laporan mereka sudah rapi dari belajar di *Duit.co.id*, kita lempar ke Bank (Mandiri/BCA) / KoinWorks. | *Bank Referral Fee* 0.5% \- 1% dari pinjaman cair. (Cair 500 Juta \= Anda dapat Rp 2.5 \- 5 Juta). |
| **Credit Repair Guide** | E-Book/Konsultasi | Panduan *"Cara Membaca dan Membersihkan SLIK OJK dalam 6 Bulan"*. | Rp 199.000 / produk |

---

### **Strategi Eksekusi: "The Ascension Model" (Model Kenaikan Kelas)**

Kehebatan dari model bisnis Anda adalah kemampuannya menahan *Customer Lifetime Value* (CLTV) tetap di dalam ekosistem.

1. **Orang yang sama dari Tier 1:** Budi yang dulu beli *"Template Jualan Sayur"* seharga Rp 49.000 (saat miskin), kini usahanya sukses dan omsetnya 50 juta/bulan.  
2. Dia kembali ke *Duit.co.id* karena percaya dengan platform Anda.  
3. Sekarang, dia butuh mendirikan PT, butuh *software* akuntansi, dan butuh rekrut admin.  
4. Anda memonetisasi Budi lagi\! Kali ini, Budi membeli *Bundle SOP* Rp 500.000, langganan Jurnal.id (Anda dapat *fee* 500rb), dan bayar jasa buat PT (Anda dapat komisi broker 1 Juta).  
5. **Satu user (Budi) yang awalnya hanya menyumbang Rp 49.000, kini menghasilkan Rp 2.000.000+ untuk Duit.co.id.** Tanpa Anda harus *marketing* cari pelanggan baru secara berlebihan.

## **KURIKULUM MODUL 3: THE ASSET BUILDER (Wealth Creation)**

### **KATEGORI 3.1: THE INVESTOR MINDSET & CAPITAL ALLOCATION**

*Fokus: Mengubah cara pikir dari seorang "Operator Bisnis" menjadi "Alokator Modal". Menghentikan kebiasaan menyimpan uang tunai miliaran di bank.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Modul Sebelumnya / Tujuan |
| :---- | :---- | :---- |
| **1\. Transisi Kuadran: Dari "S" (Self-Employed) ke "I" (Investor)** | Mengapa bisnis Anda di Modul 2 sebenarnya belum *passive income*. Perbedaan bekerja *di dalam* bisnis vs bekerja *di atas* aset. | Menyadarkan bos-bos Tier 2 bahwa mereka masih bisa *burnout* jika uangnya tidak segera dibelikan aset fisik. |
| **2\. Memerangi "Pajak Siluman" (Inflasi)** | Hitung-hitungan matematis mengapa menyimpan Rp 5 Miliar di deposito bank adalah kerugian. Pentingnya mencari instrumen dengan *Yield* di atas 7%. | Persiapan mental sebelum membeli franchise atau properti miliaran rupiah. |
| **3\. Strategi "Tiga Keranjang Dana" (Three Buckets)** | Cara membagi uang dingin miliaran ke dalam: 1\. *Liquidity Bucket* (SBN/Reksadana), 2\. *Growth Bucket* (Saham), 3\. *Cashflow Bucket* (Properti/Franchise). | Memberikan kerangka (framework) berinvestasi yang aman agar tidak jatuh miskin karena salah investasi. |
| **4\. Seni Melakukan**  | Cara membaca proposal investasi bisnis / tawaran *partnership* agar tidak tertipu investasi bodong berbaju agama atau persahabatan. | Orang kaya adalah target empuk penipu. Ini adalah *financial defense* level miliarder. |

### **KATEGORI 3.2: COMMERCIAL PROPERTY PLAYBOOK (Jembatan ke Properti.id)**

*Fokus: Membeli, membangun, dan mengoptimalkan aset keras (tanah/bangunan) sebagai mesin pencetak uang bulanan.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Modul Sebelumnya / Tujuan |
| :---- | :---- | :---- |
| **1\. Matematika Properti: *Cap Rate, ROI, & Payback Period*** | Cara menghitung apakah sebuah ruko seharga Rp 3 Miliar layak dibeli. Jangan beli pakai insting, beli pakai kalkulator *Yield*. | Mengedukasi mereka agar siap dieksekusi oleh tim manajemen **Properti.id**. |
| **2\. Ekonomi Kos-kosan & Co-Living** | Strategi mengubah rumah tua/tanah nganggur menjadi *cashflow* bulanan. Desain ruang, fasilitas pencetak cuan (laundry/wifi koin), dan penentuan harga sewa. | Bos sukses di Modul 2 pasti ingin punya "kos-kosan elit" sebagai pensiun dini. |
| **3\. Properti Komersial (Menyewakan ke Minimarket/Bank)** | *Checklist* syarat tanah/ruko yang akan disewa oleh Indomaret, Alfamart, atau Bank. (Luas parkir, akses jalan, radius kompetitor). | Mengamankan kontrak jangka panjang (5-10 tahun) untuk kepastian *passive income*. |
| **4\. Flipping Properti Kusam menjadi Emas** | Mencari properti sitaan bank (lelang) dengan harga miring, renovasi minor, lalu disewakan atau dijual kembali (Capital Gain). | Solusi bagi yang ingin memutar modal cepat dengan keuntungan ratusan juta sekali transaksi. |

### **KATEGORI 3.3: FRANCHISE & BUSINESS ACQUISITION (Jembatan ke Franchise.id)**

*Fokus: Mengapa harus membangun bisnis dari nol (seperti di Modul 1 & 2\) jika Anda punya uang untuk membeli bisnis yang sudah pasti untung?*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Modul Sebelumnya / Tujuan |
| :---- | :---- | :---- |
| **1\. Anatomi *Franchise* yang Sehat** | Cara membedah FDD (*Franchise Disclosure Document*). Waspada biaya tersembunyi: *Royalty fee, Marketing fee, Kewajiban suplai bahan baku*. | Memandu *user* agar cerdas sebelum memilih *brand* di direktori **Franchise.id**. |
| **2\. Model *Operator* vs *Auto-Pilot*** | Penjelasan tingkat keterlibatan. Beli gerai minuman (butuh dikontrol) vs Beli Indomaret/Apotek K-24 (sistem dari pusat, Anda hanya terima laporan laba). | Bos super sibuk akan diarahkan ke franchise *Auto-Pilot* berharga premium. |
| **3\. Strategi *Multi-Unit Franchising*** | Mengapa punya 5 gerai *franchise* kelas menengah (misal: Mixue/Kopi Kenangan) lebih aman daripada 1 restoran mewah besar. Skala ekonomi bahan baku. | Melatih mindset ekspansi masif. Jika 1 berhasil, langsung duplikasi. |
| **4\. Akuisisi Bisnis Lokal (M\&A Skala Kecil)** | Jangan bikin *Laundry* / Bengkel baru. Cari bengkel yang mau bangkrut tapi lokasinya bagus, beli murah, lalu suntik SOP yang dipelajari di Modul 2\. | Menggunakan ilmu Modul 2 (Sistematisasi) untuk memperbaiki bisnis orang lain yang diakuisisi. |

### **KATEGORI 3.4: ADVANCED PAPER ASSETS & PORTFOLIO**

*Fokus: Kendaraan investasi di pasar modal bagi mereka yang tidak ingin direpotkan dengan urusan karyawan atau bangunan fisik.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Modul Sebelumnya / Tujuan |
| :---- | :---- | :---- |
| **1\. *Dividend Investing* (Saham Pencetak Uang Tunai)** | Memilih saham perbankan (BBCA, BBRI) atau batu bara pembagi dividen besar. Target: Hidup hanya dari bunga dividen. | Solusi pasif absolut tanpa manajemen fisik sama sekali. |
| **2\. Obligasi Korporasi & SBN Skala Besar** | Memarkir uang Rp 5 \- 10 Miliar di Surat Berharga Negara untuk mendapatkan transferan kupon tetap (Fixed Income) setiap bulan dari negara. | Tempat parkir "Dana Perang" terbesar sebelum dipecah ke aset properti. |
| **3\. Menjadi *Angel Investor* / Pemodal Pasif** | Cara menyuntikkan dana ke bisnis teman / *startup* (Modul 2\) dengan skema bagi hasil (*Profit Sharing*) atau *Convertible Note* (Hutang jadi Saham). | Menghubungkan orang kaya di Modul 3 dengan pengusaha brilian namun kurang modal di Modul 2\. |
| **4\. Diversifikasi Mata Uang & Saham Global** | Melindungi kekayaan dari risiko pelemahan Rupiah dengan membeli saham S\&P 500 (Apple, Microsoft) via broker resmi. | Persiapan menuju pengelolaan kekayaan internasional di Tier 4\. |

### **KATEGORI 3.5: STRATEGIC LEVERAGE & TAX PLANNING (Persiapan Tier 4\)**

*Fokus: Rahasia orang kaya semakin kaya: Mereka menggunakan uang bank untuk membeli aset, dan menggunakan beban hutang untuk menurunkan pajak.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Kaitan dengan Modul Sebelumnya / Tujuan |
| :---- | :---- | :---- |
| **1\. OPM (Other People's Money): Hutang Baik vs Hutang Buruk** | Cara mengambil Kredit Modal Kerja atau KPR Komersial miliaran rupiah. Bunga bank 8%, properti hasilkan 12% \= Profit 4% tanpa pakai modal sendiri. | Laporan keuangan yang dirapikan di Modul 2 kini dicairkan menjadi hutang produktif miliaran di Modul 3\. |
| **2\. Menyiasati Pajak Melalui Pembelian Aset** | Mengapa bos membeli mobil atau Ruko atas nama PT (Perusahaan)? Karena nilai penyusutannya bisa mengurangi beban pajak korporat. | Transisi dari mindset "Takut Pajak" menjadi "Mengoptimalkan Peraturan Pajak secara Legal". |
| **3\. *Exit Strategy* Bisnis Lama** | Cara valuasi (menilai harga) bisnis aktif Anda di Modul 2 jika suatu saat ingin Anda jual ke investor lain (*Venture Capital*). | Puncak kesuksesan Modul 2: Bisnisnya laku dijual miliaran rupiah. |
| **4\. Mitigasi Risiko Multi-Aset** | Membeli Asuransi Properti (All-Risk) untuk kos-kosan/ruko, dan Asuransi *Key-Person* miliaran untuk melindungi istri/anak jika bos meninggal. | Pertahanan terakhir sebelum masuk ke perencanaan Warisan/Family Office di Modul 4\. |

### **TABEL MONETISASI: MODUL 3 (THE ASSET BUILDER)**

#### **3.1 THE INVESTOR MINDSET & CAPITAL ALLOCATION**

*Target: Menyaring orang-orang kaya baru (OKB) dan mengarahkan mereka ke ekosistem eksklusif.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Exclusive Mastermind (B2C)** | Komunitas Elit (Subscription) | Akses ke "Duit Inner Circle". Grup *networking* khusus pengusaha omset Rp 100 Juta+ untuk *deal flow* dan kolaborasi bisnis. | Rp 5.000.000 \- Rp 15.000.000 / tahun |
| **Lead Gen (Wealth Manager)** | Referral Private Banking | Mengarahkan *user* yang kebingungan pegang kas Rp 10 Miliar ke layanan *Wealth Management* bank partner (BCA Prioritas / Mandiri). | *Finder's Fee* / CPA bernilai jutaan rupiah per nasabah. |
| **Offline Event & Gala Dinner** | *Wealth Summit* | Seminar eksklusif di Hotel Bintang 5: *"Economic Outlook & Peluang Properti Komersial"*. Mengundang bos-bos Tier 2 & 3\. | Rp 2.500.000 \- Rp 5.000.000 / tiket |

#### **3.2 COMMERCIAL PROPERTY PLAYBOOK (via Properti.id)**

*Target: Mengubah tanah/ruko nganggur milik user menjadi mesin uang bulanan, di mana Anda menjadi pengelolanya.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Design & Build (Setup Fee)** | Jasa Kontraktor Khusus | *User* mau ubah rumah warisan jadi Co-Living elit. *Properti.id* menyediakan jasa Arsitek & Pembangunan (atau lempar ke vendor). | Margin 10% \- 20% dari nilai proyek (Proyek 1 Miliar \= Untung Rp 100 \- 200 Juta) |
| **Property Management Fee** | Jasa Pengelola Auto-Pilot | *User* tidak mau urus anak kos/kerusakan. *Properti.id* yang cari penyewa, tagih uang sewa, dan *maintenance* gedung. | 10% \- 15% dari omset bulanan properti tersebut, seumur hidup\! |
| **Finder’s Fee (Broker Lahan)** | Makelar Tanah/Ruko Komersial | *User* cari ruko untuk disewakan ke Indomaret/Bank. Tim Anda carikan ruko yang pas. | Komisi agen 2% \- 3% dari harga jual (Ruko 3 M \= Komisi Rp 60-90 Juta). |
| **B2B Tenant Referral** | Makelar Penyewa Korporasi | Menyewakan ruko *user* ke *Brand* besar (Mixue, Apotek K24). Anda dapat komisi dari *brand* atau pemilik ruko. | 5% dari total nilai sewa per tahun. |

#### **3.3 FRANCHISE & BUSINESS ACQUISITION (via Franchise.id)**

*Target: Orang kaya yang mau buka bisnis tapi malas merintis dari nol. Mereka ingin beli sistem yang sudah jadi.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **Franchise Matching Fee** | Komisi *Brokerage* (Makelar) | *User* baca artikel *Duit.co.id*, lalu tertarik beli *franchise* Kopi Kenangan lewat link *Franchise.id*. Brand membayar Anda karena mendatangkan pembeli. | 5% \- 10% dari *Franchise Fee* (Misal fee 200 Juta \= Komisi Rp 10-20 Juta / closing). |
| **Premium Directory Listing** | B2B *Advertising* | Pemilik *Brand Franchise* (misal: Sabana, Kebab Baba Rafi) membayar langganan bulanan agar *brand*\-nya tampil di halaman 1 pencarian *Franchise.id*. | Rp 2.000.000 \- Rp 5.000.000 / bulan / brand. |
| **Jasa**  | Konsultasi Independen | *User* bayar jasa auditor *Franchise.id* untuk mengecek apakah laporan keuangan *franchise* yang mau dia beli itu asli atau *mark-up*. | Rp 5.000.000 \- Rp 10.000.000 / laporan. |
| **M\&A Broker (Akuisisi Kecil)** | Makelar Bisnis Aktif | Jual-beli bisnis lokal (Gym, Restoran, SPBU) yang *owner*\-nya mau pensiun. Anda jadi perantaranya. | 3% \- 5% dari nilai transaksi jual-beli bisnis. |

#### **3.4 ADVANCED PAPER ASSETS & PORTFOLIO**

*Target: Mengarahkan dana cair miliaran rupiah ke instrumen kertas, dan Anda mengambil komisi dari institusi finansial.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **P2P Lending Referral (Lender)** | Institusional Lead Gen | Arahkan miliarder ini untuk meminjamkan uangnya (jadi pendana) di platform P2P (KoinWorks/Amartha) untuk bantu UMKM di Modul 1\. | Komisi 0.5% \- 1% dari total Asset Under Management (AUM) yang mereka depositokan. |
| **Affiliate Sekuritas Global** | Broker Internasional | Di topik "Diversifikasi Saham Apple/US", beri link pendaftaran broker luar (Interactive Brokers / GoTrade). | CPA Tinggi dalam USD ($50 \- $200 per nasabah *funded*). |
| **Angel Investor Syndicate** | *Deal Flow Subscription* | *User* bayar akses tahunan untuk melihat daftar *Startup* lokal atau bisnis Modul 2 yang sedang butuh suntikan dana. | Rp 5.000.000 / tahun untuk akses *database pitch deck*. |

#### **3.5 STRATEGIC LEVERAGE & TAX PLANNING (Persiapan Tier 4\)**

*Target: Membantu miliarder "bermain" dengan uang bank (OPM) dan menurunkan kewajiban pajak dengan legal.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi |
| :---- | :---- | :---- | :---- |
| **KPR Komersial / Kredit Bank** | Broker Kredit Korporasi | *User* butuh kredit Rp 10 Miliar untuk beli 5 ruko *Franchise*. Anda yang uruskan pengajuannya ke bank BCA/Mandiri partner Anda. | **0.5% \- 1% dari pinjaman cair\!** (Cair 10 Miliar \= Komisi bersih Anda Rp 50 Juta \- Rp 100 Juta per transaksi). |
| **Referral Konsultan Pajak Besar** | B2B Tax Advisor Lead | "Cara beli ruko atas nama PT biar pajak turun". Arahkan *user* ke Konsultan Pajak elit untuk mengurus *Tax Planning* ini. | *Revenue share* 15-20% dari *fee* konsultan (Nilai puluhan juta rupiah). |
| **Referral Asuransi Properti & Jiwa** | *High-Ticket Insurance* | Aset mereka kini miliaran. Wajib diasuransikan (All-Risk Properti) dan asuransi jiwa bos besar (Uang Pertanggungan \> 10 Miliar). Arahkan ke Broker Asuransi elit. | Komisi *Finder's fee* atau bagi hasil dari premi asuransi korporasi. |

## **KURIKULUM MODUL 4: THE LEGACY MAKER (Wealth Protection & Structuring)**

### **KATEGORI 4.1: CORPORATE LEGAL STRUCTURING (Membangun Benteng Bisnis)**

*Fokus: Mengubah struktur kepemilikan aset dari nama pribadi/satu perusahaan menjadi jaringan perusahaan yang saling melindungi.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Tujuan Utama & Kasus Nyata |
| :---- | :---- | :---- |
| **1\. Strategi**  | Mengapa konglomerat memisahkan PT Operasional (yang jualan) dengan PT Holding (yang pegang saham & aset). | Jika bisnis A bangkrut dan digugat suplier, aset di bisnis B dan PT Induk tetap aman dari sitaan. |
| **2\. *Special Purpose Vehicle* (SPV) untuk Properti** | Jangan beli 10 ruko/hotel pakai nama pribadi. Gunakan PT khusus (SPV) untuk memegang aset properti bernilai tinggi. | Menghindari pajak progresif pribadi dan mempermudah jika suatu saat hotel tersebut ingin dijual ke pihak asing. |
| **3\. Mencegah *Piercing the Corporate Veil*** | Kesalahan fatal bos besar: Mencampur uang pribadi dengan uang PT. Jika ketahuan hakim, perlindungan PT gugur dan harta pribadi bisa disita. | Memastikan kemurnian legalitas agar "Tameng" perusahaan tidak bisa ditembus oleh pengacara lawan di pengadilan. |
| **4\. Restrukturisasi & Pemindahan Aset (Inbreng)** | Cara memindahkan tanah/bangunan atas nama pribadi (dari Modul 3\) masuk menjadi modal/aset ke dalam perusahaan (PT) tanpa kena pajak ganda. | Merapikan aset-aset masa lalu yang masih berantakan nama kepemilikannya. |

### **KATEGORI 4.2: WEALTH PROTECTION & RISK MITIGATION (Anti-Gugatan & Anti-Krisis)**

*Fokus: Melindungi kekayaan pribadi dari ancaman eksternal (Kreditur, sengketa keluarga, atau krisis negara).*

| Topik Pembahasan | Deskripsi & Fokus Materi | Tujuan Utama & Kasus Nyata |
| :---- | :---- | :---- |
| **1\. Perjanjian Pra-Nikah & Pasca-Nikah (Prenup/Postnup)** | Pemisahan harta gono-gini. Bukan karena tidak cinta, tapi untuk melindungi pasangan jika salah satu pihak bangkrut terlilit utang bisnis. | Kasus nyata: Bos bangkrut, tapi rumah & aset istri (yang ada *prenup*) tidak bisa disita oleh bank. |
| **2\. Proteksi Aset Pribadi vs Risiko Kebangkrutan** | Bagaimana menyimpan harta cair (cash/emas) di instrumen yang secara hukum paling sulit disentuh oleh kreditur atau pengadilan. | *Financial defense* level absolut untuk pengusaha dengan risiko tinggi (tambang, kontraktor). |
| **3\. Asuransi Payung (*Umbrella Liability Insurance*)** | Asuransi dengan limit puluhan miliar untuk melindungi dari gugatan hukum perdata (misal: tamu hotel Anda meninggal karena kecelakaan di area hotel). | Miliarder adalah target empuk orang yang sengaja mencari celah untuk menggugat dan memeras. |
| **4\. Diversifikasi Geografis & *Second Passport*** | Jangan taruh semua telur di 1 keranjang (negara). Pengenalan *Offshore Banking* (Singapura/Swiss) dan *Golden Visa* negara lain. | Rencana cadangan (Plan B) jika terjadi ketidakstabilan politik/ekonomi ekstrem di dalam negeri. |

### **KATEGORI 4.3: STEALTH WEALTH (Seni Menyembunyikan Kekayaan)**

*Fokus: Psikologi dan taktik privasi. Menjadi sangat kaya tanpa terlihat kaya untuk menghindari target kejahatan, penipuan, atau "proposal" dari keluarga jauh.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Tujuan Utama & Kasus Nyata |
| :---- | :---- | :---- |
| **1\. Filosofi *Stealth Wealth* vs *Flex Culture*** | Mengapa *Old Money* (Orang kaya lama) memakai baju polos tanpa logo, sementara *New Money* (OKB) pamer mobil sport. Bahaya visibilitas di era digital. | Menjaga privasi keluarga dari penculikan, perampokan, dan atensi negatif netizen/pajak. |
| **2\. Struktur Kepemilikan Anonim / Nominee** | Cara (dan batasan hukum di Indonesia) memiliki aset tanpa nama Anda muncul di publik. Penggunaan perusahaan cangkang (*Shell Company*) atau *Trustee*. | Membeli tanah/properti tanpa membuat harga pasar tiba-tiba naik karena penjual tahu yang beli adalah seorang miliarder. |
| **3\. Privasi Digital untuk Ultra-Rich** | Cara menghapus jejak alamat rumah, data keluarga, dan *net worth* dari pencarian Google dan *database* publik. | Keamanan *Cybersecurity* tingkat tinggi, mencegah peretasan ke akun bank/kripto bernilai ratusan miliar. |

### **KATEGORI 4.4: SUCCESSION, LEGACY & FAMILY OFFICE (Dinasti Keluarga)**

*Fokus: Mengatasi kutukan "Generasi 1 Membangun, Generasi 2 Menikmati, Generasi 3 Menghancurkan". Memastikan harta turun-temurun dengan aman.*

| Topik Pembahasan | Deskripsi & Fokus Materi | Tujuan Utama & Kasus Nyata |
| :---- | :---- | :---- |
| **1\. *Family Office* (Kantor Pengelola Harta Keluarga)** | Membuat entitas khusus yang isinya Manajer Investasi, Pengacara, dan Akuntan, yang digaji penuh HANYA untuk mengurus harta 1 keluarga besar Anda. | Standard operasional konglomerat (seperti keluarga Hartono atau keluarga Cendana) dalam memutar uang lintas generasi. |
| **2\. Menangani Ahli Waris yang Tidak Kompeten** | Bagaimana jika anak Anda tidak suka bisnis/suka foya-foya? Solusinya: Pisahkan **"Hak Kepemilikan"** dan **"Hak Manajemen"**. Biarkan profesional jalankan bisnis, anak hanya terima dividen bulanan (dijatah). | Menjaga agar bisnis (Modul 2 & 3\) yang dibangun susah payah puluhan tahun tidak hancur di tangan anak sendiri dalam 2 tahun. |
| **3\. Yayasan Keluarga (*Family Foundation / Philanthropy*)** | Memindahkan sebagian besar kekayaan ke Yayasan Amal atas nama keluarga. | *Legacy* (Meninggalkan nama baik di masyarakat), sekaligus *tools* efisiensi pajak tingkat tinggi yang legal. |
| **4\. Desain Wasiat Terkunci (*Ironclad Will*) & Hukum Waris** | Perbedaan pembagian warisan menurut Hukum Perdata vs Hukum Islam di Indonesia. Cara membuat surat wasiat di Notaris yang tidak bisa digugat oleh anak/istri lain. | Mencegah perang saudara berdarah memperebutkan pabrik/properti saat sang *Founder* (Pendiri) meninggal dunia. |

### **TABEL MONETISASI: MODUL 4 (THE LEGACY MAKER)**

#### **4.1 CORPORATE LEGAL STRUCTURING (Membangun Benteng Bisnis)**

*Target: Pemilik bisnis Modul 2 & 3 yang usahanya sudah membesar dan butuh direstrukturisasi menjadi Holding Company agar pajaknya efisien.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi (Untuk Anda) |
| :---- | :---- | :---- | :---- |
| **Referral Corporate Law Firm** | *Lead Gen* Hukum Elit | Klien butuh *setup Holding Company* & SPV. Anda pertemukan mereka dengan Firma Hukum Korporasi rekanan *Duit.co.id*. | *Finder's Fee* 10% \- 20% dari total *Legal Fee* (Bisa Rp 20 \- 50 Juta per proyek legal). |
| **Referral Konsultan Pajak (Tax Planner)** | Jasa Restrukturisasi Pajak | Mengarahkan klien yang ingin melakukan *Inbreng* (pemindahan aset tanah ke PT) kepada Konsultan Pajak spesialis. | *Revenue Share* atau *Fixed Referral Fee* (Belasan hingga puluhan juta rupiah). |
| **Jasa Valuasi Bisnis Independen** | Bekerjasama dengan KAP (Akuntan Publik) | Klien mau merger/akuisisi perusahaan. Anda merekomendasikan tim Akuntan Publik untuk menilai harga wajar perusahaannya. | Komisi agen/referral dari biaya audit valuasi. |

#### 

#### **4.2 WEALTH PROTECTION & RISK MITIGATION (Anti-Gugatan)**

*Target: Miliarder yang butuh melindungi harta pribadinya dari risiko hukum dan ketidakstabilan negara.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi (Untuk Anda) |
| :---- | :---- | :---- | :---- |
| **Referral Notaris Premium** | *Lead Gen* Legalitas Pribadi | Klien butuh membuat *Prenup/Postnup* atau memisahkan aset gono-gini. Arahkan ke Notaris spesialis perlindungan aset. | *Referral fee* khusus dari Notaris rekanan. |
| **High-Ticket Insurance Brokerage** | Asuransi Jumbo B2B/B2C | Jual perlindungan *Umbrella Liability* (Anti-Gugatan) dan Asuransi Jiwa Warisan dengan Uang Pertanggungan \> Rp 50 Miliar. | **Komisi sangat besar** (Biasanya persentase signifikan dari Premi Tahun Pertama yang dibayar klien). |
| **Golden Visa / 2nd Passport Broker** | *Global Mobility Agency* | Bekerjasama dengan agensi asing (misal: Henley & Partners). Jika klien *Duit.co.id* bikin paspor/visa investor negara lain (Singapura/Eropa) lewat Anda. | Komisi berkisar **$5,000 \- $10,000 (Rp 75 \- 150 Juta)** per klien *approved*\! |

#### 

#### **4.3 STEALTH WEALTH (Seni Menyembunyikan Kekayaan)**

*Target: Konglomerat atau publik figur yang butuh privasi absolut, menjauh dari radar publik, dan melindungi aset digitalnya.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi (Untuk Anda) |
| :---- | :---- | :---- | :---- |
| **Cybersecurity Audit (Personal/Family)** | Agensi Keamanan Digital | Keluarga kaya butuh HP, laptop, dan jaringan rumahnya diamankan dari peretas tingkat tinggi. Anda lempar ke vendor *Cybersecurity*. | Margin/Komisi 20% dari nilai kontrak audit (Nilai kontrak biasanya di atas Rp 50 Juta). |
| **Digital Scrubbing Service** | Jasa Penghapus Jejak Digital | Menggunakan agensi PR/Legal untuk menghapus alamat rumah, info kekayaan, atau berita buruk klien dari Google dan media. | *Markup* harga (Harga agensi Rp 30 Juta, Anda jual Rp 45 Juta). |
| **Offshore Trust & Nominee Referral** | Konsultan Internasional | Klien butuh menyembunyikan aset sah lewat perusahaan cangkang di negara bebas pajak (BVI/Cayman Islands). Arahkan ke agensi pengurus luar negeri. | Komisi / *Referral Fee* dalam satuan USD. |

#### 

#### 

#### 

#### **4.4 SUCCESSION, LEGACY & FAMILY OFFICE (Dinasti Keluarga)**

*Target: Taipan tua yang mulai memikirkan warisan, yayasan, dan cara mencegah anak-anaknya bertengkar merebut harta.*

| Sumber Pendapatan (Monetisasi) | Jenis / Format Bisnis | Contoh Penerapan di Duit.co.id | Estimasi Harga / Komisi (Untuk Anda) |
| :---- | :---- | :---- | :---- |
| **Family Office Setup Consultant** | *Boutique Advisory Service* | *Duit.co.id* menyediakan tim ahli (Lawyer, Akuntan, Private Banker) untuk membangun *Family Office* khusus keluarga klien. Ini layanan puncak (Ultimate Service). | **Rp 200 Juta \- Rp 500 Juta+** untuk biaya *Setup Blueprint*. |
| **Retainer Pengelola Yayasan (Foundation)** | *Management Fee* | Jika klien membuat Yayasan Amal dari hartanya, *Duit.co.id* (lewat entitas Manajemen.id) bisa menawarkan jasa sebagai pengelola operasional yayasan tersebut. | Gaji bulanan / *Management Fee* tetap dari dana Yayasan. |
| **Jasa Pembuatan Surat Wasiat (Estate Planning)** | Notaris & Lawyer Referral | Klien butuh *Ironclad Will* (Wasiat terkunci) untuk membagi saham perusahaan dan properti ke anak-anaknya dengan skema perwalian hukum. | *Revenue Share* dengan Pengacara Waris / *Estate Planner*. |
| **Klub Investasi Ultra-Eksklusif** | *Private Syndicate* | Anda sudah mengumpulkan 20 konglomerat. Bikin acara kumpul tertutup 1 tahun sekali. Tawarkan *deal* besar (Akuisisi Rumah Sakit, dll). | *Success fee* / Kepemilikan saham gratis (Sweat Equity) karena Anda yang mempertemukan mereka. |

## **ARSITEKTUR WEB DUIT.CO.ID**

### **1\. SISTEM LABELING & FILTER (The Smart Engine)**

Kita mulai dari sistem label, karena inilah yang Anda maksud dengan *"berdasarkan pilihan dia, dia bisa baca artikel di label yang sesuai"*.

Di CMS (seperti WordPress), kita akan membuat beberapa **Grup Label (Custom Taxonomies/Tags)**. Setiap artikel wajib dicentang berdasarkan matriks ini:

**A. Label Pendapatan (Income Bracket):**

* \[Tag: Income-Survival\] (Utang / Rp 0 \- UMR)  
* \[Tag: Income-Hustler\] (UMR \- Rp 10 Juta)  
* \[Tag: Income-Scaler\] (Rp 10 Juta \- Rp 100 Juta)  
* \[Tag: Income-Asset\] (Rp 100 Juta \- Rp 1 Miliar)  
* \[Tag: Income-Legacy\] (\> Rp 10 Miliar)

**B. Label Domisili (Location):**

* \[Tag: Lokasi-Desa\] (Peluang agrikultur, lahan luas)  
* \[Tag: Lokasi-Kota\] (Peluang jasa, korporat)  
* \[Tag: Lokasi-Global\] (Kerja *remote*, internet, ekspor)

**C. Label Pendidikan & Keahlian (Education):**

* \[Tag: Edu-Bebas\] (Tidak butuh ijazah/skill teknis khusus)  
* \[Tag: Edu-Sarjana\] (Pemanfaatan ijazah S1/S2 untuk agensi/konsultan)  
* \[Tag: Edu-Spesialis\] (Sertifikasi, *blue-collar*, coding, desain)

**D. Label Modal (Capital Requirement):**

* \[Tag: Modal-Nol\] (Rp 0 \- Rp 1 Juta, Anti-Bangkrut)  
* \[Tag: Modal-Kecil\] (Rp 1 Juta \- Rp 10 Juta)  
* \[Tag: Modal-Menengah\] (Rp 10 Juta \- Rp 100 Juta)  
* \[Tag: Modal-Besar\] (\> Rp 100 Juta)

**E. Label Usia / Fase Hidup (Age):**

* \[Tag: Usia-Muda\] (Pelajar, Mahasiswa, *Fresh Grad*)  
* \[Tag: Usia-Produktif\] (Berkeluarga, Karyawan, Pemilik Usaha)  
* \[Tag: Usia-Pensiun\] (Mempersiapkan atau sedang di masa tua)

### **2\. TAKSONOMI UTAMA (Categories / Silo Konten)**

Kategori adalah "Buku"-nya, sedangkan Label adalah "Indeks"-nya. Kategori harus dibuat baku berdasarkan 4 Modul yang sudah kita bahas. Satu artikel idealnya hanya masuk ke 1 atau 2 Kategori Utama untuk kepentingan SEO yang baik.

* **📁 1\. Survival & Keuangan Dasar** *(Modul Pra-Hustler)*  
  * Bebas Utang & Pinjol  
  * Mindset & Budgeting  
* **📁 2\. Ide & Peluang Usaha** *(Modul 1: The Hustler)*  
  * Kerja Freelance & Remote  
  * Bisnis Tanpa Modal / Jasa  
  * Strategi Karir & Gaji  
* **📁 3\. Manajemen & Skala Bisnis** *(Modul 2: The Scaler)*  
  * Sistem & Automasi (SOP)  
  * Delegasi & HRD  
  * Pajak & Legalitas Dasar  
* **📁 4\. Investasi & Aset Pasif** *(Modul 3: The Asset Builder)*  
  * Properti Komersial & Kos-kosan  
  * Franchise & Akuisisi Bisnis  
  * Saham & Paper Asset  
* **📁 5\. Proteksi & Warisan** *(Modul 4: The Legacy Maker)*  
  * Struktur Perusahaan (Holding)  
  * Hukum & Anti-Gugatan  
  * Family Office & Wasiat

### **3\. ARSITEKTUR SITEMAP (Struktur Halaman Website)**

Ini adalah peta jalan bagaimana *user* menavigasi *website* Anda dari halaman depan hingga mereka melakukan pembelian.

🌐 HOME (duit.co.id)  
│  
├── 🎯 THE QUIZ / ASSESSMENT (Jantung Website)  
│   └── duit.co.id/mulai-disini  
│       (Halaman berisi 4-5 pertanyaan kuis: Umur, Gaji, Domisili, Pendidikan.  
│        Setelah selesai, algoritma mengarahkan ke halaman My Feed).  
│  
├── 🗂️ MY FEED (Custom Dashboard Result)  
│   └── duit.co.id/feed-saya  
│       (Halaman dinamis yang menampilkan artikel berdasarkan Label/Tag  
│        hasil kuis. Misal: Menampilkan artikel \[Lokasi-Desa\] \+ \[Modal-Nol\]).  
│  
├── 📚 BROWSE BY TOPIC (Silo Artikel Statis untuk SEO Google)  
│   ├── /kategori/keuangan-dasar  
│   ├── /kategori/peluang-usaha  
│   ├── /kategori/manajemen-bisnis  
│   ├── /kategori/investasi-aset  
│   └── /kategori/warisan-legalitas  
│  
├── 🛒 EKOSISTEM & SOLUSI (Monetisasi Utama)  
│   ├── /academy        \--\> (Jualan E-Course, Template, E-Book)  
│   ├── /direktori      \--\> (Daftar Ahli Hukum, CFP, Vendor B2B)  
│   ├── /franchise      \--\> (Link Out menuju Franchise.id)  
│   └── /properti       \--\> (Link Out menuju Properti.id)  
│  
└── ℹ️ HALAMAN STATIS (Kepercayaan & Legal)  
    ├── /tentang-kami  
    ├── /kontak  
    ├── /disclaimer (Wajib ada karena bahas finansial/investasi)  
    └── /kebijakan-privasi

### **CONTOH CARA KERJA SISTEM (Simulasi *Back-End* & *Front-End*)**

Mari kita lihat bagaimana sistem ini bekerja dalam dunia nyata dengan contoh 1 artikel:

**Skenario Penulisan Artikel:**  
Tim konten Anda menulis artikel berjudul: *"Cara Mulai Bisnis Jastip Hasil Bumi ke Kota Tanpa Modal"*.

* Tim Anda memasukkan ke **Kategori:** Ide & Peluang Usaha.  
* Tim Anda mencentang **Label (Tag):** \[Lokasi-Desa\], \[Edu-Bebas\], \[Modal-Nol\], \[Usia-Muda\], \[Income-Hustler\].

**Skenario User A (Budi):**

* Budi masuk ke *duit.co.id/mulai-disini*. Dia mengisi: Tinggal di kampung, lulusan SMA, nganggur (Income Rp 0), usia 22 tahun.  
* Algoritma *website* mencari artikel dengan label yang cocok dengan Budi.  
* **Hasil:** Artikel *"Cara Mulai Bisnis Jastip Hasil Bumi"* otomatis muncul di urutan \#1 *dashboard* Budi. Di dalam artikel itu, ada link afiliasi Shopee untuk beli kardus *packing* murah (Anda dapat uang).

**Skenario User B (Pak Tirto):**

* Pak Tirto mengisi kuis: Tinggal di kota, Lulusan S2, Income Rp 200 Juta/bulan, usia 50 tahun.  
* **Hasil:** Artikel Jastip tadi **TIDAK AKAN MUNCUL** di *dashboard* Pak Tirto. Sebaliknya, Pak Tirto disajikan artikel berlabel \[Income-Asset\] dan \[Usia-Pensiun\], misalnya: *"Hitungan ROI Ubah Rumah Kosong Jadi Kos-kosan Premium"*. Di artikel itu, ada tombol konsultasi ke *Properti.id* (Anda dapat proyek ratusan juta).

### 

### 

### **TABEL FREE TOOLS & RESOURCES (TIER SURVIVAL & TIER 1\)**

| Kategori | Nama Tool / PDF | Deskripsi & Kegunaan | Keuntungan Untuk User | Hook ke Monetisasi |
| :---- | :---- | :---- | :---- | :---- |
| **Survival** | **The Debt Exit Script (PDF Generator)** | Alat pengolah kata otomatis untuk membuat surat negosiasi ke Pinjol/Bank (Permohonan restrukturisasi/hapus bunga). | Tidak perlu bayar pengacara/konsultan untuk urus utang. | Link ke jasa mediasi utang atau asuransi jiwa. |
| **Survival** | **Barebones Budgeting Calculator (Web Tool)** | Kalkulator "Mode Bertahan Hidup" yang menghitung pengeluaran minimal agar bisa makan sebulan. | Mengetahui angka pasti berapa uang yang harus dicari agar tidak ngutang. | Rekomendasi Bank Digital tanpa biaya admin (Affiliate). |
| **Survival** | **The "Sell-Everything" Price Checker** | Database harga pasaran barang bekas (HP, Elektronik, Furniture) agar user tahu harga jual cepat di FB Marketplace. | Dapat modal bisnis Rp 1-3 Juta pertama dari barang di rumah. | Penawaran E-course "Cara Jualan di FB Marketplace". |
| **Tier 1 (Desa)** | **Livestock Profit Predictor (Web Tool)** | Kalkulator hitung pakan vs waktu panen (Lele/Kambing/Ayam) agar tahu profit bersih. | Menghindari rugi karena biaya pakan yang bengkak. | Link beli bibit/pakan di Marketplace (Affiliate). |
| **Tier 1 (Desa)** | **TikTok Live Script for Farmers (PDF)** | Draft kata-kata/skrip untuk jualan hasil bumi saat Live streaming agar penonton tertarik beli. | Petani/Orang desa jadi pede jualan langsung ke kota. | Jual template desain packaging hasil tani. |
| **Tier 1 (Jasa)** | **Professional Service Pricing Tool** | Kalkulator untuk menentukan harga jasa (MUA, Cuci AC, Poles Lantai) berdasarkan modal alat & waktu. | Memastikan user tidak "salah harga" (terlalu murah/tekor). | Jual "Marketing Kit" (Template Brosur/WA Jualan). |
| **Tier 1 (S1/S2)** | **The 1-Page Consulting Contract (PDF)** | Template kontrak legal sederhana untuk jasa konsultan agar tidak ditipu klien/pembayaran lancar. | Terlihat profesional di depan klien meski baru mulai. | Jual "Legal Kit" Lengkap (Tier 2). |
| **Tier 1 (Global)** | **USD to IDR Fee Calculator (Web Tool)** | Hitung berapa bersih yang diterima dari Upwork/Fiverr setelah dipotong pajak, fee platform, & kurs Wise/Payoneer. | Tahu angka riil penghasilan dalam Rupiah. | Link referral Wise / Payoneer (Anda dapat komisi USD). |
| **Tier 1 (Global)** | **AI-Powered Bio Generator for Freelancers** | Tools berbasis AI sederhana untuk membuat Bio profil LinkedIn/Upwork yang menarik klien bule. | Profil langsung terlihat "Pro" meski bahasa Inggris pas-pasan. | Penawaran Bootcamp "Rupiah ke Dollar". |
| **Tier 1 (General)** | **Business Idea Validator (Web Tool)** | Kuis 10 pertanyaan untuk menguji apakah ide bisnis user layak jalan atau bakal rugi. | Menghindari buang-buang waktu di bisnis yang tidak ada pasarnya. | Up-sell ke Modul 2 (Sistematisasi Bisnis). |
| **Tier 1 (Jastip)** | **Jastip Margin & Logistics Calculator** | Alat hitung harga jastip \+ ongkir \+ jasa agar harga tetap kompetitif tapi untung maksimal. | Memudahkan hitung total tagihan ke pelanggan secara otomatis. | Link ke vendor pengiriman / logistik partner. |

### **TABEL FREE TOOLS & RESOURCES (TIER 2 \- THE SCALER)**

| Kategori | Nama Tool / PDF | Deskripsi & Kegunaan | Keuntungan Untuk User | Hook ke Monetisasi |
| :---- | :---- | :---- | :---- | :---- |
| **Cashflow** | **Lifestyle Inflation Alarm (Excel/Web)** | Masukkan kenaikan gaji, tool ini hitung berapa yang boleh dikonsumsi vs yang wajib diinvestasikan agar tidak terjebak *Lifestyle Creep*. | Mencegah uang habis untuk foya-foya saat penghasilan naik. | Lead ke perencana keuangan (CFP) partner. |
| **Cashflow** | **Business vs Personal Splitter Tool** | Kalkulator untuk menentukan berapa "Gaji Layak" untuk Owner (Anda) berdasarkan laba bersih bisnis. | Menghindari kebiasaan mengambil uang kasir untuk kepentingan pribadi. | Jual *Template Dashboard CEO* (Notion/Excel). |
| **System** | **The "First 5 SOP" Templates (PDF)** | Template siap pakai untuk 5 SOP paling krusial: CS, Penjualan, Admin, Komplain, dan Rekrutmen. | Tidak perlu menulis dari nol. Tinggal *copy-paste* dan sesuaikan. | Penjualan *Bundle 50+ SOP Lengkap* (Premium). |
| **Delegation** | **Hiring vs Outsourcing Calculator** | Masukkan beban kerja, tool ini hitung mana yang lebih murah: Rekrut karyawan tetap atau pakai Agensi/Freelancer. | Menghemat jutaan rupiah dari kesalahan rekrutmen. | Jual *HR Legal Kit* (Draft Kontrak Kerja). |
| **Delegation** | **Simple KPI Tracker (Google Sheets)** | Tabel otomatis untuk memantau performa tim berdasarkan target. Jika merah \= tim bermasalah, jika hijau \= tim aman. | Bisa memantau tim tanpa harus terus-menerus *micromanagement*. | Lead ke software Payroll/HR (Affiliate). |
| **Scaling** | **B2B Quotation Generator** | Tool untuk membuat surat penawaran harga (Quotation) profesional untuk klien korporat/instansi. | Terlihat seperti perusahaan besar saat menawarkan jasa ke kantor-kantor. | Jual *B2B Pitch Deck Template* (Premium). |
| **Scaling** | **Ads Profitability (ROAS) Calculator** | Masukkan biaya iklan FB/TikTok & profit per produk. Tool ini beri tahu: "Iklan ini layak ditambah modalnya atau harus dimatikan." | Mencegah "bakar uang" di iklan yang tidak menghasilkan untung. | Lead ke Digital Agency partner (Referral). |
| **Bankability** | **Loan Readiness Scorecard** | Kuis diagnosa laporan keuangan: "Seberapa besar peluang Anda di-ACC bank jika pinjam 500 Juta?" | Tahu kekurangan bisnis di mata bank sebelum beneran datang ke bank. | Jual jasa merapikan laporan keuangan (Akuntan). |
| **Management** | **The "Delegation Matrix" Tool** | Alat bantu sortir tugas: Mana yang harus Anda kerjakan sendiri, mana yang harus segera didelegasikan ke staf. | Mengembalikan 10-20 jam waktu luang pemilik bisnis setiap minggunya. | Lead ke *Exclusive Mastermind* (Tier 3). |
| **Bankability** | **SME Tax Calculator (PPh Final 0.5%)** | Hitung otomatis kewajiban pajak bulanan UMKM agar tidak kaget saat lapor SPT tahunan. | Memastikan bisnis patuh hukum dan aman dari denda pajak di masa depan. | Lead ke Konsultan Pajak partner (Referral). |

### **TABEL FREE TOOLS & RESOURCES (TIER 3 \- THE ASSET BUILDER)**

| Kategori | Nama Tool / PDF | Deskripsi & Kegunaan | Keuntungan Untuk User | Hook ke Monetisasi |
| :---- | :---- | :---- | :---- | :---- |
| **Property** | **The Yield & Cap Rate Calculator** | Masukkan harga properti (ruko/tanah) dan estimasi sewa. Tool hitung *Yield* tahunan dan *Cap Rate*\-nya. | Tahu apakah sebuah properti kemahalan atau "undervalued" secara matematis. | Lead ke **Properti.id** (Jasa desain / bangun / manajemen). |
| **Property** | **Co-Living ROI Simulator** | Simulasi jika rumah tua diubah jadi kos-kosan: Hitung jumlah kamar vs biaya renovasi vs target sewa bulanan. | Mengetahui potensi pendapatan maksimal dari aset yang sedang nganggur. | Lead ke **Properti.id** (Jasa renovasi & pengelolaan kos). |
| **Franchise** | **Franchise BEP (Break Even Point) Estimator** | Hitung kapan balik modal sebuah *franchise* setelah dipotong *Royalty Fee*, biaya bahan baku, dan sewa tempat. | Tidak tertipu janji manis brosur *franchise*. Tahu angka riil di lapangan. | Lead ke **Franchise.id** (Direktori franchise terpercaya). |
| **Leverage** | **OPM (Other People's Money) Analyzer** | Masukkan bunga kredit bank vs potensi keuntungan aset. Tool beri tahu jika hutang tersebut "Positif" atau "Negatif". | Cara aman pakai uang bank untuk beli aset tanpa mengganggu *cashflow* pribadi. | Lead ke **Broker Kredit/Bank Partner** (Referral Fee). |
| **Due Diligence** | **The "Anti-Scam" Business Checklist (PDF)** | Daftar 50 pertanyaan yang wajib diajukan ke penjual bisnis/franchise sebelum transfer uang. | Melindungi modal miliaran agar tidak hilang karena investasi bodong atau bisnis busuk. | Jual jasa *Audit Due Diligence* independen. |
| **Allocation** | **The Three Buckets Simulator** | Masukkan total kekayaan cair. Tool beri saran alokasi: Berapa di Kas (Likuid), Saham (Growth), & Properti (Cashflow). | Memiliki struktur portofolio yang seimbang dan tahan krisis. | Lead ke *Wealth Manager* atau *Private Banking* (Referral). |
| **Business M\&A** | **Simple Business Valuation Tool** | Alat hitung nilai wajar sebuah bisnis (Bengkel/Klinik/Cafe) berdasarkan kelipatan laba tahunan (*EBITDA Multiple*). | Tahu harga yang pantas saat ingin membeli bisnis orang lain yang sudah jalan. | Jual jasa konsultan akuisisi bisnis. |
| **Retirement** | **The Passive Income Runway** | Hitung berapa aset yang harus dimiliki agar bisa pensiun dini hanya dengan hidup dari bunga/sewa. | Punya target angka yang jelas kapan bisa berhenti bekerja total. | Lead ke *Exclusive Mastermind* (Tier 3-4). |
| **Tax Strategy** | **Personal vs Corporate Asset Tax Calculator** | Perbandingan pajak jika aset (ruko/mobil) dimiliki atas nama pribadi vs atas nama PT. | Menemukan cara paling efisien secara legal untuk memangkas beban pajak. | Lead ke Konsultan Pajak Partner (Referral). |
| **Legacy** | **Inheritance Tax Estimator (Simulasi Waris)** | Hitung berapa biaya yang harus disiapkan ahli waris jika aset Anda diturunkan ke anak (Pajak, Notaris, dll). | Menyadarkan pentingnya perencanaan waris sedini mungkin. | Lead ke Modul 4 (Family Office & Legal) |

### **TABEL FREE TOOLS & RESOURCES (TIER 4 \- THE LEGACY MAKER)**

| Kategori | Nama Tool / PDF | Deskripsi & Kegunaan | Keuntungan Untuk User | Hook ke Monetisasi |
| :---- | :---- | :---- | :---- | :---- |
| **Legal Structure** | **The Corporate Structure Audit (Checklist)** | Kuis diagnosa struktur bisnis saat ini. Apakah PT Operasional sudah terpisah dengan PT Holding? | Mengetahui celah hukum yang bisa membuat harta pribadi tersita jika bisnis digugat. | Lead ke **Firma Hukum Korporasi** (Referral). |
| **Protection** | **Asset Vulnerability Scorecard** | Tool penilaian risiko: "Seberapa mudah aset Anda disita jika terjadi perceraian atau kebangkrutan bisnis?" | Menyadari pentingnya *Prenup/Postnup* dan pemisahan aset sebelum masalah terjadi. | Lead ke **Notaris/Lawyer Proteksi Aset** (Referral). |
| **Tax Strategy** | **Holding Co. Tax Advantage Simulator** | Simulasi perbandingan beban pajak total jika menggunakan sistem Holding (dividen antar PT) vs Tanpa Holding. | Mengetahui potensi penghematan pajak miliaran rupiah secara legal. | Lead ke **Konsultan Pajak Elit** (Referral). |
| **Family Office** | **Family Office Readiness Calculator** | Alat hitung biaya pengelolaan harta vs total aset. Apakah kekayaan Anda sudah cukup besar untuk punya *Family Office* sendiri? | Mendapatkan rekomendasi apakah harus membangun *Single Family Office* atau cukup *Multi-Family Office*. | Jual jasa **Konsultasi Setup Family Office**. |
| **Succession** | **The Heir Readiness Assessment (PDF)** | Kuesioner evaluasi kompetensi calon ahli waris (anak/cucu). Apakah mereka siap mengelola atau hanya siap menghabiskan? | Membantu pendiri (*founder*) memutuskan skema warisan: Kasih saham atau kasih jabatan? | Jual jasa **Succession Planning** (Manajemen Waris). |
| **Legacy / Death** | **The "Legacy Loss" Calculator** | Hitung estimasi "biaya mati": Pajak waris, biaya notaris, dan potensi nilai yang hilang jika aset dibekukan saat pemilik meninggal. | Sadar bahwa tanpa Wasiat/Trust, keluarga bisa kehilangan 20-30% harta hanya untuk urus administrasi. | Lead ke **Estate Planner / Notaris Wasiat**. |
| **Stealth Wealth** | **Digital Footprint Privacy Audit (PDF)** | Panduan langkah-demi-langkah mencari dan menghapus info pribadi/kekayaan keluarga dari database publik & Google. | Menjaga privasi dan keamanan keluarga dari target kejahatan atau pemerasan. | Lead ke **Cybersecurity / Digital Scrubbing Agency**. |
| **Philanthropy** | **Foundation vs Personal Tax Incentive** | Simulasi manfaat pajak jika sebagian laba dialokasikan ke Yayasan Keluarga (Philanthropy). | Mengubah biaya pajak menjadi *Legacy* (nama baik) dan dampak sosial yang terkontrol. | Jual jasa **Setup Yayasan Keluarga**. |
| **Business Exit** | **Exit Strategy & Valuation Roadmap** | Panduan persiapan menjual bisnis (Exit) agar mendapatkan valuasi tertinggi dari investor/konglomerasi lain. | Mengetahui kapan waktu terbaik untuk menjual bisnis Modul 2/3 dan pensiun sebagai miliarder. | Lead ke **M\&A Advisor / Broker Bisnis Elit**. |
| **Wealth Transfer** | **The Family Constitution Template (PDF)** | Contoh draf "Undang-Undang Keluarga" (Aturan main keluarga besar dalam mengelola harta bersama). | Mencegah perang saudara antar anggota keluarga di masa depan. | Lead ke **Konsultan Hukum Keluarga**. |

### **TABEL REGULASI RELEVAN: TIER 0 & TIER 1**

| Tier | Kategori Masalah | Undang-Undang / Regulasi | Poin Penting yang Perlu Dipelajari/Dibahas |
| :---- | :---- | :---- | :---- |
| **0 (Survival)** | **Utang & Pinjol** | **POJK No. 10/2022** (Layanan Pendanaan Bersama Berbasis Teknologi) | Aturan main pinjol legal, batas bunga, dan tata cara penagihan (etika DC). |
| **0 (Survival)** | **Perlindungan Konsumen** | **UU No. 8 Tahun 1999** (Perlindungan Konsumen) | Hak nasabah jika merasa dirugikan oleh lembaga keuangan atau klausula baku yang menjebak. |
| **0 (Survival)** | **Ancaman Digital/Pribadi** | **UU No. 1 Tahun 2024** (Perubahan Kedua UU ITE) | Perlindungan terhadap penyebaran data pribadi, ancaman kekerasan, atau doxing oleh penagih utang. |
| **0 (Survival)** | **Gagal Bayar / Kepailitan** | **UU No. 37 Tahun 2004** (Kepailitan & PKPU) | Prosedur hukum jika seseorang benar-benar tidak mampu bayar utang (Penundaan Kewajiban Pembayaran Utang). |
| **0 (Survival)** | **Privasi Data** | **UU No. 27 Tahun 2022** (Pelindungan Data Pribadi) | Kewajiban aplikasi (pinjol) untuk menjaga data KTP/Kontak user dan sanksi jika membocorkannya. |
| **1 (The Hustler)** | **Pendirian Bisnis (PT)** | **UU No. 6 Tahun 2023** (Cipta Kerja / Omnibus Law) | **PT Perorangan**: Syarat modal nol rupiah, cara daftar lewat OSS, dan pemisahan harta pribadi & bisnis. |
| **1 (The Hustler)** | **UMKM** | **UU No. 20 Tahun 2008** (UMKM) | Kriteria modal usaha, fasilitas dari pemerintah, dan perlindungan bagi usaha kecil. |
| **1 (The Hustler)** | **Pajak Penghasilan** | **UU No. 7 Tahun 2021** (Harmonisasi Peraturan Perpajakan \- HPP) | Batas PTKP (Penghasilan Tidak Kena Pajak) dan aturan **Pajak 0.5%** untuk UMKM dengan omset di bawah 4.8M. |
| **1 (The Hustler)** | **Hak Kekayaan Intelektual** | **UU No. 20 Tahun 2016** (Merek & Indikasi Geografis) | Pentingnya mendaftarkan nama *brand* agar tidak dicuri orang lain (HAKI). |
| **1 (The Hustler)** | **Kontrak & Perjanjian** | **KUHPerdata Pasal 1320 & 1338** | Syarat sahnya sebuah perjanjian (penting untuk Freelancer/Jasa agar kontraknya kuat secara hukum). |
| **1 (The Hustler)** | **Ketenagakerjaan** | **UU No. 13 Tahun 2003** (Ketenagakerjaan) | Aturan lembur, pesangon, dan hak karyawan (penting untuk strategi negosiasi gaji). |
| **1 (The Hustler)** | **Bisnis Digital** | **PP No. 80 Tahun 2019** (Perdagangan Melalui Sistem Elektronik) | Aturan main jualan online, jastip digital, dan perlindungan transaksi di e-commerce. |

### **TABEL REGULASI RELEVAN: TIER 2 & TIER 3**

| Tier | Kategori Masalah | Undang-Undang / Regulasi | Poin Penting yang Perlu Dipelajari/Dibahas |
| :---- | :---- | :---- | :---- |
| **2 (The Scaler)** | **Tata Kelola Perusahaan** | **UU No. 40 Tahun 2007** (Perseroan Terbatas) jo. **UU Cipta Kerja** | Tanggung jawab Direksi & Komisaris, aturan RUPS, dan pemisahan kekayaan PT dari harta pribadi. |
| **2 (The Scaler)** | **Ketenagakerjaan (HR)** | **UU No. 13 Tahun 2003** & **PP No. 35 Tahun 2021** | Aturan PKWT (Kontrak) vs PKWTT (Tetap), prosedur PHK, pesangon, dan jam kerja lembur. |
| **2 (The Scaler)** | **Perlindungan Data & IT** | **UU No. 27 Tahun 2022** (PDP) | Kewajiban bisnis (misal: Agency/SaaS) melindungi data klien agar tidak terkena denda miliaran. |
| **2 (The Scaler)** | **Rahasia Dagang** | **UU No. 30 Tahun 2000** (Rahasia Dagang) | Cara melindungi resep, metode bisnis, atau database klien agar tidak dibawa lari karyawan yang *resign*. |
| **2 (The Scaler)** | **Pajak Badan (Corporate)** | **UU No. 7 Tahun 2021** (HPP) | Perhitungan PPh Badan, PPN (PKP), dan biaya-biaya yang bisa mengurangi pajak (*deductible expenses*). |
| **3 (Asset Builder)** | **Properti / Lahan** | **UU No. 5 Tahun 1960** (UUPA / Agraria) | Perbedaan Hak Milik (SHM), Hak Guna Bangunan (HGB), dan hak pakai (penting untuk beli ruko/tanah). |
| **3 (Asset Builder)** | **Bangunan & Kos-kosan** | **UU No. 28 Tahun 2002** & **UU No. 6 Tahun 2023** | Aturan PBG (Persetujuan Bangunan Gedung) pengganti IMB dan standar teknis bangunan komersial. |
| **3 (Asset Builder)** | **Waralaba (Franchise)** | **PP No. 42 Tahun 2007** (Waralaba) | Syarat STPW (Surat Tanda Pendaftaran Waralaba) dan apa saja yang wajib ada dalam kontrak franchise. |
| **3 (Asset Builder)** | **Perbankan & Jaminan** | **UU No. 4 Tahun 1996** (Hak Tanggungan) | Cara kerja agunan/jaminan ke bank. Apa yang terjadi jika aset yang dijaminkan macet (lelang). |
| **3 (Asset Builder)** | **Pasar Modal (Saham)** | **UU No. 8 Tahun 1995** (Pasar Modal) | Perlindungan investor di bursa saham, aturan dividen, dan keterbukaan informasi emiten. |
| **3 (Asset Builder)** | **Persaingan Usaha** | **UU No. 5 Tahun 1999** (Larangan Praktik Monopoli) | Aturan agar bisnis yang sudah besar tidak melakukan kartel atau persaingan usaha tidak sehat. |

### **TABEL REGULASI RELEVAN: TIER 4 (THE LEGACY MAKER)**

| Kategori Masalah | Undang-Undang / Regulasi | Poin Penting yang Perlu Dipelajari/Dibahas |
| :---- | :---- | :---- |
| **Struktur Holding & Grup** | **UU No. 40 Tahun 2007** (Perseroan Terbatas) | Konsep *Parent-Subsidiary* (Holding), tanggung jawab terbatas pemegang saham, dan strategi merger/akuisisi. |
| **Filantropi & Yayasan** | **UU No. 16 Tahun 2001** jo. **UU No. 28 Tahun 2004** (Yayasan) | Cara mendirikan *Family Foundation* sebagai wadah harta keluarga yang bersifat abadi dan memiliki insentif pajak. |
| **Perlindungan Aset Keluarga** | **UU No. 1 Tahun 1974** jo. **UU No. 16 Tahun 2019** (Perkawinan) | Pentingnya *Prenuptial* dan *Postnuptial Agreement* untuk melindungi harta keluarga dari risiko perceraian atau kebangkrutan pasangan. |
| **Warisan (Perdata Umum)** | **KUHPerdata (BW) Buku II** (Tentang Kebendaan/Waris) | Aturan pembagian warisan bagi non-muslim, konsep *Legitieme Portie* (bagian mutlak ahli waris yang tidak bisa diganggu gugat). |
| **Warisan (Islam)** | **Instruksi Presiden No. 1 Tahun 1991** (Kompilasi Hukum Islam) | Aturan *Faraid* (pembagian waris Islam) bagi pemeluk agama Islam di Indonesia dan cara pembuatan Hibah/Wasiat. |
| **Pajak Kekayaan & Global** | **UU No. 7 Tahun 2021** (HPP) & **AEOI** (*Automatic Exchange of Information*) | Aturan pelaporan aset luar negeri, transparansi data perbankan global, dan pajak atas dividen/warisan. |
| **Wasiat & Notariat** | **UU No. 2 Tahun 2014** (Jabatan Notaris) | Tata cara pembuatan Akta Wasiat yang sah dan mengikat secara hukum agar tidak bisa dibatalkan di pengadilan. |
| **Perbankan & Trust** | **UU No. 10 Tahun 1998** (Perbankan) | Memahami batasan rahasia bank dan penggunaan jasa *Trust* (wali amanat) untuk mengelola harta atas nama pihak ketiga. |
| **Privasi Data Elit** | **UU No. 27 Tahun 2022** (Pelindungan Data Pribadi) | Hak-hak pemilik data untuk menghapus jejak informasi sensitif di ruang publik demi keamanan keluarga (*Stealth Wealth*). |
| **Pasar Modal (Lanjutan)** | **UU No. 4 Tahun 2023** (P2SK) | Aturan terbaru mengenai pengelolaan dana (Asset Management) dan perlindungan konsumen sektor keuangan tingkat tinggi. |

# **Alam.Duit.co.id**

Strategi ini dirancang oleh Syamsul Alam untuk memaksimalkan celah legal dalam UU Cipta Kerja dan UU Harmonisasi Peraturan Perpajakan (UU HPP). Fokus utama adalah pemanfaatan ambang batas pajak mikro, penguasaan properti Sertifikat Hak Milik (SHM) melalui yayasan, serta konversi likuiditas bank ke dalam bentuk harta fisik (emas) dan digital (kripto) guna meminimalkan saldo rekening yang terpantau otomatis oleh sistem *Automatic Exchange of Information* (AEOI).

## **1\. Arsitektur Entitas dan Segmentasi Harta**

Kekayaan dibagi ke dalam beberapa lapisan entitas untuk meminimalkan eksposur pajak dan risiko penyitaan.

### **A. Lapisan Perorangan: Operasional Harian**

* **Fungsi:** Menampung pendapatan bisnis offline / sosmed dengan omzet di bawah Rp500.000.000 per tahun untuk memanfaatkan fasilitas bebas PPh.  
* **Strategi Saldo:** Menjaga saldo agregat di seluruh bank di bawah Rp1 miliar guna menghindari pelaporan otomatis oleh perbankan ke DJP melalui sistem ILAP (Informasi Laporan Akuntan Publik / Lembaga Jasa Keuangan).  
* **Tindakan:** Mengalihkan kelebihan likuiditas secara rutin ke bentuk harta fisik yang tidak terlacak secara digital.

### **B. Lapisan PT Perorangan: Operasional Formal dan Aset Bergerak**

* **Fungsi:** Digunakan untuk kontrak jasa yang memerlukan legalitas dan pembelian kendaraan operasional untuk menghindari pajak progresif pribadi.  
* **Pajak:** Memanfaatkan PPh Final 0,5% selama 4 tahun.

### **C. Lapisan Yayasan: Benteng Properti SHM**

* **Fungsi:** Menjadi wadah kepemilikan tanah dan rumah dengan status Hak Milik (SHM) sesuai PP No. 38 Tahun 1963\.  
* **Keamanan:** Aset yayasan terpisah dari harta pribadi dan risiko pailit perusahaan.

## **2\. Strategi Pemisahan Bentuk Harta (Diversifikasi Non-Moneter)**

Untuk meminimalkan saldo rekening bank, kelebihan uang masuk dikonversi ke dalam bentuk harta yang memiliki likuiditas tinggi namun minim pengawasan otomatis.

### **A. Instrumen Utama: Emas Batangan Fisik**

Emas batangan kadar 99,99% adalah Barang Kena Pajak strategis yang mendapat fasilitas tidak dipungut PPN.

* **Akuisisi P2P:** Membeli emas keping kecil (1g \- 10g) dari perorangan atau toko emas kecil secara tunai. Transaksi ini tidak memicu pemungutan PPh 22 sebesar 0,25% yang biasanya dikenakan produsen / distributor resmi kepada pembeli ber-NPWP.  
* **Batas Pelaporan PPATK:** Transaksi tunai di bawah Rp500 juta tidak wajib dilaporkan oleh pedagang perhiasan / emas ke PPATK. Membeli secara bertahap menjaga profil tetap "low profile".  
* **Penyimpanan:** Disimpan dalam brankas pribadi (kunci kombinasi / digital) di lokasi tersembunyi di rumah untuk akses penuh tanpa batas waktu operasional bank, berbeda dengan *Safe Deposit Box* (SDB) yang prosedurnya melibatkan verifikasi identitas bank.

### **B. Instrumen Digital: Aset Kripto (AKD)**

Aset kripto kini diklasifikasikan sebagai Aset Keuangan Digital (AKD) di bawah pengawasan OJK.

* **Strategi P2P / DEX:** Menggunakan metode *Peer-to-Peer* (P2P) pada platform internasional (misal: Binance) atau bursa desentralisasi (DEX) untuk menyimpan kekayaan dalam bentuk *stablecoin* (USDT / USDC).  
* **Keamanan:** Disimpan dalam *Cold Wallet* (Hardware Wallet) untuk memisahkan kepemilikan aset dari ekosistem perbankan dalam negeri.  
* **Pajak:** Jika tidak dijual ke Rupiah melalui bursa dalam negeri, kewajiban PPh 22 Final sebesar 0,21% tidak terpungut secara otomatis.

### **C. Koleksi Mewah (Collectibles)**

Barang koleksi seperti jam tangan mewah (Rolex), barang seni, atau tas branded edisi terbatas.

* **Fungsi:** Menjaga nilai kekayaan dalam bentuk barang bergerak yang mudah dipindahkan secara fisik.  
* **Privasi:** Transaksi antar perorangan (barang bekas) minim pengawasan pajak dibandingkan membeli baru dari butik resmi yang wajib mencatat identitas pembeli.

## **3\. Blueprint Kepemilikan Aset dan Gaya Hidup**

| Jenis Harta | Entitas Pemilik | Cara Akuisisi | Keuntungan Strategis |
| :---- | :---- | :---- | :---- |
| **Rumah (SHM)** | Yayasan | Beli bekas dari perorangan | Legalitas SHM tetap; jauh dari radar transaksi pengembang besar. |
| **Mobil / Luxury** | PT Perorangan | Beli bekas tunai / PT | Biaya operasional menjadi pengurang pajak; bebas progresif pribadi. |
| **Emas Batangan** | Perorangan (Fisik) | Tunai bertahap (\< 500jt) | Tidak ada jejak digital di perbankan; lindung nilai inflasi. |
| **Kripto / Token** | Perorangan (Wallet) | P2P / DEX | Diversifikasi aset global; bebas pengawasan perbankan lokal. |
| **Koleksi (Rolex / Art)** | Perorangan (Fisik) | Tunai P2P | Aset dengan nilai apresiasi tinggi; minim kewajiban lapor otomatis. |

## **4\. Strategi Manajemen Risiko: "Stay Under the Radar"**

Otoritas pajak menggunakan teknologi *Big Data* dan *Machine Learning* untuk memvalidasi kewajaran antara gaya hidup di media sosial dengan data SPT.

* **Menghindari Pemicu Data:**  
  * **Pecah Dana:** Jaga saldo setiap rekening bank (dan agregat per bank) di bawah Rp1 miliar untuk menghindari pelaporan AEOI / ILAP.  
  * **Minimalisir Laporan:** Jika omzet pribadi tetap di bawah Rp500 juta dan tidak bertransaksi dengan instansi formal, tetaplah pada profil "bukan wajib pajak aktif" untuk menghindari radar "berburu dalam kebun binatang".  
* **Digital Footprint:** Hindari memamerkan aset atau gaya hidup mewah (*flexing*) di media sosial yang dapat ditautkan dengan identitas asli / NIK melalui sistem Coretax.  
* **Transaksi Bekas:** Utamakan membeli aset (mobil / rumah / emas) dari perorangan secara langsung. Transaksi ini tidak mewajibkan penjual menerbitkan Faktur Pajak, sehingga meminimalkan data masuk ke sistem DJP.

## **5\. Do's and Don'ts**

### **Do's**

* **Konversi Likuiditas berkala:** Setiap omzet pribadi mendekati ambang batas tertentu, segera konversi ke emas fisik keping kecil atau kripto via cold wallet.  
* **Gunakan Yayasan untuk Properti:** Pastikan yayasan memiliki kegiatan sosial minimalis (misal: santunan bulanan) untuk menjaga legitimasi sebagai badan hukum pemegang SHM.  
* **Manfaatkan PT Baru tiap Tahun:** Gunakan hak mendirikan 1 PT per tahun untuk memisahkan risiko aset operasional.

### **Don'ts**

* **Jangan Lapor SPT jika Tidak Diperlukan:** Otoritas cenderung mengejar subjek yang sudah ada dalam sistem. Selama bisnis Anda offline / sosmed murni, hindari memicu pemicu administratif.  
* **Jangan Menyimpan Emas di SDB Bank:** SDB di bank tetap memerlukan verifikasi identitas dan dapat menjadi target penyitaan jika terjadi sengketa pajak yang eskalatif.  
* **Jangan Membeli Emas Batangan Jumlah Besar Sekaligus:** Transaksi di atas Rp500 juta akan memicu pelaporan PPATK.

## **6\. Pertimbangan Penyempurnaan**

1. **Integrasi NIK-NPWP:** Mengingat NIK akan menjadi NPWP, setiap transaksi besar yang menggunakan KTP (beli rumah / mobil) akan terdeteksi. Menggunakan Yayasan atau PT adalah solusi terbaik untuk menjaga NIK pribadi tetap bersih dari catatan aset besar.  
2. **Audit Yayasan:** Jika aset yayasan tumbuh sangat besar, ada kewajiban audit. Pastikan rincian pengeluaran yayasan terdokumentasi sebagai kegiatan sosial atau biaya operasional pengurus (fasilitas jabatan).  
3. **Likuiditas Emas:** Emas fisik mudah dijual kembali ke perorangan atau toko emas kecil secara tunai tanpa perlu laporan pajak, menjadikannya instrumen "dana darurat" paling aman.

Strategi ini memungkinkan Anda memiliki "beberapa rumah" (via Yayasan) dan "beberapa mobil" (via PT) serta kekayaan likuid melimpah (Emas / Kripto) tanpa membebani profil fiskal pribadi, sehingga Anda dapat menikmati hidup nyaman sepenuhnya di bawah radar pengawasan.

## 

## **7\. Integrasi *Family Office*: Proteksi Lintas Generasi dan Tata Kelola Kesejahteraan Keluarga**

Melengkapi arsitektur lapisan entitas sebelumnya, konsep *Single-Family Office* (SFO) berskala mikro diadopsi sebagai "Pusat Komando" (*Holding*)\[[1](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGeMc6v38_2GWk62Gh_wdOPezhg2HGnd_g2BeeJ2tdJkDl5d-YRBnGqI3Ix5BN02DlkgLKF-lhQ2Yl4xK1Zwa5WIZEvOaGO6BkctnHamN_nDiIPX_qvYKkQErCs-LZqvCprkRQwaa7iyH3a3RcprEEnb3KiUQ6iPMWCwGfaQg85swlQVDAALhTryOYFe4eEBns=)\]\[[2](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGIvnB8EKpFuKWJ7m6B5cLr3Bdt6XJ-G_G5Ky59P8sVhjtsd1ml4HtfoE0SVByoYM612NhUab8uq9KThhZ9TLd3_nXkBjg32ZYnu0dbzxuf01nFi2FqDm4mBlD95VRVNQpNEb2aKUgPNx7ngW2rpxTJV0xY5rWCKSlDx1lUh5Iw70tqIdAj0yqOQh7rKgGKDmxHDjsoWYGPA_Gz9EVpbbrm2U_rt_zjszKHwBIu)\]. Strategi ini dirancang untuk dua tujuan utama: melindungi kekayaan dari inkompetensi ahli waris ("kutukan generasi ketiga") dan menyediakan mekanisme sistematis untuk menghidupi keluarga besar (istri, anak, orang tua, mertua, hingga saudara) tanpa memicu alarm pajak.

### **A. Proteksi Pajak (Tax Shielding) Melalui Ekosistem** 

1. **PT *Holding* sebagai Brankas Sentral:** Alih-alih mengumpulkan kekayaan jumbo di rekening pribadi yang rawan pelacakan AEOI / ILAP, kekayaan dikonsolidasikan dalam satu entitas PT *Holding*. Perusahaan ini tidak melakukan operasional berisiko, melainkan murni bertindak sebagai pemegang saham dari PT / bisnis operasional dan sebagai manajer investasi keluarga.  
2. **Dividen Bebas Pajak (Memotong Tarif Progresif):** Aliran dana keuntungan ditarik ke PT *Holding*. Berdasarkan regulasi turunan UU Cipta Kerja dan UU HPP, dividen yang dibagikan dari PT *Holding* kepada Wajib Pajak Orang Pribadi (anggota keluarga) **tidak dikenakan pajak (0%)**, dengan syarat dividen tersebut diinvestasikan kembali (misalnya, dibelikan emas batangan, kripto, atau obligasi) di wilayah NKRI selama jangka waktu tertentu. Ini memutus mata rantai tarif PPh progresif pribadi yang bisa mencapai 35%.  
3. **Pemisahan Harta dan Utang (*Ring-Fencing*):** Jika anggota keluarga yang menjalankan unit bisnis mengalami kebangkrutan, terjerat utang, atau dituntut secara hukum, aset utama keluarga yang tersimpan di dalam entitas *Family Office* dan Yayasan bersifat kebal dan tidak dapat disita.

### **B. Sabuk Pengaman "Generasi Konsumtif" (*Wealth Preservation*)**

Generasi penerus yang tidak mampu menghasilkan uang atau memiliki gaya hidup konsumtif merupakan ancaman terbesar bagi keberlangsungan aset. *Family Office* mencegah kebocoran ini melalui **Konstitusi Keluarga (*Family Constitution*)**:

1. **Pemutusan Akses ke *Principal Asset* (Aset Induk):** Generasi penerus (anak / cucu) BUKAN diwariskan aset dalam bentuk kepemilikan langsung (SHM pribadi atau rekening bank dengan saldo jumbo). Aset tetap dikunci atas nama Yayasan atau PT *Holding* yang dikelola *Family Office*.  
2. **Distribusi Berbasis *Yield* (Hasil), Bukan Pokok:** Anggota keluarga yang dinilai tidak kompeten hanya berhak menikmati fasilitas (misal: tinggal di rumah Yayasan, memakai mobil PT) dan menerima *stipend* (uang saku / dividen bulanan) yang diatur ketat. Mereka sama sekali tidak memiliki legalitas atau hak suara untuk menjual SHM, melikuidasi emas, atau membobol *cold wallet* kripto.  
3. **Kendali Profesional / *Trustee*:** Kendali utama entitas dipegang oleh Anda (sebagai *Patriarch / Matriarch*), kemudian dapat diwariskan kepada anggota keluarga yang paling kompeten atau profesional bayaran sebagai Direktur. Generasi konsumtif diposisikan hanya sebagai pemegang saham pasif atau *beneficiary* pasif.

### **C. Skema Distribusi Uang untuk Keluarga Besar secara Hemat Pajak**

Untuk membiayai orang tua, istri, anak, adik, mertua, dan kerabat lainnya, sistem memberikan uang tunai sembarangan dari kantong pribadi justru bisa memicu teguran otoritas pajak terkait sumber dana. *Family Office* membiayai mereka menggunakan jalur korporat yang legal:

1. **Jalur Garis Keturunan Lurus (Bebas Pajak Murni):**  
   * Menurut ketentuan perpajakan, hibah tunai atau aset kepada keluarga sedarah dalam **garis keturunan lurus satu derajat** (dari Anda ke Orang Tua kandung, atau dari Anda ke Anak kandung) ditetapkan sebagai **Bukan Objek Pajak**. Anda dapat mentransfer langsung biaya hidup atau kesehatan kepada mereka tanpa membebani penerima dengan kewajiban pajak PPh.  
2. **Jalur "Karyawan / Pengurus" (Bagi Istri, Adik, Mertua):**  
   * Mertua, adik, keponakan, atau kerabat yang *tidak masuk* dalam jalur pengecualian garis lurus akan rawan dikenai pajak jika menerima uang besar. Solusinya: angkat mereka sebagai Dewan Komisaris, Pengawas Yayasan, atau staf administratif di entitas PT / Yayasan *Family Office*.  
   * **Strategi *Tax Deductible*:** Berikan mereka "gaji rutin" setiap bulan dari perusahaan. Atur nominal gaji tersebut agar tetap berada di bawah Penghasilan Tidak Kena Pajak (PTKP, yakni maksimal Rp54.000.000 / tahun).  
   * **Efek Ganda:** Anggota keluarga Anda mendapat biaya hidup bebas pajak, sementara bagi PT Anda, pengeluaran gaji tersebut menjadi **Biaya Pengurang Pajak (Deductible Expense)** yang secara legal menurunkan beban pajak PPh Badan perusahaan.  
3. **Fasilitas *Natura* dan Asuransi Kesehatan:**  
   * Alih-alih memberikan dana cair yang berpotensi dihabiskan untuk hal non-esensial, *Family Office* menanggung langsung kebutuhan absolut mereka.  
   * **Aset Fisik:** Adik atau mertua membutuhkan rumah atau mobil. Yayasan dapat membeli rumah dan PT membeli mobil operasional. Keluarga dipersilakan menggunakannya (hak pakai), tetapi secara legal aset tersebut tetap milik entitas korporat (tidak bisa mereka jual secara diam-diam).  
   * **Kesehatan:** Premi asuransi kesehatan orang tua dan mertua berumur lanjut yang sangat mahal dapat dibayarkan langsung oleh PT sebagai biaya perlindungan "Pengawas Entitas", menjaga *cash flow* pribadi Anda.

### **D. *Blueprint* Distribusi Kesejahteraan *Family Office***

| Penerima Manfaat | Masalah / Kondisi | Solusi *Family Office* | Dampak Legal & Pajak |
| :---- | :---- | :---- | :---- |
| **Generasi Penerus (Anak / Cucu)** | Konsumtif, inkompeten mengelola modal uang. | Tidak mewariskan SHM / Emas. Mewariskan hak dividen / uang saku pasif. | Aset induk mustahil dilikuidasi atau dijual sepihak; aman dari ancaman kebangkrutan pribadi. |
| **Orang Tua Kandung** | Butuh biaya hidup layak & *cover* medis. | Transfer dana tunai langsung (Hibah 1 Derajat) / Asuransi Yayasan. | **Bukan Objek Pajak**. DJP tidak berhak memungut pajak atas aliran dana ini. |
| **Mertua & Saudara (Adik)** | Butuh tunjangan ekonomi rutin. | Diangkat menjadi Komisaris / Pengawas, diberi gaji di bawah batas PTKP. | Uang bulanan 100% legal dan bebas PPh; menekan laba bersih PT secara sah (*tax deductible*). |
| **Istri / Pasangan** | Keamanan finansial dan proteksi aset. | Diangkat sebagai Ketua Yayasan pemegang aset properti dan *holding*. | Harta terproteksi secara rapi; pembagian dividen ke istri bebas pajak (selama di-reinvestasi). |

Dengan menerapkan lapisan *Family Office* ini, status Anda beralih dari sekadar **"individu kaya yang menyimpan uang"** menjadi sebuah **"Institusi Dinasti Finansial"**. Keluarga yang inkompeten tetap dapat terhidupi tanpa berisiko menghancurkan mesin pencetak uang, keluarga besar terbantu melalui mekanisme yang secara bersamaan membuat pajak korporasi Anda menjadi lebih murah, dan Anda tetap dapat menikmati kontrol kekayaan secara mutlak tanpa memicu radar pelaporan otomatis.

## 

## 

## **7.1 Proteksi Pajak (*Tax Shielding*) Melalui Pembentukan Entitas *Holding* (Pusat Komando *Family Office*)**

Di Indonesia, istilah "*Family Office*" belum memiliki payung hukum entitas khusus seperti di Singapura atau Dubai. Namun, secara praktikal, *Family Office* dapat diciptakan dengan mendirikan sebuah **PT Biasa (Persekutuan Modal)** atau **PT Perorangan** yang difungsikan murni sebagai Perusahaan Induk (*Holding Company*).

Entitas ini bertindak sebagai "Brankas Sentral" yang memegang saham di bisnis-bisnis operasional Anda, menampung kelebihan uang tunai, dan menjadi distributor kekayaan bagi keluarga tanpa tergerus pajak progresif PPh Orang Pribadi (yang bisa mencapai 35%).

### **A. Mekanisme Kerja** 

1. **Pemisahan Risiko (*Ring-Fencing*):** Anda harus memisahkan antara **OpCo** (*Operating Company* – PT yang menjalankan bisnis harian, berhadapan dengan klien, karyawan, dan risiko utang) dengan **HoldCo** (*Holding Company* – PT *Family Office* yang murni hanya menyimpan aset dan saham). Jika OpCo bangkrut atau dituntut secara hukum, aset miliaran yang tersimpan di HoldCo tidak dapat disita karena hukum memandang keduanya sebagai entitas hukum yang berbeda.  
2. **Dividen Bebas Pajak (0%):** Berdasarkan UU Cipta Kerja dan PMK No. 18 / PMK.03 / 2021, dividen yang dibagikan dari PT (HoldCo) ke rekening pribadi (Wajib Pajak Orang Pribadi / Keluarga) **tidak dipotong pajak (Bebas PPh Final 10%)** ASALKAN dividen tersebut diinvestasikan kembali ke instrumen legal di Indonesia (seperti Emas Batangan, SBN, atau Properti) selama minimal 3 tahun. Ini adalah *loophole* legal terbesar untuk mencairkan uang dari perusahaan ke kantong pribadi tanpa bayar pajak.

### **B. Kebutuhan Profesional: Bisa Sendiri atau Butuh Bantuan?**

Untuk merancang arsitektur ini secara presisi, Anda **tidak disarankan** melakukannya 100% sendiri. Berikut tim yang perlu Anda siapkan:

* **Notaris PPAT:** Sangat dibutuhkan. Anda tidak bisa menggunakan PT Perorangan biasa jika ingin mendirikan *Holding* yang kuat untuk diwariskan. Anda butuh Notaris untuk membuat Akta Pendirian PT Biasa dan merancang Anggaran Dasar yang spesifik untuk *Holding*.  
* **Konsultan Pajak (Brevet B / C):** Dibutuhkan di awal (secara *freelance* atau *project-based*) untuk memastikan proses pelaporan dividen bebas pajak di DJP Online (e-Reporting Investasi) tidak salah klik, yang bisa berakibat dividen tersebut tiba-tiba ditagih PPh 10% \+ denda.  
* **Pengacara (*Corporate Lawyer*):** (Opsional / Nanti) Dibutuhkan saat aset sudah sangat besar dan Anda ingin membuat *Family Constitution* (Konstitusi Keluarga) yang mengikat secara hukum bagi ahli waris.

### 

### **C. *Action Plan* / *To-Do List* (Langkah Praktis Implementasi 7.1)**

Berikut adalah urutan kerja nyata yang bisa Anda mulai kerjakan minggu ini:

#### **Fase 1: Pendirian "Pusat Komando" (Bulan ke-1)**

* **Cari Notaris Kepercayaan:** Hubungi notaris, sampaikan bahwa Anda ingin mendirikan PT baru yang difungsikan sebagai Perusahaan Induk (*Holding*).  
* **Pilih KBLI yang Tepat:** Saat mengurus perizinan di sistem OSS (Sistem Perizinan Berusaha Terintegrasi Secara Elektronik), pastikan Notaris memilih **KBLI 64200 (Aktivitas Perusahaan Holding)**. PT dengan KBLI ini sah secara hukum untuk menampung saham perusahaan lain, menerima dividen, dan berinvestasi, tanpa perlu memiliki operasional bisnis (pabrik / toko).  
* **Tentukan Pemegang Saham Utama:** Jadikan Anda (dan istri, jika relevan) sebagai pemegang saham mayoritas dan Direktur Utama. Nama anak-anak yang konsumtif *jangan* dimasukkan ke dalam Akta Pendirian PT Holding ini dulu (akan diatur di tahap distribusi dividen nanti).  
* **Buka Rekening Bank Khusus *Holding*:** Buka rekening giro atas nama PT Holding. Rekening ini akan menjadi muara akhir dari seluruh pendapatan bisnis-bisnis operasional Anda.

#### **Fase 2: Restrukturisasi Aset & Arus Kas (Bulan ke-2 & 3\)**

* **Pindahkan Saham Bisnis Operasional:** Jika Anda saat ini punya bisnis online / offline berbadan hukum (PT A, PT B), ubah akta kepemilikannya di notaris. Jadikan PT *Holding* Anda sebagai pemilik saham mayoritas di PT A dan PT B. (Jika bisnis Anda belum ber-PT, keuntungan bersih rutin ditransfer ke PT Holding sebagai "Setoran Modal" atau "Pinjaman Pemegang Saham").  
* **Sedot Keuntungan Bisnis (*Sweeping* Kas):** Setiap akhir kuartal atau akhir tahun, PT operasional Anda membagikan keuntungan bersihnya ke PT *Holding* dalam bentuk dividen antar-perusahaan. (Catatan: Dividen antar-PT di Indonesia adalah **Bebas Pajak murni** tanpa syarat investasi).  
* **Hasil Akhir Fase 2:** Rekening pribadi Anda tetap "miskin" (saldo di bawah Rp1 Miliar, aman dari AEOI / ILAP). Sebaliknya, rekening PT *Holding* akan membengkak.

#### **Fase 3: Pencairan Kekayaan Pribadi Bebas Pajak (Rutinitas Tahunan)**

* **Lakukan RUPS Tahunan (Internal):** PT *Holding* menyelenggarakan Rapat Umum Pemegang Saham (Anda sendiri) dan memutuskan untuk mencairkan uang tunai ke rekening pribadi Anda sebagai dividen.  
* **Transfer Dividen:** Transfer uang dari PT *Holding* ke rekening pribadi Anda dengan keterangan mutasi: "Pembagian Dividen Tahun Buku 202X".  
* **Eksekusi Syarat Bebas Pajak (Crucial Step):** Setelah uang masuk ke rekening pribadi, Anda punya batas waktu hingga **Maret tahun berikutnya** untuk membelikan uang tersebut menjadi Emas Batangan (Fisik) murni, Obligasi Negara (SBN), atau diinvestasikan ke instrumen finansial yang diatur PMK 18 / 2021\. *(Tips: Ubah langsung menjadi Emas Batangan Fisik seperti strategi Bab 2\. Simpan di brankas).*  
* **Lapor di DJP Online:** Minta Konsultan Pajak Anda untuk login ke situs DJP Online pribadi Anda. Masuk ke menu **e-Reporting Investasi**. Laporkan bahwa Anda menerima dividen X Rupiah, dan telah diwujudkan dalam bentuk Emas Fisik sebesar X Rupiah.  
* **Selesai:** Selamat, Anda baru saja memindahkan miliaran rupiah ke kantong pribadi / brankas rumah, secara legal, tanpa membayar pajak penghasilan sepeser pun.

## 

## 

## 

## 

## **7.2 Sabuk Pengaman Generasi Konsumtif: Memutus Hak Jual dan Distribusi Berbasis *Yield***

Strategi ini dirancang untuk memastikan ahli waris yang tidak kompeten tetap bisa hidup mewah (menerima uang saku dan fasilitas), tetapi mereka **secara hukum tidak memiliki kuasa untuk menjual, menggadaikan, atau mencairkan aset induk (pokok kekayaan)**.

### **A. Mekanisme Hukum Praktikal di Indonesia**

1. **Trik Saham Multi-Kelas di PT**  Hukum PT di Indonesia mengizinkan pembuatan "Klasifikasi Saham" (Pasal 53 UU PT). Anda bisa memecah saham menjadi dua kelas:  
   * **Saham Kelas A (Hak Suara & Kendali):** Dipegang oleh Anda, dan kelak diwariskan kepada anak yang *kompeten* atau kepada pihak profesional. Pemegang saham ini berhak mengambil keputusan bisnis, menjual aset PT, dan memecat Direktur.  
   * **Saham Kelas B (Hak Ekonomi / Dividen Saja):** Diwariskan kepada anggota keluarga yang *konsumtif*. Pemegang saham ini BUKAN direktur, TIDAK memiliki hak suara di RUPS (tidak bisa menuntut jual aset PT), tetapi berhak menerima transferan dividen rutin setiap tahun / bulan.  
2. **Fasilitas Hak Pakai via Yayasan:** Jika ahli waris konsumtif membutuhkan rumah mewah, rumah tersebut diakuisisi atas nama Yayasan Keluarga. Yayasan mengeluarkan "Surat Keputusan Hak Pakai" untuk anak tersebut. Dia bisa tinggal di sana selamanya, tetapi karena namanya bukan pemilik di SHM, dia tidak bisa menjaminkan sertifikat tersebut ke bank atau meminjam uang ke rentenir.  
3. **Konstitusi Keluarga (*Family Constitution*):** Sebuah dokumen perjanjian perdata privat yang mengatur "syarat dan ketentuan" menikmati harta keluarga. Misalnya: Jika anak terbukti berjudi atau terjerat pinjol, hak dividennya akan dibekukan sementara oleh Direktur PT *Holding*.

### **B. Kebutuhan Profesional: Wajib Bantuan Ahli**

Anda **TIDAK BISA** melakukan fase ini sendiri. Anda memerlukan pendampingan ketat dari:

* **Pengacara Keluarga / *Corporate Lawyer*:** Wajib. Anda butuh mereka untuk merancang draf *Family Constitution* dan *Shareholders Agreement* (Perjanjian Pemegang Saham) yang kedap hukum dan tidak bisa digugat ke pengadilan oleh anak yang merasa "dianaktirikan".  
* **Notaris Spesialis Korporasi:** Notaris biasa yang sering mengurus jual-beli tanah mungkin kurang paham cara memasukkan klausul "Saham Kelas A dan B" ke dalam Anggaran Dasar PT. Anda butuh notaris yang terbiasa menangani *corporate action* atau M\&A.

### **C. *Action Plan* / *To-Do List* (Langkah Praktis Implementasi 7.2)**

Berikut adalah panduan eksekusi untuk mengamankan harta dari generasi penerus yang berisiko:

#### **Fase 1: Asesmen Ahli Waris dan Klasifikasi Harta (Bulan 1\)**

* **Lakukan Audit Anggota Keluarga:** Buat daftar ahli waris secara objektif. Siapa yang kompeten memegang kendali bisnis? Siapa yang hanya bisa menghabiskan uang? (Ini menentukan siapa yang akan mendapat Saham Kelas A dan Kelas B).  
* **Klasifikasi Aset:** Pisahkan aset fisik (rumah / tanah) ke dalam ranah **Yayasan**, dan aset likuid / bisnis ke dalam ranah **PT Holding** (seperti yang telah dibuat di 7.1). Jangan biarkan aset berharga atas nama pribadi Anda.

#### **Fase 2: Perombakan Akta dan Penguncian Aset (Bulan 2 \- 3\)**

* **Revisi Anggaran Dasar PT Holding (via Notaris):** Perintahkan notaris untuk mengubah Anggaran Dasar PT Holding Anda. Minta agar dibuatkan dua klasifikasi saham:  
  * Kelas A: Hak suara mayoritas, tanpa / dengan dividen.  
  * Kelas B: Tanpa hak suara, hak atas dividen preferen.  
* **Distribusikan Saham Kelas B:** Berikan Saham Kelas B kepada anak / kerabat konsumtif. (Ini membuat mereka merasa "memiliki" perusahaan, padahal secara hukum tangan mereka terikat).  
* **Amankan SHM ke Yayasan:** Pindahkan rumah-rumah atau properti yang digunakan anak-anak ke atas nama Yayasan (jika masih atas nama Anda). Jadikan diri Anda sebagai **Pembina Yayasan** (pemegang kuasa tertinggi yang tidak bisa digulingkan).

#### **Fase 3: Penyusunan "Buku Suci" Keluarga (Bulan 4\)**

* **Sewa Pengacara untuk Membuat Konstitusi Keluarga:** Duduk bersama *corporate lawyer* dan buat dokumen *Family Constitution*. Masukkan klausul wajib, seperti:  
  * Dividen dibagikan bulanan / kuartalan, bukan *lump sum* (agar tidak langsung dihabiskan).  
  * PT Holding dan Yayasan tidak akan menalangi utang pribadi ahli waris.  
  * Syarat mencairkan dana darurat (misal: sakit kritis atau pendidikan).  
* **Tandatangani Secara Notariil (*Waarmerking*):** Pastikan dokumen ini ditandatangani oleh seluruh ahli waris di hadapan / dicatat oleh notaris agar memiliki kekuatan pembuktian yang sah di mata hukum perdata.

#### **Fase 4: Eksekusi *Auto-Pilot* (Rutinitas Berjalan)**

* **Tunjuk Akuntan / Profesional sebagai Manajer:** Jika suatu hari Anda (sebagai *Patriarch / Matriarch*) sudah tidak sanggup mengurus, pekerjakan seorang Direktur Profesional (bukan keluarga) di PT Holding.  
* **Jalankan *Stipend* (Gaji / Dividen Buta):** Direktur profesional inilah yang akan mentransfer dividen atau "uang saku" secara rutin ke rekening anak konsumtif Anda, berpegang teguh pada Konstitusi Keluarga yang sudah Anda buat. Jika anak tersebut protes minta jual aset, Direktur Profesional punya dasar hukum yang kuat (Akta PT dan Konstitusi) untuk menolaknya.

## 

## **7.3 Skema Distribusi Kesejahteraan Keluarga: Jalur *Corporate Payroll* dan Hibah Bebas Pajak**

Konsep utamanya adalah membedakan perlakuan antara keluarga **Garis Lurus 1 Derajat** (Orang tua kandung dan Anak kandung) dengan keluarga **Menyamping / Beda Derajat** (Adik, Kakak, Mertua, Keponakan). Hukum pajak Indonesia memperlakukan kedua kelompok ini secara berbeda.

### **A. Mekanisme Kerja & Celah Legal (Loophole) yang Digunakan**

1. **Jalur Hibah 1 Derajat (Untuk Orang Tua Kandung & Anak Kandung):**  
   * Menurut UU HPP (Pajak Penghasilan), pemberian harta / uang dari anak ke orang tua kandung (atau sebaliknya) adalah **Bukan Objek Pajak**.  
   * **Syarat Krusial:** Uang JANGAN ditransfer langsung dari rekening PT ke orang tua Anda. Alurnya harus: → PT Holding transfer dividen bebas pajak ke rekening Pribadi Anda (berdasarkan strategi 7.1) →  Anda transfer uang tersebut ke Orang Tua Kandung. Ini 100% legal dan bebas pajak, berapa pun nominalnya.  
2. **Jalur**   
   * Hibah uang tunai bernominal besar kepada mertua atau adik **dikenakan pajak** bagi mereka. Solusinya: Jangan beri mereka "uang jajan", berikan mereka **"Gaji / Honorarium"**.  
   * Angkat Mertua / Adik sebagai **Dewan Komisaris** di PT Holding Anda, atau sebagai **Pengawas** di Yayasan Keluarga.  
   * Berikan gaji bulanan di bawah PTKP (Penghasilan Tidak Kena Pajak), yakni maksimal **Rp 4.500.000 / bulan** (Rp 54.000.000 / tahun) per orang. Mertua dan adik menerima uang bersih tanpa harus bayar PPh 21, dan hebatnya, total pengeluaran gaji ini menjadi **Biaya Pengurang Pajak (*Deductible Expense*)** bagi PT Anda, sehingga PT Anda membayar PPh Badan lebih kecil di akhir tahun.  
3. **Fasilitas Natura & Asuransi (UU HPP & PMK 66 / 2023):**  
   * Alih-alih mentransfer Rp 30 juta ke adik untuk beli motor, biarkan PT Holding yang membeli motor tersebut (dicatat sebagai aset inventaris PT). Serahkan motor itu ke adik Anda (yang berstatus sebagai Komisaris) sebagai "Fasilitas Kendaraan Jabatan".  
   * Asuransi kesehatan mertua yang berumur lanjut (yang premi-nya mahal) dibayarkan langsung oleh PT ke pihak asuransi (Prudential, Allianz, dll) atas nama "Proteksi Kesehatan Dewan Komisaris". Ini sah sebagai pengurang pajak perusahaan.

### **B. Kebutuhan Profesional: Bisa Sendiri atau Butuh Bantuan?**

Untuk mengatur skema *payroll* dan kedudukan hukum ini, Anda membutuhkan:

* **Konsultan Pajak / Admin Pajak Internal (Brevet A / B):** Wajib. Meski gaji mertua / adik di bawah PTKP (Rp 4.500.000), PT *tetap wajib* melaporkan SPT Masa PPh 21 setiap bulan dengan status "Nihil". Jika tidak dilapor, PT Anda akan kena denda administrasi.  
* **Notaris:** Dibutuhkan HANYA JIKA Anda ingin memasukkan nama mertua, istri, atau adik ke dalam Akta PT sebagai anggota Dewan Komisaris atau Pengurus Yayasan secara resmi (Sangat disarankan agar valid di mata hukum).

### **C. *Action Plan* / *To-Do List* (Langkah Praktis Implementasi 7.3)**

Berikut adalah cara mengeksekusi "Sistem Penggajian Keluarga" ini dalam hitungan minggu:

#### **Fase 1: Pemetaan "Tanggungan" Keluarga (Bulan 1\)**

* **Buat Daftar Tanggungan:** Catat siapa saja yang rutin Anda biayai setiap bulan.  
* **Pisahkan Kategori:**  
  * *Grup 1 (Garis Lurus):* Ayah Kandung, Ibu Kandung, Anak Kandung.  
  * *Grup 2 (Menyamping):* Ayah Mertua, Ibu Mertua, Adik / Kakak Kandung, Adik Ipar, Istri (Jika ada NPWP pisah).  
* **Hitung Kebutuhan Bulanan:** Tentukan nominal yang mereka butuhkan. Jika kebutuhan Grup 2 di atas Rp 4.500.000 / bulan, pecah sisanya ke dalam bentuk pembayaran Asuransi / Natura langsung oleh PT.

#### **Fase 2: Legalisasi Status di Entitas (Bulan 2\)**

* **Revisi Akta di Notaris (Untuk Grup 2):** Bawa Akta PT Holding dan Akta Yayasan ke Notaris. Masukkan nama Ayah / Ibu Mertua atau Adik sebagai Dewan Komisaris di PT Holding, atau sebagai Pengawas / Pengurus di Yayasan. (Tidak perlu memberi mereka saham, cukup jabatan saja).  
* **Buat SK Pengangkatan & Gaji:** Buat Surat Keputusan (SK) internal perusahaan yang menyatakan bahwa Komisaris A (Mertua) menerima honorarium sebesar Rp 4.500.000,- per bulan.  
* **Pendaftaran Asuransi Korporat:** Hubungi agen asuransi Anda, ubah pembayaran polis asuransi kesehatan keluarga agar di-debet otomatis dari Rekening Giro PT Holding, bukan dari rekening pribadi Anda.

#### **Fase 3: Eksekusi *Cashflow* & Pelaporan Rutin (Bulan 3 dan seterusnya)**

* **Transfer Jalur Grup 1 (Orang Tua Kandung):** Saat dividen bebas pajak dari PT Holding cair ke rekening pribadi Anda, buat transfer rutin bulanan ke rekening Orang Tua Kandung dengan keterangan transaksi: "Hibah Biaya Hidup Anak ke Orang Tua". (Simpan bukti ini, ini adalah senjata absolut jika DJP mempertanyakan rekening orang tua Anda).  
* **Transfer Jalur Grup 2 (Mertua / Adik):** Transfer dari Rekening PT Holding langsung ke rekening Mertua / Adik setiap tanggal gajian, dengan keterangan transaksi: "Gaji / Honorarium Komisaris Bulan X".  
* **Lapor PPh 21 (Setiap Bulan):** Instruksikan admin / konsultan pajak Anda untuk melaporkan SPT Masa PPh 21 PT Holding. Nama mertua dan adik dimasukkan ke daftar penerima penghasilan di bawah PTKP. Status pelaporan: Nihil (tidak ada uang pajak yang dibayar ke negara, tapi laporan sah tercatat).  
* **Catat Aset Natura (Tahunan):** Jika PT membeli mobil / motor untuk dipakai adik, pastikan akuntan Anda memasukkan biaya depresiasi (penyusutan) kendaraan tersebut ke dalam laporan keuangan PT di akhir tahun. Ini akan memotong Laba Bersih PT, sehingga PPh Badan PT Anda turun.

## 

## **7.4 Benteng Properti Yayasan: Akuisisi SHM Kebal Sita dan Fasilitas *Rumah Dinas* Keluarga**

Berdasarkan **Peraturan Pemerintah (PP) No. 38 Tahun 1963**, Yayasan Keagamaan dan Sosial adalah salah satu dari sedikit badan hukum di Indonesia yang **diizinkan memiliki tanah berstatus Sertifikat Hak Milik (SHM)**. Kita akan memanfaatkan regulasi ini untuk mengubah Yayasan Keluarga menjadi brankas properti yang tidak bisa disentuh oleh kreditor, pengadilan perceraian, maupun pajak progresif pribadi.

### **A. Mekanisme Kerja & Celah Legal (Loophole) yang Digunakan**

1. **Pemegang Kendali Mutlak (** Dalam struktur Yayasan (UU No. 16 / 2001), kekuasaan tertinggi ada pada **Pembina Yayasan**. Anda (dan istri) duduk sebagai Pembina. Pembina tidak bisa digaji, tetapi Pembina berhak mengangkat dan memecat *Pengurus* kapan saja. Tidak ada satu pun aset Yayasan yang bisa dijual tanpa tanda tangan Pembina.  
2. **Kekebalan Aset (*Asset Shielding*):** Karena Yayasan berbadan hukum nirlaba, rumah SHM yang dibeli atas nama Yayasan adalah murni milik Yayasan. Jika anak Anda (yang menempati rumah tersebut) terlilit utang pinjol, digugat cerai, atau bangkrut, pengadilan dan bank **tidak bisa menyita rumah tersebut** karena secara hukum rumah itu bukan milik anak Anda.  
3. **Justifikasi "Fasilitas Rumah Dinas":** Bagaimana caranya anak atau mertua bisa tinggal di sana secara legal? Anda (sebagai Pembina) mengangkat mereka sebagai *Pengurus* (Ketua / Sekretaris) atau *Pengawas* Yayasan. Kemudian, Yayasan menerbitkan **SK Hak Pakai Fasilitas**. Rumah mewah tersebut dicatat sebagai "Rumah Dinas Pengurus Yayasan".  
4. **Pendanaan Bebas Pajak (Hibah):** Uang untuk membeli properti disuntikkan dari pribadi Anda atau dari PT Holding ke Rekening Yayasan dalam bentuk **Sumbangan / Hibah**. Menurut UU PPh, sumbangan ke yayasan sosial / keagamaan yang tidak memiliki hubungan usaha adalah **Bukan Objek Pajak**.

### **B. Kebutuhan Profesional: Bantuan Ahli yang Wajib Ada**

* **Notaris & PPAT (Pejabat Pembuat Akta Tanah):** Wajib. Notaris untuk mendirikan badan hukum Yayasan di Kemenkumham, dan PPAT untuk memproses akta jual beli (AJB) dan balik nama SHM di BPN (Badan Pertanahan Nasional) ke atas nama Yayasan.  
* **Akuntan / Admin Internal:** Untuk merapikan pembukuan Yayasan, karena Yayasan tetap harus lapor SPT Tahunan (meski statusnya Nihil pajak).

### **C. *Action Plan* / *To-Do List* (Langkah Praktis Implementasi 7.4)**

Berikut adalah panduan langkah demi langkah untuk mengeksekusi strategi pembelian properti ini:

#### **Fase 1: Setup Yayasan "Baju Baja" (Bulan 1\)**

* **Pilih Nama & Tujuan Sosial:** Datangi Notaris. Dirikan Yayasan dengan nama keluarga (misal: *Yayasan Bakti Karya Keluarga*). Pilih bidang operasional: **Sosial dan Kemanusiaan**.  
* **Kunci Struktur Jabatan (Krusial):**  
  * **Pembina (Kekuasaan Absolut):** Anda dan Istri.  
  * **Pengawas:** Orang tua kandung atau Mertua.  
  * **Pengurus (Ketua / Bendahara / Sekretaris):** Anak-anak Anda atau adik kandung.  
* **Buka Rekening Yayasan:** Buka rekening giro / tabungan di bank atas nama Yayasan tersebut.

#### **Fase 2: Suntikan Dana Legal (*Tax-Free Injection*) (Bulan 2\)**

* **Pindahkan Uang untuk Beli Rumah:**  
  * *Opsi 1:* Transfer dari rekening pribadi Anda ke rekening Yayasan. (Keterangan: "Hibah Pribadi untuk Yayasan").  
  * *Opsi 2:* Transfer dari rekening PT Holding Anda. (Keterangan: "Dana CSR / Sumbangan Perusahaan").  
* *Catatan:* Aliran dana ini 100% legal dan tidak memicu pajak bagi Yayasan maupun Anda.

#### **Fase 3: Eksekusi Beli Properti *Under the Radar* (Bulan 3\)**

* **Cari Properti Bekas / P2P:** Sesuai strategi dasar di awal dokumen, JANGAN beli properti dari *Developer* raksasa karena data Anda akan langsung dikirim ke sistem pajak. Belilah rumah SHM bekas pakai dari individu (orang biasa) secara *Peer-to-Peer*.  
* **AJB & Balik Nama di PPAT:** Lakukan transaksi jual beli di hadapan PPAT. Pastikan PPAT memproses balik nama SHM dari penjual langsung ke **atas nama Yayasan**, bukan nama Anda pribadi.  
* **Bayar BPHTB:** Yayasan membayar Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB) seperti biasa. Legalitas bersih dan sempurna di mata negara.

#### **Fase 4: Legitimasi Penggunaan & Pengaburan Jejak (Bulan 4 & Rutinitas)**

* **Terbitkan SK Hak Pakai:** Sebagai Pembina, buat "Surat Keputusan Pembina Yayasan" yang isinya menetapkan bahwa rumah di alamat X difungsikan sebagai rumah dinas untuk ditempati oleh Pengurus (Sebutkan nama anak / mertua yang menempatinya).  
* **Bayar PBB & Utilitas via Yayasan:** Pastikan tagihan Listrik, Air, dan Pajak Bumi & Bangunan (PBB) dibayar menggunakan uang dari **rekening Yayasan**, bukan rekening pribadi anak Anda. Ini menguatkan bukti hukum bahwa rumah itu murni operasional Yayasan.  
* **Lakukan Kegiatan Sosial (Wajib \- *Alibi Maintenance*):** Agar Yayasan Anda tidak dicabut status hukumnya oleh pemerintah karena dianggap "Yayasan Bodong", **sisihkan 1% \- 5% dari kas Yayasan setiap bulan untuk kegiatan sosial nyata.** (Misal: Mentransfer Rp 2 juta / bulan ke panti asuhan, atau membagikan sembako tiap Jumat). Dokumentasikan (foto / kuitansi) kegiatan ini. Ini adalah "biaya keamanan" (*cover story*) yang sangat murah untuk melindungi aset miliaran rupiah.

#### **Works cited**

1\. UMKM Harus Tahu, Omzet Rp500 Juta Tidak Kena Pajak, https: /  / www.pajak.go.id / id / berita / umkm-harus-tahu-omzet-rp500-juta-tidak-kena-pajak 2\. Ketentuan Terbaru PPh Final 0,5% dalam PP 55 Tahun 2022, WPOP Terima Tambahan “Fasilitas”\! \- Konsultan Pajak Surabaya, https: /  / konsultanpajaksurabaya.com / ketentuan-terbaru-pph-final-05-dalam-pp-55-tahun-2022-wpop-terima-tambahan-fasilitas 3\. Saat membeli rumah pada developer perumahan namun alas hak yang saya dapat hanya Sertifikat Hak Guna Bangunan (SHGB), apakah saya dapat mengubah alas hak tersebut menjadi Sertifikat Hak Milik (SHM) dan apakah SHGB lebih lemah dibanding SHM? \- Halo JPN | Beranda, https: /  / halojpn.kejaksaan.go.id / publik / d / permohonan / 2025-QYRP 4\. DJP Kini Punya Wewenang Intip Rekening Pribadi Hingga Rp1 Miliar \- Berita Pajak, https: /  / artikel.pajakku.com / djp-kini-punya-wewenang-intip-rekening-pribadi-hingga-rp1-miliar 5\. Rekening Dengan Saldo 1 Miliar, Apakah Langsung Diawasi Oleh Direktorat Jenderal Pajak?, https: /  / pajakstartup.com / 2024 / 12 / 03 / rekening-dengan-saldo-1-miliar-apakah-langsung-diawasi-oleh-direktorat-jenderal-pajak /  6\. Saldo Rekening 1 Miliar Rupiah dan Hal Penting Harus Diketahui, https: /  / klikpajak.id / blog / saldo-rekening-diatas-1-miliar /  7\. Panduan Perseroan Perorangan (PT Perorangan) di 2022, https: /  / infiniti.id / perseroan-perorangan 8\. 7 Syarat Pembelian Mobil atas Nama Perusahaan, Wajib Tahu\! \- Auto2000, https: /  / auto2000.co.id / berita-dan-tips / syarat-pembelian-mobil-atas-nama-perusahaan 9\. Catat\! Ini Syarat Beli Mobil Atas Nama Perusahaan \- Otoklix, https: /  / blog.otoklix.com / syarat-beli-mobil-atas-nama-perusahaan /  10\. Ketentuan Aturan Pajak UMKM Terbaru: Panduan Lengkap 2025, https: /  / pajak.io / ketentuan-aturan-pajak-umkm-terbaru-panduan-lengkap-2025 /  11\. 1\. Sertifikat Hak Milik (SHM) \- kantor pertanahan kab. solok \- ATR / BPN, https: /  / kab-solok.atrbpn.go.id / informasi%20pertanahan / apa-saja-jenis-sertipikat-tanah 12\. Pengawasan Pajak Perdagangan di Marketplace dan Medsos, Ini Kata DJP \- DDTC News, https: /  / news.ddtc.co.id / berita / nasional / 1797750 / pengawasan-pajak-perdagangan-di-marketplace-dan-medsos-ini-kata-djp 13\. Lakukan Blokir Rekening Bank dan Sita Aset Penunggak Pajak, Kanwil DJP Wajib Pajak Besar Berhasil Amankan Penerimaan Negara Rp4,121 Triliun, https: /  / www.pajak.go.id / id / siaran-pers / lakukan-blokir-rekening-bank-dan-sita-aset-penunggak-pajak-kanwil-djp-wajib-pajak-besar 14\. Perseroan Perorangan \- Beranda | Laman Resmi Kantor Wilayah Kementerian Hukum, https: /  / jakarta.kemenkum.go.id / adm-hukum-umum / notaris?view=article\&id=645\&catid=57 15\. Cara Bikin PT Perorangan Dengan Mudah Sesuai UU Cipta Kerja \- easylegal, https: /  / easylegal.id / cara-bikin-pt-perorangan-dengan-mudah-sesuai-uu-cipta-kerja /  16\. Peraturan Menteri Keuangan Nomor: 66 Tahun 2023 \- Ortax \- Data Center, https: /  / datacenter.ortax.org / ortax / aturan / show / 25220 17\. Beli Mobil Cash Tanpa NPWP, Bagaimana Caranya? \- Ajaib, https: /  / ajaib.co.id / belajar / perencanaan-keuangan / beli-mobil-cash-tanpa-npwp-bagaimana-caranya