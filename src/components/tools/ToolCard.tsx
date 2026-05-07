import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import type { ToolCatalogItem } from "@/data/toolsCatalog"
import { toolTypeLabels } from "@/data/toolsCatalog"

interface ToolCardProps {
  tool: ToolCatalogItem
}

const priorityLabel: Record<ToolCatalogItem["priority"], string> = {
  high: "Prioritas tinggi",
  medium: "Prioritas menengah",
  low: "Prioritas rendah",
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.path}
      className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[0_24px_50px_rgba(0,77,64,0.10)] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-money-green/15 bg-money-green/10 px-3 py-1 text-xs font-semibold text-money-green dark:text-emerald-200">
          {toolTypeLabels[tool.type]}
        </span>
        <span className="text-xs text-body">{priorityLabel[tool.priority]}</span>
      </div>
      <div className="mt-5 flex-1">
        <h3 className="text-xl font-semibold text-heading">{tool.title}</h3>
        <p className="mt-3 text-sm leading-6 text-body">{tool.shortDescription}</p>
        <ul className="mt-5 space-y-2">
          {tool.benefitList.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex gap-2 text-sm text-body">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-money-green" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-sm dark:border-white/10">
        <span className="text-body">{tool.primaryArticleClusters.slice(0, 2).join(", ")}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-money-green">
          Buka
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
