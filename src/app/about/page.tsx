import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tentang Duit.co.id",
  description: "Tentang misi Duit.co.id sebagai ekosistem edukasi dan tools keuangan Indonesia.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">Tentang</p>
      <h1 className="mt-4 text-4xl font-bold text-heading">Duit.co.id membantu orang belajar uang dari posisi yang tepat.</h1>
      <p className="mt-5 text-base leading-7 text-body">
        Kami membangun artikel, tools, akademi, dan akses ahli untuk membantu pembaca memahami prioritas
        finansialnya, dari pemulihan arus kas sampai pengelolaan aset dan bisnis.
      </p>
    </main>
  )
}

