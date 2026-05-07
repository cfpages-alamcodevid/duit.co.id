import type { Metadata } from "next"
import { CheckCircle2, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Debug Clerk Environment",
  description: "Status konfigurasi environment variable dan secret Clerk untuk Duit.co.id.",
}

const clerkChecks = [
  {
    name: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    type: "Public variable",
    required: true,
    value: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    note: "Dibutuhkan browser untuk memuat Clerk components.",
  },
  {
    name: "CLERK_SECRET_KEY",
    type: "Secret",
    required: true,
    value: process.env.CLERK_SECRET_KEY,
    note: "Dibutuhkan server API, webhook, dan operasi backend Clerk.",
  },
  {
    name: "CLERK_WEBHOOK_SECRET",
    type: "Secret",
    required: false,
    value: process.env.CLERK_WEBHOOK_SECRET,
    note: "Dibutuhkan saat sinkronisasi user Clerk ke D1 via webhook.",
  },
  {
    name: "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
    type: "Public variable",
    required: false,
    value: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    note: "Disarankan `/login`.",
  },
  {
    name: "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
    type: "Public variable",
    required: false,
    value: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    note: "Disarankan `/login?tab=register` atau `/register`.",
  },
  {
    name: "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL",
    type: "Public variable",
    required: false,
    value: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    note: "Disarankan `/dashboard`.",
  },
  {
    name: "NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL",
    type: "Public variable",
    required: false,
    value: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
    note: "Disarankan `/dashboard`.",
  },
  {
    name: "NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL",
    type: "Public variable",
    required: false,
    value: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL,
    note: "Disarankan `/`.",
  },
]

export default function Page() {
  const requiredMissing = clerkChecks.filter((item) => item.required && !item.value)

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
          Debug
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-heading">Status konfigurasi Clerk</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-body">
          Halaman ini hanya menampilkan status ada/tidaknya variable. Nilai secret tidak pernah
          ditampilkan.
        </p>
      </section>

      <div
        className={`rounded-2xl border p-5 ${
          requiredMissing.length
            ? "border-amber-500/30 bg-amber-50/80 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100"
            : "border-money-green/20 bg-money-green/10 text-heading"
        }`}
      >
        <p className="font-semibold">
          {requiredMissing.length
            ? `${requiredMissing.length} required variable belum dipasang`
            : "Required Clerk variables sudah terdeteksi"}
        </p>
        <p className="mt-2 text-sm leading-6">
          Karena project masih memakai static export, status ini merefleksikan environment saat
          build dijalankan. Setelah mengubah Cloudflare variables, lakukan redeploy.
        </p>
      </div>

      <div className="grid gap-4">
        {clerkChecks.map((item) => {
          const configured = Boolean(item.value)
          return (
            <article
              key={item.name}
              className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-sm font-semibold text-heading">{item.name}</p>
                  <p className="mt-2 text-sm leading-6 text-body">{item.note}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-sm font-semibold dark:border-white/10 dark:bg-white/5">
                  {configured ? (
                    <CheckCircle2 className="h-4 w-4 text-money-green" />
                  ) : (
                    <XCircle className="h-4 w-4 text-amber-600" />
                  )}
                  <span>{configured ? "Terpasang" : item.required ? "Wajib diisi" : "Opsional kosong"}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-black/5 px-3 py-1 text-body dark:bg-white/10">
                  {item.type}
                </span>
                <span className="rounded-full bg-black/5 px-3 py-1 text-body dark:bg-white/10">
                  {item.required ? "Required" : "Optional"}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
