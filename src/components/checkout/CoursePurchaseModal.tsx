"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth, useUser } from "@clerk/react"
import { createPortal } from "react-dom"
import { AlertCircle, ArrowRight, CheckCircle2, CreditCard, X } from "lucide-react"
import { formatCoursePrice, type AcademyCourse } from "@/data/academyCourses"
import { CheckoutAuthTabs, PaymentMethodGroups } from "@/components/checkout/CourseCheckoutClient"

interface DuitkuPaymentMethod {
  paymentMethod: string
  paymentName: string
  paymentImage?: string
  totalFee?: string | number
}

export function CoursePurchaseModal({
  course,
  open,
  onClose,
}: {
  course: AcademyCourse
  open: boolean
  onClose: () => void
}) {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const pathname = usePathname()
  const [methods, setMethods] = useState<DuitkuPaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState("")
  const [error, setError] = useState("")
  const [isLoadingMethods, setIsLoadingMethods] = useState(false)
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)
  const [mounted, setMounted] = useState(false)

  const customerEmail = user?.primaryEmailAddress?.emailAddress ?? ""
  const customerName = user?.fullName ?? user?.username ?? ""
  const displayName = useMemo(() => customerName || "Peserta Duit.co.id", [customerName])

  useEffect(() => {
    if (!open || !isLoaded || !isSignedIn || methods.length > 0 || isLoadingMethods) return
    void loadMethods()
  }, [open, isLoaded, isSignedIn, methods.length, isLoadingMethods])

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadMethods = async () => {
    setError("")
    setIsLoadingMethods(true)

    try {
      const token = await getToken()
      const response = await fetch(`/api/duitku/payment-methods?productId=${course.slug}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Metode pembayaran belum bisa dimuat.")
      }

      const paymentMethods = Array.isArray(data.paymentMethods) ? data.paymentMethods : []
      setMethods(paymentMethods)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Metode pembayaran belum bisa dimuat.")
    } finally {
      setIsLoadingMethods(false)
    }
  }

  const createTransaction = async () => {
    setError("")

    if (!isSignedIn || !customerEmail || !selectedMethod) {
      setError("Login dan pilih metode pembayaran dulu.")
      return
    }

    setIsCreatingTransaction(true)

    try {
      const token = await getToken()
      const response = await fetch("/api/duitku/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          productId: course.slug,
          paymentMethod: selectedMethod,
          returnPath: pathname,
          customer: {
            name: displayName,
            email: customerEmail,
            phone: "",
          },
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Pembayaran belum bisa dibuat.")
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pembayaran belum bisa dibuat.")
    } finally {
      setIsCreatingTransaction(false)
    }
  }

  if (!open || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/45 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-48px)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-black/10 bg-white p-5 shadow-[0_28px_80px_rgba(0,0,0,0.24)] dark:border-white/10 dark:bg-[#06110f]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-money-green">Pembayaran kelas</p>
            <h2 className="mt-1 text-2xl font-semibold leading-tight text-heading">{course.title}</h2>
            <p className="mt-2 text-sm text-body">{formatCoursePrice(course.price)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 text-body transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isSignedIn ? (
          <CheckoutAuthTabs returnPath={pathname} />
        ) : (
          <div className="rounded-2xl border border-money-green/15 bg-money-green/10 p-4 text-sm leading-6 text-body">
            <CheckCircle2 className="mr-2 inline h-4 w-4 text-money-green" />
            Anda masuk sebagai <span className="font-semibold text-heading">{customerEmail}</span>.
          </div>
        )}

        {isSignedIn ? (
          <section className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-money-green/10 text-money-green">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-heading">Pilih metode pembayaran</h3>
                <p className="text-sm text-body">Buka kategori, pilih metode, lalu lanjut bayar.</p>
              </div>
            </div>

            {isLoadingMethods ? (
              <p className="rounded-xl bg-black/5 p-4 text-sm font-semibold text-body dark:bg-white/10">
                Memuat metode pembayaran...
              </p>
            ) : null}

            {methods.length > 0 ? (
              <PaymentMethodGroups
                methods={methods}
                selectedMethod={selectedMethod}
                onSelect={setSelectedMethod}
                disabled={false}
              />
            ) : null}

            {error ? (
              <div className="mt-4 flex gap-3 rounded-2xl border border-red-500/20 bg-red-50/80 p-4 text-sm leading-6 text-red-800 dark:bg-red-500/10 dark:text-red-100">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <button
              type="button"
              onClick={createTransaction}
              disabled={!selectedMethod || isCreatingTransaction}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreatingTransaction ? "Menyiapkan pembayaran..." : "Bayar sekarang"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
