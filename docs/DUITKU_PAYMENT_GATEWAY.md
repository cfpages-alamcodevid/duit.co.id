# Duitku Payment Gateway Research

Tanggal riset: 2026-05-08 WIB

Dokumen ini merangkum dokumentasi resmi Duitku yang relevan untuk integrasi payment gateway di Duit.co.id.

## Rekomendasi Integrasi Untuk Duit.co.id

Gunakan **Duitku V2 API** untuk fase onboarding dan produksi awal.

Alasan:

- Duit.co.id butuh checkout yang tampil seperti produk native, bukan popup/payment page generik Duitku.
- V2 memungkinkan Duit.co.id menampilkan pilihan metode pembayaran dengan UI sendiri.
- Order summary, product detail, support contact, dan trust copy bisa mengikuti desain "The Sovereign Vault".
- Flow pembayaran tetap memakai endpoint dan callback resmi Duitku, tetapi pengalaman sebelum redirect/instruction page dikontrol oleh Duit.co.id.

Catatan penting:

- V2 lebih banyak pekerjaan daripada POP.
- Amount, fee, order id, dan signature wajib dihitung server-side.
- Untuk Cloudflare Pages static export, endpoint API tidak akan jalan. Integrasi V2 butuh Cloudflare Workers/OpenNext atau Worker terpisah.

## Opsi Integrasi Resmi

| Opsi | Kegunaan | Catatan |
|---|---|---|
| Duitku V2 API | Merchant membuat pilihan metode dan halaman pembayaran sendiri | Rekomendasi Duit.co.id |
| Duitku POP | Checkout cepat dengan payment page/POP dari Duitku | Tidak dipilih karena UI tidak native Duit.co.id |
| Plugin CMS | WooCommerce, Magento, Prestashop, OpenCart, dan lain-lain | Tidak relevan karena Duit.co.id memakai Next.js |

## Duitku V2 Custom UI Flow

Alur V2 yang disarankan:

1. User login dengan Clerk.
2. User membuka `/produk` atau `/academy`.
3. User memilih produk dan masuk ke `/checkout/[productId]`.
4. Frontend meminta daftar metode pembayaran ke server Duit.co.id.
5. Server memanggil Duitku `getpaymentmethod` sandbox.
6. Frontend menampilkan metode pembayaran dengan UI Duit.co.id.
7. User memilih metode pembayaran.
8. Frontend memanggil server untuk membuat transaksi/inquiry.
9. Server menghitung signature dan memanggil Duitku V2 inquiry.
10. Duit.co.id menampilkan instruksi pembayaran atau redirect URL sesuai response metode.
11. Duitku mengirim callback ke `/api/duitku/callback`.
12. Server memverifikasi signature callback dan mengecek status transaksi.
13. User melihat status di `/checkout/return` atau halaman order.

Untuk Duit.co.id:

```text
/produk
  -> /checkout/[productId]
  -> GET /api/duitku/payment-methods?productId=...
  -> Duitku V2 getpaymentmethod
  -> user selects paymentMethod in native Duit.co.id UI
  -> POST /api/duitku/create-transaction
  -> Duitku V2 inquiry
  -> /checkout/instruction/[orderId] or provider paymentUrl
  -> Duitku calls /api/duitku/callback
  -> Duit.co.id verifies signature and checks transaction status
  -> /checkout/return?orderId=...
```

## Duitku V2 API

V2 API is useful if Duit.co.id wants a custom payment page.

### Get Payment Method

Sandbox:

```text
POST https://sandbox.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod
```

Production:

```text
POST https://passport.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod
```

Signature:

```text
SHA256(merchantCode + paymentAmount + datetime + apiKey)
```

Recommended server route:

```text
GET /api/duitku/payment-methods?productId=kelas-excel-cashflow-umkm
```

Server must:

- Load product and price from trusted product catalog.
- Ignore any client-submitted price.
- Generate `datetime` server-side.
- Sign request server-side.
- Return only UI-safe payment method fields to frontend.

