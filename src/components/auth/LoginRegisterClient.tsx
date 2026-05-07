"use client"

import { useMemo, useState } from "react"
import { SignIn, SignUp } from "@clerk/nextjs"
import { ShieldCheck } from "lucide-react"
import { isClerkPublishableKeyConfigured } from "@/components/auth/DuitClerkProvider"
import { duitClerkAppearance } from "@/lib/clerkAppearance"

type AuthTab = "login" | "register"

interface LoginRegisterClientProps {
  initialTab: AuthTab
}

export function LoginRegisterClient({ initialTab }: LoginRegisterClientProps) {
  const [tab, setTab] = useState<AuthTab>(initialTab)
  const isConfigured = isClerkPublishableKeyConfigured()
  const heading = useMemo(
    () => (tab === "login" ? "Masuk ke Duit.co.id" : "Buat akun Duit.co.id"),
    [tab],
  )

  return (
    <div className="mx-auto grid max-w-6xl gap-8 py-8 lg:grid-cols-[1fr_460px] lg:items-center">
      <section className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
          Duit.co.id Account
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-heading sm:text-5xl">
          Satu akun untuk belajar, menghitung, dan membangun kedaulatan finansial.
        </h1>
        <p className="mt-5 text-base leading-7 text-body sm:text-lg">
          Gunakan akun ini untuk dashboard personal, progres academy, checkout, unlock content,
          dan rekomendasi berdasarkan tier finansial Anda.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["Dashboard personal", "Checkout aman", "Progress belajar"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm font-semibold text-heading shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
            >
              <ShieldCheck className="mb-3 h-5 w-5 text-money-green" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section
        id="duit-auth-card"
        className="rounded-[28px] border border-black/10 bg-white/72 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-3xl dark:border-white/10 dark:bg-white/7"
      >
        <div className="mb-5">
          <div
            id="duit-auth-tabs"
            className="grid grid-cols-2 rounded-2xl border border-black/10 bg-white/60 p-1 dark:border-white/10 dark:bg-white/5"
          >
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                tab === "login"
                  ? "bg-money-green text-white shadow-[0_12px_24px_rgba(0,77,64,0.20)]"
                  : "text-body hover:bg-white/70 hover:text-heading dark:hover:bg-white/10"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                tab === "register"
                  ? "bg-money-green text-white shadow-[0_12px_24px_rgba(0,77,64,0.20)]"
                  : "text-body hover:bg-white/70 hover:text-heading dark:hover:bg-white/10"
              }`}
            >
              Register
            </button>
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-heading">{heading}</h2>
          <p className="mt-2 text-sm leading-6 text-body">
            Form di bawah memakai Clerk, tetapi diberi styling Duit.co.id agar tidak terasa seperti
            komponen default.
          </p>
        </div>

        {!isConfigured ? (
          <MissingClerkConfig />
        ) : (
          <div id="duit-clerk-panel" className="duit-clerk-panel">
            {tab === "login" ? (
              <SignIn
                appearance={duitClerkAppearance}
                routing="hash"
                signUpUrl="/login?tab=register"
                fallbackRedirectUrl="/dashboard"
              />
            ) : (
              <SignUp
                appearance={duitClerkAppearance}
                routing="hash"
                signInUrl="/login"
                fallbackRedirectUrl="/dashboard"
              />
            )}
          </div>
        )}
      </section>
    </div>
  )
}

function MissingClerkConfig() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-50/80 p-5 text-sm leading-6 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
      <p className="font-semibold">Clerk belum aktif.</p>
      <p className="mt-2">
        Isi `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` dan `CLERK_SECRET_KEY`, lalu cek status di
        `/debug/clerk`.
      </p>
    </div>
  )
}
