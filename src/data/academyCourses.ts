export type CourseTier = "Tier 0" | "Tier 1" | "Tier 2" | "Tier 3" | "Tier 4"

export interface AcademyCourse {
  slug: string
  title: string
  topic: string
  tier: CourseTier
  level: "Pemula" | "Menengah" | "Lanjutan"
  price: number
  duration: string
  lessons: number
  targetMarket: string
  promise: string
  shortDescription: string
  outcomes: string[]
  curriculum: string[]
  overlookedAngles: string[]
  relatedArticleClusters: string[]
}

export const academyCourses: AcademyCourse[] = [
  {
    slug: "blueprint-bebas-utang",
    title: "Blueprint Bebas Utang",
    topic: "Survival & Debt Relief",
    tier: "Tier 0",
    level: "Pemula",
    price: 399000,
    duration: "4 minggu",
    lessons: 18,
    targetMarket: "Korban pinjol, keluarga yang cicilan menumpuk, pekerja UMR, dan orang yang sedang dikejar penagihan.",
    promise: "Punya peta utang, prioritas bayar, skrip negosiasi, dan rencana 90 hari tanpa menambah pinjaman baru.",
    shortDescription:
      "Kursus praktis untuk keluar dari mode panik: audit utang, negosiasi, bukti penagihan, budget survival, dan pemulihan cashflow.",
    outcomes: [
      "Membuat daftar utang yang bisa dipakai untuk negosiasi",
      "Memilih strategi snowball, avalanche, atau restrukturisasi",
      "Menyiapkan bukti dan batas komunikasi dengan penagih",
      "Membuat budget 4 minggu agar tidak gali lubang baru",
    ],
    curriculum: [
      "Audit utang dan klasifikasi legal, ilegal, produktif, konsumtif",
      "Urutan prioritas bayar saat uang tidak cukup",
      "Skrip negosiasi kreditur dan restrukturisasi cicilan",
      "Bukti chat, telepon, surat, dan kronologi kasus",
      "Budget survival, dana aman mingguan, dan pencegahan relapse",
    ],
    overlookedAngles: [
      "Banyak kursus utang mengabaikan tekanan keluarga dan rasa malu",
      "Jarang membahas bukti penagihan sebagai aset hukum",
      "Sering terlalu fokus motivasi, bukan keputusan saat uang benar-benar kurang",
    ],
    relatedArticleClusters: ["Pinjol", "Debt Collector", "Budget Defense", "Restrukturisasi"],
  },
  {
    slug: "freelance-global",
    title: "Freelance Global dari Nol",
    topic: "Career & Digital Work",
    tier: "Tier 1",
    level: "Pemula",
    price: 799000,
    duration: "6 minggu",
    lessons: 24,
    targetMarket: "Fresh graduate, admin olshop, VA pemula, pekerja UMR, dan pembaca yang ingin income global tanpa modal besar.",
    promise: "Membangun skill offer, portfolio, profil marketplace, dan sistem outreach untuk mendapatkan klien pertama.",
    shortDescription:
      "Kursus tindakan untuk masuk pasar freelance global: pilih skill, bikin portfolio, pitch, pricing, dan proses delivery.",
    outcomes: [
      "Menentukan niche freelance yang masuk akal untuk kondisi peserta",
      "Membuat 3 sample portfolio yang bisa dikirim ke klien",
      "Menyusun pitch email, DM, dan proposal pendek",
      "Membuat workflow delivery agar klien pertama tidak kacau",
    ],
    curriculum: [
      "Pemetaan skill high-income yang realistis dipelajari otodidak",
      "Portfolio case study tanpa pengalaman formal",
      "Marketplace, LinkedIn, cold email, dan referral lokal",
      "Pricing paket pemula, revisi, scope, dan invoice",
      "Delivery checklist, komunikasi klien, dan retainer pertama",
    ],
    overlookedAngles: [
      "Kursus freelance sering menjual mimpi dollar tanpa membahas jam kerja dan bahasa",
      "Jarang ada contoh portfolio spesifik untuk non-designer",
      "Sering lupa mengajarkan scope agar pemula tidak dikerjai klien",
    ],
    relatedArticleClusters: ["Virtual Assistant", "Freelance", "Portfolio", "High-Income Skill"],
  },
  {
    slug: "jualan-online-profit",
    title: "Jualan Online Profit dari Produk Pertama",
    topic: "Commerce & UMKM",
    tier: "Tier 1",
    level: "Pemula",
    price: 699000,
    duration: "5 minggu",
    lessons: 22,
    targetMarket: "UMKM kecil, reseller, dropshipper, penjual makanan online, dan creator commerce.",
    promise: "Mampu memilih produk, menghitung harga, menguji pasar, dan membaca margin sebelum scale.",
    shortDescription:
      "Kursus untuk membangun toko kecil yang sehat secara angka, bukan sekadar ramai order tapi rugi diam-diam.",
    outcomes: [
      "Menghitung HPP, biaya platform, margin, dan batas diskon",
      "Membuat validasi produk murah sebelum stok besar",
      "Menyusun konten jualan 30 hari",
      "Membaca cashflow toko sederhana",
    ],
    curriculum: [
      "Validasi produk dan sinyal demand lokal",
      "Pricing, HPP, platform fee, diskon, dan bundling",
      "Konten jualan pendek untuk TikTok, IG, marketplace, dan WA",
      "SOP packing, komplain, refund, dan repeat order",
      "Dashboard angka toko: omzet, gross profit, cash conversion",
    ],
    overlookedAngles: [
      "Banyak kursus jualan tidak memaksa peserta menghitung HPP dengan benar",
      "Jarang membahas fee platform dan promo yang menggerus margin",
      "Sering terlalu fokus ads sebelum produk dan repeat order terbukti",
    ],
    relatedArticleClusters: ["Online Shop", "Dropship", "Reseller", "Food Business", "Pricing"],
  },
  {
    slug: "sop-bisnis-owner",
    title: "SOP Bisnis: Dari Operator ke Owner",
    topic: "Business Systems",
    tier: "Tier 2",
    level: "Menengah",
    price: 1500000,
    duration: "8 minggu",
    lessons: 32,
    targetMarket: "Pemilik UMKM yang sudah ada omzet tetapi masih terjebak kerja operasional harian.",
    promise: "Mengubah bisnis dari bergantung pada pemilik menjadi punya proses, KPI, delegasi, dan kontrol kualitas.",
    shortDescription:
      "Kursus sistem bisnis untuk menulis SOP, mengukur kerja tim, dan membangun ritme manajemen mingguan.",
    outcomes: [
      "Membuat peta proses dari lead sampai repeat order",
      "Menulis SOP operasional yang dipakai tim, bukan dokumen pajangan",
      "Membuat KPI dan meeting cadence mingguan",
      "Menentukan tugas yang bisa didelegasikan lebih dulu",
    ],
    curriculum: [
      "Business process map dan bottleneck utama",
      "SOP format ringkas: tujuan, PIC, checklist, bukti selesai",
      "Delegasi, hiring scorecard, dan training karyawan baru",
      "Dashboard KPI penjualan, operasional, stok, dan cashflow",
      "Audit mingguan owner: angka, orang, proses, dan risiko",
    ],
    overlookedAngles: [
      "Kursus SOP sering terlalu administratif dan tidak menyentuh cashflow",
      "Jarang membahas resistensi tim saat sistem baru diterapkan",
      "Banyak yang lupa membedakan SOP wajib dan SOP yang terlalu cepat dibuat",
    ],
    relatedArticleClusters: ["SOP", "UMKM", "Delegasi", "Business Scaling"],
  },
  {
    slug: "investasi-karyawan",
    title: "Investasi Karyawan Anti FOMO",
    topic: "Investment Foundation",
    tier: "Tier 2",
    level: "Pemula",
    price: 999000,
    duration: "6 minggu",
    lessons: 24,
    targetMarket: "Karyawan, profesional muda, dan keluarga produktif yang ingin mulai investasi tanpa ikut hype.",
    promise: "Membangun alokasi aset sederhana berbasis tujuan, dana darurat, risiko, dan horizon investasi.",
    shortDescription:
      "Kursus untuk membedakan tabungan, dana darurat, reksa dana, obligasi, saham, dan instrumen berisiko tinggi.",
    outcomes: [
      "Menentukan profil risiko dan alokasi aset awal",
      "Memisahkan dana darurat, sinking fund, dan investasi",
      "Membuat rules beli berkala dan rebalancing",
      "Menghindari FOMO saham, crypto, dan instrumen tidak cocok",
    ],
    curriculum: [
      "Fondasi: cash buffer sebelum investasi",
      "Profil risiko, horizon, likuiditas, dan drawdown",
      "Reksa dana, SBN, saham blue chip, ETF, dan deposito",
      "Dollar cost averaging, rebalancing, dan jurnal investasi",
      "Kesalahan FOMO, leverage, dan influencer risk",
    ],
    overlookedAngles: [
      "Banyak kursus investasi mengabaikan dana darurat dan kebutuhan likuiditas",
      "Jarang membahas perilaku saat portofolio turun",
      "Sering terlalu fokus instrumen, bukan sistem keputusan",
    ],
    relatedArticleClusters: ["Investment Risk", "Emergency Fund", "Reksa Dana", "Saham", "SBN"],
  },
  {
    slug: "properti-franchise-roi",
    title: "Properti & Franchise ROI Lab",
    topic: "Asset Builder",
    tier: "Tier 3",
    level: "Lanjutan",
    price: 2500000,
    duration: "8 minggu",
    lessons: 30,
    targetMarket: "Entrepreneur, profesional senior, dan keluarga yang mulai membeli aset produktif.",
    promise: "Mampu membaca ROI properti dan franchise dengan skenario konservatif sebelum membeli.",
    shortDescription:
      "Kursus analisis aset nyata: yield, okupansi, capex, royalty, payback, risiko lokasi, dan exit plan.",
    outcomes: [
      "Membuat model ROI properti sewa dan franchise outlet",
      "Membedakan cashflow bagus dan cerita marketing bagus",
      "Menghitung skenario rugi, okupansi rendah, dan biaya tersembunyi",
      "Membuat checklist due diligence sebelum transaksi",
    ],
    curriculum: [
      "Unit economics properti: harga, renovasi, sewa, okupansi, maintenance",
      "Unit economics franchise: capex, COGS, royalty, gaji, sewa",
      "Due diligence lokasi, legalitas, kontrak, dan operator",
      "Stress test: penjualan turun, tenant kosong, biaya naik",
      "Exit plan, refinancing, partnership, dan proteksi aset",
    ],
    overlookedAngles: [
      "Banyak kursus properti/franchise terlalu optimis memakai angka brosur",
      "Jarang membahas biaya legal, pajak, renovasi, dan vacancy secara konservatif",
      "Sering lupa bahwa operator buruk bisa menghancurkan aset bagus",
    ],
    relatedArticleClusters: ["Property", "Franchise", "ROI", "Due Diligence", "Asset Builder"],
  },
  {
    slug: "holding-company-legal",
    title: "Holding Company Legal untuk Pengusaha",
    topic: "Legal, Tax & Structure",
    tier: "Tier 3",
    level: "Lanjutan",
    price: 3500000,
    duration: "6 minggu",
    lessons: 20,
    targetMarket: "Pengusaha dengan beberapa lini usaha, aset keluarga, atau risiko operasional yang mulai kompleks.",
    promise: "Memahami kapan holding dibutuhkan, struktur dasar, dokumen, pajak, dan risiko salah setup.",
    shortDescription:
      "Kursus struktur legal untuk memisahkan aset, operasional, risiko, kepemilikan, dan rencana suksesi awal.",
    outcomes: [
      "Membedakan PT operasional, asset holding, dan investment holding",
      "Membuat peta kepemilikan, kontrak antar entitas, dan dokumen dasar",
      "Memahami risiko pajak dan transaksi afiliasi",
      "Menyiapkan bahan diskusi dengan notaris, konsultan pajak, dan lawyer",
    ],
    curriculum: [
      "Kapan holding masuk akal dan kapan terlalu dini",
      "Peta entitas, saham, direksi, komisaris, dan beneficial owner",
      "Kontrak antar perusahaan, loan, sewa aset, IP, dan management fee",
      "Pajak, transfer pricing sederhana, dan kepatuhan dokumen",
      "Proteksi aset, sengketa pemegang saham, dan suksesi awal",
    ],
    overlookedAngles: [
      "Banyak pembahasan holding terlalu teoritis dan tidak mulai dari peta risiko",
      "Jarang membahas biaya administrasi tahunan dan disiplin dokumen",
      "Sering menjual holding sebagai solusi semua masalah padahal kadang terlalu dini",
    ],
    relatedArticleClusters: ["Holding Company", "Legal Structure", "Tax Planning", "Asset Protection"],
  },
  {
    slug: "family-office-suksesi",
    title: "Family Office & Suksesi Keluarga",
    topic: "Legacy",
    tier: "Tier 4",
    level: "Lanjutan",
    price: 5000000,
    duration: "10 minggu",
    lessons: 36,
    targetMarket: "Keluarga high net worth, founder generasi pertama, dan ahli waris yang mulai menata legacy.",
    promise: "Membangun peta aset keluarga, governance, komunikasi suksesi, dan agenda advisor profesional.",
    shortDescription:
      "Kursus legacy untuk menata aset, peran keluarga, dokumen penting, philanthropy, dan suksesi lintas generasi.",
    outcomes: [
      "Membuat peta aset, dokumen, pemilik legal, dan risiko sengketa",
      "Menyusun family council sederhana dan aturan komunikasi",
      "Membedakan family office, holding, trust-like planning, dan advisor network",
      "Membuat agenda kerja dengan notaris, pajak, legal, dan investment advisor",
    ],
    curriculum: [
      "Inventaris aset, dokumen, beneficiary, dan lokasi bukti",
      "Family governance, peran anggota keluarga, dan rapat berkala",
      "Suksesi bisnis, ahli waris, konflik, dan komunikasi sensitif",
      "Advisor stack: legal, pajak, investasi, filantropi, dan administrasi",
      "Legacy dashboard, risk register, dan next generation education",
    ],
    overlookedAngles: [
      "Banyak kursus legacy menghindari konflik keluarga padahal itu risiko utama",
      "Jarang membahas arsip dokumen dan PIC administrasi",
      "Sering terlalu fokus instrumen investasi, bukan governance keluarga",
    ],
    relatedArticleClusters: ["Family Office", "Succession", "Asset Map", "Legacy Maker"],
  },
]

export function getAcademyCourse(slug: string) {
  return academyCourses.find((course) => course.slug === slug)
}

export function getAcademyTopics() {
  return Array.from(new Set(academyCourses.map((course) => course.topic)))
}

export function formatCoursePrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)
}
