# CMS System Improvements - Summary

## Date: 18 April 2026

---

## ✅ Completed Improvements

### 1. Search Index Optimization
**Issue:** search-index.json included full article content, making it too large.

**Solution:**
- ✅ Added `generateExcerpt()` function to extract 200-250 character excerpts
- ✅ Replaced `content` field with `excerpt` field in search-index.json
- ✅ Excerpt generated from first 2-3 plain text paragraphs
- ✅ Result: Much smaller JSON file, faster loading

**File Modified:**
- `vite-content-plugin.ts`

---

### 2. URL Routing Update
**Change:** All article URLs changed from `/knowledge/[slug]` to `/artikel/[slug]`

**Rationale:**
- Articles are primarily "artikel" first, regardless of content type (text, video, etc.)
- Clearer naming convention
- Consistent branding

**Files Updated (10 total):**
- `src/App.tsx` - All routes changed to `/artikel/*`
- `src/components/ui/ArticleCard.tsx` - Link URLs updated
- `src/pages/ArticlePage.tsx` - Canonical URL, breadcrumbs
- `src/components/shared/Footer.tsx` - Nav links
- `src/components/ui/MegaMenu.tsx` - All tier links
- `src/pages/Home.tsx` - CTA links
- `src/pages/Quiz.tsx` - Results screen links
- `src/pages/KnowledgeDetail.tsx` - Related articles
- `src/pages/KnowledgeHub.tsx` - Comment references
- `docs/PAGES.md` - Documentation

**New Route Structure:**
```
/artikel → Article index (all articles)
/artikel/tier-0-survival → Filtered by tier
/artikel/tier-1-hustler → Filtered by tier
/artikel/tier-2-scaler → Filtered by tier
/artikel/tier-3-asset-builder → Filtered by tier
/artikel/tier-4-legacy → Filtered by tier
/artikel/[slug] → Individual article
```

---

### 3. Researcher Subagent Created
**File:** `.qwen/agents/researcher.md`

**Purpose:** Prepare comprehensive research materials before article writing, so Article Writer has accurate data.

**Capabilities:**
1. **Competitor Analysis** - Top 3 Google results, YouTube videos, social media
2. **Market Research** - Current prices (Shopee, Tokopedia, etc.), supplier info
3. **Data & Statistics** - Recent data (2025-2026), government sources (BPS, OJK, BI)
4. **Legal/Regulatory** - UU references, permit requirements, compliance
5. **Case Studies** - Real examples, success/failure stories
6. **Financial Projections** - Realistic capital, revenue, break-even calculations
7. **Persona Scenarios** - Target audience examples with specific situations
8. **Myth Busting** - Common misconceptions and corrections

**Research Output Structure:**
1. Article brief (target, tier, categories)
2. Competitor analysis (what they cover, what they miss)
3. Key data & statistics (cited, verifiable)
4. Market research (capital, revenue, demand)
5. Legal/regulatory requirements
6. Expert opinions & case studies
7. Practical examples & scenarios
8. Common myths & misconceptions
9. Action steps outline
10. Resources & references
11. Suggested article structure

**Output Location:** `/research/[tier]/[slug]-research.md`

**Usage:**
```
Invoke with: "Research article for Tier 1 about 'Jastip Barang Mewah untuk Ibu Rumah Tangga'"
```

---

### 4. Writing Guidelines Created
**File:** `docs/WRITING_GUIDELINES.md` (400+ lines)

**Purpose:** Define Syamsul Alam's voice, style, and article structure standards.

**Key Sections:**

#### Author Voice & Personality
- 33-year-old Indonesian male, English as third language
- Direct, conversational, practical, authoritative but approachable
- Max 4 sentences per paragraph (hard limit)
- 1-sentence paragraphs for emphasis
- Each sentence leads to next (curiosity gap)
- Show expertise through insights, not claims

#### AIDA Framework Implementation
- **Attention:** Problem-first opening, surprising statistic, relatable scenario
- **Interest:** Answer unasked questions, show the path, address objections
- **Desire:** Case studies, before/after, specific numbers, mini-wins
- **Action:** Summary in 1-2 sentences, single action step, social proof CTA

#### 5W1H Framework
Every article must answer:
- **WHO:** Target audience, who benefits, who should skip
- **WHAT:** Topic definition, learning outcomes, requirements
- **WHY:** Why it matters, why now, why this way
- **WHEN:** When to apply, when to expect results, when NOT to apply
- **WHERE:** Where to do it, where to get resources, where to get help
- **HOW:** How to do it, how long, how much, how to measure success

