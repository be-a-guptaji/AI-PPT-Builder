"use client"

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/headings"
import { ContentItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React, { useCallback } from "react"
import DropZone from "./dropZone"
import Paragraph from "@/components/global/editor/components/paragraph"
import TableComponet from "@/components/global/editor/components/tableComponet"
import ColumnComponent from "@/components/global/editor/components/columnComponent"
import CustomImage from "@/components/global/editor/components/imageComponent"
import BlockQuote from "@/components/global/editor/components/blockQuote"
import NumberedList, { BulletList } from "@/components/global/editor/components/listComponent"

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
  ({ content, slideId, isEditable, isPreview, onContentChange }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value)
      },
      [content.id, onContentChange]
    )

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
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
          <motion.div className="size-full" {...animationProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        )

      case "heading2":
        return (
          <motion.div className="size-full" {...animationProps}>
            <Heading2 {...commonProps} />
          </motion.div>
        )

      case "heading3":
        return (
          <motion.div className="size-full" {...animationProps}>
            <Heading3 {...commonProps} />
          </motion.div>
        )

      case "heading4":
        return (
          <motion.div className="size-full" {...animationProps}>
            <Heading4 {...commonProps} />
          </motion.div>
        )

      case "title":
        return (
          <motion.div className="size-full" {...animationProps}>
            <Title {...commonProps} />
          </motion.div>
        )

      case "paragraph":
        return (
          <motion.div className="size-full" {...animationProps}>
            <Paragraph {...commonProps} />
          </motion.div>
        )

      case "table":
        return (
          <motion.div className="size-full" {...animationProps}>
            <TableComponet
              content={content.content as string[][]}
              onChange={(newContent) => {
                onContentChange(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }}
              initialColumnSize={content.initialColumns}
              initialRowSize={content.initialRows}
              isEditable={isEditable}
              isPreview={isPreview}
            />
          </motion.div>
        )

      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div className="size-full" {...animationProps}>
              <ColumnComponent
                content={content.content as ContentItem[]}
                className={content.className}
                isPreview={isPreview}
                isEditable={isEditable}
                slideId={slideId}
                onContentChange={onContentChange}
              />
            </motion.div>
          )
        }
        return null

      case "image":
        return (
          <motion.div className="size-full" {...animationProps}>
            <CustomImage
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isEditable={isEditable}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
            />
          </motion.div>
        )

      case "blockquote":
        return (
          <motion.div
            {...animationProps}
            className={cn("sizefull flex flex-col", content.className)}
          >
            <BlockQuote>
              <Paragraph {...commonProps} />
            </BlockQuote>
          </motion.div>
        )

      case "numberedList":
        return (
          <motion.div {...animationProps} className="sizefull">
            <NumberedList
              items={content.content as string[]}
              className={content.className}
              isEditable={isEditable}
              onChange={(newItems: string[]) =>
                onContentChange(content.id, newItems)
              }
            />
          </motion.div>
        )

      case "bulletList":
        return (
          <motion.div {...animationProps} className="sizefull">
            <BulletList
              items={content.content as string[]}
              className={content.className}
              isEditable={isEditable}
              onChange={(newItems: string[]) =>
                onContentChange(content.id, newItems)
              }
            />
          </motion.div>
        )

      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn("sizefull flex flex-col", content.className)}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {!isPreview &&
                        !subItem.restrictedToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentID={content.id}
                            slideID={slideId}
                          />
                        )}
                      <MasterRecursiveComponent
                        content={subItem}
                        slideId={slideId}
                        index={subIndex}
                        isEditable={isEditable}
                        isPreview={isPreview}
                        onContentChange={onContentChange}
                      />
                      {!isPreview &&
                        !subItem.restrictedToDrop &&
                        isEditable && (
                          <DropZone
                            index={subIndex + 1}
                            parentID={content.id}
                            slideID={slideId}
                          />
                        )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone index={0} parentID={content.id} slideID={slideId} />
              ) : null}
            </motion.div>
          )
        }
        return null

      default:
        return null
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
