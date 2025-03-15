"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { useSlideStore } from "@/store/useSlideStore"
import { PopoverContent } from "@radix-ui/react-popover"
import { LayoutTemplate } from "lucide-react"
import React from "react"
import LayoutChooser from "./tabs/layoutChooser"

type EditorSidebarrops = {}

const EditorSidebar = ({}: EditorSidebarProps) => {
    const { currentTheme } = useSlideStore()

    return (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
            <div className="rounded-xl border-r-0 border border-background/30 shadow-lg p-2 flex flex-col items-center space-y-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size={"icon"}
                            className="size-10 rounded-full cursor-pointer"
                        >
                            <LayoutTemplate className="size-5" />
                            <span className="sr-only">Choose Layout</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="p-0 w-[480px]"
                    >
                        <LayoutChooser />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default EditorSidebar
