# Duit.co.id Database Documentation

## 1. Overview
The database utilizes **Cloudflare D1 (SQLite)** for high-performance, edge-based storage. It focuses on user profiling, engagement tracking, and lead management.

## 2. Table Schemas

### Table: `users`
Captures user profile data from the onboarding quiz.
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,           -- ID from Clerk/Kinde
    email TEXT UNIQUE,
    full_name TEXT,
    gender TEXT,                   -- male, female, other
    income_tier TEXT,              -- tier-0 to tier-4
    location_type TEXT,            -- desa, kota, global
    edu_level TEXT,                -- sma, s1, s2, spesialis
    age_group TEXT,                -- muda, produktif, pensiun
    yt_subscribed INTEGER DEFAULT 0, -- 0: No, 1: Yes
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Table: `user_unlocks`
Tracks YouTube-gated content accessibility.
```sql
CREATE TABLE user_unlocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    content_slug TEXT,            -- Slug from Markdown frontmatter
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

### Table: `tool_logs`
Usage analytics for financial tools and generators.
```sql
CREATE TABLE tool_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    tool_name TEXT,
    input_summary TEXT,           -- JSON summary of calculator inputs
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

### Table: `leads_referral`
Tracks conversion and interest for external partners.
```sql
CREATE TABLE leads_referral (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    partner_type TEXT,            -- lawyer, tax, franchise, property
    partner_name TEXT,
    status TEXT DEFAULT 'pending', -- pending, converted, rejected
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

## 3. Indexing Strategy
- Index on `user_id` for all tracking tables.
- Index on `email` and `id` for the `users` table.
- Composite index on `(income_tier, gender, age_group)` is not needed as articles are filtered via a JSON search-index on the frontend.
