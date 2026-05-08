# Linkable Tools & Resources Feature Plan

Tanggal: 2026-05-08 WIB

Dokumen ini merinci rencana fitur untuk tools/resources yang akan menjadi linkable assets Duit.co.id. Tools ini akan dipakai oleh artikel sebagai internal link yang berguna, meningkatkan topical authority, dwell time, dan potensi backlink natural.

Source awal:

- `docs/RESOURCES_CATALOG.md`
- `docs/ARTICLE_CATALOG.md`

## Keputusan Arsitektur

Untuk katalog tools, gunakan **static data di repo dulu**, bukan D1.

Rekomendasi source of truth fase awal:

```text
src/data/toolsCatalog.ts
```

atau, jika nanti ingin editable lewat Keystatic:

```text
content/tools/*.md
```

Alasan:

- Daftar tools adalah product/editorial metadata, bukan data transaksi.
- Jumlahnya kecil dan jarang berubah.
- Static data bisa ikut build, cepat, murah, SEO-friendly, dan tidak memanggil D1 untuk halaman publik.
- `/kalkulator`, `/template`, `/direktori`, `/ceklist`, dan `/resources` bisa otomatis membuat card dari data statis saat build.
- D1 tetap dipakai untuk data dinamis: saved calculation, user progress, analytics, leads, unlocks, orders, dan payment events.

D1 bukan masalah kapasitas untuk 20-100 row katalog tools. Masalahnya lebih ke arsitektur: jangan membuat halaman publik bergantung ke database runtime kalau datanya bisa static. Untuk Duit.co.id, biaya dan reliability lebih baik jika katalog tools static dulu.

## Recommended Data Model

Static catalog shape:

```ts
export interface ToolCatalogItem {
  id: string
  type: "kalkulator" | "template" | "direktori" | "ceklist" | "resources"
  slug: string
  path: string
  title: string
  shortDescription: string
  benefitList: string[]
  targetUser: string
  primaryArticleClusters: string[]
  status: "planned" | "mvp" | "live" | "needs-update"
  priority: "high" | "medium" | "low"
  estimatedBuild: "small" | "medium" | "large"
  requiresAuth: boolean
  canSaveResult: boolean
}
```

Optional D1 tables later:

