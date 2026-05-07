import { buildToolsMetadata, ToolsIndexPage } from "@/components/tools/ToolsIndexPage"

export const metadata = buildToolsMetadata("kalkulator")

export default function Page() {
  return <ToolsIndexPage type="kalkulator" />
}
