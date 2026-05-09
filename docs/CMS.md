# Duit.co.id File-Based CMS Documentation

## 1. Overview

Duit.co.id uses a **file-based Content Management System (CMS)** built on Markdown (`.md`) files. Article body content lives in `/artikel`, while public metadata lives in `/JSON` and is generated into public JSON during `prebuild`. This approach provides:

- **Zero-database overhead:** Articles are static files processed at build time
- **Version control friendly:** All content tracked in Git history
- **Fast performance:** Pre-processed into JSON index for instant client-side search
- **Easy authoring:** Writers can focus on article body content without hand-maintaining metadata
- **SEO optimized:** Generated metadata creates dynamic meta tags and Open Graph data

### Canonical Metadata Sources

Article frontmatter is no longer used because article files are often produced by low-cost AI agents with inconsistent YAML quality. Article `.md` files should be body-only Markdown.

Use these files instead:

| Source | Responsibility |
|--------|----------------|
| `JSON/article-seo.json` | Title, description, image, and author |
| `JSON/article-taxonomy.json` | Tier, category, gender, age, location, education, and cluster |
| `JSON/article-tags.json` | Search/internal tags |
| `JSON/article-access.json` | Access level and feature locks |
| `JSON/article-media.json` | YouTube URL and embed position |
| `JSON/article-dates.json` | Stable unique public publish date per slug |
| `JSON/article-audit.json` | Catalog row/status, legacy read time, and audit metadata |
| `JSON/article-frontmatter-archive.json` | Raw and parsed legacy frontmatter archive |
| `/artikel/{tier}/{slug}.md` | Article body content |
| `docs/ARTICLE_CATALOG.md` | Planning/progress table used during controlled metadata migrations |

`scripts/generate-article-content.mjs` combines `/artikel` body files with `/JSON` metadata into `public/search-index.json` and `public/article-content/*.json`.

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
New articles should be simple Markdown body files. The slug comes from the filename and metadata comes from the catalog/registry/override files:

```markdown
Introduction paragraph here...

## Step 1: Identifikasi Pinjol Legal vs Ilegal

Content here...

## Step 2: Hitung Total Hutang

Content here...

## Conclusion

Wrap up here...
```

Article files must not contain YAML frontmatter. Legacy frontmatter was migrated to `/JSON/article-frontmatter-archive.json` and stripped from `/artikel/**/*.md`.

## 3. Metadata JSON Reference

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

### SEO Fields

`JSON/article-seo.json` stores SEO metadata by slug:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Article title and SEO title | `"Panduan Lunas Pinjol"` |
| `description` | string | SEO meta description | `"Strategi melunasi hutang pinjol..."` |
| `author` | string | Author name or team | `"Duit.co.id Team"` |
| `image` | string | Featured image URL | `"/images/artikel/pinjol.jpg"` |

### Taxonomy Fields

`JSON/article-taxonomy.json` stores taxonomy by slug:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `tier` | string | Economic tier | `"tier-0-survival"` |
| `category` | array | Content categories | `["hukum", "keuangan"]` |
| `gender` | string | Target gender | `"unisex"` |
| `age` | string | Target age group | `"produktif"` |
| `location` | string | Target location | `"kota"` |
| `education` | string | Minimum education level | `"sma"` |
| `cluster` | string | Catalog/topic cluster | `"Legal & Risk"` |

### Other Metadata Files

| File | Shape |
|------|-------|
| `JSON/article-tags.json` | `{ "slug": ["tag-a", "tag-b"] }` |
| `JSON/article-dates.json` | `{ "slug": "YYYY-MM-DD" }` |
| `JSON/article-access.json` | `{ "slug": { "access_level": "open", "is_premium": false, "youtube_lock": false } }` |
| `JSON/article-media.json` | `{ "slug": { "youtube_url": "", "youtube_embed_position": "top" } }` |
| `JSON/article-audit.json` | Internal audit metadata; not used for public rendering |
| `JSON/article-frontmatter-archive.json` | Raw legacy frontmatter; archive only |

### Tags File

`JSON/article-tags.json` stores tags by slug:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| slug key | array | Search tags | `"panduan-lunas-pinjol": ["pinjol", "utang"]` |

### Access Fields

`JSON/article-access.json` supports:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `is_premium` | boolean | Marks premium content | `false` |
| `youtube_lock` | boolean | Requires YouTube sub | `false` |
| `access_level` | string | Content access level | `"open"`, `"share_gate"`, etc. |

### Media Fields

`JSON/article-media.json` supports:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
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

### Prebuild Workflow

