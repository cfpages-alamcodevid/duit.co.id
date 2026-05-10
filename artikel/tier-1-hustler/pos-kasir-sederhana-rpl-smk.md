POS Kasir Sederhana untuk Warung dan Salon: Skill Bisnis Lulusan SMK RPL

Kalau Anda sudah kerja kantoran jadi programmer yang gajinya puluhan juta, bisa skip. Artikel ini boring buat Anda.

Tapi kalau Anda siswa atau lulusan SMK RPL yang pengin cuan dari skill coding sederhana, baca terus.

Saya perhatikan sesuatu yang menarik: Indonesia punya 65 juta UMKM (data BPS 2024). 90% mikro — warung sembako, salon rumahan, fotokopi kelontong.

Yang pakai POS digital? Cuma 5%.

Sisanya? Masih catat pakai buku tulis manual. Tiap malam hitung sendiri pakai kalkulator. Habis 2 jam cuma buat rekap penjualan.

Padahal pasar software POS Indonesia diproyeksi tumbuh 18% YoY jadi Rp 4,5 triliun di 2026 (Katadata/Statista).

Dan Anda, lulusan SMK RPL, bisa ambil potongan kue kecil dari sana.

## Apa itu POS Kasir Sederhana?

POS (Point of Sale) kasir sederhana itu aplikasi yang bantu warung dan salon catat transaksi tanpa ribet.

Bukan sistem mahal kayak Moka POS yang langganannya Rp 299 ribu per bulan. Bukan Pawoon yang ribet integrasi cloud.

Ini beneran simpel:

- **Daftar produk** — Input nama barang, harga, stok
- **Scan barcode** — Pakai scanner USB Rp 400 ribu
- **Cetak struk** — Printer thermal 58mm, kertas murah
- **Laporan harian** — PDF langsung jadi, hemat 2 jam kerja manual
- **Offline jalan** — Nggak butuh internet stabil (penting buat warung di desa)

Saya coba sendiri beberapa aplikasi kasir gratis. Kasir Pintar, BeePOS, macam-macam.

Masalahnya? Fitur terbatas. Iklan muncul di aplikasi. Terus kalau mau upgrade ke fitur lengkap: Rp 99 ribu per bulan.

Bayangkan kalau warung punya omzet Rp 10-50 juta per bulan. Dikit-dikit langganan, setahun bisa Rp 1,2 juta.

Dengan POS buatan sendiri? Bayar sekali saja.

## Kenapa Lulusan SMK RPL Cocok Banget?

Jujur saja, skill RPL SMK itu kadang "nanggung".

Bisa coding, tapi belum level programmer kantoran. Paham Java, PHP, atau Flutter, tapi belum berani ambil proyek gede.

Nah, POS kasir sederhana ini level yang pas.

Tidak butuh AI canggih. Tidak butuh arsitektur microservices ribet. Cukup CRUD (Create-Read-Update-Delete) yang sudah diajar di sekolah.

Saya lihat di YouTube, tutorial "Cara Bikin Aplikasi Kasir PHP MySQL" tembus 200 ribu views. Banyak yang tanya: "Bisa dibikin pakai Flutter?"

Bisa.

Dan itu peluang Anda.

Tutorial ada, template GitHub gratis ada. Tinggal modifikasi sesuai kebutuhan warung atau salon lokal.

Anda nggak perlu jadi expert. Cukup bisa ikutin tutorial, paham struktur kode, dan mau demo ke calon klien.

## Modal dan Tools yang Dibutuhkan

Mari kita hitung. Saya pakai data riil dari Shopee dan Tokopedia (update 2026):

### Hardware Demo (Yang Dibawa Pas Demo/Pasang)

| Item | Harga | Keterangan |
|------|-------|-------------|
| Laptop bekas layak dev/demo | Rp 4-6,5 juta | Minimal i5 Gen 10/Ryzen 5 4000, RAM 16GB, SSD 512GB. Kalau punya laptop yang sudah stabil, nggak usah beli |
| Printer Thermal 58mm (Xprinter) | Rp 300.000 | Struk 58mm cukup untuk warung kecil |
| Barcode Scanner USB (Tera) | Rp 400.000 | Scan produk, speed up checkout |
| Kertas Struk + Roll | Rp 100.000 | Stok 1 tahun |
| Kabel USB/Lampu indikator | Rp 50.000 | - |
| Marketing (WA Blast + FB Ads) | Rp 200.000 | Boost post lokal |
| **Total Modal Awal** | **Rp 3.000.000 kalau laptop sudah punya; Rp 7-9,5 juta kalau harus beli laptop** | - |

