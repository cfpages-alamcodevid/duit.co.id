"use client"

import Link from "next/link"
import { type FormEvent, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth, useUser } from "@clerk/react"
import { useSignIn, useSignUp } from "@clerk/react/legacy"
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, CreditCard, Eye, EyeOff, Lock, UserRound } from "lucide-react"
import { formatCoursePrice, type AcademyCourse } from "@/data/academyCourses"

interface DuitkuPaymentMethod {
  paymentMethod: string
  paymentName: string
  paymentImage?: string
  totalFee?: string | number
}

interface DuitkuTransactionResponse {
  paymentUrl?: string
  paymentCode?: string
  reference?: string
  vaNumber?: string
  qrString?: string
  amount?: string | number
  message?: string
}

const previewPaymentMethods: DuitkuPaymentMethod[] = [
  { paymentMethod: "M2", paymentName: "Mandiri Virtual Account" },
  { paymentMethod: "BC", paymentName: "BCA Virtual Account" },
  { paymentMethod: "I1", paymentName: "BNI Virtual Account" },
  { paymentMethod: "SP", paymentName: "QRIS" },
  { paymentMethod: "OV", paymentName: "OVO" },
  { paymentMethod: "DA", paymentName: "DANA" },
  { paymentMethod: "FT", paymentName: "Retail Alfamart" },
  { paymentMethod: "VC", paymentName: "Kartu Kredit" },
]

