# Free Tier & Cost Strategy

Tanggal riset: 2026-05-08 WIB

Tujuan dokumen ini: menjaga Duit.co.id tetap bisa berkembang dengan biaya serendah mungkin, idealnya Rp 0 untuk infrastruktur awal, sehingga dana bisa diprioritaskan ke content creation, riset, video, distribusi, dan partnership.

## Executive Decision

Fase awal Duit.co.id harus memakai kombinasi:

- GitHub repo untuk source code dan Markdown content.
- Cloudflare Pages untuk static public pages.
- Cloudflare Workers/Pages Functions hanya untuk endpoint yang benar-benar butuh server: Clerk auth, Duitku V2, callback, orders, unlocks.
- Cloudflare D1 untuk data relasional ringan.
- Cloudflare R2 untuk media/file storage jika Cloudinary free tier tidak cukup.
- Clerk Hobby untuk auth selama masih di bawah batas free.
- Cloudinary Free hanya untuk optimasi gambar terbatas, bukan video course utama.
- YouTube untuk video content agar biaya hosting video tidak dimakan infra.
- Keystatic local mode dulu agar tidak perlu layanan CMS berbayar.

## Free Tier Summary

| Layer | Provider | Free tier yang relevan | Risiko biaya | Keputusan Duit.co.id |
|---|---|---|---|---|
| Static hosting | Cloudflare Pages | Static asset requests gratis dan unlimited; Pages Functions ikut kuota Workers Free | Function/API traffic bisa kena limit Workers | Pakai untuk public SEO pages |
| Edge runtime | Cloudflare Workers | 100.000 requests/day Free; CPU 10ms/invocation | Checkout/auth/API bisa limit kalau traffic tinggi | Pakai hanya untuk API penting |
| Database | Cloudflare D1 | 5 juta rows read/day, 100 ribu rows written/day, 5GB storage | Query tanpa index bisa boros rows read | Cocok untuk users/orders/unlocks/leads |
| Object storage | Cloudflare R2 | 10GB-month storage, 1 juta Class A ops/month, 10 juta Class B ops/month, egress free | Banyak asset reads langsung dari R2 bisa melewati Class B free | Cocok untuk canonical media dan downloads |
| KV | Cloudflare Workers KV | 100 ribu reads/day, 1.000 writes/day, 1GB stored | Write-heavy session/rate limit bisa mentok | Pakai untuk cache kecil, bukan database |
| Image optimization | Cloudflare Images Free | 5.000 unique transformations/month untuk image stored outside Images | Setelah limit, transform baru error, tidak auto-bill | Opsi murah jika pakai R2 + transformations |
| Auth | Clerk Hobby | 50.000 monthly active/requesting users per app, no credit card | Branding removal/enterprise features butuh Pro | Pakai sampai growth jelas |
| Media CDN | Cloudinary Free | 25 monthly credits; 1 credit = 1.000 transformations atau 1GB storage atau 1GB image bandwidth | Video dan banyak image transformation cepat habis | Pakai terbatas untuk editorial images |
| Video hosting | YouTube | Gratis untuk public/unlisted video | UX, dependency platform, gating verification terbatas | Pakai untuk course/free video awal |
| Video platform | Cloudflare Stream | Tidak ada free tier praktis; storage mulai $5/1.000 menit dan delivery $1/1.000 menit | Biaya video cepat tumbuh | Tunda sampai ada revenue |
| CMS | Keystatic local | Local mode gratis, content di filesystem/Git | GitHub collaboration mode/admin production butuh runtime dan mungkin Cloud/Pro fitur | Local dulu, GitHub mode nanti |
| CI/CD | GitHub Actions | Public repos free; private GitHub Free 2.000 minutes/month dan 500MB artifact storage | Private repo heavy build bisa habis | Build di Cloudflare Pages, minimize Actions |
| Payments | Duitku | Tidak ada biaya bulanan yang terlihat; biaya per transaksi | MDR/fixed fee per payment method | Biaya muncul hanya saat transaksi |

## Cloudflare Strategy

### Pages

Best use:

- Homepage.
- Article pages.
- SEO landing pages.
- Static tools that calculate fully in browser.

Avoid:

- Running every route through Functions.
- Server-rendering content that could be static.

Reasoning: static asset requests are free/unlimited, while Functions consume Workers quota.

### Workers / Pages Functions

Use only for:

- Clerk-protected API.
- Duitku V2 payment methods and transaction creation.
- Duitku callback and transaction status verification.
- D1 writes for orders, leads, unlocks, and course progress.

Avoid:

- Article rendering in Worker on every request.
- Heavy Markdown parsing at request time.
- Large JSON search payload served from Worker instead of static file.

### D1

Use for:

- `users`
- `orders`
- `payment_events`
- `user_unlocks`
- `content_shares`
- `tool_logs`
- `leads_referral`
- `course_progress`

Cost guardrails:

