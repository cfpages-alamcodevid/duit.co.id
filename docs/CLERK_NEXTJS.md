# Clerk Next.js Integration Notes

Tanggal riset: 2026-05-08 WIB

Dokumen ini merangkum dokumentasi resmi Clerk yang relevan untuk integrasi auth di Duit.co.id setelah migrasi ke Next.js App Router.

## Keputusan Untuk Duit.co.id

Gunakan **Clerk Next.js SDK** dengan route auth lokal yang tampilannya dibuat native seperti Duit.co.id.

Keputusan UX:

- Jangan mengandalkan Account Portal default sebagai pengalaman utama.
- Gunakan Clerk prebuilt components seperti `<SignIn />`, `<SignUp />`, `<UserButton />`, `<SignedIn />`, dan `<SignedOut />`, tetapi styling-nya diatur lewat `appearance`.
- Untuk halaman login/register, pakai layout Duit.co.id sendiri: glass panel, Money Green CTA, Aureum Gold accent, typography Manrope/Inter, dan background ringan yang konsisten dengan app.
- Jika styling prebuilt Clerk masih terasa terlalu generik, naikkan ke custom flow dengan hooks seperti `useSignIn()`, `useSignUp()`, `useUser()`, dan `useAuth()`.

Keputusan arsitektur:

- Public content tetap bisa dibaca tanpa login.
- Login dipakai untuk dashboard, profile, checkout, unlock tracking, course progress, dan akun tester Duitku.
- Tier adalah filter personalisasi, bukan paywall.
- Data profil finansial yang sering dipakai di UI bisa disimpan di D1 sebagai source of truth app. Clerk metadata hanya dipakai untuk auth-adjacent flags yang kecil.

## Paket

Install:

```bash
npm install @clerk/nextjs
```

Opsional untuk theme bawaan Clerk:

```bash
npm install @clerk/ui
```

Catatan: karena Duit.co.id ingin tampilan custom, `@clerk/ui` tidak wajib. Lebih baik mulai dari `appearance` object sendiri agar visual tidak terasa seperti template Clerk.

## Environment Variables

Minimal:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

Route lokal yang disarankan:

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
```

Jangan commit `.env.local`.

## Provider di App Router

`src/app/layout.tsx` perlu membungkus app dengan `<ClerkProvider>`.

Contoh arah implementasi:

```tsx
import { ClerkProvider } from "@clerk/nextjs"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClerkProvider appearance={duitClerkAppearance}>
          <AppShell>{children}</AppShell>
        </ClerkProvider>
      </body>
    </html>
  )
}
```

Sebaiknya `duitClerkAppearance` ditaruh di:

```text
src/lib/clerkAppearance.ts
```

## Middleware / Proxy

Dokumentasi Clerk terbaru memakai `proxy.ts`, tetapi Clerk mencatat bahwa untuk Next.js <= 15 file harus bernama `middleware.ts`. Repo saat ini memakai `next` `^15.0.0`, jadi gunakan:

```text
src/middleware.ts
```

Contoh proteksi route:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/academy/my-courses(.*)",
  "/checkout(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
}
```

Important for Cloudflare:

- Middleware, Route Handlers, and server-side `auth()` need a runtime.
- If Next.js stays `output: "export"` as a static site, server auth protection will not run in Cloudflare Pages static hosting.
- For real checkout/auth protection, Duit.co.id should either use Cloudflare Workers/OpenNext for Next.js runtime or keep static frontend plus Cloudflare Worker endpoints for auth-aware APIs.

## Auth Pages

Recommended routes:

```text
/login
/register
/forgot-password
/profile
/dashboard
```

Clerk dynamic catch-all routes:

```text
src/app/login/[[...login]]/page.tsx
src/app/register/[[...register]]/page.tsx
```

Login page example:

```tsx
import { SignIn } from "@clerk/nextjs"
import { duitClerkAppearance } from "@/lib/clerkAppearance"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-950">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-900">
            Duit.co.id
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Masuk ke akun Anda</h1>
          <p className="mt-4 max-w-xl text-base text-slate-600">
            Akses dashboard, progres kursus, checkout, dan rekomendasi finansial personal.
          </p>
        </div>
        <div className="rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-3xl">
          <SignIn
            appearance={duitClerkAppearance}
            signUpUrl="/register"
            fallbackRedirectUrl="/dashboard"
          />
        </div>
      </section>
    </main>
  )
}
```

Register page mirrors this with `<SignUp />`.

## Custom Appearance

Clerk supports an `appearance` prop with:

- `theme`: base theme.
- `options`: layout-level options and links.
- `variables`: global colors, fonts, radii, spacing.
- `elements`: fine-grained class overrides.
- `cssLayerName`: CSS layer name if we need cascade control.

Recommended local config:

```ts
import type { Appearance } from "@clerk/types"

export const duitClerkAppearance: Appearance = {
  variables: {
    colorPrimary: "#004D40",
    colorText: "#0F172A",
    colorTextSecondary: "#475569",
    colorBackground: "rgba(255,255,255,0.78)",
    colorInputBackground: "rgba(255,255,255,0.72)",
    colorInputText: "#0F172A",
    fontFamily: "Manrope, Inter, system-ui, sans-serif",
    borderRadius: "24px",
  },
  elements: {
    rootBox: "w-full",
    cardBox:
      "w-full rounded-[28px] border border-black/10 bg-white/75 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-3xl",
    card: "bg-transparent shadow-none",
    headerTitle: "text-slate-950",
    headerSubtitle: "text-slate-600",
    formButtonPrimary:
      "bg-[#004D40] text-white hover:bg-[#003A30] shadow-[0_14px_30px_rgba(0,77,64,0.18)]",
    socialButtonsBlockButton:
      "border border-black/10 bg-white/70 text-slate-950 hover:bg-white",
    formFieldInput:
      "border border-black/10 bg-white/75 text-slate-950 focus:ring-2 focus:ring-[#004D40]/20",
    footerActionLink: "text-[#004D40] hover:text-[#003A30]",
  },
}
```

