# Page Content Audit Report - Duit.co.id

**Date:** 18 April 2026
**Auditor:** Qwen Code
**Scope:** All 10 core page components
**Target Language:** Bahasa Indonesia
**Target Audience:** Indonesian users across income tiers 0-4

---

## Executive Summary

| Metric | Result |
|--------|--------|
| Pages Audited | 10 |
| Pages Fully in English | 9 / 10 |
| Pages with Indonesian Content | 1 (Law Library - partial) |
| Pages with Thin Content | 7 / 10 |
| Pages with Real/Functional Data | 0 / 10 (all use hardcoded/dummy data) |
| Pages Missing CTAs | 3 / 10 |
| Pages Lacking Social Proof | 9 / 10 |
| Pages Without Indonesian Context | 8 / 10 |

**Overall Assessment:** The codebase is in an early scaffolding state. Nearly every page uses English placeholder content, dummy/hardcoded data, and lacks the depth, localization, and social proof required for an Indonesian financial platform targeting mass-market users. The Law Library is the only page with authentic Indonesian content (real UU/POJK references), but even that page is English-framed.

---

## Page-by-Page Analysis

---

### 1. Home (`src/pages/Home.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Headline, subheadline, tier descriptions all in English |
| **Content Depth** | Thin | Only 2 sections: HeroSection + ValuePropGrid. No social proof, no testimonials, no stats, no "how it works" section |
| **Value Propositions** | Present but generic | "Protect Your Legacy. Build Your Sovereignty." is aspirational but vague. Does not immediately communicate what Duit.co.id *does* |
| **Call-to-Actions** | Weak | One CTA: "Start Financial Assessment" (links to /quiz). Secondary "Learn Our Philosophy" links to /about (likely nonexistent). Missing CTA to explore content, tools, or marketplace |
| **Supporting Content** | None | Zero testimonials, zero user statistics, zero trust badges, zero partner logos |
| **Visual Hierarchy** | Adequate | H1 > H2 structure is correct. Subheadline exists. Tier cards have consistent layout |
| **Indonesian Context** | Minimal | Mentions "Indonesians" once in subheadline. Rp currency not shown. No local cultural references |

**What's Missing:**
- Social proof section (user count, testimonials, media mentions)
- "How It Works" 3-step explainer
- Featured content/articles preview
- Trust badges (security, certifications, partners)
- Indonesian language version of all copy
- Specific pain points for Indonesian users (pinjol, UMR wages, etc.)
- Video/animated explainer section

**Recommended Copy (Indonesian):**
```
Headline: "Lindungi Kekayaanmu. Bangun Kedaulatan Finansialmu."
Subheadline: "Platform keuangan #1 di Indonesia untuk semua kalangan. 
Dari pelunasan utang hingga struktur Family Office, kami sediakan 
alat, hukum, dan pengetahuan untuk mengamankan masa depanmu."
CTA: "Mulai Asesmen Keuangan" / "Pelajari Cara Kami Bekerja"
```

---

### 2. Quiz (`src/pages/Quiz.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | All questions, options, and results in English |
| **Content Depth** | Thin | Only 4 questions. Missing: education level, domicile/location, current savings/investments, financial goals, risk tolerance |
| **Value Propositions** | Implicit | The quiz itself is the value prop, but there's no intro explaining *why* the user should take it |
| **Call-to-Actions** | Functional | Each step has clickable options. Final CTA "Enter My Private Vault" is strong. Missing: option to skip, save progress, or learn more about tiers |
| **Supporting Content** | None | No explanation of what happens after the quiz. No trust signals. No estimated time |
| **Visual Hierarchy** | Good | Progress bar, step indicator, centered card layout. Clean UX |
| **Indonesian Context** | Partial | Income ranges use Rp (good), mentions "Pinjol" (good). Age groups and gender framing are Western |

**What's Missing:**
- Indonesian intro copy explaining quiz purpose and benefits
- Questions for: education (SMA/S1/S2), location (desa/kota), marital status, dependents
- Estimated completion time display
- Privacy reassurance ("Data Anda aman")
- Results page with actual personalized recommendations (currently just shows tier name)
- Indonesian translation of all questions and options
- Gender options should be reframed for Indonesian context (not "Masculine/Feminine")
- "Under 20" should be "< 20 tahun" format

