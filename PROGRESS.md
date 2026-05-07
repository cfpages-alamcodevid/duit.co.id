# Duit.co.id Frontend Progress Checklist

## Immediate Owner Actions: Cloudflare Secrets & Cost Discipline
- [x] Create Cloudflare env/secrets checklist: `docs/CLOUDFLARE_ENV_SECRETS.md`.
- [x] Research current free-tier limits and cost guardrails: `docs/FREE_TIER_COST_STRATEGY.md`.
- [x] Create SEO NLP/linkable asset matrix from `docs/ARTICLE_CATALOG.md`: `docs/SEO_LINKABLE_ASSET_MATRIX.md`.
- [ ] Fill Cloudflare Pages production variables: `NODE_VERSION`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_ENV`.
- [ ] Fill Clerk production/preview keys: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`.
- [ ] Fill Duitku sandbox keys: `DUITKU_ENV`, `DUITKU_MERCHANT_CODE`, `DUITKU_API_KEY`, `DUITKU_V2_BASE_URL`.
- [ ] Create Cloudflare bindings: D1 `DB`, R2 `MEDIA_BUCKET`, KV `CACHE_KV`, `SESSION_KV`, `RATE_LIMIT_KV`.
- [ ] Fill public support variables: `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_SUPPORT_PHONE`, `NEXT_PUBLIC_SUPPORT_WHATSAPP`, `NEXT_PUBLIC_BUSINESS_ADDRESS`.
- [ ] Decide whether Cloudinary is needed now or deferred in favor of R2 + Cloudflare Images transformations.
- [ ] Review high-priority linkable assets and pick first 3 to build: debt payoff calculator, digital safety checklist, government/legal aid directory.

## Duitku Payment Gateway Onboarding
- [x] Research official Duitku Payment Gateway, POP, V2 API, callback, transaction status, and sandbox testing docs.
- [x] Create local integration research doc: `docs/DUITKU_PAYMENT_GATEWAY.md`.
- [x] Create onboarding checklist: `docs/DUITKU_ONBOARDING_CHECKLIST.md`.
- [x] Add mock product catalog, support contact, tester account, and checkout payload data: `src/data/duitkuCommerceMock.ts`.
- [x] Decide to use Duitku V2 custom UI instead of POP so checkout can match Duit.co.id design.
- [ ] Display product catalog with descriptions and Rupiah prices on public website.
- [ ] Display support email, phone/WhatsApp, and business address on public website.
- [ ] Add native checkout route and purchase flow.
- [ ] Add Duitku V2 sandbox payment-methods integration.
- [ ] Add Duitku V2 sandbox create-transaction/inquiry integration.
- [ ] Add Duitku callback and transaction status verification.
- [ ] Create real Clerk tester account for Duitku onboarding.
- [ ] Run sandbox payment test end-to-end.
- [ ] Reply to Duitku onboarding team with product URL, support contact, checkout URL, sandbox status, and tester login.

## Clerk Next.js Authentication
- [x] Research official Clerk Next.js App Router docs, middleware, route handlers, auth helper, components, appearance, hooks, and metadata.
- [x] Create local auth implementation doc: `docs/CLERK_NEXTJS.md`.
- [x] Decide to use heavily customized Clerk components before considering fully custom hook-based auth forms.
- [ ] Install `@clerk/nextjs`.
- [ ] Add Clerk environment variables locally and in Cloudflare.
- [ ] Add `ClerkProvider` and Duit.co.id `appearance` config.
- [ ] Add `src/middleware.ts` protected route rules.
- [ ] Build `/login` and `/register` with native Duit.co.id layout.
- [ ] Add navbar auth controls.
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
- [x] Law Library (`/law`)
- [x] Academy Page (`/academy`)
- [x] Experts Page (`/experts`)
- [ ] About Page (`/about`)
- [ ] Contact Page (`/contact`)

## Integration & Logic
- [x] Financial Quiz Logic (Basic Tiering)
- [ ] Tier-based Filtering
- [ ] Markdown Rendering
- [x] Framer Motion Interactions (Buttons & Page transitions)
