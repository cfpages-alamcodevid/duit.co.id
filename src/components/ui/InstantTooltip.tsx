"use client"

import { type ReactNode, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface InstantTooltipProps {
  children: ReactNode
  content: ReactNode
}

export function InstantTooltip({ children, content }: InstantTooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const show = () => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return

    setPosition({
      top: Math.max(12, rect.top - 10),
      left: rect.left + rect.width / 2,
    })
    setOpen(true)
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={show}
        onMouseLeave={() => setOpen(false)}
        onFocus={show}
        onBlur={() => setOpen(false)}
      >
        {children}
      </span>
      {open
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[9999] max-w-[280px] -translate-x-1/2 -translate-y-full rounded-xl border border-black/10 bg-white/95 px-3 py-2 text-xs font-medium leading-5 text-slate-700 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/95 dark:text-slate-200"
              style={{ top: position.top, left: position.left }}
              role="tooltip"
            >
              {content}
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
