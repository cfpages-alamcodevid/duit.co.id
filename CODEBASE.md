# Duit.co.id — Codebase Reference

> **Status snapshot.** File ini adalah referensi hidup atas semua kode di repository.
> Setiap perubahan kode **wajib** memperbarui dokumen ini (lihat bagian § 19).
>
> Dipakai untuk:
> - onboarding engineer baru,
> - audit sebelum membuat fitur / memindahkan logic,
> - memastikan kita tidak salah arah saat refactor.

---

## 0. Cara Membaca Dokumen Ini

- **Tanda `[L]`** = file berisi logic / fungsi (bukan sekadar markup).
- **Tanda `[M]`** = module / data / konfigurasi (referensi data).
- **Tanda `[V]`** = view / halaman (UI saja).
- **Tanda `[S]`** = script build / maintenance.
- **Tanda `[F]`** = Cloudflare Pages Function (edge runtime).
- **Tanda `[T]`** = type declaration / shim.

Bagian "Dependency" menjelaskan **siapa yang import siapa**, bukan sekadar dependensi npm.
Sebelum menambah fungsi baru, cari dulu di sini apakah logic serupa sudah ada.

---

## 1. Project Snapshot

| Aspek | Nilai |
|---|---|
| Domain | `duit.co.id` — ekosistem finansial Indonesia (edukasi + tools + akademi + ahli) |
| Framework | **Next.js 15 App Router** + React 18 + TypeScript 5 (strict) |
| Bundler | **Next.js only** (Vite sudah dihapus total) |
| Output | Static export (`output: "export"`, `trailingSlash: true`, `images.unoptimized: true`) |
| Styling | TailwindCSS 3 + `class-variance-authority` + `@tailwindcss/typography` |
| Animasi | `framer-motion` |
| Auth | `@clerk/react` + `@clerk/react/legacy`, dibungkus via `DuitClerkProvider` (safe wrappers: `useUser`, `useAuth`, `useSignIn`, `useSignUp`) |
| Payment | Duitku v2 (`/webapi/api/merchant`) via Cloudflare Pages Functions |
| DB | Cloudflare D1 (SQLite) |
| Object storage | Cloudflare R2 (`QUIZ_DATA_BUCKET` / `MEDIA_DATA_BUCKET`) untuk payload kuis |
| Markdown | `react-markdown` + `remark-gfm` + `{youtube}…{/youtube}` shortcode parser |
| Markdown konten (artikel) | `artikel/{tier}/{slug}.md` — **body-only, no frontmatter**. Metadata seluruhnya di JSON sidecar. |
| Markdown konten (extras) | `extra/{tier}/{slug}-extra.md` — body + YAML frontmatter. |
| Search index | `public/search-index.json` (di-load client-side dari `src/utils/content.ts`) |
| Versioning | `src/version.ts` (`VERSION`, `BUILD_DATE`); `npm run version:bump` |
| Build pipeline | `npm run prebuild` → `generate-article-content.mjs` → `generate-extra-content.mjs` → `next build` (output `out/`) |
| Total artikel | **906** (di `artikel/{tier}/*.md`) |

### Entry points
- **Next.js / App Router (sole entry):** `src/app/layout.tsx` (root layout), `src/app/page.tsx` (home).
- **Vite SPA: SUDAH DIHAPUS.** Tidak ada `index.html`, `src/main.tsx`, atau `src/App.tsx`. Tidak ada `react-router-dom`.

### Build artifact map

```
src/ (TS) + artikel/ (MD body) + JSON/ (metadata)
   ↓  prebuild scripts
public/search-index.json  ←── src/utils/content.ts (client)
public/article-content/{slug}.json  ←── getArticleContentBySlug()
public/extra-index.json
public/extra-content/{slug}.json  ←── src/utils/extras.ts
   ↓
next build → out/ (static export, trailingSlash, images.unoptimized)
   ↓
Cloudflare Pages: serve out/ + run functions/
   ↓
D1 (users, orders, course_enrollments, user_events, user_tier_events)
R2 (user-assessments/{clerkId}/{ts}-{uuid}.json)
Duitku v2 (payment gateway)
```

---

## 2. Directory Tree (Kode Aktif)

```
duit.co.id/
├── artikel/                          # Markdown body artikel (5 tier, 906 files)
│   ├── tier-0-survival/
│   ├── tier-1-hustler/
│   ├── tier-2-scaler/
│   ├── tier-3-asset-builder/
│   └── tier-4-legacy/
├── docs/                             # Catalogs, spec, PRD (lihat § 13)
│   ├── prd/                          # 5 PRD documents
│   └── sql/                          # D1 migrations
├── extra/                            # (planned) Frontmatter markdown for extras
├── JSON/                             # Sidecar metadata — SATU-SATUNYA sumber metadata
│   ├── article-access.json
│   ├── article-audit.json
│   ├── article-dates.json
│   ├── article-dscore.json
│   ├── article-frontmatter-archive.json   # arsip lama, read-only
│   ├── article-media.json
│   ├── article-seo.json
│   ├── article-tags.json
│   └── article-taxonomy.json
├── functions/                        # Cloudflare Pages Functions
│   ├── _auth.js                      # [F] Clerk JWT verify
│   ├── _duitku.js                    # [F] Duitku helpers, md5, sha256
│   ├── _user.js                      # [F] D1 user sync, tier helpers
│   └── api/
│       ├── profile.js                # [F] GET/POST /api/profile
│       ├── tier.js                   # [F] POST /api/tier
│       ├── duitku/
│       │   ├── callback.js           # [F] POST /api/duitku/callback
│       │   ├── create-transaction.js # [F] POST /api/duitku/create-transaction
│       │   └── payment-methods.js    # [F] GET  /api/duitku/payment-methods
│       └── orders/
│           └── pending.js            # [F] GET  /api/orders/pending
├── public/                           # Generated static assets
│   ├── article-content/              # Generated per-article body JSON
│   ├── extra-content/                # (kosong sampai extra/ dipopulate)
│   ├── extra-index.json
│   ├── search-index.json             # Article metadata index
│   ├── favicon.ico / favicon.svg
├── scripts/                          # Node maintenance / build scripts (lihat § 9)
│   ├── bump-version.mjs              # [S] Bump src/version.ts
│   ├── fix-internal-links.ps1        # [S] Rewrite /artikel/tier-X/ → /artikel/
│   ├── generate-article-content.mjs  # [S] Main build pipeline for articles
│   ├── generate-extra-catalog.mjs    # [S] docs/EXTRA_CATALOG.md generator
│   ├── generate-extra-content.mjs    # [S] Build extras → public/extra-content/
│   └── strip-smk-from-slugs.ps1      # [S] Rename -smk slugs in bulk
├── src/                              # Frontend source (lihat § 4-7)
│   ├── app/                          # Next.js App Router
│   ├── components/                   # semua UI + page components
│   │   ├── academy/                  # AcademyIndexPage, AcademyCoursePage, AcademyMetricCard
│   │   ├── article/                  # ArticlePage, KnowledgeHub
│   │   ├── auth/                     # AuthNav, DuitClerkProvider, LoginRegisterClient
│   │   ├── checkout/                 # CourseCheckoutClient, CoursePurchaseModal
│   │   ├── dashboard/                # DashboardPage
│   │   ├── experts/                  # ExpertsPage
│   │   ├── extra/                    # ExtraDownloadButton
│   │   ├── home/                     # HomePage, TierQuiz
│   │   ├── knowledge-detail/         # KnowledgeDetailPage
│   │   ├── law/                      # LawLibraryPage
│   │   ├── profile/                  # ProfileClient
│   │   ├── quiz/                     # QuizPage
│   │   ├── shared/                   # AppShell, ClientProviders, Footer, Navbar
│   │   ├── tools/                    # ToolsIndexPage, ToolCard, ToolDetailClient
│   │   └── ui/                       # Primitives (GlassCard, Badge, Buttons, dll)
│   ├── data/                         # academyCourses, toolsCatalog, duitkuCommerceMock
│   ├── hooks/                        # useTheme
│   ├── lib/                          # utils, clerkAppearance
│   ├── types/                        # markdown.d.ts
│   ├── utils/                        # content, extras
│   ├── index.css                     # Tailwind + design tokens
│   └── version.ts                    # VERSION + BUILD_DATE
├── research/                         # Per-article research notes
├── .codex/AGENTS.md                  # Canonical project prompt
├── AGENTS.md                         # Provider handoff
├── CHANGELOG.md                      # Timestamped change log
├── Duit.co.id.md                     # Free-form project notes
├── PROGRESS.md / SESSION_SUMMARY.md  # Ad-hoc working notes
├── SUBAGENT_CREATION.md              # Subagent catalog
├── TECHSTACK.md                      # Stack decision rationale
├── next.config.mjs                   # Static export only (no react-router alias anymore)
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── next-env.d.ts
└── (Vite artifacts SUDAH DIHAPUS: index.html, vite.config.ts, vite-content-plugin.ts, vite-check.ts, tsconfig.node.json, tsconfig.check.json)
```

