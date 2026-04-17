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
