"use client"

import Link from "next/link"
import { useUser, UserButton } from "@clerk/react"
import { LogIn } from "lucide-react"
import { isClerkPublishableKeyConfigured } from "@/components/auth/DuitClerkProvider"
import { duitClerkAppearance } from "@/lib/clerkAppearance"

export function AuthNav() {
  if (!isClerkPublishableKeyConfigured()) {
    return (
      <Link
        href="/debug/clerk"
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-50/70 px-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-200"
      >
        <LogIn className="h-4 w-4" />
        Auth setup
      </Link>
    )
  }

  return <ConfiguredAuthNav />
}

function ConfiguredAuthNav() {
  const { isLoaded, isSignedIn } = useUser()

  return (
    <>
      {isLoaded && !isSignedIn ? (
        <Link
          href="/login"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-money-green px-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,77,64,0.18)] transition hover:bg-money-green-dark"
        >
          <LogIn className="h-4 w-4" />
          Masuk
        </Link>
      ) : null}
      {isLoaded && isSignedIn ? (
        <UserButton
          appearance={duitClerkAppearance}
          userProfileMode="navigation"
          userProfileUrl="/profile"
        />
      ) : null}
    </>
  )
}
