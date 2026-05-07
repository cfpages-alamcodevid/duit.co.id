import { buildToolsMetadata, ToolsIndexPage } from "@/components/tools/ToolsIndexPage"

export const metadata = buildToolsMetadata("ceklist")

export default function Page() {
  return <ToolsIndexPage type="ceklist" />
}
