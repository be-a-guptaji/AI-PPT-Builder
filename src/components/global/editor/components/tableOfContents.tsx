import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import React from "react"

type TableOfContentsProps = {
    items: string[]
    className?: string
}

const TableOfContents = ({ items, className }: TableOfContentsProps) => {
    const { currentTheme } = useSlideStore()

    return (
        <nav
            className={cn("space-y-2", className)}
            style={{ color: currentTheme.fontColor }}
        >
            {items.map((item, index) => (
                <div key={index} className="cursor-pointer hover:underline">
                    {item}
                </div>
            ))}
        </nav>
    )
}

export default TableOfContents
