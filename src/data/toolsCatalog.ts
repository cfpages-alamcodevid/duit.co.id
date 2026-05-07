export type ToolType =
  | "kalkulator"
  | "template"
  | "direktori"
  | "ceklist"
  | "resources"

export type ToolPriority = "high" | "medium" | "low"
export type ToolStatus = "planned" | "mvp" | "live" | "needs-update"

export interface ToolCatalogItem {
  id: string
  type: ToolType
  slug: string
  path: string
  title: string
  shortDescription: string
  benefitList: string[]
  targetUser: string
  primaryArticleClusters: string[]
  status: ToolStatus
  priority: ToolPriority
  estimatedBuild: "small" | "medium" | "large"
  requiresAuth: boolean
  canSaveResult: boolean
}

export const toolTypeLabels: Record<ToolType, string> = {
  kalkulator: "Kalkulator",
  template: "Template",
  direktori: "Direktori",
  ceklist: "Checklist",
  resources: "Resources",
}

export const toolsCatalog: ToolCatalogItem[] = [
  {
    id: "debt-payoff",
    type: "kalkulator",
    slug: "simulasi-pelunasan-utang",
    path: "/kalkulator/simulasi-pelunasan-utang",
    title: "Simulasi Pelunasan Utang",
    shortDescription:
      "Bandingkan strategi snowball dan avalanche, lihat target lunas, total biaya, dan prioritas negosiasi.",
    benefitList: [
      "Susun banyak utang sekaligus",
      "Bandingkan strategi lunas cepat",
      "Dapatkan skrip negosiasi awal",
    ],
    targetUser: "Debitur, korban pinjol, keluarga yang sedang menata utang",
    primaryArticleClusters: ["Pinjol", "Debt Collector", "Restrukturisasi", "Debt Triage"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "large",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "digital-safety",
    type: "ceklist",
    slug: "keamanan-digital",
    path: "/ceklist/keamanan-digital",
    title: "Checklist Keamanan Digital",
    shortDescription:
      "Audit risiko link, APK, OTP, KTP, izin aplikasi, dan langkah darurat saat akun atau data terancam.",
    benefitList: [
      "Skor risiko penipuan digital",
      "Langkah darurat sesuai kondisi",
      "Checklist bukti untuk pelaporan",
    ],
    targetUser: "Pengguna yang menerima link mencurigakan, aplikasi pinjol, atau ancaman scam",
    primaryArticleClusters: ["Scam", "KTP/OTP", "APK Berbahaya", "Pinjol Ilegal"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: false,
  },
  {
    id: "legal-aid-directory",
    type: "direktori",
    slug: "bantuan-hukum-gratis",
    path: "/direktori/bantuan-hukum-gratis",
    title: "Direktori Bantuan Hukum Gratis",
    shortDescription:
      "Cari LBH, kanal pengaduan, dan template laporan untuk kasus utang, pinjol, sengketa, atau perlindungan konsumen.",
    benefitList: [
      "Filter berdasarkan provinsi dan isu",
      "Kontak dan kanal resmi",
      "Saran eskalasi kasus",
    ],
    targetUser: "Debitur, konsumen, keluarga berpenghasilan rendah, dan korban penagihan",
    primaryArticleClusters: ["LBH", "OJK", "Polisi", "Legal Aid", "Sengketa"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: false,
  },
  {
    id: "government-aid-directory",
    type: "direktori",
    slug: "bantuan-pemerintah",
    path: "/direktori/bantuan-pemerintah",
    title: "Direktori Bantuan Pemerintah",
    shortDescription:
      "Cocokkan kebutuhan keluarga dengan bansos, KIP, KIS, BPJS, FLPP, beasiswa, dan program bantuan lain.",
    benefitList: [
      "Filter program berdasarkan kebutuhan",
      "Checklist dokumen pendaftaran",
      "Link resmi untuk mencegah penipuan",
    ],
    targetUser: "Keluarga, pelajar, pekerja PHK, dan masyarakat berpenghasilan rendah",
    primaryArticleClusters: ["Bansos", "KIP", "BPJS", "FLPP", "Beasiswa"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: false,
  },
  {
    id: "monthly-budget",
    type: "kalkulator",
    slug: "budget-bulanan",
    path: "/kalkulator/budget-bulanan",
    title: "Kalkulator Budget Bulanan",
    shortDescription:
      "Bagi gaji ke kebutuhan pokok, utang, tabungan, keluarga, dan ruang aman mingguan.",
    benefitList: [
      "Deteksi cashflow negatif",
      "Bagi budget ke envelope mingguan",
      "Prioritaskan pengeluaran survival",
    ],
    targetUser: "Pekerja UMR, keluarga muda, mahasiswa, dan pembaca Tier 0-1",
    primaryArticleClusters: ["Budget Defense", "THR", "Makan Hemat", "Utilities"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "emergency-fund",
    type: "kalkulator",
    slug: "dana-darurat",
    path: "/kalkulator/dana-darurat",
    title: "Kalkulator Dana Darurat",
    shortDescription:
      "Hitung target dana darurat berdasarkan biaya hidup, tanggungan, stabilitas kerja, dan tekanan utang.",
    benefitList: [
      "Target realistis bertahap",
      "Simulasi tabungan harian",
      "Prioritas saat kondisi krisis",
    ],
    targetUser: "Pembaca yang baru mulai menabung atau terkena risiko PHK",
    primaryArticleClusters: ["PHK", "Emergency Fund", "Micro Saving", "Income Shock"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "product-pricing",
    type: "kalkulator",
    slug: "harga-jual-produk",
    path: "/kalkulator/harga-jual-produk",
    title: "Kalkulator Harga Jual Produk",
    shortDescription:
      "Hitung HPP, biaya platform, margin, diskon aman, dan jumlah unit untuk balik modal.",
    benefitList: [
      "Harga jual berbasis margin",
      "Simulasi marketplace fee",
      "Batas diskon tanpa rugi",
    ],
    targetUser: "UMKM, reseller, dropshipper, food seller, dan seller marketplace",
    primaryArticleClusters: ["UMKM", "Online Shop", "Dropship", "Pricing"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "cv-portfolio",
    type: "template",
    slug: "cv-portfolio",
    path: "/template/cv-portfolio",
    title: "Template CV & Portfolio",
    shortDescription:
      "Generator outline CV, portfolio case study, dan pitch freelance berdasarkan peran yang dituju.",
    benefitList: [
      "Struktur CV siap pakai",
      "Prompt portfolio per bidang",
      "Pitch singkat untuk klien pertama",
    ],
    targetUser: "Fresh graduate, freelancer pemula, virtual assistant, dan kreator",
    primaryArticleClusters: ["Career Starter", "Freelance", "Portfolio", "Salary"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "content-calendar",
    type: "template",
    slug: "kalender-konten",
    path: "/template/kalender-konten",
    title: "Template Kalender Konten",
    shortDescription:
      "Buat kalender konten 30 hari untuk TikTok, YouTube, Instagram, LinkedIn, atau toko online.",
    benefitList: [
      "Ide konten per platform",
      "Hook dan CTA siap pakai",
      "Repurposing plan dari artikel",
    ],
    targetUser: "Content creator, UMKM, affiliate seller, dan admin sosial media",
    primaryArticleClusters: ["Content Creator", "TikTok Live", "Digital Marketing"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "agribusiness-capital",
    type: "kalkulator",
    slug: "modal-usaha-agribisnis",
    path: "/kalkulator/modal-usaha-agribisnis",
    title: "Kalkulator Modal Usaha Agribisnis",
    shortDescription:
      "Hitung modal awal, biaya siklus, yield, margin, dan payback untuk usaha agribisnis kecil.",
    benefitList: [
      "Simulasi modal per siklus",
      "Perkiraan laba dan payback",
      "Sensitivitas harga jual dan gagal panen",
    ],
    targetUser: "Peternak kecil, pengepul, supplier desa, dan calon pelaku agribisnis",
    primaryArticleClusters: ["Maggot", "Lele", "Jamur", "Ternak", "Supplier Desa"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "professional-proposal",
    type: "template",
    slug: "proposal-jasa-profesional",
    path: "/template/proposal-jasa-profesional",
    title: "Template Proposal Jasa Profesional",
    shortDescription:
      "Susun scope of work, deliverables, timeline, harga, dan klausul dasar untuk jasa profesional.",
    benefitList: [
      "Proposal jasa siap diedit",
      "Scope dan timeline lebih rapi",
      "Checklist onboarding klien",
    ],
    targetUser: "Konsultan, bookkeeper, SOP writer, auditor kecil, dan freelancer B2B",
    primaryArticleClusters: ["Professional Services", "SOP", "Pitch Deck", "Consulting"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "property-roi",
    type: "kalkulator",
    slug: "roi-properti",
    path: "/kalkulator/roi-properti",
    title: "Kalkulator ROI Properti",
    shortDescription:
      "Hitung net yield, cashflow, payback, dan skenario sewa properti jangka panjang atau short stay.",
    benefitList: [
      "Net yield setelah biaya",
      "Cashflow bulanan",
      "Skenario exit dan payback",
    ],
    targetUser: "Investor properti, pemilik kos, pemilik ruko, dan asset builder",
    primaryArticleClusters: ["Properti", "Kos", "Sewa", "BPHTB", "Renovasi"],
    status: "mvp",
    priority: "high",
    estimatedBuild: "large",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "franchise-roi",
    type: "kalkulator",
    slug: "roi-franchise",
    path: "/kalkulator/roi-franchise",
    title: "Kalkulator ROI Franchise",
    shortDescription:
      "Simulasikan franchise fee, capex, omzet, COGS, royalty, BEP, dan payback period.",
    benefitList: [
      "BEP dan payback realistis",
      "Simulasi royalty dan margin",
      "Dashboard KPI bulanan",
    ],
    targetUser: "Calon franchisee, pemilik outlet, dan investor properti bisnis",
    primaryArticleClusters: ["Franchise", "Waralaba", "Outlet", "Business ROI"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "solar-roi",
    type: "kalkulator",
    slug: "roi-energi-surya",
    path: "/kalkulator/roi-energi-surya",
    title: "Kalkulator ROI Energi Surya",
    shortDescription:
      "Hitung penghematan panel surya, payback, ROI 10 tahun, dan opsi pendapatan EV charging.",
    benefitList: [
      "Payback panel surya",
      "Estimasi penghematan listrik",
      "Skenario EV charging",
    ],
    targetUser: "Pemilik rumah, aset komersial, gudang, dan investor energi",
    primaryArticleClusters: ["Panel Surya", "EV Charging", "Property Energy", "ESG"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "investment-risk",
    type: "kalkulator",
    slug: "profil-risiko-investasi",
    path: "/kalkulator/profil-risiko-investasi",
    title: "Kalkulator Profil Risiko Investasi",
    shortDescription:
      "Nilai horizon, toleransi rugi, likuiditas, pengalaman, dan stabilitas income untuk rekomendasi alokasi awal.",
    benefitList: [
      "Skor profil risiko",
      "Rentang alokasi aset",
      "Learning path sesuai profil",
    ],
    targetUser: "Investor pemula sampai asset builder yang butuh kerangka alokasi",
    primaryArticleClusters: ["Reksa Dana", "Saham", "Obligasi", "Crypto", "ESG"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "tax-estimator",
    type: "kalkulator",
    slug: "pajak",
    path: "/kalkulator/pajak",
    title: "Kalkulator Pajak Sederhana",
    shortDescription:
      "Estimasi kasar pajak transaksi atau penghasilan tertentu dan dokumen yang perlu disiapkan.",
    benefitList: [
      "Estimasi awal, bukan nasihat final",
      "Checklist dokumen pajak",
      "Prompt kapan perlu konsultan",
    ],
    targetUser: "Investor, freelancer, UMKM, pemilik properti, dan keluarga kaya",
    primaryArticleClusters: ["Pajak", "Dividen", "Property Tax", "Tax Treaty"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: false,
  },
  {
    id: "insurance-needs",
    type: "kalkulator",
    slug: "kebutuhan-asuransi",
    path: "/kalkulator/kebutuhan-asuransi",
    title: "Kalkulator Kebutuhan Asuransi",
    shortDescription:
      "Hitung gap proteksi keluarga berdasarkan tanggungan, utang, biaya hidup, aset, dan cover yang sudah ada.",
    benefitList: [
      "Estimasi kebutuhan proteksi",
      "Gap coverage keluarga",
      "Prioritas pertanyaan ke advisor",
    ],
    targetUser: "Keluarga, pencari nafkah utama, dan pembaca wealth protection",
    primaryArticleClusters: ["Asuransi", "Proteksi", "BPJS", "Wealth Protection"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "family-asset-map",
    type: "template",
    slug: "peta-aset-keluarga",
    path: "/template/peta-aset-keluarga",
    title: "Template Peta Aset Keluarga",
    shortDescription:
      "Inventaris aset, kepemilikan, dokumen, beneficiary, risiko sengketa, dan agenda rapat keluarga.",
    benefitList: [
      "Peta aset dan dokumen penting",
      "Skor kesiapan suksesi",
      "Checklist rapat keluarga",
    ],
    targetUser: "Keluarga bisnis, pemilik aset besar, dan pembaca Tier 4",
    primaryArticleClusters: ["Estate Planning", "Family Office", "Trust", "Holding"],
    status: "mvp",
    priority: "medium",
    estimatedBuild: "medium",
    requiresAuth: false,
    canSaveResult: true,
  },
  {
    id: "personal-finance-checklist",
    type: "resources",
    slug: "checklist-keuangan-pribadi",
    path: "/resources/checklist-keuangan-pribadi",
    title: "Checklist Keuangan Pribadi",
    shortDescription:
      "Audit singkat kondisi utang, cashflow, dana darurat, proteksi, dokumen, dan langkah berikutnya.",
    benefitList: [
      "Skor kesehatan finansial",
      "Rekomendasi tool berikutnya",
      "Checklist bulanan yang praktis",
    ],
    targetUser: "Pembaca umum yang belum tahu harus mulai dari mana",
    primaryArticleClusters: ["Financial Literacy", "Family Finance", "General"],
    status: "mvp",
    priority: "low",
    estimatedBuild: "small",
    requiresAuth: false,
    canSaveResult: false,
  },
]

export const legalAidResources = [
  {
    name: "Otoritas Jasa Keuangan - Kontak 157",
    province: "Nasional",
    issues: ["pinjol", "perbankan", "asuransi", "investasi"],
    contact: "157 / konsumen@ojk.go.id",
    url: "https://kontak157.ojk.go.id/",
    notes: "Kanal pengaduan konsumen sektor jasa keuangan.",
  },
  {
    name: "Satgas PASTI / Waspada Investasi",
    province: "Nasional",
    issues: ["investasi bodong", "pinjol ilegal", "penipuan keuangan"],
    contact: "Melalui kanal OJK dan daftar peringatan resmi",
    url: "https://ojk.go.id/",
    notes: "Gunakan untuk cek peringatan entitas keuangan ilegal.",
  },
  {
    name: "LBH Jakarta",
    province: "DKI Jakarta",
    issues: ["utang", "konsumen", "ketenagakerjaan", "bantuan hukum"],
    contact: "Lihat kanal konsultasi resmi LBH Jakarta",
    url: "https://bantuanhukum.or.id/",
    notes: "Salah satu rujukan bantuan hukum publik untuk wilayah Jakarta dan isu nasional tertentu.",
  },
  {
    name: "LBH Medan",
    province: "Sumatera Utara",
    issues: ["bantuan hukum", "utang", "konsumen", "hak warga"],
    contact: "085296075321",
    url: "https://ylbhi.or.id/",
    notes: "Bagian dari jaringan YLBHI untuk wilayah Medan dan sekitarnya.",
  },
  {
    name: "LBH Padang",
    province: "Sumatera Barat",
    issues: ["bantuan hukum", "konsumen", "utang", "hak warga"],
    contact: "082169293527",
    url: "https://ylbhi.or.id/",
    notes: "Rujukan jaringan YLBHI untuk Sumatera Barat.",
  },
  {
    name: "LBH Bandung",
    province: "Jawa Barat",
    issues: ["bantuan hukum", "konsumen", "ketenagakerjaan", "utang"],
    contact: "082258843986",
    url: "https://ylbhi.or.id/",
    notes: "Rujukan jaringan YLBHI untuk Jawa Barat.",
  },
  {
    name: "LBH Semarang",
    province: "Jawa Tengah",
    issues: ["bantuan hukum", "utang", "konsumen", "hak warga"],
    contact: "082324230247",
    url: "https://ylbhi.or.id/",
    notes: "Rujukan jaringan YLBHI untuk Jawa Tengah.",
  },
  {
    name: "LBH Yogyakarta",
    province: "DI Yogyakarta",
    issues: ["bantuan hukum", "konsumen", "utang", "hak warga"],
    contact: "089510629630",
    url: "https://ylbhi.or.id/",
    notes: "Rujukan jaringan YLBHI untuk DI Yogyakarta.",
  },
  {
    name: "LBH Surabaya",
    province: "Jawa Timur",
    issues: ["bantuan hukum", "utang", "konsumen", "hak warga"],
    contact: "082230003197",
    url: "https://ylbhi.or.id/",
    notes: "Rujukan jaringan YLBHI untuk Jawa Timur.",
  },
  {
    name: "LBH APIK Jakarta",
    province: "DKI Jakarta",
    issues: ["perempuan", "anak", "kdrt", "bantuan hukum"],
    contact: "0813-8882-2669 / (021) 8779-7289",
    url: "https://www.lbhapik.org/",
    notes: "Fokus bantuan hukum untuk perempuan, anak, KDRT, dan kekerasan berbasis gender.",
  },
  {
    name: "PBH PERADI / Posbakum Pengadilan",
    province: "Nasional",
    issues: ["perdata", "pidana", "konsultasi hukum", "posbakum"],
    contact: "(021) 3883 6000 / Pengadilan Negeri terdekat",
    url: "https://pbhperadi.or.id/",
    notes: "Cari Posbakum di pengadilan negeri terdekat untuk konsultasi awal.",
  },
  {
    name: "Sidbankum BPHN",
    province: "Nasional",
    issues: ["obh terakreditasi", "bantuan hukum gratis", "sk tm", "konsultasi"],
    contact: "Portal pencarian OBH",
    url: "https://sidbankum.bphn.go.id/",
    notes: "Portal pemerintah untuk mencari organisasi bantuan hukum terakreditasi per wilayah.",
  },
  {
    name: "YLBHI",
    province: "Nasional",
    issues: ["bantuan hukum", "hak warga", "advokasi"],
    contact: "Lihat jaringan kantor LBH/YLBHI",
    url: "https://ylbhi.or.id/",
    notes: "Jaringan bantuan hukum di banyak wilayah Indonesia.",
  },
  {
    name: "Lapor.go.id",
    province: "Nasional",
    issues: ["layanan publik", "aduan pemerintah", "bansos"],
    contact: "Aplikasi dan website LAPOR",
    url: "https://www.lapor.go.id/",
    notes: "Kanal aspirasi dan pengaduan layanan publik.",
  },
]

export const governmentAidResources = [
  {
    name: "PKH",
    category: "Bansos keluarga",
    audience: "Keluarga miskin/rentan dengan komponen kesehatan, pendidikan, atau kesejahteraan sosial",
    documents: ["NIK/KTP", "KK", "Data Terpadu Kesejahteraan Sosial"],
    url: "https://cekbansos.kemensos.go.id/",
    notes: "Cek status melalui kanal resmi Kemensos.",
  },
  {
    name: "BPNT / Kartu Sembako",
    category: "Bantuan pangan",
    audience: "Keluarga penerima manfaat untuk kebutuhan pangan dasar",
    documents: ["NIK/KTP", "KK", "Data penerima bansos"],
    url: "https://cekbansos.kemensos.go.id/",
    notes: "Waspadai pihak yang meminta biaya pencairan.",
  },
  {
    name: "KIP Kuliah",
    category: "Pendidikan",
    audience: "Calon mahasiswa dari keluarga kurang mampu yang memenuhi syarat akademik",
    documents: ["NIK", "NISN", "NPSN", "Data ekonomi keluarga"],
    url: "https://kip-kuliah.kemdikbud.go.id/",
    notes: "Gunakan portal resmi Kemdikbud.",
  },
  {
    name: "PIP / Program Indonesia Pintar",
    category: "Pendidikan",
    audience: "Siswa SD, SMP, SMA/SMK dari keluarga miskin/rentan agar tidak putus sekolah",
    documents: ["NIK", "NISN", "KIP/KKS jika ada", "Data sekolah"],
    url: "https://pip.kemdikbud.go.id/",
    notes: "Cek penerima dan pencairan melalui portal resmi PIP.",
  },
  {
    name: "JKN PBI",
    category: "Kesehatan",
    audience: "Masyarakat miskin/rentan yang iuran BPJS Kesehatannya dibantu pemerintah",
    documents: ["NIK/KTP", "KK", "Data sosial ekonomi"],
    url: "https://www.bpjs-kesehatan.go.id/",
    notes: "Cek status kepesertaan dan kanal perubahan data melalui BPJS/Kemensos/pemda.",
  },
  {
    name: "DTSEN / Data Tunggal Sosial Ekonomi Nasional",
    category: "Basis data sosial",
    audience: "Warga yang ingin memastikan data sosial ekonomi keluarga masuk proses verifikasi bantuan",
    documents: ["NIK/KTP", "KK", "Data domisili", "Keterangan kondisi ekonomi"],
    url: "https://kemensos.go.id/",
    notes: "Koordinasikan pembaruan data melalui desa/kelurahan, dinas sosial, atau kanal resmi pemerintah.",
  },
  {
    name: "FLPP / KPR Subsidi",
    category: "Perumahan",
    audience: "Masyarakat berpenghasilan rendah yang ingin membeli rumah pertama",
    documents: ["KTP", "KK", "NPWP", "Slip gaji/surat usaha", "Belum punya rumah"],
    url: "https://sikumbang.tapera.go.id/",
    notes: "Cek rumah subsidi dan bank penyalur melalui kanal resmi.",
  },
]

export function getToolsByType(type: ToolType) {
  return toolsCatalog.filter((tool) => tool.type === type)
}

export function getToolByTypeAndSlug(type: ToolType, slug: string) {
  return toolsCatalog.find((tool) => tool.type === type && tool.slug === slug)
}

export function getToolTypeFromPath(path: string): ToolType | undefined {
  return (["kalkulator", "template", "direktori", "ceklist", "resources"] as ToolType[]).find(
    (type) => path.startsWith(`/${type}/`),
  )
}