#### Reader Type Satisfaction
Address all 4 types in every article:
1. **The Skimmer (60%)** - Clear headings, bold terms, summary boxes
2. **The Analyzer (20%)** - Specific data, detailed explanations, legal references
3. **The Doer (15%)** - "Langsung ke Inti" section, step-by-step lists, templates
4. **The Storyteller (5%)** - Case studies, real examples, emotional hooks

#### Psychology & Marketing Techniques
- **Curiosity Gap:** Open loops that need closing
- **Social Proof:** Show others succeeded (without bragging)
- **Loss Aversion:** Fear of losing > desire to gain
- **Specificity Bias:** Specific numbers = more credible
- **Reciprocity:** Give value first, ask later
- **Authority Through Specificity:** Show expertise through detail, not claims

#### Formatting Rules
- Paragraphs: Max 4 sentences, 1-sentence for emphasis
- Headings: ## for main sections (TOC), ### for subsections
- Lists: Numbered for steps, bullets for tips/options
- Tables: For comparisons
- Callouts: Warnings and tips in blockquotes
- Examples: Good vs Bad writing samples provided

#### Content Quality Checklist
- Structure checklist (AIDA, 5W1H, reader types, CTA)
- Writing checklist (paragraph length, sentence flow, specificity)
- Authority checklist (data, examples, legal references)
- Formatting checklist (headings, bold, lists, links)
- SEO checklist (title, description, tags, categories, slug)

---

### 5. Article Writer Subagent Updated
**File:** `.qwen/agents/article-writer.md` (Updated)

**Changes:**
- ✅ Now writes AS Syamsul Alam (33yo Indonesian male)
- ✅ MUST read `docs/WRITING_GUIDELINES.md` before every article
- ✅ Follows AIDA framework throughout
- ✅ Implements 5W1H in every article
- ✅ Uses psychology techniques (curiosity gap, social proof, etc.)
- ✅ Checks for research document before writing
- ✅ Integrates research data when available
- ✅ Marks uncertain data with "Perlu verifikasi" notes

**New Workflow:**
1. Check for research document (`/research/[tier]/[slug]-research.md`)
2. If exists: Use all data, follow structure, address gaps
3. If not exists: Note research needed, use best knowledge
4. Write article combining research + writing guidelines + frontmatter

**Output Format:**
1. Complete markdown file (ready to save to `/artikel/[tier]/[slug].md`)
2. Summary of what was written
3. Validation checklist (frontmatter, taxonomy, word count, etc.)
4. Notes (what needs research, what assumptions were made)

---

## 🎯 How It All Works Together

### Content Creation Workflow:

```
1. PLAN: Add article topic to docs/ARTICLE_CATALOG.md
   ↓
2. RESEARCH: Invoke Researcher subagent
   - Input: "Research article for Tier [X] about [Topic]"
   - Output: /research/[tier]/[slug]-research.md
   ↓
3. WRITE: Invoke Article Writer subagent
   - Input: "Write article for [slug] (research available)"
   - Reads: Research document + Writing Guidelines
   - Output: /artikel/[tier]/[slug].md
   ↓
4. REVIEW: Manual review
   - Check frontmatter completeness
   - Verify data accuracy
   - Test markdown rendering
   ↓
5. PUBLISH: Commit to repository
   - Dev server auto-reloads (HMR)
   - Rebuild search-index.json
   - Article appears at /artikel/[slug]
   ↓
6. REPURPOSE: Create companion YouTube video
   - Add youtube_url to frontmatter
   - Repurpose across 10+ platforms
```

---

## 📊 Files Created/Modified

### Created:
- `docs/WRITING_GUIDELINES.md` (400+ lines)
- `.qwen/agents/researcher.md` (Researcher subagent)
- `/research/` directory (for research documents)

### Modified:
- `vite-content-plugin.ts` - Excerpt generation
- `src/App.tsx` - Routes changed to /artikel
- `src/components/ui/ArticleCard.tsx` - Link URLs
- `src/pages/ArticlePage.tsx` - Canonical URL, breadcrumbs
- `src/components/shared/Footer.tsx` - Nav links
- `src/components/ui/MegaMenu.tsx` - Tier links
- `src/pages/Home.tsx` - CTA links
- `src/pages/Quiz.tsx` - Results links
- `src/pages/KnowledgeDetail.tsx` - Related articles
- `src/pages/KnowledgeHub.tsx` - References
- `docs/PAGES.md` - Route documentation
- `.qwen/agents/article-writer.md` - Updated with writing guidelines

