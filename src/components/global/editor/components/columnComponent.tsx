import MasterRecursiveComponent from "@/app/(protected)/presentation/[presentationID]/_components/editor/masterRecursiveComponent"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ContentItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { v4 } from "uuid"

type ColumnComponentProps = {
    content: ContentItem[]
    className?: string
    isPreview?: boolean
    slideId: string
    isEditable?: boolean
    onContentChange: (
        contentID: string,
        newContent: string | string[] | string[][]
    ) => void
}

const ColumnComponent = ({
    content,
    isPreview = false,
    isEditable = true,
    slideId,
    className,
    onContentChange,
}: ColumnComponentProps) => {
    const [columns, setColumns] = useState<ContentItem[]>([])

    const createDefaultColumns = (count: number) => {
        return Array(count)
            .fill(null)
            .map(() => ({
                id: v4(),
                type: "paragraph" as const,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
            }))
    }

    useEffect(() => {
        if (!content || content.length === 0) {
            const defaultColumns = createDefaultColumns(2)
            setColumns(defaultColumns)
        } else {
            setColumns(content)
        }
    }, [content])

    return (
        <div className="relative size-full">
            <ResizablePanelGroup
                direction="horizontal"
                className={cn(
                    "size-full flex",
                    !isEditable && "!border-0",
                    className
                )}
            >
                {columns?.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ResizablePanel
                            minSize={20}
                            defaultSize={100 / (columns?.length || 1)}
                        >
                            <div className={cn("size-full", item.className)}>
                                <MasterRecursiveComponent
                                    content={item}
                                    isPreview={isPreview}
                                    isEditable={isEditable}
                                    slideId={slideId}
                                    index={index}
                                    onContentChange={onContentChange}
                                />
                            </div>
                        </ResizablePanel>
                        {index < (columns?.length || 0) - 1 && isEditable && (
                            <ResizableHandle withHandle={!isPreview} />
                        )}
                    </React.Fragment>
                ))}
            </ResizablePanelGroup>
        </div>
    )
}

export default ColumnComponent
