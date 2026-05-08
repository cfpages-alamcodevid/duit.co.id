import type { Metadata } from "next"
import { LoginRegisterClient } from "@/components/auth/LoginRegisterClient"

export const metadata: Metadata = {
  title: "Register",
  description:
    "Buat akun Duit.co.id untuk dashboard, akademi, checkout, dan rekomendasi finansial personal.",
}

export default function Page() {
  return <LoginRegisterClient initialTab="register" />
}
