# Cloudflare Pages Environment Variables & Secrets Checklist

Tanggal: 2026-05-08 WIB

Dokumen ini adalah checklist nilai yang perlu disiapkan di Cloudflare Pages / Workers supaya stack Duit.co.id bisa jalan dengan Next.js, Clerk, Duitku V2, D1, R2, KV, Cloudinary, dan Keystatic.

## Cara Pakai

Di Cloudflare Dashboard:

```text
Workers & Pages
  -> duit.co.id project
  -> Settings
  -> Environment variables
```

Pisahkan:

- **Production** untuk `duit.co.id`.
- **Preview** untuk branch/preview deploy.
- **Secret** untuk API key, webhook secret, merchant key, token, dan password.
- **Plain variable** untuk URL publik, mode, binding name, dan config non-rahasia.

Jangan commit nilai asli ke repo.

## Priority 0: Wajib Untuk Next.js Deploy

| Name | Type | Environment | Contoh | Sumber nilai | Status |
|---|---|---|---|---|---|
| `NODE_VERSION` | Variable | Production + Preview | `20` | Pilih versi Node yang sama dengan local | TODO |
| `NEXT_PUBLIC_SITE_URL` | Variable | Production | `https://duit.co.id` | Domain final | TODO |
| `NEXT_PUBLIC_APP_ENV` | Variable | Production | `production` | Manual | TODO |
| `NEXT_PUBLIC_APP_ENV` | Variable | Preview | `preview` | Manual | TODO |

Catatan:

- `NEXT_PUBLIC_*` terbaca di browser, jadi jangan isi secret.
- Jika tetap memakai static export sementara, server API tidak aktif. Untuk Clerk middleware dan Duitku V2, butuh Cloudflare Workers/OpenNext atau Worker terpisah.

## Priority 1: Clerk Auth

| Name | Type | Environment | Contoh | Sumber nilai | Status |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Variable | Production + Preview | `pk_live_...` / `pk_test_...` | Clerk Dashboard > API keys | TODO |
| `CLERK_SECRET_KEY` | Secret | Production + Preview | `sk_live_...` / `sk_test_...` | Clerk Dashboard > API keys | TODO |
| `CLERK_WEBHOOK_SECRET` | Secret | Production + Preview | `whsec_...` | Clerk Dashboard > Webhooks | TODO |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Variable | Production + Preview | `/login` | Manual | TODO |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Variable | Production + Preview | `/register` | Manual | TODO |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Variable | Production + Preview | `/dashboard` | Manual | TODO |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Variable | Production + Preview | `/dashboard` | Manual | TODO |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL` | Variable | Production + Preview | `/` | Manual | TODO |

Clerk production setup checklist:

- [ ] Tambahkan domain `duit.co.id` di Clerk.
- [ ] Aktifkan email/password.
- [ ] Aktifkan Google OAuth jika sudah siap.
- [ ] Buat user tester untuk Duitku: `tester@duit.co.id`.
- [ ] Set redirect URL ke route lokal Duit.co.id, bukan Account Portal default.

## Priority 2: Duitku V2 Payment Gateway

| Name | Type | Environment | Contoh | Sumber nilai | Status |
|---|---|---|---|---|---|
| `DUITKU_ENV` | Variable | Preview | `sandbox` | Manual | TODO |
| `DUITKU_ENV` | Variable | Production | `production` | Manual setelah live | TODO |
| `DUITKU_MERCHANT_CODE` | Secret | Production + Preview | `DXXXX` | Duitku Dashboard / onboarding email | TODO |
| `DUITKU_API_KEY` | Secret | Production + Preview | `...` | Duitku Dashboard | TODO |
| `DUITKU_V2_BASE_URL` | Variable | Preview | `https://sandbox.duitku.com/webapi/api/merchant` | Duitku docs | TODO |
| `DUITKU_V2_BASE_URL` | Variable | Production | `https://passport.duitku.com/webapi/api/merchant` | Duitku docs | TODO |
| `DUITKU_CALLBACK_URL` | Variable | Production | `https://duit.co.id/api/duitku/callback` | Manual | TODO |
| `DUITKU_RETURN_URL` | Variable | Production | `https://duit.co.id/checkout/return` | Manual | TODO |
| `DUITKU_TEST_CUSTOMER_EMAIL` | Variable | Preview | `tester@duit.co.id` | Manual | TODO |
| `DUITKU_TEST_CUSTOMER_PASSWORD` | Secret | Preview | `DuitkuSandbox2026!` | Manual, must match Clerk user | TODO |

Security rules:

- Hitung `signature` Duitku hanya di server.
- Harga produk harus diambil dari product catalog server-side.
- Jangan percaya `paymentAmount` dari browser.
- Simpan raw callback untuk audit, tapi jangan log API key.

## Priority 3: Cloudflare Bindings

Bindings tidak selalu berupa environment variable. Di Cloudflare Pages/Workers, binding harus dibuat di bagian project settings.

