import { LayoutSlides } from "@/lib/types"
import { cn } from "@/lib/utils"
import React from "react"

type LayoutPreviewItemProps = {
    name: string
    Icon: React.FC
    type: string
    isSelected?: boolean
    comopnent: LayoutSlides
    onClick?: () => void
}

const LayoutPreviewItem = ({
    Icon,
    comopnent,
    isSelected,
    name,
    type,
    onClick,
}: LayoutPreviewItemProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center cursor-grab active:cursor-grabbing gap-2 p-2 rounded-lg hover:bg-primary/90 transition-all duration-200",
                "text-center size-full",
                "hover:scale-105 transform",
                isSelected && "ring-2 ring-blue-500"
            )}
        >
            <div className="w-full aspect-video rounded-md border bg-gray-100 dark:bg-gray-700 p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                <Icon />
            </div>
            <span className="text-xs text-gray-500 font-medium">{name}</span>
        </button>
    )
}

export default LayoutPreviewItem