### Request Transaction / Inquiry

Sandbox:

```text
POST https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry
```

Production:

```text
POST https://passport.duitku.com/webapi/api/merchant/v2/inquiry
```

Signature:

```text
MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
```

Recommended server route:

```text
POST /api/duitku/create-transaction
```

Server must:

- Require signed-in Clerk user for checkout.
- Create local order row before calling Duitku.
- Generate unique `merchantOrderId`.
- Calculate `paymentAmount` from server-side product data.
- Verify selected `paymentMethod` is one of the allowed methods returned by Duitku.
- Save Duitku reference/payment code/payment URL/instructions.
- Return an order id and next action to frontend.

### Duit.co.id V2 Sandbox Payload Shape

```json
{
  "merchantCode": "DXXXX",
  "paymentAmount": 199000,
  "merchantOrderId": "DUIT-20260508-0001",
  "productDetails": "Kelas Excel Cashflow UMKM",
  "additionalParam": "productId=kelas-excel-cashflow-umkm",
  "merchantUserInfo": "clerk_user_id_or_tester@duit.co.id",
  "customerVaName": "Duitku Tester",
  "email": "tester@duit.co.id",
  "phoneNumber": "081200003488",
  "paymentMethod": "VC",
  "callbackUrl": "https://duit.co.id/api/duitku/callback",
  "returnUrl": "https://duit.co.id/checkout/return",
  "signature": "server_generated_md5"
}
```

## Duitku POP Notes

Alur resmi POP:

1. User melakukan checkout.
2. Server merchant meminta `DUITKU_REFERENCE` ke Duitku.
3. Duitku mengembalikan reference dan payment URL.
4. Server mengirim halaman/response ke browser.
5. Frontend memanggil `checkout.process(DUITKU_REFERENCE, options)`.
6. Duitku memproses pembayaran dan menjalankan callback JavaScript.
7. Duitku mengirim callback payment notification ke server merchant.

Untuk Duit.co.id:

```text
/academy or /produk
  -> /checkout/[productId]
  -> POST /api/duitku/create-invoice
  -> Duitku sandbox createInvoice
  -> Frontend opens Duitku POP or redirects paymentUrl
  -> Duitku calls /api/duitku/callback
  -> Duit.co.id verifies signature and checks transaction status
  -> User returns to /checkout/return
```

POP is documented here only as fallback/reference. It is not the preferred Duit.co.id path because checkout should use a custom Duit.co.id interface.

## Duitku POP Create Invoice

### Endpoint

Sandbox:

```text
POST https://api-sandbox.duitku.com/api/merchant/createInvoice
```

Production:

```text
POST https://api-prod.duitku.com/api/merchant/createInvoice
```

### Required Headers

Duitku POP uses request headers:

```text
Accept: application/json
Content-Type: application/json
x-duitku-signature: SHA256(merchantCode + timestamp + apiKey)
x-duitku-timestamp: timestamp in milliseconds, Jakarta time basis
x-duitku-merchantcode: merchant code
```

### Important Request Fields

| Field | Required | Notes |
|---|---|---|
| `paymentAmount` | Yes | Integer Rupiah, no decimal |
| `merchantOrderId` | Yes | Unique order id from Duit.co.id |
| `productDetails` | Yes | Product/service description |
| `paymentMethod` | Optional | Empty string lets customer choose in POP |
| `customerVaName` | Yes for bank view | Customer name shown on bank/payment side |
| `email` | Yes | Customer email |
| `phoneNumber` | Optional | Customer phone |
| `itemDetails` | Recommended | Product items, price, quantity |
| `customerDetail` | Recommended | Customer and address object |
| `callbackUrl` | Yes | Public URL for Duitku server notification |
| `returnUrl` | Yes | Redirect URL after payment flow |
| `expiryPeriod` | Optional | Expiry in minutes |

### Duit.co.id Sandbox Payload Shape

