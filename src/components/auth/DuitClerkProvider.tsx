"use client"

import {
  ClerkProvider,
  useUser as useClerkUser,
  useAuth as useClerkAuth,
} from "@clerk/react"
import { useSignIn as useClerkSignIn, useSignUp as useClerkSignUp } from "@clerk/react/legacy"
import { duitClerkAppearance } from "@/lib/clerkAppearance"

export function isClerkPublishableKeyConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
}

export function DuitClerkProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    return <>{children}</>
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
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

type SafeUserState = {
  isLoaded: boolean
  isSignedIn: boolean
  user: ReturnType<typeof useClerkUser>["user"]
}

type SafeAuthState = {
  isLoaded: boolean
  getToken: () => Promise<string | null>
}

type SafeSignInState = {
  isLoaded: boolean
  signIn: ReturnType<typeof useClerkSignIn>["signIn"]
  setActive: ReturnType<typeof useClerkSignIn>["setActive"]
}

type SafeSignUpState = {
  isLoaded: boolean
  signUp: ReturnType<typeof useClerkSignUp>["signUp"]
  setActive: ReturnType<typeof useClerkSignUp>["setActive"]
}

const noUser: SafeUserState = {
  isLoaded: true,
  isSignedIn: false,
  user: null,
}

const noAuth: SafeAuthState = {
  isLoaded: true,
  getToken: async () => null,
}

const noSignIn: SafeSignInState = {
  isLoaded: true,
  signIn: undefined as unknown as ReturnType<typeof useClerkSignIn>["signIn"],
  setActive: undefined as unknown as ReturnType<typeof useClerkSignIn>["setActive"],
}

const noSignUp: SafeSignUpState = {
  isLoaded: true,
  signUp: undefined as unknown as ReturnType<typeof useClerkSignUp>["signUp"],
  setActive: undefined as unknown as ReturnType<typeof useClerkSignUp>["setActive"],
}

/**
 * Drop-in replacement for `useUser()` that is safe to call when Clerk is not
 * configured (e.g. during static export with no env vars). Returns a "logged
 * out" state so renderers can still run.
 */
export function useUser(): SafeUserState {
  if (!isClerkPublishableKeyConfigured()) {
    return noUser
  }
  const result = useClerkUser()
  return {
    isLoaded: result.isLoaded,
    isSignedIn: Boolean(result.isSignedIn),
    user: result.user,
  }
}

/**
 * Drop-in replacement for `useAuth()` that is safe to call when Clerk is not
 * configured.
 */
export function useAuth(): SafeAuthState {
  if (!isClerkPublishableKeyConfigured()) {
    return noAuth
  }
  const result = useClerkAuth()
  return {
    isLoaded: result.isLoaded,
    getToken: result.getToken,
  }
}

/**
 * Drop-in replacement for `useSignIn()` from `@clerk/react/legacy` that is
 * safe to call when Clerk is not configured. The returned signIn/setActive
 * will be undefined — callers must guard on `isClerkPublishableKeyConfigured`
 * before invoking them.
 */
export function useSignIn(): SafeSignInState {
  if (!isClerkPublishableKeyConfigured()) {
    return noSignIn
  }
  return useClerkSignIn()
}

/**
 * Drop-in replacement for `useSignUp()` from `@clerk/react/legacy` that is
 * safe to call when Clerk is not configured.
 */
export function useSignUp(): SafeSignUpState {
  if (!isClerkPublishableKeyConfigured()) {
    return noSignUp
  }
  return useClerkSignUp()
}
