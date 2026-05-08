import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  Target,
  Users,
} from "lucide-react"
import { formatCoursePrice, type AcademyCourse } from "@/data/academyCourses"

export function AcademyCoursePage({ course }: { course: AcademyCourse }) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 py-6">
      <Link href="/akademi" className="inline-flex items-center gap-2 text-sm font-semibold text-money-green">
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Akademi
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
            {course.topic}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-heading sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-body sm:text-lg">
            {course.shortDescription}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <MiniStat icon={Clock} label="Durasi" value={course.duration} />
            <MiniStat icon={BookOpen} label="Modul" value={`${course.lessons} modul`} />
            <MiniStat icon={GraduationCap} label="Level" value={course.level} />
          </div>
        </div>

        <aside className="rounded-2xl border border-black/10 bg-white/72 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-body">Investasi belajar</p>
          <p className="mt-2 text-3xl font-semibold text-heading">{formatCoursePrice(course.price)}</p>
          <p className="mt-4 text-sm leading-6 text-body">{course.promise}</p>
          <Link
            href="/login?tab=register"
            className="mt-5 inline-flex w-full justify-center rounded-xl bg-money-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
          >
            Daftar minat
          </Link>
          <p className="mt-3 text-xs leading-5 text-body">
            Kami akan mengirim kabar saat pendaftaran kelas dibuka.
          </p>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel icon={Users} title="Target peserta">
          <p className="text-sm leading-6 text-body">{course.targetMarket}</p>
        </Panel>
        <Panel icon={Target} title="Hasil yang dibawa pulang">
          <ul className="grid gap-3 sm:grid-cols-2">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2 text-sm leading-6 text-body">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-money-green" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel icon={ClipboardList} title="Kurikulum inti">
          <ol className="space-y-3">
            {course.curriculum.map((module, index) => (
              <li key={module} className="flex gap-3 text-sm leading-6 text-body">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-money-green text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{module}</span>
              </li>
            ))}
          </ol>
        </Panel>
        <Panel icon={AlertTriangle} title="Pendalaman praktik">
          <ul className="space-y-3">
            {course.practicalFocus.map((angle) => (
              <li key={angle} className="flex gap-2 text-sm leading-6 text-body">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>{angle}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <Panel icon={BookOpen} title="Topik pendukung">
        <div className="flex flex-wrap gap-2">
          {course.supportingTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-body dark:border-white/10 dark:bg-white/5"
            >
              {topic}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <Icon className="h-5 w-5 text-money-green" />
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-body">{label}</p>
      <p className="mt-1 text-sm font-semibold text-heading">{value}</p>
    </div>
  )
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/72 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-money-green/10 text-money-green">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-semibold text-heading">{title}</h2>
      </div>
      {children}
    </section>
  )
}
