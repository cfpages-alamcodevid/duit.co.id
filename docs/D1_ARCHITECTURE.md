# Duit.co.id D1 Architecture

Dokumen ini menjelaskan fondasi D1 untuk menyimpan profil user, checkout, progress kursus, artikel terakhir dibaca, tier finansial, dan event penting di Duit.co.id.

## Tujuan

- Menjadikan Clerk sebagai identity provider, bukan database profil utama.
- Menjadikan Cloudflare D1 sebagai sumber data produk untuk profil, progress, order, dan tracking.
- Mencegah data Clerk menimpa D1 dengan pola sinkron satu arah: user update di Duit.co.id -> simpan ke D1 -> update metadata Clerk.
- Menyimpan birthday hanya sekali karena akan dipakai untuk benefit seperti kupon ulang tahun.
- Menyimpan nomor WhatsApp dengan format yang mudah dibaca user dan tetap normal di database.

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
