interface AcademyMetricCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  compact?: boolean
}

export function AcademyMetricCard({
  icon: Icon,
  label,
  value,
  compact = false,
}: AcademyMetricCardProps) {
  return (
    <div
      className={
        compact
          ? "flex min-h-[116px] flex-col items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-4 text-center dark:border-white/10 dark:bg-white/5"
          : "flex min-h-[140px] flex-col items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-5 text-center dark:border-white/10 dark:bg-white/5"
      }
    >
      <Icon className="h-6 w-6 text-money-green" />
      <p className={compact ? "mt-3 text-sm font-bold text-heading" : "mt-4 text-2xl font-bold text-heading"}>
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.06em] text-body">{label}</p>
    </div>
  )
}
