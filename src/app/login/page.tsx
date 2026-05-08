import type { Metadata } from "next"
import { LoginRegisterClient } from "@/components/auth/LoginRegisterClient"

export const metadata: Metadata = {
  title: "Login dan Register",
  description:
    "Masuk atau buat akun Duit.co.id untuk dashboard, academy, checkout, dan rekomendasi finansial personal.",
}

export default function Page() {
  return <LoginRegisterClient initialTab="login" />
}
