# Component Documentation: Duit.co.id

This document maps React components to the pages defined in `docs/PAGES.md`. All components must adhere to the Glassmorphism standards in `docs/DESIGN.md`.

## 1. Global & Shared Layout Components
Used across most or all pages.

| Component Name | Description | Used In |
| :--- | :--- | :--- |
| `AppShell` | Main layout wrapper with responsive padding. | All Pages |
| `Navbar` | Glassmorphic top bar with Tier indicator and Auth links. | All Pages |
| `Footer` | Minimalist footer with legal links and branding. | All Pages |
| `Sidebar` | Collapsible nav for Dashboard and Knowledge Hub. | Dashboard, Knowledge, Tools |
| `SEO` | Wrapper for `react-helmet-async` to handle metadata. | All Pages |
| `GlassCard` | Base container with blur, ghost border, and soft shadow. | All Pages |
| `GoldShineButton` | Premium CTA button with cursor-tracking highlight. | Landing, Quiz, Dashboard |
| `GreenButton` | Primary action button with Rich Money Green gradient. | All Pages |
| `FingerprintGate` | Wraps content, checks FingerprintJS hash, enforces 1 free article limit for anonymous visitors. | Article Pages |
| `MemberWall` | Modal shown to anonymous visitors after 1 free article: "Register for Free to Continue Reading". | Article Pages |
| `AccessGateWrapper` | Master wrapper that checks access_level from frontmatter and applies appropriate gate (open, share_gate, youtube_gate, register_gate, paid). | Article Pages, E-Courses |

## 2. Landing & Acquisition Components
Focus on conversion and prestige.

| Component Name | Description | Page |
| :--- | :--- | :--- |
| `HeroSection` | Large display typography with value prop and main CTA. | Home |
| `ValuePropGrid` | Glass cards showcasing the 4 Tiers and benefits. | Home |
| `SocialProof` | Clean display of partner logos and trust badges. | Home |

## 3. Discovery & Profile Components
Logic-heavy components for user data.

| Component Name | Description | Page |
| :--- | :--- | :--- |
| `FinancialQuiz` | Multi-step form with branch logic and progress bar. | Quiz |
| `TierBanner` | Dynamic banner showing user's current economic status. | Dashboard |
| `MyFeedGrid` | Grid of `ArticleCard` filtered by Tier/Age/Gender. | Dashboard |
| `RecommendationSection` | "Next Step" widgets for tools and courses. | Dashboard |
| `ProfileSettings` | Form to update user info and gender preferences. | Profile |

## 4. Content & Knowledge Components
For rendering Markdown and legal data.

| Component Name | Description | Page |
| :--- | :--- | :--- |
| `ArticleCard` | Summary view with tier badges, taxonomy filters, featured image, and read time. Shows provider info for e-courses. | Dashboard, Knowledge, Academy |
| `MarkdownRenderer` | Renders Markdown to HTML with Tailwind Typography plugin styling. Supports code blocks, tables, images, callouts, YouTube embeds. | Article View |
| `TableOfContents` | Auto-generated navigation sidebar from article headings (h2, h3, h4). Sticky positioning with scroll-spy highlighting. | Article View |
| `LawBadge` | Tooltip-enabled indicator for specific UU references. | Article View, Law |
| `YouTubeLockGate` | Overlay component that blurs content until user subscribes to YouTube. Tracks unlock via Google OAuth. | Article View |
| `ShareUnlockModal` | Modal with social share buttons (Twitter, LinkedIn, WhatsApp, Facebook) with pre-filled messages. Unlocks content on share verification. | Article View, E-Courses |
| `ContentFilter` | Multi-filter UI for taxonomy (tier, gender, age, location, education, category). Returns filtered ArticleCard grid. | Knowledge Hub, Dashboard |
| `TierBadge` | Reusable badge component displaying tier color-coding (survival=red, hustler=orange, scaler=blue, asset-builder=green, legacy=gold). | ArticleCard, Knowledge Hub |
| `YouTubeEmbed` | Responsive YouTube video player with subscribe button overlay. Position controlled by frontmatter `youtube_embed_position`. | Article View |
| `ExpertCTA` | Inline call-to-action box at end of articles for lead generation. Shows dedicated tracking phone number for partners. | Article View |
| `LeadTracker` | Invisible component that logs clicks on phone/WhatsApp/email links to `leads_referral` table. | Article View, Expert Cards |

