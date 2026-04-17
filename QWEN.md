# Duit.co.id - Qwen Code Project Context

## Project Overview
**Duit.co.id** is Indonesia's #1 financial ecosystem platform providing personalized solutions based on economic tiers (Tier 0-4), education, domicile, and age through educational content, practical tools, and bridges to professional services.

## Tech Stack
- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend API:** Cloudflare Workers + Hono (Edge computing)
- **Deployment:** Cloudflare Pages
- **Database:** Cloudflare D1 (SQLite)
- **Authentication:** Clerk or Kinde
- **Content Management:** Sanity.io or Markdown-based
- **Caching/Session:** Cloudflare KV

## Design System: "The Sovereign Vault"
- **Philosophy:** High-end private bank aesthetic - modern, clean, prestigious
- **Core Style:** Glassmorphism with shadcn UI and Tailwind CSS
- **Backgrounds:** Light theme (white #FFFFFF to light gray #F8F9FA), Dark theme (true black #000000)
- **Glass Components:** Semi-transparent with high backdrop-blur (20px-40px)
- **Shadows:** Extra soft, diffused: `0px 20px 40px rgba(0, 0, 0, 0.04)` (Light) / `0px 20px 40px rgba(255, 255, 255, 0.02)` (Dark)
- **Borders:** 1px "Ghost Borders" with 10-15% opacity
- **Primary Accent:** Deep Money Green (#004D40 or similar)
- **Secondary Accent:** Aureum Gold gradient with cursor-following shine effect
- **Typography:** Premium sans-serif (Manrope or Inter)
- **Motion:** Framer Motion for smooth transitions and cursor-tracking effects

### Design Rules
- No hard lines - use whitespace and tonal shifts instead of solid dividers
- Every floating element must be glassmorphic
- Buttons: Primary (Money Green gradient), Premium (Aureum Gold with cursor shine)
- Cards: Glassmorphic with 24px-32px internal padding
- Consistent light/dark mode transitions

## Project Structure
```
duit.co.id/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn primitives (GlassCard, GoldShineButton, etc.)
│   │   ├── shared/      # global layouts (AppShell, Navbar, Footer)
│   │   └── pages/       # page-specific components
│   ├── pages/           # Route-based page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── main.tsx         # Entry point
├── content/
│   └── artikel/         # Markdown articles with frontmatter
├── docs/                # Project documentation
│   ├── DESIGN.md        # Design system specifications
│   ├── COMPONENTS.md    # Component inventory and usage
│   ├── PAGES.md         # Sitemap and routing structure
│   ├── TAXONOMY.md      # Content filtering and categorization
│   ├── DATABASE.md      # Database schema and indexing
│   ├── BUGS.md          # Bug log and troubleshooting history
│   └── prd/             # Product Requirement Documents
├── .qwen/
│   └── agents/          # Qwen Code subagents
└── config files         # vite.config.ts, tailwind.config.js, tsconfig.json
```

## Key Documentation References

### 1. Architecture & Routing (docs/PAGES.md)
- **Public Pages:** Home (/), Quiz (/quiz), About (/about), Contact (/contact)
- **Authentication:** /login, /register, /forgot-password
- **Dashboard:** /dashboard (My Feed), /profile
- **Knowledge Hub:** /knowledge with tier-based routes (tier-0-survival through tier-4-legacy)
- **Tools Center:** /tools with category routes (survival, hustler, scaler, investor)
- **Law Library:** /law, /law/regulasi
- **Marketplace:** /academy, /experts, /solutions/franchise, /solutions/property

### 2. Content Taxonomy (docs/TAXONOMY.md)
**Primary Filters:**
- **Income Tier:** tier-0-survival, tier-1-hustler, tier-2-scaler, tier-3-asset-builder, tier-4-legacy
- **Gender:** male, female, unisex (filtering: male→male+unisex, female→female+unisex, other→unisex)
- **Age Group:** muda, produktif, pensiun
- **Location:** desa, kota, global
- **Education:** sma, s1, s2, spesialis
- **Category:** karir, bisnis, legal, investasi, hukum

**Markdown Frontmatter Requirements:**
```yaml
---
title: "Article Title"
description: "SEO description"
date: "YYYY-MM-DD"
author: "Author Name"
slug: "url-slug"
image: "/images/thumbnail.jpg"
tier: "tier-1-hustler"
gender: "unisex"
age: "produktif"
location: "kota"
education: "s1"
tags: ["tag1", "tag2"]
youtube_lock: true/false
is_premium: true/false
---
```

### 3. Database Schema (docs/DATABASE.md)
**Cloudflare D1 (SQLite) Tables:**
- **users:** User profiles from quiz (id, email, income_tier, location_type, edu_level, age_group, yt_subscribed)
- **user_unlocks:** YouTube-gated content tracking (user_id, content_slug, unlocked_at)
- **tool_logs:** Tool usage analytics (user_id, tool_name, input_summary)
- **leads_referral:** Partner conversion tracking (user_id, partner_type, partner_name, status)

### 4. Component System (docs/COMPONENTS.md)
**Global/Shared:** AppShell, Navbar, Footer, Sidebar, SEO, GlassCard, GoldShineButton, GreenButton
**Landing:** HeroSection, ValuePropGrid, SocialProof
**Discovery:** FinancialQuiz, TierBanner, MyFeedGrid, RecommendationSection
**Content:** ArticleCard, MarkdownRenderer, TableOfContents, LawBadge, YouTubeLockGate
**Tools:** ToolWrapper, CurrencyInput, ResultDisplay, PDFGeneratorButton
**Marketplace:** ExpertDirectoryCard, ProductCard, ExpertCTA, TrustBadge

### 5. Bug History (docs/BUGS.md)
Review this file before troubleshooting to avoid repeating past mistakes.

## Development Guidelines

### Code Standards
- **TypeScript:** Strict mode, all components must have typed props (interfaces)
- **Tailwind:** Use utility classes exclusively for styling
- **Components:** Follow structure rules in docs/COMPONENTS.md
- **Location:** 
  - `src/components/ui/` for primitives (shadcn-style)
  - `src/components/shared/` for global layouts
  - `src/components/pages/` for page-specific logic

### Content Processing
- Use `gray-matter` for frontmatter parsing
- Use `react-markdown` + `remark-gfm` for MD→HTML rendering
- Use `@tailwindcss/typography` plugin for prose styling
- Use `FlexSearch` for client-side search on `search-index.json`

### YouTube Gate Mechanism
- Custom Script Gate: Track user action in database on subscribe button click
- Redirect to `youtube.com/c/duitcoid?sub_confirmation=1`
- Advanced: Google OAuth with YouTube API for 100% accurate verification

### Recommended Libraries
- **Icons:** lucide-react
- **Forms:** react-hook-form + zod (validation)
- **Animation:** framer-motion
- **Charts:** recharts
- **Markdown:** react-markdown + remark-gfm + gray-matter
- **PDF:** jspdf or react-pdf

## Financial Tiers & Curriculum

### Tier 0: Survival
Focus: Debt relief, pinjol defense, survival budgeting

### Tier 1: The Hustler
Target: Youth, fresh graduates, UMR workers
Focus: High-income skills, side hustles, zero-risk business models, basic financial defense

### Tier 2: The Scaler
Target: Managers, professionals, small business owners
Focus: Financial planning, paper assets (mutual funds, bonds, blue-chip stocks), business scaling

### Tier 3: Asset Builder
Target: Successful entrepreneurs, high-level executives
Focus: Franchise strategy (→Franchise.id), property/real estate (→Properti.id), retirement business planning

### Tier 4: Legacy Maker
Target: Ultra-High Net Worth Individuals (UHNWI)
Focus: Corporate structuring, tax optimization, wealth protection, succession planning, Family Office

## Monetization Strategy
1. **Affiliate Hooks:** Contextual affiliate links in calculator results
2. **Lead Generation:** Consultation forms → WhatsApp/Email notifications to partners (Cloudflare Workers + Mailchannels/Twilio)
3. **Digital Products:** Payment integration (Midtrans/Xendit) for /academy e-courses
4. **External Bridges:** Franchise.id, Properti.id

## Non-Functional Requirements
- **SEO:** react-helmet-async for dynamic metadata
- **Security:** Cloudflare WAF for bot/DDoS protection
- **Performance:** LCP < 1.2 seconds via Cloudflare Global Edge Network
- **Idle Management:** Cloudflare D1 + Workers (0ms cold start, always responsive)

## Development Workflow
1. Read relevant docs in `docs/` before implementing
2. Follow design specifications in `docs/DESIGN.md` strictly
3. Build reusable, typed components
4. Test with `npm run dev` (port 7777)
5. Commit with clear, concise messages explaining "why" not "what"

## Subagents
Qwen Code subagents are located in `.qwen/agents/` and provide specialized assistance for:
- **Agent Creator:** Creating new custom subagents
- **Bug Fixer:** Diagnosing and fixing build/runtime errors
- **Code Editor:** Performing surgical, non-destructive code edits
- **Frontend Expert:** Building UI components adhering to design specs

Refer to `.qwen/agents/*.md` for agent-specific workflows and tool permissions.
