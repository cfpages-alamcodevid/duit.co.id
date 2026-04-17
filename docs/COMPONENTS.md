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
| `ArticleCard` | Summary view with tier badges and read time. | Dashboard, Knowledge |
| `MarkdownRenderer` | Renders MD to HTML with Tailwind Typography. | Article View |
| `TableOfContents` | Auto-generated navigation for long articles. | Article View |
| `LawBadge` | Tooltip-enabled indicator for specific UU references. | Article View, Law |
| `YouTubeLockGate` | Overlay modal requiring sub/interaction to unlock. | Article View |
| `LawSearchFilter` | Search bar and category filters for the library. | Law Library |

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
