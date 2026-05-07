# Duit.co.id Tech Stack Recommendation

Tanggal: 2026-05-07 WIB

## Executive Decision

Rekomendasi stack jangka panjang untuk Duit.co.id:

| Layer | Rekomendasi | Status Keputusan |
|---|---|---|
| Web framework | Next.js App Router | Direkomendasikan untuk migrasi SEO dan full-stack roadmap |
| Hosting runtime | Cloudflare Pages untuk static export awal; Workers/OpenNext hanya jika perlu SSR/admin server-side | Pilih sesuai kebutuhan runtime |
| Public content | Markdown/MDX tetap menjadi source of truth awal | Jangan langsung pindahkan 518 artikel ke database |
| CMS editorial | Keystatic sebagai kandidat utama Git-based Markdown CMS | Tidak pakai Payload; content tetap file-based |
| App database | Cloudflare D1 | Tetap cocok untuk user, unlock, leads, analytics, course progress |
| ORM app | Drizzle ORM untuk D1 | Direkomendasikan |
| CMS database | Tidak ada database CMS | Git/Markdown tetap jadi source of truth |
| Auth public user | Clerk | Direkomendasikan |
| Auth admin/editor | Keystatic local/GitHub mode dulu; Clerk gate nanti bila perlu | Hindari integrasi auth rumit di fase awal |
| Media storage | Cloudflare R2 | Direkomendasikan untuk images/video assets |
| Search | Pagefind atau FlexSearch static index | Mulai dari static index |

Intinya: Next.js tetap masuk akal sebagai target, tapi Payload tidak cocok dengan preferensi baru Duit.co.id karena kita ingin CMS yang mengakomodasi Markdown/Git secara natural tanpa database CMS tambahan. Duit.co.id sekarang sudah punya aset besar: 518 artikel Markdown, frontmatter taxonomy, publication schedule, dan pipeline build. Aset ini harus dipertahankan dulu, lalu Next.js dan Git-based CMS masuk bertahap.

## Jawaban Singkat: Apakah React Vite Jelek untuk SEO?

React + Vite tidak otomatis jelek untuk SEO. Vite bisa dipakai untuk SSR atau pre-rendering jika dikonfigurasi khusus.

Masalahnya ada di implementasi Duit.co.id saat ini: ini adalah SPA yang merender artikel dan meta tag di client dengan React Router dan `react-helmet-async`. Untuk situs artikel yang target utamanya organic search, initial HTML idealnya sudah berisi:

- Judul artikel.
- Body artikel.
- Meta description.
- Open Graph tags.
- Canonical URL.
- Structured data.

Pada SPA client-rendered, banyak hal itu baru muncul setelah JavaScript jalan. Google bisa menjalankan JavaScript, tapi prosesnya lebih lambat dan lebih rentan dibanding halaman yang sudah pre-rendered. Social crawler seperti WhatsApp, Facebook, LinkedIn, dan beberapa bot lain juga lebih aman jika metadata sudah ada di HTML awal.

Jadi kesimpulannya:

- Vite sebagai build tool bukan masalah utama.
- SPA-only rendering adalah masalah SEO untuk situs artikel.
- Next.js App Router lebih cocok karena mendukung static rendering, dynamic rendering, metadata server-side, route-level data loading, dan integrasi CMS yang lebih matang.

## Prinsip Arsitektur Duit.co.id

Berdasarkan dokumen di `docs/`, arsitektur harus menjaga beberapa prinsip ini:

1. Articles are content assets, not app database rows.
   Saat ini `docs/CMS.md` dan `docs/DATABASE.md` tegas menyatakan artikel ada di `/artikel` sebagai Markdown. D1 dipakai untuk tracking, user, unlock, tool logs, leads, dan course progress.

2. Tiers are filters, not paywalls.
   Struktur content dan schema harus tetap memperlakukan `tier-0-survival` sampai `tier-4-legacy` sebagai taxonomy/relevance filters.

3. Monetization is third-party-first.
   Stack harus kuat untuk referral tracking, expert marketplace, course progress, affiliate links, and lead attribution.

4. SEO is a core product requirement.
   Dengan ratusan artikel, public article routes harus bisa di-render sebagai static HTML atau ISR-like output.

5. Multiple writers need an editorial UI eventually.
   Markdown cukup untuk solo/agent-based writing, tapi akan berat saat ada penulis non-teknis, editor, media upload, draft review, dan course content management.

