import React from "react"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface YouTubeEmbedProps {
  /** Full YouTube URL (e.g., https://youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID) */
  youtubeUrl: string
  /** Whether to show a subscribe button overlay */
  showSubscribeOverlay?: boolean
  /** Subscribe link URL (defaults to Duit.co.id YouTube channel) */
  subscribeUrl?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractVideoId(url: string): string | null {
  if (!url) return null

  // Handle youtu.be short URLs
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]

  // Handle full youtube.com URLs
  const fullMatch = url.match(
    /(?:youtube\.com\/watch\?.*v=|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
  )
  if (fullMatch) return fullMatch[1]

  // If it's already just the ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url

  return null
}

// ─── Component ───────────────────────────────────────────────────────────────

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  youtubeUrl,
  showSubscribeOverlay = true,
  subscribeUrl = "https://youtube.com/c/duitcoid?sub_confirmation=1",
  className,
}) => {
  const videoId = extractVideoId(youtubeUrl)

  if (!videoId) {
    return null
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden glass-card",
        className
      )}
    >
      {/* Responsive 16:9 iframe container */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>

      {/* Subscribe overlay */}
      {showSubscribeOverlay && (
        <div className="flex items-center justify-between px-4 py-3 bg-black/5 dark:bg-white/5">
          <p className="text-sm text-body">
            Tonton video lengkap dan subscribe untuk konten eksklusif
          </p>
          <a
            href={subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-money-green hover:text-aureum-gold transition-colors whitespace-nowrap"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Subscribe
          </a>
        </div>
      )}
    </div>
  )
}
