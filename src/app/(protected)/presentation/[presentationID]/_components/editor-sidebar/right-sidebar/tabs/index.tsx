"use client"

import { useSlideStore } from "@/store/useSlideStore"
import React from "react"

type EditorSidebarrops = {}

const EditorSidebar = ({}: EditorSidebarProps) => {
    const { currentTheme } = useSlideStore()

    return (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
            <div className=""></div>
        </div>
    )
}

export default EditorSidebar
