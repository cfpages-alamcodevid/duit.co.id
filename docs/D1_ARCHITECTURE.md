# Duit.co.id D1 Architecture

Dokumen ini menjelaskan fondasi D1 untuk menyimpan profil user, checkout, progress kursus, artikel terakhir dibaca, tier finansial, dan event penting di Duit.co.id.

## Tujuan

- Menjadikan Clerk sebagai identity provider, bukan database profil utama.
- Menjadikan Cloudflare D1 sebagai sumber data produk untuk profil, progress, order, dan tracking.
- Mencegah data Clerk menimpa D1 dengan pola sinkron satu arah: user update di Duit.co.id -> simpan ke D1 -> update metadata Clerk.
- Menyimpan birthday hanya sekali karena akan dipakai untuk benefit seperti kupon ulang tahun.
- Menyimpan nomor WhatsApp dengan format yang mudah dibaca user dan tetap normal di database.
- Melakukan self-heal untuk user yang sudah ada di Clerk tetapi belum punya row di D1.
- Menyimpan role akses berdasarkan tier agar artikel Tier 2, Tier 3, dan Tier 4 tidak dibuka oleh user Tier 0 dan Tier 1.

## Environment & Binding

Cloudflare Pages harus punya binding dan env berikut:

| Name | Type | Purpose |
|---|---|---|
| `DB` | D1 binding | Database utama Duit.co.id |
| `CLERK_JWKS_URL` | env var | URL JWKS Clerk untuk verifikasi session JWT di Pages Functions |
| `DUITKU_MERCHANT_CODE` | secret/env | Merchant code Duitku |
| `DUITKU_API_KEY` | secret | API key Duitku |
| `DUITKU_V2_BASE_URL` | env var | Sandbox: `https://sandbox.duitku.com/webapi/api/merchant` |

`CLERK_JWKS_URL` perlu diambil dari dashboard Clerk atau discovery endpoint instance Clerk. Endpoint D1 menolak request profil jika JWT Clerk tidak bisa diverifikasi.

## Core Tables

Schema SQL ada di:

```txt
docs/sql/d1_user_tracking_schema.sql
```

Tabel utama:

| Table | Isi |
|---|---|
| `users` | Profil user, email, nama, birthday lock, WhatsApp, tier, quiz, artikel terakhir |
| `user_article_reads` | Artikel yang dibaca user, progress baca, artikel terakhir |
| `orders` | Checkout course/template/konsultasi, Duitku reference, status pembayaran |
| `course_enrollments` | Akses course setelah pembelian atau promo |
| `course_progress` | Progress modul kursus |
| `user_events` | Event fleksibel seperti profile_updated, checkout_started, article_read |
| `user_tier_events` | Riwayat perubahan tier dari quiz, upgrade bisnis, atau migrasi |

## Self-Heal User Clerk ke D1

User yang dibuat di Clerk sebelum D1 aktif tidak otomatis punya row di D1. Karena itu endpoint yang memakai auth menjalankan helper self-heal:

1. Verifikasi JWT Clerk.
2. Ambil `clerk_user_id` dari claim `sub`.
3. `INSERT INTO users` jika belum ada.
4. Isi default `income_tier = tier-0-survival`, `access_role = survival`, dan `tier_source = self_heal`.
5. Jika claim JWT punya email/nama/foto, data itu dipakai sebagai fallback.

Endpoint yang sudah memakai self-heal:

| Endpoint | Self-heal behavior |
|---|---|
| `/api/profile` | Membuat row user saat profil pertama kali dibuka |
| `/api/tier` | Membuat row user sebelum menyimpan hasil quiz |
| `/api/duitku/create-transaction` | Membuat row user sebelum order login disimpan |

## Tier Role & Access

D1 menyimpan dua field utama:

| Column | Example | Purpose |
|---|---|---|
| `income_tier` | `tier-2-scaler` | Tier finansial canonical untuk filter dan rekomendasi |
| `access_role` | `scaler` | Role akses yang lebih mudah dipakai di UI/API |

Mapping role:

| Tier | Role | Artikel yang dibuka |
|---|---|---|
| `tier-0-survival` | `survival` | Tier 0 |
| `tier-1-hustler` | `hustler` | Tier 0-1 |
| `tier-2-scaler` | `scaler` | Tier 0-2 |
| `tier-3-asset-builder` | `asset_builder` | Tier 0-3 |
| `tier-4-legacy` | `legacy` | Tier 0-4 |

