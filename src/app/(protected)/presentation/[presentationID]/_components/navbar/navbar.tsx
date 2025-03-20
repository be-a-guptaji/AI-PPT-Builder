"use client"

import { Button } from "@/components/ui/button"
import { useSlideStore } from "@/store/useSlideStore"
import { Home, Play, Share } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { toast } from "sonner"
import PresentationMode from "./presentationMode"

type NavbarProps = {
    presentationID: string
}

const Navbar = ({ presentationID }: NavbarProps) => {
    const [isPresentationMode, setIsPresentationMode] = useState(false)
    const { currentTheme, project } = useSlideStore()

    const handelCopy = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/share/${presentationID}`
        )

        toast.success("Link Copied", {
            description: "Link copied to clipboard",
        })
    }

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 boarder-b"
            style={{
                backgroundColor:
                    currentTheme.navbarColor || currentTheme.backgroundColor,
                color: currentTheme.accentColor,
            }}
        >
            <Link href={`/dashboard`} passHref>
                <Button
                    variant={"outline"}
                    className="flex items-center gap-2 cursor-pointer"
                    style={{
                        backgroundColor: currentTheme.backgroundColor,
                    }}
                >
                    <Home className="size-4" />
                    <span className="hidden sm:inline">Return Home</span>
                </Button>
            </Link>

            <Link
                href={`/presentation/template-market`}
                className="text-lg font-semibold hidden sm:block"
            >
                {project?.title}
            </Link>

            <div className="flex items-center gap-4">
                <Button
                    style={{ backgroundColor: currentTheme.backgroundColor }}
                    variant={"outline"}
                    className="cursor-pointer"
                    onClick={handelCopy}
                >
                    <Share className="size-4" />
                </Button>
                {/* <SellTemplate/> */}
                <Button
                    variant={"default"}
                    className="flex items-center gap-2 cursor-pointer justify-center"
                    onClick={() => setIsPresentationMode(true)}
                >
                    <Play className="size-4" fill="black" />

                    <span className="hidden sm:inline">Present</span>
                </Button>
            </div>

            {isPresentationMode && (
                <PresentationMode
                    onClose={() => setIsPresentationMode(false)}
                />
            )}
        </nav>
    )
}

export default Navbar
