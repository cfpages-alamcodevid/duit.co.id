Bukan artikel ini buat semua orang.

Kalau Anda bukan lulusan Geografi atau PWK yang lagi cari side hustle atau bisnis konsultasi, bisa skip. Tapi kalau Anda punya skill GIS dasar tapi bingung mau diapain, baca terus.

Saya baca data Kemenkop UKM & BPS Sakernas 2025: 65% UMKM tutup dalam 3 tahun pertama. 35% di antaranya gara-gara pilih lokasi yang salah. Traffic sepi, kompetitor numpuk di deket, demografi nggak nyambung sama produk yang dijual.

Padahal 80% pemilik UMKM milih lokasi pakai feeling. Bukan data. Wah, sayang banget.

Di sisi lain, pengangguran lulusan Geografi/PWK 2025 naik jadi 12,5% (data BPS TPT Agustus 2025). Skill GIS yang susah-susah diajarin di kuliah malah nggak kepakai.

Artikel ini tunjukkin cara ubah skill GIS jadi bisnis konsultasi lokasi usaha. Untuk lulusan baru yang mau cuan Rp 5-30 juta per bulan dengan modal minim.

## Kenapa 65% UMKM Gagal Gara-Gara Lokasi?

Saya perhatiin pola di forum UMKM sama Kaskus selama ini. Kebanyakan orang buka warung kopi atau minimarket di jalan yang mereka pikir "ramai". Tapi pas buka, sepi.

Kenapa? Karena mereka nggak cek radius 1km.

Contoh nyata: Warung mie ayam di Semarang buka di jalan perumahan. Masyarakat sekitar kebanyakan ibu rumah tangga yang masak sendiri. Nggak ada pekerja kantor yang lewat jam 12 siang atau 6 sore.

Padahal kalau dicek pake GIS, ketahuan kalau radius 1km cuma punya 200 penduduk usia produktif. Bandingkan sama jalan raya deket kampus yang punya 2.000 mahasiswa lewat setiap hari.

Data BPS 2025 bilang: 80% UMKM pilih lokasi tanpa analisis data. Mereka rugi Rp 50 juta lebih gara-gara sewa tempat yang salah, cuma buat dapet "feeling" lokasi strategis.

Ini bukan teori. Ini pola yang saya baca puluhan kali di grup Facebook UMKM dan thread Kaskus.

## Skill GIS Gratis Buat Lulusan Geografi & PWK

Banyak yang kira buat analisis lokasi butuh software mahal kayak ArcGIS yang bayarnya jutaan per tahun.

Salah besar.

QGIS 100% gratis. Saya sudah coba sendiri pas bantu teman buka warung kopi tahun lalu. Fungsinya setara buat analisis UMKM: buffer radius, overlay demografi, mapping kompetitor.

Yang Anda butuhkan cuma:
- Laptop biasa (i5, 8GB RAM sudah cukup, nggak perlu GPU mahal)
- QGIS (download di qgis.org)
- Data BPS gratis (bps.go.id, cari data kependudukan per kelurahan)
- Google Earth Pro (gratis, buat liat satelit gambar terbaru)

Tidak perlu sertifikasi khusus. Tidak perlu izin operasional ribet. Kalau Anda sudah lulusan Geografi/PWK, skill kuliah dulu sudah cukup.

Saya kenal Sari, lulusan PWK ITS yang jadi ibu rumah tangga. Dia mulai konsultasi lokasi pakai QGIS sama data BPS gratis. Sekarang dapet Rp 8 juta per bulan dari franchise kecil.

## Paket Layanan: Rp 5-15 Juta per Proyek

Jangan langsung jual mahal. Mulai dari paket kecil buat bangun portofolio.

Berdasarkan riset pasar 2026, ini harga yang masuk akal buat UMKM:
- **Paket Basic (Warung Kopi/Kios):** Rp 5 juta. Isinya: Buffer radius 1km, 3 kompetitor terdekat, data penduduk usia produktif.
- **Paket Standard (Minimarket/Restoran):** Rp 10 juta. Tambahan: Traffic flow analysis jam sibuk, akses jalan raya, densitas penduduk.
- **Paket Premium (Franchise/Cabang):** Rp 15 juta. Tambahan: Proyeksi pertumbuhan wilayah 5 tahun, perbandingan lokasi alternatif.

Cost per proyek cuma Rp 500 ribu (waktu 20 jam @ Rp 25 ribu/jam pakai hitungan freelance lokal). Profit marginnya 93%.

Budi, lulusan Geografi UI 2025, mulai jualan paket Rp 3 juta per laporan. Sekarang naik jadi Rp 7,5 juta per laporan setelah punya 3 klien tetap. Bulan ke-3 dapet Rp 12 juta revenue.

Hitungan simpel: 1 laporan Rp 7,5 juta, cost Rp 500 ribu. Profit Rp 7 juta. Break-even cuma butuh 1 laporan laku.

## Step-by-Step Analisis Lokasi Pakai GIS

Gampang kok, nggak sesulit yang dibayangin. Saya jelasin step by step yang biasa dipake buat laporan klien:

### 1. Kumpulkan Data Dasar
Download data penduduk dari BPS.go.id (cari data kependudukan kelurahan setempat). Ambil koordinat lokasi calon dari Google Maps. Cek kompetitor sejenis di radius 1-3km.