Catatan penting: static export membuat file artikel tetap berada di asset publik bila sudah dihasilkan sebagai JSON/HTML. Gate saat ini melindungi pengalaman UI. Untuk proteksi keras, artikel Tier 2-4 perlu dipindahkan ke delivery lewat Pages Function/Worker yang memeriksa JWT sebelum mengirim konten.

## Homepage Quiz & Upgrade Tier

Homepage memiliki quiz multi-step:

1. Pendapatan bersih bulanan.
2. Tekanan utang/cicilan.
3. Total aset.
4. Status bisnis.
5. Untuk user Tier 1 dengan bisnis berjalan: detail bisnis dan omzet.

Rule awal:

- Pendapatan < Rp 5 juta atau tekanan utang tinggi -> Tier 0.
- Rp 5-10 juta -> Tier 1.
- Rp 10-100 juta -> Tier 2.
- Rp 100 juta-1 miliar -> Tier 3.
- > Rp 1 miliar -> Tier 4.
- Aset dapat menaikkan tier: Rp 500 juta -> Tier 2, Rp 5 miliar -> Tier 3, Rp 50 miliar -> Tier 4.

Upgrade dari Tier 1 ke Tier 2:

- User mengisi data bisnis.
- User memilih omzet bisnis bulanan.
- User mencentang konfirmasi bahwa bisnis berjalan dan omzet mendekati kondisi aktual.
- Jika omzet minimal Rp 10 juta/bulan, `/api/tier` menaikkan user ke Tier 2 atau lebih tinggi sesuai omzet.

## Birthday Lock Rule

`users.birthday_date` hanya boleh diisi sekali.

Flow:

1. User membuka `/profil`.
2. Jika `birthday_date` kosong, UI menampilkan warning native situs.
3. User wajib centang konfirmasi sebelum save.
4. API menyimpan `birthday_date` dan `birthday_locked_at`.
5. Jika `birthday_date` sudah ada, API menolak perubahan tanggal lahir.

Alasan:

- Kupon ulang tahun dan segmentasi umur harus stabil.
- Menghindari abuse promo.
- Menghindari data konflik antara Clerk dan D1.

## WhatsApp Storage

UI menampilkan nomor WhatsApp dalam blok 4 digit agar mudah dibaca:

```txt
+62 8123 4567 8901
```

D1 menyimpan:

| Column | Example |
|---|---|
| `whatsapp_country` | `ID` |
| `whatsapp_country_code` | `+62` |
| `whatsapp_national_number` | `812345678901` |
| `whatsapp_e164` | `+62812345678901` |

## Clerk Sync

Setelah D1 berhasil menyimpan profil, client menjalankan `user.update()` ke Clerk dengan `unsafeMetadata.duitProfile`.

Data yang disalin ke Clerk metadata:

- `birthdayDate`
- `birthdayLocked`
- `whatsappCountry`
- `whatsappCountryCode`
- `whatsappNationalNumber`
- `whatsappE164`

Prinsip:

- D1 tetap menjadi source of truth untuk profil produk.
- Clerk hanya menyimpan metadata ringkas agar UI auth/profile tidak kosong.
- Jika sync Clerk gagal setelah D1 berhasil, UI memberi tahu user untuk mencoba simpan ulang.

## API Routes

Cloudflare Pages Functions:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/profile` | `GET` | Ambil profil D1 untuk user login |
| `/api/profile` | `POST` | Simpan profil, enforce birthday lock |
| `/api/tier` | `POST` | Simpan hasil quiz homepage, update `income_tier` dan `access_role` |
| `/api/duitku/create-transaction` | `POST` | Buat order dan transaksi Duitku |
| `/api/duitku/callback` | `POST` | Verifikasi callback dan update order |

Semua endpoint profil harus menerima:

```http
Authorization: Bearer <Clerk session JWT>
```

## Wrangler Command

Jalankan dari root repo setelah D1 database dibuat dan binding `DB` disiapkan:

```powershell
npx wrangler d1 execute <D1_DATABASE_NAME> --remote --file=docs/sql/d1_user_tracking_schema.sql
```

Untuk test lokal:

```powershell
npx wrangler d1 execute <D1_DATABASE_NAME> --local --file=docs/sql/d1_user_tracking_schema.sql
```

Ganti `<D1_DATABASE_NAME>` dengan nama database D1 di Cloudflare, misalnya `duit_co_id`.

Jika schema lama sudah pernah dijalankan sebelum role/tier access ditambahkan, jalankan migration ini sekali:

```powershell
npx wrangler d1 execute <D1_DATABASE_NAME> --remote --file=docs/sql/d1_user_access_migration.sql
```
