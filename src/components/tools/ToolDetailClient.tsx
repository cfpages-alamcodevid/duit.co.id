"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clipboard,
  Copy,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react"
import type { ToolCatalogItem } from "@/data/toolsCatalog"
import { governmentAidResources, legalAidResources } from "@/data/toolsCatalog"

interface ToolDetailClientProps {
  tool: ToolCatalogItem
}

type SelectOption = {
  label: string
  value: string
}

const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)

const percent = (value: number) => `${Number.isFinite(value) ? value.toFixed(1) : "0.0"}%`

const toNumber = (value: string) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function Field({
  label,
  value,
  onChange,
  suffix,
  min = 0,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  suffix?: string
  min?: number
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-heading">{label}</span>
      <div className="flex overflow-hidden rounded-xl border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/5">
        <input
          type="number"
          min={min}
          value={value}
          onChange={(event) => onChange(toNumber(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-heading outline-none"
        />
        {suffix && (
          <span className="border-l border-black/10 px-3 py-3 text-sm text-body dark:border-white/10">
            {suffix}
          </span>
        )}
      </div>
    </label>
  )
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-heading">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-heading outline-none dark:border-white/10 dark:bg-white/5"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function Panel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
      <h2 className="text-xl font-semibold text-heading">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function ResultMetric({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "good" | "warn"
}) {
  const toneClass =
    tone === "good"
      ? "text-money-green"
      : tone === "warn"
        ? "text-amber-700 dark:text-amber-300"
        : "text-heading"

  return (
    <div className="rounded-xl border border-black/10 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-body">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${toneClass}`}>{value}</p>
    </div>
  )
}

function TextOutput({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="space-y-3">
      <textarea
        readOnly
        value={value}
        className="min-h-[260px] w-full rounded-xl border border-black/10 bg-white/70 p-4 text-sm leading-6 text-heading outline-none dark:border-white/10 dark:bg-white/5"
      />
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-xl bg-money-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
      >
        <Copy className="h-4 w-4" />
        {copied ? "Tersalin" : "Salin hasil"}
      </button>
    </div>
  )
}

export function ToolDetailClient({ tool }: ToolDetailClientProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid gap-8 py-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
            {tool.path}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-heading sm:text-5xl">
            {tool.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-body sm:text-lg">
            {tool.shortDescription}
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-heading">Manfaat utama</p>
          <ul className="mt-4 space-y-3">
            {tool.benefitList.map((benefit) => (
              <li key={benefit} className="flex gap-2 text-sm text-body">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-money-green" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ToolBody tool={tool} />
      <Disclaimer />
    </div>
  )
}

function ToolBody({ tool }: { tool: ToolCatalogItem }) {
  switch (tool.id) {
    case "debt-payoff":
      return <DebtPayoffTool />
    case "digital-safety":
      return <DigitalSafetyTool />
    case "legal-aid-directory":
      return <LegalAidDirectory />
    case "government-aid-directory":
      return <GovernmentAidDirectory />
    case "monthly-budget":
      return <MonthlyBudgetTool />
    case "emergency-fund":
      return <EmergencyFundTool />
    case "product-pricing":
      return <ProductPricingTool />
    case "cv-portfolio":
      return <CvPortfolioTemplate />
    case "content-calendar":
      return <ContentCalendarTemplate />
    case "agribusiness-capital":
      return <AgribusinessCapitalTool />
    case "professional-proposal":
      return <ProfessionalProposalTemplate />
    case "property-roi":
      return <PropertyRoiTool />
    case "franchise-roi":
      return <FranchiseRoiTool />
    case "solar-roi":
      return <SolarRoiTool />
    case "investment-risk":
      return <InvestmentRiskTool />
    case "tax-estimator":
      return <TaxEstimatorTool />
    case "insurance-needs":
      return <InsuranceNeedsTool />
    case "family-asset-map":
      return <FamilyAssetMapTemplate />
    case "personal-finance-checklist":
      return <PersonalFinanceChecklist />
    default:
      return <Panel title="Tool belum tersedia">Tool ini sedang disiapkan.</Panel>
  }
}

interface DebtItem {
  name: string
  balance: number
  rate: number
  minimum: number
}

function simulateDebt(debts: DebtItem[], strategy: "snowball" | "avalanche", extra: number) {
  const working = debts
    .filter((debt) => debt.balance > 0)
    .map((debt) => ({ ...debt, balance: debt.balance }))
  let totalPaid = 0
  let months = 0

  while (working.some((debt) => debt.balance > 1) && months < 360) {
    months += 1
    for (const debt of working) {
      if (debt.balance > 0) {
        debt.balance += debt.balance * (debt.rate / 100 / 12)
      }
    }

    const active = working.filter((debt) => debt.balance > 1)
    const target = [...active].sort((a, b) =>
      strategy === "snowball" ? a.balance - b.balance : b.rate - a.rate,
    )[0]

    for (const debt of active) {
      const base = Math.max(debt.minimum, debt.balance * 0.01)
      const payment = Math.min(debt.balance, base + (debt === target ? extra : 0))
      debt.balance -= payment
      totalPaid += payment
    }
  }

  return {
    months,
    totalPaid,
    totalInterest: Math.max(0, totalPaid - debts.reduce((sum, debt) => sum + debt.balance, 0)),
  }
}

function DebtPayoffTool() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { name: "Pinjol / kartu kredit", balance: 5000000, rate: 36, minimum: 500000 },
    { name: "Cicilan barang", balance: 2500000, rate: 18, minimum: 250000 },
  ])
  const [extra, setExtra] = useState(300000)

  const snowball = useMemo(() => simulateDebt(debts, "snowball", extra), [debts, extra])
  const avalanche = useMemo(() => simulateDebt(debts, "avalanche", extra), [debts, extra])
  const best = avalanche.totalInterest <= snowball.totalInterest ? "Avalanche" : "Snowball"

  const updateDebt = (index: number, patch: Partial<DebtItem>) => {
    setDebts((current) =>
      current.map((debt, debtIndex) => (debtIndex === index ? { ...debt, ...patch } : debt)),
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Panel title="Daftar utang">
        <div className="space-y-4">
          {debts.map((debt, index) => (
            <div key={`${debt.name}-${index}`} className="rounded-xl border border-black/10 p-4 dark:border-white/10">
              <input
                value={debt.name}
                onChange={(event) => updateDebt(index, { name: event.target.value })}
                className="mb-3 w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm text-heading outline-none dark:border-white/10 dark:bg-white/5"
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Sisa utang" value={debt.balance} onChange={(value) => updateDebt(index, { balance: value })} />
                <Field label="Bunga/tahun" value={debt.rate} onChange={(value) => updateDebt(index, { rate: value })} suffix="%" />
                <Field label="Minimum/bulan" value={debt.minimum} onChange={(value) => updateDebt(index, { minimum: value })} />
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                setDebts((current) => [
                  ...current,
                  { name: `Utang ${current.length + 1}`, balance: 1000000, rate: 12, minimum: 100000 },
                ])
              }
              className="rounded-xl border border-money-green/20 px-4 py-3 text-sm font-semibold text-money-green"
            >
              Tambah utang
            </button>
            <button
              type="button"
              onClick={() => setDebts((current) => current.slice(0, Math.max(1, current.length - 1)))}
              className="rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-body dark:border-white/10"
            >
              Hapus terakhir
            </button>
          </div>
          <Field label="Tambahan pembayaran per bulan" value={extra} onChange={setExtra} />
        </div>
      </Panel>

      <Panel title="Hasil simulasi">
        <div className="grid gap-4">
          <ResultMetric label="Rekomendasi strategi" value={best} tone="good" />
          <ResultMetric label="Snowball lunas dalam" value={`${snowball.months} bulan`} />
          <ResultMetric label="Avalanche lunas dalam" value={`${avalanche.months} bulan`} />
          <ResultMetric label="Estimasi biaya bunga/fee snowball" value={formatIDR(snowball.totalInterest)} />
          <ResultMetric label="Estimasi biaya bunga/fee avalanche" value={formatIDR(avalanche.totalInterest)} />
        </div>
        <div className="mt-5 rounded-xl bg-money-green/10 p-4 text-sm leading-6 text-body">
          Bayar minimum semua utang, lalu arahkan tambahan pembayaran ke utang target. Jika tertekan
          penagihan, siapkan bukti, minta restrukturisasi tertulis, dan hindari pinjaman baru untuk
          menutup cicilan lama.
        </div>
      </Panel>
    </div>
  )
}

const safetyItems = [
  "Pernah memasukkan OTP/PIN/password setelah klik link",
  "Menginstal APK dari luar Play Store/App Store",
  "Memberi izin kontak, SMS, lokasi, atau galeri ke aplikasi pinjaman",
  "Mengirim foto KTP/selfie KTP ke pihak tidak jelas",
  "Ada ancaman sebar data atau intimidasi lewat WhatsApp",
  "Link memakai domain pendek atau nama brand yang salah eja",
  "Ada permintaan biaya admin sebelum dana cair",
]

function DigitalSafetyTool() {
  const [checked, setChecked] = useState<string[]>([])
  const score = checked.length
  const level = score >= 5 ? "Risiko tinggi" : score >= 3 ? "Risiko sedang" : "Risiko rendah"

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Audit risiko">
        <div className="space-y-3">
          {safetyItems.map((item) => (
            <label key={item} className="flex gap-3 rounded-xl border border-black/10 bg-white/50 p-4 text-sm text-body dark:border-white/10 dark:bg-white/5">
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={(event) =>
                  setChecked((current) =>
                    event.target.checked ? [...current, item] : current.filter((value) => value !== item),
                  )
                }
                className="mt-1"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </Panel>
      <Panel title="Langkah berikutnya">
        <ResultMetric label="Skor risiko" value={`${score}/7`} tone={score >= 3 ? "warn" : "good"} />
        <ResultMetric label="Level" value={level} tone={score >= 3 ? "warn" : "good"} />
        <ol className="mt-5 space-y-3 text-sm leading-6 text-body">
          <li>1. Ganti password email, bank, e-wallet, dan akun penting.</li>
          <li>2. Cabut izin aplikasi mencurigakan dari pengaturan HP.</li>
          <li>3. Simpan screenshot ancaman, nomor, link, dan bukti transfer.</li>
          <li>4. Laporkan pinjol/penipuan ke kanal resmi terkait.</li>
          <li>5. Beri tahu kontak dekat agar tidak merespons pesan intimidasi.</li>
        </ol>
      </Panel>
    </div>
  )
}

function LegalAidDirectory() {
  const [query, setQuery] = useState("")
  const [province, setProvince] = useState("Semua")
  const provinces = ["Semua", ...Array.from(new Set(legalAidResources.map((item) => item.province)))]
  const filtered = legalAidResources.filter((item) => {
    const text = `${item.name} ${item.province} ${item.issues.join(" ")} ${item.notes}`.toLowerCase()
    return (province === "Semua" || item.province === province) && text.includes(query.toLowerCase())
  })

  return (
    <DirectoryShell
      title="Cari bantuan hukum"
      query={query}
      setQuery={setQuery}
      filterLabel="Provinsi"
      filterValue={province}
      setFilterValue={setProvince}
      filterOptions={provinces}
    >
      {filtered.map((item) => (
        <ResourceCard
          key={item.name}
          title={item.name}
          meta={`${item.province} - ${item.issues.join(", ")}`}
          description={item.notes}
          contact={item.contact}
          url={item.url}
        />
      ))}
    </DirectoryShell>
  )
}

function GovernmentAidDirectory() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Semua")
  const categories = ["Semua", ...Array.from(new Set(governmentAidResources.map((item) => item.category)))]
  const filtered = governmentAidResources.filter((item) => {
    const text = `${item.name} ${item.category} ${item.audience} ${item.documents.join(" ")} ${item.notes}`.toLowerCase()
    return (category === "Semua" || item.category === category) && text.includes(query.toLowerCase())
  })

  return (
    <DirectoryShell
      title="Cari program bantuan"
      query={query}
      setQuery={setQuery}
      filterLabel="Kategori"
      filterValue={category}
      setFilterValue={setCategory}
      filterOptions={categories}
    >
      {filtered.map((item) => (
        <ResourceCard
          key={item.name}
          title={item.name}
          meta={`${item.category} - dokumen: ${item.documents.join(", ")}`}
          description={item.audience}
          contact={item.notes}
          url={item.url}
        />
      ))}
    </DirectoryShell>
  )
}

function DirectoryShell({
  title,
  query,
  setQuery,
  filterLabel,
  filterValue,
  setFilterValue,
  filterOptions,
  children,
}: {
  title: string
  query: string
  setQuery: (value: string) => void
  filterLabel: string
  filterValue: string
  setFilterValue: (value: string) => void
  filterOptions: string[]
  children: React.ReactNode
}) {
  return (
    <Panel title={title}>
      <div className="grid gap-4 md:grid-cols-[1fr_260px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-body" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari isu, nama, wilayah, atau dokumen"
            className="w-full rounded-xl border border-black/10 bg-white/70 py-3 pl-10 pr-4 text-sm text-heading outline-none dark:border-white/10 dark:bg-white/5"
          />
        </label>
        <SelectField
          label={filterLabel}
          value={filterValue}
          onChange={setFilterValue}
          options={filterOptions.map((option) => ({ label: option, value: option }))}
        />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">{children}</div>
    </Panel>
  )
}

function ResourceCard({
  title,
  meta,
  description,
  contact,
  url,
}: {
  title: string
  meta: string
  description: string
  contact: string
  url: string
}) {
  return (
    <article className="rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-money-green">{meta}</p>
      <h3 className="mt-2 text-lg font-semibold text-heading">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-body">{description}</p>
      <p className="mt-3 text-sm font-semibold text-heading">{contact}</p>
      <a href={url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-money-green">
        Buka sumber resmi <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  )
}

function MonthlyBudgetTool() {
  const [income, setIncome] = useState(5000000)
  const [rent, setRent] = useState(1200000)
  const [food, setFood] = useState(1500000)
  const [transport, setTransport] = useState(500000)
  const [utilities, setUtilities] = useState(350000)
  const [debt, setDebt] = useState(750000)
  const [family, setFamily] = useState(300000)
  const [saving, setSaving] = useState(200000)
  const total = rent + food + transport + utilities + debt + family + saving
  const remaining = income - total
  const weekly = Math.max(0, remaining / 4.33)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Input budget">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Pendapatan bulanan" value={income} onChange={setIncome} />
          <Field label="Kos/kontrakan" value={rent} onChange={setRent} />
          <Field label="Makan & belanja" value={food} onChange={setFood} />
          <Field label="Transport" value={transport} onChange={setTransport} />
          <Field label="Listrik, air, data" value={utilities} onChange={setUtilities} />
          <Field label="Cicilan/utang" value={debt} onChange={setDebt} />
          <Field label="Bantu keluarga" value={family} onChange={setFamily} />
          <Field label="Tabungan" value={saving} onChange={setSaving} />
        </div>
      </Panel>
      <Panel title="Ringkasan">
        <div className="grid gap-4">
          <ResultMetric label="Total pengeluaran" value={formatIDR(total)} />
          <ResultMetric label="Sisa bulanan" value={formatIDR(remaining)} tone={remaining >= 0 ? "good" : "warn"} />
          <ResultMetric label="Ruang aman mingguan" value={formatIDR(weekly)} />
          <ResultMetric label="Rasio utang" value={percent((debt / Math.max(1, income)) * 100)} tone={debt / Math.max(1, income) > 0.3 ? "warn" : "good"} />
        </div>
      </Panel>
    </div>
  )
}

function EmergencyFundTool() {
  const [monthlyExpense, setMonthlyExpense] = useState(3500000)
  const [dependents, setDependents] = useState(2)
  const [stability, setStability] = useState("medium")
  const [dailySaving, setDailySaving] = useState(20000)
  const monthsTarget = stability === "low" ? 6 + dependents : stability === "medium" ? 4 + dependents * 0.5 : 3
  const target = monthlyExpense * monthsTarget
  const days = target / Math.max(1, dailySaving)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Profil risiko">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Biaya hidup bulanan" value={monthlyExpense} onChange={setMonthlyExpense} />
          <Field label="Jumlah tanggungan" value={dependents} onChange={setDependents} />
          <Field label="Tabungan harian realistis" value={dailySaving} onChange={setDailySaving} />
          <SelectField
            label="Stabilitas income"
            value={stability}
            onChange={setStability}
            options={[
              { label: "Tidak stabil", value: "low" },
              { label: "Cukup stabil", value: "medium" },
              { label: "Stabil", value: "high" },
            ]}
          />
        </div>
      </Panel>
      <Panel title="Target dana darurat">
        <div className="grid gap-4">
          <ResultMetric label="Target bulan proteksi" value={`${monthsTarget.toFixed(1)} bulan`} />
          <ResultMetric label="Target dana" value={formatIDR(target)} tone="good" />
          <ResultMetric label="Waktu dengan tabungan harian" value={`${Math.ceil(days)} hari`} />
          <ResultMetric label="Target mini pertama" value={formatIDR(Math.min(target, monthlyExpense))} />
        </div>
      </Panel>
    </div>
  )
}

function ProductPricingTool() {
  const [material, setMaterial] = useState(30000)
  const [labor, setLabor] = useState(10000)
  const [packaging, setPackaging] = useState(5000)
  const [platformFee, setPlatformFee] = useState(8)
  const [margin, setMargin] = useState(30)
  const [fixedCost, setFixedCost] = useState(1000000)
  const [monthlyUnits, setMonthlyUnits] = useState(200)
  const unitFixed = fixedCost / Math.max(1, monthlyUnits)
  const hpp = material + labor + packaging + unitFixed
  const price = hpp / Math.max(0.1, 1 - platformFee / 100 - margin / 100)
  const maxDiscount = Math.max(0, ((price - hpp / Math.max(0.1, 1 - platformFee / 100)) / price) * 100)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Komponen biaya">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Bahan/modal per unit" value={material} onChange={setMaterial} />
          <Field label="Tenaga kerja per unit" value={labor} onChange={setLabor} />
          <Field label="Kemasan per unit" value={packaging} onChange={setPackaging} />
          <Field label="Fee platform" value={platformFee} onChange={setPlatformFee} suffix="%" />
          <Field label="Target margin" value={margin} onChange={setMargin} suffix="%" />
          <Field label="Biaya tetap bulanan" value={fixedCost} onChange={setFixedCost} />
          <Field label="Target unit/bulan" value={monthlyUnits} onChange={setMonthlyUnits} />
        </div>
      </Panel>
      <Panel title="Harga jual">
        <div className="grid gap-4">
          <ResultMetric label="HPP per unit" value={formatIDR(hpp)} />
          <ResultMetric label="Harga jual minimum" value={formatIDR(price)} tone="good" />
          <ResultMetric label="Batas diskon aman" value={percent(maxDiscount)} />
          <ResultMetric label="Biaya tetap per unit" value={formatIDR(unitFixed)} />
        </div>
      </Panel>
    </div>
  )
}

function AgribusinessCapitalTool() {
  const [starter, setStarter] = useState(3000000)
  const [cycleCost, setCycleCost] = useState(1500000)
  const [yieldUnits, setYieldUnits] = useState(250)
  const [price, setPrice] = useState(20000)
  const [lossRate, setLossRate] = useState(10)
  const [cycleDays, setCycleDays] = useState(45)
  const netUnits = yieldUnits * (1 - lossRate / 100)
  const revenue = netUnits * price
  const profit = revenue - cycleCost
  const paybackCycles = starter / Math.max(1, profit)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Unit ekonomi siklus">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Modal awal alat/kandang" value={starter} onChange={setStarter} />
          <Field label="Biaya per siklus" value={cycleCost} onChange={setCycleCost} />
          <Field label="Hasil produksi/unit" value={yieldUnits} onChange={setYieldUnits} />
          <Field label="Harga jual per unit" value={price} onChange={setPrice} />
          <Field label="Risiko gagal/susut" value={lossRate} onChange={setLossRate} suffix="%" />
          <Field label="Durasi siklus" value={cycleDays} onChange={setCycleDays} suffix="hari" />
        </div>
      </Panel>
      <Panel title="Estimasi hasil">
        <div className="grid gap-4">
          <ResultMetric label="Pendapatan/siklus" value={formatIDR(revenue)} />
          <ResultMetric label="Laba/siklus" value={formatIDR(profit)} tone={profit >= 0 ? "good" : "warn"} />
          <ResultMetric label="Payback" value={`${paybackCycles.toFixed(1)} siklus`} />
          <ResultMetric label="Estimasi hari balik modal" value={`${Math.ceil(paybackCycles * cycleDays)} hari`} />
        </div>
      </Panel>
    </div>
  )
}

function PropertyRoiTool() {
  const [price, setPrice] = useState(800000000)
  const [renovation, setRenovation] = useState(50000000)
  const [fees, setFees] = useState(6)
  const [rent, setRent] = useState(6500000)
  const [occupancy, setOccupancy] = useState(90)
  const [maintenance, setMaintenance] = useState(15)
  const totalCost = price + renovation + price * (fees / 100)
  const grossIncome = rent * 12 * (occupancy / 100)
  const netIncome = grossIncome * (1 - maintenance / 100)
  const yieldNet = (netIncome / totalCost) * 100
  const payback = totalCost / Math.max(1, netIncome)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Asumsi properti">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Harga beli" value={price} onChange={setPrice} />
          <Field label="Renovasi/furnishing" value={renovation} onChange={setRenovation} />
          <Field label="Pajak & biaya transaksi" value={fees} onChange={setFees} suffix="%" />
          <Field label="Sewa bulanan" value={rent} onChange={setRent} />
          <Field label="Okupansi" value={occupancy} onChange={setOccupancy} suffix="%" />
          <Field label="Maintenance dari income" value={maintenance} onChange={setMaintenance} suffix="%" />
        </div>
      </Panel>
      <Panel title="ROI properti">
        <div className="grid gap-4">
          <ResultMetric label="Total modal" value={formatIDR(totalCost)} />
          <ResultMetric label="Net income/tahun" value={formatIDR(netIncome)} />
          <ResultMetric label="Net yield" value={percent(yieldNet)} tone={yieldNet >= 6 ? "good" : "warn"} />
          <ResultMetric label="Payback" value={`${payback.toFixed(1)} tahun`} />
        </div>
      </Panel>
    </div>
  )
}

function FranchiseRoiTool() {
  const [capex, setCapex] = useState(350000000)
  const [sales, setSales] = useState(90000000)
  const [cogs, setCogs] = useState(45)
  const [royalty, setRoyalty] = useState(5)
  const [rentStaff, setRentStaff] = useState(25000000)
  const gross = sales * (1 - cogs / 100)
  const profit = gross - sales * (royalty / 100) - rentStaff
  const payback = capex / Math.max(1, profit)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Asumsi outlet">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Capex + franchise fee" value={capex} onChange={setCapex} />
          <Field label="Omzet bulanan" value={sales} onChange={setSales} />
          <Field label="COGS" value={cogs} onChange={setCogs} suffix="%" />
          <Field label="Royalty/marketing fee" value={royalty} onChange={setRoyalty} suffix="%" />
          <Field label="Sewa, gaji, operasional" value={rentStaff} onChange={setRentStaff} />
        </div>
      </Panel>
      <Panel title="Kinerja franchise">
        <div className="grid gap-4">
          <ResultMetric label="Gross profit" value={formatIDR(gross)} />
          <ResultMetric label="Profit bulanan" value={formatIDR(profit)} tone={profit > 0 ? "good" : "warn"} />
          <ResultMetric label="Payback" value={`${payback.toFixed(1)} bulan`} />
          <ResultMetric label="Margin bersih" value={percent((profit / Math.max(1, sales)) * 100)} />
        </div>
      </Panel>
    </div>
  )
}

function SolarRoiTool() {
  const [monthlyBill, setMonthlyBill] = useState(12000000)
  const [capex, setCapex] = useState(180000000)
  const [savingRate, setSavingRate] = useState(35)
  const [maintenance, setMaintenance] = useState(3000000)
  const [evRevenue, setEvRevenue] = useState(0)
  const annualBenefit = monthlyBill * 12 * (savingRate / 100) + evRevenue * 12 - maintenance
  const payback = capex / Math.max(1, annualBenefit)
  const roi10 = ((annualBenefit * 10 - capex) / capex) * 100

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Asumsi energi">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tagihan listrik bulanan" value={monthlyBill} onChange={setMonthlyBill} />
          <Field label="Capex panel surya" value={capex} onChange={setCapex} />
          <Field label="Penghematan tagihan" value={savingRate} onChange={setSavingRate} suffix="%" />
          <Field label="Maintenance/tahun" value={maintenance} onChange={setMaintenance} />
          <Field label="Pendapatan EV/bulan opsional" value={evRevenue} onChange={setEvRevenue} />
        </div>
      </Panel>
      <Panel title="ROI energi">
        <div className="grid gap-4">
          <ResultMetric label="Benefit bersih/tahun" value={formatIDR(annualBenefit)} />
          <ResultMetric label="Payback" value={`${payback.toFixed(1)} tahun`} />
          <ResultMetric label="ROI 10 tahun" value={percent(roi10)} tone={roi10 > 0 ? "good" : "warn"} />
        </div>
      </Panel>
    </div>
  )
}

function InvestmentRiskTool() {
  const [horizon, setHorizon] = useState(5)
  const [drawdown, setDrawdown] = useState(20)
  const [liquidity, setLiquidity] = useState(3)
  const [experience, setExperience] = useState(2)
  const score = horizon * 3 + drawdown + experience * 8 - liquidity * 2
  const profile = score >= 55 ? "Agresif" : score >= 35 ? "Moderat" : "Konservatif"
  const allocation =
    profile === "Agresif"
      ? "Saham/ETF 60-80%, obligasi 10-25%, kas 5-15%"
      : profile === "Moderat"
        ? "Saham/ETF 35-55%, obligasi 25-45%, kas 10-20%"
        : "Kas/deposito 30-50%, obligasi 30-50%, saham 10-25%"

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Profil investor">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Horizon investasi" value={horizon} onChange={setHorizon} suffix="tahun" />
          <Field label="Toleransi turun sementara" value={drawdown} onChange={setDrawdown} suffix="%" />
          <Field label="Kebutuhan likuiditas 1-5" value={liquidity} onChange={setLiquidity} />
          <Field label="Pengalaman 1-5" value={experience} onChange={setExperience} />
        </div>
      </Panel>
      <Panel title="Hasil profil">
        <div className="grid gap-4">
          <ResultMetric label="Skor" value={`${score.toFixed(0)}/100`} />
          <ResultMetric label="Profil" value={profile} tone="good" />
        </div>
        <p className="mt-5 rounded-xl bg-money-green/10 p-4 text-sm leading-6 text-body">{allocation}</p>
      </Panel>
    </div>
  )
}

function TaxEstimatorTool() {
  const [amount, setAmount] = useState(100000000)
  const [scenario, setScenario] = useState("umkm")
  const rate = scenario === "umkm" ? 0.5 : scenario === "dividen" ? 10 : scenario === "properti" ? 2.5 : 5
  const tax = amount * (rate / 100)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Skenario pajak">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nilai transaksi/penghasilan" value={amount} onChange={setAmount} />
          <SelectField
            label="Skenario"
            value={scenario}
            onChange={setScenario}
            options={[
              { label: "UMKM PP 23/55 - estimasi 0,5%", value: "umkm" },
              { label: "Dividen - placeholder 10%", value: "dividen" },
              { label: "PPh pengalihan properti - placeholder 2,5%", value: "properti" },
              { label: "Lainnya - placeholder 5%", value: "lain" },
            ]}
          />
        </div>
      </Panel>
      <Panel title="Estimasi awal">
        <div className="grid gap-4">
          <ResultMetric label="Tarif placeholder" value={percent(rate)} />
          <ResultMetric label="Estimasi pajak" value={formatIDR(tax)} tone="warn" />
        </div>
        <p className="mt-5 text-sm leading-6 text-body">
          Ini kalkulator edukasi kasar. Untuk keputusan pajak nyata, cek regulasi terbaru dan gunakan konsultan pajak.
        </p>
      </Panel>
    </div>
  )
}

function InsuranceNeedsTool() {
  const [monthlyNeeds, setMonthlyNeeds] = useState(8000000)
  const [years, setYears] = useState(10)
  const [debt, setDebt] = useState(200000000)
  const [assets, setAssets] = useState(100000000)
  const [coverage, setCoverage] = useState(150000000)
  const need = monthlyNeeds * 12 * years + debt
  const gap = Math.max(0, need - assets - coverage)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Kebutuhan keluarga">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Biaya keluarga/bulan" value={monthlyNeeds} onChange={setMonthlyNeeds} />
          <Field label="Tahun proteksi" value={years} onChange={setYears} />
          <Field label="Utang yang harus ditutup" value={debt} onChange={setDebt} />
          <Field label="Aset likuid" value={assets} onChange={setAssets} />
          <Field label="Asuransi yang sudah ada" value={coverage} onChange={setCoverage} />
        </div>
      </Panel>
      <Panel title="Gap proteksi">
        <div className="grid gap-4">
          <ResultMetric label="Total kebutuhan" value={formatIDR(need)} />
          <ResultMetric label="Gap proteksi" value={formatIDR(gap)} tone={gap > 0 ? "warn" : "good"} />
        </div>
      </Panel>
    </div>
  )
}

function CvPortfolioTemplate() {
  const [role, setRole] = useState("Virtual Assistant")
  const [strength, setStrength] = useState("rapi, cepat belajar, terbiasa spreadsheet")
  const [proof, setProof] = useState("mengelola pesanan dan laporan toko online keluarga")
  const output = `CV & Portfolio Draft

Target role: ${role}
Ringkasan profil:
Saya kandidat ${role} dengan kekuatan ${strength}. Saya pernah ${proof}, dan siap membantu tim bekerja lebih rapi.

Bagian CV:
1. Kontak dan link portfolio
2. Ringkasan 3 baris sesuai target role
3. Skill teknis yang relevan
4. Pengalaman/proyek dengan angka hasil
5. Tools yang dikuasai

Portfolio case study:
- Masalah: jelaskan kondisi awal
- Aksi: apa yang Anda kerjakan
- Hasil: angka, waktu, atau dampak
- Bukti: screenshot, link, atau testimoni

Pitch singkat:
Halo, saya tertarik membantu kebutuhan ${role}. Saya kuat di ${strength} dan punya pengalaman ${proof}. Saya bisa mulai dari task kecil agar Bapak/Ibu bisa menilai kualitas kerja saya.`

  return <TemplateShell title="Generator CV & portfolio" output={output} fields={<><TextField label="Target role" value={role} onChange={setRole} /><TextField label="Kekuatan utama" value={strength} onChange={setStrength} /><TextField label="Bukti pengalaman" value={proof} onChange={setProof} /></>} />
}

function ContentCalendarTemplate() {
  const [topic, setTopic] = useState("jualan makanan online")
  const [platform, setPlatform] = useState("TikTok dan Instagram")
  const output = Array.from({ length: 30 }, (_, index) => {
    const day = index + 1
    const angles = ["masalah umum", "tips cepat", "contoh kasus", "behind the scene", "FAQ", "kesalahan pemula"]
    return `Hari ${day}: ${topic} - ${angles[index % angles.length]} untuk ${platform}. Hook: \"Kalau kamu masih bingung soal ${topic}, mulai dari ini.\" CTA: simpan dan cek tool Duit.co.id.`
  }).join("\n")

  return <TemplateShell title="Generator kalender konten 30 hari" output={output} fields={<><TextField label="Topik utama" value={topic} onChange={setTopic} /><TextField label="Platform" value={platform} onChange={setPlatform} /></>} />
}

function ProfessionalProposalTemplate() {
  const [service, setService] = useState("jasa SOP operasional UMKM")
  const [client, setClient] = useState("pemilik bisnis kecil")
  const [price, setPrice] = useState("Rp 2.500.000")
  const output = `Proposal ${service}

Untuk: ${client}

Tujuan:
Membantu ${client} mendapatkan sistem kerja yang lebih rapi, terukur, dan mudah diajarkan ke tim.

Ruang lingkup:
1. Audit kondisi awal
2. Wawancara proses kerja utama
3. Penyusunan dokumen ${service}
4. Revisi 1 kali
5. Panduan implementasi 7 hari

Deliverables:
- Dokumen utama
- Checklist operasional
- Template monitoring

Timeline:
7-14 hari kerja setelah data lengkap.

Biaya:
${price}

Catatan:
Pekerjaan di luar scope akan dibuatkan penawaran terpisah.`

  return <TemplateShell title="Generator proposal jasa" output={output} fields={<><TextField label="Jenis jasa" value={service} onChange={setService} /><TextField label="Target klien" value={client} onChange={setClient} /><TextField label="Harga" value={price} onChange={setPrice} /></>} />
}

function FamilyAssetMapTemplate() {
  const [family, setFamily] = useState("Keluarga")
  const [asset, setAsset] = useState("rumah, tanah, bisnis, deposito, polis asuransi")
  const output = `Peta Aset ${family}

Inventaris aset:
${asset}

Kolom yang wajib dilengkapi:
1. Nama aset
2. Pemilik legal
3. Nilai estimasi
4. Dokumen bukti
5. Lokasi dokumen
6. Beneficiary/ahli waris yang direncanakan
7. Risiko sengketa
8. PIC keluarga

Agenda rapat keluarga:
- Validasi semua dokumen aset
- Sepakati siapa yang menyimpan salinan
- Tentukan aset yang butuh notaris/konsultan pajak
- Buat rencana komunikasi suksesi

Skor kesiapan:
Hijau jika semua aset punya dokumen, pemilik legal jelas, dan beneficiary dibahas tertulis.`

  return <TemplateShell title="Generator peta aset keluarga" output={output} fields={<><TextField label="Nama keluarga" value={family} onChange={setFamily} /><TextField label="Daftar aset utama" value={asset} onChange={setAsset} /></>} />
}

function TemplateShell({
  title,
  fields,
  output,
}: {
  title: string
  fields: React.ReactNode
  output: string
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <Panel title={title}>
        <div className="space-y-4">{fields}</div>
      </Panel>
      <Panel title="Draft hasil">
        <TextOutput value={output} />
      </Panel>
    </div>
  )
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-heading">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-heading outline-none dark:border-white/10 dark:bg-white/5"
      />
    </label>
  )
}

function PersonalFinanceChecklist() {
  const items = [
    "Saya tahu semua utang dan jatuh temponya",
    "Budget bulanan saya tidak negatif",
    "Saya punya dana darurat minimal 1 bulan biaya hidup",
    "Saya punya BPJS/Proteksi dasar",
    "Dokumen penting keluarga tersimpan rapi",
    "Saya punya target finansial 90 hari ke depan",
  ]
  const [checked, setChecked] = useState<string[]>([])
  const score = Math.round((checked.length / items.length) * 100)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Panel title="Audit 10 menit">
        <div className="space-y-3">
          {items.map((item) => (
            <label key={item} className="flex gap-3 rounded-xl border border-black/10 p-4 text-sm text-body dark:border-white/10">
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={(event) =>
                  setChecked((current) =>
                    event.target.checked ? [...current, item] : current.filter((value) => value !== item),
                  )
                }
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </Panel>
      <Panel title="Rekomendasi">
        <ResultMetric label="Skor sehat finansial" value={`${score}/100`} tone={score >= 70 ? "good" : "warn"} />
        <p className="mt-5 text-sm leading-6 text-body">
          Jika skor di bawah 70, mulai dari budget bulanan, simulasi pelunasan utang, dan dana darurat.
        </p>
      </Panel>
    </div>
  )
}

function Disclaimer() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-50/70 p-5 text-sm leading-6 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <p>
          Semua hasil bersifat edukasi dan estimasi. Untuk keputusan hukum, pajak, investasi,
          asuransi, atau transaksi besar, verifikasi angka dan konsultasikan dengan profesional
          yang relevan.
        </p>
      </div>
    </div>
  )
}
