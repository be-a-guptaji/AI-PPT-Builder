"use client"

import { Button } from "@/components/ui/button"
import { useSlideStore } from "@/store/useSlideStore"
import { Forward, Home, Play } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import PresentationMode from "./presentationMode"
import { cn } from "@/lib/utils"
import { toggleSellable } from "@/actions/projects"
import { useRouter } from "next/navigation"

type NavbarProps = {
    presentationID: string
}

const Navbar = ({ presentationID }: NavbarProps) => {
    const router = useRouter()
    const [isPresentationMode, setIsPresentationMode] = useState(false)
    const { currentTheme, project } = useSlideStore()
    const [isSellable, setIsSellable] = useState(project?.isSellable || false)

    const handleCopy = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/share/${presentationID}`
        )

        toast.success("Link Copied", {
            description: "Link copied to clipboard",
        })
    }

    const toggleSellableButton = () => {
        setIsSellable(!isSellable)
    }

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (isSellable !== project?.isSellable) {
                await toggleSellable(presentationID, isSellable)
                router.refresh()
            }
        }, 3000)

        return () => {
            clearTimeout(handler)
        }
    }, [isSellable])

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
                    className="bg-white border w-16 h-8 rounded-3xl cursor-pointer hover:bg-gray-200 p-2 relative"
                    onClick={toggleSellableButton}
                    title="Sellable"
                >
                    <div
                        className={cn(
                            "h-6 aspect-square bg-blue-600 rounded-full absolute transition-transform duration-300",
                            isSellable ? "translate-x-4" : "-translate-x-4"
                        )}
                    />
                </Button>

                <Button
                    style={{ backgroundColor: currentTheme.backgroundColor }}
                    variant={"outline"}
                    className="cursor-pointer"
                    onClick={handleCopy}
                >
                    <Forward className="size-4" />
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