Satu catatan: laptop boleh pakai punya sendiri yang sudah ada, tapi jangan pakai patokan i3 lama/RAM 4-8GB untuk kerja dev dan demo klien. Browser, editor kode, database lokal, Git, dan printer driver bisa bikin laptop murah cepat ngos-ngosan. Kalau laptop lama sering hang, upgrade ini bukan gaya-gayaan, tapi alat produksi.

Saya cek di Shopee, Xprinter 58mm dijual Rp 250-450 ribu. Pilih seller rating 4.9+ dengan 1000+ transaksi.

Barcode scanner USB Tera: Rp 400 ribu. Kompatibel ESC/POS protocol — standar kasir di Indonesia.

Tablet Android? Nggak wajib. Pakai laptop saja dulu. Kalau klien mau tablet, kasih opsi tambah Rp 1,5 juta.

## Cara Bikin POS Sendiri (Flutter/JS)

Sekarang bagian favorit saya: coding-nya.

Saya asumsikan Anda sudah belajar Flutter atau JavaScript di SMK. Kalau belum, seriusin belajar dulu di YouTube.

### Step 1: Cari Template/Boilerplate

Jangan mulai dari nol. Buang-buang waktu.

Cari di GitHub: "simple pos flutter" atau "javascript pos system".

Ada banyak gratis. Clone repo, jalanin di laptop. Test fitur: add product, scan barcode, print struk.

Saya coba beberapa template. Yang bagus biasanya udah punya:
- Product CRUD
- Cart system
- Receipt print (pakai package `esc_pos_utils` buat Flutter)
- Daily sales report (PDF atau Excel)

### Step 2: Modifikasi Sesuai Kebutuhan

Warung sembako butuh: Beras 5kg, minyak goreng, gula pasir.

Salon butuh: Creambath, potong rambut, cuci rambut + booking appointment.

Beda sektor = beda fitur.

Tapi intinya sama: **Input produk → Scan/Click → Total → Cetak Struk**.

Waktu modifikasi? 20 jam kalau rajin. 2 minggu kalau sambil magang.

### Step 3: Test Pakai Hardware Asli

Ini krusial.

Beli dulu printer + scanner. Test di laptop Anda. Pastikan scan barcode jalan, struk keluar dengan benar.

Saya pernah lihat mahasiswa RPL bikin aplikasi keren tapi pas demo: "Maaf printer error, Pak."

Klien langsung mikir dua kali buat bayar.

## Hardware Setup Murah buat Warung/Salon

Kita bahas hardware lebih detail karena ini "nilai jual" utama Anda.

### Printer Thermal 58mm vs 80mm

Buat warung kecil: 58mm cukup. Struk nggak terlalu lebar, kertas murah (Rp 15 ribu per roll, tahan 3 bulan).

Salon yang nota-nya panjang (detail layanan + pajak): sebaiknya 80mm. Tapi harga printer naik jadi Rp 600-800 ribu.

Saya sarankan mulai dari 58mm dulu. Pasang di 5 warung, baru tawarin upgrade ke 80mm.

### Barcode Scanner

USB saja. Nggak usah yang wireless mahal.

Merek Tera atau Zebex, kisaran Rp 300-500 ribu. Scan barcode produk instan (Indomie, Teh Botol, dll).

Warung yang punya produk tanpa barcode? Bisa generate barcode sendiri pakai aplikasi gratis, print ditempel di rak.

### Tablet (Opsional)

Kalau klien minta "mirip iPad kasir alfamart", tawarin tablet Android 8" baru Rp 1,5 juta.

Komisi Anda: Beli Rp 1,5 juta, charge klien Rp 2 juta. Profit Rp 500 ribu dari hardware saja.

## Cara Jual dan Install (Pricing Strategy)