export function CourseCheckoutClient({ course }: { course: AcademyCourse }) {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const pathname = usePathname()
  const [phone, setPhone] = useState("")
  const [methods, setMethods] = useState<DuitkuPaymentMethod[]>([])
  const [selectedMethod, setSelectedMethod] = useState("")
  const [transaction, setTransaction] = useState<DuitkuTransactionResponse | null>(null)
  const [error, setError] = useState("")
  const [isLoadingMethods, setIsLoadingMethods] = useState(false)
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false)

  const customerEmail = user?.primaryEmailAddress?.emailAddress ?? ""
  const customerName = user?.fullName ?? user?.username ?? ""
  const canPay = Boolean(isSignedIn && selectedMethod && customerEmail)

  const productId = course.slug
  const displayName = useMemo(() => customerName || "Peserta Duit.co.id", [customerName])

  useEffect(() => {
    if (!isLoaded || !isSignedIn || methods.length > 0 || isLoadingMethods) return
    void loadMethods()
  }, [isLoaded, isSignedIn, methods.length, isLoadingMethods])

  const loadMethods = async () => {
    setError("")

    if (!isLoaded || !isSignedIn) {
      setError("Login atau daftar dulu agar metode pembayaran bisa ditampilkan.")
      return
    }

    setIsLoadingMethods(true)

    try {
      const token = await getToken()
      const response = await fetch(`/api/duitku/payment-methods?productId=${productId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Metode pembayaran belum bisa dimuat.")
      }

      const paymentMethods = Array.isArray(data.paymentMethods) ? data.paymentMethods : []
      setMethods(paymentMethods)
      setSelectedMethod(paymentMethods[0]?.paymentMethod ?? "")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Metode pembayaran belum bisa dimuat.")
    } finally {
      setIsLoadingMethods(false)
    }
  }

  const createTransaction = async () => {
    setError("")

    if (!isLoaded || !isSignedIn) {
      setError("Login atau daftar dulu sebelum melanjutkan pembayaran.")
      return
    }

    setIsCreatingTransaction(true)

    try {
      const token = isSignedIn ? await getToken() : null
      const response = await fetch("/api/duitku/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          productId,
          paymentMethod: selectedMethod,
          returnPath: pathname,
          customer: {
            name: displayName,
            email: customerEmail,
            phone,
          },
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Pembayaran belum bisa dibuat.")
      }

      setTransaction(data)

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pembayaran belum bisa dibuat.")
    } finally {
      setIsCreatingTransaction(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6">
      <section className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
            Pembayaran kelas
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-heading sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-body">
            Lengkapi data peserta, pilih metode pembayaran, lalu lanjutkan ke instruksi pembayaran.
          </p>
        </div>
        <aside className="rounded-2xl border border-black/10 bg-white/72 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold text-body">Total pembayaran</p>
          <p className="mt-2 text-3xl font-semibold text-heading">{formatCoursePrice(course.price)}</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-body">
            {course.outcomes.slice(0, 3).map((outcome) => (
              <li key={outcome} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-money-green" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel icon={UserRound} title="Akun peserta">
          {isLoaded && isSignedIn ? (
            <div className="rounded-2xl border border-money-green/15 bg-money-green/10 p-4 text-sm leading-6 text-body">
              Anda masuk sebagai <span className="font-semibold text-heading">{customerEmail}</span>.
            </div>
          ) : (
            <CheckoutAuthTabs returnPath={pathname} />
          )}

          <div className="mt-5 grid gap-4">
            <TextInput label="Nomor WhatsApp" value={phone} onChange={setPhone} autoComplete="tel" />
            <p className="text-xs leading-5 text-body">Opsional, dipakai kalau kami perlu membantu proses pembayaran.</p>
          </div>
        </Panel>

        <Panel icon={CreditCard} title="Metode pembayaran">
          {!isSignedIn ? (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-50/80 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
              Login atau daftar dulu untuk melihat metode pembayaran.
            </div>
          ) : null}

          {isSignedIn && isLoadingMethods ? (
            <div className="rounded-2xl border border-black/10 bg-white/60 p-4 text-sm font-semibold text-body dark:border-white/10 dark:bg-white/5">
              Memuat metode pembayaran...
            </div>
          ) : null}

          {methods.length > 0 ? (
            <PaymentMethodGroups
              methods={methods}
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
              disabled={false}
            />
          ) : null}

          {!isSignedIn ? (
            <PaymentMethodGroups
              methods={previewPaymentMethods}
              selectedMethod=""
              onSelect={() => undefined}
              disabled
            />
          ) : null}

          {error ? (
            <div className="mt-5 flex gap-3 rounded-2xl border border-red-500/20 bg-red-50/80 p-4 text-sm leading-6 text-red-800 dark:bg-red-500/10 dark:text-red-100">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <button
            type="button"
            onClick={createTransaction}
            disabled={!isSignedIn || !canPay || isCreatingTransaction}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreatingTransaction ? "Menyiapkan pembayaran..." : "Lanjut ke pembayaran"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </Panel>
      </section>

      {transaction ? (
        <Panel icon={Lock} title="Instruksi pembayaran">
          <div className="grid gap-3 text-sm leading-6 text-body">
            {transaction.reference ? <p>Reference: {transaction.reference}</p> : null}
            {transaction.paymentCode ? <p>Kode pembayaran: {transaction.paymentCode}</p> : null}
            {transaction.vaNumber ? <p>Nomor VA: {transaction.vaNumber}</p> : null}
            {transaction.message ? <p>{transaction.message}</p> : null}
          </div>
        </Panel>
      ) : null}
    </div>
  )
}

export function CheckoutAuthTabs({ returnPath }: { returnPath: string }) {
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn()
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp()
  const [tab, setTab] = useState<"login" | "register">("login")
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [code, setCode] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const redirectUrl = `/login/sso-callback?redirect_url=${encodeURIComponent(returnPath)}`

  const continueWithGoogle = async () => {
    setError("")

    try {
      if (tab === "login") {
        if (!signInLoaded) return
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl,
          redirectUrlComplete: returnPath,
        })
        return
      }

      if (!signUpLoaded) return
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl,
        redirectUrlComplete: returnPath,
      })
    } catch (err) {
      setError(getClerkErrorMessage(err))
    }
  }

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    if (!signInLoaded) return

    setIsSubmitting(true)
    try {
      const result = await signIn.create({ identifier: email, password })
      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId })
        window.location.href = returnPath
        return
      }
      setError("Login membutuhkan verifikasi tambahan. Cek email atau metode login akun Anda.")
    } catch (err) {
      setError(getClerkErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    if (!signUpLoaded) return

    setIsSubmitting(true)
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      })

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId })
        window.location.href = returnPath
        return
      }

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setPendingVerification(true)
    } catch (err) {
      setError(getClerkErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const verifyRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    if (!signUpLoaded) return

    setIsSubmitting(true)
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId })
        window.location.href = returnPath
        return
      }
      setError("Kode belum dapat diverifikasi. Cek kembali kode di email Anda.")
    } catch (err) {
      setError(getClerkErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-50/80 p-4 dark:bg-amber-500/10">
      <div className="grid grid-cols-2 rounded-xl border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/10">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            tab === "login" ? "bg-money-green text-white" : "text-body hover:bg-white/80 dark:hover:bg-white/10"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            tab === "register" ? "bg-money-green text-white" : "text-body hover:bg-white/80 dark:hover:bg-white/10"
          }`}
        >
          Daftar
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-amber-900 dark:text-amber-100">
        {tab === "login"
          ? "Gunakan akun Anda untuk melanjutkan pembayaran kelas."
          : "Buat akun untuk menyimpan akses kelas setelah pembayaran berhasil."}
      </p>

      <button
        type="button"
        onClick={continueWithGoogle}
        disabled={tab === "login" ? !signInLoaded : !signUpLoaded}
        className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-heading shadow-[0_12px_28px_rgba(0,0,0,0.04)] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
      >
        <GoogleLogo />
        {tab === "login" ? "Login via Google" : "Daftar via Google"}
      </button>

      <div className="my-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-amber-900/70 dark:text-amber-100/70">
        <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        <span>Email</span>
        <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
      </div>

      {pendingVerification ? (
        <form className="space-y-3" onSubmit={verifyRegister}>
          <TextInput label="Kode verifikasi email" value={code} onChange={setCode} autoComplete="one-time-code" />
          <button
            type="submit"
            disabled={isSubmitting || !signUpLoaded}
            className="h-12 w-full rounded-xl bg-money-green px-5 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Memverifikasi..." : "Verifikasi dan kembali ke checkout"}
          </button>
        </form>
      ) : tab === "login" ? (
        <form className="space-y-3" onSubmit={submitLogin}>
          <TextInput label="Email" value={email} onChange={setEmail} autoComplete="email" />
          <PasswordInput
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={isSubmitting || !signInLoaded}
            className="h-12 w-full rounded-xl bg-money-green px-5 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Memproses..." : "Login dan lanjut checkout"}
          </button>
        </form>
      ) : (
        <form className="space-y-3" onSubmit={submitRegister}>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput label="Nama depan" value={firstName} onChange={setFirstName} autoComplete="given-name" />
            <TextInput label="Nama belakang" value={lastName} onChange={setLastName} autoComplete="family-name" />
          </div>
          <TextInput label="Email" value={email} onChange={setEmail} autoComplete="email" />
          <PasswordInput
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            autoComplete="new-password"
          />
          <button
            type="submit"
            disabled={isSubmitting || !signUpLoaded}
            className="h-12 w-full rounded-xl bg-money-green px-5 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Membuat akun..." : "Daftar dan lanjut checkout"}
          </button>
        </form>
      )}

      {error ? (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-50/80 p-3 text-sm leading-6 text-red-800 dark:bg-red-500/10 dark:text-red-100">
          {error}
        </div>
      ) : null}
    </div>
  )
}

