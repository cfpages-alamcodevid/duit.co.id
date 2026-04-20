# Duit.co.id File-Based CMS Documentation

## 1. Overview

Duit.co.id uses a **file-based Content Management System (CMS)** built on Markdown (`.md`) files with YAML frontmatter. This approach provides:

- **Zero-database overhead:** Articles are static files processed at build time
- **Version control friendly:** All content tracked in Git history
- **Fast performance:** Pre-processed into JSON index for instant client-side search
- **Easy authoring:** Simple Markdown format with structured metadata
- **SEO optimized:** Frontmatter generates dynamic meta tags and Open Graph data

## 2. Article File Structure

### Important: Tiers Organize, Don't Restrict

Articles are organized by tier folder for **maintainability and relevance**, but users can access ALL articles across ALL tiers. The folder structure helps:
- Content creators find relevant topics
- Users discover age/situation-appropriate content
- Personalized feed recommendations

**Users are NOT restricted to their assigned tier folder.**

### Directory Organization
```
artikel/
├── tier-0-survival/
│   ├── panduan-lunas-pinjol.md
│   ├── budgeting-darurat.md
│   └── ...
├── tier-1-hustler/
│   ├── side-hustle-ideas.md
│   ├── skill-high-income.md
│   └── ...
├── tier-2-scaler/
│   ├── business-scaling-sops.md
│   ├── mutual-fund-basics.md
│   └── ...
├── tier-3-asset-builder/
│   ├── franchise-guide.md
│   ├── real-estate-investing.md
│   └── ...
└── tier-4-legacy/
    ├── holding-company-setup.md
    ├── wealth-protection.md
    └── ...
```

### Single Article Format
Each article is a `.md` file with complete YAML frontmatter:

```markdown
---
# SEO & Metadata (Required)
title: "Panduan Lengkap Bebas dari Jerat Pinjol Online"
description: "Strategi step-by-step untuk melunasi hutang pinjol dan melindungi diri dari praktik ilegal"
date: "2026-04-18"
author: "Duit.co.id Team"
slug: "panduan-lunas-pinjol"
image: "/images/artikel/panduan-lunas-pinjol.jpg"
read_time: "10 min"

# Primary Taxonomy (Required - Filtering)
tier: "tier-0-survival"
gender: "unisex"
age: "produktif"
location: "kota"
education: "sma"

# Categorization (Required)
category: ["hukum", "keuangan"]
tags: ["pinjol", "debt relief", "hutang", "perlindungan konsumen"]

# Content Access (Required)
is_premium: false
youtube_lock: false
access_level: "open" # open, share_gate, youtube_gate, register_gate, paid

# YouTube Integration (Optional)
youtube_url: "https://youtube.com/watch?v=VIDEO_ID"
youtube_embed_position: "top" # top, middle, bottom, inline

# Publication Tracking (Recommended)
published_at_wib: "2026-04-18 09:00 WIB" # Optional internal timestamp for scheduling/audit
---

# Panduan Lengkap Bebas dari Jerat Pinjol Online

Introduction paragraph here...

## Step 1: Identifikasi Pinjol Legal vs Ilegal

Content here...

## Step 2: Hitung Total Hutang

Content here...

## Conclusion

Wrap up here...
```

## 3. Frontmatter Field Reference

### Access Level Strategy

**Important:** All content on Duit.co.id is fundamentally accessible. Access levels exist to drive virality and community growth, NOT to restrict knowledge.

| `access_level` | Behavior | Use Case |
|----------------|----------|----------|
| `open` | Fully accessible, no action required | Tier 0-1 articles, basic content |
| `share_gate` | Share on social media to unlock | Tier 2-4 articles, premium insights |
| `youtube_gate` | Subscribe to YouTube to unlock | Articles with video companions |
| `register_gate` | Create free account to access | E-courses, downloadable resources |
| `paid` | Purchase or complete social actions | Premium e-courses (can be unlocked free) |

**Free Path Always Exists:** Every piece of content can be unlocked through free actions (sharing, subscribing, registering). Payment is optional for convenience only.

