# Duit.co.id Tools Catalog

Master list of interactive tools to enrich the platform, organized by tier. Each tool is designed to solve specific problems faced by users in that tier.

**Status Legend:**
- 📋 **Planned** - Idea stage, not yet built
- ✍️ **Building** - In development
- ✅ **Live** - Available on platform
- 🔄 **Update** - Needs improvement

---

## Tier 0: Survival Tools
**Target Audience:** People in financial crisis, debt traps, pinjol victims  
**Purpose:** Immediate relief, legal protection, survival budgeting

| # | Tool Name | Function (Who it helps & Why) | Required Features | Status | Notes |
|---|-----------|--------------------------------------|-------------------|--------|-------|
| 0.1 | Pinjol Legality Checker | **Who:** Pinjol victims & cautious borrowers<br>**Why:** Prevent illegal loan traps by verifying OJK registration instantly | • OJK registered-lender database lookup<br>• WA link scanner (detects shady link patterns)<br>• APK hash checker against known illegal apps<br>• Red-flag indicator (interest rate >0.4%/day auto-flag) | 📋 | Must integrate OJK public API or scrapable registry |
| 0.2 | Debt Repayment Planner | **Who:** People with multiple debts<br>**Why:** Prioritize repayment using Snowball vs Avalanche method with realistic timeline | • Multi-debt input (principal, interest, due date)<br>• Snowball (small-balance-first) vs Avalanche (high-interest-first) toggle<br>• Payment schedule generator with milestone alerts<br>• "Minimum payment only" survival mode | 📋 | Include debt-to-income ratio warning |
| 0.3 | Emergency Fund Calculator (UMR-Based) | **Who:** Low-income workers (UMR earners)<br>**Why:** Calculate exact safety-net target and daily saving plan based on local UMR | • UMR selector by province (provides auto-filled baseline)<br>• 3-month / 6-month toggle<br>• Daily/weekly saving plan (e.g., "save Rp 10k/day")<br>• Progress tracker with celebratory milestones | 📋 | Link to emergency-fund-murah article |
| 0.4 | Budget Planner (Gaji Mingguan/Bulanan) | **Who:** Daily workers, weekly earners<br>**Why:** Manage tight budgets with weekly allocation to avoid end-of-month zero | • Weekly & monthly view toggle<br>• Expense categories (food, transport, pulsa, listrik)<br>• THR allocator (separate bonus from monthly flow)<br>• "Sisa hari" warning when spending too fast | 📋 | Integrate with budgeting-darurat-umr article |
| 0.5 | Bill Negotiation Letter Generator | **Who:** Tenants, utility users<br>**Why:** Generate professional negotiation letters to landlords, PLN, or PDAM with legal backing | • Template library (rent, electricity, water, phone plan)<br>• Auto-fill personal data & bill details<br>• Legal clause inserter (referencing OJK/consumer protection laws)<br>• PDF & WhatsApp export | 📋 | Uses templates from nego-tunggakan-kontrakan, nego-tunggakan-utilities |
| 0.6 | Debt Collector Incident Logger | **Who:** Victims of illegal collection<br>**Why:** Document harassment with evidence to support police/OJK reports | • Timestamped incident log (date, time, description)<br>• Chat screenshot / photo / voice-note upload<br>• Auto-generates formatted police report (Somatí)<br>• One-click OJK complaint draft | 📋 | Critical for menghadapi-debt-collector, panduan-debt-collector articles |
| 0.7 | Scam Link & APK Scanner | **Who:** Smartphone users<br>**Why:** Detect phishing links, malicious APKs, and fake WhatsApp numbers before clicking | • URL scanner (checks against known scam DB)<br>• APK permission analyzer (flags dangerous permissions)<br>• WhatsApp number reputation check (mass report count)<br>• "Bahaya" / "Aman" verdict with explanation | 📋 | Supports tanda-pinjol-berbahaya, cek-link-scam, lindungi-hp-scam |
| 0.8 | Income Shock Planner (PHK) | **Who:** Suddenly laid-off workers<br>**Why:** Immediate survival roadmap after job loss with cash runway calculator | • Severance pay calculator (based on years worked)<br>• Unemployment benefit checker (BPJS Ketenagakerjaan)<br>• Quick cash ideas generator (from jasa-harian-sampingan article)<br>• "Survive X months" countdown with spending cuts | 📋 | Directly supports survive-phk-mendadak, cari-kerja-kilat-phk |
| 0.9 | Quick Cash Ideas Generator | **Who:** People needing emergency income<br>**Why:** Recommend feasible side gigs based on skills and available time | • Skill matcher (select: driving, cooking, sales, kirim uang, etc.)<br>• Local opportunity scraper (nearby jastip, jasa, etc.)<br>• Risk rating (0–5) for each idea<br>• Time-to-first-rupiah estimator | 📋 | Pair with jual-barang-cepat, uang-darurat-skill |
| 0.10 | Bill Priority Sorter | **Who:** People with insufficient funds for all bills<br>**Why:** Sort bills by urgency and legal consequence to minimize damage | • Bill input (type, amount, due date, penalty)<br>• Urgency scoring (legal > survival > convenience)<br>• "Pay minimum" calculator for each bill<br>• Consequences warning (e.g., "Listrik diputus after 3 months") | 📋 | Support prioritaskan-utang, catat-utang-rapi |

