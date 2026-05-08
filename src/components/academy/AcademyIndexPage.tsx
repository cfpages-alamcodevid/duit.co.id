import Link from "next/link"
import { ArrowRight, BookOpen, Clock, GraduationCap, Layers, Users } from "lucide-react"
import {
  academyCourses,
  formatCoursePrice,
  getAcademyTopics,
  type AcademyCourse,
} from "@/data/academyCourses"

const tierTone: Record<AcademyCourse["tier"], string> = {
  "Tier 0": "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-200",
  "Tier 1": "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-200",
  "Tier 2": "border-money-green/20 bg-money-green/10 text-money-green",
  "Tier 3": "border-aureum-gold/30 bg-aureum-gold/10 text-aureum-gold",
  "Tier 4": "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-200",
}

export function AcademyIndexPage() {
  const topics = getAcademyTopics()

  return (
    <div className="mx-auto max-w-7xl space-y-10 py-6">
      <section className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
            Akademi Duit.co.id
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-heading sm:text-5xl">
            Belajar keuangan dengan langkah yang bisa langsung dipraktikkan.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-body sm:text-lg">
            Pilih kelas sesuai kondisi Anda: keluar dari tekanan utang, menambah penghasilan,
            menata bisnis, mulai investasi, sampai melindungi aset keluarga.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-heading">Topik kursus</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-body dark:border-white/10 dark:bg-white/5"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Stat icon={GraduationCap} label="Program belajar" value={`${academyCourses.length}`} />
        <Stat icon={Layers} label="Topik" value={`${topics.length}`} />
        <Stat icon={BookOpen} label="Modul" value={`${academyCourses.reduce((sum, course) => sum + course.lessons, 0)}`} />
        <Stat icon={Users} label="Target" value="Tier 0-4" />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-money-green">
            Katalog kelas
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-heading">Pilih jalur belajar Anda</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {academyCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
      <Icon className="h-5 w-5 text-money-green" />
      <p className="mt-4 text-2xl font-semibold text-heading">{value}</p>
      <p className="mt-1 text-sm text-body">{label}</p>
    </div>
  )
}

function CourseCard({ course }: { course: AcademyCourse }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/72 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition hover:border-money-green/25 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tierTone[course.tier]}`}>
          {course.tier}
        </span>
        <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-body dark:border-white/10 dark:bg-white/5">
          {course.level}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-heading">{course.title}</h3>
      <p className="mt-3 text-sm leading-6 text-body">{course.shortDescription}</p>
      <div className="mt-5 grid gap-3 text-sm text-body sm:grid-cols-3">
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-money-green" />
          {course.duration}
        </span>
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-money-green" />
          {course.lessons} modul
        </span>
        <span className="flex items-center gap-2 font-semibold text-heading">
          {formatCoursePrice(course.price)}
        </span>
      </div>
      <div className="mt-5 rounded-xl bg-money-green/10 p-4 text-sm leading-6 text-body">
        <span className="font-semibold text-heading">Janji hasil: </span>
        {course.promise}
      </div>
      <Link
        href={`/akademi/${course.slug}`}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-money-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
      >
        Lihat kurikulum
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}
