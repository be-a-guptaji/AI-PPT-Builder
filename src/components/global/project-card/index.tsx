"use client"

import { itemVatiants, themes } from "@/lib/constant"
import { useSlideStore } from "@/store/useSlideStore"
import { JsonValue } from "@prisma/client/runtime/library"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import ThumbnailPreview from "./thumbnailPreview"
import { timeAgo } from "@/lib/utils"
import AlertDialogBox from "../alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { deleteProject, recoverProject } from "@/actions/projects"

type ProjectCardProps = {
    projectId: string
    title: string
    createdAt: string
    isDeleted: boolean
    slideData: JsonValue
    themeName: string
}

const ProjectCard = ({
    projectId,
    title,
    createdAt,
    isDeleted,
    slideData,
    themeName,
}: ProjectCardProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { setSlides } = useSlideStore()

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slideData)))
        router.push(`/presentation/${projectId}`)
    }

    const currentTheme =
        themes.find((theme) => theme.name === themeName) || themes[0]

    const handleRecover = async () => {
        setLoading(true)

        if (!projectId || !slideData) {
            setLoading(false)
            toast.error(`${title}`, { description: "Project not found." })
            return
        }

        try {
            const response = await recoverProject(projectId)

            if (response.status !== 200) {
                toast.error("Oops!", {
                    description: response.error || "Something went wrong!",
                })
                return
            }

            setOpen(false)
            router.refresh()

            toast.success(`${title}`, {
                description: "Project recovered successfully.",
            })
        } catch (error) {
            console.error("Error recovering project:", error)
            toast.error("Oops!", {
                description: "Something went wrong! Please contact support",
            })
        }
    }

    const handleDelete = async () => {
        setLoading(true)

        if (!projectId || !slideData) {
            setLoading(false)
            toast.error(`${title}`, { description: "Project not found." })
            return
        }

        try {
            const response = await deleteProject(projectId)

            if (response.status !== 200) {
                toast.error("Oops!", {
                    description: response.error || "Failed to delete project.",
                })
                return
            }

            setOpen(false)
            router.refresh()

            toast.success(`${title}`, {
                description: "Project deleted successfully.",
            })
        } catch (error) {
            console.error("Error recovering project:", error)
            toast.error("Oops!", {
                description: "Something went wrong! Please contact support",
            })
        }
    }

    return (
        <motion.div
            variants={itemVatiants}
            className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors border-2 ${!isDeleted && "hover:bg-black/5 dark:hover:bg-white/5"}`}
        >
            <div
                className="realtive aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
                onClick={handleNavigation}
            >
                <ThumbnailPreview
                    theme={currentTheme}
                    slide={JSON.parse(JSON.stringify(slideData))?.[0]}
                />
            </div>
            <div className="w-full">
                <div className="space-y-1">
                    <h3 className="font-semibold text-base text-primary line-clamp-1">
                        {title}
                    </h3>
                    <div className="flex justify-between items-center gap-2 w-full">
                        <p
                            suppressHydrationWarning
                            className="text-sm text-muted-foreground"
                        >
                            {timeAgo(createdAt)}
                        </p>
                        {isDeleted ? (
                            <AlertDialogBox
                                discription="This will recover your project and restore all your data"
                                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 transition-all duration-200"
                                loading={loading}
                                open={open}
                                onClick={handleRecover}
                                handleOpen={() => setOpen(!open)}
                            >
                                <Button
                                    size={"sm"}
                                    variant={"ghost"}
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-400 transition-all duration-200 cursor-pointer"
                                >
                                    Recover
                                </Button>
                            </AlertDialogBox>
                        ) : (
                            <AlertDialogBox
                                discription="This will delete your project and send it to trash"
                                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                                loading={loading}
                                open={open}
                                onClick={handleDelete}
                                handleOpen={() => setOpen(!open)}
                            >
                                <Button
                                    size={"sm"}
                                    variant={"ghost"}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-400 transition-all duration-200 cursor-pointer"
                                >
                                    Delete
                                </Button>
                            </AlertDialogBox>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
