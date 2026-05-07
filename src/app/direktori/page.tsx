import { buildToolsMetadata, ToolsIndexPage } from "@/components/tools/ToolsIndexPage"

export const metadata = buildToolsMetadata("direktori")

export default function Page() {
  return <ToolsIndexPage type="direktori" />
}