## Target Architecture

```text
GitHub Repository
  |
  |-- Next.js App Router
  |     |-- Public site: home, artikel, tools, academy, experts
  |     |-- Server components for article pages
  |     |-- Route handlers for app APIs
  |     |-- generateMetadata for SEO
  |
  |-- Content Layer
  |     |-- Phase 1: /artikel/**/*.md or .mdx as canonical source
  |     |-- Phase 2: Keystatic editor for Markdown
  |     |-- Build-time normalized content manifest
  |
  |-- Cloudflare
        |-- Workers/OpenNext for SSR/full-stack Next
        |-- D1 app DB for users, unlocks, shares, leads, tools, courses
        |-- No CMS database; Git remains content storage
        |-- KV for sessions/cache/rate flags where appropriate
        |-- R2 for media assets
```

## Recommended Stack Detail

### 1. Framework: Next.js App Router

Use Next.js App Router as the future frontend and full-stack framework.

Why:

- Article pages can be statically generated from Markdown at build time.
- `generateMetadata` can put SEO metadata into initial HTML.
- Server Components let article content render before hydration.
- Route Handlers can replace or reduce separate Hono endpoints.
- Clerk has first-class Next.js App Router support.
- Git-based CMS options like Keystatic are designed for file-based content.

Important nuance for Cloudflare:

- If the site is purely static, Cloudflare Pages is enough.
- If the site needs SSR, Server Actions, Route Handlers, a server-side CMS admin, or authenticated server rendering, use Cloudflare Workers with the Cloudflare/OpenNext adapter.
- Cloudflare's own docs direct full-stack SSR Next.js deployments toward Workers, while static Next.js can go to Pages.

Decision:

- Public static-first site: Next.js App Router with static generation.
- Full product runtime: Cloudflare Workers/OpenNext.
- Keep GitHub as source control either way.

### 2. CMS: Markdown First, Keystatic Second

Do not move existing Markdown files into a database-backed CMS.

Current reality:

- There are 518 Markdown articles in `/artikel`.
- Existing docs define frontmatter schema, taxonomy, access levels, YouTube fields, and publish date rules.
- The current Vite plugin already validates and indexes content.
- There is existing article history in Git.

Recommended phases:

Phase 1: Keep Markdown as canonical

- Migrate rendering from Vite SPA to Next.js static/server rendering.
- Build a content loader using `gray-matter`, `remark-gfm`, and possibly MDX later.
- Preserve current frontmatter fields.
- Generate static params for `/artikel/[slug]`.
- Generate sitemap and RSS from the same content manifest.

Phase 2: Add Keystatic for editorial workflow

- Use Keystatic to read and write Markdown/frontmatter in Git.
- Start by exposing current `/artikel/{tier}/{slug}.md` files in an editor UI.
- Keep articles as Markdown so automation, Git history, and build-time SEO remain clean.

Phase 3: Standardize the Keystatic schema

Use Keystatic collections and schema validation to make article editing safer:

- One article collection per tier, or one nested collection if the path/slug mapping proves clean in POC.
- `path` must preserve `/artikel/{tier}/{slug}.md`.
- `format.contentField` must keep metadata and body in one Markdown file.
- Required fields must match `docs/CMS.md` and `docs/TAXONOMY.md`.
- Keystatic must not introduce a database-backed content source.

Recommendation:

Use Markdown canonical for the migration to Next.js. Keystatic is the CMS choice because it is designed for content in the codebase, supports local/GitHub storage, can write Markdown files with frontmatter, has a Next.js App Router integration, and does not require a CMS database.

### 3. Database: Cloudflare D1

Keep Cloudflare D1 for product data:

- `users`
- `visitor_fingerprints`
- `user_unlocks`
- `content_shares`
- `tool_logs`
- `leads_referral`
- `course_progress`
- future referrals, bookmarks, newsletter events

D1 is a good fit because this data is structured, relational, and close to Workers. It is not the right primary storage for large media files; use R2 for that.

Important D1 constraints to design around:

- Single D1 database has a 10 GB limit on paid plans.
- Each individual D1 database processes queries in a single-threaded way.
- Query performance depends heavily on good indexes and short queries.
- D1 is excellent for app events and structured data, but avoid treating one database as a giant analytics warehouse.

Recommendation:

- `duit_app_db`: app/user/tracking/lead/course data.
- No CMS database unless a future non-article subsystem proves it needs one.
- Keep article body out of `duit_app_db`.

### 4. ORM: Drizzle ORM

Use Drizzle ORM for app-owned D1 tables.

Why:

- Drizzle officially supports Cloudflare D1.
- Schema is code-first and type-safe.
- It maps cleanly to SQLite/D1.
- It avoids ad hoc SQL scattered through Workers/Route Handlers.

Boundary:

- Use Drizzle for Duit.co.id app tables.
- Keep CMS/editor tooling out of the app database.
- Do not let article content enter D1 unless there is a narrow, documented product reason.

### 5. Git-Based Markdown CMS

Payload is removed from the recommended stack. Duit.co.id should avoid database-backed CMS ownership for articles because the existing content system is already Git/Markdown-first.

Keystatic is the CMS choice:

- Best fit for Next.js App Router.
- Stores content as files in the repo.
- Supports local mode and GitHub mode.
- Provides TypeScript schema and Reader API.
- No database required.
- Can be configured to preserve Duit.co.id's existing Markdown/frontmatter model.

Recommendation:

- Use Keystatic as the first proof-of-concept after Next.js article rendering works.
- Configure it against existing `/artikel/*/*.md` rather than inventing a new content directory.
- Do not introduce CMS editing until static article rendering, sitemap, and metadata are stable.

### 6. Auth: Clerk

Use Clerk for public user authentication:

- Register/login.
- Dashboard.
- Quiz profile.
- Bookmarks.
- Article unlocks.
- Course enrollment and progress.

For editor access, start with Keystatic local mode during development and GitHub mode for remote collaboration. Later, evaluate a Clerk-protected admin route only if it clearly reduces operational complexity.

Reason:

- Public users and content editors are different security domains.
- GitHub mode keeps editorial permissions close to repository permissions.
- Clerk integration into public Next.js routes is straightforward.

### 7. API Layer

Current plan mentions Hono on Cloudflare Workers. With Next.js App Router, the API decision changes.

Recommendation:

- Use Next.js Route Handlers for app-local APIs:
  - quiz submission
  - unlock tracking
  - lead tracking
  - bookmarks
  - course progress
- Keep Hono only if an API grows into a separate service or needs reusable routing outside the Next app.

This reduces stack surface area during migration.

### 8. Search

Current docs mention FlexSearch. That remains acceptable for client-side search over hundreds or low thousands of articles.

Recommended path:

- Phase 1: Generate static search index during build.
- Phase 2: Use Pagefind if article HTML becomes static and search quality matters.

Do not introduce hosted search before it is needed.

### 9. Styling and UI

Keep:

- Tailwind CSS.
- shadcn-style primitives.
- `lucide-react`.
- `framer-motion`.
- `@tailwindcss/typography`.

The design system remains "The Sovereign Vault": glassmorphism, money green, gold premium actions, and light/dark support.

Migration note:

- Existing React components can mostly be moved into Next.js.
- Components using browser-only APIs need `"use client"`.
- Article rendering, content loading, and metadata should be server-side by default.

## Migration Plan

### Phase 0: Cleanup Before Framework Migration

Do this in the current repo before changing framework:

- Normalize taxonomy mismatch: current repo contains `artikel/tier-3-legacy` and frontmatter `tier: "tier-3-legacy"`, while docs define `tier-3-asset-builder` and `tier-4-legacy`.
- Ensure every article slug is unique.
- Ensure every `date` is unique per current publishing rule.
- Ensure required frontmatter fields are complete.
- Generate a content audit report for invalid fields.

### Phase 1: Next.js Article Renderer

Goal: replicate current public site in Next.js without changing CMS ownership.

Tasks:

- Create Next.js App Router structure.
- Port Tailwind config and design tokens.
- Port shared components.
- Build `lib/content.ts` for Markdown scanning/parsing.
- Implement:
  - `/artikel`
  - `/artikel/[slug]`
  - `/artikel/[tier]`
  - sitemap
  - robots
  - canonical URLs
  - article structured data
- Use `generateStaticParams` for article slugs.
- Use `generateMetadata` from frontmatter.
- Keep all existing article URLs stable.

Acceptance criteria:

- Article HTML contains title, description, and body before hydration.
- Sitemap includes all article slugs.
- Social preview metadata works from initial HTML.
- Build passes with all 518 articles.