**Tier 0 Tool Target:** 10 tools (0 complete, 10 planned)

---

## Tier 1: The Hustler Tools
**Target Audience:** Youth, fresh graduates, UMR workers  
**Purpose:** Extra income discovery, pricing, business setup, freelancer productivity

| # | Tool Name | Function (Who it helps & Why) | Required Features | Status | Notes |
|---|-----------|--------------------------------------|-------------------|--------|-------|
| 1.1 | Side Hustle ROI Calculator | **Who:** Students, youth deciding side gigs<br>**Why:** Compare hustle options by capital, time, and projected return | • Input capital, hours/week, expected revenue<br>• ROI % and break-even timeline<br>• Risk score (based on market demand, seasonality)<br>• "Top 3 picks" recommender | 📋 | Aligns with side-hustle-mahasiswa, bisnis-modal-1juta |
| 1.2 | Service Pricing Calculator | **Who:** Freelancers, local service providers<br>**Why:** Calculate fair pricing to avoid undercharging or overpricing | • Cost-plus pricing (materials + time + overhead)<br>• Market rate comparison (scrapes local competitor prices)<br>• Tax inclusion (PPh 21 estimator)<br>• "Am I undercharging?" warning | 📋 | Supports hitung-harga-jual, jasa-harian-sampingan |
| 1.3 | Lean Business Plan Generator | **Who:** Hustlers formalizing their idea<br>**Why:** Create a 1-page business plan (Lean Canvas) without MBA jargon | • Lean Canvas template (9 blocks)<br>• Auto-suggestion for "Unique Value Proposition"<br>• PDF export with professional formatting<br>• "Investor-ready" checklist | 📋 | Links to business-plan article |
| 1.4 | CV & Portfolio Builder | **Who:** Fresh graduates, job seekers<br>**Why:** Build ATS-friendly CV and portfolio site in < 30 minutes | • Template library (corporate, creative, freelance)<br>• Auto-fill from LinkedIn / manual entry<br>• ATS (Applicant Tracking System) checker<br>• 1-click PDF / Notion portfolio export | 📋 | Supports cv-portfolio-menarik, klien-pertama-freelance |
| 1.5 | Freelance Rate Calculator | **Who:** Freelancers (VA, writer, designer)<br>**Why:** Determine hourly/project rates that cover living costs + tax | • Cost-of-living input (city, housing, food, transport)<br>• Skill-based pricing tier (junior/mid/senior)<br>• Tax inclusion (PPh final 2.5% for freelancers)<br>• "Client budget vs your rate" comparator | 📋 | Connects to negosiasi-gaji, virtual-assistant-global |
| 1.6 | TikTok Shop / Shopify Setup Checklist | **Who:** Aspiring online sellers<br>**Why:** Step-by-step interactive checklist to launch store without missing critical steps | • Tier 1: Legal (NIB, NPWP, rekening)<br>• Tier 2: Platform setup (Shopify/TikTok Shop/Bukalapak)<br>• Tier 3: Payment gateway & logistics<br>• Video tutorial embeds from Duit.co.id YouTube | 📋 | Supports online-shop-nol, jastip-pemula |
| 1.7 | Local Service Quotation Generator | **Who:** Local service providers (cleaning, driller, groomer)<br>**Why:** Generate professional quotes that win clients and protect margins | • Material cost calculator with local price DB<br>• Margin setter (10%–50% slider)<br>• PDF & WhatsApp share with your brand logo<br>• "Competitor price" peek (anonymized) | 📋 | Serves jasa-rab-drafter, bisnis-deep-cleaning |
| 1.8 | Agribusiness Yield Calculator | **Who:** Rural hustlers (farmers, breeders)<br>**Why:** Evaluate crop/livestock profitability before investing time and money | • Input: land size, seed/livestock cost, feed, harvest cycle<br>• Market price scraper (local market rates)<br>• ROI & payback period<br>• Risk score (weather, disease, price drop) | 📋 | Supports budidaya-maggot, ternak-lele-bioflok, jastip-hasil-bumi |
| 1.9 | Export Readiness Checker | **Who:** SMEs wanting to sell abroad<br>**Why:** Assess if product is ready for export and identify missing certifications | • Market demand check (scrapes Alibaba/Amazon trends)<br>• Certification checklist (HACCP, SNI, halal, etc.)<br>• Logistics cost estimator (shipping, customs, tax)<br>• "Readiness score" with gap analysis | 📋 | Links to jasa-konsultan-ekspor, makelar-hasil-bumi |
| 1.10 | Legalitas Checker (PT, CV, UMKM) | **Who:** New business owners<br>**Why:** Recommend best legal entity and generate requirement checklist | • Entity type recommender (PT Perorangan vs CV vs PT)<br>• Requirement checklist (NIB, NPWP, domisili, etc.)<br>• Integration with OSS (Online Single Submission) portal links<br>• Cost estimator (notary fee, modal setor) | 📋 | Supports cara-buat-pt-perorangan, legalitas-haki |
| 1.11 | Freelancer KPI Tracker | **Who:** Full-time freelancers<br>**Why:** Track performance metrics and improve client retention | • Goal setting (revenue, clients, hours)<br>• Time tracking (integrated or manual entry)<br>• Invoice generator with payment status<br>• "Client health" dashboard (on-time %, revision count) | 📋 | Connects to performance-management, delegation-framework |
| 1.12 | Invoice Generator (WhatsApp-Ready) | **Who:** Freelancers & small vendors<br>**Why:** Create professional invoices that get paid faster | • Auto-numbering & tax calculation (PPh 23/4)<br>• WhatsApp & email send with payment link<br>• Payment status tracker (unpaid / partial / paid)<br>• Overdue alert with polite reminder templates | 📋 | Integrates with virtual-bookkeeper, pajak-freelancer |