export function PaymentMethodGroups({
  methods,
  selectedMethod,
  onSelect,
  disabled,
}: {
  methods: DuitkuPaymentMethod[]
  selectedMethod: string
  onSelect: (method: string) => void
  disabled: boolean
}) {
  const groups = groupPaymentMethods(methods)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((group) => [group.label, false])),
  )

  return (
    <div className={`mt-5 space-y-3 ${disabled ? "opacity-55 grayscale" : ""}`}>
      {groups.map((group) => (
        <section
          key={group.label}
          className="overflow-hidden rounded-2xl border border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/5"
        >
          <button
            type="button"
            onClick={() =>
              setOpenGroups((current) => ({
                ...current,
                [group.label]: !current[group.label],
              }))
            }
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <span>
              <span className="block text-sm font-semibold text-heading">{group.label}</span>
              <span className="mt-0.5 block text-xs text-body">{group.methods.length} metode</span>
            </span>
            <ChevronDown
              className={`h-4 w-4 text-body transition ${openGroups[group.label] ? "rotate-180" : ""}`}
            />
          </button>
          {openGroups[group.label] ? (
            <div className="grid gap-3 border-t border-black/10 p-3 sm:grid-cols-2 dark:border-white/10">
              {group.methods.map((method) => (
                <label
                  key={method.paymentMethod}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-sm transition ${
                    disabled
                      ? "cursor-not-allowed border-black/10 bg-black/5 text-body dark:border-white/10 dark:bg-white/5"
                      : selectedMethod === method.paymentMethod
                        ? "cursor-pointer border-money-green bg-money-green/10 text-heading"
                        : "cursor-pointer border-black/10 bg-white/70 text-body hover:border-money-green/30 dark:border-white/10 dark:bg-white/5"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedMethod === method.paymentMethod}
                    disabled={disabled}
                    onChange={() => onSelect(method.paymentMethod)}
                  />
                  {method.paymentImage ? (
                    <img src={method.paymentImage} alt="" className="h-5 max-w-14 object-contain" />
                  ) : null}
                  <span className="font-semibold">{method.paymentName}</span>
                </label>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}

function groupPaymentMethods(methods: DuitkuPaymentMethod[]) {
  const groups = [
    { label: "Virtual Account", test: (value: string) => /va|virtual|bca|bni|bri|mandiri|permata|cimb|maybank|danamon|bsi|btn/i.test(value), methods: [] as DuitkuPaymentMethod[] },
    { label: "QRIS", test: (value: string) => /qris|qr/i.test(value), methods: [] as DuitkuPaymentMethod[] },
    { label: "E-Wallet", test: (value: string) => /ovo|gopay|dana|linkaja|shopee|wallet/i.test(value), methods: [] as DuitkuPaymentMethod[] },
    { label: "Retail", test: (value: string) => /alfamart|indomaret|retail/i.test(value), methods: [] as DuitkuPaymentMethod[] },
    { label: "Kartu", test: (value: string) => /credit|card|visa|master/i.test(value), methods: [] as DuitkuPaymentMethod[] },
    { label: "Lainnya", test: () => true, methods: [] as DuitkuPaymentMethod[] },
  ]

  for (const method of methods) {
    const value = `${method.paymentMethod} ${method.paymentName}`
    const group = groups.find((item) => item.test(value)) ?? groups[groups.length - 1]
    group.methods.push(method)
  }

  return groups.filter((group) => group.methods.length > 0)
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/72 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-money-green/10 text-money-green">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl font-semibold text-heading">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function TextInput({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-heading">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={label !== "Nomor WhatsApp"}
        className="h-12 w-full rounded-xl border border-black/10 bg-white/80 px-4 text-sm text-heading outline-none transition focus:border-money-green/40 focus:ring-4 focus:ring-money-green/10 dark:border-white/10 dark:bg-white/10"
      />
    </label>
  )
}

function PasswordInput({
  value,
  onChange,
  showPassword,
  setShowPassword,
  autoComplete,
}: {
  value: string
  onChange: (value: string) => void
  showPassword: boolean
  setShowPassword: (value: boolean) => void
  autoComplete: string
}) {
  return (
    <label className="space-y-2">
      <span className="block text-sm font-semibold text-heading">Password</span>
      <div className="flex h-12 overflow-hidden rounded-xl border border-black/10 bg-white/80 transition focus-within:border-money-green/40 focus-within:ring-4 focus-within:ring-money-green/10 dark:border-white/10 dark:bg-white/10">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
          minLength={8}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-heading outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="grid w-12 place-items-center text-body transition hover:text-money-green"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  )
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}

function getClerkErrorMessage(err: unknown) {
  if (
    typeof err === "object" &&
    err !== null &&
    "errors" in err &&
    Array.isArray((err as { errors?: unknown }).errors)
  ) {
    const firstError = (err as { errors: Array<{ longMessage?: string; message?: string }> }).errors[0]
    return firstError?.longMessage ?? firstError?.message ?? "Login Google belum berhasil."
  }

  if (err instanceof Error) {
    return err.message
  }

  return "Login Google belum berhasil."
}
