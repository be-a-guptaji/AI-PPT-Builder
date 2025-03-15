"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { layouts } from "@/lib/constant"
import { Layout } from "@/lib/types"
import { useSlideStore } from "@/store/useSlideStore"
import React from "react"

export const DraggableLayoutItem = ({
    name,
    icon,
    type,
    component,
    layoutType,
}: Layout) => {
    return <></>
}

const LayoutChooser = () => {
    const { currentTheme } = useSlideStore()

    return (
        <ScrollArea
            className="h-[400px] rounded-2xl"
            style={{ backgroundColor: currentTheme.backgroundColor }}
        >
            <div className="p-4">
                {layouts.map((group, index) => (
                    <div key={group.name || index} className="mb-6">
                        <h3 className="text-sm font-medium mb-3">
                            {group.name}
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {group.layouts.map((layout, index) => (
                                <DraggableLayoutItem
                                    key={layout.layoutType || index}
                                    {...layout}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}

export default LayoutChooser
