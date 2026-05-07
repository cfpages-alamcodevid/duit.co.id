"use client"

import { type FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSignIn, useSignUp } from "@clerk/nextjs/legacy"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import { isClerkPublishableKeyConfigured } from "@/components/auth/DuitClerkProvider"

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
            <CustomClerkForm tab={tab} setTab={setTab} />
          </div>
        )}
      </section>
    </div>
  )
}

function CustomClerkForm({
  tab,
  setTab,
}: {
  tab: AuthTab
  setTab: (tab: AuthTab) => void
}) {
  return tab === "login" ? (
    <CustomSignInForm setTab={setTab} />
  ) : (
    <CustomSignUpForm setTab={setTab} />
  )
}

function CustomSignInForm({ setTab }: { setTab: (tab: AuthTab) => void }) {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!isLoaded) return

    setIsSubmitting(true)
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/dashboard")
        return
      }

      setError("Login membutuhkan langkah tambahan. Cek email atau metode verifikasi akun Anda.")
    } catch (err) {
      setError(getClerkErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="duit-native-auth-form space-y-4" onSubmit={submit}>
      <AuthInput
        id="duit-login-email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        placeholder="nama@email.com"
      />
      <AuthPasswordInput
        id="duit-login-password"
        label="Password"
        value={password}
        onChange={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        autoComplete="current-password"
      />
      {error ? <AuthError message={error} /> : null}
      <button
        type="submit"
        disabled={!isLoaded || isSubmitting}
        className="h-12 w-full rounded-xl bg-money-green px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,77,64,0.18)] transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Memproses..." : "Masuk"}
      </button>
      <p className="text-center text-sm text-body">
        Belum punya akun?{" "}
        <button
          type="button"
          onClick={() => setTab("register")}
          className="font-semibold text-money-green hover:text-money-green-dark"
        >
          Register
        </button>
      </p>
    </form>
  )
}

function CustomSignUpForm({ setTab }: { setTab: (tab: AuthTab) => void }) {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [code, setCode] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!isLoaded) return

    setIsSubmitting(true)
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/dashboard")
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

  const verify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!isLoaded) return

    setIsSubmitting(true)
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/dashboard")
        return
      }

      setError("Kode belum dapat diverifikasi. Cek kembali kode di email Anda.")
    } catch (err) {
      setError(getClerkErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (pendingVerification) {
    return (
      <form className="duit-native-auth-form space-y-4" onSubmit={verify}>
        <div className="rounded-2xl border border-money-green/15 bg-money-green/10 p-4 text-sm leading-6 text-body">
          Kode verifikasi dikirim ke <span className="font-semibold text-heading">{email}</span>.
        </div>
        <AuthInput
          id="duit-register-code"
          label="Kode verifikasi email"
          type="text"
          value={code}
          onChange={setCode}
          autoComplete="one-time-code"
          placeholder="123456"
        />
        {error ? <AuthError message={error} /> : null}
        <button
          type="submit"
          disabled={!isLoaded || isSubmitting}
          className="h-12 w-full rounded-xl bg-money-green px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,77,64,0.18)] transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Memverifikasi..." : "Verifikasi dan masuk"}
        </button>
      </form>
    )
  }

  return (
    <form className="duit-native-auth-form space-y-4" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthInput
          id="duit-register-first-name"
          label="Nama depan"
          type="text"
          value={firstName}
          onChange={setFirstName}
          autoComplete="given-name"
          placeholder="Syamsul"
        />
        <AuthInput
          id="duit-register-last-name"
          label="Nama belakang"
          type="text"
          value={lastName}
          onChange={setLastName}
          autoComplete="family-name"
          placeholder="Alam"
        />
      </div>
      <AuthInput
        id="duit-register-email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        placeholder="nama@email.com"
      />
      <AuthPasswordInput
        id="duit-register-password"
        label="Password"
        value={password}
        onChange={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        autoComplete="new-password"
      />
      {error ? <AuthError message={error} /> : null}
      <button
        type="submit"
        disabled={!isLoaded || isSubmitting}
        className="h-12 w-full rounded-xl bg-money-green px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,77,64,0.18)] transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Membuat akun..." : "Buat akun"}
      </button>
      <p className="text-center text-sm text-body">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={() => setTab("login")}
          className="font-semibold text-money-green hover:text-money-green-dark"
        >
          Login
        </button>
      </p>
    </form>
  )
}

function AuthInput({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  placeholder,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
  placeholder: string
}) {
  return (
    <label htmlFor={id} className="block space-y-2">
      <span className="block text-sm font-semibold text-heading">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="h-12 w-full rounded-xl border border-black/10 bg-white/80 px-4 text-sm text-heading outline-none transition placeholder:text-slate-400 focus:border-money-green/40 focus:ring-4 focus:ring-money-green/10 dark:border-white/10 dark:bg-white/10"
      />
    </label>
  )
}

function AuthPasswordInput({
  id,
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  showPassword: boolean
  setShowPassword: (value: boolean) => void
  autoComplete: string
}) {
  return (
    <label htmlFor={id} className="block space-y-2">
      <span className="block text-sm font-semibold text-heading">{label}</span>
      <div className="flex h-12 overflow-hidden rounded-xl border border-black/10 bg-white/80 transition focus-within:border-money-green/40 focus-within:ring-4 focus-within:ring-money-green/10 dark:border-white/10 dark:bg-white/10">
        <input
          id={id}
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

function AuthError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-50/80 p-4 text-sm leading-6 text-red-800 dark:bg-red-500/10 dark:text-red-100">
      {message}
    </div>
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
    return firstError?.longMessage ?? firstError?.message ?? "Terjadi kesalahan autentikasi."
  }

  if (err instanceof Error) {
    return err.message
  }

  return "Terjadi kesalahan autentikasi."
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
