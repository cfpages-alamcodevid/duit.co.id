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