**Tier 1 Tool Target:** 12 tools (0 complete, 12 planned)

---

## Tier 2: The Scaler Tools
**Target Audience:** Managers, professionals, small business owners  
**Purpose:** Scaling decisions, financial control, team management, investment allocation

| # | Tool Name | Function (Who it helps & Why) | Required Features | Status | Notes |
|---|-----------|--------------------------------------|-------------------|--------|-------|
| 2.1 | Business Scaling Readiness Assessment | **Who:** SME owners considering expansion<br>**Why:** Scorecard to decide if business is ready to scale, avoiding premature scaling death | • 6-dimension scorecard (finance, ops, legal, market, team, tech)<br>• Gap analysis with prioritized action plan<br>• "Ready / Nearly / Not yet" verdict with next steps<br>• Benchmark against similar businesses | 📋 | Aligns with scale-up-umkm, growth-hacking |
| 2.2 | Cash Flow Forecast Tool (12-Month) | **Who:** Business owners managing liquidity<br>**Why:** Project cash flow to prevent surprise shortfalls and plan investments | • Scenario planning (optimistic / realistic / pessimistic)<br>• Seasonal adjustment (for agri, retail, etc.)<br>• Alert system (low balance warning 30 days out)<br>• "What-if" simulator (delayed payment, sudden expense) | 📋 | Supports cash-flow-umkm, working-capital |
| 2.3 | SOP Template Generator | **Who:** Businesses systematizing operations<br>**Why:** Create standard operating procedures without hiring a consultant | • Template library by industry (retail, F&B, service, agri)<br>• Drag-drop editor with sections & approval flow<br>• Version control & change log<br>• Video / checklist embed support | 📋 | Links to sop-bisnis-efektif, sop-video-checklist |
| 2.4 | Unit Economics Calculator (LTV:CAC) | **Who:** Subscription/business with repeat customers<br>**Why:** Calculate key metrics to optimize marketing spend and pricing | • LTV (Lifetime Value) calculator: avg order value × frequency × lifespan<br>• CAC (Customer Acquisition Cost) tracker: marketing spend ÷ new customers<br>• LTV:CAC ratio indicator (benchmark: >3x = healthy)<br>• Payback period calculator | 📋 | Supports unit-economics-ltv-cac, viral-coefficient |
| 2.5 | Marketing ROI Calculator | **Who:** Marketers optimizing ad spend<br>**Why:** Measure campaign effectiveness across multiple channels | • Multi-channel tracking (FB, TikTok, Google, offline)<br>• Attribution modeling (first-touch / last-touch / multi-touch)<br>• Break-even analyzer (ad spend vs revenue)<br>• "Kill or Scale" recommendation engine | 📋 | Aligns with roi-digital-marketing, optimalisasi-cac |
| 2.6 | Vendor Management Scorecard | **Who:** Businesses with multiple suppliers<br>**Why:** Evaluate and manage suppliers to reduce risk and improve terms | • Vendor scorecard (quality, price, delivery, communication)<br>• Contract template library (MOU, NDA, SLA)<br>• Performance tracker with trend visualization<br>• "Switch supplier" cost/benefit analyzer | 📋 | Supports vendor-management, partnership-strategic |
| 2.7 | Employee Onboarding Checklist | **Who:** Businesses hiring first employees<br>**Why:** Streamline new hire process to reduce turnover and improve productivity | • Interactive checklist (legal docs, tools access, team intro)<br>• Document upload (contract, ID, NPWP, BPJS)<br>• Task automation (auto-create email, Slack, Trello)<br>• "Day 1 / Week 1 / Month 1" timeline | 📋 | Connects to rekrutmen-tim-pertama, employee-onboarding |
| 2.8 | Performance Bonus Calculator | **Who:** Business owners designing incentives<br>**Why:** Design fair bonus schemes that motivate without breaking the bank | • KPI input (sales, CSAT, attendance, etc.)<br>• Bonus formula designer (tiered %, flat, profit share)<br>• Tax estimator (PPh 21 on bonuses)<br>• "Total cost" preview before committing | 📋 | Links to manajemen-kompensasi-tim, performance-bonus |
| 2.9 | Business Valuation Tool (3 Methods) | **Who:** Owners preparing for exit or investment<br>**Why:** Estimate business worth using DCF, comparables, and asset-based | • DCF (Discounted Cash Flow) with growth rate inputs<br>• Comparable method (price/revenue multiples from similar biz)<br>• Asset-based (book value + intangible assets)<br>• Sensitivity analysis (best/worst case) | 📋 | Supports nilai-bisnis-exit, exit-strategy-bisnis |
| 2.10 | Franchise Feasibility Calculator | **Who:** Entrepreneurs evaluating franchise opportunities<br>**Why:** Compare total investment vs projected returns and break-even timeline | • Initial investment (franchise fee, setup, working capital)<br>• Royalty fee analyzer (monthly % vs fixed)<br>• Break-even timeline (months to recover investment)<br>• Side-by-side comparison for multiple franchises | 📋 | Aligns with pilih-franchise, franchise-dari-nol |
| 2.11 | Tax Obligation Estimator (UMKM) | **Who:** Business owners staying compliant<br>**Why:** Calculate monthly/annual tax obligations under PPh Final 0.5% or regular PPh | • PPh Final 0.5% calculator (revenue × 0.5%)<br>• Input revenue & expense for net income method<br>• Deadline reminder (monthly SPT Masa, annual SPT Tahunan)<br>• Coretax update compatibility | 📋 | Critical for pajak-freelancer, panduan-pajak-umkm |
| 2.12 | Investment Portfolio Analyzer (Business Surplus) | **Who:** Business owners with idle cash<br>**Why:** Allocate surplus to investments (reksa dana, deposits, bonds) for growth | • Risk profiler (conservative / moderate / aggressive)<br>• Asset allocation recommender (cash %, bond %, equity %)<br>• Projected returns with inflation adjustment<br>• "Withdraw timeline" planner for business needs | 📋 | Links to reksa-dana-pemula, dividen-investing |

