import { notFound } from "next/navigation"
import { ToolDetailClient } from "@/components/tools/ToolDetailClient"
import { getToolByTypeAndSlug, getToolsByType } from "@/data/toolsCatalog"

export function generateStaticParams() {
  return getToolsByType("kalkulator").map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolByTypeAndSlug("kalkulator", slug)

  if (!tool) {
    return {}
  }

  return {
    title: tool.title,
    description: tool.shortDescription,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolByTypeAndSlug("kalkulator", slug)

  if (!tool) {
    notFound()
  }

  return <ToolDetailClient tool={tool} />
}
