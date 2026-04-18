# Duit.co.id Database Documentation

## 1. Overview
The database utilizes **Cloudflare D1 (SQLite)** for high-performance, edge-based storage. It focuses on user profiling, engagement tracking, lead management, and visitor fingerprinting.

**Important:** Article/content data is **NOT** stored in the database. All articles are file-based Markdown (`.md`) files in the `/artikel` folder with YAML frontmatter. The database tracks:
- User profiles and quiz results (with income tier classification)
- Anonymous visitor fingerprints (for free article access tracking)
- Content unlock events (YouTube gate, share gate tracking)
- Tool usage analytics
- Comprehensive lead referrals (phone, WhatsApp, email, forms)

## 2. Content Architecture

### File-Based CMS (Articles)
- **Location:** `/artikel/{tier}/{slug}.md`
- **Format:** Markdown with YAML frontmatter
- **Metadata:** Tier, gender, age, location, education, category, tags, SEO fields, YouTube URL
- **Processing:** Parsed at build time by Vite plugin, generates `search-index.json`
- **Rendering:** Client-side via `react-markdown` + `remark-gfm`
- **Search:** FlexSearch client-side full-text search on `search-index.json`

### Database-Tracked Content
The database stores:
- User profiles (income tier, assets, business revenue, quiz results)
- Anonymous visitor fingerprints (FingerprintJS hash)
- Content unlock events (YouTube gate, share gate, member wall)
- Tool usage analytics
- Lead referrals across all channels (phone, WhatsApp, email, forms)

## 3. Table Schemas

### Table: `users`
Captures user profile data from the onboarding quiz with comprehensive financial classification.

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,           -- ID from Clerk/Kinde
    email TEXT UNIQUE,
    full_name TEXT,
    gender TEXT,                   -- male, female, other
    
    -- Income Classification
    monthly_income_net REAL,       -- Net monthly income in IDR
    income_tier TEXT,              -- tier-0 to tier-4 (calculated)
    
    -- Asset Classification (for tier override)
    total_assets REAL,             -- Total assets in IDR (property, investments, savings)
    has_business BOOLEAN,          -- Has own business
    monthly_business_revenue REAL, -- Monthly business revenue if applicable
    
    -- Demographics
    location_type TEXT,            -- desa, kota, global
    edu_level TEXT,                -- sma, s1, s2, spesialis
    age_group TEXT,                -- muda, produktif, pensiun
    
    -- Engagement
    yt_subscribed INTEGER DEFAULT 0, -- 0: No, 1: Yes
    membership_status TEXT DEFAULT 'free', -- free, registered, premium
    
    -- Metadata
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Income Tier Classification Logic:**
- **Tier 0 (Survival):** Monthly income < Rp 5 juta OR high-debt situation
- **Tier 1 (Hustler):** Rp 5 juta - Rp 10 juta/month
- **Tier 2 (Scaler):** Rp 10 juta - Rp 100 juta/month OR total assets > Rp 500 juta
- **Tier 3 (Asset Builder):** Rp 100 juta - Rp 1 milyar/month OR total assets > Rp 5 milyar
- **Tier 4 (Legacy Maker):** > Rp 1 milyar/month OR total assets > Rp 50 milyar

**Tier Override Logic:** If user's assets qualify them for a higher tier than income, assign the higher tier. This captures wealth builders with low current income but high asset base.

### Table: `visitor_fingerprints`
Tracks anonymous visitors using FingerprintJS to enforce 1 free article view limit.

```sql
CREATE TABLE visitor_fingerprints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fingerprint_hash TEXT UNIQUE,  -- FingerprintJS visitor hash
    first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    articles_viewed INTEGER DEFAULT 0, -- Count of full articles viewed
    last_article_slug TEXT,        -- Last article viewed
    last_article_viewed_at DATETIME,
    ip_address TEXT,
    user_agent TEXT,
    is_registered INTEGER DEFAULT 0, -- 0: No, 1: Yes (converted)
    registered_user_id TEXT,       -- Links to users table after registration
    FOREIGN KEY(registered_user_id) REFERENCES users(id)
);
```

