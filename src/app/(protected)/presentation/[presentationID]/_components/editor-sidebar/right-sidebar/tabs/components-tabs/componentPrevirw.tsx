import { ContentItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import React from "react"
import { useDrag } from "react-dnd"

type ComponentItemProps = {
    type: string
    componentType: string
    name: string
    icon: string
    component: ContentItem
}

const ComponentCard = ({ item }: { item: ComponentItemProps }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "CONTENT_ITEM",
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    console.log(isDragging)

    return (
        <div
            ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
            className={cn(
                "border rounded-lg",
                isDragging ? "opacity-50" : "opacity-100"
            )}
            style={{
                backgroundColor: "#f9f9f9",
            }}
        >
            <button
                className={cn(
                    "flex flex-col items-center cursor-grab active:cursor-grabbing gap-2 p-2 rounded-lg hover:bg-primary/90 transition-all duration-200",
                    "text-center w-full",
                    "hover:scale-105 transform"
                )}
            >
                <div className="w-full aspect-video rounded-md border bg-gray-100 dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col items-center justify-center shadow-gray-600 gap-2 shadow-sm hover:shadow-lg transition-shadow duration-200 size-full rounded-md">
                        <span className="text-2xl text-primary">
                            {item.icon}
                        </span>
                    </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                    {item.name}
                </span>
            </button>
        </div>
    )
}

export default ComponentCard
