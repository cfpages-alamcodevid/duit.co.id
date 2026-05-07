import { buildToolsMetadata, ToolsIndexPage } from "@/components/tools/ToolsIndexPage"

export const metadata = buildToolsMetadata("resources")

export default function Page() {
  return <ToolsIndexPage type="resources" />
}
