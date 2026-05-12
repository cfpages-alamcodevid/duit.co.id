# Internal Link Guide untuk Duit.co.id

## Aturan Utama

**Internal link TIDAK boleh pakai folder tier!**

| Format | Contoh | Status |
|--------|--------|--------|
| Artikel | `/artikel/[slug]` | ✅ BENAR |
| Artikel (salah) | `/artikel/tier-1-hustler/[slug]` | ❌ SALAH |
| Kalkulator | `/kalkulator/[slug]` | ✅ BENAR |
| Checklist | `/ceklist/[slug]` | ✅ BENAR |
| Template | `/template/[slug]` | ✅ BENAR |

## Format Link

### Artikel
```
[anchor text](/artikel/[slug])
```

Contoh:
- `[cara hitung harga jual](/artikel/hitung-harga-jual)`
- `[strategi scale-up UMKM](/artikel/scale-up-umkm)`
- `[dropship vs reseller](/artikel/dropship-vs-reseller)`

### Kalkulator/Tool
```
[anchor text](/kalkulator/[slug])
```

Contoh:
- `[kalkulator harga jual produk](/kalkulator/harga-jual-produk)`
- `[kalkulator ROI properti](/kalkulator/roi-properti)`

### Checklist
```
[anchor text](/ceklist/[slug])
```

Contoh:
- `[checklist keamanan digital](/ceklist/keamanan-digital)`

### Template
```
[anchor text](/template/[slug])
```

Contoh:
- `[template proposal jasa profesional](/template/proposal-jasa-profesional)`

## Jumlah Link per Artikel

- **Minimal:** 2-3 internal link
- **Maksimal:** 5 internal link
- **Format:** Link di body text (natural context), bukan hanya di "Baca Juga"

## Anchor Text Rules

| ❌ Jangan | ✅ Gunakan |
|-----------|-----------|
| "Klik di sini" | "kalkulator harga jual produk" |
| "Baca selengkapnya" | "strategi scale-up UMKM" |
| "Read more" | "cara dropship vs reseller" |
| "Link ini" | "checklist keamanan digital" |

## Cara Cari Artikel untuk Di-Link

1. **Baca `docs/ARTICLE_CATALOG.md`** — Cari artikel terkait berdasarkan judul dan slug
2. **Cek `docs/RESOURCES_CATALOG.md`** — Cari linkable assets (kalkulator, checklist, template)
3. **Link ke artikel yang relevan** — Jangan dipaksakan jika tidak ada yang cocok

## Yang TIDAK Boleh

- ❌ Pakai folder tier di URL: `/artikel/tier-1-hustler/slug`
- ❌ Pakai anchor text generik: "klik di sini", "baca selengkapnya"
- ❌ Link ke artikel yang tidak ada di ARTICLE_CATALOG.md
- ❌ Sebutkan label internal: "Tier 0", "Tier 2", "Scaler", "Legacy" di body copy
- ❌ Gunakan URL external yang tidak relevan

## Contoh Internal Link yang Benar

```markdown
Untuk menghitung margin produk, gunakan [kalkulator harga jual produk](/kalkulator/harga-jual-produk).

Baca juga [cara dropship vs reseller](/artikel/dropship-vs-reseller) untuk perbandingan model bisnis.

Kalau butuh checklist keamanan, lihat [checklist keamanan digital](/ceklist/keamanan-digital).
```

## Verifikasi Link

Sebelum publish, cek semua link:
1. Pastikan slug ada di `docs/ARTICLE_CATALOG.md`
2. Pastikan format `/artikel/[slug]` tanpa folder tier
3. Pastikan anchor text deskriptif dan relevan
4. Test link di browser lokal sebelum deploy