**Recommended Questions (Indonesian):**
```
1. "Berapa usia Anda saat ini?" → "< 20 tahun", "20-35 tahun", "36-50 tahun", "> 50 tahun"
2. "Di mana Anda tinggal?" → "Desa/Kecamatan", "Kota Kecil", "Kota Besar (Jabodetabek, Surabaya, dll)", "Luar Negeri"
3. "Berapa penghasilan bulanan rumah tangga Anda?" (already has Rp - good)
4. "Apakah Anda memiliki utang berbunga tinggi (Pinjol, Kartu Kredit, dll)?" → "Ya, beberapa", "Ya, satu", "Tidak, saya bebas utang"
5. "Pendidikan terakhir Anda?" → "SMA/sederajat", "D3/S1", "S2/S3", "Spesialis/Profesi"
6. "Apa tujuan keuangan utama Anda?" → "Bebas utang", "Mulai bisnis sampingan", "Investasi", "Dana pensiun"
```

---

### 3. KnowledgeHub (`src/pages/KnowledgeHub.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Title, descriptions, and CTA all in English |
| **Content Depth** | Thin | Only 5 tier cards with 1-line descriptions. No featured articles, no search, no filtering |
| **Value Propositions** | Weak | "Explore the siloes of wealth mastery" - jargon-heavy, unclear to average Indonesian |
| **Call-to-Actions** | Present | "Explore Silo" for each tier. Missing: search bar, filter by category/age/gender |
| **Supporting Content** | None | No article count, no "new this week" section, no popular content |
| **Visual Hierarchy** | Adequate | H1 page title, H2 card titles. Could use section descriptions |
| **Indonesian Context** | None | Zero Indonesian cultural or financial references |

**What's Missing:**
- Search bar for articles
- Filter/sort controls (by category, date, popularity, tier)
- Article count per tier (e.g., "24 artikel")
- Featured/trending article banner
- Indonesian copy for all text
- Category tags on cards (karir, bisnis, investasi, hukum)
- "New" or "Updated" badges on recent content
- Reading time estimates per tier

**Recommended Copy (Indonesian):**
```
Title: "Pusat Pengetahuan"
Subtitle: "Jelajahi materi keuangan sesuai tahap ekonomi Anda. 
Setiap level berisi strategi, hukum, dan panduan praktis 
untuk meningkatkan taraf finansialmu."
CTA per tier: "Jelajahi Materi" / "Baca Artikel"
```

---

### 4. KnowledgeDetail (`src/pages/KnowledgeDetail.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Entire article content, headings, and UI elements in English |
| **Content Depth** | Sample only | This is a template/stub page. Contains ~200 words of placeholder content. Real content will come from Markdown files |
| **Value Propositions** | N/A | Template page - value depends on actual article content |
| **Call-to-Actions** | Present | YouTube lock gate with "Subscribe & Unlock" CTA. Missing: related articles, share to WhatsApp, download PDF |
| **Supporting Content** | None | No author bio, no related articles sidebar, no comments section |
| **Visual Hierarchy** | Good | Proper article structure: tier badge, read time, title, author, content, footer |
| **Indonesian Context** | None | Sample article about "SOPs" is generic business content, not Indonesia-specific |

**What's Missing (Template Level):**
- Related articles section at bottom
- Author bio card with social links
- Share buttons (WhatsApp, Telegram - critical for Indonesia)
- Table of contents sidebar (for long articles)
- "Artikel Terkait" recommendation engine
- Comment/discussion section
- Bookmark/save functionality (functional, not just button)
- Print/download article option
- Indonesian-language UI labels ("Bagikan", "Simpan", "15 menit baca")

**Required Indonesian UI Translations:**
```
"Premium Video Content" → "Konten Video Premium"
"Subscribe & Unlock" → "Subscribe & Buka Akses"
"Sovereign Tip" → "Tips Kedaulatan"
"Share" → "Bagikan"
"Bookmark" → "Simpan"
"#Systems" → "#Sistem" (or keep hashtags in English)
```

---

