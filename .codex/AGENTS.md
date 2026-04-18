# Duit.co.id - Qwen Code Project Context

## Project Overview
**Duit.co.id** is Indonesia's #1 financial ecosystem platform providing personalized solutions based on economic tiers (Tier 0-4), education, domicile, and age through educational content, practical tools, and bridges to professional services.

## Tech Stack
- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend API:** Cloudflare Workers + Hono (Edge computing)
- **Deployment:** Cloudflare Pages
- **Database:** Cloudflare D1 (SQLite)
- **Authentication:** Clerk or Kinde
- **Content Management:** File-based Markdown CMS with YAML frontmatter (see docs/CMS.md)
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
├── artikel/             # Markdown articles with frontmatter (CMS content)
│   ├── tier-0-survival/
│   ├── tier-1-hustler/
│   ├── tier-2-scaler/
│   ├── tier-3-asset-builder/
│   └── tier-4-legacy/
├── docs/                # Project documentation
│   ├── DESIGN.md        # Design system specifications
│   ├── COMPONENTS.md    # Component inventory and usage
│   ├── PAGES.md         # Sitemap and routing structure
│   ├── TAXONOMY.md      # Content filtering and categorization
│   ├── DATABASE.md      # Database schema and indexing
│   ├── CMS.md           # File-based CMS workflow and guidelines
│   ├── BUGS.md          # Bug log and troubleshooting history
│   └── prd/             # Product Requirement Documents
├── .qwen/
│   └── agents/          # Qwen Code subagents
└── config files         # vite.config.ts, tailwind.config.js, tsconfig.json
```

## Key Documentation References

### 1. Architecture & Routing (docs/PAGES.md)
- **Public Pages:** Home (/), Quiz (/quiz), About (/about), Contact (/contact)
- **Authentication:** /login, /register, /forgot-password (Clerk with Google OAuth)
- **Dashboard:** /dashboard (My Feed), /profile
- **Knowledge Hub:** /knowledge with tier-based routes and /[slug] for articles
- **Tools Center:** /tools with category routes (survival, hustler, scaler, investor)
- **Academy:** /academy (e-courses), /academy/[course-slug], /academy/my-courses
- **Law Library:** /law, /law/regulasi
- **Marketplace:** /experts, /solutions/franchise, /solutions/property, /solutions/certificate

### 2. Quiz & Tier Classification (docs/QUIZ_SPECIFICATION.md)
Users are classified via quiz with income ranges AND asset-based overrides:

| Tier | Monthly Income | Asset Override | Label |
|------|---------------|----------------|-------|
| Tier 0 | < Rp 5 juta OR high debt | N/A (debt override) | Survival |
| Tier 1 | Rp 5-10 juta | - | Hustler |
| Tier 2 | Rp 10-100 juta | > Rp 500 juta | Scaler |
| Tier 3 | Rp 100 juta - Rp 1 milyar | > Rp 5 milyar | Asset Builder |
| Tier 4 | > Rp 1 milyar | > Rp 50 milyar | Legacy Maker |

**Important:** Tiers are FILTERS, NOT PAYWALLS. All users can access ALL content freely.

### 3. Content Taxonomy (docs/TAXONOMY.md)
**Primary Filters:**
- **Income Tier:** tier-0-survival, tier-1-hustler, tier-2-scaler, tier-3-asset-builder, tier-4-legacy
- **Gender:** male, female, unisex (filtering: male→male+unisex, female→female+unisex, other→unisex)
- **Age Group:** muda, produktif, pensiun
- **Location:** desa, kota, global
- **Education:** sma, s1, s2, spesialis
- **Category:** karir, bisnis, legal, investasi, hukum, keuangan

**Access Levels (docs/VIRALITY_STRATEGY.md):**
- `open`: Fully accessible (Tier 0-1 articles)
- `share_gate`: Share on social media to unlock
- `youtube_gate`: Subscribe to YouTube to unlock
- `register_gate`: Create free account to access
- `paid`: Premium e-courses (can also unlock via social actions)

### 4. Database & User Tracking (docs/DATABASE.md)
**Important:** Articles are NOT stored in database. They are file-based Markdown in `/artikel/`.

**Cloudflare D1 (SQLite) Tables:**
- **users:** User profiles with income_tier, total_assets, monthly_business_revenue, membership_status
- **visitor_fingerprints:** Anonymous visitor tracking via FingerprintJS (1 free article limit)
- **user_unlocks:** Content unlock events (YouTube, social shares, registration)
- **content_shares:** Social share tracking for share-to-unlock mechanism
- **tool_logs:** Tool usage analytics
- **leads_referral:** Comprehensive lead tracking (phone, WhatsApp, email, forms) with dedicated tracking numbers
- **course_progress:** E-course module progress and unlock methods

### 5. Component System (docs/COMPONENTS.md)
**Global/Shared:** AppShell, Navbar, Footer, Sidebar, SEO, GlassCard, GoldShineButton, GreenButton, FingerprintGate, MemberWall, AccessGateWrapper
**Landing:** HeroSection, ValuePropGrid, SocialProof
**Discovery:** FinancialQuiz, TierBanner, MyFeedGrid, RecommendationSection
**Content:** ArticleCard, MarkdownRenderer, TableOfContents, LawBadge, YouTubeLockGate, ShareUnlockModal, YouTubeEmbed, ExpertCTA, LeadTracker
**Tools:** ToolWrapper, CurrencyInput, ResultDisplay, PDFGeneratorButton
**Marketplace:** ExpertDirectoryCard, ProductCard, TrustBadge

### 6. Content & Virality Strategy (docs/VIRALITY_STRATEGY.md)

**Core Philosophy:** "Pay with Action, Not Money"
- All content fundamentally FREE
- Users unlock via actions: share, subscribe, register, refer
- Syamsul Alam (founder) does NOT monetize from members directly

**Monetization (Third-Party Only):**
- Affiliate referrals: Franchise.id, Properti.id, Sertifikat.co.id
- Expert marketplace: 25% platform fee on expert course sales
- Lead generation: Partner consultations via dedicated tracking numbers

**Member Wall (Anonymous Visitors):**
- 1 full article free (tracked via FingerprintJS)
- After 1 article: 30% preview + "Register for Free" modal
- FingerprintJS works even in incognito mode

**E-Course Model:**
- By Duit.co.id Team: FREE for all registered users
- By Expert Providers: Priced by expert, user can pay OR unlock via social actions
- Duit.co.id takes 25% platform fee from expert sales

### 7. Content Repurposing (docs/CONTENT_REPURPOSING.md)
- Every article MUST have companion YouTube video
- Repurpose across 10+ platforms: YouTube, Twitter, Instagram, LinkedIn, TikTok, Email, Reddit
- All CTAs point back to original article on Duit.co.id
- Add `youtube_url` to frontmatter when video is ready

### 8. Bug History (docs/BUGS.md)
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
- **CMS System:** File-based Markdown in `/artikel/{tier}/{slug}.md` (see docs/CMS.md)
- **Publication Schedule:** Use `docs/PUBLICATION_SCHEDULE.json` for bulk planning and date allocation
- **Publish Date Rule:** `date` must be unique per article slug; bulk runs must backdate with max 1 article/day
- **Optional Timestamp:** `published_at_wib` format `YYYY-MM-DD HH:mm WIB` for internal audit/scheduling
- **Access Control:** Tiers are filters, NOT paywalls. All content accessible (see docs/VIRALITY_STRATEGY.md)
- **FingerprintJS:** Tracks anonymous visitors, enforces 1 free article limit
- Use `gray-matter` for frontmatter parsing
- Use `react-markdown` + `remark-gfm` for MD→HTML rendering
- Use `@tailwindcss/typography` plugin for prose styling
- Use `FlexSearch` for client-side search on `search-index.json`
- Vite plugin scans `/artikel/` and generates search index at build time
- **YouTube Integration:** Every article must have companion video (frontmatter `youtube_url`)

### Monetization
- **Third-party integration:** Franchise.id, Properti.id, Sertifikat.co.id (affiliate/referral)
- **E-courses:** By Duit.co.id Team = FREE; By Experts = priced, 25% platform fee
- **Expert consultations:** Lead generation via dedicated tracking numbers
- **NO tier-based payments:** All knowledge is free and accessible
- **NO direct monetization from members by founder** (Syamsul Alam philosophy)

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

## Session Context Management

### Session Summaries
All session summaries are stored in `.context/` directory (gitignored) with the naming convention:
```
.context/YYYY-MM-DD-session-summary.md
```

**How to use:**
- **Before starting a new session:** Read the most recent summary in `.context/` to understand what was done previously
- **During a session:** Reference this file for context on architecture decisions and completed tasks
- **At the end of each session:** Create a new summary file in `.context/` with the current date (WIB timezone)
- **Include:** Tasks completed, files changed, build status, bugs found, design decisions, next steps

**The `.context/` folder is gitignored** — summaries are for local development reference only.

**Example:**
```
.context/2026-04-18-session-summary.md  ← Current session
.context/2026-04-25-session-summary.md  ← Next session
```

## ⚠️ CRITICAL: Shell Command Safety Rules

### General Rules
- **NEVER run shell commands that terminate processes** unless specifically requested
- **Development server (`npm run dev`) runs in background mode** - always use `is_background: true` for dev server
- **Safe commands:** git operations, file reads, builds, tests, npm install, etc.
- **Dangerous commands (require confirmation):** rm -rf, git reset --hard, force-push

### Process Management & Restart Guidelines
- **Killing ALL node processes will also terminate Qwen Code session** and localhost access
- **NEVER use broad kill commands** like `taskkill /F /IM node.exe` or `killall node` - these will crash the Qwen session
- **Targeted process restart is SAFE when done correctly:**
  - ✅ **SAFE:** `taskkill /F /T /PID <pid>` using the specific PID from the background command output
  - ✅ **SAFE:** `taskkill /F /PID <pid>` for the exact dev server process
  - ❌ **DANGEROUS:** `taskkill /F /IM node.exe` - kills ALL node processes including Qwen
  - ❌ **DANGEROUS:** Any command that kills by process name instead of PID
- **If stopping/restarting is needed:**
  1. Use the PID from the background command output (e.g., "PID: 171844")
  2. Target ONLY that specific process: `taskkill /F /T /PID 171844`
  3. Then restart with `npm run dev` (background mode)
- **Always verify** the PID before killing to avoid terminating the wrong process

### Summary
- **Do:** Use targeted PID-based taskkill for dev server restart
- **Don't:** Use name-based taskkill or kill-all commands
- **Rule:** Specific PID = Safe | Process name/IM = Dangerous

## Subagents
Qwen Code subagents are located in `.qwen/agents/` and provide specialized assistance for:
- **Agent Creator:** Creating new custom subagents
- **Bug Fixer:** Diagnosing and fixing build/runtime errors
- **Code Editor:** Performing surgical, non-destructive code edits
- **Frontend Expert:** Building UI components adhering to design specs

Refer to `.qwen/agents/*.md` for agent-specific workflows and tool permissions.

## Collaboration Changelog Protocol
- After any file/content change, append one entry to CHANGELOG.md.
- Timestamp must use WIB and minute precision: YYYY-MM-DD HH:mm WIB.
- Use this row format: | timestamp_wib | agent | provider | summary | files |.
- Keep summary concise and readable across providers/languages.
