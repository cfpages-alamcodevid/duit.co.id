"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { duitClerkAppearance } from "@/lib/clerkAppearance"

export function isClerkPublishableKeyConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
}

export function DuitClerkProvider({ children }: { children: React.ReactNode }) {
  if (!isClerkPublishableKeyConfigured()) {
    return <>{children}</>
  }

  return (
    <ClerkProvider
      appearance={duitClerkAppearance}
      signInUrl="/login"
      signUpUrl="/login?tab=register"
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      {children}
    </ClerkProvider>
  )
}
