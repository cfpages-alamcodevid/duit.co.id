"use client"

import { HandleSSOCallback } from "@clerk/react"

export default function Page() {
  const redirectUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("redirect_url") || "/dashboard"
      : "/dashboard"

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
