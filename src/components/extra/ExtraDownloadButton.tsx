"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import { useUser } from "@/components/auth/DuitClerkProvider"
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  LockKeyhole,
  Sparkles,
  X,
} from "lucide-react"
import { CheckoutAuthTabs } from "@/components/checkout/CourseCheckoutClient"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { getExtraByArticleSlug, type ExtraContent } from "@/utils/extras"

interface ExtraDownloadButtonProps {
  articleSlug: string
  articleTitle: string
}

export function ExtraDownloadButton({ articleSlug, articleTitle }: ExtraDownloadButtonProps) {
  const [extra, setExtra] = useState<ExtraContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let active = true

    const loadExtra = async () => {
      setIsLoading(true)
      const found = await getExtraByArticleSlug(articleSlug)
      if (!active) return
      setExtra(found)
      setIsLoading(false)
    }

    void loadExtra()

    return () => {
      active = false
    }
  }, [articleSlug])

  if (isLoading || !extra) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="my-10 flex w-full flex-col gap-4 rounded-2xl border border-money-green/20 bg-money-green/10 p-5 text-left transition hover:border-money-green/40 hover:bg-money-green/15 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-money-green text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-money-green">Bonus pelengkap artikel</span>
            <span className="mt-1 block text-xl font-bold tracking-tight text-heading">{extra.title}</span>
            <span className="mt-2 block text-sm leading-6 text-body">
              Login untuk menyimpan bonus ini sebagai PDF.
            </span>
          </span>
        </span>
        <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-money-green px-4 py-3 text-sm font-semibold text-white">
          <Download className="h-4 w-4" />
          {extra.download_label || "Download bonus PDF"}
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>

      <ExtraDownloadModal
        extra={extra}
        articleTitle={articleTitle}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

function ExtraDownloadModal({
  extra,
  articleTitle,
  open,
  onClose,
}: {
  extra: ExtraContent
  articleTitle: string
  open: boolean
  onClose: () => void
}) {
  const { isLoaded, isSignedIn, user } = useUser()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const printableRef = useRef<HTMLDivElement>(null)
  const userEmail = user?.primaryEmailAddress?.emailAddress || ""

  useEffect(() => {
    setMounted(true)
  }, [])

  const returnPath = useMemo(() => pathname || `/artikel/${extra.article_slug}`, [extra.article_slug, pathname])

  if (!open || !mounted) return null

  const handleDownload = () => {
    const printable = printableRef.current
    if (!printable) return

    const printWindow = window.open("", "_blank", "width=960,height=1200")
    if (!printWindow) return

    printWindow.document.write(buildPrintableHtml({
      title: extra.title,
      articleTitle,
      body: printable.innerHTML,
      userEmail,
      updatedAt: extra.updated_at,
    }))
    printWindow.document.close()
    printWindow.focus()
    window.setTimeout(() => {
      printWindow.print()
    }, 350)
  }

  return createPortal(
    <div className="fixed inset-0 z-[110] grid place-items-center bg-black/45 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[calc(100vh-48px)] w-full max-w-5xl overflow-y-auto rounded-3xl border border-black/10 bg-white p-5 shadow-[0_28px_80px_rgba(0,0,0,0.24)] dark:border-white/10 dark:bg-[#06110f]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-money-green">
              <FileText className="h-4 w-4" />
              Bonus PDF Duit.co.id
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-heading">{extra.title}</h2>
            <p className="mt-2 text-sm leading-6 text-body">
              Pelengkap untuk artikel: <span className="font-semibold text-heading">{articleTitle}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/10 text-body transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isLoaded ? (
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 text-center dark:border-white/10 dark:bg-white/5">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-money-green" />
            <p className="mt-3 text-sm font-semibold text-body">Memeriksa sesi login...</p>
          </div>
        ) : null}

        {isLoaded && !isSignedIn ? (
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-money-green/15 bg-money-green/10 p-5">
              <LockKeyhole className="h-8 w-8 text-money-green" />
              <h3 className="mt-4 text-xl font-bold text-heading">Login untuk download bonus.</h3>
              <p className="mt-3 text-sm leading-6 text-body">
                Bonus ini dibuat sebagai bahan praktik. Setelah login, Anda bisa membuka preview dan menyimpannya sebagai PDF dari browser.
              </p>
            </div>
            <CheckoutAuthTabs returnPath={returnPath} />
          </div>
        ) : null}

        {isLoaded && isSignedIn ? (
          <div className="space-y-5">
            <div className="flex flex-col gap-3 rounded-2xl border border-money-green/15 bg-money-green/10 p-4 text-sm leading-6 text-body sm:flex-row sm:items-center sm:justify-between">
              <span>
                <CheckCircle2 className="mr-2 inline h-4 w-4 text-money-green" />
                Anda masuk sebagai <span className="font-semibold text-heading">{userEmail || "member Duit.co.id"}</span>.
              </span>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-money-green px-4 py-3 text-sm font-semibold text-white transition hover:bg-money-green-dark"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>

            <div ref={printableRef} className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <MarkdownRenderer content={extra.content} className="extra-pdf-preview" />
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

function buildPrintableHtml({
  title,
  articleTitle,
  body,
  userEmail,
  updatedAt,
}: {
  title: string
  articleTitle: string
  body: string
  userEmail: string
  updatedAt: string
}) {
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: A4; margin: 18mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: #17211f;
      background: #ffffff;
      font-family: Inter, Manrope, Arial, sans-serif;
      line-height: 1.55;
    }
    .cover {
      border: 1px solid rgba(0,77,64,.18);
      background: linear-gradient(135deg, rgba(0,77,64,.09), rgba(212,175,55,.10));
      border-radius: 18px;
      padding: 22px;
      margin-bottom: 22px;
    }
    .brand { color: #004d40; font-size: 12px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
    h1 { margin: 8px 0 10px; font-size: 30px; line-height: 1.15; letter-spacing: -0.02em; }
    .meta { color: #5d6c66; font-size: 12px; }
    h2 { margin: 26px 0 10px; color: #004d40; font-size: 21px; letter-spacing: -0.01em; }
    h3 { margin: 20px 0 8px; font-size: 17px; }
    p { margin: 0 0 12px; }
    ul, ol { padding-left: 22px; }
    li { margin-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 12px; }
    th, td { border: 1px solid #dfe7e3; padding: 8px; vertical-align: top; }
    th { background: #edf7f3; color: #10211d; text-align: left; }
    blockquote {
      border-left: 4px solid #d4af37;
      background: #fff9e7;
      margin: 16px 0;
      padding: 10px 14px;
      border-radius: 0 10px 10px 0;
    }
    code { background: #edf7f3; padding: 1px 4px; border-radius: 4px; }
    .footer {
      margin-top: 28px;
      border-top: 1px solid #dfe7e3;
      padding-top: 12px;
      color: #6b7773;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <section class="cover">
    <div class="brand">Duit.co.id Extra</div>
    <h1>${escapeHtml(title)}</h1>
    <div class="meta">Pelengkap artikel: ${escapeHtml(articleTitle)}</div>
    <div class="meta">Member: ${escapeHtml(userEmail || "Duit.co.id")} · Update: ${escapeHtml(updatedAt || "-")}</div>
  </section>
  <main>${body}</main>
  <section class="footer">Dokumen ini dibuat dari bonus Markdown Duit.co.id dan dirender menjadi PDF di browser Anda.</section>
</body>
</html>`
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
