# Duit.co.id Virality & Content Access Strategy

## 1. Core Philosophy: "Pay with Action, Not Money"

All content on Duit.co.id is **fundamentally free**. Users can access everything by taking specific actions that drive platform growth. This creates a viral loop where:
- Users get value → take action → platform grows → more value created
- Actions are easy but meaningful (low friction, high intent)
- Community membership has tangible benefits (exclusive access through engagement)

**Monetization Principle:** Syamsul Alam (founder) does NOT monetize directly from members. All educational content by Duit.co.id Team is FREE. Revenue comes from third-party integrations (Franchise.id, Properti.id, Sertifikat.co.id) and expert marketplace platform fees (25%).

---

## 2. Tier System Clarification

### What Tiers Are:
- **Content relevance filters** - ensures users see content appropriate for their financial situation
- **Personalization mechanism** - quiz results assign starting tier, but users can browse ALL tiers freely
- **Curriculum organization** - structured learning path from survival (tier 0) to legacy (tier 4)

### What Tiers Are NOT:
- **NOT a paywall** - users are NOT restricted to their assigned tier
- **NOT a subscription level** - no upgrade/payment required to access higher tiers
- **NOT a membership tier** - all users have equal access to all content

### Example:
```
User Quiz Result: tier-1-hustler (fresh graduate, UMR worker)
✅ Can access: tier-1-hustler content (recommended)
✅ Can also access: tier-0, tier-2, tier-3, tier-4 (if they choose to explore)
✅ No payment required to browse any tier
✅ No restrictions based on tier assignment
```

---

## 3. Content Access Levels

### Level 1: Open Access + Member Wall (Anonymous Visitors)
**Content:** All articles indexed and crawlable by search engines

**Anonymous Visitor Policy:**
- **1 full article free** - First article can be read completely free
- **After 1 article:** Preview only (30% visible), then "Become Free Member to continue reading"
- **Tracking:** FingerprintJS (browser/device signature, works even in incognito)
- **Purpose:** Prevent abuse via cookie/cache clearing while maintaining generous free access

**SEO Strategy:**
- All articles indexed by search engines (no robots.txt blocking)
- Rich snippets via structured frontmatter
- Social sharing increases backlinks and domain authority

**Access:** No registration for 1 article, then free registration required

**Purpose:** SEO discovery → conversion to free members

---

### Level 2: Free Member Access (Registered Users)
**Requirements:** Free account via email/password or Google OAuth (Clerk)

**Benefits:**
- Unlimited article reading (all tiers)
- Access to basic e-courses (by Duit.co.id Team)
- Save/bookmark articles
- Track learning progress
- Download free resources
- Access to all public tools

**Content Access by Tier:**
- **Tier 0-1 Articles:** Fully accessible (open to all members)
- **Tier 2-4 Articles:** Accessible, but some may require additional actions (share gate, YouTube gate) based on `access_level` frontmatter

**Purpose:** Build registered user base for lead generation and community

---

### Level 3: Social Share Gate (Action Required)
**Content:** Articles with `access_level: "share_gate"` in frontmatter

**Action Required:** Share article on social media (Twitter, LinkedIn, WhatsApp, Facebook)

**Mechanism:**
1. Registered user reads article → clicks "Unlock Full Content" at 30% preview
2. Modal shows: "Share this article to unlock"
3. User clicks share button → opens social media with pre-filled message
4. System detects share action via Google OAuth API (Clerk integration)
5. Content unlocks for that article (logged in `content_shares` table)
6. Unlock persists for 30 days (tracked in `user_unlocks` table)

**Verification:**
- **Primary:** Google OAuth via Clerk (accurate, tied to user account)
- **Fallback:** Trust-based with rate limiting (max 5 shares/hour per user)

**Tracking:**
```sql
INSERT INTO content_shares (user_id, article_slug, platform, verified)
VALUES (:user_id, :slug, 'twitter', TRUE);

INSERT INTO user_unlocks (user_id, content_slug, unlock_method, expires_at)
VALUES (:user_id, :slug, 'social_share', DATE('now', '+30 days'));
```

---

### Level 4: YouTube Subscription Gate (Action Required)
**Content:** Articles with `access_level: "youtube_gate"` or `youtube_lock: true`

**Action Required:** Subscribe to Duit.co.id YouTube channel

**Mechanism:**
1. Article content blurred/overlaid with CTA
2. "Subscribe to our YouTube channel to unlock"
3. Click button → redirects to `youtube.com/c/duitcoid?sub_confirmation=1`
4. User subscribes → returns to site
5. Content unlocks (tracked via Google OAuth + YouTube API verification)

