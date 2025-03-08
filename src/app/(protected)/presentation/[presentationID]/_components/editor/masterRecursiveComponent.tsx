"use client"

import { Heading1 } from "@/components/global/editor/components/headings"
import { ContentItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React, { useCallback } from "react"
import DropZone from "./dropZone"

type MasterRecursiveComponentProps = {
  content: ContentItem
  isPreview?: boolean
  isEditable?: boolean
  slideId: string
  index?: number
  onContentChange: (
    contentID: string,
    newContent: string | string[] | string[][]
  ) => void
}

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, index, slideId, isEditable, isPreview, onContentChange }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value)
      },
      [content.id, onContentChange]
    )

    const commonProps = {
      placeHolder: content.placeholder,
      vlaue: content.content as string,
      isPreview: isPreview,
      onChange: handleChange,
    }

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }

    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="size-full">
            <Heading1 {...commonProps} />
          </motion.div>
        )

      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn("sizefull flex flex-col", content.className)}
            >
              {content.content.length > 0
                ? (content.content as ContentItem[]).map(
                    (subItem: ContentItem, subIndex: number) => (
                      <React.Fragment key={subItem.id || `item-${subIndex}`}>
                        {!isPreview &&
                          !subItem.restrictedToDrop &&
                          subIndex === 0 &&
                          isEditable && <DropZone />}
                      </React.Fragment>
                    )
                  )
                : ""}
            </motion.div>
          )
        }
        return null

      default:
        return <h1>Nothing</h1>
    }
  }
)

ContentRenderer.displayName = "ContentRenderer"

const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      slideId,
      index,
      isEditable = true,
      isPreview = false,
      onContentChange,
    }) => {
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            slideId={slideId}
            index={index}
            isEditable={isEditable}
            isPreview={isPreview}
            onContentChange={onContentChange}
          />
        )
      }

      return (
        <React.Fragment>
          <ContentRenderer
            content={content}
            slideId={slideId}
            index={index}
            isEditable={isEditable}
            isPreview={isPreview}
            onContentChange={onContentChange}
          />
        </React.Fragment>
      )
    }
  )

MasterRecursiveComponent.displayName = "MasterRecursiveComponent"

export default MasterRecursiveComponent
