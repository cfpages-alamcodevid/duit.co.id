import React, { useEffect, useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface TOCItem {
  id: string
  label: string
  level: number // 2 = h2, 3 = h3, 4 = h4
}

interface TableOfContentsProps {
  /** The HTML element containing the article content (to extract headings) */
  contentRef?: React.RefObject<HTMLElement | null>
  /** Pre-computed TOC items (if provided, skips auto-extraction) */
  items?: TOCItem[]
  /** Title displayed above the TOC */
  title?: string
  /** Whether the TOC is collapsible on mobile */
  collapsible?: boolean
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractHeadings(container: HTMLElement): TOCItem[] {
  const headings = container.querySelectorAll("h2, h3, h4")
  const items: TOCItem[] = []

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1), 10)
    // Use existing id or generate one
    let id = heading.id
    if (!id) {
      id = heading.textContent
        ?.toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50) || `heading-${items.length}`
      heading.id = id
    }
    items.push({
      id,
      label: heading.textContent?.trim() || "",
      level,
    })
  })

  return items
}

// ─── Component ───────────────────────────────────────────────────────────────

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  contentRef,
  items: providedItems,
  title = "Daftar Isi",
  collapsible = true,
  className,
}) => {
  const [items, setItems] = useState<TOCItem[]>(providedItems || [])
  const [activeId, setActiveId] = useState<string>("")
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Extract headings from content if not provided
  useEffect(() => {
    if (providedItems) {
      setItems(providedItems)
      return
    }

    if (!contentRef?.current) return

    const extracted = extractHeadings(contentRef.current)
    setItems(extracted)

    // Set up IntersectionObserver for scroll spy
    const headingElements = contentRef.current.querySelectorAll(
      "h2[id], h3[id], h4[id]"
    )

    if (headingElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    )

    headingElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [contentRef, providedItems])

  // Smooth scroll to section
  const handleClick = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      // On mobile, collapse after clicking
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    },
    []
  )

  if (items.length === 0) return null

  return (
    <div
      className={cn(
        "lg:sticky lg:top-24",
        className
      )}
    >
      <div className="glass-card rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-aureum-gold" />
            <h3 className="text-lg font-bold text-heading">{title}</h3>
          </div>
          {collapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label={isCollapsed ? "Show table of contents" : "Hide table of contents"}
            >
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-body" />
              ) : (
                <ChevronUp className="w-4 h-4 text-body" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className={cn(
            "space-y-1 overflow-hidden transition-all duration-300",
            collapsible && isCollapsed ? "max-h-0 lg:max-h-none" : "max-h-[600px] lg:max-h-none"
          )}
          aria-label="Table of contents"
        >
          {items.map((item) => {
            const isActive = activeId === item.id
            const paddingLeft = item.level === 3 ? "pl-4" : item.level === 4 ? "pl-8" : ""

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(item.id)
                }}
                className={cn(
                  "block py-2 text-sm transition-colors rounded-lg px-3 -mx-3",
                  paddingLeft,
                  isActive
                    ? "text-aureum-gold font-semibold bg-aureum-gold/10"
                    : "text-body hover:text-heading hover:bg-black/5 dark:hover:bg-white/5"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export type { TOCItem }