**Tier 2 Tool Target:** 12 tools (0 complete, 12 planned)

---

## Tier 3: Asset Builder Tools
**Target Audience:** Successful entrepreneurs, high-level executives  
**Purpose:** Property investing, franchise management, portfolio optimization, exit planning

| # | Tool Name | Function (Who it helps & Why) | Required Features | Status | Notes |
|---|-----------|--------------------------------------|-------------------|--------|-------|
| 3.1 | Property ROI Calculator (Yield, Cap Rate) | **Who:** Property investors evaluating rentals<br>**Why:** Calculate rental yield, cap rate, and cash-on-cash return to compare properties | • Input: purchase price, down payment, rental income, expenses (maintenance, tax, mgmt fee)<br>• Yield types: gross yield, net yield, cap rate, cash-on-cash<br>• Compare multiple properties side-by-side<br>• "Cash flow positive?" indicator | 📋 | Supports investasi-properti, roi-properti-sewaan |
| 3.2 | Franchise Comparison Dashboard | **Who:** Investors comparing franchise opportunities<br>**Why:** Side-by-side comparison of franchise terms, fees, and profitability | • Input: franchise fee, royalty %, marketing fee, initial setup cost<br>• Break-even calculator (months to recover investment)<br>• Risk score (brand strength, industry trend, location dependency)<br>• "Top pick" recommender | 📋 | Aligns with pilih-franchise, multi-unit-franchising |
| 3.3 | Due Diligence Checklist (Property & Franchise) | **Who:** Investors avoiding bad deals<br>**Why:** Interactive checklist covering legal, financial, and operational risks | • Property section: legal docs (SHM, HGB, PPJB), structural, neighborhood<br>• Franchise section: FDD review, existing franchisee interviews, location analysis<br>• Risk scoring with red-flag alerts<br>• Document upload & version tracking | 📋 | Critical for due-diligence, cek-kontrak-franchise |
| 3.4 | Asset Allocation Visualizer (Portfolio) | **Who:** Investors optimizing asset mix<br>**Why:** Visualize and rebalance portfolio across stocks, bonds, reksa, property | • Pie chart with drift alerts<br>• Risk-return scatter plot (expected return vs volatility)<br>• Rebalancing suggester (buy/sell amounts)<br>• Inflation-adjusted projection (10-year view) | 📋 | Supports diversifikasi-portofolio, asset-allocation |
| 3.5 | Exit Strategy & Valuation Planner | **Who:** Business owners planning exit<br>**Why:** Plan exit roadmap to maximize value and minimize tax | • Exit option comparison (trade sale, IPO, management buyout, liquidation)<br>• Timeline planner (1–5 years with milestones)<br>• Tax impact analyzer (capital gains, goodwill)<br>• "Valuation booster" checklist | 📋 | Links to exit-strategy-bisnis, nilai-bisnis-exit |
| 3.6 | Family Office Setup Checklist | **Who:** UHNW families formalizing wealth management<br>**Why:** Guide to establishing family office with jurisdiction and cost clarity | • Jurisdiction comparison (Indonesia onshore vs Singapore vs Cayman)<br>• Cost estimator (setup, annual mgmt, staff)<br>• Governance template (investment committee, reporting lines)<br>• "Do I need one?" qualifier quiz | 📋 | Supports family-office, setup-family-office |
| 3.7 | Joint Venture (JV) Structuring Tool | **Who:** Families collaborating on property investments<br>**Why:** Design JV agreements with fair ownership and profit-sharing | • Ownership split calculator (cash % vs asset contribution)<br>• Profit-sharing modeler (per-project vs ongoing %)<br>• Legal clause library (exit, dispute resolution, dilution)<br>• "What-if" simulator (one partner wants out) | 📋 | Aligns with joint-venture-properti |
| 3.8 | Property Legal Document Tracker | **Who:** Property buyers ensuring compliance<br>**Why:** Track required documents and deadlines to avoid legal issues | • Checklist by property type (land, house, apartment, commercial)<br>• Document upload with expiration alerts (HGB renewal, etc.)<br>• "Missing docs" warning with consequence explanation<br>• Notary locator integration | 📋 | Supports legal-bisnis-properti, ppjb-ajb-hgb |
| 3.9 | Succession Planning Template | **Who:** Business owners transferring to next generation<br>**Why:** Plan wealth and leadership transfer to avoid family conflict | • Family tree mapper with asset inventory<br>• Will / hibah / wasiat template generator<br>• Tax implication estimator (inheritance tax, PPh)<br>• "Fairness score" to prevent sibling disputes | 📋 | Links to suksesi-aset-ke-anak, estate-planning |
| 3.10 | REITs vs Physical Property Comparator | **Who:** Investors choosing investment vehicle<br>**Why:** Compare liquidity, returns, and hassle between REITs and direct property | • Liquidity comparison (same-day vs months to sell)<br>• Return projection (dividend yield vs rental yield + appreciation)<br>• Tax impact (REITs tax vs property tax + capital gains)<br>• "Hassle factor" score (management time required) | 📋 | Supports reits-vs-properti |

