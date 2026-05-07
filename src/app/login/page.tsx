import type { Metadata } from "next"
import { LoginRegisterClient } from "@/components/auth/LoginRegisterClient"

export const metadata: Metadata = {
  title: "Login dan Register",
  description:
    "Masuk atau buat akun Duit.co.id untuk dashboard, academy, checkout, dan rekomendasi finansial personal.",
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>
}) {
  const params = searchParams ? await searchParams : {}
  const initialTab = params.tab === "register" ? "register" : "login"

  return <LoginRegisterClient initialTab={initialTab} />
}
