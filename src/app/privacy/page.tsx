import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Duit.co.id.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">Privasi</p>
      <h1 className="mt-4 text-4xl font-bold text-heading">Kebijakan Privasi</h1>
      <p className="mt-5 text-base leading-7 text-body">
        Duit.co.id menggunakan data akun, assessment, progres belajar, dan checkout untuk memberikan
        pengalaman yang relevan. Data sensitif tidak dijual kepada pihak ketiga.
      </p>
      <p className="mt-4 text-base leading-7 text-body">
        Data assessment yang detail disimpan di Cloudflare R2, sementara D1 menyimpan ringkasan dan pointer
        agar database tetap ringan.
      </p>
    </main>
  )
}