### ArticleCard Specifications
```typescript
interface ArticleCardProps {
  title: string;
  description: string;
  image?: string; // Featured image URL from frontmatter
  slug: string;
  tier: TierType; // 'tier-0-survival' | 'tier-1-hustler' | ...
  category: string[]; // e.g., ['hukum', 'keuangan']
  readTime?: string; // e.g., '8 min'
  isPremium?: boolean;
  accessLevel?: 'open' | 'share_gate' | 'youtube_gate' | 'register_gate' | 'paid';
  date?: string; // ISO date string
  youtubeUrl?: string; // Companion video URL
}
```

### AccessGateWrapper Specifications
```typescript
interface AccessGateWrapperProps {
  accessLevel: 'open' | 'share_gate' | 'youtube_gate' | 'register_gate' | 'paid';
  userStatus: 'anonymous' | 'registered';
  articlesViewed: number; // For anonymous visitors
  hasShared: boolean; // For share_gate
  hasYoutubeSubscribed: boolean; // For youtube_gate
  children: React.ReactNode;
}
```

**Logic:**
- `open` → Render children directly
- `share_gate` → Check if user has shared, if yes render children, else show ShareUnlockModal
- `youtube_gate` → Check if yt_subscribed, if yes render children, else show YouTubeLockGate
- `register_gate` → Check if registered, if yes render children, else show MemberWall
- `paid` → Check if purchased or unlocked via social actions, else show payment modal

### FingerprintGate Specifications
- Uses FingerprintJS to generate unique visitor hash
- Checks `visitor_fingerprints` table for `articles_viewed` count
- If < 1: Allow full access, increment counter
- If >= 1: Show 30% preview + MemberWall modal
- Links to user account after registration

### ShareUnlockModal Specifications
- **Platforms:** Twitter, LinkedIn, WhatsApp, Facebook
- **Pre-filled messages:** Indonesian language, platform-optimized
- **Verification:** Google OAuth via Clerk (accurate)
- **Rate limit:** Max 5 shares/hour per user
- **Unlock persistence:** 30 days (stored in user_unlocks)

### YouTubeLockGate Specifications
- **CTA Button:** "Subscribe to YouTube untuk Unlock"
- **Redirect:** `youtube.com/c/duitcoid?sub_confirmation=1`
- **Verification:** Google OAuth + YouTube API (future), trust-based (MVP)
- **Styling:** Blurred overlay with glassmorphic modal

### ExpertCTA Specifications
- **Display:** Glassmorphic card at article end
- **Content:** Partner name, description, dedicated tracking phone
- **Tracking:** Logs to `leads_referral` table with contact_method
- **Variants:** franchise, property, certificate, expert, tax, legal

### LeadTracker Specifications
- **Invisible component** - no UI
- **Tracks:** Phone clicks, WhatsApp clicks, email clicks, form submissions
- **Method:** Intercepts link clicks, logs to database, then redirects
- **Data:** user_id/fingerprint, partner_type, contact_method, timestamp

## 5. Financial Tools (Interactive)
Modular components for building calculators.

| Component Name | Description | Page |
| :--- | :--- | :--- |
| `ToolWrapper` | Frame for tools with instructions and reset buttons. | Tools |
| `CurrencyInput` | Input field with auto-formatting and "Rp" prefix. | Tools |
| `ResultDisplay` | Animated numbers and charts (Recharts) for output. | Tools |
| `PDFGeneratorButton` | Exports result data to PDF (jspdf). | Tools |

## 6. Marketplace & Conversion
Bridging to professional services.

| Component Name | Description | Page |
| :--- | :--- | :--- |
| `ExpertDirectoryCard` | Contact card for verified partners (Notaris/Pajak). | Experts |
| `ProductCard` | Sales card for digital products/courses. | Academy |
| `ExpertCTA` | Inline box at the end of articles for lead gen. | Article View |
| `TrustBadge` | Small indicator for "Verified by Duit.co.id". | All Marketplace |

## 7. Component Structure Rules
- **Location:** `src/components/ui/` for primitives (shadcn), `src/components/shared/` for global layouts, and `src/components/pages/` for page-specific logic.
- **Props:** Every component must use TypeScript interfaces for prop definitions.
- **Styling:** Use Tailwind utility classes for the glassmorphism effects specified in `docs/DESIGN.md`.
