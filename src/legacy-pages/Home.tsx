import React from "react"
import { motion } from "framer-motion"
import { GoldShineButton } from "@/components/ui/GoldShineButton"
import { GlassCard } from "@/components/ui/GlassCard"
import {
  Shield,
  TrendingUp,
  Users,
  Building2,
  Landmark,
  GraduationCap,
  Scale,
  Target,
  Award,
  Lock,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Globe,
  BookOpen,
  Calculator,
} from "lucide-react"
import { Link } from "react-router-dom"

/* ──────────────────────────────────────────────
   Hero Section
────────────────────────────────────────────── */
const HeroSection = () => (
  <section className="relative py-24 md:py-32 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm md:text-base font-semibold tracking-widest uppercase text-money-green mb-6"
      >
        Ekosistem Keuangan #1 Indonesia
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-heading leading-[1.1]"
      >
        Lindungi Warisan Anda.<br />
        <span className="text-money-green">Bangun Kedaulatan Finansial.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-body max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        Platform cerdas yang memandu setiap lapisan masyarakat Indonesia — dari pengelolaan utang
        dan literasi keuangan dasar, hingga struktur Family Office dan proteksi kekayaan antar generasi.
        Kami menyediakan edukasi, alat interaktif, dan jembatan ke profesional terverifikasi
        untuk mengamankan masa depan finansial Anda.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <Link to="/quiz">
          <GoldShineButton className="text-lg px-12 py-6">
            Mulai Assessment Keuangan
          </GoldShineButton>
        </Link>
        <Link
          to="/about"
          className="text-sm font-bold text-body hover:text-money-green transition-colors"
        >
          Pelajari Filosofi Kami →
        </Link>
      </motion.div>

      {/* ── Trust Indicators ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
      >
        {[
          { value: "10.000+", label: "Pengguna Terbantu" },
          { value: "50+", label: "Ahli Terverifikasi" },
          { value: "200+", label: "Artikel & Panduan" },
          { value: "34", label: "Provinsi Terjangkau" },
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-money-green">{stat.value}</p>
            <p className="text-xs md:text-sm text-body mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>

    {/* Background Decorative Elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-money-green/5 rounded-full blur-3xl -z-10" />
  </section>
)

/* ──────────────────────────────────────────────
   Value Proposition Grid
────────────────────────────────────────────── */
const ValuePropGrid = () => {
  const tiers = [
    {
      title: "Tier 0: Survival",
      desc: "Pertahanan utang & literasi dasar. Pelajari cara keluar dari jerat pinjol dan membangun fondasi keuangan.",
      icon: Shield,
    },
    {
      title: "Tier 1: Hustler",
      desc: "Skill pendapatan tinggi & side hustle. Tingkatkan arus kas bulanan dari freelance dan bisnis mikro.",
      icon: TrendingUp,
    },
    {
      title: "Tier 2: Scaler",
      desc: "Sistem bisnis & SOP. Bangun mesin otomatis dan mulai investasi reksa dana & obligasi.",
      icon: Users,
    },
    {
      title: "Tier 3: Asset Builder",
      desc: "Properti & waralaba. Diversifikasi ke real estate dan instrumen investasi lanjutan.",
      icon: Building2,
    },
    {
      title: "Tier 4: Legacy",
      desc: "Family office & holding company. Suksesi bisnis dan preservasi aset antar generasi.",
      icon: Landmark,
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-money-green mb-4">
            Kurikulum Keuangan Bertingkat
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            Kuasai 5 Tingkatan Kekayaan
          </h2>
          <p className="text-body mt-4 max-w-2xl mx-auto leading-relaxed">
            Setiap orang memulai dari titik yang berbeda. Sistem kami memandu Anda secara personal
            melalui setiap tahapan — dari bertahan hidup hingga membangun warisan abadi.
          </p>
        </motion.div>

        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {tiers.slice(0, 3).map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="hover:scale-105 hover:shadow-[0px_30px_60px_rgba(0,0,0,0.08)] transition-all cursor-default h-full">
                <tier.icon className="w-12 h-12 text-money-green mb-6" />
                <h3 className="text-xl font-bold mb-3 text-heading">{tier.title}</h3>
                <p className="text-sm text-body leading-relaxed">{tier.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Second row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tiers.slice(3, 5).map((tier, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 3) * 0.1 }}
            >
              <GlassCard className="hover:scale-105 hover:shadow-[0px_30px_60px_rgba(0,0,0,0.08)] transition-all cursor-default h-full">
                <tier.icon className="w-12 h-12 text-money-green mb-6" />
                <h3 className="text-xl font-bold mb-3 text-heading">{tier.title}</h3>
                <p className="text-sm text-body leading-relaxed">{tier.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/quiz">
            <GoldShineButton className="px-10 py-5">
              Temukan Tier Anda Sekarang
            </GoldShineButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Social Proof Section
────────────────────────────────────────────── */
const SocialProof = () => {
  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Karyawan Swasta, Jakarta",
      tier: "Tier 1",
      quote:
        "Dulu saya terjerat pinjol Rp 50 juta. Setelah mengikuti panduan Tier 0 & 1 dari Duit.co.id, saya berhasil lunasi semua utang dalam 8 bulan dan sekarang punya dana darurat 6 bulan.",
      rating: 5,
    },
    {
      name: "Sari Dewi",
      role: "Pemilik UMKM, Surabaya",
      tier: "Tier 2",
      quote:
        "Platform ini mengubah cara saya mengelola bisnis. SOP dan kalkulator keuangan yang disediakan membantu omzet saya naik 3x lipat dalam satu tahun. Sangat recommended!",
      rating: 5,
    },
    {
      name: "Budi Santoso",
      role: "Direktur PT, Bandung",
      tier: "Tier 3",
      quote:
        "Sebagai pengusaha yang sudah sukses, saya butuh panduan untuk diversifikasi ke properti dan franchise. Bridge ke Franchise.id dan Properti.id sangat membantu keputusan investasi saya.",
      rating: 5,
    },
  ]

  const partners = [
    "OJK",
    "BI",
    "BEI",
    "KADIN",
    "HIPMI",
    "Bappenas",
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ── Partner Logos ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-body/60 mb-8">
            Dipercaya & Berafiliasi dengan Institusi Terkemuka
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner, idx) => (
              <GlassCard
                key={idx}
                className="px-6 py-4 hover:scale-105 transition-all cursor-default"
              >
                <span className="text-lg font-bold text-body/70">{partner}</span>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* ── Testimonials ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-money-green mb-4">
            Kisah Sukses Pengguna
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading">
            Ribuan Orang Telah Mengubah Nasib Finansial Mereka
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col">
                <Quote className="w-8 h-8 text-money-green/30 mb-4" />
                <p className="text-sm text-body leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-heading text-sm">{t.name}</p>
                  <p className="text-xs text-body/70">{t.role}</p>
                  <span className="inline-block mt-2 text-xs font-semibold text-money-green bg-money-green/10 px-3 py-1 rounded-full">
                    {t.tier}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* ── Trust Badges ── */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { icon: Shield, label: "Data Terenkripsi" },
            { icon: Award, label: "Konten Terverifikasi Ahli" },
            { icon: Lock, label: "Privasi Terjamin" },
          ].map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-body/70 text-sm"
            >
              <badge.icon className="w-4 h-4 text-money-green" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Features Section
────────────────────────────────────────────── */
const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Assessment Keuangan Personal",
      desc: "Quiz cerdas yang menganalisis kondisi finansial Anda secara mendalam — pendapatan, lokasi, usia, dan pendidikan — untuk menghasilkan rekomendasi yang benar-benar personal.",
    },
    {
      icon: BookOpen,
      title: "Knowledge Hub Bertingkat",
      desc: "Ratusan artikel, panduan, dan studi kasus yang dikurasi oleh profesional keuangan Indonesia. Setiap konten disesuaikan dengan tier ekonomi dan demografi Anda.",
    },
    {
      icon: Calculator,
      title: "Alat Keuangan Interaktif",
      desc: "Kalkulator utang, perencanaan anggaran, proyeksi investasi, dan analisis ROI — semua gratis dan dirancang khusus untuk konteks keuangan Indonesia.",
    },
    {
      icon: Scale,
      title: "Law Library Lengkap",
      desc: "Database Undang-Undang dan regulasi keuangan Indonesia yang mudah dicari. Pahami hak hukum Anda terkait perpajakan, ketenagakerjaan, dan perlindungan konsumen.",
    },
    {
      icon: GraduationCap,
      title: "Academy & E-Course",
      desc: "Program pembelajaran terstruktur dari dasar hingga mahir. Dari literasi keuangan dasar hingga strategi Family Office, semua tersedia dalam format video dan modul interaktif.",
    },
    {
      icon: Users,
      title: "Jaringan Ahli Terverifikasi",
      desc: "Akses langsung ke notaris, konsultan pajak, perencana keuangan, dan pengacara yang telah terverifikasi oleh Duit.co.id. Konsultasi berkualitas tanpa risiko.",
    },
    {
      icon: Globe,
      title: "Bridge ke Mitra Strategis",
      desc: "Jembatan langsung ke platform mitra terpercaya — Franchise.id untuk peluang waralaba dan Properti.id untuk investasi real estate. Semua dalam satu ekosistem.",
    },
    {
      icon: Shield,
      title: "Pertahanan Pinjol & Hukum",
      desc: "Panduan lengkap untuk melawan praktik pinjol ilegal, memahami UU Perlindungan Konsumen, dan mengambil langkah hukum yang tepat. Gratis dan mudah dipahami.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-money-green mb-4">
            Mengapa Duit.co.id?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Lebih dari Sekadar Platform Edukasi
          </h2>
          <p className="text-body max-w-2xl mx-auto leading-relaxed">
            Duit.co.id adalah ekosistem keuangan terlengkap di Indonesia. Kami menggabungkan edukasi,
            alat praktis, akses ke profesional, dan jembatan ke mitra strategis — semua dalam satu platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="h-full group hover:scale-[1.02] hover:shadow-[0px_30px_60px_rgba(0,0,0,0.08)] transition-all">
                <feature.icon className="w-10 h-10 text-money-green mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-3 text-heading">{feature.title}</h3>
                <p className="text-sm text-body leading-relaxed">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   Final CTA Section
────────────────────────────────────────────── */
const FinalCTA = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <GlassCard className="text-center py-16 px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            Siap Mengambil Kendali Atas Keuangan Anda?
          </h2>
          <p className="text-body max-w-xl mx-auto mb-8 leading-relaxed">
            Mulai dengan assessment keuangan gratis dan temukan roadmap personal
            menuju kedaulatan finansial. Tidak ada komitmen, tidak ada biaya tersembunyi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/quiz">
              <GoldShineButton className="text-lg px-12 py-6">
                Mulai Assessment Gratis
              </GoldShineButton>
            </Link>
            <Link
              to="/artikel"
              className="flex items-center gap-2 text-sm font-bold text-body hover:text-money-green transition-colors"
            >
              Jelajahi Knowledge Hub <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {[
              "100% Gratis",
              "Tanpa Komitmen",
              "Data Terenkripsi",
              "Rekomendasi Personal",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-body/70">
                <CheckCircle2 className="w-4 h-4 text-money-green" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  </section>
)

/* ──────────────────────────────────────────────
   Home Page Export
────────────────────────────────────────────── */
export const Home = () => {
  return (
    <div className="space-y-8">
      <HeroSection />
      <ValuePropGrid />
      <SocialProof />
      <FeaturesSection />
      <FinalCTA />
    </div>
  )
}
