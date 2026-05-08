import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Syarat Penggunaan",
  description: "Syarat penggunaan Duit.co.id.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">Syarat Penggunaan</p>
      <h1 className="mt-4 text-4xl font-bold text-heading">Syarat Penggunaan</h1>
      <p className="mt-5 text-base leading-7 text-body">
        Dengan menggunakan Duit.co.id, Anda memahami bahwa konten, tools, dan kelas disediakan untuk edukasi
        dan pengambilan keputusan yang lebih terstruktur.
      </p>
      <p className="mt-4 text-base leading-7 text-body">
        Pembayaran kelas diproses melalui payment gateway pihak ketiga. Akses kelas diberikan setelah status
        pembayaran terkonfirmasi.
      </p>
    </main>
  )
}

