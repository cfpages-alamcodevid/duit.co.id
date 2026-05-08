"use client"

import { HelmetProvider } from "react-helmet-async"
import type { ReactNode } from "react"
import { DuitClerkProvider } from "@/components/auth/DuitClerkProvider"

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <DuitClerkProvider>{children}</DuitClerkProvider>
    </HelmetProvider>
  )
}
