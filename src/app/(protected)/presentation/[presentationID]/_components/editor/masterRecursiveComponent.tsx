import { ContentItem } from "@/lib/types"
import { motion } from "framer-motion"
import React from "react"

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
  ({ content, index, slideId, onContentChange }) => {
    switch (content.type) {
      case "heading1":
        return <motion.div className="size-full"></motion.div>
    }
  }
)
