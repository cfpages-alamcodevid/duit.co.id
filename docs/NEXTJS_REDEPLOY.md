# Redeploy Duit.co.id as Next.js on Cloudflare Pages

Dokumen ini untuk fase awal migrasi dari React + Vite ke Next.js App Router dengan static export.

## 1. Install dependencies

```bash
npm install
```

## 2. Local development

```bash
npm run dev
```

Next.js dev server berjalan di:

```text
http://localhost:3000
```

## 3. Build static output

```bash
npm run build
```

Karena `next.config.mjs` memakai `output: "export"`, hasil deploy ada di:

```text
out/
```

## 4. Cloudflare Pages settings

Di Cloudflare Pages, update project settings:

| Setting | Value |
|---|---|
| Framework preset | Next.js atau None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` |
| Node version | 20 atau lebih baru |

## 5. Route behavior

Fase awal ini mem-port halaman existing ke Next.js:

- `/`
- `/quiz`
- `/artikel`
- `/artikel/tier-0-survival`
- `/artikel/tier-1-hustler`
- `/artikel/tier-2-scaler`
- `/artikel/tier-3-asset-builder`
- `/artikel/tier-4-legacy`
- `/artikel/[slug]`
- `/dashboard`
- `/profile`
- `/tools`
- `/law`
- `/academy`
- `/experts`
- `/knowledge-detail`

Catatan: artikel masih memakai payload statis lama dari `public/search-index.json` dan `public/article-content/*.json`. Fase berikutnya adalah mengganti ini dengan Next.js server-side Markdown loader supaya semua artikel ter-render sebagai HTML pada build.

## 6. CMS direction

Payload tidak dipakai. Kandidat utama CMS adalah Keystatic karena content tetap berada di file Markdown/Git dan bisa diintegrasikan ke Next.js App Router tanpa database CMS.
