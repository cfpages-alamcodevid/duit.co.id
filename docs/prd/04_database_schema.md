# Database Schema & Data Models

## Cloudflare D1 (SQLite) Schema

### 1. users
Stores user profiling from the quiz for "My Feed" personalization.
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY, -- Clerk/Kinde ID
    email TEXT UNIQUE,
    full_name TEXT,
    income_tier TEXT,    -- tier-0 to tier-4
    location_type TEXT,  -- desa, kota, global
    edu_level TEXT,      -- sma, s1, s2, spesialis
    age_group TEXT,      -- muda, produktif, pensiun
    yt_subscribed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. user_unlocks
Tracking content unlocked via YouTube Gate.
```sql
CREATE TABLE user_unlocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    content_slug TEXT,
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

### 3. tool_logs
Analytics for business tool usage.
```sql
CREATE TABLE tool_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    tool_name TEXT,
    input_summary TEXT, -- JSON summary
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 4. leads_referral
Tracking lead generation for partners (Notaris/Franchise/Property).
```sql
CREATE TABLE leads_referral (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    partner_type TEXT, -- 'lawyer', 'tax', 'franchise', 'property'
    partner_name TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
