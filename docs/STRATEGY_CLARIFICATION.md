# Duit.co.id Strategy Clarification Summary

## Date: 18 April 2026

---

## Key Clarifications Made

### 1. ✅ Tier System: Filters NOT Paywalls

**Corrected Misconception:**
- ❌ OLD: Tiers might imply restricted access (users "upgrade" through tiers)
- ✅ NEW: Tiers are purely for relevance filtering and personalization

**What This Means:**
- All users can access ALL articles across ALL tiers
- Quiz-assigned tier is a starting recommendation, NOT a restriction
- No payment or upgrade required to browse higher tiers
- Tier folders organize content for maintainability, not access control

**Documentation Updated:**
- `docs/TAXONOMY.md` - Added "Tiers Are Filters, Not Paywalls" section
- `docs/CMS.md` - Added "Tiers Organize, Don't Restrict" clarification
- `QWEN.md` - Added explicit note about tier accessibility

---

### 2. ✅ Monetization: Third-Party Integration ONLY

**Business Model Clarification:**
- ❌ OLD: Might imply tier-based subscriptions or content upgrades
- ✅ NEW: 100% third-party integration (affiliates, referrals, e-courses)

**Revenue Streams:**
1. **Affiliate Referrals**
   - Franchise.id → Commission on franchise inquiries
   - Properti.id → Commission on property purchases
   - Sertifikat.co.id → Commission on certification sales

2. **E-Course Sales** (Optional)
   - Premium courses via Midtrans/Xendit
   - BUT: Free path exists (complete social actions to unlock)

3. **Expert Consultations**
   - Directory of verified professionals
   - Booking fees or referral commissions

**What's NOT Monetized:**
- ❌ Article reading (action-gated, not payment-gated)
- ❌ Tier access (all free)
- ❌ Basic tools (free, affiliate revenue only)
- ❌ Community membership (free with benefits)

---

### 3. ✅ Content Access: "Pay with Action, Not Money"

**Access Philosophy:**
All content is fundamentally free. Users "pay" by taking actions that drive platform growth:

**Access Levels:**
| Level | Action Required | Use Case |
|-------|----------------|----------|
| `open` | None | Tier 0-1 articles, basic content |
| `share_gate` | Share on social media | Tier 2-4 articles, premium insights |
| `youtube_gate` | Subscribe to YouTube | Articles with video companions |
| `register_gate` | Create free account | E-courses, downloadable resources |
| `paid` | Purchase OR complete social actions | Premium e-courses |

**Key Principle:** Free path always exists. Payment is optional for convenience.

**Documentation:**
- Created `docs/VIRALITY_STRATEGY.md` - Complete access control mechanics
- Updated `docs/TAXONOMY.md` - Added access_level field definitions
- Updated `docs/CMS.md` - Added access level strategy section

---

### 4. ✅ Virality System Design

**Core Mechanisms:**