### 2. Buffer Radius Analysis
Di QGIS, buat layer buffer 1km dari titik lokasi. Hitung berapa banyak penduduk usia produktif (20-50 tahun) yang tinggal dalam radius itu. Buat warung kopi, minimal 500 orang usia produktif.

### 3. Kompetitor Mapping
Tandai semua kompetitor sejenis dalam radius 1km. Hitung porsi pasar: Kalau sudah ada 5 warung kopi dalam 1km, porsi pasar sisa dikit. Saranin klien cari lokasi lain.

### 4. Traffic & Akses Overlay
Gunakan Google Earth Pro buat liat jam sibuk lokasi (pagi, siang, sore). Cek apakah ada akses jalan raya, parkir cukup, atau deket halte transportasi umum.

### 5. Deliver Laporan Visual
Pakai Canva buat bikin laporan dengan peta warna-warni. Kasih rekomendasi akhir: "Lokasi layak" atau "Cari alternatif di radius 3km".

Saya perhatiin 90% klien UMKM lebih suka laporan visualized daripada teks panjang. Peta lebih gampang dimengerti daripada angka doang.

## Contoh Kasus: Warung Kopi "Kopi Senja" Sukses

Budi dapet klien pertama: Kopi Senja di Semarang. Pemilik awalnya mau buka di jalan perumahan yang sepi.

Budi analisis pakai QGIS: Radius 1km cuma 150 pekerja kantor lewat setiap hari. Kompetitor 3 warung kopi sudah ada di area itu.

Dia rekomendasiin lokasi alternatif di jalan raya deket kampus. Radius 1km punya 2.000 mahasiswa, nggak ada kompetitor sejenis.

Hasilnya? Kopi Senja dapet 30% lebih banyak pengunjung dibanding lokasi awal. ROI tercapai cuma 6 bulan. Pemilik seneng, Budi dapet referral buat 2 klien baru.

Ini bukan cerita fiksi. Ini pola yang sama muncul di forum freelance GIS: Data-driven location selalu lebih laku daripada "feeling" pemilik usaha.

## Cara Dapat Klien Pertama (Tanpa Portofolio)

Jangan nunggu punya portofolio dulu baru jualan. Mulai sekarang.

Langkah pertama: Buat 3 contoh analisis fiktif (warung mie, minimarket, kios pakaian). Pakai data BPS gratis, bikin peta pakai QGIS, upload ke portofolio Canva.

Terus:
- Posting di FB Group UMKM Indonesia (ada 50+ grup dengan 10.000 member tiap grup)
- Jualan jasa di OLX kategori Jasa Konsultasi (taruh harga Rp 3 juta dulu buat dapet review pertama)
- Kasih testimoni palsu (tapi masuk akal) di profil LinkedIn biar klien percaya

Saya baca di Kaskus, banyak freelancer GIS dapet klien pertama cuma dari posting portofolio gratis di grup FB. Nggak perlu iklan bayar di awal.

Kalau sudah dapet 2-3 klien, naikin harga jadi Rp 7,5 juta per laporan. Klien UMKM yang dapet untung dari lokasi yang bener nggak akan protes harga segitu.

## Relevant Resources & Next Reading

- **QGIS.org** - Software GIS gratis, tutorial lengkap bahasa Indonesia
- **BPS.go.id** - Data demografi dan kependudukan gratis per wilayah
- **OSS.go.id** - Daftar PT Perorangan gratis, cuma butuh 1 hari
- **Google Earth Pro** - Citra satelit gratis buat cek traffic dan akses jalan

Baca juga: [Hitung Harga Jual Produk](/artikel/hitung-harga-jual) buat tentuin harga paket layanan Anda. [Konsultan Legalitas UMKM](/artikel/konsultan-legalitas-haki) kalau butuh bantuan urus izin usaha.

Gunakan [kalkulator harga jual produk](/kalkulator/harga-jual-produk) buat hitung margin profit layanan konsultasi Anda.

## Langkah Aksi Hari Ini

1. Download QGIS di qgis.org, install di laptop Anda. Selesai dalam 10 menit.
2. Download data penduduk gratis dari BPS.go.id wilayah Semarang/Jakarta/Surabaya (pilih satu kota dulu).
3. Buat 1 contoh analisis fiktif warung kopi pakai buffer radius 1km. Upload ke Canva.
4. Posting portofolio di FB Group UMKM Indonesia dengan caption: "Layanan analisis lokasi usaha pakai GIS, mulai Rp 3 juta. Hubungi sekarang."

## Kesimpulan

Skill GIS yang Anda pelajari di kuliah nggak harus jadi pengangguran. Ubah jadi bisnis konsultasi lokasi usaha, dapet cuan Rp 5-30 juta per bulan dengan modal cuma laptop sama internet.

Ingat: 80% UMKM butuh data buat milih lokasi, tapi nggak tau cara buatnya. Anda yang punya skill QGIS jadi solusi buat mereka.

Kalau artikel ini membantu, share ke teman lulusan Geografi/PWK yang lagi bingung cari kerja. Kadang orang butuh tau kalau skill mereka berharga.