```json
{
  "paymentAmount": 199000,
  "merchantOrderId": "DUIT-20260508-0001",
  "productDetails": "Kelas Excel Cashflow UMKM",
  "additionalParam": "source=academy",
  "merchantUserInfo": "tester@duit.co.id",
  "paymentMethod": "",
  "customerVaName": "Duitku Tester",
  "email": "tester@duit.co.id",
  "phoneNumber": "081200003488",
  "itemDetails": [
    {
      "name": "Kelas Excel Cashflow UMKM",
      "price": 199000,
      "quantity": 1
    }
  ],
  "customerDetail": {
    "firstName": "Duitku",
    "lastName": "Tester",
    "email": "tester@duit.co.id",
    "phoneNumber": "081200003488",
    "billingAddress": {
      "firstName": "Duitku",
      "lastName": "Tester",
      "address": "Jl. Contoh Bisnis No. 1",
      "city": "Jakarta Selatan",
      "postalCode": "12950",
      "phone": "081200003488",
      "countryCode": "ID"
    },
    "shippingAddress": {
      "firstName": "Duitku",
      "lastName": "Tester",
      "address": "Jl. Contoh Bisnis No. 1",
      "city": "Jakarta Selatan",
      "postalCode": "12950",
      "phone": "081200003488",
      "countryCode": "ID"
    }
  },
  "callbackUrl": "https://duit.co.id/api/duitku/callback",
  "returnUrl": "https://duit.co.id/checkout/return",
  "expiryPeriod": 60
}
```

## Callback Handling

Duitku sends payment notification to `callbackUrl` using HTTP POST with `x-www-form-urlencoded`.

Important callback fields:

| Field | Meaning |
|---|---|
| `merchantCode` | Duitku project code |
| `amount` | Transaction amount |
| `merchantOrderId` | Duit.co.id order id |
| `productDetail` | Product description |
| `paymentCode` | Payment method code |
| `resultCode` | `00` success, `01` failed |
| `merchantUserId` | User id or email if provided |
| `reference` | Duitku transaction reference |
| `signature` | Callback signature |

Callback signature verification:

```text
MD5(merchantCode + amount + merchantOrderId + apiKey)
```

Implementation rule:

- Reject callback if required fields are missing.
- Recompute signature server-side.
- If signature mismatch, return error and do not update order.
- If signature valid, call transaction status check before marking order paid.
- Return HTTP 200 OK after successful processing.

## Callback Network Requirements

Official docs mention callback URL must be publicly reachable and return HTTP 200 OK.

Requirements:

- Public URL.
- Port 80 or 443.
- HTTP POST handler.
- Return 200 OK.

Sandbox outgoing IPs listed by Duitku:

```text
182.23.85.11
182.23.85.12
103.177.101.187
103.177.101.188
```

Production outgoing IPs listed by Duitku:

```text
182.23.85.8
182.23.85.9
182.23.85.10
182.23.85.13
182.23.85.14
103.177.101.184
103.177.101.185
103.177.101.186
103.177.101.189
103.177.101.190
```

## Redirect / Return URL

`returnUrl` is where Duitku sends the customer after payment.

Important rule:

- Do not use `resultCode` from redirect as the source of truth.
- Redirect URL can be manually changed by user.
- Use callback + transaction status check before unlocking purchased product.

Redirect result codes:

| Code | Meaning |
|---|---|
| `00` | Success |
| `01` | Pending |
| `02` | Canceled / failed |

## Check Transaction

Use transaction status check to verify order state.

Endpoint:

Sandbox:

```text
POST https://sandbox.duitku.com/webapi/api/merchant/transactionStatus
```

Production:

```text
POST https://passport.duitku.com/webapi/api/merchant/transactionStatus
```

Signature:

```text
MD5(merchantCode + merchantOrderId + apiKey)
```

Status codes:

| Code | Meaning |
|---|---|
| `00` | Success |
| `01` | Process |
| `02` | Failed / expired |

## Payment Method Codes

Common methods from Duitku docs:

| Type | Code | Description |
|---|---|---|
| Credit Card | `VC` | Visa / Master Card / JCB |
| Virtual Account | `BC` | BCA VA |
| Virtual Account | `M2` | Mandiri VA |
| Virtual Account | `VA` | Maybank VA |
| Virtual Account | `I1` | BNI VA |
| Virtual Account | `B1` | CIMB Niaga VA |
| Virtual Account | `BT` | Permata VA |
| Virtual Account | `BR` | BRIVA |
| Virtual Account | `BV` | BSI VA |
| Retail | `FT` | Pegadaian / Alfa / Pos |
| Retail | `IR` | Indomaret |
| E-Wallet | `OV` | OVO |
| E-Wallet | `SA` | ShopeePay Apps |
| E-Wallet | `DA` | DANA |
| QRIS | `SP` | ShopeePay |
| QRIS | `NQ` | Nobu |
| QRIS | `GQ` | Gudang Voucher |
| QRIS | `SQ` | Nusapay |
| Paylater | `DN` | Indodana |
| Paylater | `AT` | ATOME |
| E-Banking | `JP` | Jenius Pay |

For V2 custom UI, fetch available methods for the exact order amount and let the user choose inside Duit.co.id checkout. Do not let the browser submit or override the final price.

## Sandbox Testing Data

Credit card sandbox examples:

| Card | Number | Valid Thru | CVV |
|---|---|---|---|
| VISA | `4000 0000 0000 0044` | `03/33` | `123` |
| MASTERCARD | `5500 0000 0000 0004` | `03/33` | `123` |

Nusapay QRIS sandbox example:

| Phone | PIN | OTP |
|---|---|---|
| `08188886666` | `123789` | `123456` |

Indodana Paylater examples:

| Phone | PIN | OTP |
|---|---|---|
| `081282325566` | `000000` | Not listed |
| `0838499610` | `123654` | `999999` |
| `085780110019` | `123654` | `999999` |

Atome examples:

| Scenario | Country | Mobile | OTP |
|---|---|---|---|
| Success | ID | `+62811000122` | `7524` |
| Failure | ID | `+62810000001500` | `1111` |

Jenius Pay sandbox:

| Email | Password | CashTag | OTP |
|---|---|---|---|
| Test email from Duitku docs | `P@ssw0rd123` | `$testjenpay4` | Any 6 digits |

## Required Environment Variables

For actual integration:

```text
DUITKU_ENV=sandbox
DUITKU_MERCHANT_CODE=...
DUITKU_API_KEY=...
DUITKU_V2_BASE_URL=https://sandbox.duitku.com/webapi/api/merchant
NEXT_PUBLIC_SITE_URL=https://duit.co.id
```

Do not commit real Duitku merchant code or API key.

## Suggested Database Tables

For D1 + Drizzle later:

```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  customer_email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'IDR',
  status TEXT NOT NULL DEFAULT 'pending',
  duitku_reference TEXT,
  duitku_payment_method TEXT,
  duitku_va_number TEXT,
  duitku_payment_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  result_code TEXT,
  raw_payload TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Implementation Checklist

- [ ] Add product/price display on `/academy` or `/produk`.
- [ ] Add support contact page with email, phone, and business address.
- [ ] Add native checkout route.
- [ ] Add server route for V2 payment methods.
- [ ] Add server route for V2 create transaction/inquiry.
- [ ] Add server route for Duitku callback.
- [ ] Add return route.
- [ ] Add transaction status check.
- [ ] Store pending/paid/failed orders in D1.
- [ ] Create test customer login account.
- [ ] Send sandbox URLs and tester account to Duitku onboarding team.

## Official Sources

- Duitku Payment Gateway overview: https://docs.duitku.com/en/payment-gateway/overview/
- Duitku API for Browser comparison: https://docs.duitku.com/en/payment-gateway/api-browser/
- Duitku POP API: https://docs.duitku.com/pop/en/
- Duitku V2 API: https://docs.duitku.com/api/en/
- Duitku Indonesian V2 API: https://docs.duitku.com/api/id/