### 5. Dashboard (`src/pages/Dashboard.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Greeting, section titles, article titles/excerpts, recommendations all in English |
| **Content Depth** | Thin (dummy data) | Uses 3 hardcoded dummy articles. No real user data integration |
| **Value Propositions** | Present | "Your personalized path to financial independence and legacy" - clear but generic |
| **Call-to-Actions** | Mixed | Recommendation cards have buttons. "Get Started", "Open Tool", "Explore Laws" - all present but point to nothing functional |
| **Supporting Content** | None | No progress tracking, no tier progression visualization, no streak/achievement system |
| **Visual Hierarchy** | Good | Clear sections: greeting, recommendations, feed. Filter pills present |
| **Indonesian Context** | None | Article titles like "The Art of Debt Liquidation" are Western. No Indonesian-specific content |

**What's Missing:**
- Real user data integration (tier, quiz results, saved articles)
- Indonesian article titles and excerpts
- Progress tracker (e.g., "3 dari 5 artikel selesai")
- Tier progression visualization
- "Lanjutkan Membaca" (continue reading) section
- WhatsApp share integration
- Achievement/badge system for engagement
- Indonesian greeting ("Selamat Datang, [Nama]")
- Empty state for new users (no articles yet - show onboarding)

**Recommended Indonesian Content:**
```
Greeting: "Selamat Datang Kembali, [Nama]"
Subtitle: "Jalur personalmu menuju kebebasan finansial dan warisan."
Section: "Rekomendasi Untukmu"
Section: "Feed Saya"
Filter pills: "Semua", "Tier 0", "Tier 1", dll
```

---

### 6. Tools (`src/pages/Tools.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Page title, descriptions, tool names all in English |
| **Content Depth** | Thin | Lists 4 categories with 3 tool names each (12 tools total). No actual tool functionality implemented |
| **Value Propositions** | Moderate | "Financial Arsenal" framing is strong. Tool descriptions are clear |
| **Call-to-Actions** | Present | "Access Tools" button per category. All buttons are non-functional (no routing) |
| **Supporting Content** | None | No usage stats, no testimonials about tool effectiveness, no "most popular" indicator |
| **Visual Hierarchy** | Good | Card-based layout with icons, tier badges, and tool lists |
| **Indonesian Context** | Partial | Mentions "pinjol" in description (good). Tool names are English |

**What's Missing:**
- Actual tool implementations (all tools are placeholder names)
- Indonesian tool names and descriptions
- Tool usage instructions/help text
- "Most Popular" or "Most Used" indicator
- Tool search functionality
- Indonesian financial context in descriptions (e.g., BPJS calculations, PPh 21 tax calculator)
- Results display area (where do tool outputs go?)
- Export functionality (PDF, WhatsApp share of results)

**Recommended Indonesian Tool Names:**
```
"Debt Payoff Calculator" → "Kalkulator Pelunasan Utang"
"Survival Budgeter" → "Perencana Anggaran Darurat"
"Legal Defense Template" → "Template Pertahanan Hukum"
"Freelance Rate Calculator" → "Kalkulator Tarif Freelance"
"Sales Script Generator" → "Generator Script Penjualan"
"SOP Template Builder" → "Pembuat Template SOP"
"Property ROI Calculator" → "Kalkulator ROI Properti"
```

---

### 7. LawLibrary (`src/pages/LawLibrary.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | Mixed (best localized page) | Page title in English, but law entries are in authentic Indonesian (UU, POJK, KUHP). Filter categories in Indonesian |
| **Content Depth** | Moderate | 5 real Indonesian laws listed with proper references. Search and filter functionality present |
| **Value Propositions** | Present | "Access and search through the legal foundations" - clear value |
| **Call-to-Actions** | Weak | No CTA on law cards. Users can search/filter but cannot read/download/save any law. Missing: "Baca Selengkapnya" |
| **Supporting Content** | None | No explanation of why these laws matter, no summaries, no "how this affects you" context |
| **Visual Hierarchy** | Good | Sidebar filters, search bar, law list. Clean layout |
| **Indonesian Context** | Strong | Real Indonesian legislation (UU P2SK, UU HPP, UU Cipta Kerja, POJK LPBBTI, KUHP). This is the most authentic page |

**What's Missing:**
- Indonesian page title and subtitle
- Law summaries/plain-language explanations ("Apa artinya bagi Anda?")
- Download/PDF links for full legislation text
- "Baca Selengkapnya" CTA on each law card
- More comprehensive law database (only 5 entries)
- Law update notifications ("UU ini diperbarui pada...")
- Related articles linking laws to practical financial advice
- Category descriptions (what does "Keuangan" cover?)
- "No laws found" message should be in Indonesian

