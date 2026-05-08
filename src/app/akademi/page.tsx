import type { Metadata } from "next"
import { AcademyIndexPage } from "@/components/academy/AcademyIndexPage"

export const metadata: Metadata = {
  title: "Akademi",
  description:
    "Katalog kursus Duit.co.id berdasarkan cluster artikel: bebas utang, freelance, UMKM, investasi, properti, holding company, dan family office.",
}

export default function Page() {
  return <AcademyIndexPage />
}
