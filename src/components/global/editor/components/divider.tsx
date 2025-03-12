import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import React from "react"

type DividerProps = {
    className: string
}

const Divider = ({ className }: DividerProps) => {
    const { currentTheme } = useSlideStore()

    return (
        <hr
            className={cn("my-4", className)}
            style={{ borderColor: currentTheme.accentColor }}
        />
    )
}

export default Divider