See `docs/VIRALITY_STRATEGY.md` for complete mechanics.

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Article title (H1, SEO title, social shares) | `"Panduan Lunas Pinjol"` |
| `description` | string | SEO meta description (150-160 chars) | `"Strategi melunasi hutang..."` |
| `date` | string | Publication date (ISO format) | `"2026-04-18"` |
| `published_at_wib` | string | Optional publish timestamp in WIB (minute precision) | `"2026-04-18 09:00 WIB"` |
| `author` | string | Author name or team | `"Duit.co.id Team"` |
| `slug` | string | URL-friendly identifier | `"panduan-lunas-pinjol"` |
| `image` | string | Featured image URL | `"/images/artikel/pinjol.jpg"` |
| `read_time` | string | Estimated reading time | `"8 min"` |
| `tier` | string | Economic tier (see Taxonomy) | `"tier-0-survival"` |
| `gender` | string | Target gender | `"unisex"` |
| `age` | string | Target age group | `"produktif"` |
| `location` | string | Target location | `"kota"` |
| `education` | string | Minimum education level | `"sma"` |
| `category` | array | Content categories | `["hukum", "keuangan"]` |
| `tags` | array | Search tags | `["pinjol", "hutang"]` |
| `is_premium` | boolean | Requires authentication | `false` |
| `youtube_lock` | boolean | Requires YouTube sub | `false` |
| `access_level` | string | Content access level | `"open"`, `"share_gate"`, etc. |
| `youtube_url` | string | Companion YouTube video | `"https://youtube.com/watch?v=..."` |
| `youtube_embed_position` | string | Where to embed video | `"top"`, `"middle"`, `"bottom"`, `"inline"` |

### Valid Values

**Tier:** `tier-0-survival`, `tier-1-hustler`, `tier-2-scaler`, `tier-3-asset-builder`, `tier-4-legacy`

**Gender:** `male`, `female`, `unisex`

**Age:** `muda` (18-25), `produktif` (26-55), `pensiun` (55+)

**Location:** `desa`, `kota`, `global`

**Education:** `sma`, `s1`, `s2`, `spesialis`

**Category:** `karir`, `bisnis`, `legal`, `investasi`, `hukum`, `keuangan`

**Tags:** Lowercase strings with hyphens (e.g., `pinjol`, `debt-relief`)

## 4. Build Process

### Vite Plugin Workflow

1. **Scan:** Plugin searches `/artikel/**/*.md` at build start
2. **Parse:** Extracts YAML frontmatter using `gray-matter`
3. **Validate:** Checks all required fields against taxonomy rules
4. **Enforce publish dates:** Blocks build if two slugs share the same `date`
5. **Index:** Generates lightweight `/public/search-index.json` with metadata + excerpt only
6. **Content Split:** Generates `/public/article-content/{slug}.json` containing full markdown per article
7. **Route:** Creates dynamic routes for `/artikel/[slug]`

### Generated Search Index

`search-index.json` structure:
```json
[
  {
    "title": "Panduan Lengkap Bebas dari Jerat Pinjol Online",
    "description": "Strategi step-by-step untuk melunasi hutang pinjol...",
    "slug": "panduan-lunas-pinjol",
    "tier": "tier-0-survival",
    "gender": "unisex",
    "age": "produktif",
    "location": "kota",
    "education": "sma",
    "category": ["hukum", "keuangan"],
    "tags": ["pinjol", "debt relief"],
    "image": "/images/artikel/panduan-lunas-pinjol.jpg",
    "read_time": "10 min",
    "date": "2026-04-18",
    "is_premium": false,
    "excerpt": "Ringkasan artikel untuk kartu/list pencarian..."
  }
]
```

`article-content/{slug}.json` structure:
```json
{
  "slug": "panduan-lunas-pinjol",
  "content": "Full article markdown..."
}
```

## 5. Runtime Rendering

### Article Loading Flow

1. User navigates to `/artikel/panduan-lunas-pinjol`
2. React Router matches `:slug` parameter
3. Frontend loads article metadata from `/search-index.json`
4. Frontend loads full markdown from `/article-content/{slug}.json` on demand
5. `react-helmet-async` sets SEO meta tags from metadata
6. `MarkdownRenderer` converts markdown to HTML with Tailwind prose styling
7. `TableOfContents` auto-generates navigation from headings

