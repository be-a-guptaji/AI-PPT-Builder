"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { useSlideStore } from "@/store/useSlideStore"
import { PopoverContent } from "@radix-ui/react-popover"
import { LayoutTemplate } from "lucide-react"
import React, { useState } from "react"
import LayoutChooser from "./tabs/layoutChooser"
import { cn } from "@/lib/utils"

const EditorSidebar = () => {
    const [open, setOpen] = useState(false)
    const { currentTheme } = useSlideStore()

    return (
        <div className="fixed top-1/2 right-2 transform -translate-y-1/2 z-10">
            <div
                className={cn(
                    "rounded-xl border-r-0 border border-background/30 shadow-lg p-2 flex flex-col items-center space-y-4",
                    open && "ring-2 ring-blue-500"
                )}
            >
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size={"icon"}
                            className="size-10 rounded-full cursor-pointer m-0"
                            onClick={() => setOpen(!open)}
                        >
                            <LayoutTemplate className="size-5" />
                            <span className="sr-only">Choose Layout</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="p-0 w-[480px] border-1 rounded-2xl relative right-6"
                    >
                        <LayoutChooser />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default EditorSidebar