**Recommended Indonesian Copy:**
```
Title: "Perpustakaan Hukum"
Subtitle: "Akses dan telusuri fondasi hukum landscape 
keuangan dan bisnis Indonesia."
Search placeholder: "Cari berdasarkan nomor UU atau topik..."
Filter: "Semua", "Pajak", "Keuangan", "Bisnis", "Fintech", "Pidana"
Empty state: "Tidak ada hukum yang sesuai dengan pencarian Anda."
```

---

### 8. Academy (`src/pages/Academy.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Page title, descriptions, course titles all in English |
| **Content Depth** | Thin | Only 4 courses listed with minimal info (title, instructor, price, tier). No course descriptions, no curriculum outline |
| **Value Propositions** | Weak | "Master the skills of the elite" - aspirational but vague |
| **Call-to-Actions** | Present | "Enroll Now" per course. Missing: preview/free lesson, curriculum view, instructor bio |
| **Supporting Content** | None | No student count, no ratings/reviews, no completion rates, no money-back guarantee |
| **Visual Hierarchy** | Good | Card-based grid with images, prices, tier badges |
| **Indonesian Context** | Partial | Prices in Rp (good). Instructor names include Indonesian names (Andi Wijaya). Course titles are English |

**What's Missing:**
- Indonesian course titles and descriptions
- Course curriculum/module outlines
- Student enrollment numbers ("1,234 siswa terdaftar")
- Ratings and reviews per course
- Free preview/first lesson access
- Instructor bios and credentials
- Money-back guarantee or satisfaction policy
- Payment method logos (Midtrans, GoPay, OVO, Bank Transfer)
- Indonesian course descriptions (what will you learn?)
- "Best Seller" or "New" badges
- Bundle pricing or discounts

**Recommended Indonesian Copy:**
```
Title: "Akademi Duit"
Subtitle: "Kuasai keterampilan finansial kelas elite. 
Kursus terstruktur untuk mempercepat perjalananmu 
melalui setiap tahap keuangan."
Course titles: "Bebas Utang: Blueprint Lengkap", 
"Freelancing High-Ticket", "Sistemisasi SOP", 
"Struktur Perusahaan Holding"
CTA: "Daftar Sekarang"
```

---

### 9. Experts (`src/pages/Experts.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Page title, descriptions in English. Expert names and titles in Indonesian (good) |
| **Content Depth** | Thin | Only 3 experts. Missing: detailed bios, availability calendar, consultation types, pricing |
| **Value Propositions** | Present | "Direct access to the professionals" - clear value |
| **Call-to-Actions** | Present | "Book Consultation" per expert. Missing: view profile, see reviews, chat first |
| **Supporting Content** | Partial | Has rating and client count. Missing: testimonials, certifications, years of experience |
| **Visual Hierarchy** | Good | Card-based layout with photo, name, specialty, stats, CTA |
| **Indonesian Context** | Strong | Indonesian expert names (Budi Santoso, Siska Amelia, Hendra Wijaya). Indonesian credentials (Brevet C, Notary) |

**What's Missing:**
- Indonesian page title and subtitle
- Expert bios with education, certifications, experience
- Consultation pricing per expert
- Availability/booking calendar
- Client testimonials per expert
- Years of experience indicator
- Consultation types (online/offline, duration)
- "Top Rated" or "Most Booked" badges
- Filter by specialty (tax, legal, investment, business)
- Search functionality
- More experts (minimum 8-12 for credibility)
- Video introduction clips
- WhatsApp direct contact option

**Recommended Indonesian Copy:**
```
Title: "Expert Terverifikasi"
Subtitle: "Akses langsung ke profesional yang bisa 
mengeksekusi strategi kedaulatan finansialmu."
Specialty label: "Keahlian"
CTA: "Jadwalkan Konsultasi"
```

---

### 10. Profile (`src/pages/Profile.tsx`)

| Criteria | Rating | Details |
|----------|--------|---------|
| **Language** | English | Page title, labels, form fields, button text all in English |
| **Content Depth** | Moderate | Has personal info form, tier display, premium benefits section. Navigation sidebar present |
| **Value Propositions** | N/A | Settings page - functional rather than persuasive |
| **Call-to-Actions** | Present | "Save Changes", "Upgrade to Elite", "View Plans", "Retake Quiz", "Logout". All non-functional |
| **Supporting Content** | Partial | Premium benefits section exists but is vague. Missing: plan comparison, feature list |
| **Visual Hierarchy** | Good | Sidebar nav, form layout, benefits card. Well-structured |
| **Indonesian Context** | None | All labels, options, and copy in English |

