"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { useSlideStore } from "@/store/useSlideStore"
import { PopoverContent } from "@radix-ui/react-popover"
import { LayoutTemplate, Palette, Type } from "lucide-react"
import React, { useState } from "react"
import LayoutChooser from "./tabs/layoutChooser"
import { cn } from "@/lib/utils"
import { component } from "@/lib/constant"
import ComponentCard from "./tabs/components-tabs/componentPreview"
import ThemeChooser from "./tabs/themeChooser"
import { ScrollArea } from "@/components/ui/scroll-area"

const EditorSidebar = () => {
    const [open, setOpen] = useState(false)
    const { currentTheme } = useSlideStore()

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation()

        const target = e.target as HTMLElement
        const state = target.getAttribute("data-state")

        if (state === "open") {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

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
                            onClick={(e) => {
                                handleOpen(e)
                            }}
                        >
                            <LayoutTemplate className="size-5" />
                            <span className="sr-only">Choose Layout</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="p-0 w-[480px] border-1 rounded-2xl relative right-6"
                        style={{
                            backgroundColor: currentTheme.backgroundColor,
                            color: currentTheme.fontColor,
                        }}
                    >
                        <LayoutChooser />
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size={"icon"}
                            className="size-10 rounded-full cursor-pointer m-0"
                            onClick={(e) => {
                                handleOpen(e)
                            }}
                        >
                            <Type className="size-5" />
                            <span className="sr-only">Choose Layout</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="p-0 w-[480px] border-1 rounded-2xl relative right-6"
                        style={{
                            backgroundColor: currentTheme.backgroundColor,
                            color: currentTheme.fontColor,
                        }}
                    >
                        <ScrollArea className="h-[400px]">
                            <div className="p-4 flex flex-col space-y-6">
                                {component.map((group, index) => (
                                    <div key={index} className="space-y-2">
                                        <h3 className="text-sm font-medium text-muted-foreground px-1">
                                            {group.name}
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {group.components.map(
                                                (item, index) => (
                                                    <ComponentCard
                                                        key={index}
                                                        item={item}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size={"icon"}
                            className="size-10 rounded-full cursor-pointer m-0"
                            onClick={(e) => {
                                handleOpen(e)
                            }}
                        >
                            <Palette className="size-5" />
                            <span className="sr-only">Change Style</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        align="center"
                        className="p-0 w-80 border-1 rounded-2xl relative right-6"
                        style={{
                            backgroundColor: currentTheme.backgroundColor,
                            color: currentTheme.fontColor,
                        }}
                    >
                        <ThemeChooser />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default EditorSidebar