| Binding | Type | Recommended name | Kegunaan | Status |
|---|---|---|---|---|
| D1 database | D1 | `DB` | users, orders, payments, unlocks, leads, tool logs | TODO |
| R2 bucket | R2 | `MEDIA_BUCKET` | uploaded images, downloadable templates, generated PDFs | TODO |
| KV namespace | KV | `CACHE_KV` | cache ringan, feature flags, content index snapshots | TODO |
| KV namespace | KV | `SESSION_KV` | temporary checkout/session state jika diperlukan | TODO |
| KV namespace | KV | `RATE_LIMIT_KV` | rate limiting untuk auth/payment/contact APIs | TODO |

Recommended IDs to record after creation:

```env
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_D1_DATABASE_ID=...
CLOUDFLARE_R2_BUCKET_NAME=duit-media
CLOUDFLARE_CACHE_KV_NAMESPACE_ID=...
CLOUDFLARE_SESSION_KV_NAMESPACE_ID=...
CLOUDFLARE_RATE_LIMIT_KV_NAMESPACE_ID=...
```

These are useful for local Wrangler config and CI, but account IDs are not browser secrets.

## Priority 4: Cloudinary Media

Use Cloudinary only if we need faster image transformation/editorial workflow than R2 alone.

| Name | Type | Environment | Contoh | Sumber nilai | Status |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Variable | Production + Preview | `duitcoid` | Cloudinary Console | TODO |
| `CLOUDINARY_API_KEY` | Secret | Production + Preview | `...` | Cloudinary Console | TODO |
| `CLOUDINARY_API_SECRET` | Secret | Production + Preview | `...` | Cloudinary Console | TODO |
| `CLOUDINARY_URL` | Secret | Production + Preview | `cloudinary://...` | Cloudinary Console | TODO |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Variable | Preview only if unsigned upload is used | `duit_unsigned_preview` | Cloudinary upload settings | OPTIONAL |

Recommendation:

- Start with R2 for canonical media storage if possible.
- Use Cloudinary for image transformations only when needed.
- Avoid video hosting on Cloudinary free tier; put course videos on YouTube unlisted/public first, or evaluate Cloudflare Stream only after revenue exists.

## Priority 5: Keystatic / GitHub Editing

Keystatic local mode does not require production secrets.

For GitHub mode later:

| Name | Type | Environment | Contoh | Sumber nilai | Status |
|---|---|---|---|---|---|
| `KEYSTATIC_SECRET` | Secret | Production + Preview | random 32+ chars | Generate locally | LATER |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Variable | Production + Preview | `...` | GitHub OAuth App | LATER |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Secret | Production + Preview | `...` | GitHub OAuth App | LATER |
| `KEYSTATIC_REPO` | Variable | Production + Preview | `owner/duit.co.id` | GitHub repo | LATER |

Recommendation:

- Fase awal: Keystatic local mode only.
- Jangan buka `/keystatic` production sampai runtime server/API dan auth guard jelas.

## Priority 6: Site Contact & Compliance

These can be plain variables if they are public on the site.

| Name | Type | Environment | Contoh | Sumber nilai | Status |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Variable | Production + Preview | `support@duit.co.id` | Business email | TODO |
| `NEXT_PUBLIC_SUPPORT_PHONE` | Variable | Production + Preview | `+62 812-0000-3488` | Business phone | TODO |
| `NEXT_PUBLIC_SUPPORT_WHATSAPP` | Variable | Production + Preview | `6281200003488` | WhatsApp number | TODO |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Variable | Production + Preview | `...` | Legal address | TODO |

Replace mock contact values before replying to Duitku.

## Priority 7: Operational Secrets Later

Not required for first onboarding, but reserve names:

| Name | Type | Kegunaan | Status |
|---|---|---|---|
| `RESEND_API_KEY` | Secret | transactional email if using Resend | LATER |
| `TURNSTILE_SECRET_KEY` | Secret | Cloudflare Turnstile server verification | LATER |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Variable | Cloudflare Turnstile widget | LATER |
| `FINGERPRINTJS_BROWSER_TOKEN` | Variable | anonymous article limit tracking | LATER |
| `FINGERPRINTJS_SECRET_KEY` | Secret | FingerprintJS server API if used | LATER |
| `MIDTRANS_SERVER_KEY` | Secret | only if Duitku is not enough later | DEFER |
| `XENDIT_SECRET_KEY` | Secret | only if Duitku is not enough later | DEFER |

## Minimum Set For Duitku Onboarding

Do this first:

- [ ] `NODE_VERSION`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] Real Clerk tester account
- [ ] `DUITKU_ENV=sandbox`
- [ ] `DUITKU_MERCHANT_CODE`
- [ ] `DUITKU_API_KEY`
- [ ] `DUITKU_V2_BASE_URL`
- [ ] D1 binding `DB`
- [ ] Public support email, phone, WhatsApp, and address

## Official References

- Cloudflare Pages Functions pricing: https://developers.cloudflare.com/pages/functions/pricing/
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare D1 pricing: https://developers.cloudflare.com/d1/platform/pricing/
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Clerk Next.js docs: https://clerk.com/docs/nextjs/getting-started/quickstart
- Clerk pricing: https://clerk.com/pricing
- Duitku API docs: https://docs.duitku.com/api/en/
- Cloudinary billing: https://cloudinary.com/documentation/billing_and_plans
- Keystatic local mode: https://keystatic.com/docs/local-mode
- Keystatic Cloud: https://keystatic.com/docs/cloud