**Verification:**
- **Advanced:** Google OAuth with YouTube API (100% accurate subscription check)
- **Current:** Trust-based with redirect tracking (acceptable for MVP)

**Tracking:**
```sql
INSERT INTO user_unlocks (user_id, content_slug, unlock_method)
VALUES (:user_id, :slug, 'youtube_subscribe');

UPDATE users SET yt_subscribed = 1 WHERE id = :user_id;
```

---

### Level 5: Registration Gate (For E-Courses & Resources)
**Content:**
- E-courses on `/academy` (all require free registration)
- Downloadable resources (PDF guides, templates)
- Personalized dashboard (`/dashboard`)
- Comment/engagement features

**Action Required:** Create free account (email + password or Google OAuth via Clerk)

**E-Course Access Model:**
- **By Duit.co.id Team:** Completely FREE (requires registration only)
- **By Expert Providers:** Can be priced by expert, user pays OR unlocks via social actions
- Platform fee: 25% of expert course price

**Benefits of Registration:**
- Access to all free e-courses
- Track learning progress
- Download resources
- Personalized content recommendations

---

### Level 6: Payment Gate (Optional - Expert Marketplace Only)
**Content:**
- Premium e-courses by expert providers (NOT by Syamsul Alam/Duit.co.id Team)
- Expert consultation bookings
- Partner services (Franchise.id, Properti.id, Sertifikat.co.id)

**Action Required:** Payment via Midtrans/Xendit OR complete social actions (free path)

**Monetization:**
- Duit.co.id takes 25% platform fee from expert course sales
- Affiliate revenue from partner referrals
- Lead generation fees from expert consultations

**What's NEVER Paywalled:**
- ❌ Articles by Duit.co.id Team (always free with actions)
- ❌ Basic tools and calculators
- ❌ Tier 0-1 survival content
- ❌ Community membership

---

## 4. Virality System Design

### 4.1 Member Wall (Fingerprint-Based)

**For Anonymous Visitors:**
1. User lands on article from search engine or social media
2. FingerprintJS generates unique browser/device signature
3. Check `visitor_fingerprints` table: `articles_viewed < 1`?
   - YES → Full access, increment counter
   - NO → Show 30% preview + "Register for Free" modal
4. If user registers → link fingerprint to user account, grant full access

**FingerprintJS Implementation:**
```typescript
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fp = await FingerprintJS.load();
const { visitorId } = await fp.get();
// visitorId = unique hash (e.g., "1234567890abcdef...")
```

**Database Tracking:**
```sql
-- Check access
SELECT articles_viewed FROM visitor_fingerprints 
WHERE fingerprint_hash = :fingerprint;

-- Log view
INSERT INTO visitor_fingerprints (fingerprint_hash, articles_viewed, last_article_slug)
VALUES (:fingerprint, 1, :slug)
ON CONFLICT(fingerprint_hash) DO UPDATE SET
  articles_viewed = articles_viewed + 1,
  last_article_slug = :slug,
  last_article_viewed_at = CURRENT_TIMESTAMP;
```

**Anti-Gaming Measures:**
- FingerprintJS tracks: browser version, screen resolution, OS, fonts, plugins, timezone
- Works even in incognito/private mode
- IP address as fallback signal
- Rate limit: If same IP creates >3 fingerprints in 1 hour → flag for review

---

### 4.2 Comprehensive Lead Tracking

**Partner Referral Strategy:**
Each partner gets a **dedicated tracking phone number** different from their main business number. This creates immediate transparency:

**How It Works:**
1. User reads article about franchise opportunities
2. Article shows CTA: "Konsultasi dengan Franchise.id" 
3. Phone number displayed: +62-800-FRANCHISE-1 (example)
4. Partner knows ALL calls to this number are from Duit.co.id
5. No need for complex CRM integration

**All Channels Tracked:**
- **Phone Calls:** Dedicated tracking numbers per partner
- **WhatsApp Clicks:** wa.me link with tracking parameter
- **Email Clicks:** mailto: link with tracking redirect
- **Form Submissions:** Embedded forms with hidden referral field

**Database Tracking:**
```sql
INSERT INTO leads_referral (
  user_id, fingerprint_hash, partner_type, partner_name,
  contact_method, contact_number, lead_details, status
) VALUES (
  :user_id, :fingerprint, 'franchise', 'Franchise.id',
  'phone', '+628001234567', '{"article": "franchise-guide"}', 'pending'
);
```

**Partner Dashboard (Future):**
- View lead volume from Duit.co.id
- Track conversion rates
- Commission payout history

