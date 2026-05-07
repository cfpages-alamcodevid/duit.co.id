"use client"

import NextLink from "next/link"
import { useParams as useNextParams, useRouter } from "next/navigation"
import type { ComponentProps, ReactNode } from "react"

type CompatLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to: ComponentProps<typeof NextLink>["href"]
  children?: ReactNode
}

export function Link({ to, children, ...props }: CompatLinkProps) {
  return (
    <NextLink href={to} {...props}>
      {children}
    </NextLink>
  )
}

export function useParams<T extends Record<string, string | undefined>>() {
  return useNextParams() as T
}

export function useNavigate() {
  const router = useRouter()

  return (to: string | number) => {
    if (typeof to === "number") {
      if (to < 0) router.back()
      return
    }

    router.push(to)
  }
}

export function Routes({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export function Route() {
  return null
}