1. **Share-to-Unlock**
   - User reads article preview (30% visible)
   - Modal: "Share to unlock full article"
   - User shares on Twitter/LinkedIn/WhatsApp/Facebook
   - Content unlocks, system logs share event
   - Cookie stored (don't need to re-share for same article)

2. **YouTube Subscription Gate**
   - Article blurred/overlaid
   - CTA: "Subscribe to YouTube to unlock"
   - User subscribes → content unlocks
   - Tracked in `user_unlocks` database table

3. **Registration Gate**
   - E-courses, downloads, dashboard require account
   - Free registration (email + password or social login)
   - Benefits: track progress, bookmark, download resources

4. **Referral System**
   - Unique referral link per user
   - Friend signs up → both get benefits
   - Referrer: unlock premium module
   - Referee: welcome bonus (free guide)

**Viral Loop:**
```
User discovers content → Takes action to unlock → 
Platform grows → More content created → More users discover
```

---

### 5. ✅ YouTube Integration & Content Repurposing

**YouTube Frontmatter Fields Added:**
```yaml
youtube_url: "https://youtube.com/watch?v=VIDEO_ID"
youtube_embed_position: "top" # top, middle, bottom, inline
```

**Content Repurposing Strategy:**
Every article → 10+ platform adaptations:
- YouTube video (3-5 min summary)
- Twitter thread (8-12 tweets)
- Instagram carousel (7-10 slides)
- LinkedIn post (professional angle)
- TikTok/Reels (15-60 sec tip)
- Email newsletter (weekly roundup)
- Reddit/Facebook groups (discussion starter)
- Pinterest (infographic)

**All CTAs point back to original article on Duit.co.id**

**Documentation:**
- Created `docs/CONTENT_REPURPOSING.md` - Complete multi-platform distribution guide
- Includes: workflow, timeline, tools, best practices, examples

---

### 6. ✅ Frontmatter Updates

**New Fields Added:**
```yaml
# Access Control
access_level: "open" # open, share_gate, youtube_gate, register_gate, paid

# YouTube Integration
youtube_url: "https://youtube.com/watch?v=VIDEO_ID"
youtube_embed_position: "top" # top, middle, bottom, inline

# Repurposing Tracking (Internal)
repurposed_to:
  youtube: "https://youtube.com/watch?v=ABC123"
  twitter: "https://twitter.com/duitcoid/status/123456"
  instagram: "https://instagram.com/p/ABC123"
```

**Files Updated:**
- `docs/TAXONOMY.md` - Added access_level field and definitions
- `docs/CMS.md` - Added YouTube integration fields
- `QWEN.md` - Updated frontmatter example with all fields

---

## Files Created

1. **`docs/VIRALITY_STRATEGY.md`** (387 lines)
   - Complete content access control mechanics
   - Share-to-unlock system design
   - E-course access strategy
   - Referral system schema
   - YouTube repurposing workflow
   - Monetization summary
   - User journey examples
   - Implementation phases
   - Success metrics

2. **`docs/CONTENT_REPURPOSING.md`** (512 lines)
   - Multi-platform distribution matrix
   - Platform-specific content guidelines
   - YouTube video structure
   - Twitter thread format
   - Instagram carousel design
   - LinkedIn adaptation
   - TikTok/Reels strategy
   - Email newsletter template
   - Content calendar template
   - Analytics & optimization
   - Tools & resources
   - Example repurposing workflow with metrics

---

## Files Updated

1. **`docs/TAXONOMY.md`**
   - Added "Tiers Are Filters, Not Paywalls" section
   - Added access_level field definitions
   - Enhanced frontmatter example with new fields

2. **`docs/CMS.md`**
   - Added "Tiers Organize, Don't Restrict" clarification
   - Added access level strategy section
   - Added YouTube integration fields
   - Enhanced frontmatter example

3. **`docs/COMPONENTS.md`**
   - Added ShareToUnlockModal component
   - Added AccessGateWrapper component
   - Enhanced component specifications

4. **`docs/PAGES.md`**
   - Clarified article route structure
   - Added content processing workflow

5. **`docs/DATABASE.md`**
   - Clarified articles are file-based, not database-stored
   - Added content architecture section

6. **`QWEN.md`**
   - Updated tech stack (file-based CMS)
   - Updated project structure (/artikel folder organization)
   - Enhanced frontmatter example with all fields
   - Added monetization clarification
   - Added access control note
   - Updated component list

---

## What This Means for Development

### Immediate Next Steps:

1. **Phase 1: Foundation (Current)**
   - ✅ Documentation complete
   - ⏳ Install dependencies (gray-matter, react-markdown, etc.)
   - ⏳ Create Vite plugin for content processing
   - ⏳ Build article rendering pipeline

2. **Phase 2: Access Control (Next)**
   - Build ShareToUnlockModal component
   - Build YouTubeLockGate component
   - Implement cookie/session management
   - Create database tables for tracking

3. **Phase 3: Virality Features**
   - Social share buttons with pre-filled messages
   - Referral link system
   - Share counter display
   - Viral content leaderboard

4. **Phase 4: YouTube Integration**
   - YouTube embed component
   - Frontmatter youtube_url support
   - Subscribe button integration

5. **Phase 5: E-Course Platform**
   - /academy page
   - Course module structure
   - Progress tracking
   - Payment integration (optional)

---

## Questions for Your Review:

1. **Access Level Balance:**
   - Is 30% preview before share gate appropriate?
   - Should tier 0-1 always be open, or use share gate for some?

2. **Share Detection:**
   - Trust-based (cookie on button click) vs API verification?
   - Start simple (trust-based) and upgrade later?

3. **E-Course Structure:**
   - How many modules per e-course?
   - What should be free vs paid?

4. **YouTube Strategy:**
   - Should every article have companion video?
   - Or only select articles (tier 2+)?

5. **Referral Rewards:**
   - What's the right incentive?
   - Unlock premium content? Download resources?

6. **Rate Limiting:**
   - Max 5 shares per hour per IP - appropriate?
   - Should logged-in users have higher limits?

---

## Ready to Proceed?

Once you review and approve these clarifications, we can:

1. **Create article catalog/progress tracker** (docs/ARTICLE_CATALOG.md)
   - List all planned articles by tier
   - Track writing progress
   - Assign taxonomy tags

2. **Create article-writer subagent** (.qwen/agents/article-writer.md)
   - Specialized in Indonesian financial content
   - Generates complete .md files with frontmatter
   - Validates against taxonomy rules

3. **Begin Phase 1 implementation**
   - Install dependencies
   - Create markdown template
   - Build Vite plugin
   - Set up rendering pipeline

Please review and let me know your thoughts!
