"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth, useUser } from "@/components/auth/DuitClerkProvider"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Gift, Loader2, Phone, ShieldCheck, UserRound } from "lucide-react"

type D1Profile = {
  clerk_user_id: string
  email: string | null
  full_name: string | null
  image_url: string | null
  birthday_date: string | null
  birthday_locked_at: string | null
  whatsapp_country: string | null
  whatsapp_country_code: string | null
  whatsapp_national_number: string | null
  whatsapp_e164: string | null
  income_tier: string | null
  last_article_slug: string | null
  last_article_read_at: string | null
}

const countries = [
  { code: "ID", dial: "+62", flag: "🇮🇩", label: "Indonesia" },
  { code: "MY", dial: "+60", flag: "🇲🇾", label: "Malaysia" },
  { code: "SG", dial: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "US", dial: "+1", flag: "🇺🇸", label: "United States" },
  { code: "AU", dial: "+61", flag: "🇦🇺", label: "Australia" },
]

function chunkPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "")
}

export function ProfileClient() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const [profile, setProfile] = useState<D1Profile | null>(null)
  const [birthdayDate, setBirthdayDate] = useState("")
  const [birthdayConfirmed, setBirthdayConfirmed] = useState(false)
  const [country, setCountry] = useState(countries[0])
  const [phoneNational, setPhoneNational] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const birthdayLocked = Boolean(profile?.birthday_date)
  const phoneDisplay = chunkPhone(phoneNational)
  const canSaveBirthday = birthdayLocked || !birthdayDate || birthdayConfirmed

  const clerkEmail = user?.primaryEmailAddress?.emailAddress ?? ""
  const fullName = useMemo(() => user?.fullName ?? user?.username ?? "", [user])

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    const loadProfile = async () => {
      setIsLoadingProfile(true)
      setError("")

      try {
        const token = await getToken()
        const response = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message ?? "Profil belum bisa dimuat.")
        }

        const loadedProfile = data.profile as D1Profile
        setProfile(loadedProfile)
        setBirthdayDate(loadedProfile.birthday_date ?? "")
        const loadedCountry =
          countries.find(
            (item) =>
              item.code === loadedProfile.whatsapp_country ||
              item.dial === loadedProfile.whatsapp_country_code,
          ) ?? countries[0]
        setCountry(loadedCountry)
        setPhoneNational(loadedProfile.whatsapp_national_number ?? "")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Profil belum bisa dimuat.")
      } finally {
        setIsLoadingProfile(false)
      }
    }

    void loadProfile()
  }, [getToken, isLoaded, isSignedIn])

  const saveProfile = async () => {
    setError("")
    setMessage("")

    if (!canSaveBirthday) {
      setError("Centang konfirmasi tanggal lahir sebelum menyimpan.")
      return
    }

    setIsSaving(true)

    try {
      const token = await getToken()
      const payload = {
        email: clerkEmail,
        fullName,
        imageUrl: user?.imageUrl ?? "",
        birthdayDate: birthdayDate || null,
        whatsappCountry: country.code,
        whatsappCountryCode: country.dial,
        whatsappNationalNumber: normalizePhone(phoneNational),
      }
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Profil belum bisa disimpan.")
      }

      setProfile(data.profile)
      setBirthdayDate(data.profile.birthday_date ?? "")
      setPhoneNational(data.profile.whatsapp_national_number ?? "")

      await user?.update({
        unsafeMetadata: {
          ...(user.unsafeMetadata ?? {}),
          duitProfile: {
            birthdayDate: data.profile.birthday_date,
            birthdayLocked: Boolean(data.profile.birthday_date),
            whatsappCountry: data.profile.whatsapp_country,
            whatsappCountryCode: data.profile.whatsapp_country_code,
            whatsappNationalNumber: data.profile.whatsapp_national_number,
            whatsappE164: data.profile.whatsapp_e164,
          },
        },
      })

      setMessage("Profil tersimpan.")
      setBirthdayConfirmed(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profil belum bisa disimpan.")
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center text-body">
        <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-money-green" />
        Memuat profil...
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-3xl font-semibold text-heading">Masuk untuk melihat profil</h1>
        <p className="mt-4 text-sm leading-6 text-body">
          Profil menyimpan progres belajar, checkout, dan rekomendasi yang sesuai dengan kondisi Anda.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white"
        >
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6">
      <section className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-money-green">
            Profil Duit.co.id
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-heading sm:text-5xl">
            Lengkapi profil untuk pengalaman belajar yang lebih personal.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-body">
            Data ini membantu kami menyimpan progres, riwayat pembayaran, artikel terakhir dibaca,
            dan benefit yang relevan untuk Anda.
          </p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/72 p-5 dark:border-white/10 dark:bg-white/5">
          <UserRound className="h-6 w-6 text-money-green" />
          <p className="mt-4 text-sm font-semibold text-heading">{fullName || "Pengguna Duit.co.id"}</p>
          <p className="mt-1 text-sm text-body">{clerkEmail}</p>
        </div>
      </section>

      {isLoadingProfile ? (
        <Notice tone="info" icon={Loader2} title="Memuat data profil">
          Mohon tunggu sebentar.
        </Notice>
      ) : null}
      {error ? (
        <Notice tone="warn" icon={AlertTriangle} title="Profil belum tersimpan">
          {error}
        </Notice>
      ) : null}
      {message ? (
        <Notice tone="success" icon={CheckCircle2} title="Berhasil">
          {message}
        </Notice>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel icon={Gift} title="Tanggal lahir">
          <p className="text-sm leading-6 text-body">
            Tanggal lahir bisa dipakai untuk benefit seperti kupon ulang tahun.
          </p>

          {birthdayLocked ? (
            <Notice tone="success" icon={ShieldCheck} title="Tanggal lahir sudah terkunci">
              {profile?.birthday_date}. Data ini tidak bisa diubah dari halaman profil.
            </Notice>
          ) : (
            <Notice tone="warn" icon={AlertTriangle} title="Periksa sebelum menyimpan">
              Tanggal lahir hanya bisa diatur satu kali. Pastikan datanya benar sebelum menyimpan.
            </Notice>
          )}

          <label className="mt-5 block space-y-2">
            <span className="text-sm font-semibold text-heading">Tanggal lahir</span>
            <input
              type="date"
              value={birthdayDate}
              disabled={birthdayLocked}
              onChange={(event) => setBirthdayDate(event.target.value)}
              className="h-12 w-full rounded-xl border border-black/10 bg-white/80 px-4 text-sm text-heading outline-none transition focus:border-money-green/40 focus:ring-4 focus:ring-money-green/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/10"
            />
          </label>

          {!birthdayLocked && birthdayDate ? (
            <label className="mt-4 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-50/80 p-4 text-sm leading-6 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100">
              <input
                type="checkbox"
                checked={birthdayConfirmed}
                onChange={(event) => setBirthdayConfirmed(event.target.checked)}
                className="mt-1"
              />
              <span>Saya yakin tanggal lahir ini benar dan paham data ini tidak bisa diubah.</span>
            </label>
          ) : null}
        </Panel>

        <Panel icon={Phone} title="Nomor WhatsApp">
          <p className="text-sm leading-6 text-body">
            Nomor ini dipakai untuk bantuan pembayaran, pengingat kelas, dan benefit akun.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[180px_1fr]">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-heading">Kode negara</span>
              <select
                value={country.code}
                onChange={(event) => {
                  const selected = countries.find((item) => item.code === event.target.value) ?? countries[0]
                  setCountry(selected)
                }}
                className="h-12 w-full rounded-xl border border-black/10 bg-white/80 px-3 text-sm text-heading outline-none dark:border-white/10 dark:bg-white/10"
              >
                {countries.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.flag} {item.dial}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-heading">Nomor WhatsApp</span>
              <input
                inputMode="numeric"
                value={phoneDisplay}
                onChange={(event) => setPhoneNational(normalizePhone(event.target.value))}
                placeholder="8123 4567 8901"
                className="h-12 w-full rounded-xl border border-black/10 bg-white/80 px-4 text-sm text-heading outline-none transition focus:border-money-green/40 focus:ring-4 focus:ring-money-green/10 dark:border-white/10 dark:bg-white/10"
              />
            </label>
          </div>
          <p className="mt-3 text-sm text-body">
            Tampilan:{" "}
            <span className="font-semibold text-heading">
              {country.flag} {country.dial} {phoneDisplay || "8123 4567 8901"}
            </span>
          </p>
        </Panel>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={saveProfile}
          disabled={isSaving || !canSaveBirthday}
          className="rounded-xl bg-money-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Menyimpan..." : "Simpan profil"}
        </button>
      </div>
    </div>
  )
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

function Notice({
  tone,
  icon: Icon,
  title,
  children,
}: {
  tone: "info" | "warn" | "success"
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  const toneClass =
    tone === "success"
      ? "border-money-green/20 bg-money-green/10 text-body"
      : tone === "warn"
        ? "border-amber-500/20 bg-amber-50/80 text-amber-900 dark:bg-amber-500/10 dark:text-amber-100"
        : "border-black/10 bg-white/70 text-body dark:border-white/10 dark:bg-white/5"

  return (
    <div className={`mt-4 flex gap-3 rounded-2xl border p-4 text-sm leading-6 ${toneClass}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold text-heading">{title}</p>
        <p className="mt-1">{children}</p>
      </div>
    </div>
  )
}