### Phase 2: Cloudflare Deployment Decision

Choose based on runtime needs:

Option A: Static-first Cloudflare Pages

- Use if the public site is mostly static.
- Use Next static export where possible.
- Put dynamic app features behind separate Workers endpoints.
- A server-side editor UI may need Workers/OpenNext later.

Option B: Cloudflare Workers/OpenNext

- Use if SSR, Route Handlers, Keystatic deployed admin UI, Server Actions, or dynamic authenticated rendering are required in one app.
- This is the likely long-term target.

Recommendation:

Plan for static export on Cloudflare Pages during the first Next.js migration. Move to Workers/OpenNext only when server-side CMS admin, Route Handlers, or authenticated SSR truly require it.

### Phase 3: D1 + Drizzle App Data

Tasks:

- Create Drizzle schema for app tables from `docs/DATABASE.md`.
- Add migrations.
- Add typed data access layer.
- Implement route handlers for:
  - quiz result save
  - fingerprint tracking
  - article unlocks
  - share events
  - lead events
  - course progress

Acceptance criteria:

- No raw SQL outside the data access layer except migrations.
- Indexes match high-frequency query paths.
- Local and remote D1 migration workflow documented.

### Phase 4: Keystatic POC

Tasks:

- Add Keystatic to the Next.js app.
- Map current `/artikel/{tier}/{slug}.md` files.
- Validate required frontmatter fields in the editor schema.
- Test local authoring.
- Test GitHub mode for remote editing.
- Test whether Cloudflare deployment supports the admin flow we need.

Acceptance criteria:

- Admin/editor can create and edit Markdown files.
- Public Next routes can read edited Markdown content.
- No existing article route breaks.
- Rollback path exists.

### Phase 5: Keystatic Editorial Workflow

Only after Keystatic POC:

- Use Keystatic as the official editor for Markdown articles.
- Decide whether editing happens only locally or also through GitHub mode.
- Add editor documentation for writers.
- Add validation/reporting for invalid frontmatter before content can be published.

For Duit.co.id, the safest likely model is:

- Markdown/MDX remains canonical for articles.
- Keystatic manages article/frontmatter editing.
- D1 remains reserved for user/product data, not article body storage.

## Recommended Repository Shape After Next Migration

```text
duit.co.id/
├── app/
│   ├── artikel/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── [tier]/page.tsx
│   ├── academy/
│   ├── dashboard/
│   ├── api/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/
│   └── shared/
├── content/
│   └── artikel/ or keep root /artikel/
├── lib/
│   ├── content/
│   ├── db/
│   ├── auth/
│   └── seo/
├── drizzle/
│   └── migrations/
├── keystatic.config.ts
├── public/
└── docs/
```

For minimum churn, keeping `/artikel` at repo root is acceptable. Moving it to `/content/artikel` is cleaner but should be a separate migration.

## Final Recommendation

Proceed in this order:

1. Keep current Vite implementation running while content cleanup happens.
2. Create a Next.js App Router migration branch.
3. Migrate article rendering first, using current Markdown files.
4. Deploy static/public Next output to Cloudflare and verify SEO.
5. Add D1 + Drizzle for app data.
6. Run Keystatic POC against existing Markdown files.
7. Add Keystatic editor workflow for articles first, then courses/media metadata.
8. Keep articles Markdown and Git-backed.

Do not rewrite everything at once. The highest-value fix is not CMS admin; it is making the 518 existing articles render as real HTML with server-side metadata.

## Official References Checked

- Next.js App Router: https://nextjs.org/docs/app
- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js static and dynamic rendering: https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering
- Cloudflare Next.js guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- Cloudflare Next.js on Workers/OpenNext: https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/supported-features/
- Cloudflare D1 overview: https://developers.cloudflare.com/d1/
- Cloudflare D1 limits: https://developers.cloudflare.com/d1/platform/limits/
- Drizzle with Cloudflare D1: https://orm.drizzle.team/docs/connect-cloudflare-d1
- Keystatic Next.js installation: https://keystatic.com/docs/installation-next-js
- Keystatic overview: https://keystatic.com/
- Local Keystatic summary for Duit.co.id: `docs/KEYSTATIC_DOCS.md`
- Clerk Next.js SDK: https://clerk.com/docs/nextjs/overview