---

## 4. Virality System Design

### 4.3 Share-to-Unlock Mechanism

**User Flow:**
1. Registered user reads article with `access_level: "share_gate"`
2. Hits "content preview" limit (first 30% visible)
3. Modal appears: "Share this article to unlock full version"
4. User chooses platform: Twitter, LinkedIn, WhatsApp, Facebook
5. Pre-filled message opens (via Web Share API or platform URL):
   ```
   "Pelajari cara [benefit] yang sangat membantu! Baca panduan lengkapnya di @duitcoid 
   [article_url] #LiterasiKeuangan #Indonesia"
   ```
6. User shares → returns to site → content unlocks
7. System logs share event via Google OAuth (Clerk) verification

**Technical Implementation:**
- **Share buttons:** Web Share API (mobile) + platform-specific URLs (desktop)
- **Detection:** Google OAuth via Clerk (tied to user account, accurate)
- **Rate limiting:** Max 5 shares/hour per user
- **Unlock persistence:** 30 days (stored in `user_unlocks` table)

**Pre-filled Messages by Platform:**
```typescript
const shareMessages = {
  twitter: `Pelajari cara [benefit] yang sangat membantu! 📚 Baca panduan lengkapnya di @duitcoid\n\n[article_url] #LiterasiKeuangan #DuitCoId`,
  linkedin: `Saya baru saja membaca artikel luar biasa tentang [topic] di Duit.co.id. Sangat direkomendasikan untuk profesional Indonesia! [article_url]`,
  whatsapp: `Baca artikel ini di Duit.co.id tentang [topic] - sangat bermanfaat! Cek di: [article_url]`,
  facebook: `Artikel menarik tentang [topic] dari Duit.co.id - platform edukasi keuangan Indonesia. Baca: [article_url]`
};
```

**Database Tracking:**
```sql
-- Log share
INSERT INTO content_shares (user_id, article_slug, platform, verified)
VALUES (:user_id, :slug, 'twitter', TRUE);

-- Grant unlock
INSERT INTO user_unlocks (user_id, content_slug, unlock_method, expires_at)
VALUES (:user_id, :slug, 'social_share', DATE('now', '+30 days'));
```

---

### 4.4 E-Course Access Strategy

**Course Provider Model:**

**A. Courses by Syamsul Alam (Duit.co.id Team)**
- **Always FREE** - No monetization from founder's own content
- Requires registration only
- Philosophy: "Syamsul Alam tidak butuh uang dari member, tidak memonetasi member"
- Tag: "Free Course by Duit.co.id Team"
- Access: Unlimited for all registered users

**B. Courses by Expert Providers**
- Expert sets price (e.g., Rp 199.000, Rp 499.000)
- Duit.co.id takes 25% platform fee
- Tag: "By [Expert Name] - Rp XXX"
- Access Options:
  1. **Pay directly** via Midtrans/Xendit → instant access
  2. **Free path:** Complete social actions per module:
     - Module 1: Subscribe YouTube
     - Module 2: Share on Twitter
     - Module 3: Share on LinkedIn
     - Module 4: Refer a friend
     - Module 5+: Continue actions or pay

**Value Proposition:**
- **Free:** Access everything by engaging (takes time)
- **Paid:** Skip actions, instant access (convenience)
- Both paths lead to same content quality

**UI Display:**
```
┌──────────────────────────────────────────┐
│  📚 Excel Mastery: Formula Lanjutan      │
│  By: Budi Santoso - Rp 299.000           │
│                                          │
│  [Beli Sekarang] [Unlock Gratis]        │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  📚 Panduan Keuangan Dasar               │
│  By: Duit.co.id Team - GRATIS            │
│                                          │
│  [Mulai Belajar]                         │
└──────────────────────────────────────────┘
```

**Database Tracking:**
```sql
CREATE TABLE course_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    course_slug TEXT,
    module_number INTEGER,
    unlocked_via TEXT, -- 'social_action', 'purchase', 'referral', 'free_by_creator'
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    UNIQUE(user_id, course_slug, module_number),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

---

### 4.5 Referral System

**Mechanism:**
1. Registered user gets unique referral link: `duit.co.id/register?ref=USER123`
2. Friend signs up via link → both users get benefits:
   - Referrer: Unlock 1 e-course module OR downloadable resource
   - Referee: Welcome bonus (e.g., free PDF guide, early access to new course)

**Tracking:**
```sql
CREATE TABLE user_referrals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    referrer_id TEXT,
    referee_id TEXT,
    referred_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reward_given BOOLEAN DEFAULT FALSE,
    UNIQUE(referrer_id, referee_id)
);
```