**What's Missing:**
- Indonesian form labels and placeholders
- Functional form submission (data not saved anywhere)
- Avatar upload functionality
- Account deletion option (legal requirement)
- Data export/download option (privacy compliance)
- Connected accounts (Clerk/Kinde auth status)
- Notification preferences
- Indonesian tier names
- Plan comparison table for upgrade section
- Indonesian subscription plan names
- "Hapus Akun" (delete account) option

**Recommended Indonesian Copy:**
```
Title: "Pengaturan Akun"
Subtitle: "Kelola identitas dan preferensi kedaulatanmu."
Nav: "Info Pribadi", "Langganan", "Keamanan", "Notifikasi"
Form: "Nama Lengkap", "Alamat Email", "Tier Saat Ini", 
       "Jenis Kelamin", "Kelompok Usia"
CTA: "Simpan Perubahan", "Upgrade ke Elite", "Lihat Paket", 
      "Ikuti Ulang Kuis", "Keluar"
Premium: "Manfaat Premium", "Kamu saat ini berada di paket 
          Sovereign Standar."
```

---

## Content Gaps (Missing Entirely)

| Gap | Impact | Priority | Pages Affected |
|-----|--------|----------|----------------|
| **No Indonesian language anywhere** | Critical - platform targets Indonesian users but all copy is English | P0 | All 10 pages |
| **No social proof / testimonials** | High - trust is essential for financial platform | P0 | Home, Dashboard, Academy, Experts |
| **No user statistics** | High - "10,000+ users helped" type proof missing | P1 | Home, Dashboard |
| **No "How It Works" section** | High - users need to understand the journey | P1 | Home |
| **No trust badges / certifications** | High - financial platform needs credibility signals | P1 | Home, Quiz |
| **No real data integration** | High - all pages use hardcoded/dummy data | P0 | Dashboard, KnowledgeDetail, Academy, Experts |
| **No empty states** | Medium - new users see broken/incomplete pages | P1 | Dashboard, KnowledgeHub, Tools |
| **No search functionality on most pages** | Medium - KnowledgeHub and Academy need search | P2 | KnowledgeHub, Academy |
| **No Indonesian-specific financial context** | High - pinjol, BPJS, PPh 21, UMR not referenced in content | P1 | Home, Tools, Dashboard |
| **No WhatsApp integration** | High - WhatsApp is Indonesia's primary communication channel | P1 | KnowledgeDetail, Experts, Dashboard |
| **No related content recommendations** | Medium - users have no path to continue engagement | P2 | KnowledgeDetail, Dashboard |
| **No loading/error states** | Medium - UX breaks on network issues | P2 | All pages |
| **No SEO metadata** | High - no dynamic page titles, descriptions, Open Graph | P1 | All pages |
| **No FAQ sections** | Medium - common questions unanswered | P2 | Home, Quiz, Academy |
| **No partner/affiliate logos** | Low - future monetization dependency | P3 | Home, Experts |

---

## Translation Requirements (EN to ID)

### Priority 1 - Core User-Facing Text (Must Translate First)

| Page | Elements to Translate | Volume |
|------|----------------------|--------|
| Home | Headline, subheadline, CTA buttons, tier titles and descriptions | ~50 words |
| Quiz | All 4 questions, all answer options, progress text, result page text | ~80 words |
| KnowledgeHub | Page title, subtitle, 5 tier descriptions, CTA text | ~40 words |
| Dashboard | Greeting, section titles, article titles and excerpts, recommendation text | ~120 words |
| Tools | Page title, subtitle, 4 category titles and descriptions, 12 tool names, button text | ~80 words |

### Priority 2 - Secondary Content

| Page | Elements to Translate | Volume |
|------|----------------------|--------|
| LawLibrary | Page title, subtitle, search placeholder, empty state message | ~20 words |
| Academy | Page title, subtitle, 4 course titles, instructor labels, CTA text | ~40 words |
| Experts | Page title, subtitle, specialty labels, CTA text | ~20 words |
| Profile | Page title, subtitle, form labels, nav items, button text, plan names | ~40 words |
| KnowledgeDetail | Article UI labels (share, bookmark, read time), lock gate text, tip labels | ~30 words |

