import { buildToolsMetadata, ToolsIndexPage } from "@/components/tools/ToolsIndexPage"

export const metadata = buildToolsMetadata("template")

export default function Page() {
  return <ToolsIndexPage type="template" />
}
