import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Status Pembayaran",
  description: "Halaman kembali setelah pembayaran kelas Duit.co.id.",
}

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-money-green/10 text-money-green">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-heading">Pembayaran sedang diproses</h1>
      <p className="mt-4 text-sm leading-6 text-body">
        Jika pembayaran berhasil, akses kelas akan dikonfirmasi setelah sistem menerima notifikasi pembayaran.
      </p>
      <Link
        href="/akademi"
        className="mt-6 inline-flex rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white"
      >
        Kembali ke Akademi
      </Link>
    </div>
  )
}