---

## 5. YouTube Repurposing Strategy

### 5.1 Article → YouTube Video Workflow

Every article should have a corresponding YouTube video that:
- Summarizes article key points (3-5 min video)
- Drives traffic back to full article on site
- Builds YouTube subscriber base
- Increases platform awareness

### 5.2 Frontmatter Addition

Add `youtube_url` field to article frontmatter:

```yaml
---
title: "Panduan Lengkap Bebas dari Jerat Pinjol Online"
slug: "panduan-lunas-pinjol"
youtube_url: "https://youtube.com/watch?v=VIDEO_ID"
youtube_embed_position: "top" # top, middle, bottom, inline
# ... other fields
---
```

### 5.3 YouTube Embed Placement

**Options:**
- **top:** Before article content (hook viewers first)
- **middle:** After introduction (context first, then video)
- **bottom:** After article (deep dive for interested readers)
- **inline:** Within specific sections (targeted explanation)

**Component Behavior:**
- Embedded video player with custom styling
- Subscribe button overlay on video
- Auto-tracks video views (YouTube Analytics API)

---

## 6. Content Repurposing Matrix

### Multi-Platform Distribution Strategy

| Content Type | Platform | Format | CTA |
|--------------|----------|--------|-----|
| Article | Website | Full article with markdown rendering | "Subscribe for more" |
| Article Summary | YouTube | 3-5 min video with key points | "Read full article at link in description" |
| Key Quote | Twitter/X | Quote graphic with stat/insight | "Thread 👇 + Full article: [link]" |
| Infographic | Instagram/LinkedIn | Carousel post with stats | "Link in bio for full guide" |
| Tips Thread | Twitter/X | 8-10 tweet thread | "Bookmark this + read full article: [link]" |
| Short Tip | TikTok/Reels | 15-30 sec tip video | "Full guide on our website (link in bio)" |
| Discussion Prompt | Reddit/Facebook Group | Question/engagement post | "What's your experience? Full context: [link]" |
| Newsletter | Email | Weekly roundup of articles | "Read more at duit.co.id" |

### Content Repurposing Workflow

1. **Write article** (core content)
2. **Record YouTube video** (summary, repurpose article text)
3. **Extract quotes/stats** (create graphics in Canva)
4. **Write Twitter thread** (condense article into tweets)
5. **Create Instagram carousel** (visual summary)
6. **Publish across platforms** (schedule via Buffer/Later)
7. **All CTAs point back to original article** (drive traffic)

### Database Tracking (Optional):
```sql
CREATE TABLE content_distribution (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_slug TEXT,
    platform TEXT, -- youtube, twitter, instagram, tiktok, linkedin
    platform_url TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0,
    engagement_score INTEGER DEFAULT 0 -- Likes + comments + shares
);
```

---

## 7. Frontmatter Updates

### New Fields for YouTube & Repurposing