Rules:

- Keep Clerk UI visually quiet and premium, not gamified.
- Avoid generic purple Clerk visual defaults.
- Use Clerk components inside Duit.co.id page shells, not the reverse.
- Keep CTA copy Indonesian.
- Do not hide important auth errors; style them to match app but keep them readable.

## Header Auth Controls

For navbar:

```tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export function AuthNav() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="redirect">
          <button className="rounded-full bg-[#004D40] px-4 py-2 text-sm font-semibold text-white">
            Masuk
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
              userButtonPopoverCard:
                "rounded-2xl border border-black/10 bg-white/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl",
            },
          }}
        />
      </SignedIn>
    </>
  )
}
```

## Server Auth

Use `auth()` in Server Components, Server Actions, and Route Handlers.

Example dashboard:

```tsx
import { auth } from "@clerk/nextjs/server"

export default async function DashboardPage() {
  const { isAuthenticated, redirectToSignIn, userId } = await auth()

  if (!isAuthenticated) {
    return redirectToSignIn()
  }

  return <Dashboard userId={userId} />
}
```

Example Route Handler:

```ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}
```

Use this pattern for:

- `/api/duitku/create-transaction`
- `/api/duitku/status`
- course progress APIs
- profile save APIs
- unlock tracking APIs

## Client Hooks

Use hooks only in Client Components:

- `useUser()` for current user object and client-visible metadata.
- `useAuth()` for `userId`, `isSignedIn`, `getToken()`.
- `useClerk()` for opening user profile or sign-out.
- `useSignIn()` and `useSignUp()` only if we build a fully custom form.

For most of the first implementation, prefer prebuilt `<SignIn />` and `<SignUp />` with `appearance`. Move to custom hooks only if Clerk DOM customization is still not enough.

## User Metadata Strategy

Clerk metadata types:

| Type | Frontend read | Frontend write | Backend read/write | Duit.co.id usage |
|---|---:|---:|---:|---|
| Public metadata | Yes | No | Yes | Small display flags, e.g. `incomeTier` if needed |
| Private metadata | No | No | Yes | Auth/admin-only flags |
| Unsafe metadata | Yes | Yes | Yes | Temporary onboarding input only |

Clerk metadata has size limits and session-token freshness caveats. Do not store large profile models there.

Recommended source of truth:

- Clerk: identity, email, OAuth providers, sessions.
- D1 `users`: financial tier, quiz answers, profile fields, membership status, preferences.
- D1 `user_unlocks`: content unlock state.
- D1 `orders` / `payments`: Duitku order/payment state.

Store `clerk_user_id` in D1 and join by that id.

## Duitku Tester Account

For Duitku onboarding, create a real Clerk user:

```text
Email: tester@duit.co.id
Password: DuitkuSandbox2026!
Role: customer
Expected route after login: /dashboard
```

Before sending credentials to Duitku:

- Confirm login works on production domain.
- Confirm `/produk` and `/checkout/[productId]` are reachable.
- Confirm the account can reach the checkout flow.
- Confirm the test order is created under this Clerk user id.

## Security Rules

- Never expose `CLERK_SECRET_KEY` to the browser.
- Protect checkout APIs server-side, not only with client-side UI checks.
- Do not trust Clerk public/unsafe metadata for prices, order values, or access rights.
- Always calculate Duitku payment amount server-side from product data.
- Disable Next `<Link prefetch>` into protected pages if it causes noisy prefetch auth errors.

## Implementation Checklist

- [ ] Install `@clerk/nextjs`.
- [ ] Add Clerk env vars to `.env.local` and Cloudflare deployment secrets.
- [ ] Add `<ClerkProvider>` in `src/app/layout.tsx`.
- [ ] Add `src/lib/clerkAppearance.ts`.
- [ ] Add `src/middleware.ts`.
- [ ] Create `/login` with customized `<SignIn />`.
- [ ] Create `/register` with customized `<SignUp />`.
- [ ] Add navbar auth controls.
- [ ] Protect `/dashboard`, `/profile`, `/academy/my-courses`, and `/checkout`.
- [ ] Create tester user for Duitku onboarding.
- [ ] Add D1 `clerk_user_id` linkage.
- [ ] Verify auth on Cloudflare target runtime.

## Official Sources

- Clerk Next.js App Router Quickstart: https://clerk.com/docs/nextjs/getting-started/quickstart
- Clerk `clerkMiddleware()` reference: https://clerk.com/docs/reference/nextjs/clerk-middleware
- Clerk `auth()` App Router reference: https://clerk.com/docs/reference/nextjs/app-router/auth
- Clerk Route Handlers reference: https://clerk.com/docs/reference/nextjs/app-router/route-handlers
- Clerk `<SignIn />` component reference: https://clerk.com/docs/nextjs/reference/components/authentication/sign-in
- Clerk `<SignUp />` component reference: https://clerk.com/docs/nextjs/reference/components/authentication/sign-up
- Clerk Appearance prop: https://clerk.com/docs/nextjs/guides/customizing-clerk/appearance-prop/overview
- Clerk Themes: https://clerk.com/docs/nextjs/guides/customizing-clerk/appearance-prop/themes
- Clerk Hooks reference: https://clerk.com/docs/nextjs/reference/hooks/overview
- Clerk User metadata: https://clerk.com/docs/guides/users/extending