- Add indexes before launch.
- Avoid `SELECT *` across large tables.
- Paginate dashboards.
- Store article bodies in Markdown, not D1.
- Track D1 `rows_read` and `rows_written` in Cloudflare dashboard.

### R2

Use for:

- Course downloadable templates.
- Generated PDFs.
- Original uploaded images.
- Large static resources.

Cost guardrails:

- Keep Standard storage for free tier; Infrequent Access free tier does not apply.
- Put CDN/cache in front of frequently accessed assets.
- Do not use R2 as a high-frequency tiny-object database.
- Keep videos on YouTube first.

### KV

Use for:

- Feature flags.
- Cached small manifests.
- Rate-limit counters if write volume is low.
- Temporary checkout state with short TTL.

Avoid:

- Financial ledgers.
- Orders/payments source of truth.
- High-write analytics stream.

## Clerk Strategy

Use Clerk Hobby while:

- User base is under free tier.
- We can tolerate Clerk branding in some surfaces.
- We do not need enterprise SSO.

Keep auth cheap:

- Use Clerk for identity/session.
- Store app profile in D1.
- Do not overuse Clerk Backend API on every page; cache/join in D1 where sensible.
- Use customized Clerk components first before building full custom auth flows.

Upgrade trigger:

- Need to remove Clerk branding.
- Need more advanced enterprise/security features.
- Usage exceeds free tier.

## Cloudinary vs R2

Recommended initial split:

| Asset type | Preferred home | Reason |
|---|---|---|
| Article images | R2 or repo static assets | Cheaper and closer to Cloudflare |
| Social thumbnails | Cloudinary optional | Useful transformations |
| Course downloads | R2 | Egress free and storage cheap |
| Course videos | YouTube | Avoid video infra cost |
| Marketing videos | YouTube/TikTok/Instagram native | Free distribution |
| User-uploaded media | R2 later | Need moderation and lifecycle rules |

Cloudinary free tier is useful, but do not make it the only canonical storage for important assets if we can keep originals in R2/Git.

## Duitku Cost Notes

Duitku is not free per transaction. Based on published pricing, examples include:

- QRIS: 0.7% per transaction.
- Virtual Account: fixed fees by bank, for example BCA VA Rp 5.000 and several others around Rp 3.000.
- Credit card: 2.9% + Rp 2.500.
- E-wallet: percentage or fixed fee depending method.

Recommendation:

- For low-ticket products, prefer QRIS/e-wallet if user behavior supports it.
- Show payment fees transparently if allowed by Duitku rules and Indonesian payment regulations.
- Keep product price high enough that fixed VA fees do not eat margin.

## Minimal-Cost Launch Architecture

```text
GitHub
  -> Cloudflare Pages static build
      -> public pages/articles/tools
      -> static search index

Cloudflare Worker/OpenNext only where needed
  -> Clerk protected API
  -> Duitku V2 payment API
  -> D1 writes/reads
  -> R2 signed/download URLs

D1
  -> app data, no article bodies

R2
  -> media/downloads

YouTube
  -> video lessons/content

Keystatic local
  -> edit Markdown in repo
```

## Monthly Cost Target

| Phase | Expected infra cost | Notes |
|---|---:|---|
| Static content MVP | Rp 0 | Pages + GitHub + Markdown |
| Auth + checkout sandbox | Rp 0 if under free limits | Clerk Hobby + Workers Free + D1 Free |
| Early production sales | Rp 0 infra + Duitku transaction fees | Payment fees only when revenue exists |
| Media-heavy growth | Rp 0 to low USD | R2/Cloudinary limits determine cost |
| Course platform with hosted video | Paid likely | Use YouTube first |

## Cost Guardrails

- [ ] Keep article rendering static whenever possible.
- [ ] Keep article body out of D1.
- [ ] Put all payment/order writes in D1 with indexes.
- [ ] Use R2 for downloads, not Cloudinary video.
- [ ] Use YouTube for video until revenue justifies hosted video.
- [ ] Add Cloudflare usage review to monthly ops routine.
- [ ] Set Cloudinary usage alerts.
- [ ] Avoid paid Clerk add-ons until we need them.
- [ ] Do not enable Cloudflare Stream by default.
- [ ] Do not add paid SaaS search before static Pagefind/FlexSearch fails.

## Official Sources

- Cloudflare Pages Functions pricing: https://developers.cloudflare.com/pages/functions/pricing/
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Cloudflare Images pricing: https://developers.cloudflare.com/images/pricing/
- Cloudflare Stream pricing: https://developers.cloudflare.com/stream/pricing/
- Clerk pricing: https://clerk.com/pricing
- Cloudinary billing and plans: https://cloudinary.com/documentation/billing_and_plans
- Cloudinary pricing: https://cloudinary.com/pricing
- GitHub Actions billing: https://docs.github.com/en/billing/managing-billing-for-your-products/about-billing-for-github-actions
- Keystatic local mode: https://keystatic.com/docs/local-mode
- Keystatic Cloud: https://keystatic.com/docs/cloud
- Duitku pricing: https://www.duitku.com/en/pricing/
