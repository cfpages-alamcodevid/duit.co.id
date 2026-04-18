# Duit.co.id: Sitemap & Pages List

This document lists all the pages and routes required for the Duit.co.id platform, serving as the blueprint for frontend development.

## 1. Public Pages (Landing & Acquisition)
- `index.html` (Home): Value proposition, social proof, and "Get Started" CTA.
- `/quiz`: The Multi-step Smart Financial Assessment.
- `/about`: Company vision and "Sovereign Vault" philosophy.
- `/contact`: Contact form and support information.

## 2. Authentication
- `/login`: Secure entry via Clerk/Kinde (email/password or Google OAuth).
- `/register`: Initial signup before or after the quiz. Free membership.
- `/forgot-password`: Password recovery.

**Registration Benefits:**
- Unlimited article access (beyond 1 free article for anonymous)
- E-course enrollment (free courses by Duit.co.id Team)
- Progress tracking
- Bookmark/save articles
- Downloadable resources

**Auth Flow:**
1. User clicks "Register" or "Login"
2. Clerk modal appears (email/password or Google OAuth)
3. If first time → redirect to `/quiz` (optional, can skip)
4. After quiz → redirect to `/dashboard`
5. If skip quiz → redirect to `/knowledge` (browse freely)

## 3. User Dashboard (Personalized)
- `/dashboard` (My Feed): The central hub displaying personalized articles, tools, and recommendations based on User Tier, Age, and Gender.
- `/profile`: Managing user data, quiz retakes, and preferences.

## 4. Knowledge Hub (Siloed by Tier)
- `/knowledge`: Main hub index with search and filters.
- `/knowledge/tier-0-survival`: Debt management and pinjol defense.
- `/knowledge/tier-1-hustler`: High-income skills and side hustles.
- `/knowledge/tier-2-scaler`: Systems, SOPs, and business growth.
- `/knowledge/tier-3-asset-builder`: Property and franchising.
- `/knowledge/tier-4-legacy`: Holding companies and Family Offices.
- `/knowledge/[slug]`: Individual article view with Markdown rendering and YouTube Gate.

## 4b. Article Routes (File-Based CMS)
All articles are stored as `.md` files in `/artikel` folder with YAML frontmatter.

### Content Processing Workflow
1. **Build Time:** Vite plugin scans `/artikel/**/*.md`
2. **Frontmatter Parsing:** Extracts taxonomy metadata via `gray-matter`
3. **Search Index Generation:** Creates `search-index.json` with all article metadata
4. **Runtime:** React Router loads article by slug, fetches markdown, renders with `MarkdownRenderer`
5. **Access Control:** `FingerprintGate` checks anonymous visitor limits, `AccessGateWrapper` applies access level

### Article Route Structure
- `/knowledge/[slug]` → Public article view with access control (canonical URL)
- `/artikel/[slug]` → Redirects to `/knowledge/[slug]` for SEO consistency
- `/knowledge/tier-0-survival` → Filtered index by tier
- `/knowledge/tier-1-hustler` → Filtered index by tier
- `/knowledge/tier-2-scaler` → Filtered index by tier
- `/knowledge/tier-3-asset-builder` → Filtered index by tier
- `/knowledge/tier-4-legacy` → Filtered index by tier

### File Naming Convention
- Filename: `{slug}.md` (e.g., `panduan-lunas-pinjol.md`)
- Location: `/artikel/{tier}/{slug}.md` (organized by tier for maintainability)
- Example: `/artikel/tier-0-survival/panduan-lunas-pinjol.md`

### Article Access Control Flow
```
Anonymous Visitor → Article Page
  ↓
FingerprintGate checks visitor_fingerprints table
  ↓
IF articles_viewed < 1:
  → Full access (increment counter)
ELSE:
  → 30% preview + MemberWall modal ("Register for Free")
  ↓
Registered User → Article Page
  ↓
AccessGateWrapper checks frontmatter access_level
  ↓
IF access_level == 'open':
  → Full access
ELSE IF access_level == 'share_gate':
  → IF has_shared: Full access
  → ELSE: 30% preview + ShareUnlockModal
ELSE IF access_level == 'youtube_gate':
  → IF yt_subscribed: Full access
  → ELSE: Blurred content + YouTubeLockGate
ELSE IF access_level == 'register_gate':
  → Full access (already registered)
ELSE IF access_level == 'paid':
  → IF purchased OR unlocked_via_social_actions: Full access
  → ELSE: Payment modal OR social action options
```

### SEO Considerations
- All articles indexed by search engines (no robots.txt blocking)
- Dynamic meta tags from frontmatter (title, description, og:image)
- Canonical URLs: `/knowledge/[slug]`
- Sitemap.xml includes all article slugs

## 5. Tools Center (Interactive)
- `/tools`: Main tools directory.
- `/tools/survival`: Debt generators and survival budgeting.
- `/tools/hustler`: Pricing calculators and sales scripts.
- `/tools/scaler`: KPI trackers and SOP builders.
- `/tools/investor`: ROI and Cap Rate calculators.

## 6. Law Library
- `/law`: Searchable database of UU (Undang-Undang).
- `/law/regulasi`: Filterable regulations list.
- `/law/[slug]`: Detailed view of specific regulations.

## 7. Academy & E-Courses
- `/academy`: Main e-course catalog with all courses.
- `/academy/[course-slug]`: Individual course page with modules.
- `/academy/my-courses`: User's enrolled courses (requires registration).

**Course Provider Model:**
- **By Duit.co.id Team (Syamsul Alam):** FREE for all registered users
- **By Expert Providers:** Priced by expert, Duit.co.id takes 25% platform fee
- **Access Options for Paid Courses:**
  - Pay directly (Midtrans/Xendit)
  - Unlock modules via social actions (YouTube subscribe, social shares, referrals)

**UI Display:**
- Free courses: "By Duit.co.id Team - GRATIS" tag
- Paid courses: "By [Expert Name] - Rp XXX" tag
- Both show progress bar for enrolled users

## 8. Marketplace & Solutions
- `/experts`: Directory of verified consultants (Notaris, Pajak, etc.).
- `/solutions/franchise`: Bridge to Franchise.id (with dedicated tracking number).
- `/solutions/property`: Bridge to Properti.id (with dedicated tracking number).
- `/solutions/certificate`: Bridge to Sertifikat.co.id (with dedicated tracking number).

## 9. Legal & Footer
- `/privacy`: Privacy policy (Data protection, FingerprintJS disclosure).
- `/terms`: Terms of service.
- `/disclaimer`: Financial and legal disclaimer.
