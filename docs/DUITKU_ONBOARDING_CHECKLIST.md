# Duitku Onboarding Checklist for Duit.co.id

Tanggal: 2026-05-08 WIB

Dokumen ini menerjemahkan email onboarding Duitku menjadi pekerjaan konkret di repo Duit.co.id.

## Email Requirement

Pengirim: Duitku Onboarding Team `<register@duitku.com>`

Tanggal email: 2026-05-06 15:31 WIB

Permintaan Duitku:

1. Menambahkan konten produk yang dijual beserta deskripsi dan harga produk dalam Rupiah.
2. Mencantumkan email, nomor telepon, dan alamat usaha sebagai kontak support.
3. Menambahkan fitur checkout / fitur pembelian hingga pembayaran.
4. Mengintegrasikan website dengan Sandbox Duitku.
5. Menginformasikan akun testing pelanggan untuk aktivitas login.

## Current Gap

| Requirement | Current state | Needed action |
|---|---|---|
| Produk + harga | Academy ada, tetapi belum menjadi katalog checkout yang jelas | Buat katalog produk berbayar |
| Kontak support | Footer/contact belum memenuhi detail onboarding | Tambahkan email, telepon, alamat usaha |
| Checkout | Belum ada route checkout | Tambah `/checkout/[productId]` dan order summary |
| Sandbox Duitku | Belum ada API route sandbox | Tambah V2 payment methods, create transaction/inquiry, callback, dan status check |
| Akun tester | Belum ada akun khusus onboarding | Buat akun test di Clerk nanti |

## Mock Product Catalog

Gunakan mock data di:

```text
src/data/duitkuCommerceMock.ts
```

Produk mock untuk onboarding:

| Product ID | Nama | Harga |
|---|---|---:|
| `kelas-excel-cashflow-umkm` | Kelas Excel Cashflow UMKM | Rp 199.000 |
| `template-sop-bisnis` | Paket Template SOP Bisnis | Rp 99.000 |
| `sesi-konsultasi-partner-ahli` | Sesi Konsultasi Partner Ahli | Rp 150.000 |

Catatan:

- Produk ini adalah mock untuk integrasi sandbox dan verifikasi flow.
- Setelah bisnis model final, produk bisa diganti menjadi kursus expert, template, atau konsultasi partner.
- Konten Duit.co.id Team tetap bisa gratis sesuai strategi awal. Produk berbayar sebaiknya berasal dari expert/partner atau convenience unlock.

## Mock Support Contact

Mock data support:

| Field | Value |
|---|---|
| Email support | `support@duit.co.id` |
| Nomor telepon | `+62 812-0000-3488` |
| WhatsApp | `+62 812-0000-3488` |
| Alamat usaha | `Jl. Contoh Bisnis No. 1, Kuningan, Jakarta Selatan 12950, Indonesia` |
| Jam layanan | Senin-Jumat, 09:00-17:00 WIB |

Sebelum kirim ulang ke Duitku, ganti alamat dan nomor dengan data legal usaha yang benar.

## Mock Testing Customer Account

Untuk email balasan ke Duitku nanti:

| Field | Value |
|---|---|
| Login URL | `https://duit.co.id/login` |
| Email | `tester@duit.co.id` |
| Password | `DuitkuSandbox2026!` |
| Role | Customer |
| Note | Harus benar-benar dibuat di Clerk sebelum dikirim ke Duitku |

Jangan anggap akun ini aktif sampai dibuat di auth provider.

## Required Routes

Minimal untuk onboarding:

```text
/produk
/produk/[productId]
/checkout/[productId]
/checkout/return
/contact
/api/duitku/payment-methods
/api/duitku/create-transaction
/api/duitku/callback
/api/duitku/status
```

Karena app saat ini memakai static export, API route tidak akan jalan di Cloudflare Pages static output. Untuk sandbox end-to-end, pilih salah satu:

1. Deploy Next.js dengan runtime yang mendukung API routes, misalnya Workers/OpenNext.
2. Pakai Cloudflare Workers terpisah untuk endpoint Duitku.
3. Pakai server sementara untuk onboarding sandbox.

## Recommended Onboarding Flow

1. User login dengan akun tester.
2. User buka `/produk`.
3. User pilih produk.
4. User buka `/checkout/[productId]`.
5. User melihat nama produk, deskripsi, harga Rupiah, kontak support.
6. Frontend memanggil `/api/duitku/payment-methods`.
7. Server mengambil metode pembayaran sandbox dari Duitku V2.
8. User memilih metode pembayaran di UI native Duit.co.id.
9. Frontend memanggil `/api/duitku/create-transaction`.
10. Server membuat transaksi sandbox melalui Duitku V2 inquiry.
11. Duit.co.id menampilkan instruksi pembayaran atau membuka payment URL sesuai response.
12. Duitku mengirim callback ke `/api/duitku/callback`.
13. Duit.co.id verifikasi signature dan status.
14. User kembali ke `/checkout/return`.

## Reply Draft To Duitku

Gunakan setelah implementasi route dan akun tester selesai:

```text
Dear Duitku Onboarding Team,

Terima kasih atas arahan verifikasinya.

Kami sudah menambahkan:

1. Katalog produk, deskripsi, dan harga Rupiah:
   https://duit.co.id/produk

2. Kontak support:
   Email: support@duit.co.id
   Telepon/WhatsApp: +62 812-0000-3488
   Alamat: [alamat usaha legal]

3. Checkout dan pembayaran:
   https://duit.co.id/checkout/kelas-excel-cashflow-umkm

4. Sandbox Duitku:
   Website sudah terhubung ke sandbox Duitku V2 untuk daftar metode pembayaran, pembuatan transaksi, callback, dan pengecekan status.

5. Akun testing customer:
   URL login: https://duit.co.id/login
   Email: tester@duit.co.id
   Password: DuitkuSandbox2026!

Silakan digunakan untuk proses verifikasi.

Terima kasih.
```

## Progress Status

- [x] Duitku docs researched.
- [x] Mock product/support/test account data created.
- [ ] Public product catalog implemented.
- [ ] Contact/support display implemented.
- [ ] Native Duit.co.id checkout UI implemented.
- [ ] Server V2 payment-methods endpoint implemented.
- [ ] Server V2 create-transaction/inquiry endpoint implemented.
- [ ] Server callback endpoint implemented.
- [ ] D1 order storage implemented.
- [ ] Clerk test account created.
- [ ] Sandbox tested end-to-end.
- [ ] Reply sent to Duitku onboarding.
