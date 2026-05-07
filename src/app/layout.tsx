import type { Metadata } from "next"
import { AppShell } from "@/components/shared/AppShell"
import "../index.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://duit.co.id"),
  title: {
    default: "Duit.co.id | Ekosistem Keuangan #1 Indonesia",
    template: "%s | Duit.co.id",
  },
  description:
    "Ekosistem keuangan Indonesia untuk edukasi, tools, academy, dan akses ahli berdasarkan tier finansial.",
  openGraph: {
    title: "Duit.co.id",
    description:
      "Ekosistem keuangan Indonesia untuk membangun kedaulatan finansial.",
    url: "https://duit.co.id",
    siteName: "Duit.co.id",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