Ini bagian yang bikin Anda cuan.

### Pricing Model (Berdasarkan Research)

**Paket Dasar (Warung <50 item):**
- Software + Install + Training: Rp 1.200.000
- Hardware (Printer + Scanner): Rp 700.000 (atau klien beli sendiri)
- **Total per sistem: Rp 1.500.000 - Rp 1.900.000**

**Paket Salon (Dengan appointment + stok produk):**
- Software + Install + Training: Rp 1.800.000
- Hardware lengkap: Rp 900.000
- **Total per sistem: Rp 2.500.000 - Rp 2.700.000**

**Maintenance bulanan (Opsional):**
- Backup data + update fitur: Rp 100.000/bulan
- Atau Rp 1.000.000/tahun (lebih murah)

### Dimana Cari Klien Pertama?

1. **Warung tetangga/RT setempat** — Mulai dari yang dekat. Demo gratis 1 jam. "Pak, nanti kalau ramai warung bapak bisa saya pasang sistem kasir digital?"

2. **Salon ibu-ibu di komplek** — Biasanya masih catat manual. Tawarin laporan harian biar tahu: "Hari ini cuan berapa, Bu?"

3. **Guru SMK/Mitra industri** — Tawarin ke sekolah buat proyek mantan murid. Banyak guru seneng denger muridnya sukses sepulang sekolah.

4. **FB Group "UMKM Indonesia" & "Warung Sembako"** — Post demo video TikTok. Tulis: "Pasang POS Warung Rp 1,5 juta. Call/Wa 08xx-xxxx-xxxx"

5. **Teman sekelas yang magang di toko** — Minta referensi: "Bro, toko tempat lo magang butuh nggak sistem kasir?"

### Demo Script (Tiap Ketemu Klien)

```
"Assalamualaikum Pak/Bu, saya lulusan SMK RPL. Saya bikin sistem kasir 
sederhana buat warung kayak punya Bapak/Ibu.

Keuntungannya:
1. Nggak usah catat manual lagi — hemat 2 jam/sehari
2. Laporan harian keluar otomatis — tahu profit tiap hari
3. Scan barcode — checkout cepat, antrean nggak panjang
4. Bayar sekali, langganan nggak ada.

Boleh saya demo 15 menit? Gratis kok, nggak ada ikatan."
```

Singkat, padat, solusi jelas.

## Contoh Kasus: Andi dari Yogyakarta

Andi, 19 tahun, siswa kelas 12 SMK RPL Yogyakarta.

Mulai dari proyek akhir sekolah: bikin POS Flutter buat warung tetangga. Modal Rp 1 juta (printer + scanner).

Hasilnya?

Dalam 3 bulan:
- 5 warung pasang sistem @Rp 1,2 juta = Rp 6.000.000
- Hardware markup (beli Rp 700rb, jual Rp 1 juta) = Rp 1.500.000 tambahan
- **Total income: Rp 7,5 juta dalam 3 bulan**

Bulan pertama: 1 warung (masih belajar).
Bulan kedua: 2 warung (referral dari warung pertama).
Bulan ketiga: 2 warung lagi (video demo TikTok mulai viral di warga lokal).

Kata Andi di grup Facebook "SMK RPL Indonesia": "Mulainya takut nggak laku. Ternyata warung seneng karena hemat waktu 2 jam tiap malam."

Sekarang Andi buka jasa "POS Warung Android" dengan harga stabil Rp 1,5 juta per sistem.

Belum jadi jutawan. Tapi Rp 2,5 juta per bulan dari hasil sampingan? Buat anak umur 19 tahun, itu sudah "cuan" banget.

## Contoh Kasus: Salon "Cantikku" Surabaya

Ibu RT punya salon rumahan di Surabaya. Catat manual pakai buku tulis.

Masalahnya: Sering lupa nota, nggak tahu persis berapa profit harian.

Satu bulan nyoba POS JS install (buat Rp 1,5 juta):

- Waktu rekap laporan turun drastis: Dari 2 jam jadi 5 menit
- Tahu produk/layanan yang paling laku: Creambath 60%, potong rambut 30%
- Bisa pasang harga lebih pas: "Ternyata margin creambath 40%, potong rambut cuma 20%"