**Purpose:** Prevent gaming of free article access by clearing cookies/cache. FingerprintJS tracks browser + device signature even in incognito mode.

### Table: `user_unlocks`
Tracks content unlock events across all access methods.

```sql
CREATE TABLE user_unlocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,                  -- NULL if anonymous visitor
    fingerprint_hash TEXT,         -- For anonymous tracking
    content_slug TEXT,             -- Slug from Markdown frontmatter
    unlock_method TEXT,            -- youtube_subscribe, social_share, registration, purchase, referral
    platform TEXT,                 -- twitter, linkedin, whatsapp, facebook (for social_share)
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,           -- Cookie expiry (30 days from unlock)
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(fingerprint_hash) REFERENCES visitor_fingerprints(fingerprint_hash)
);
```

### Table: `content_shares`
Tracks social shares for share-to-unlock mechanism.

```sql
CREATE TABLE content_shares (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,                  -- NULL if not logged in
    fingerprint_hash TEXT,
    article_slug TEXT,
    platform TEXT,                 -- twitter, linkedin, whatsapp, facebook
    shared_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    verified BOOLEAN DEFAULT FALSE, -- TRUE if OAuth verified
    UNIQUE(article_slug, fingerprint_hash, DATE(shared_at)) -- Prevent duplicate shares same day
);
```

### Table: `tool_logs`
Usage analytics for financial tools and generators.

```sql
CREATE TABLE tool_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    fingerprint_hash TEXT,
    tool_name TEXT,
    input_summary TEXT,            -- JSON summary of calculator inputs
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

### Table: `leads_referral`
Comprehensive lead tracking across all channels for partner referrals.

```sql
CREATE TABLE leads_referral (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,                  -- NULL if anonymous
    fingerprint_hash TEXT,
    partner_type TEXT,             -- franchise, property, certificate, expert, tax, legal
    partner_name TEXT,             -- Partner business name
    contact_method TEXT,           -- phone, whatsapp, email, form_submission
    contact_number TEXT,           -- Dedicated tracking number (different from partner's main number)
    lead_details TEXT,             -- JSON: form data, message preview, etc.
    status TEXT DEFAULT 'pending', -- pending, contacted, converted, rejected
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    converted_at DATETIME,         -- When lead converted to customer
    commission_amount REAL,        -- Commission earned by Duit.co.id
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

**Lead Tracking Strategy:**
- Each partner gets a **dedicated tracking phone number** displayed on Duit.co.id
- When user calls that number → partner knows it's from Duit.co.id
- All channels tracked: phone calls, WhatsApp clicks, email clicks, form submissions
- Commission tracking built-in for revenue analytics

### Table: `course_progress`
Tracks e-course module progress and unlock methods.

```sql
CREATE TABLE course_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    course_slug TEXT,
    module_number INTEGER,
    unlocked_via TEXT,             -- social_action, registration, purchase, referral, free_by_creator
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    UNIQUE(user_id, course_slug, module_number),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

**Course Provider Model:**
- **Syamsul Alam (Duit.co.id Team):** All courses FREE, labeled as "Free Course"
- **Expert Providers:** Courses can be priced, Duit.co.id takes 25% platform fee
- UI shows provider info: "By Duit.co.id Team" (free) vs "By [Expert Name] - Rp XXX" (paid)

## 4. Indexing Strategy
- Index on `user_id` for all tracking tables
- Index on `email` and `id` for the `users` table
- Index on `fingerprint_hash` for anonymous tracking
- Composite index on `(income_tier, gender, age_group)` for user segmentation
- Index on `partner_type` and `contact_method` for lead analytics
- Index on `course_slug` for course progress tracking