### Component Chain

```
ArticlePage
├── SEO (react-helmet-async)
│   ├── title
│   ├── meta description
│   ├── og:image
│   └── canonical URL
├── ArticleCard (preview/breadcrumbs)
├── TableOfContents (sticky sidebar)
├── MarkdownRenderer (main content)
├── YouTubeLockGate (if youtube_lock: true)
└── ExpertCTA (bottom call-to-action)
```

## 6. Markdown Syntax Extensions

### Standard Markdown (via remark-gfm)
- Headings (`#`, `##`, `###`)
- Bold/Italic (`**bold**`, `*italic*`)
- Lists (ordered/unordered)
- Tables
- Code blocks with syntax highlighting
- Links and images
- Strikethrough (`~~text~~`)
- Task lists (`- [ ]`, `- [x]`)

### Custom Shortcodes (Future)
- `{callout type="warning"}` → Styled alert box
- `{youtube id="dQw4w9WgXcQ"}` → Embedded video
- `{expert-cta type="tax"}` → Consultation CTA
- `{calculator type="debt-payoff"}` → Interactive tool embed

## 7. Content Workflow

### Publication Date Policy (Bulk Writing)

- `date` is the canonical public publish date and must be unique per article.
- For bulk generation, backdate entries (one article per day) to avoid mass same-day publication signals.
- Use `docs/PUBLICATION_SCHEDULE.json` as source-of-truth when assigning dates.
- Optional `published_at_wib` can be used for internal sequencing/audit logs.

### Auto Scheduler CLI (Recommended)

Use the scheduler to assign unique backdated dates automatically and sync both frontmatter + schedule JSON.

```bash
npm run schedule:publish -- --slugs hadapi-debt-collector,budgeting-darurat-umr --start-date 2026-04-17 --direction backward
```

Dry-run is default. Persist changes with `--apply`:

```bash
npm run schedule:publish -- --slugs hadapi-debt-collector,budgeting-darurat-umr --start-date 2026-04-17 --direction backward --apply
```

Schedule all unscheduled articles in one batch:

```bash
npm run schedule:publish -- --all-unscheduled --start-date 2026-04-17 --direction backward --apply
```

Behavior:
- Prevents duplicate `date` usage against existing schedule entries.
- Writes frontmatter fields: `date` and `published_at_wib`.
- Updates `docs/PUBLICATION_SCHEDULE.json` entries (create/update + sorted output).
- Supports dry-run for safe review before write.

### Creating New Article

1. **Plan:** Add entry to `docs/ARTICLE_CATALOG.md` (progress tracker)
2. **Create:** New `.md` file in appropriate `/artikel/{tier}/` folder
3. **Write:** Add complete frontmatter + markdown content
4. **Validate:** Run validation script to check frontmatter fields
5. **Test:** Run `npm run dev` and preview at `/artikel/{slug}`
6. **Commit:** Git commit with clear message
7. **Build:** Verify `npm run build` completes successfully

### Bulk Article Creation

For large-scale content production (100s of articles):
1. Use **Article Writer Subagent** (see `.qwen/agents/article-writer.md`)
2. Provide topic list with taxonomy assignments
3. Subagent generates complete `.md` files
4. Manual review and editing
5. Bulk commit to repository

## 8. SEO & Social Sharing

### Auto-Generated Meta Tags

From frontmatter, the system generates:

```html
<title>Panduan Lengkap Bebas dari Jerat Pinjol Online | Duit.co.id</title>
<meta name="description" content="Strategi step-by-step untuk melunasi hutang pinjol...">
<meta property="og:title" content="Panduan Lengkap Bebas dari Jerat Pinjol Online">
<meta property="og:description" content="Strategi step-by-step untuk melunasi hutang pinjol...">
<meta property="og:image" content="https://duit.co.id/images/artikel/panduan-lunas-pinjol.jpg">
<meta property="og:type" content="article">
<meta property="article:published_time" content="2026-04-18">
<meta property="article:tag" content="pinjol">
<link rel="canonical" href="https://duit.co.id/artikel/panduan-lunas-pinjol">
```

