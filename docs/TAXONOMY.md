# Content Taxonomy & Filtering System

The "My Feed" discovery engine uses the following taxonomy to filter and display personalized content (articles/tools).

## Important: Tiers Are Filters, Not Paywalls

**All content on Duit.co.id is free and accessible to everyone.** The tier system (tier 0-4) serves as:
- ✅ **Relevance filters** - helps users find content appropriate for their financial situation
- ✅ **Personalization mechanism** - quiz results suggest starting point
- ✅ **Curriculum organization** - structured learning paths

**Tiers do NOT:**
- ❌ Restrict access to higher tiers
- ❌ Require payment to unlock
- ❌ Act as subscription levels
- ❌ Gate content behind paywalls

Users can freely browse and access ALL articles across ALL tiers regardless of their quiz-assigned tier.

## 1. Income Tier (Primary Filter)

**Important:** Tiers are determined by quiz results using income ranges AND asset-based overrides. See `docs/QUIZ_SPECIFICATION.md` for complete logic.

### Income Ranges (Monthly Net Income)

| Tier | Income Range | Label | Focus |
|------|-------------|-------|-------|
| `tier-0-survival` | < Rp 5 juta OR high debt | Survival (Bertahan) | Debt relief, pinjol defense, survival budgeting |
| `tier-1-hustler` | Rp 5 juta - Rp 10 juta | Hustler (Pekerja Keras) | Side hustles, high-income skills, zero-risk business |
| `tier-2-scaler` | Rp 10 juta - Rp 100 juta | Scaler (Penskala) | Financial planning, paper assets, business scaling |
| `tier-3-asset-builder` | Rp 100 juta - Rp 1 milyar | Asset Builder (Pembangun Aset) | Franchise, property/real estate, retirement planning |
| `tier-4-legacy` | > Rp 1 milyar | Legacy Maker (Pewaris) | Holding companies, wealth protection, succession |

### Asset-Based Tier Override

Users can be classified in a higher tier based on total assets, even if income is lower:

| Total Assets | Minimum Tier | Rationale |
|-------------|--------------|-----------|
| > Rp 500 juta | Tier 2 | Has significant wealth despite lower income |
| > Rp 5 milyar | Tier 3 | Substantial asset base, needs advanced strategies |
| > Rp 50 milyar | Tier 4 | UHNWI, requires legacy and protection planning |

**Logic:** `tier = max(income_tier, asset_tier)` - User gets the higher of the two classifications.

### Debt Override

Users with high debt level are automatically classified as **Tier 0** regardless of income/assets, as they need immediate survival guidance.

`tier-0-survival`: Debt relief, survival budgeting, pinjol defense.
`tier-1-hustler`: Side hustles, high-income skills, zero-risk business models.
`tier-2-scaler`: Systematization, scaling business, paper assets (mutual funds, bonds).
`tier-3-asset-builder`: Investments, real estate, franchise.
`tier-4-legacy`: Holding companies, wealth protection, succession planning.

## 2. Gender (Specific Interest Filter)
Certain business ideas or tools are specifically relevant to a particular gender or both.
- `male`: Content specifically targeting men (e.g., specific manual labor side hustles).
- `female`: Content specifically targeting women (e.g., specialized service-based consulting or female-led entrepreneurship niches).
- `unisex`: Content relevant to all genders (e.g., general stock market investing, tax laws).

**Filtering Logic:**
- If user is `male`, display: `male` + `unisex`.
- If user is `female`, display: `female` + `unisex`.
- If user is `other/prefer-not-to-say`, display: `unisex`.

## 3. Age Group
- `muda`: Fresh graduates, university students.
- `produktif`: Active workers, families.
- `pensiun`: Retirement planning, passive income focus.

## 4. Other Taxonomy Filters
- **Location:** `desa`, `kota`, `global`.
- **Education:** `sma`, `s1`, `s2`, `spesialis`.
- **Category:** `karir`, `bisnis`, `legal`, `investasi`, `hukum`.

## 5. SEO & Metadata Fields
- **title:** Article title (displayed in page header, SEO title, social shares)
- **description:** SEO meta description (150-160 characters for optimal SERP display)
- **image:** Featured image URL path (e.g., `/images/artikel/panduan-lunas-pinjol.jpg`)
- **slug:** URL-friendly identifier (e.g., `panduan-lunas-pinjol`)
- **author:** Author name or team (e.g., `Duit.co.id Team`)
- **date:** Publication date in ISO format (`YYYY-MM-DD`)
- **read_time:** Estimated reading time (e.g., `8 min`)

## 6. Content Gate & Premium Fields
- **is_premium:** `true/false` - Indicates if content requires authentication
- **youtube_lock:** `true/false` - Requires YouTube subscription to unlock

## 7. Complete Frontmatter Schema
Every Markdown content file MUST include these fields in its YAML frontmatter:

```yaml
---
# Required: SEO & Metadata
title: "Panduan Lengkap Bebas dari Jerat Pinjol Online"
description: "Strategi step-by-step untuk melunasi hutang pinjol dan melindungi diri dari praktik ilegal"
date: "2026-04-18"
author: "Duit.co.id Team"
slug: "panduan-lunas-pinjol"
image: "/images/artikel/panduan-lunas-pinjol.jpg"
read_time: "10 min"

# Required: Primary Taxonomy (Filtering)
tier: "tier-0-survival"
gender: "unisex"
age: "produktif"
location: "kota"
education: "sma"

# Required: Categorization
category: ["hukum", "keuangan"]
tags: ["pinjol", "debt relief", "hutang", "perlindungan konsumen"]

# Required: Content Access Control
is_premium: false
youtube_lock: false
access_level: "open" # open, share_gate, youtube_gate, register_gate, paid
---
```

### Access Level Definitions

| `access_level` | Behavior |
|----------------|----------|
| `open` | Fully accessible, no action required |
| `share_gate` | Must share on social media to unlock |
| `youtube_gate` | Must subscribe to YouTube to unlock |
| `register_gate` | Must create account to access |
| `paid` | Must purchase (e-course, premium content) |

**Note:** Access levels are used to encourage virality and community growth, NOT to restrict knowledge. All article content can be unlocked through free actions (sharing, subscribing, registering). Only premium e-courses require payment, but even those can be unlocked through social actions (see docs/VIRALITY_STRATEGY.md).

## 8. Field Validation Rules

### Tier Values
- Must be one of: `tier-0-survival`, `tier-1-hustler`, `tier-2-scaler`, `tier-3-asset-builder`, `tier-4-legacy`

### Gender Values
- `male`, `female`, `unisex`

### Age Values
- `muda` (18-25 years), `produktif` (26-55 years), `pensiun` (55+ years)

### Location Values
- `desa` (rural), `kota` (urban), `global` (international/remote)

### Education Values
- `sma` (high school), `s1` (bachelor), `s2` (master), `spesialis` (specialist/PhD)

### Category Values
- `karir`, `bisnis`, `legal`, `investasi`, `hukum`, `keuangan`

### Tags
- Comma-separated lowercase strings with hyphens (e.g., `pinjol`, `debt-relief`)

## 9. Filtering Logic

### Gender Filter
- If user is `male`, display: `male` + `unisex`
- If user is `female`, display: `female` + `unisex`
- If user is `other/prefer-not-to-say`, display: `unisex`

### Tier Filter
- Users see content matching their quiz-assigned tier AND lower tiers
- Example: Tier 2 user sees tier-0, tier-1, and tier-2 content

### Category Filter
- Multi-select: articles can belong to multiple categories
- Displayed as badges on ArticleCard components
