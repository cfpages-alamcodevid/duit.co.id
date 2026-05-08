# Duit.co.id Frontend Progress Checklist

## Immediate Owner Actions: Cloudflare Secrets & Cost Discipline
- [x] Create Cloudflare env/secrets checklist: `docs/CLOUDFLARE_ENV_SECRETS.md`.
- [x] Research current free-tier limits and cost guardrails: `docs/FREE_TIER_COST_STRATEGY.md`.
- [x] Create SEO NLP/linkable asset matrix from `docs/ARTICLE_CATALOG.md`: `docs/SEO_LINKABLE_ASSET_MATRIX.md`.
- [x] Create feature plan for linkable tools/resources and decide static catalog first: `docs/LINKABLE_TOOLS_FEATURE_PLAN.md`.
- [x] Create static client-side tools catalog and resource seed data: `src/data/toolsCatalog.ts`.
- [x] Replace `/tools` with automatic catalog-driven cards.
- [x] Add listing routes: `/kalkulator`, `/template`, `/direktori`, `/ceklist`, `/resources`.
- [x] Add dynamic client-side tool routes for all planned linkable assets.
- [x] Implement MVP client-side calculators/templates/checklists/directories without server calls.
- [x] Upgrade calculator UX with Rupiah-formatted money inputs, text-based numeric fields without browser spinners, field icons, and custom instant tooltips.
- [ ] Fill Cloudflare Pages production variables: `NODE_VERSION`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_ENV`.
- [ ] Fill Clerk production/preview keys: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, `CLERK_JWKS_URL`.
- [ ] Fill Duitku sandbox keys: `DUITKU_ENV`, `DUITKU_MERCHANT_CODE`, `DUITKU_API_KEY`, `DUITKU_V2_BASE_URL`.
- [ ] Create Cloudflare bindings: D1 `DB`, R2 `MEDIA_BUCKET`, KV `CACHE_KV`, `SESSION_KV`, `RATE_LIMIT_KV`.
- [ ] Fill public support variables: `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_SUPPORT_PHONE`, `NEXT_PUBLIC_SUPPORT_WHATSAPP`, `NEXT_PUBLIC_BUSINESS_ADDRESS`.
- [ ] Decide whether Cloudinary is needed now or deferred in favor of R2 + Cloudflare Images transformations.
- [ ] Review high-priority linkable assets and pick first 3 to build: debt payoff calculator, digital safety checklist, government/legal aid directory.
- [ ] Deepen formulas/content for each tool after first real user feedback.

## Duitku Payment Gateway Onboarding
- [x] Research official Duitku Payment Gateway, POP, V2 API, callback, transaction status, and sandbox testing docs.
- [x] Create local integration research doc: `docs/DUITKU_PAYMENT_GATEWAY.md`.
- [x] Create onboarding checklist: `docs/DUITKU_ONBOARDING_CHECKLIST.md`.
- [x] Add mock product catalog, support contact, tester account, and checkout payload data: `src/data/duitkuCommerceMock.ts`.
- [x] Decide to use Duitku V2 custom UI instead of POP so checkout can match Duit.co.id design.
- [x] Display pilot paid course with description and Rupiah price on `/akademi/blueprint-bebas-utang`.
- [ ] Display support email, phone/WhatsApp, and business address on public website.
- [x] Add native checkout route and purchase flow for `/checkout/blueprint-bebas-utang`.
- [x] Add Cloudflare Pages Function for Duitku V2 sandbox payment methods.
- [x] Add Cloudflare Pages Function for Duitku V2 sandbox create transaction/inquiry.
- [x] Add Cloudflare Pages Function for Duitku callback signature verification.
- [ ] Create real Clerk tester account for Duitku onboarding.
- [ ] Run sandbox payment test end-to-end.
- [ ] Reply to Duitku onboarding team with product URL, support contact, checkout URL, sandbox status, and tester login.

## D1 User Tracking & Profile
- [x] Create D1 architecture doc: `docs/D1_ARCHITECTURE.md`.
- [x] Create D1 schema SQL: `docs/sql/d1_user_tracking_schema.sql`.
- [x] Add JWT-protected `/api/profile` Pages Function backed by D1.
- [x] Add `/profil` page with one-time birthday lock and custom warning UI.
- [x] Add visually grouped WhatsApp input with country code selector and flags.
- [x] Sync saved D1 profile fields into Clerk metadata after successful save.
- [x] Update checkout creation/callback Functions to write `orders` and paid course enrollment to D1 when `DB` binding exists.
- [ ] Run D1 schema execute against remote database.
- [ ] Fill `CLERK_JWKS_URL` and bind D1 `DB` in Cloudflare Pages.
- [ ] Add article-read tracking endpoint and wire article pages.
- [ ] Add course module progress UI and tracking.

## Clerk Next.js Authentication
- [x] Research official Clerk Next.js App Router docs, middleware, route handlers, auth helper, components, appearance, hooks, and metadata.
- [x] Create local auth implementation doc: `docs/CLERK_NEXTJS.md`.
- [x] Decide to use heavily customized Clerk components before considering fully custom hook-based auth forms.
- [x] Install `@clerk/nextjs`.
- [ ] Add Clerk environment variables locally and in Cloudflare.
- [x] Add conditional `ClerkProvider` and Duit.co.id `appearance` config.
- [x] Build `/login` with Login/Register tabs and native Duit.co.id layout.
- [x] Replace Clerk prebuilt auth UI with static-export-safe custom client forms after Cloudflare rejected Server Actions.
- [x] Remove `@clerk/nextjs` runtime imports/dependency and use `@clerk/react` for static export compatibility.
- [x] Remove server `searchParams` usage from `/login` so Cloudflare static prerender can export the route.
- [x] Add `/register` as register-first auth page.
- [x] Add `/debug/clerk` env/secret status page without exposing secret values.
- [x] Add navbar auth controls with fallback when Clerk env is missing.
- [x] Remove internal Clerk wording from auth page and make navbar auth the rightmost CTA.
- [x] Add Google login/register via Clerk OAuth with custom callback route.
- [ ] Add `src/middleware.ts` protected route rules after leaving static export / enabling runtime.
- [ ] Create real tester account for Duitku onboarding.

## Project Setup
- [x] Initialize `package.json`
- [x] Configure Tailwind CSS & PostCSS
- [x] Configure TypeScript & Vite
- [x] Define Global Styles & Glassmorphism (src/index.css)
- [x] Create Directory Structure
- [x] Routing Setup (App.tsx)
- [x] Create `index.html` entry point

## Content & Research
- [x] Research 0.1: Panduan Lunas Pinjol (Tier 0)
- [x] Research 0.2: Hadapi Debt Collector Ilegal (Tier 0) - **Upgraded to 11-part standard**
- [x] Research 0.3: Panduan DC Lapangan (Tier 0) - **11-part standard**
- [x] Research 0.4: Langkah Hukum Pinjol (Tier 0) - **11-part standard**
- [x] Research 0.5: Lapor Pinjol Ilegal (Tier 0) - **11-part standard**
- [x] Research 0.6: Budgeting Darurat UMR (Tier 0)
- [x] Research 0.7: Emergency Fund Murah (Tier 0)
- [x] Research 0.8: Negosiasi Utang (Tier 0)
- [x] Research 0.9: Perlindungan Debitur (Tier 0)
- [x] Research 0.10: Pinjol Legal vs Ilegal (Tier 0)
- [x] Research 0.11: Tanda Pinjol Berbahaya (Tier 0)
- [x] Article 0.1: Panduan Lunas Pinjol
- [x] Article 0.2-0.11: All 10 Tier 0 Articles Written

## Core UI Components (src/components/ui)
- [x] `GlassCard`
- [x] `GoldShineButton` (with interactive shine)
- [x] `GreenButton`
- [x] `ArticleCard`
- [ ] `CurrencyInput`
- [ ] `ResultDisplay`
- [ ] `LawBadge`

## Shared Components (src/components/shared)
- [x] `AppShell`
- [x] `Navbar`
- [x] `Footer`
- [ ] `Sidebar`
- [ ] `SEO`

## Pages & Routing (src/pages)
- [x] Home Page (`/`)
- [x] Quiz Page (`/quiz`)
- [x] Dashboard Page (`/dashboard`)
- [x] Profile Page (`/profile`)
- [x] Knowledge Hub (`/knowledge`)
- [x] Knowledge Detail (`/knowledge/[slug]`)
- [x] Tools Center (`/tools`)
- [x] Law Library canonical route (`/hukum`, legacy alias `/law`)
- [x] Academy Page canonical route (`/akademi`, legacy alias `/academy`)
- [x] Academy course landing pages (`/akademi/[slug]`)
- [x] Clean academy public copy so it speaks to prospective learners instead of exposing internal planning language.
- [x] Experts Page canonical route (`/ahli`, legacy alias `/experts`)
- [ ] About Page (`/about`)
- [ ] Contact Page (`/contact`)

## Integration & Logic
- [x] Financial Quiz Logic (Basic Tiering)
- [ ] Tier-based Filtering
- [ ] Markdown Rendering
- [x] Framer Motion Interactions (Buttons & Page transitions)
