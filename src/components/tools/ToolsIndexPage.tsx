import type { Metadata } from "next"
import { ToolCard } from "@/components/tools/ToolCard"
import { getToolsByType, toolsCatalog, toolTypeLabels, type ToolType } from "@/data/toolsCatalog"

const typeCopy: Record<ToolType | "all", { title: string; description: string; eyebrow: string }> = {
  all: {
    eyebrow: "Duit.co.id Tools",
    title: "Tools finansial yang bisa langsung dipakai",
    description:
      "Kalkulator, checklist, direktori, template, dan resources yang dirancang untuk menemani artikel Duit.co.id dengan aksi konkret.",
  },
  kalkulator: {
    eyebrow: "Kalkulator",
    title: "Kalkulator untuk keputusan finansial yang lebih jernih",
    description:
      "Hitung utang, budget, dana darurat, harga jual, ROI properti, franchise, energi, pajak, asuransi, dan profil risiko dengan input sederhana.",
  },
  template: {
    eyebrow: "Template",
    title: "Template kerja yang bisa langsung disusun",
    description:
      "Buat CV, kalender konten, proposal jasa, dan peta aset keluarga dari input singkat lalu gunakan sebagai draft kerja.",
  },
  direktori: {
    eyebrow: "Direktori",
    title: "Direktori bantuan dan program resmi",
    description:
      "Cari bantuan hukum, pengaduan, bansos, pendidikan, kesehatan, dan perumahan dari data resource yang dikurasi.",
  },
  ceklist: {
    eyebrow: "Checklist",
    title: "Checklist untuk mengurangi risiko dan mempercepat aksi",
    description:
      "Audit kondisi digital atau finansial dengan pertanyaan praktis dan hasil yang langsung bisa ditindaklanjuti.",
  },
  resources: {
    eyebrow: "Resources",
    title: "Resources dasar untuk mulai menata uang",
    description:
      "Halaman rujukan umum untuk pembaca yang belum tahu harus mulai dari tool atau artikel yang mana.",
  },
}

export function buildToolsMetadata(type: ToolType | "all"): Metadata {
  const copy = typeCopy[type]

  return {
    title: copy.title,
    description: copy.description,
  }
}

interface ToolsIndexPageProps {
  type?: ToolType
}

export function ToolsIndexPage({ type }: ToolsIndexPageProps) {
  const activeType = type ?? "all"
  const copy = typeCopy[activeType]
  const tools = type ? getToolsByType(type) : toolsCatalog
  const groups = type
    ? [[type, tools] as const]
    : (["kalkulator", "ceklist", "direktori", "template", "resources"] as ToolType[]).map(
        (toolType) => [toolType, getToolsByType(toolType)] as const,
      )

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <section className="py-6 sm:py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
          {copy.eyebrow}
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-heading sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-body sm:text-lg">
              {copy.description}
            </p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white/65 p-5 text-sm text-body shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <p className="font-semibold text-heading">{tools.length} tools tersedia</p>
            <p className="mt-2">
              Pilih tool yang sesuai kondisi Anda, masukkan data seperlunya, lalu gunakan hasilnya sebagai bahan mengambil langkah berikutnya.
            </p>
          </div>
        </div>
      </section>

      {groups.map(([groupType, groupTools]) => (
        <section key={groupType} className="space-y-5">
          {!type && (
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-money-green">{toolTypeLabels[groupType]}</p>
                <h2 className="mt-1 text-2xl font-semibold text-heading">
                  {typeCopy[groupType].title}
                </h2>
              </div>
            </div>
          )}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {groupTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