### Sitemap Generation

Build process also generates `sitemap.xml` including all article slugs for search engine indexing.

## 9. Filtering & Personalization

### User Feed Logic

Based on quiz results, users see personalized content:

```typescript
// Example: User profile
{
  income_tier: "tier-2-scaler",
  gender: "female",
  age: "produktif"
}

// Visible content:
✅ tier-0-survival (all lower tiers)
✅ tier-1-hustler (all lower tiers)
✅ tier-2-scaler (matching tier)
❌ tier-3-asset-builder (higher tier)
❌ tier-4-legacy (higher tier)

// Gender filter:
✅ female content
✅ unisex content
❌ male content
```

### Filter Components

- **ContentFilter:** Multi-filter UI (tier, category, tags)
- **TierBadge:** Color-coded tier indicator on cards
- **MyFeedGrid:** Personalized article grid on dashboard

## 10. YouTube Lock Gate

### Mechanism

When `youtube_lock: true` in frontmatter:

1. Article content is blurred/overlayed
2. User sees CTA: "Subscribe to YouTube to unlock"
3. Clicking button:
   - Redirects to `youtube.com/c/duitcoid?sub_confirmation=1`
   - Logs action in `user_unlocks` database table
   - Sets session cookie to unlock content
4. Advanced: OAuth verification with YouTube API (100% accurate)

### Database Tracking

```sql
-- Logged when user clicks subscribe
INSERT INTO user_unlocks (user_id, content_slug, unlocked_at)
VALUES ('user_123', 'panduan-lunas-pinjol', NOW());
```

## 11. Best Practices

### Writing Guidelines

- **Language:** Indonesian (Bahasa Indonesia)
- **Tone:** Professional, educational, empowering (not condescending)
- **Structure:** 
  - Hook/Introduction (1-2 paragraphs)
  - Clear headings (## level for main sections)
  - Subheadings (### level for subsections)
  - Actionable steps with examples
  - Conclusion with next steps
- **Length:** 1500-3000 words per article (8-15 min read)
- **Formatting:** Use lists, tables, and callouts for readability

### Frontmatter Checklist

Before publishing, verify:
- [ ] All required fields present
- [ ] Slug is URL-safe (lowercase, hyphens, no special chars)
- [ ] Date is accurate
- [ ] Image path exists in `/public/images/artikel/`
- [ ] Tier matches article content
- [ ] Categories are relevant
- [ ] Tags are lowercase and hyphenated
- [ ] `is_premium` and `youtube_lock` correctly set

## 12. Troubleshooting

### Common Issues

**Build fails with "Missing frontmatter field"**
- Check all required fields are present in YAML
- Run validation script: `npm run validate:content`

**Article not appearing in search**
- Verify file is in `/artikel/` folder (not `/content/`)
- Check `search-index.json` generated in `/public/`
- Ensure slug matches filename

**Article page loads metadata but body is blank**
- Check `/public/article-content/{slug}.json` exists
- Verify slug in frontmatter matches requested URL
- Re-run build/dev so `vite-content-plugin` regenerates split files

**Build fails with duplicate publish date**
- Error message will mention conflicting slugs and date
- Assign unique `date` in one of the conflicting article frontmatters
- Update `docs/PUBLICATION_SCHEDULE.json` to keep planning and metadata aligned

**Image not loading**
- Image must be in `/public/images/artikel/`
- Use absolute paths: `/images/artikel/filename.jpg`
- Check image file exists before commit

**Markdown not rendering**
- Ensure proper YAML frontmatter closing (`---`)
- Check for unclosed markdown tags (lists, code blocks)
- Verify `react-markdown` and `remark-gfm` installed

## 13. Related Documentation

- **docs/TAXONOMY.md:** Complete taxonomy reference and filtering logic
- **docs/COMPONENTS.md:** UI component specifications
- **docs/PAGES.md:** Routing structure
- **docs/DATABASE.md:** User interaction tracking (unlocks, leads)
- **.qwen/agents/article-writer.md:** Subagent for bulk article creation
