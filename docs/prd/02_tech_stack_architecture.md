# Tech Stack & Architecture: Duit.co.id

## 1. Frontend Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + @tailwindcss/typography
- **State/Data:** React Hook Form + Zod (Validation)
- **Visuals:** Framer Motion (Animations), Lucide React (Icons), Recharts (Financial charts)
- **SEO:** React Helmet Async

## 2. Backend & Infrastructure
- **API Framework:** Hono on Cloudflare Workers (Edge computing).
- **Database:** Cloudflare D1 (SQLite at the edge).
- **Storage/Cache:** Cloudflare KV (Sessions/Quiz cache).
- **Deployment:** Cloudflare Pages.
- **Authentication:** Clerk or Kinde (10k+ MAU free tier).
- **CMS:** Markdown-based with Vite/gray-matter or Sanity.io.

## 3. Technical Architecture
- **Static Site Generation (SSG):** Vite reads MD files at build time to create a `search-index.json`.
- **Dynamic Edge Logic:** Cloudflare Workers handle Auth, Quiz results storage, and Content Gating (YouTube Lock).
- **Search:** FlexSearch (client-side) for fast indexing of thousands of articles.