Review-nya di Tokopedia: "Wah, nggak nyangka laporan keluar otomatis. Jadi tahu salon saya untung berapa tiap hari."

## Berapa Sebenarnya Profit Margin Anda?

Mari kita hitung realistis:

**Investasi awal:**
- Dev time 20 jam (skill SMK, anggap gratis)
- Hardware demo: Rp 700.000 (printer + scanner)
- Marketing: Rp 300.000 (WA blast + FB Ads)
- **Total: Rp 1.000.000** (kalau laptop sudah punya)

**Harga jual per sistem: Rp 1.800.000**
- Software + Install + Training: Rp 1.200.000 (waktu 2 hari @Rp 100rb/jam = Rp 200rb, profit Rp 1 juta)
- Hardware markup: Beli Rp 700.000, jual Rp 1.200.000 (profit Rp 500.000)
- **Profit per sistem: Rp 1.500.000 (83% margin!)**

**Proyeksi bulanan:**
- Konservatif: 1 klien = Rp 1.000.000 profit (warung lokal kampung)
- Moderat: 2 klien = Rp 2.000.000 (jaringan SMK + grup FB UMKM)
- Optimis: 4 klien = Rp 4.000.000 (referral + TikTok demo viral)

Break-even? 1 bulan (2 klien sudah balik modal).

## Langkah Selanjutnya (Action Steps)

Kalau Anda serius ambil peluang ini, langsung eksekusi:

### 1. Pelajari Basic POS (Flutter/JS)

Cari tutorial di YouTube: "Cara Bikin Aplikasi Kasir Sederhana Flutter" atau "JavaScript POS System Tutorial".

Clone repo dari GitHub (search: "simple-pos-flutter"). Test fitur: add product, scan barcode, print struk.

Estimasi waktu: 1 minggu (sambil sekolah/magang).

### 2. Beli Hardware Demo Minimal

Beli printer thermal 58mm (Xprinter) + barcode scanner USB <Rp 1 juta.

Test di laptop Anda. Pastikan ESC/POS protocol kompatibel. Cetak struk percobaan.

Ini "alat peraga" kalau demo ke calon klien.

### 3. Cari Klien Lokal (Warung/Salon <50 item)

Mulai dari RT setempat. Demo gratis 1 hari, charge Rp 1,5 juta untuk install + training.

Blast WA ke grup UMKM lokal. Post di FB Group "Warung Sembako Indonesia".

Kontrak simpel: 50% dp pas mulai, 50% pas sistem jalan.

### 4. Tawarin Maintenance & Support

Banyak warung butuh backup data bulanan. Tawarin: Rp 100.000/bulan (atau Rp 1 juta/tahun).

Zoom/WhatsApp 1 jam per bulan. Update fitur kalau ada request.

### 5. Urus NIB (Nomor Induk Berusaha)

Daftar online di OSS.go.id. Pilih KBLI 62019 (Software Custom).

Gratis. Selesai dalam 1 hari.

Kalau omzet sudah >Rp 4,8 juta per tahun: Daftar NPWP, urus pajak secara resmi.

## Kesimpulan

POS kasir sederhana buat warung dan salon itu peluang nyata buat lulusan SMK RPL.

Modal Rp 1-3 juta. Profit Rp 1,5 juta per sistem. Potensi Rp 2-4 juta per bulan.

Dan yang paling penting: **Skill yang dipakai masih level SMK.**

Saya baca di Kaskus, thread "POS murah warung" dilihat 10 ribu orang. Banyak yang tanya: "Ada yang jual sistem custom? SaaS terlalu mahal."

Jawabannya: Anda.

Nggak perlu nunggu lulus dulu. Nggak perlu nunggu punya sertifikat expert.

Mulai dari 1 warung. 1 salon. Dapat Rp 1,5 juta pertama.

Dari sana, referral datang. TikTok demo viral. Income naik pelan-pelan.

Cuan Rp 2-4 juta per bulan buat anak umur 18-20 tahun? Masuk akal banget.

Kalau artikel ini membantu, share ke teman SMK RPL yang lagi cari ide usaha sampingan. Siapa tau mereka butuh inspirasi.