```yaml
---
# Existing fields...
title: "Panduan Lengkap Bebas dari Jerat Pinjol Online"
slug: "panduan-lunas-pinjol"
image: "/images/artikel/panduan-lunas-pinjol.jpg"

# YouTube Integration (NEW)
youtube_url: "https://youtube.com/watch?v=VIDEO_ID"
youtube_embed_position: "top" # top, middle, bottom, inline
youtube_lock: false # Requires YouTube subscribe to unlock

# Access Control (UPDATED)
access_level: "open" # open, share_gate, youtube_gate, register_gate, paid
share_gate_platforms: ["twitter", "whatsapp", "linkedin"] # Which platforms to show

# Repurposing Tracking (Internal)
repurposed_to:
  youtube: "https://youtube.com/watch?v=ABC123"
  twitter: "https://twitter.com/duitcoid/status/123456"
  instagram: "https://instagram.com/p/ABC123"
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

---

## 8. Monetization Summary

### Revenue Streams (All Third-Party Integration)

1. **Affiliate Referrals**
   - Franchise.id → Commission on franchise inquiries
   - Properti.id → Commission on property purchases
   - Sertifikat.co.id → Commission on certification sales
   - Other partners → Lead generation fees

2. **E-Course Sales**
   - Premium courses via Midtrans/Xendit
   - Free courses (with social actions) → build audience
   - Bundle deals (e.g., "Complete Financial Mastery Package")

3. **Expert Consultation**
   - Directory of verified professionals (Notaris, Pajak, Lawyer)
   - Booking fees or referral commissions
   - Premium listing fees for experts

4. **Sponsored Content** (Future)
   - Partner-sponsored articles (clearly labeled)
   - Product placements in tools
   - Webinar sponsorships

### What's NOT Monetized:
- ❌ Tier access (all free)
- ❌ Article reading (action-gated, not payment-gated)
- ❌ Basic tools (free, affiliate revenue only)
- ❌ Community membership (free with benefits)

---

## 9. User Journey Examples

### Journey 1: Viral Discovery
```
1. User sees Twitter thread about pinjol debt relief
2. Clicks link → lands on /artikel/panduan-lunas-pinjol
3. Reads preview (first 30%)
4. Modal: "Share to unlock full article"
5. User shares on WhatsApp
6. Full article unlocks
7. User sees YouTube embed → subscribes
8. User registers account to save progress
9. User explores dashboard → discovers more content
10. User returns later → becomes regular reader
```

### Journey 2: E-Course Engagement
```
1. Registered user browses /academy
2. Sees "Investing for Beginners" e-course
3. Module 1: Free (no action required)
4. Module 2: "Subscribe to YouTube to unlock"
5. Module 3: "Share on Twitter to unlock"
6. Module 4: "Share on LinkedIn to unlock"
7. Module 5: "Purchase for Rp 199.000 or refer a friend"
8. User refers friend → unlocks for free
9. User completes course → gets certificate
```

### Journey 3: Partner Conversion
```
1. User reads article about franchise business models
2. Article mentions Franchise.id as resource
3. User clicks → lands on Franchise.id (tracked)
4. User inquires about franchise → Duit.co.id gets referral fee
5. Follow-up: Email user about franchise consultation
```

---

## 10. Implementation Phases

### Phase 1: Foundation (Current)
- [x] Documentation updates (this file)
- [ ] File-based CMS with frontmatter
- [ ] Article rendering pipeline
- [ ] Basic search index generation

### Phase 2: Access Control
- [ ] Share-to-unlock modal component
- [ ] YouTube lock gate component
- [ ] Registration gate component
- [ ] Cookie/session management
- [ ] Database schema for tracking

### Phase 3: Virality Features
- [ ] Social share buttons with pre-filled messages
- [ ] Referral link system
- [ ] Share counter display ("Shared 234 times")
- [ ] Viral content leaderboard

### Phase 4: YouTube Integration
- [ ] YouTube embed component
- [ ] Frontmatter `youtube_url` support
- [ ] Video repurposing workflow documentation
- [ ] YouTube subscribe button integration

### Phase 5: E-Course Platform
- [ ] /academy page with course catalog
- [ ] Course module structure
- [ ] Progress tracking
- [ ] Payment integration (Midtrans/Xendit)
- [ ] Certificate generation

### Phase 6: Analytics & Optimization
- [ ] Share tracking dashboard
- [ ] Content performance metrics
- [ ] A/B testing for gate mechanisms
- [ ] Conversion funnel optimization

---

## 11. Content Protection Ethics

### What We DO:
✅ Gate content behind simple actions (share, subscribe, register)
✅ Provide clear value exchange (action = access)
✅ Offer multiple paths to access (free actions or paid)
✅ Respect user privacy (no selling data)
✅ Transparent about why action is required

### What We DON'T:
❌ Dark patterns (hidden buttons, misleading text)
❌ Require excessive actions (max 1 action per article)
❌ Lock basic survival content (tier 0-1 always open)
❌ Abuse personal data (GDPR-compliant)
❌ Make it impossible to access (always provide free path)

---

## 12. Success Metrics

### Virality Metrics:
- **Share Rate:** % of users who share content (target: 15-20%)
- **Viral Coefficient:** New users per existing user (target: >1.0)
- **Social Referral Traffic:** % of traffic from social shares (target: 40%+)

### Engagement Metrics:
- **YouTube Subscribers:** Growth rate (target: 1000/month)
- **Registration Rate:** % of visitors who create account (target: 10%)
- **E-Course Completion:** % who finish courses (target: 60%+)

### Monetization Metrics:
- **Partner Referral Conversions:** Leads per month (target: 100+)
- **E-Course Revenue:** Monthly sales (target: growing 20% MoM)
- **Lifetime Value:** Revenue per user (target: increasing over time)

---

## 13. Related Documentation

- **docs/CMS.md:** File-based CMS workflow
- **docs/TAXONOMY.md:** Content categorization and filtering
- **docs/PAGES.md:** Routing structure
- **docs/DATABASE.md:** Database schema for tracking
- **docs/CONTENT_REPURPOSING.md:** Multi-platform distribution guide (TODO)
