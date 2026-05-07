import fs from "node:fs"
import path from "node:path"
import { ArticleDynamicRoute } from "./ArticleDynamicRoute"

const VALID_TIERS = [
  "tier-0-survival",
  "tier-1-hustler",
  "tier-2-scaler",
  "tier-3-asset-builder",
  "tier-4-legacy",
]

function getArticleSlugs() {
  const root = path.join(process.cwd(), "artikel")
  const slugs = new Set<string>(VALID_TIERS)

  if (!fs.existsSync(root)) {
    return Array.from(slugs)
  }

  for (const tierDir of fs.readdirSync(root)) {
    const fullTierDir = path.join(root, tierDir)
    if (!fs.statSync(fullTierDir).isDirectory()) continue

    for (const filename of fs.readdirSync(fullTierDir)) {
      if (!filename.endsWith(".md")) continue
      slugs.add(filename.replace(/\.md$/, ""))
    }
  }

  return Array.from(slugs)
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ArticleDynamicRoute slug={slug} />
}