```sql
CREATE TABLE tool_usage_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_id TEXT NOT NULL,
  clerk_user_id TEXT,
  anonymous_id TEXT,
  event_type TEXT NOT NULL,
  source_article_slug TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE saved_tool_results (
  id TEXT PRIMARY KEY,
  tool_id TEXT NOT NULL,
  clerk_user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  result_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Rule:

- Tool metadata: static repo / Keystatic.
- Tool runtime inputs/results: browser state by default.
- Saved results: D1 only for logged-in users.
- Usage analytics: D1 or lightweight event pipeline later.

## Listing Pages

| Route | Purpose | Source | Notes |
|---|---|---|---|
| `/tools` | All tools/resources hub | Static catalog | Group by type and tier |
| `/kalkulator` | All calculators | Static catalog filtered by `type="kalkulator"` | Card grid with benefit list |
| `/template` | All templates | Static catalog filtered by `type="template"` | Download/generate flow |
| `/direktori` | All directories | Static catalog filtered by `type="direktori"` | Search/filter-heavy |
| `/ceklist` | All checklists | Static catalog filtered by `type="ceklist"` | Interactive checklist UI |
| `/resources` | General resources | Static catalog filtered by `type="resources"` | Lower-priority utility pages |

Card fields:

- Title.
- Short description.
- 3 benefit bullets.
- Article clusters served.
- Badge: Calculator, Template, Directory, Checklist, Resource.
- CTA: `Gunakan`, `Buka Direktori`, `Unduh Template`, or `Mulai Checklist`.

## Feature Plan Table

| Tool / Resource | Main Users | Article Clusters Served | Core Features | Outputs | Data / Formula Needs | SEO Benefit | MVP Priority |
|---|---|---|---|---|---|---|---|
| `/kalkulator/simulasi-pelunasan-utang` | Pinjol victims, debtors, families in crisis | Pinjol, debt collector, negotiation, restructuring, debt tracking | Debt list input, principal, interest/fee, minimum payment, due date, snowball vs avalanche comparison, extra payment slider, late-fee toggle, payment priority score, printable payoff plan | Monthly payoff schedule, total interest/fees, target lunas date, recommended negotiation script, downloadable PDF | Basic amortization, flat fee handling, debt priority rules, OJK/legal warning copy | High-intent backlink target for debt articles and personal finance forums | High |
| `/ceklist/keamanan-digital` | Users exposed to scams, OTP theft, fake APK, illegal pinjol | Scam, digital safety, KTP/OTP, WA links, APK, app permissions | Step-by-step checklist, risk scoring, suspicious link/APK checklist, permission audit, KTP/OTP exposure triage, emergency action mode, copyable reporting notes | Risk level, action checklist, evidence checklist, next-step links to OJK/police/LBH content | Static safety rules, official reporting links, app permission education | Useful evergreen checklist that can earn links from safety communities | High |
| `/direktori/bantuan-hukum-gratis` | Debtors, consumers, low-income households needing help | LBH, legal escalation, reports, disputes, contracts, inheritance | Searchable directory by province/city, issue type filter, contact fields, eligibility notes, template report links, emergency contact panel, map-ready structure later | List of relevant LBH/support orgs, contact summary, recommended escalation route | Curated directory data, OJK/AFPI/police links, legal aid organization metadata | Strong linkable asset for legal/consumer protection content | High |
| `/direktori/bantuan-pemerintah` | Low-income families, students, BPJS/KIP/FLPP seekers | Bansos, PKH, BPNT, KIS, KIP, BPJS, housing subsidy, scholarships | Eligibility filters, household profile input, program directory, required documents checklist, official application links, deadline/status notes, fraud warning | Matching programs, document checklist, official links, next action plan | Program metadata, eligibility rules, official government URLs, update date | High public utility and potential backlink target | High |
| `/kalkulator/budget-bulanan` | UMR workers, families, students, crisis households | Budget defense, food, transport, utilities, THR, remittance | Income input, fixed/variable expense categories, 50/30/20 optional mode, survival mode, weekly envelope split, warning for negative cashflow, THR allocator, export plan | Monthly/weekly budget, overspending flags, recommended cuts, printable plan | Budget formulas, category benchmarks, Rupiah formatter | Supports dozens of survival-budget articles | High |
| `/kalkulator/dana-darurat` | Tier 0-1 readers, recently laid off workers, families | PHK, emergency fund, micro-saving, side income | Monthly expense input, dependents, job stability, debt pressure, target months, daily saving simulator, timeline slider, emergency fund tiers | Target fund, daily/weekly saving plan, realistic timeline, emergency priority checklist | Emergency fund rules, risk scoring, saving projection | Evergreen personal finance link magnet | High |
| `/kalkulator/harga-jual-produk` | UMKM, online sellers, resellers, food sellers | HPP, pricing, PO, dropship/reseller, online shop | Cost components, labor, packaging, platform fee, shipping subsidy, target margin, competitor price, break-even units, discount simulator | Recommended price, margin, BEP, fee impact, discount limit | Margin formulas, marketplace fee fields, BEP calculation | Useful for business articles and seller communities | High |
| `/template/cv-portfolio` | Fresh graduates, freelancers, VAs, creators | Career starter, freelance, CV, portfolio, salary negotiation | Role selector, CV section checklist, portfolio case-study generator, cover letter outline, freelance profile template, PDF/Markdown export | CV outline, portfolio checklist, proposal intro, downloadable template | Static templates, role-specific prompts, export formatting | Linkable career resource for job/freelance articles | Medium |
| `/template/kalender-konten` | Creators, UMKM, TikTok sellers, digital marketers | Content creator, TikTok live, online selling, marketing | Content goal selector, platform selector, 30-day calendar, hook ideas, CTA bank, repurposing checklist, posting cadence planner | 30-day plan, topic backlog, reusable CTA list, CSV export | Content taxonomy, platform cadence rules, article/video repurposing strategy | Supports content and online business clusters | Medium |
| `/kalkulator/modal-usaha-agribisnis` | Rural entrepreneurs, livestock/farming sellers | Maggot, lele, jamur, ternak, supplier, recycling | Business type selector, startup cost, recurring cost, cycle duration, mortality/waste factor, expected yield, selling price, sensitivity analysis | Capital need, profit estimate, payback period, risk warning | Unit economics per business, crop/livestock cycle assumptions | Strong niche backlink asset for rural business articles | Medium |
| `/template/proposal-jasa-profesional` | Consultants, bookkeepers, SOP writers, auditors, service providers | Professional services, SOP, pitch deck, export, K3, Amdal | Service type selector, scope builder, deliverables checklist, timeline, pricing model, terms template, client onboarding checklist | Proposal outline, scope of work, pricing table, terms checklist | Static templates, service-specific fields | Useful for monetizable service-career articles | Medium |
| `/kalkulator/roi-properti` | Investors, landlords, asset builders | Property, kos, sewa, renovation, commercial property, BPHTB/PPh | Purchase price, renovation, tax/fees, rent, occupancy, loan optional, maintenance, exit price, short-stay vs long-stay comparison | Gross yield, net yield, payback period, cashflow, sensitivity table | Property ROI formulas, tax/fee placeholders, loan amortization optional | High-value asset for property strategy articles | High |
| `/kalkulator/roi-franchise` | Franchise buyers, property+business investors | Franchise, waralaba, Alfamart/Indomaret, location, audit | Franchise fee, capex, royalty, COGS, rent, staff, sales scenarios, break-even, payback, monthly KPI dashboard | BEP, payback period, monthly profit estimate, red-flag ratios | Franchise unit economics, margin model, royalty formulas | Useful bridge to Franchise.id-style monetization | Medium |
| `/kalkulator/roi-energi-surya` | Property owners, commercial landlords, ESG investors | Panel surya, EV charging, energy savings, industrial property | Monthly electricity bill, system size, capex, tariff, degradation, maintenance, subsidy/tax incentive field, EV charger revenue optional | Payback period, annual savings, 10-year ROI, CO2 estimate | Solar ROI assumptions, electricity tariff fields, degradation factor | Strong technical linkable asset for energy/property articles | Medium |
| `/kalkulator/profil-risiko-investasi` | Tier 2-4 investors, first-time investors | Stocks, mutual funds, bonds, sukuk, crypto, PE/VC, ESG | Risk questionnaire, time horizon, liquidity need, drawdown tolerance, experience, income stability, asset allocation suggestion, education links | Risk profile, suggested allocation range, warning notes, learning path | Risk scoring model, asset class definitions, disclaimer copy | Central asset for all investment articles | Medium |
| `/kalkulator/pajak` | Investors, UHNW readers, property owners, family office | Tax, dividend, treaty, property tax, depreciation | Scenario selector, transaction amount, asset type, country optional, simple tax estimate, document checklist, advisor escalation CTA | Rough tax estimate, checklist, caveat and professional advice prompt | Tax rules are high-maintenance; must version and cite update dates | Useful but needs careful compliance and frequent updates | Medium |
| `/kalkulator/kebutuhan-asuransi` | Families, business owners, UHNW, insurance planning readers | Insurance, protection, BPJS, microinsurance, wealth protection | Dependents, debt, monthly needs, current assets, existing coverage, income replacement years, premium affordability, gap analysis | Coverage gap, priority ranking, premium budget range, questions for advisor | Human life value/simple needs-based formulas | Supports protection and estate articles | Medium |
| `/template/peta-aset-keluarga` | Business families, UHNW, family office readers | Estate planning, succession, trusts, holding, governance | Asset inventory, ownership map, nominee/beneficiary notes, document checklist, risk flags, family meeting agenda, advisor checklist | Asset map, missing document list, succession readiness score | Structured template, governance checklist, export to PDF/CSV | High-value resource for Tier 4 content | Medium |
| `/resources/checklist-keuangan-pribadi` | General readers without specific tool fit | General financial literacy, family finance, miscellaneous | Financial health checklist, emergency basics, debt check, insurance check, document check, goals review, next best tools recommendation | Score, recommended next article/tool, printable checklist | Static rules and routing map to other tools | Low-priority fallback asset that keeps internal links useful | Low |

## Feature Completeness Rules

Every calculator should include:

- Clear input fields with Rupiah formatting.
- Sensible defaults for Indonesian users.
- Inline explanation for formulas.
- Scenario comparison if relevant.
- Result summary card.
- Action checklist.
- Export/share option later.
- Related articles list.
- Disclaimer for financial/legal/tax content.
- Event tracking hook for `tool_usage_events`.

Every template should include:

- Guided generator flow.
- Editable preview.
- Copy to clipboard.
- Markdown/PDF export later.
- Example version.
- Related articles list.
- Optional login prompt to save.

Every directory should include:

- Search.
- Filters.
- Source/update date.
- Official link fields.
- Warning against scams.
- Submit correction link later.

Every checklist should include:

- Progress state.
- Severity labels.
- Next action based on score.
- Printable/exportable summary later.
- Related articles and official resources.

## Recommended Build Order

1. `/kalkulator/simulasi-pelunasan-utang`
2. `/ceklist/keamanan-digital`
3. `/direktori/bantuan-hukum-gratis`
4. `/direktori/bantuan-pemerintah`
5. `/kalkulator/budget-bulanan`
6. `/kalkulator/dana-darurat`
7. `/kalkulator/harga-jual-produk`
8. `/kalkulator/roi-properti`
9. `/template/cv-portfolio`
10. `/kalkulator/profil-risiko-investasi`

Reasoning:

- First four solve urgent Tier 0 pain and are likely to attract links.
- Budget and emergency fund support many existing published articles.
- Pricing and ROI tools support monetization and future Duitku product/checkout pages.
- Investment and Tier 4 tools can come after SEO foundations are stable.

## Static vs D1 Decision Matrix

| Requirement | Static catalog | D1 catalog |
|---|---:|---:|
| Fast public SEO pages | Best | Good, but runtime dependent |
| Zero runtime cost | Best | Uses D1 reads |
| Auto card listing | Yes | Yes |
| Edit without deploy | No, unless Keystatic/GitHub mode | Yes |
| Works with static export | Yes | No for runtime reads |
| Content review via Git | Best | Weaker |
| Non-technical admin editing | Keystatic later | Custom admin needed |
| Scale to 20-100 tools | Best | Also fine |

Decision:

- Use static catalog now.
- Use Keystatic later if non-technical editing is needed.
- Do not use D1 for catalog metadata unless we build a true admin dashboard.
- Use D1 for dynamic user-specific data and analytics.

## Future Implementation Notes

Proposed file layout:

```text
src/data/toolsCatalog.ts
src/app/tools/page.tsx
src/app/kalkulator/page.tsx
src/app/kalkulator/[slug]/page.tsx
src/app/template/page.tsx
src/app/template/[slug]/page.tsx
src/app/direktori/page.tsx
src/app/direktori/[slug]/page.tsx
src/app/ceklist/page.tsx
src/app/ceklist/[slug]/page.tsx
src/components/tools/ToolCard.tsx
src/components/tools/ToolResultCard.tsx
```

Dynamic tool implementations can live in:

```text
src/components/tools/calculators/
src/components/tools/templates/
src/components/tools/directories/
src/components/tools/checklists/
```

Each tool route should export metadata:

- Title.
- Description.
- Canonical URL.
- Open Graph image.
- JSON-LD `SoftwareApplication` or `WebApplication` where appropriate.

## Open Questions

- Which calculator should support saved results first?
- Should PDF export be free, login-gated, or share-gated?
- Should directories allow user submissions from day one?
- Should tools display Duitku-paid products as contextual CTAs, or only free educational CTAs at first?