### Priority 3 - System Messages & Edge Cases

| Element | Translation Needed |
|---------|-------------------|
| Error messages | "No results found", "Something went wrong", "Please try again" |
| Loading states | "Loading...", "Please wait" |
| Form validation | "Required field", "Invalid email", "Password too short" |
| Success messages | "Saved successfully", "Profile updated" |
| Navigation | All nav items, breadcrumbs, footer links |
| Auth pages | Login, register, forgot-password (if not already built) |

---

## Page-by-Page Recommendations

### Home - Priority P0

| Action | Description | Effort |
|--------|-------------|--------|
| Translate all copy to Indonesian | Headline, subheadline, CTAs, tier descriptions | Low |
| Add social proof section | User count, testimonials, media logos | Medium |
| Add "How It Works" section | 3-step visual explainer (Quiz → Learn → Grow) | Medium |
| Add featured content preview | 3 latest/most popular articles | Medium |
| Add trust badges | Security, OJK compliance, partner logos | Low |
| Add Indonesian pain points | Pinjol, UMR, biaya hidup references | Low |
| Add testimonial carousel | 3-5 user stories with photos | Medium |

### Quiz - Priority P0

| Action | Description | Effort |
|--------|-------------|--------|
| Translate all questions and options to Indonesian | Use natural, convers Indonesianian | Low |
| Add intro section | Explain quiz purpose, time estimate, privacy guarantee | Low |
| Add 2-3 more questions | Education, location, financial goals | Low |
| Enhance results page | Show personalized content recommendations, not just tier name | Medium |
| Add progress save | Allow users to resume if they leave | Medium |
| Add Indonesian cultural framing | Age groups in "tahun", local education levels | Low |

### KnowledgeHub - Priority P1

| Action | Description | Effort |
|--------|-------------|--------|
| Translate all copy to Indonesian | Title, subtitle, descriptions, CTAs | Low |
| Add search bar | Client-side search across all articles | Medium |
| Add filter controls | By category, date, popularity | Medium |
| Add article counts per tier | "24 artikel tersedia" | Low |
| Add featured article banner | Highlight newest/most important article | Low |
| Connect to real Markdown data | Replace static cards with dynamic content | High |

### KnowledgeDetail - Priority P1

| Action | Description | Effort |
|--------|-------------|--------|
| Translate UI labels to Indonesian | Share, bookmark, read time, lock gate | Low |
| Add related articles section | 3 recommended articles at bottom | Medium |
| Add author bio card | With photo, bio, social links | Low |
| Add WhatsApp share button | Critical for Indonesian audience | Low |
| Add table of contents | For articles > 1000 words | Medium |
| Connect to real Markdown content | Dynamic rendering from content/ files | High |

### Dashboard - Priority P0

| Action | Description | Effort |
|--------|-------------|--------|
| Translate all copy to Indonesian | Greeting, sections, article data | Low |
| Connect to real user data | Display actual tier, saved articles, progress | High |
| Add progress tracker | Visual progress through tier content | Medium |
| Add "Continue Reading" section | Resume last-read article | Medium |
| Add Indonesian article data | Replace dummy articles with real content | High |
| Add empty state | Onboarding for new users with no data | Medium |

### Tools - Priority P1

| Action | Description | Effort |
|--------|-------------|--------|
| Translate all copy to Indonesian | Titles, descriptions, tool names | Low |
| Implement actual tools | Build 2-3 core calculators first (debt, budget) | High |
| Add tool usage instructions | Help text, example inputs | Medium |
| Add results display | Show output with charts/visualizations | High |
| Add export functionality | PDF download, WhatsApp share | Medium |
| Add Indonesian financial context | BPJS, PPh 21, UMR calculations | Medium |

### LawLibrary - Priority P1

| Action | Description | Effort |
|--------|-------------|--------|
| Translate page title and subtitle to Indonesian | Keep law entries in Indonesian | Low |
| Add law summaries | Plain-language explanation of each law's impact | High |
| Add "Baca Selengkapnya" CTA | Link to full legislation text | Medium |
| Expand law database | Add more UU, POJK, SE OJK references | High |
| Add related articles | Link laws to practical financial advice articles | Medium |
| Add update notifications | Show when laws were last amended | Low |

