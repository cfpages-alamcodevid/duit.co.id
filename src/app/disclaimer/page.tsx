import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer edukasi keuangan Duit.co.id.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">Disclaimer</p>
      <h1 className="mt-4 text-4xl font-bold text-heading">Disclaimer Edukasi Keuangan</h1>
      <p className="mt-5 text-base leading-7 text-body">
        Konten Duit.co.id bersifat edukasi umum dan bukan nasihat keuangan, hukum, pajak, atau investasi
        yang menggantikan konsultasi profesional sesuai kondisi pribadi Anda.
      </p>
      <p className="mt-4 text-base leading-7 text-body">
        Setiap keputusan finansial tetap menjadi tanggung jawab pengguna. Gunakan tools dan artikel sebagai
        bahan pertimbangan awal sebelum mengambil tindakan.
      </p>
    </main>
  )
}