**Tier 3 Tool Target:** 10 tools (0 complete, 10 planned)

---

## Tier 4: Legacy Maker Tools
**Target Audience:** Ultra-High Net Worth Individuals (UHNWI)  
**Purpose:** Corporate structuring, tax optimization, wealth protection, succession planning

| # | Tool Name | Function (Who it helps & Why) | Required Features | Status | Notes |
|---|-----------|--------------------------------------|-------------------|--------|-------|
| 4.1 | Holding Company Structure Builder | **Who:** UHNW individuals optimizing corporate setup<br>**Why:** Design holding and subsidiary structure to protect assets and optimize tax | • Jurisdiction comparison (Indonesia, Singapore, BVI, Cayman)<br>• Entity relationship diagram (drag-drop subsidiaries)<br>• Tax impact analyzer (corporate tax, dividend withholding, branch profit tax)<br>• "Compliance score" by jurisdiction | 📋 | Supports holding-company, spv-subholding-ring-fencing |
| 4.2 | Trust vs Wayasan Comparison Tool | **Who:** Families choosing wealth transfer vehicle<br>**Why:** Compare cost, control, and tax treatment of trust vs yayasan | • Cost comparison (setup, annual mgmt, termination)<br>• Control level (grantor retained powers, protector role)<br>• Tax treatment (income tax, gift tax, inheritance implications)<br>• "Best fit" recommender based on goals | 📋 | Aligns with trust-vs-yayasan |
| 4.3 | Estate Planning Document Generator | **Who:** Families formalizing inheritance<br>**Why:** Generate wills, hibah, and wasiat with legal precision | • Guided interview (assets, heirs, specific bequests)<br>• Document template (Indonesian law compliant)<br>• Notary locator with rating & fee comparison<br>• "Vulnerable heirs" protection clause inserter | 📋 | Supports wasiat-hibah-asuransi-jiwa, suksesi-bisnis |
| 4.4 | Tax Optimization Simulator (UHNW) | **Who:** UHNW individuals minimizing tax legally<br>**Why:** Model tax strategies across jurisdictions and entity types | • Scenario comparison (stay Indonesian tax resident vs relocate)<br>• Treaty benefit analyzer (avoid double taxation)<br>• Net worth projection with/without optimization<br>• "Audit risk" score for each strategy | 📋 | Links to tax-optimization, tax-residency-pajak-berganda |
| 4.5 | Family Constitution Template | **Who:** Families creating governance rules<br>**Why:** Prevent conflict with clear rules on decision-making and distributions | • Clause library (voting thresholds, dividend policy, employment of family members)<br>• Dispute resolution designer (mediation, arbitration, court)<br>• Amendment process (unanimous vs majority)<br>• "Conflict risk" assessor | 📋 | Supports family-constitution |
| 4.6 | Investment Policy Statement Generator | **Who:** Family offices formalizing investment discipline<br>**Why:** Create IPS document with risk tolerance, asset allocation, and review schedule | • Risk tolerance assessment (conservative / balanced / aggressive)<br>• Asset allocation policy (min/max per class)<br>• Performance benchmark selector (index comparison)<br>• Review schedule (quarterly / annual) with automated reminders | 📋 | Aligns with investment-policy-statement |
| 4.7 | Crisis Playbook Template | **Who:** Families ensuring continuity during owner incapacity<br>**Why:** Prepare for sudden death, disability, or scandal with clear protocols | • Role assignment (who decides what when owner is unavailable)<br>• Communication plan (family, staff, media, regulators)<br>• Document vault (store passwords, deeds, insurance, etc.)<br>• "Trigger event" checklist (death, coma, criminal charge) | 📋 | Supports crisis-playbook-pemilik-tak-cakap |
| 4.8 | Cross-Border Asset Reporting Checklist | **Who:** UHNW with multi-jurisdiction assets<br>**Why:** Ensure compliance with reporting obligations to avoid penalties | • Jurisdiction checklist (Indonesia, Singapore, US, etc.)<br>• Form deadline tracker (FATCA, CRS, local tax returns)<br>• Penalty estimator (late filing, non-disclosure)<br>• "Compliance score" with gap alerts | 📋 | Links to aset-lintas-negara, tax-residency-pajak-berganda |
| 4.9 | Philanthropy Impact Tracker | **Who:** Families managing charitable giving<br>**Why:** Measure and optimize the impact of donations across causes | • Goal setting (education, health, religion, environment)<br>• Donation tracker (amount, vehicle, tax deduction)<br>• Impact metric calculator (lives touched, scholarships granted, etc.)<br>• "Best bang for buck" cause recommender | 📋 | Supports philanthropy, tata-kelola-filantropi-keluarga |
| 4.10 | Asset Protection Structuring Tool (SPV, Ring-Fencing) | **Who:** UHNW protecting assets from claims<br>**Why:** Choose best vehicle to insulate assets from business or personal liabilities | • Risk assessment (creditor claims, divorce, lawsuits)<br>• Vehicle comparison (SPV, trust, pre-nup, holding company)<br>• Jurisdiction analysis (Indonesia vs offshore)<br>• "Protection score" with stress-test simulator | 📋 | Aligns with spv-subholding-ring-fencing, perjanjian-pra-nikah-proteksi-aset |