---

## 🧪 Testing Instructions

### Test Excerpt Generation:
1. Add new article to `/artikel/[tier]/`
2. Run `npm run build`
3. Check `public/search-index.json`
4. Verify: `excerpt` field present, `content` field absent
5. Verify excerpt is ~250 characters from first paragraphs

### Test URL Routing:
1. Navigate to `/artikel` (should show article index)
2. Navigate to `/artikel/panduan-lunas-pinjol` (should show sample article)
3. Navigate to `/artikel/tier-0-survival` (should show filtered articles)
4. Verify all internal links use `/artikel/` not `/knowledge/`

### Test Researcher Agent:
1. Invoke with: "Research article for Tier 1 about '15 Side Hustle Modal Kecil untuk Mahasiswa'"
2. Verify research document created in `/research/tier-1/`
3. Check all sections present (competitor analysis, market research, etc.)
4. Verify data is specific and cited

### Test Article Writer:
1. Ensure research document exists for topic
2. Invoke with: "Write article for 'side-hustle-mahasiswa' (research available)"
3. Verify article follows WRITING_GUIDELINES.md:
   - Max 4 sentences per paragraph
   - AIDA framework followed
   - Specific numbers used
   - No wall of text
   - Indonesian language
4. Check frontmatter complete and valid

---

## 📝 Next Steps

### Immediate:
1. **Test current system** - Browse to `/artikel` on dev server
2. **Research first article** - Use Researcher agent on Tier 0 topic
3. **Write first article** - Use Article Writer with research
4. **Verify rendering** - Check at `/artikel/[slug]`

### Content Production:
- **Week 1:** Tier 0 (10 articles) - Survival content
- **Week 2:** Tier 1 (15 articles) - Hustler content
- **Week 3-4:** Tier 2-3 (30 articles) - Scaler + Asset Builder
- **Week 5:** Tier 4 (15 articles) - Legacy content

### Phase 2 (After content populated):
- FingerprintGate implementation
- MemberWall modal
- ShareUnlockModal with OAuth
- YouTubeLockGate
- Database integration
- Lead tracking components

---

## 🎨 Writing Style Examples

### Good Introduction (Follows Guidelines):
```
Anda baca artikel ini karena terjerat pinjol.

Bukan? Tidak apa-apa. Saya tidak menghakimi.

Tapi Anda perlu tahu satu hal: Situasi Anda tidak seburuk yang Anda pikir.

Saya perhatikan pola yang sama berulang kali di Twitter dan FB group. 
Orang-orang yang terjebak pinjol selalu bilang hal yang sama:

"Saya tidak tahu harus mulai dari mana."

Jawabannya selalu sama: Mulai dari hitung total hutang Anda. Titik.
```

### Good Action Steps (Specific, Numbered):
```
## Langkah Konkret Hari Ini

### 1. Buka Semua Aplikasi Pinjol di HP Anda

Jangan ditutup. Jangan dihapus.

Buka. Lihat berapa yang harus dibayar.

Catat:
- Nama aplikasi
- Jumlah pinjaman
- Bunga per hari
- Total yang harus dibayar

### 2. Screenshot Semua Bukti Transfer

Ini penting. Bisa jadi bukti jika ada masalah.

Transfer yang sudah Anda lakukan. Chat dengan debt collector. Semua.

Simpan di folder terpisah. Jangan sampai hilang.
```

### Good Authority (Through Specificity):
```
Bunga pinjol ilegal bisa 0,5% per HARI. Bukan per tahun.

Hitung sendiri: Rp 1 juta x 0,5% = Rp 5.000/hari.

Dalam sebulan (30 hari): Rp 5.000 x 30 = Rp 150.000.

Dalam setahun: Rp 150.000 x 365 = Rp 54.750.000.

Dari Rp 1 juta jadi Rp 54,75 juta. Itu kenapa orang tidak bisa lunas.
```

---

## Related Documentation

- `docs/WRITING_GUIDELINES.md` - Complete writing style guide
- `docs/CMS.md` - CMS workflow
- `docs/TAXONOMY.md` - Content categorization
- `docs/ARTICLE_CATALOG.md` - Planned articles
- `docs/CONTENT_REPURPOSING.md` - YouTube integration
- `.qwen/agents/researcher.md` - Researcher subagent
- `.qwen/agents/article-writer.md` - Article Writer subagent
