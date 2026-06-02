"use client"

import { useEffect, useState } from "react"
import { isClerkPublishableKeyConfigured } from "@/components/auth/DuitClerkProvider"

export default function Page() {
  const [ClerkComponent, setClerkComponent] = useState<React.ComponentType<{
    navigateToApp: (args: { session: { currentTask?: unknown } | null; decorateUrl: (url: string) => string }) => void
    navigateToSignIn: () => void
    navigateToSignUp: () => void
  }> | null>(null)
  const [redirectUrl, setRedirectUrl] = useState("/dashboard")

  useEffect(() => {
    setRedirectUrl(
      new URLSearchParams(window.location.search).get("redirect_url") || "/dashboard",
    )
  }, [])

  useEffect(() => {
    if (!isClerkPublishableKeyConfigured()) return
    let active = true
    import("@clerk/react").then((mod) => {
      if (active) setClerkComponent(() => mod.HandleSSOCallback)
    })
    return () => {
      active = false
    }
  }, [])

  if (!isClerkPublishableKeyConfigured()) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="text-2xl font-semibold text-heading">Login belum tersedia</h1>
        <p className="mt-4 text-sm leading-6 text-body">
          Konfigurasi Clerk belum lengkap. Tambahkan NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY untuk
          mengaktifkan login Google.
        </p>
      </div>
    )
  }

  if (!ClerkComponent) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="text-sm leading-6 text-body">Menyelesaikan login Google...</p>
      </div>
    )
  }

  const HandleSSOCallback = ClerkComponent

  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <HandleSSOCallback
        navigateToApp={({ session, decorateUrl }) => {
          const destination = decorateUrl(session?.currentTask ? redirectUrl : redirectUrl)
          window.location.href = destination
        }}
        navigateToSignIn={() => {
          window.location.href = `/login?redirect_url=${encodeURIComponent(redirectUrl)}`
        }}
        navigateToSignUp={() => {
          window.location.href = `/login?tab=register&redirect_url=${encodeURIComponent(redirectUrl)}`
        }}
      />
      <p className="text-sm leading-6 text-body">Menyelesaikan login Google...</p>
    </div>
  )
}
