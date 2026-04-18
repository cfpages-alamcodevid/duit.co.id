# Bug Log & Troubleshooting: Duit.co.id

## 1. Vite Dependency Scan Failure (ENOENT: tsconfig.node.json)
- **Status:** Fixed
- **Issue:** Vite failed to scan for dependencies because it expected a `tsconfig.node.json` file (referenced in `tsconfig.json`) which was missing. Additionally, it was attempting to scan the `/stitch` directory which contains non-standard HTML files.
- **Fix:**
    1. Created `tsconfig.node.json` with appropriate compiler options for Vite config.
    2. Updated `vite.config.ts` with `optimizeDeps` settings to explicitly define entries (`index.html`, `src/main.tsx`) and exclude the `/stitch` directory.
- **Date:** April 17, 2026

## 2. ERR_CONNECTION_REFUSED on Localhost:7777
- **Status:** Fixed
- **Issue:** Server failed to start because `node_modules` were missing in a new workspace.
- **Fix:** Ran `npm install` to populate dependencies before starting the dev server.
- **Date:** April 17, 2026

## 3. ERR_CONNECTION_REFUSED (Server Not Running)
- **Status:** Fixed
- **Issue:** The development server was not active, causing `ERR_CONNECTION_REFUSED` when attempting to access `localhost:7777`.
- **Fix:** Verified `vite.config.ts` port configuration and started the server using `npm run dev`.
- **Date:** April 17, 2026

