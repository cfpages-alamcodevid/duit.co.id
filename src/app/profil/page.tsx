import type { Metadata } from "next"
import { ProfileClient } from "@/components/profile/ProfileClient"

export const metadata: Metadata = {
  title: "Profil",
  description:
    "Kelola profil Duit.co.id untuk progres belajar, pembayaran, artikel terakhir dibaca, dan benefit akun.",
}

export default function Page() {
  return <ProfileClient />
}