**Tier 4 Tool Target:** 10 tools (0 complete, 10 planned)

---

## Summary Statistics

| Tier | Target Tools | Built | % Complete |
|------|--------------|------|------------|
| Tier 0: Survival | 10 | 0 | 0% |
| Tier 1: Hustler | 12 | 0 | 0% |
| Tier 2: Scaler | 12 | 0 | 0% |
| Tier 3: Asset Builder | 10 | 0 | 0% |
| Tier 4: Legacy | 10 | 0 | 0% |
| **TOTAL** | **54** | **0** | **0%** |

---

## Implementation Priority (Suggested Order)

1. **Tier 0 High-Impact:** Pinjol Legality Checker, Debt Repayment Planner, Emergency Fund Calculator
2. **Tier 1 Revenue-Drivers:** Side Hustle ROI Calculator, Service Pricing Calculator, Invoice Generator
3. **Tier 2 Business-Critical:** Cash Flow Forecast, SOP Generator, Tax Estimator
4. **Tier 3 Investment-Tools:** Property ROI Calculator, Due Diligence Checklist
5. **Tier 4 Complex-Structuring:** Holding Company Builder, Estate Planning Generator

---

## Technical Notes

- **Frontend:** React + TypeScript + Tailwind CSS (matches Duit.co.id stack)
- **Backend:** Cloudflare Workers + Hono (edge computing, fast global response)
- **Data:** Cloudflare D1 for user saves, KV for cached calculations
- **PDF Generation:** jspdf or react-pdf (for exportable reports)
- **Auth:** Clerk or Kinde (optional, for saving calculations across devices)
- **YouTube Integration:** Every tool should have a companion explainer video (add `youtube_url` to tool frontmatter when ready)
- **Mobile-First:** All tools must be usable on 375px width (most Tier 0/1 users are mobile-only)