## 4. Missing Styling on Localhost:7777 (Build Errors)
- **Status:** Fixed
- **Issue:** Site was rendering without styles on localhost:7777 due to 5 TypeScript build errors preventing Vite from compiling CSS and assets.
- **Root Causes:**
    1. **Missing `badge.tsx`** - `ArticleCard.tsx` imported `@/components/ui/badge` but file didn't exist.
    2. **Missing `input.tsx`** - `LawLibrary.tsx` imported `@/components/ui/input` but file didn't exist.
    3. **Invalid import extension** - `main.tsx` imported `./App.tsx` instead of `./App` (TypeScript doesn't allow `.tsx` extension in imports unless `allowImportingTsExtensions` is enabled).
    4. **Framer Motion type conflicts (GoldShineButton)** - `React.ButtonHTMLAttributes` has incompatible event handler types (`onDrag*`, `onAnimation*`) with Framer Motion's `HTMLMotionProps<"button">`.
    5. **Framer Motion type conflicts (GreenButton)** - Same issue as #4.
    6. **Duplicate dependency** - `package.json` had `lucide-react` listed twice in dependencies.
- **Fix:**
    1. Created `src/components/ui/badge.tsx` with shadcn-style Badge component using `class-variance-authority`.
    2. Created `src/components/ui/input.tsx` with shadcn-style Input component.
    3. Changed `import App from './App.tsx'` to `import App from './App'` in `src/main.tsx`.
    4. Rewrote `GoldShineButtonProps` interface to explicitly define only needed props (`children`, `className`, `onClick`, `disabled`, `type`, `style`) instead of extending `React.ButtonHTMLAttributes`, avoiding type conflicts with Framer Motion.
    5. Same fix as #4 for `GreenButtonProps`.
    6. Removed duplicate `"lucide-react": "^0.344.0"` entry from `package.json`.
- **Verification:** `npm run build` now completes successfully with 0 errors.
- **Date:** April 18, 2026

## 5. Home.tsx 500 HMR Error (False Positive) & React Router Future Flags
- **Status:** Fixed
- **Issue:** Browser console showed `500 Internal Server Error` and `Failed to load resource` for `/src/pages/Home.tsx` with HMR reload failure.
- **Root Cause:** Transient Vite HMR cache corruption — the file (`Home.tsx`) was syntactically correct with no duplicate definitions, unclosed tags, or leftover code. All 6 component exports (HeroSection, ValuePropGrid, SocialProof, FeaturesSection, FinalCTA, Home) were defined exactly once. TypeScript (`tsc --noEmit`) and `npm run build` both passed cleanly.
- **Fix:**
    1. Verified file integrity — no syntax errors found; HMR cache likely stale.
    2. Added React Router v7 future flags to `src/main.tsx` to suppress deprecation warnings:
       ```tsx
       <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
       ```
- **Verification:** `npx tsc --noEmit` → 0 errors. `npm run build` → ✓ built in 16.22s. Dev server returns 200 for `/src/pages/Home.tsx`.
- **Date:** April 18, 2026

## 6. TypeScript Build Errors — 6 Type Errors (MarkdownRenderer, Dashboard, Quiz, content.ts)
- **Status:** Fixed
- **Issue:** `npm run build` failed with 6 TypeScript errors across 4 files.
- **Root Causes & Fixes:**
    1. **MarkdownRenderer.tsx (2 errors)** — Missing type declarations for `react-markdown` and `remark-gfm`. Also missing from `package.json`.
       - **Fix:** Created `src/types/markdown.d.ts` with module declarations. Installed `react-markdown` and `remark-gfm` via npm.
    2. **Dashboard.tsx (1 error)** — `ArticleCard` props mismatch: local `Article` interface used `excerpt` (not `description`), was missing `slug`, and had `tier: string` / `category: string[]` instead of proper union types.
       - **Fix:** Updated `Article` interface to use `description`, added `slug` field, imported and used `TierType` and `CategoryType` from `@/utils/content`. Updated all dummy article data to match.
    3. **Quiz.tsx (1 error)** — `override_reason` typed as `string | undefined` but `TierResult` interface requires `"asset_based" | "debt_based" | undefined`.
       - **Fix:** Changed variable declaration to `let override_reason: "asset_based" | "debt_based" | undefined`.
    4. **content.ts (2 errors)** — GenderType didn't include `"other"` (used in filter logic at line 187); `category` filter was typed as `string` instead of `CategoryType` (line 196).
       - **Fix:** Added `"other"` to `GenderType` union and `VALID_GENDERS` array. Changed `ArticleFilter.category` from `string` to `CategoryType`.
- **Additional missing dependencies discovered during build:** `gray-matter`, `@tailwindcss/typography` — installed via npm.
- **Verification:** `npm run build` → ✓ built in 25.14s with 0 TypeScript errors.
- **Date:** April 18, 2026

## 7. PostCSS Cannot Find Module '@tailwindcss/typography'
- **Status:** Fixed
- **Issue:** `[plugin:vite:css] [postcss] Cannot find module '@tailwindcss/typography'` error at `tailwind.config.js:101`. Package was installed (v0.5.19) but Vite/PostCSS couldn't resolve it.
- **Root Cause:** **ESM/CommonJS syntax mismatch**. The project has `"type": "module"` in `package.json`, meaning it uses ES modules. However, `tailwind.config.js` was using CommonJS `require()` syntax to import plugins:
  ```js
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ]
  ```
  In ESM context, `require()` is not defined, causing the module resolution to fail.
- **Fix:** Changed `tailwind.config.js` to use ES module `import` syntax:
  ```js
  import tailwindcssAnimate from "tailwindcss-animate";
  import tailwindcssTypography from "@tailwindcss/typography";

  export default {
    // ... config
    plugins: [
      tailwindcssAnimate,
      tailwindcssTypography,
    ],
  }
  ```
- **Verification:** `npm run build` → ✓ built in 39.85s with 0 errors.
- **Date:** April 19, 2026

## 8. MarkdownRenderer TypeError: Cannot read properties of undefined (reading 'replace')
- **Status:** Fixed
- **Issue:** Article page (`/artikel/panduan-lunas-pinjol`) showed blank white screen with console error: `Uncaught TypeError: Cannot read properties of undefined (reading 'replace')` at `processYouTubeShortcodes` in `MarkdownRenderer.tsx:31`.
- **Root Causes:**
    1. **Missing `content` field in search-index.json** — The `vite-content-plugin.ts` was generating article index entries with `excerpt` but NOT `content`. The `Article` interface expected `content: string`, but it was always `undefined`.
    2. **No null/undefined guard** — `processYouTubeShortcodes` function called `.replace()` on the `content` parameter without checking if it was defined, causing immediate crash when content was `undefined`.
- **Impact:** All article pages failed to render, showing only white space.
- **Fix:**
    1. **Added `content` field to `ArticleIndexEntry` interface** in `vite-content-plugin.ts`:
       ```ts
       interface ArticleIndexEntry {
         // ... existing fields
         excerpt: string
         content: string  // ← Added
       }
       ```
    2. **Populated `content` field in `scanArticles` function**:
       ```ts
       articles.push({
         // ... existing fields
         excerpt: generateExcerpt(parsed.content),
         content: parsed.content,  // ← Added
       })
       ```
    3. **Added null/undefined guards in `MarkdownRenderer.tsx`**:
       - Made `content` prop optional: `content?: string`
       - Added early return fallback UI when content is missing
       - Added `safeContent = content || ""` before processing
       - Updated `processYouTubeShortcodes` to handle empty strings gracefully
    4. **Fallback UI** shows: "Konten artikel sedang dimuat atau tidak tersedia."
- **Files Changed:**
    - `vite-content-plugin.ts` — Added `content` field to index entries
    - `src/components/ui/MarkdownRenderer.tsx` — Added null guards, optional typing, fallback UI
- **Verification:** Dev server auto-rebuilt search-index.json. Article page now renders full content at `/artikel/panduan-lunas-pinjol`.
- **Date:** April 19, 2026

## 9. Regression Risk: White Screen When `search-index.json` Is Excerpt-Only
- **Status:** Fixed
- **Issue:** Attempting to keep `/public/search-index.json` lightweight (without `content`) caused article detail page (`/artikel/panduan-lunas-pinjol`) to render blank/white screen because the page still expected `article.content` from the search index payload.
- **Root Cause:** Tight coupling between search payload and full article rendering.
  - Search index was used both for listing/search and for article body rendering.
  - Removing `content` reduced payload size, but broke detail page data contract.
- **Fix (Architecture Split):**
  1. **Kept `search-index.json` metadata-only** (`excerpt` + frontmatter fields, no `content`).
  2. **Added per-article content payloads** at `/public/article-content/{slug}.json` containing `{ slug, content }`.
  3. **Updated frontend loader** (`src/utils/content.ts`) to fetch full content on-demand via `getArticleBySlug(slug, { includeContent: true })`.
  4. **Added safe fallback** in `ArticlePage.tsx` to show excerpt if content payload is missing.
  5. **Updated Vite plugin** to regenerate both search index and per-slug content files on build/HMR.
- **Files Changed:**
  - `vite-content-plugin.ts`
  - `src/utils/content.ts`
  - `src/pages/ArticlePage.tsx`
  - `public/search-index.json`
  - `public/article-content/panduan-lunas-pinjol.json`
  - `docs/CMS.md`
- **Verification:** `npm run build` succeeds; `search-index.json` is small and excerpt-only; article detail remains renderable using `/article-content/{slug}.json`.
- **Date:** April 19, 2026

## 10. SEO/Publishing Risk: Bulk Articles Sharing the Same Publish Date
- **Status:** Prevented (enforced)
- **Issue:** Bulk article generation can accidentally assign the same frontmatter `date` to many slugs, creating unnatural publication patterns and poor editorial traceability.
- **Fix:**
  1. Added publish-date conflict enforcement in `vite-content-plugin.ts` (build fails on duplicate `date` across slugs).
  2. Added optional `published_at_wib` format validation (`YYYY-MM-DD HH:mm WIB`).
  3. Added machine-readable scheduler at `docs/PUBLICATION_SCHEDULE.json`.
  4. Updated writer-agent prompts and docs to require backdated, unique dates (max 1 article/day in bulk).
- **Files Changed:**
  - `vite-content-plugin.ts`
  - `docs/PUBLICATION_SCHEDULE.json`
  - `docs/CMS.md`
  - `docs/ARTICLE_CATALOG.md`
  - `.qwen/agents/article-writer.md`
  - `.gemini/agents/article-writer.md`
  - `.agents/subagents/article-writer.md`
- **Verification:** `npm run build` passes with current dataset; future duplicate date collisions now fail build with explicit conflicting slugs/date.
- **Date:** April 19, 2026
