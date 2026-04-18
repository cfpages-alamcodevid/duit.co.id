import React, { useMemo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed"

// ─── Types ───────────────────────────────────────────────────────────────────

interface MarkdownRendererProps {
  /** The raw Markdown string to render */
  content?: string
  /** Additional CSS classes for the prose wrapper */
  className?: string
  /** YouTube URL to embed (optional) */
  youtubeUrl?: string
  /** Position of the YouTube embed: top, middle, bottom, inline */
  youtubePosition?: "top" | "middle" | "bottom" | "inline"
}

// ─── Custom YouTube Shortcode Detector ──────────────────────────────────────

/**
 * Detects {youtube}...{/youtube} patterns in content and replaces them
 * with a special marker that we can render as a YouTubeEmbed component.
 */
function processYouTubeShortcodes(content: string): {
  processed: string
  urls: string[]
} {
  const urls: string[] = []
  
  // Guard against undefined or null content
  if (!content) {
    return { processed: "", urls: [] }
  }
  
  const processed = content.replace(
    /\{youtube\}(.*?)\{\/youtube\}/g,
    (_match, url: string) => {
      urls.push(url.trim())
      return `\n\n<!-- YOUTUBE_EMBED:${url.trim()} -->\n\n`
    }
  )
  return { processed, urls }
}

// ─── Component ───────────────────────────────────────────────────────────────

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
  youtubeUrl,
  youtubePosition = "top",
}) => {
  // Guard against undefined or null content
  const safeContent = content || ""
  
  // If no content is provided, show a fallback message
  if (!content) {
    return (
      <div className={cn("p-8 text-center", className)}>
        <p className="text-body italic">
          Konten artikel sedang dimuat atau tidak tersedia.
        </p>
      </div>
    )
  }
  
  const { processed: processedContent, urls: youtubeUrls } = useMemo(
    () => processYouTubeShortcodes(safeContent),
    [safeContent]
  )

  // Split content by YouTube embed markers
  const parts = useMemo(() => {
    return processedContent.split(/<!-- YOUTUBE_EMBED:(.*?) -->/g)
  }, [processedContent])

  const renderContent = () => {
    // If youtubeUrl is provided and position is not inline, handle it separately
    if (youtubeUrl && youtubePosition !== "inline") {
      return (
        <>
          {youtubePosition === "top" && (
            <YouTubeEmbed youtubeUrl={youtubeUrl} className="mb-8" />
          )}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {processedContent}
          </ReactMarkdown>
          {youtubePosition === "bottom" && (
            <YouTubeEmbed youtubeUrl={youtubeUrl} className="mt-8" />
          )}
        </>
      )
    }

    // For inline or shortcode-based YouTube embeds, interleave them
    const elements: React.ReactNode[] = []
    let youtubeIndex = 0

    parts.forEach((part, index) => {
      if (index % 2 === 1) {
        // This is a YouTube URL from shortcode
        const url = part
        elements.push(
          <YouTubeEmbed key={`yt-${index}`} youtubeUrl={url} className="my-8" />
        )
      } else {
        // This is regular markdown content
        if (part.trim()) {
          elements.push(
            <ReactMarkdown
              key={`md-${index}`}
              remarkPlugins={[remarkGfm]}
            >
              {part}
            </ReactMarkdown>
          )
        }
      }
    })

    return elements
  }

  return (
    <div
      className={cn(
        "prose prose-lg prose-gray max-w-none",
        "prose-headings:font-bold prose-headings:text-heading prose-headings:tracking-tight",
        "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-aureum-gold dark:prose-h2:text-aureum-gold",
        "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-heading",
        "prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2 prose-h4:text-heading",
        "prose-p:text-body prose-p:leading-relaxed prose-p:mb-6",
        "prose-a:text-money-green prose-a:no-underline hover:prose-a:underline prose-a:font-medium",
        "prose-strong:text-heading prose-strong:font-semibold",
        "prose-em:text-body prose-em:italic",
        "prose-ul:text-body prose-ol:text-body prose-li:text-body",
        "prose-li:marker:text-money-green",
        "prose-blockquote:border-l-4 prose-blockquote:border-aureum-gold/40 prose-blockquote:bg-aureum-gold/5 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-body",
        "prose-code:bg-black/5 prose-code:dark:bg-white/10 prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-money-green prose-code:dark:text-aureum-gold",
        "prose-pre:bg-black/5 prose-pre:dark:bg-white/5 prose-pre:rounded-xl prose-pre:p-4 prose-pre:border prose-pre:border-white/10",
        "prose-table:border-collapse prose-table:w-full prose-table:my-8",
        "prose-thead:bg-money-green/10 prose-thead:text-heading",
        "prose-th:border prose-th:border-white/10 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold",
        "prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-3 prose-td:text-body",
        "prose-hr:border-white/10 prose-hr:my-10",
        "prose-img:rounded-2xl prose-img:shadow-lg",
        "dark:prose-invert",
        "dark:prose-blockquote:border-l-4 dark:prose-blockquote:border-aureum-gold/30 dark:prose-blockquote:bg-aureum-gold/5",
        "dark:prose-code:bg-white/10",
        "dark:prose-pre:bg-white/5",
        "dark:prose-thead:bg-money-green/10",
        "dark:prose-td:border-white/10",
        "dark:prose-th:border-white/10",
        className
      )}
    >
      {renderContent()}
    </div>
  )
}
