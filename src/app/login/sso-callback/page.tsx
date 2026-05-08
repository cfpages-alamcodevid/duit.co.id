"use client"

import { HandleSSOCallback } from "@clerk/react"

export default function Page() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <HandleSSOCallback
        navigateToApp={({ session, decorateUrl }) => {
          const destination = decorateUrl(session?.currentTask ? "/dashboard" : "/dashboard")
          window.location.href = destination
        }}
        navigateToSignIn={() => {
          window.location.href = "/login"
        }}
        navigateToSignUp={() => {
          window.location.href = "/login?tab=register"
        }}
      />
      <p className="text-sm leading-6 text-body">Menyelesaikan login Google...</p>
    </div>
  )
}
