declare module "react-markdown" {
  import { ComponentType, ReactNode } from "react"
  interface ReactMarkdownProps {
    children: string
    remarkPlugins?: unknown[]
    rehypePlugins?: unknown[]
    className?: string
    [key: string]: unknown
  }
  const ReactMarkdown: ComponentType<ReactMarkdownProps>
  export default ReactMarkdown
}

declare module "remark-gfm" {
  const remarkGfm: unknown
  export default remarkGfm
}