### Academy - Priority P2

| Action | Description | Effort |
|--------|-------------|--------|
| Translate all copy to Indonesian | Titles, descriptions, CTAs | Low |
| Add course descriptions | What students will learn, prerequisites | Medium |
| Add student enrollment numbers | Social proof per course | Low |
| Add ratings and reviews | Star ratings, written reviews | Medium |
| Add free preview | First lesson/module accessible without payment | Medium |
| Add payment method logos | Midtrans, GoPay, OVO, bank transfer | Low |
| Add instructor bios | Credentials, experience, photo | Medium |

### Experts - Priority P2

| Action | Description | Effort |
|--------|-------------|--------|
| Translate page title and subtitle to Indonesian | Keep expert names/titles in Indonesian | Low |
| Add expert bios | Education, certifications, experience | Medium |
| Add consultation pricing | Per-session cost, duration | Low |
| Add availability calendar | Booking system integration | High |
| Add client testimonials | Per-expert reviews | Medium |
| Add specialty filters | Filter by tax, legal, investment, business | Medium |
| Add more experts | Minimum 8-12 for credibility | Medium |
| Add WhatsApp contact | Direct messaging option | Low |

### Profile - Priority P1

| Action | Description | Effort |
|--------|-------------|--------|
| Translate all form labels to Indonesian | Full localization of settings page | Low |
| Implement form submission | Save data to Cloudflare D1 | High |
| Add avatar upload | Profile photo upload | Medium |
| Add account deletion option | Legal compliance | Low |
| Add data export option | Privacy compliance | Medium |
| Add plan comparison table | Feature list for upgrade section | Medium |
| Add notification preferences | Email, WhatsApp, in-app toggles | Medium |

---

## Priority Ranking

| Priority | Pages | Actions | Rationale |
|----------|-------|---------|-----------|
| **P0 - Critical** | Home, Quiz, Dashboard | Translate all copy, add social proof, connect real data | These are the primary entry points. Users form their first impression here. Must be Indonesian and functional. |
| **P1 - High** | KnowledgeHub, KnowledgeDetail, Tools, LawLibrary, Profile | Translate, add search/filters, implement functionality, add Indonesian context | Core product pages. Users interact here most. Need real content and Indonesian UX. |
| **P2 - Medium** | Academy, Experts | Translate, add detail, expand content | Monetization pages. Important for revenue but secondary to core experience. |
| **P3 - Low** | All pages | Loading states, error handling, partner logos, FAQ | Polish and edge cases. Important but can wait. |

---

## Quick Wins (Low Effort, High Impact)

| Action | Pages | Effort | Impact |
|--------|-------|--------|--------|
| Translate all page titles and headings to Indonesian | All 10 | Low | Very High |
| Add Indonesian subtitle/description on each page | All 10 | Low | High |
| Replace "Rp" amounts with Indonesian format (Rp 1.000.000) | Quiz, Academy | Low | High |
| Add article counts to KnowledgeHub tier cards | KnowledgeHub | Low | Medium |
| Add student counts to Academy courses | Academy | Low | Medium |
| Add empty state messages in Indonesian | Dashboard, KnowledgeHub | Low | Medium |
| Add "Last updated" dates to LawLibrary entries | LawLibrary | Low | Medium |
| Add WhatsApp share buttons | KnowledgeDetail, Dashboard | Low | High |

---

## Notes

1. **Design System Alignment:** All pages follow the "Sovereign Vault" design system correctly (glassmorphism, Money Green, Aureum Gold). No design issues found.

2. **Component Reusability:** Pages consistently use shared components (GlassCard, GoldShineButton, GreenButton). Good architecture.

3. **TypeScript Compliance:** All pages have proper TypeScript typing. No issues.

4. **Routing:** Pages appear properly routed. All `to` props reference valid routes per docs/PAGES.md.

5. **Data Architecture:** The biggest gap is that **zero pages connect to real data**. All use hardcoded arrays or static content. This is likely intentional during scaffolding but must be addressed before launch.

6. **Content Pipeline:** The `content/artikel/` directory exists per project structure, but no pages dynamically render from it. KnowledgeDetail is a static template, not a Markdown renderer.

7. **Authentication:** Profile page assumes authenticated user but shows no auth state handling. No login redirect or guest state.

---

*End of Audit Report*
