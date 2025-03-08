"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"

interface HeadingProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  isPreview?: boolean
  styles?: React.CSSProperties
}

const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
    ({ styles, isPreview = false, className, ...props }, ref) => {
      const textAreaRef = useRef<HTMLTextAreaElement>(null)

      useEffect(() => {
        const textArea = textAreaRef.current
        if (textArea && !isPreview) {
          const adjustHeight = () => {
            textArea.style.height = "0"
            textArea.style.height = `${textArea.scrollHeight}px`
          }

          textArea.addEventListener("input", adjustHeight)
          adjustHeight()

          return () => textArea.removeEventListener("input", adjustHeight)
        }
      }, [isPreview])
      const previewClassName = isPreview ? "text-xs" : ""

      return (
        <textarea
          className={cn(
            `w-full bg-transparent font-normal text-gray-900 placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight ${defaultClassName} ${previewClassName}`,
            className
          )}
          style={{
            padding: 0,
            margin: 0,
            color: "inherit",
            boxSizing: "content-box",
            lineHeight: "1.2em",
            minHeight: "1.2em",
            ...styles,
          }}
          ref={(el) => {
            ;(textAreaRef.current as HTMLTextAreaElement | null) = el
            if (typeof ref === "function") {
              ref(el)
            } else if (ref) ref.current = el
          }}
          readOnly={isPreview}
          {...props}
        ></textarea>
      )
    }
  )

  Heading.displayName = displayName

  return Heading
}

const Title = createHeading("Title", "text-5xl")
const Heading1 = createHeading("Heading1", "text-4xl")
const Heading2 = createHeading("Heading2", "text-3xl")
const Heading3 = createHeading("Heading3", "text-2xl")
const Heading4 = createHeading("Heading4", "text-xl")

export { Title, Heading1, Heading2, Heading3, Heading4 }