1. **Scan:** `scripts/generate-article-content.mjs` searches `/artikel/**/*.md`.
2. **Read Metadata:** Loads article metadata from `/JSON/*.json`.
3. **Dates:** Stable public dates are loaded from and written back to `JSON/article-dates.json`.
4. **Index:** Generates lightweight `/public/search-index.json` with metadata + excerpt only.
5. **Content Split:** Generates `/public/article-content/{slug}.json` containing full markdown per article.
6. **Route:** Creates dynamic routes for `/artikel/[slug]`.

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

- Public publish dates are canonical in `JSON/article-dates.json`.
- `scripts/generate-article-content.mjs` preserves existing registry dates and assigns stable unique historical dates to new article slugs during `prebuild`.
- Do not ask article writer agents to manage dates manually.
- Do not put `date` or `published_at_wib` in article Markdown files.

### Metadata JSON Files

Edit the relevant `/JSON` file directly when metadata needs to change:

```json
{
  "panduan-lunas-pinjol": {
    "description": "Strategi praktis melunasi pinjol, negosiasi cicilan, dan melindungi diri dari penagihan yang melanggar aturan.",
    "image": "/images/artikel/panduan-lunas-pinjol.jpg",
    "tags": ["pinjol", "utang", "ojk", "debt-collector"],
    "youtube_url": "https://youtube.com/watch?v=VIDEO_ID"
  }
}
```

Unsupported fields are ignored by the generator.

### Creating New Article

1. **Plan:** Add entry to `docs/ARTICLE_CATALOG.md` (progress tracker)
2. **Create:** New `.md` file in appropriate `/artikel/{tier}/` folder
3. **Write:** Add markdown body content only
4. **Metadata:** Add or edit metadata in the relevant `/JSON` file
5. **Generate:** Run `npm run prebuild` to refresh generated article JSON
6. **Preview/Test:** Use the deployed site or a local dev server when explicitly needed
7. **Commit:** Git commit with clear message

### Bulk Article Creation

For large-scale content production (100s of articles):
1. Use **Article Writer Subagent** (see `.qwen/agents/article-writer.md`)
2. Provide topic list with taxonomy assignments
3. Subagent generates body-focused `.md` files
4. Manual review and editing
5. Run `npm run prebuild` to refresh generated metadata/content
6. Bulk commit to repository

## 8. SEO & Social Sharing

### Auto-Generated Meta Tags

From generated metadata, the system creates:

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

When `youtube_lock: true` is set in `JSON/article-access.json`:

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

### Metadata Checklist

Before publishing, verify:
- [ ] Slug exists in `docs/ARTICLE_CATALOG.md`
- [ ] Markdown file path is `/artikel/{tier}/{slug}.md`
- [ ] Metadata exists in the relevant `/JSON` files
- [ ] If an image override is used, the image path exists in `/public/images/artikel/`
- [ ] `npm run prebuild` completes and writes `public/search-index.json`
- [ ] Generated date exists in `JSON/article-dates.json`

## 12. Troubleshooting

### Common Issues

**Generated metadata looks wrong**
- Check the row in `docs/ARTICLE_CATALOG.md` first.
- Add or fix the slug entry in the relevant `/JSON` metadata file.
- Re-run `npm run prebuild`.

**Article not appearing in search**
- Verify file is in `/artikel/` folder (not `/content/`)
- Check `search-index.json` generated in `/public/`
- Ensure slug matches filename

**Article page loads metadata but body is blank**
- Check `/public/article-content/{slug}.json` exists
- Verify the Markdown file is not empty.
- Re-run `npm run prebuild` so `scripts/generate-article-content.mjs` regenerates split files

**Generated dates changed unexpectedly**
- Check `JSON/article-dates.json`; this is the stable date source.
- If duplicate/current/future dates exist in the registry, `prebuild` will move the affected slug backward to the nearest available historical date.
- Commit registry changes after adding new article slugs.

**Image not loading**
- Image must be in `/public/images/artikel/`
- Use absolute paths: `/images/artikel/filename.jpg`
- Check image file exists before commit

**Markdown not rendering**
- Article files should be body-only Markdown. Remove any accidental YAML frontmatter.
- Check for unclosed markdown tags (lists, code blocks)
- Verify `react-markdown` and `remark-gfm` installed

## 13. Related Documentation

- **docs/TAXONOMY.md:** Complete taxonomy reference and filtering logic
- **docs/COMPONENTS.md:** UI component specifications
- **docs/PAGES.md:** Routing structure
- **docs/DATABASE.md:** User interaction tracking (unlocks, leads)
- **.qwen/agents/article-writer.md:** Subagent for bulk article creation
