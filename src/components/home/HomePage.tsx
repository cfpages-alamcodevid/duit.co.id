"use client"

import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { TierQuiz } from "@/components/home/TierQuiz"

const learningPaths = [
  {
    label: "Survival",
    href: "/artikel/tier-0-survival",
    icon: ShieldCheck,
    description: "Arus kas aman, utang terkendali, dan keputusan harian yang tidak menambah tekanan.",
  },
  {
    label: "Hustler",
    href: "/artikel/tier-1-hustler",
    icon: TrendingUp,
    description: "Skill bernilai tinggi, kenaikan penghasilan, dan validasi usaha kecil dengan risiko wajar.",
  },
  {
    label: "Scaler",
    href: "/artikel/tier-2-scaler",
    icon: BarChart3,
    description: "Sistem bisnis, laporan keuangan, SOP, rekrutmen, dan keputusan investasi yang lebih rapi.",
  },
  {
    label: "Asset Builder",
    href: "/artikel/tier-3-asset-builder",
    icon: Landmark,
    description: "Properti, waralaba, diversifikasi aset, struktur bisnis, dan perlindungan kekayaan.",
  },
  {
    label: "Legacy",
    href: "/artikel/tier-4-legacy",
    icon: GraduationCap,
    description: "Holding, suksesi, family office, proteksi aset, dan tata kelola lintas generasi.",
  },
]

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 pb-10">
      <HeroWithQuiz />
      <LearningPath />
      <FeatureGrid />
    </div>
  )
}

function HeroWithQuiz() {
  return (
    <section className="grid gap-10 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-14">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-money-green/10 px-4 py-2 text-sm font-semibold text-money-green">
          <Sparkles className="h-4 w-4" />
          Peta belajar finansial sesuai kondisi Anda
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-6xl">
          Mulai dari masalah uang yang paling dekat dengan hidup Anda.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-body sm:text-lg">
          Jawab beberapa pertanyaan ringan. Duit.co.id akan membaca pola penghasilan, utang,
          kendaraan, tempat tinggal, dan bisnis Anda untuk memberi arahan belajar yang relevan.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, label: "Tidak perlu isi semua kalau sudah cukup jelas" },
            { icon: LockKeyhole, label: "Progress tersimpan saat login" },
            { icon: TrendingUp, label: "Rekomendasi fokus berikutnya" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 text-sm font-semibold text-heading backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <item.icon className="h-5 w-5 shrink-0 text-money-green" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <TierQuiz />
    </section>
  )
}

function LearningPath() {
  return (
    <section>
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-money-green">Jalur belajar bertingkat</p>
        <h2 className="mt-2 text-3xl font-bold text-heading">Materi dibuka sesuai kesiapan finansial.</h2>
        <p className="mt-4 text-base leading-7 text-body">
          Fondasi selalu didahulukan. Materi lanjutan dibuka saat data profil menunjukkan bahwa topiknya
          sudah relevan untuk keputusan uang Anda sekarang.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {learningPaths.map(({ label, href, icon: Icon, description }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
          >
            <Icon className="h-7 w-7 text-money-green" />
            <h3 className="mt-4 text-lg font-bold text-heading">{label}</h3>
            <p className="mt-2 text-sm leading-6 text-body">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function FeatureGrid() {
  const features = [
    {
      icon: BookOpen,
      title: "Artikel yang relevan",
      text: "Mulai dari materi yang menyelesaikan tekanan terdekat, lalu naik saat kondisi finansial sudah siap.",
    },
    {
      icon: Briefcase,
      title: "Bisnis dibaca lebih dalam",
      text: "Pemilik bisnis bisa mendapat arahan yang berbeda berdasarkan omzet, jumlah staf, dan margin bersih.",
    },
    {
      icon: CheckCircle2,
      title: "Progress tersimpan",
      text: "Akun menyimpan hasil assessment, checkout, enrollment, artikel terakhir dibaca, dan progress belajar di D1.",
    },
  ]

  return (
    <section className="grid gap-5 md:grid-cols-3">
      {features.map((feature) => (
        <GlassCard key={feature.title} className="p-6">
          <feature.icon className="h-8 w-8 text-money-green" />
          <h3 className="mt-5 text-xl font-bold text-heading">{feature.title}</h3>
          <p className="mt-3 text-sm leading-6 text-body">{feature.text}</p>
        </GlassCard>
      ))}
    </section>
  )
}