---

## 3. Root Configuration

| File | Type | Logic / Isi |
|---|---|---|
| `package.json` | [M] | Scripts: `prebuild` (generate-article + generate-extra), `dev` (`next dev`), `build` (`next build`), `lint` (eslint, `--max-warnings 0`), `preview` (`next start`), `schedule:publish` (deprecated), `version:bump` (passthrough ke `bump-version.mjs`). Deps kunci: `@clerk/react`, `@radix-ui/react-slot`, `next`, `react`, `react-helmet-async`, `react-markdown`, `remark-gfm`, `framer-motion`, `lucide-react`, `recharts`, `gray-matter`, `tailwind-merge`, `clsx`, `class-variance-authority`, `@tailwindcss/typography`, `tailwindcss-animate`. DevDeps: `typescript`, `tailwindcss`, `autoprefixer`, `eslint`, `eslint-config-next`, `@types/*`, `@typescript-eslint/*`. **TIDAK ADA** `vite`, `react-router-dom`, `@vitejs/plugin-react`. |
| `next.config.mjs` | [M] | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. **Tidak ada** webpack alias untuk `react-router-dom` (sudah dihapus). |
| `tsconfig.json` | [M] | `target: ESNext`, `strict: true`, `jsx: preserve`, path alias `@/* → ./src/*`, includes `src` + `next-env.d.ts`. Excludes `scripts/**/*` dan `vite-*.ts`. |
| `tailwind.config.js` | [M] | Content glob: hanya `./src/**/*.{ts,tsx}`. Custom colors: `money-green` (#004D40), `aureum-gold` (#D4AF37), `heading-light/dark`, `body-light/dark`, `tier-survival/hustler/scaler/asset/legacy`. Plugins: `tailwindcss-animate`, `@tailwindcss/typography`. |
| `postcss.config.js` | [M] | `tailwindcss` + `autoprefixer`. |
| `next-env.d.ts` | [T] | Next.js auto-generated types. **Jangan diedit manual.** |
| `.gitignore` | [M] | Standar Next + Node + `out/`, `dist/`, `.next/`, `tsconfig.tsbuildinfo`, `stitch/`, `*.tsbuildinfo`, `aider*` cache, `temp_*.py`. |

---

## 4. `src/` — Entry, App Router, Component Tree

### 4.1 Entry & global files
| File | Type | Logic |
|---|---|---|
| `src/index.css` | [L] | Tailwind directives + aggressive reset + dark mode (linear gradient) + design tokens (`--background`, `--foreground`, dll) + utility classes (`.glass`, `.glass-strong`, `.bg-money-aurum`, `.gold-button`, `markdown-body`). 505 baris. |
| `src/version.ts` | [M] | `export const VERSION = "1.0.1" as const; export const BUILD_DATE = "2026-04-20" as const`. Di-import oleh `Footer`. Update via `npm run version:bump`. |

### 4.2 `src/app/` — App Router pages
Semua page di sini adalah thin wrapper yang me-mount client component dari `src/components/`. Setiap page yang punya `[slug]` diimplementasikan via `generateStaticParams` + `generateMetadata` untuk SSG.

| Path | File | Type | Logic / Component yang dimount |
|---|---|---|---|
| `/` | `src/app/page.tsx` | [V] | `<HomePage>` (components/home). |
| `/about` | `src/app/about/page.tsx` | [V] | Static copy tentang Duit.co.id. |
| `/academy` | `src/app/academy/page.tsx` | [V] | `<AcademyIndexPage>`. |
| `/akademi` | `src/app/akademi/page.tsx` | [V] | Alias Indonesia dari `/academy`. |
| `/akademi/[slug]` | `src/app/akademi/[slug]/page.tsx` | [V] | `generateStaticParams` dari `academyCourses`; `generateMetadata` judul + harga; render `<AcademyCoursePage>`. |
| `/ahli` | `src/app/ahli/page.tsx` | [V] | `<ExpertsPage>` (components/experts). |
| `/artikel` | `src/app/artikel/page.tsx` | [V] | `<KnowledgeHub>` (components/article). |
| `/artikel/[slug]` | `src/app/artikel/[slug]/page.tsx` + `ArticleDynamicRoute.tsx` | [V] | `generateStaticParams` membaca `artikel/` via `fs` (server-side). `ArticleDynamicRoute` (client) mendeteksi: jika `slug` adalah nama tier → render `<KnowledgeHub initialTier={slug}>`; jika bukan → render `<ArticlePage>`. |
| `/ceklist` & `/ceklist/[slug]` | `src/app/ceklist/page.tsx` + `[slug]/page.tsx` | [V] | Index: `<ToolsIndexPage type="ceklist">` + `buildToolsMetadata("ceklist")`. Detail: `<ToolDetailClient tool={...}>`. |
| `/checkout/[slug]` | `src/app/checkout/[slug]/page.tsx` | [V] | `CHECKOUT_COURSE_SLUGS = ["blueprint-bebas-utang"]` (whitelist). Lainnya → `notFound()`. Render `<CourseCheckoutClient>`. |
| `/checkout/return` | `src/app/checkout/return/page.tsx` | [V] | Halaman statis "pembayaran sedang diproses" + link kembali ke `/akademi`. |
| `/dashboard` | `src/app/dashboard/page.tsx` | [V] | `<DashboardPage>` (components/dashboard). |
| `/debug/clerk` | `src/app/debug/clerk/page.tsx` | [V] | **Server component** yang membaca `process.env.*` untuk cek konfigurasi Clerk. |
| `/direktori` & `/direktori/[slug]` | `src/app/direktori/page.tsx` + `[slug]/page.tsx` | [V] | `type="direktori"`. |
| `/disclaimer`, `/privacy`, `/terms` | `src/app/{disclaimer,privacy,terms}/page.tsx` | [V] | Halaman statis paragraf disclaimer. |
| `/experts` | `src/app/experts/page.tsx` | [V] | `<ExpertsPage>`. |
| `/hukum`, `/law` | `src/app/hukum/page.tsx`, `src/app/law/page.tsx` | [V] | `<LawLibraryPage>` (components/law). |
| `/kalkulator`, `/kalkulator/[slug]` | `src/app/kalkulator/page.tsx` + `[slug]/page.tsx` | [V] | `type="kalkulator"`. |
| `/knowledge-detail` | `src/app/knowledge-detail/page.tsx` | [V] | `<KnowledgeDetailPage>` (components/knowledge-detail). |
| `/login` | `src/app/login/page.tsx` | [V] | `<LoginRegisterClient initialTab="login">`. |
| `/login/sso-callback` | `src/app/login/sso-callback/page.tsx` | [V] | **Client component**. Lazy-load `HandleSSOCallback` dari `@clerk/react` saat `isClerkPublishableKeyConfigured()`. Show "Login belum tersedia" kalau Clerk belum diset. |
| `/profile` | `src/app/profile/page.tsx` | [V] | `<ProfileClient>`. |
| `/profil` | `src/app/profil/page.tsx` | [V] | `<ProfileClient>` (sama). |
| `/quiz` | `src/app/quiz/page.tsx` | [V] | `<QuizPage>` (components/quiz) — 9-step classic quiz. |
| `/register` | `src/app/register/page.tsx` | [V] | `<LoginRegisterClient initialTab="register">`. |
| `/resources` & `/resources/[slug]` | `src/app/resources/page.tsx` + `[slug]/page.tsx` | [V] | `type="resources"`. |
| `/template` & `/template/[slug]` | `src/app/template/page.tsx` + `[slug]/page.tsx` | [V] | `type="template"`. |
| `/tools` | `src/app/tools/page.tsx` | [V] | `<ToolsIndexPage>` (no type filter, all). |
| `src/app/layout.tsx` | [L] | **Root layout.** `<html lang="id" suppressHydrationWarning>`, default SEO metadata, bungkus `<ClientProviders><AppShell>{children}</AppShell></ClientProviders>`. |

> **Pattern:** Semua page yang me-mount component dari `src/components/` TIDAK berisi logic; mereka cuma thin shell. Tambahan logic hanya untuk `generateStaticParams` dan `generateMetadata`.

---

## 5. `src/components/` — Reusable Components

### 5.1 `src/components/shared/`
| File | Type | Logic |
|---|---|---|
| `ClientProviders.tsx` | [L] | Wrapper: `<HelmetProvider><DuitClerkProvider>{children}</DuitClerkProvider></HelmetProvider>`. (HelmetProvider saat ini no-op karena tidak ada lagi komponen yang pakai `<Helmet>`; dipertahankan untuk fleksibilitas.) |
| `AppShell.tsx` | [V] | Layout shell. Decorative orbs (money-green, aureum-gold) + glass wrapper. Mounts `<Navbar>` + `<main>{children}</main>` + `<Footer>`. |
| `Navbar.tsx` | [V] | Sticky nav. **Pakai `next/link` (bukan `react-router-dom`).** Logo, 5 mega menus, `ThemeToggle`, `AuthNav`, mobile hamburger. |
| `Footer.tsx` | [V] | 4-column footer: Ecosystem / Solutions / Sovereignty / social. **Pakai `next/link`.** Import `VERSION` + `BUILD_DATE` dari `@/version`. |

### 5.2 `src/components/ui/` — Primitives
| File | Type | Logic |
|---|---|---|
| `ArticleCard.tsx` | [V] | Article preview card. **Pakai `next/link`.** |
| `GlassCard.tsx` | [V] | Generic `glass-card rounded-[24px] p-6 sm:p-8` wrapper. |
| `GoldShineButton.tsx` | [V] | Button dengan cursor-following shine effect (Framer Motion). |
| `GreenButton.tsx` | [V] | Money-green primary button dengan gradient + Framer hover/tap scale. |
| `badge.tsx` | [L] | CVA variants: `default`, `secondary`, `destructive`, `outline`, `money-green`, `aureum-gold`, `tier`. |
| `input.tsx` | [V] | Glass-styled `<input>` dengan `forwardRef`. |
| `InstantTooltip.tsx` | [V] | Portal tooltip on hover/focus. |
| `MarkdownRenderer.tsx` | [L] | **Penting.** Wrapper `react-markdown` + `remark-gfm`. Mendukung `{youtube}URL{/youtube}` shortcode. 40+ Tailwind prose classNames. |
| `MegaMenu.tsx` | [L] | 5 pre-configured menus: `KnowledgeMegaMenu`, `ToolsMegaMenu`, `AcademyMegaMenu`, `HukumMegaMenu`, `AhliMegaMenu`. **Pakai `next/link`.** |
| `TableOfContents.tsx` | [L] | Auto-extract `h2/h3/h4` dari content, IntersectionObserver scroll-spy, smooth scroll. |
| `ThemeToggle.tsx` | [V] | Light/dark toggle. |
| `TierBadge.tsx` | [V] | Tier chip dengan color map (survival=red, hustler=orange, scaler=blue, asset_builder=emerald, legacy=aureum-gold). |
| `YouTubeEmbed.tsx` | [L] | Parse YouTube URL → embed iframe. Subscribe overlay default aktif. |

### 5.3 `src/components/auth/`
| File | Type | Logic |
|---|---|---|
| `DuitClerkProvider.tsx` | [L] | **Penting.** Wrap `<ClerkProvider>` conditional. Exports: `isClerkPublishableKeyConfigured()`, `DuitClerkProvider`, **safe wrappers**: `useUser()`, `useAuth()`, `useSignIn()`, `useSignUp()`. Safe wrappers return "logged out" stub saat Clerk key tidak diset, sehingga build static export tidak crash. **Semua komponen UI yang butuh Clerk WAJIB import dari sini, bukan dari `@clerk/react`.** |
| `AuthNav.tsx` | [V] | Pakai `useUser` + `isClerkPublishableKeyConfigured` dari `DuitClerkProvider`. `UserButton` tetap dari `@clerk/react` (component, bukan hook). |
| `LoginRegisterClient.tsx` | [L] | **563 baris.** Tabs login/register. Pakai `useSignIn/useSignUp` dari `DuitClerkProvider`. Google OAuth + email/password + OTP. |

### 5.4 `src/components/home/`
| File | Type | Logic |
|---|---|---|
| `HomePage.tsx` | [V] | Hero + 5 `learningPaths` (tier 0-4) + `<TierQuiz>`. |
| `TierQuiz.tsx` | [L] | **801 baris.** Multi-step financial assessment (9 steps). Submit ke `POST /api/tier`. Pakai `useAuth/useUser` dari `DuitClerkProvider`. |

### 5.5 `src/components/academy/`
| File | Type | Logic |
|---|---|---|
| `AcademyIndexPage.tsx` | [V] | Course list dari `academyCourses`. |
| `AcademyCoursePage.tsx` | [V] | Course detail. Sticky `<CoursePurchaseModal>`. |
| `AcademyMetricCard.tsx` | [V] | Reusable metric tile. |

### 5.6 `src/components/article/`
| File | Type | Logic |
|---|---|---|
| `KnowledgeHub.tsx` | [L] | Article grid dengan tier filter + search. Dipakai di `/artikel` dan `/artikel/[slug]` (kalau slug = tier). Pakai `getAllArticles`, `getTierLabel`. |
| `ArticlePage.tsx` | [L] | Article renderer. Pakai `useParams` dari `next/navigation`, `useRouter`. `useAuth/useUser` dari `DuitClerkProvider`. Tier access gate. Related articles. |

### 5.7 `src/components/checkout/`
| File | Type | Logic |
|---|---|---|
| `CourseCheckoutClient.tsx` | [L] | **691 baris.** Payment UI. Pakai `useAuth/useUser/useSignIn/useSignUp` dari `DuitClerkProvider`. Export `CheckoutAuthTabs` + `PaymentMethodGroups` (reuse oleh `CoursePurchaseModal`). |
| `CoursePurchaseModal.tsx` | [L] | **310 baris.** Portal modal reuse form dari `CourseCheckoutClient`. Polling `GET /api/orders/pending`. |

### 5.8 `src/components/dashboard/`
| File | Type | Logic |
|---|---|---|
| `DashboardPage.tsx` | [L] | **415 baris.** Dashboard personal: tier, recent articles, pending orders, recommended courses, `<TierQuiz>` untuk user yang belum isi assessment. Pakai `useAuth/useUser` dari `DuitClerkProvider`. |

### 5.9 `src/components/experts/`
| File | Type | Logic |
|---|---|---|
| `ExpertsPage.tsx` | [V] | Expert directory (6 expert dummy) + booking flow UI. Filter by category + search. |

### 5.10 `src/components/extra/`
| File | Type | Logic |
|---|---|---|
| `ExtraDownloadButton.tsx` | [L] | Fetch extra + modal preview + `window.print()` untuk PDF. Auth gate. Pakai `useUser` dari `DuitClerkProvider`. |

### 5.11 `src/components/home/`
Lihat § 5.4.

### 5.12 `src/components/knowledge-detail/`
| File | Type | Logic |
|---|---|---|
| `KnowledgeDetailPage.tsx` | [V] | Knowledge detail page (legacy-style dengan YouTubeLockGate, related articles, sidebar TOC). Hardcoded content "Arsitektur Otonomi". |

### 5.13 `src/components/law/`
| File | Type | Logic |
|---|---|---|
| `LawLibraryPage.tsx` | [V] | UU/POJK index + filter by category + year + search. Dummy data 12 entries. |

### 5.14 `src/components/profile/`
| File | Type | Logic |
|---|---|---|
| `ProfileClient.tsx` | [L] | **374 baris.** Profile editor: name, image, WhatsApp (E.164), birthday (locks after first save). Pakai `useAuth/useUser` dari `DuitClerkProvider`. Submit `POST /api/profile`. |

### 5.15 `src/components/quiz/`
| File | Type | Logic |
|---|---|---|
| `QuizPage.tsx` | [L] | **476 baris (rewrite).** 9-step classic tier quiz dengan asset & debt overrides. Client-side tier calculation via `calculateTier()`. (Berbeda dengan `TierQuiz` baru di homepage yang mengirim ke server.) |

### 5.16 `src/components/tools/`
| File | Type | Logic |
|---|---|---|
| `ToolsIndexPage.tsx` | [L] | Filtered grid: `type?: ToolType`. `buildToolsMetadata(type)` helper. |
| `ToolCard.tsx` | [V] | Reusable card. |
| `ToolDetailClient.tsx` | [L] | **1242 baris.** Mega-component: render tool form berdasarkan `tool.id` dari `toolsCatalog`. Pakai `useAuth/useUser` dari `DuitClerkProvider`. |

---

## 6. `src/data/`

| File | Type | Logic |
|---|---|---|
| `academyCourses.ts` | [M] | **302 baris.** 8 `AcademyCourse` entries dengan curriculum, outcomes, prices, instructors, FAQs. Export `formatCoursePrice`, `getAcademyCourse`, `getAcademyTopics`, `getAcademyCourses`. |
| `toolsCatalog.ts` | [M] | **624 baris.** 5 `ToolType`: `kalkulator`, `template`, `direktori`, `ceklist`, `resources`. Helper: `getToolsByType`, `getToolByTypeAndSlug`, `governmentAidResources`, `legalAidResources`. |
| `duitkuCommerceMock.ts` | [M] | **316 baris.** Mock Duitku payloads, customer details, support contacts, testing accounts. Untuk local dev/test saja. |

---

## 7. `src/lib/`, `src/hooks/`, `src/types/`, `src/utils/`

| File | Type | Logic |
|---|---|---|
| `src/lib/utils.ts` | [L] | `cn(...inputs)` = `twMerge(clsx(inputs))`. |
| `src/lib/clerkAppearance.ts` | [M] | `duitClerkAppearance` config untuk Clerk. |
| `src/hooks/useTheme.ts` | [L] | `useTheme()` → `{ theme, isDark, mounted, toggleTheme, setThemeMode }`. Localstorage key `duit-co-id-theme`. Default light. |
| `src/types/markdown.d.ts` | [T] | Module declaration untuk `react-markdown` + `remark-gfm`. |
| `src/utils/content.ts` | [L] | **279 baris.** Type definitions + helpers. **TIDAK ADA frontmatter interface** (dihapus). Functions: `getAllArticles()` (cached, fetch `/search-index.json`), `getArticleBySlug`, `getArticleContentBySlug`, `getArticlesByTier`, `filterArticles`, `estimateReadTime`, `getTierLabel`, `getTierOrder`, `getVisibleArticlesForTier`. |
| `src/utils/extras.ts` | [L] | `ExtraContent` type, `getExtraByArticleSlug(slug)`. |

---

## 8. `JSON/` — Article Metadata Sidecars

**Satu-satunya sumber metadata artikel.** Body di `artikel/*.md` **tidak** punya frontmatter. Untuk extras (`extra/*.md`) frontmatter tetap dipakai (lihat § 14).

| File | Struktur | Sumber kebenaran untuk |
|---|---|---|
| `article-seo.json` | `{[slug]: {title, description, image, author}}` | Meta tag OG/Twitter (lewat `generateMetadata` di App Router). |
| `article-taxonomy.json` | `{[slug]: {tier, category[], gender, age, location, education, cluster}}` | Filter & routing tier. |
| `article-tags.json` | `{[slug]: string[]}` | Tag chip di `ArticleCard`. |
| `article-dates.json` | `{[slug]: "YYYY-MM-DD"}` | **Source of truth** untuk unique publish date. Di-maintain oleh `prebuild`. |
| `article-access.json` | `{[slug]: {access_level, is_premium, youtube_lock}}` | Access gating. |
| `article-media.json` | `{[slug]: {youtube_url, youtube_embed_position}}` | YouTube embed. |
| `article-dscore.json` | `{_schema: {…}, [slug]: DuitScore}` | Skor kelayakan bisnis (6 kategori × 30 indikator). |
| `article-audit.json` | `{[slug]: {path, catalog_row, …}}` | Audit trail migrasi dari frontmatter. |
| `article-frontmatter-archive.json` | `{[slug]: {path, raw, parsed, parse_error}}` | **Read-only archive** frontmatter lama. |

> **Frontmatter policy:** Body di `artikel/*.md` **TIDAK** punya YAML frontmatter. Semua metadata di JSON sidecar. Pipeline otomatis (`generate-article-content.mjs`) handle validasi allow-list, generation tanggal unik, dan update `article-dates.json`.

---

## 9. `scripts/` — Build & Maintenance

| File | Type | Logic |
|---|---|---|
| `bump-version.mjs` | [S] | `npm run version:bump [major|minor|patch]`. Parse `src/version.ts`, increment, set `BUILD_DATE` ke ISO date hari ini (UTC). Default: `patch`. |
| `fix-internal-links.ps1` | [S] | PowerShell. Rewrite `/artikel/tier-X-.../{slug}` → `/artikel/{slug}` di semua `artikel/**/*.md`. |
| `generate-article-content.mjs` | [S] | **299 baris — pipeline utama.** `walkMarkdown('artikel/')` (no frontmatter expected) → join dengan JSON sidecars → validasi allow-list → generate excerpt (~250 char) → assign unique date via `resolveUniqueDate` (collision → `previousDate` recur) → tulis `public/search-index.json` + `public/article-content/{slug}.json` + `JSON/article-dates.json`. Hard-fail jika zero articles. |
| `generate-extra-catalog.mjs` | [S] | Read `docs/ARTICLE_CATALOG.md`, infer extra-type per artikel, tulis `docs/EXTRA_CATALOG.md`. |
| `generate-extra-content.mjs` | [S] | `walkMarkdown('extra/')` dengan gray-matter (frontmatter parser) → tulis `public/extra-content/{slug}.json` + `public/extra-index.json`. **Hanya extras yang masih pakai frontmatter.** |
| `schedule-publication.mjs` | [S] | **Deprecated stub.** |
| `strip-smk-from-slugs.ps1` | [S] | PowerShell. Rename 50 `*-smk` slugs di artikel/docs/research/JSON. |

> **Dihapus:**
> - `migrate-article-metadata-to-json.mjs` — tidak relevan lagi, tidak ada frontmatter.
> - `generate-metadata.cjs` (CJS legacy) — superseded oleh `generate-article-content.mjs`.

---

## 10. `functions/` — Cloudflare Pages Functions

Semua function di sini adalah **ESM modules** yang Cloudflare Pages mount otomatis. Mereka punya akses ke `env.DB` (D1), `env.QUIZ_DATA_BUCKET` (R2), `env.CLERK_JWKS_URL`, `env.DUITKU_MERCHANT_CODE`, `env.DUITKU_API_KEY`, `env.DUITKU_V2_BASE_URL`.

### 10.1 Shared helpers
| File | Type | Logic |
|---|---|---|
| `functions/_auth.js` | [L] | `requireUser(request, env)` → parse JWT, fetch JWKS dari `env.CLERK_JWKS_URL`, verify signature RSASSA-PKCS1-v1_5 + SHA-256, cek `exp`/`nbf`/`sub`. |
| `functions/_duitku.js` | [L] | `checkoutProducts` (8 produk), `json()`, `getDuitkuEnv()`, `requireDuitkuEnv()`, `getProduct()`, `getOrigin()`, `duitkuDateTime()` (Asia/Jakarta), `sha256Hex()`, `md5()` (245 baris pure-JS). |
| `functions/_user.js` | [L] | `TIER_ORDER`, `TIER_ROLE`, `normalizeTier()`, `roleForTier()`, `profileFromClaims()`, `ensureD1User()`. |

### 10.2 API endpoints
| Endpoint | File | HTTP | Logic |
|---|---|---|---|
| `/api/profile` | `functions/api/profile.js` | `GET`, `POST` | GET requireUser + ensureD1User + return profile. POST normalize (E.164 WhatsApp) + enforce birthday lock + UPSERT. |
| `/api/tier` | `functions/api/tier.js` | `POST` | **225 baris.** Tier calculation: debt override + income bands + asset override + business revenue. Store quiz payload ke R2. UPSERT users + INSERT user_tier_events. |
| `/api/duitku/callback` | `functions/api/duitku/callback.js` | `POST` | Verify md5 signature. UPDATE orders + UPSERT course_enrollments jika paid. |
| `/api/duitku/create-transaction` | `functions/api/duitku/create-transaction.js` | `POST` | Reuse pending order atau INSERT baru. Hit Duitku `/v2/inquiry`. |
| `/api/duitku/payment-methods` | `functions/api/duitku/payment-methods.js` | `GET` | Proxy ke Duitku `/paymentmethod/getpaymentmethod`. |
| `/api/orders/pending` | `functions/api/orders/pending.js` | `GET` | SELECT pending orders user. |

### 10.3 D1 Schema
```sql
-- users
clerk_user_id, email, full_name, image_url, birthday_date, birthday_locked_at,
whatsapp_country, whatsapp_country_code, whatsapp_national_number, whatsapp_e164,
income_tier, access_role, tier_source, tier_updated_at,
monthly_income_idr, total_assets_idr, monthly_business_revenue_idr,
business_name, business_type, business_url, business_verified_self_at,
quiz_result_json, quiz_result_r2_key, quiz_result_url,
last_article_slug, last_article_read_at,
created_at, updated_at, last_seen_at

-- orders
id, clerk_user_id, email, customer_name, phone_e164,
product_id, product_name, product_type, course_slug,
amount_idr, merchant_order_id, duitku_reference,
duitku_payment_method, duitku_payment_code, duitku_payment_url,
status, raw_create_response, raw_callback_response, paid_at,
created_at, updated_at

-- course_enrollments
clerk_user_id, course_slug, order_id, access_status, access_source

-- user_events
clerk_user_id, event_name, entity_type, entity_id, metadata_json, created_at

-- user_tier_events
clerk_user_id, previous_tier, assigned_tier, access_role, source, quiz_type,
metadata_json, metadata_r2_key, metadata_url, created_at
```

> Migration ada di `docs/sql/d1_*.sql`. Schema aktual hidup di Cloudflare dashboard.

---

## 11. `public/` — Generated Static Assets

| Path | Type | Logic |
|---|---|---|
| `public/search-index.json` | [M] | Array of `Article` (semua field termasuk `excerpt`, tanpa `content`). Generated by `scripts/generate-article-content.mjs`. |
| `public/article-content/{slug}.json` | [M] | `{ slug, content: "<raw markdown body>" }`. Lazy-loaded by `src/utils/content.ts`. |
| `public/extra-index.json` | [M] | Array of `{ article_slug }`. Saat ini `[]`. |
| `public/extra-content/{article-slug}.json` | [M] | Schema: `{ title, description, slug, article_slug, tier, extra_type, download_label, version, updated_at, requires_login, pdf_enabled, content }`. |
| `public/favicon.ico`, `favicon.svg` | [M] | Brand favicon. |

---

## 12. Build Pipeline — Step by Step

```
1.  npm run prebuild
    │
    ├─ node scripts/generate-article-content.mjs
    │     • walkMarkdown('artikel/')  [no frontmatter expected]
    │     • join with JSON/{seo, taxonomy, tags, dates, access, media}
    │     • validate allow-lists
    │     • assign unique date (collision → previousDate)
    │     • write public/search-index.json
    │     • write public/article-content/{slug}.json
    │     • update JSON/article-dates.json
    │
    └─ node scripts/generate-extra-content.mjs
          • walkMarkdown('extra/') with gray-matter [frontmatter present]
          • write public/extra-content/{slug}.json
          • write public/extra-index.json

2.  npm run dev
    • next dev (port 3000)
    • TypeScript HMR via Next webpack
    • Article content loaded server-side via fs di src/app/artikel/[slug]/page.tsx

3.  npm run build
    • next build → out/ (static export)
    • trailingSlash: true → /artikel/foo/ (folder per article)
    • images.unoptimized: true

4.  Cloudflare Pages
    • serve out/ as static
    • run functions/ on edge
    • env.DB (D1), env.QUIZ_DATA_BUCKET (R2), env.CLERK_JWKS_URL, env.DUITKU_*
```

---

## 13. Routing Map (URL → Component)

| URL | Tipe | Mount |
|---|---|---|
| `/` | static | `<HomePage>` |
| `/about` | static | Inline text |
| `/quiz` | static | `<QuizPage>` (9-step classic) |
| `/artikel` | static | `<KnowledgeHub>` |
| `/artikel/tier-0-survival` ... `/artikel/tier-4-legacy` | static | `<KnowledgeHub initialTier=…>` |
| `/artikel/[slug]` (non-tier) | static | `<ArticlePage>` |
| `/academy`, `/akademi` | static | `<AcademyIndexPage>` |
| `/akademi/[slug]` | static | `<AcademyCoursePage>` |
| `/ahli`, `/experts` | static | `<ExpertsPage>` |
| `/ceklist` + `/ceklist/[slug]` | static | `<ToolsIndexPage type="ceklist">` / `<ToolDetailClient>` |
| `/checkout/[slug]` | static (gated) | `<CourseCheckoutClient>` (hanya `blueprint-bebas-utang`) |
| `/checkout/return` | static | Halaman status |
| `/dashboard` | static | `<DashboardPage>` |
| `/debug/clerk` | server | Cek env vars Clerk |
| `/direktori` + `/direktori/[slug]` | static | `<ToolsIndexPage type="direktori">` |
| `/disclaimer`, `/privacy`, `/terms` | static | Inline text |
| `/hukum`, `/law` | static | `<LawLibraryPage>` |
| `/kalkulator` + `/kalkulator/[slug]` | static | `type="kalkulator"` |
| `/knowledge-detail` | static | `<KnowledgeDetailPage>` |
| `/login` | static | `<LoginRegisterClient initialTab="login">` |
| `/login/sso-callback` | static | Lazy `HandleSSOCallback` (client only) |
| `/profile`, `/profil` | static | `<ProfileClient>` |
| `/register` | static | `<LoginRegisterClient initialTab="register">` |
| `/resources` + `/resources/[slug]` | static | `type="resources"` |
| `/template` + `/template/[slug]` | static | `type="template"` |
| `/tools` | static | `<ToolsIndexPage>` (no type) |
| `POST /api/profile` | edge | `functions/api/profile.js` |
| `POST /api/tier` | edge | `functions/api/tier.js` |
| `POST /api/duitku/callback` | edge | `functions/api/duitku/callback.js` |
| `POST /api/duitku/create-transaction` | edge | `functions/api/duitku/create-transaction.js` |
| `GET  /api/duitku/payment-methods` | edge | `functions/api/duitku/payment-methods.js` |
| `GET  /api/orders/pending` | edge | `functions/api/orders/pending.js` |

---

## 14. Cross-Cutting Concerns

### 14.1 Auth (Clerk)
- **Client side:** `DuitClerkProvider` wraps `ClerkProvider` (jika `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` diset). Pakai safe wrappers: `useUser()`, `useAuth()`, `useSignIn()`, `useSignUp()` dari `@/components/auth/DuitClerkProvider` — JANGAN import langsung dari `@clerk/react` untuk hooks, karena build static akan crash jika Clerk key belum diset.
- **Server side:** `requireUser(request, env)` di `functions/_auth.js`.
- **Graceful degradation:** `DuitClerkProvider` no-op saat key unset. Safe hooks return `{isLoaded: true, isSignedIn: false, user: null}` dst. Aplikasi masih build & render.

### 14.2 Tier classification
- **Server (canonical):** `functions/api/tier.js` → `tierFromNumbers` (income band), `tierFromBusinessRevenue`, plus asset override.
- **Client (UI gating):** `src/utils/content.ts` → `getTierOrder`, `getVisibleArticlesForTier`. Tier order: t0=0 ... t4=4.
- **Homepage kuis (new):** `src/components/home/TierQuiz.tsx` — submit ke `POST /api/tier`.
- **/quiz classic (legacy):** `src/components/quiz/QuizPage.tsx` — client-side calculation via `calculateTier()`. Coexisted dengan TierQuiz.

### 14.3 Payment (Duitku)
- **Flow:** User di `/akademi/[slug]` → klik "Beli" → `<CoursePurchaseModal>` → reuse form `<CourseCheckoutClient>` → submit `POST /api/duitku/create-transaction` → function INSERT pending order + panggil Duitku `/v2/inquiry` → return payment URL/VA/QR → user bayar → Duitku `POST /api/duitku/callback` → verify md5 signature → UPDATE order + UPSERT `course_enrollments` → user redirect ke `/checkout/return`.

### 14.4 Content pipeline
- **Build-time:** `scripts/generate-article-content.mjs` validates & emits `public/search-index.json` + per-article body JSON.
- **Runtime client:** `src/utils/content.ts` fetch dari `/search-index.json` (cached) + `/article-content/{slug}.json` (per-slug cache).
- **Tier routing:** `/artikel/tier-X-...` adalah nama folder di `artikel/`. Tier ada di JSON `article-taxonomy.json`. `app/artikel/[slug]/page.tsx` baca `artikel/` via `fs` (server-side) untuk `generateStaticParams`. `ArticleDynamicRoute` (client) bedakan slug tier vs slug artikel.
- **Slug format:** `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Duplicate slug → hard error.
- **Frontmatter:** **TIDAK ADA** di body artikel. Metadata seluruhnya di JSON. (Extras masih pakai frontmatter — lihat § 14.6.)

### 14.5 Theme
- `useTheme()` baca `localStorage('duit-co-id-theme')` → `light` / `dark`. Default light. Toggle menambah/hapus class `dark` di `<html>`. SSR-safe (mounted flag).

### 14.6 YouTube embed & extras
- **Inline shortcode** di markdown: `{youtube}https://youtu.be/ID{/youtube}` → `MarkdownRenderer` split content & render `<YouTubeEmbed>`.
- **External prop:** `MarkdownRenderer` menerima `youtubeUrl` + `youtubePosition` (top/middle/bottom/inline).
- **Per-artikel default:** `JSON/article-media.json` → `youtube_url` + `youtube_embed_position`.
- **Subscribe overlay default ON.**
- **Extras:** `extra/{tier}/{slug}-extra.md` dengan frontmatter (YAML) → di-build jadi `public/extra-content/{article-slug}.json`. Pipeline sudah wired tapi folder `extra/` belum dipopulate. UI `ExtraDownloadButton` no-op bila `getExtraByArticleSlug` return null.

### 14.7 Markdown rendering
- `react-markdown` + `remark-gfm`. 40+ prose className overrides di `MarkdownRenderer.tsx`.

---

## 15. Conventions & Invariants

### 15.1 Slug
- Pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`.
- Unique across `artikel/`.
- Tier folder names: `tier-0-survival`, `tier-1-hustler`, `tier-2-scaler`, `tier-3-asset-builder`, `tier-4-legacy`.

### 15.2 Tier taxonomy
- Tier 0 (Survival): < Rp 5jt / bulan atau high debt.
- Tier 1 (Hustler): Rp 5-10jt.
- Tier 2 (Scaler): Rp 10-100jt, asset > 500jt.
- Tier 3 (Asset Builder): Rp 100jt - 1M, asset > 5M.
- Tier 4 (Legacy): > Rp 1M, asset > 50M.
- Tiers **filters, NOT paywalls.** Semua konten free.

### 15.3 Access level
- `open` (default) | `share_gate` | `youtube_gate` | `register_gate` | `paid`.
- Saat ini hampir semua artikel `open`.

### 15.4 Currency & time
- IDR formatting: `Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })`.
- Time zone: `Asia/Jakarta` (WIB) untuk semua `Date` di build pipeline & formatters.
- `BUILD_DATE` di `src/version.ts` di-set dalam UTC ISO date.

### 15.5 Component location rules
- `src/components/ui/` = primitives (shadcn-style, CVA variants).
- `src/components/shared/` = global layout.
- `src/components/{academy,article,auth,checkout,dashboard,experts,extra,home,knowledge-detail,law,profile,quiz,tools}/` = page-specific logic. Each folder has `XxxPage.tsx` (or `Xxx.tsx`) for the mounted page component.
- **Tidak ada** `src/legacy-pages/`. Semua component ada di `src/components/`.

### 15.6 Naming
- Functions di `functions/api/` pakai `onRequestGet` / `onRequestPost` (Cloudflare Pages convention).
- App Router pages: `page.tsx` saja. Layout: `layout.tsx`.
- Server-only logic (env access) di file tanpa `"use client"`. Client components harus `"use client"`.
- Client components dengan "use client" + safe Clerk hooks → bisa di-static-render.

### 15.7 DO NOT
- ❌ Jangan tambah YAML frontmatter ke `artikel/*.md`. Metadata di JSON sidecar.
- ❌ Jangan rename folder tier di `artikel/` tanpa update `JSON/article-taxonomy.json` + `scripts/generate-article-content.mjs` (`VALID_TIERS`).
- ❌ Jangan import `useUser/useAuth/useSignIn/useSignUp` dari `@clerk/react` atau `@clerk/react/legacy` di komponen UI. Pakai safe wrappers dari `@/components/auth/DuitClerkProvider`.
- ❌ Jangan pakai `Link`/`useParams`/`useNavigate` dari `react-router-dom`. Pakai `next/link` + `next/navigation`.
- ❌ Jangan broad-kill Node processes (`taskkill /F /IM node.exe`).

---

## 16. Quirks & Gotchas

1. **Single bundler.** Hanya Next.js. Vite + `index.html` + `src/main.tsx` sudah dihapus total. `npm run dev` menjalankan `next dev`, bukan Vite. Tidak ada legacy SPA.
2. **Safe Clerk wrappers.** `DuitClerkProvider` mengekspor `useUser/useAuth/useSignIn/useSignUp` yang no-op saat `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` unset. Build static export tidak crash. Komponen UI **wajib** import dari sini.
3. **JSON-only metadata.** Body `artikel/*.md` body-only, no frontmatter. Semua metadata di `JSON/`. Extras (different content type) tetap pakai frontmatter.
4. **Tier folder name = URL slug.** `tier-0-survival` adalah slug URL untuk folder. Tier metadata ada di JSON. `ArticleDynamicRoute` mendeteksi slug tier vs slug artikel.
5. **Extra content pipeline wired but empty.** `extra/` belum ada, `public/extra-content/` kosong. UI `ExtraDownloadButton` no-op bila extra tidak ada.
6. **QuizPage vs TierQuiz.** Dua quiz coexisting: `src/components/quiz/QuizPage.tsx` (legacy, client-side calc) di `/quiz`; `src/components/home/TierQuiz.tsx` (new, server submission) di homepage. Keduanya valid.
7. **ProfileClient (slim) vs no legacy full profile.** Hanya `ProfileClient` di `components/profile/`. Tidak ada `Profile.tsx` legacy. `/profile` dan `/profil` keduanya mount `ProfileClient`.
8. **KnowledgeDetailPage** adalah legacy page yang masih hidup di `/knowledge-detail`. Hardcoded content "Arsitektur Otonomi". Bisa di-deprecate jika tidak ada kebutuhan.
9. **Root-level scratch files** (Python helpers, `.aider.*`, `temp_*`, `check_*`, `fix_*`, `update_*`, `verify_*`, `patch_catalog.py`, `clean_orphan_research.py`, `prepend_changelog.py`, `rebuild_changelog.py`, `run_*.py`, `check-build.bat`, `.catalog_rebuild.ps1`, `fix-schedule.mjs`, `update-schedule.{cjs,js}`, `PROGRESS.md`, `SESSION_SUMMARY.md`, `SUBAGENT_CREATION.md`, `TECHSTACK.md`) — bukan bagian dari pipeline produksi; scratch / ad-hoc.
10. **No ESLint config** (`.eslintrc*` belum ada). `npm run lint` akan gagal sampai config ditambah. TypeScript check via `npx tsc --noEmit` works.

---

## 17. Daftar File yang Sedang Tidak Aktif (Untuk Audit)

| File / Direktori | Status |
|---|---|
| `KnowledgeDetailPage.tsx` | Masih hidup di `/knowledge-detail`. Hardcoded. Bisa di-deprecate. |
| `Duit.co.id.md`, `CHANGELOG.md`, `PROGRESS.md`, `SESSION_SUMMARY.md`, `SUBAGENT_CREATION.md`, `TECHSTACK.md` | Dokumen ad-hoc, bukan kode. |
| Root-level Python/PS1 scratch helpers | Bukan pipeline produksi. |

---

## 18. Cheat Sheet — Berkas Mana yang Mengubah Apa

| Kalau ingin ubah… | File yang disentuh |
|---|---|
| Tambah artikel baru | `artikel/{tier}/{slug}.md` (body only) + `JSON/article-*.json` (semua 6 file: seo, taxonomy, tags, dates, access, media) → `npm run prebuild` |
| Tambah course / ubah harga | `src/data/academyCourses.ts` + `functions/_duitku.js` (`checkoutProducts`) — **keduanya harus sinkron.** |
| Tambah tool baru | `src/data/toolsCatalog.ts` + logika render di `src/components/tools/ToolDetailClient.tsx` |
| Tambah tier atau ubah threshold | `src/utils/content.ts` (`VALID_TIERS`, `getTierOrder`, `getTierLabel`) + `functions/api/tier.js` (`tierFromNumbers`, `tierFromBusinessRevenue`) + `src/components/ui/TierBadge.tsx` (`TIER_CONFIG`) + `tailwind.config.js` (`tier-*` colors) + `src/components/article/KnowledgeHub.tsx` (`ALL_TIERS`) |
| Tambah route baru | `src/app/{path}/page.tsx` + update navbar/footer link |
| Tambah endpoint baru | `functions/api/{path}.js` + doc di § 13 |
| Ubah design system | `tailwind.config.js` + `src/index.css` (CSS vars) + `src/lib/clerkAppearance.ts` (Clerk) + `src/components/ui/*.tsx` (CVA variants) |
| Ubah format tanggal / zona waktu | `scripts/generate-article-content.mjs` (`todayWib`) + `functions/_duitku.js` (`duitkuDateTime`) + `bump-version.mjs` (UTC ISO) |
| Ubah search | `src/utils/content.ts` + `src/components/home/TierQuiz.tsx` + (jika ada) `public/search-index.json` (regenerate) |
| Tambah field di Article | `src/utils/content.ts` (interface + validation) + `scripts/generate-article-content.mjs` (allow-list) + `JSON/article-*.json` (per-slug entries) |
| Tambah kolom D1 | `functions/api/*.js` (SQL UPSERT) + `docs/sql/d1_*.sql` (migration) + `docs/D1_ARCHITECTURE.md` (schema) |
| Tambah extra (download PDF) | `extra/{tier}/{slug}-extra.md` (dengan frontmatter) + `npm run prebuild` → `public/extra-content/{slug}.json` otomatis |
| Pakai Clerk di komponen baru | Import `useUser/useAuth/useSignIn/useSignUp` dari `@/components/auth/DuitClerkProvider` (bukan `@clerk/react`). |
| Tambah Link di komponen | Import `Link` dari `next/link` (bukan `react-router-dom`). |
| Tambah page baru | Buat `src/components/{folder}/{X}Page.tsx` (Next idiomatic), mount dari `src/app/{path}/page.tsx`. |

---

## 19. Maintenance Protocol (WAJIB)

> **Aturan kolaborasi:** Setiap perubahan kode **wajib** memperbarui file ini.
> Ini adalah referensi satu-satunya untuk seluruh codebase.

### Kapan update CODEBASE.md
- [ ] Tambah / hapus / rename file kode (`src/`, `functions/`, `scripts/`).
- [ ] Tambah / hapus / ubah fungsi atau export utama.
- [ ] Tambah / hapus / ubah route (App Router page atau function endpoint).
- [ ] Tambah / hapus / ubah field di schema D1, JSON sidecar, atau `Article` type.
- [ ] Tambah / hapus / ubah konvensi (slug pattern, tier taxonomy, access level, currency, time zone).
- [ ] Refactor besar (mis. memindahkan logic dari legacy ke komponen baru).
- [ ] Tambah dependensi runtime baru.

### Yang harus di-update di file ini
1. **Section 2 (Directory Tree)** — file/folder baru/dipindah.
2. **Section 3-7, 5** — tambahkan baris di tabel yang relevan, atau update isi sel "Logic".
3. **Section 8, 9, 10, 11** — tambahkan/update baris.
4. **Section 12 (Build Pipeline)** — kalau ada step baru.
5. **Section 13 (Routing Map)** — kalau ada route baru/hapus.
6. **Section 14 (Cross-Cutting)** — kalau ada flow baru.
7. **Section 15 (Conventions)** — kalau ada aturan baru.
8. **Section 16 (Quirks)** — kalau ketemu edge case tricky.
9. **Section 17 (Inactive Files)** — kalau ada file jadi dormant.
10. **Section 0 (Header)** — increment tanggal `Status snapshot` ke hari ini.

### Workflow
1. Setelah edit kode, buka `CODEBASE.md`.
2. Cari section yang relevan. Kalau tidak ada, tambah section baru.
3. Update tabel / list / narasi.
4. Append satu baris ke `CHANGELOG.md` dengan format yang sudah ada.
5. Commit kode + `CODEBASE.md` + `CHANGELOG.md` dalam satu commit.

### Check cepat sebelum PR
- [ ] Apakah ada section di `CODEBASE.md` yang jadi stale / misleading?
- [ ] Apakah ada file baru yang belum tercantum di Section 2?
- [ ] Apakah ada fungsi / endpoint baru yang belum di Section 13?
- [ ] Apakah semua tier/category/slug baru tercantum di Section 15?
- [ ] Apakah ada file dari `react-router-dom` atau `vite` yang masih bocor?

---

## 20. Open Questions / TODOs (untuk diskusi)

- [ ] Apakah `KnowledgeDetailPage.tsx` masih dipakai? Jika tidak, deprecate.
- [ ] Apakah `QuizPage` (legacy) akan dideprecate setelah `TierQuiz` stabil? Sekarang dua-duanya hidup.
- [ ] Apakah perlu caching JWKS di `functions/_auth.js`?
- [ ] Apakah `extra/` masih on the roadmap? Atau ganti strategi unduhan?
- [ ] Apakah HelmetProvider (no-op) perlu dihapus? Saat ini hanya jadi wrapper, tidak ada yang pakai `<Helmet>`.
- [ ] Setup ESLint config agar `npm run lint` jalan.
- [ ] Migrasi penuh dari Next static export ke SSR (OpenNext on Cloudflare Workers) untuk Duitku callback & quiz submission yang butuh server-side.

---

**Status snapshot:** 2026-06-02 WIB (post-Vite-removal)
**Maintainer:** opencode session.
**Aturan update:** lihat § 19.
