"use client"

import { deleteAllProjects } from "@/actions/projects"
import AlertDialogBox from "@/components/global/alert-dialog"
import { Button } from "@/components/ui/button"
import { Project } from "@prisma/client"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"

type DeleteAllButtonProps = {
    Projects: Project[]
}

const DeleteAllButton = ({ Projects }: DeleteAllButtonProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleDeleteAllProjects = async () => {
        try {
            setLoading(true)

            if (!Projects || Projects.length === 0) {
                setLoading(false)
                toast.error("No Projects", {
                    description: "No projects to delete",
                })
                return
            }

            const res = await deleteAllProjects(
                Projects.map((project) => project.id)
            )

            if (res.status !== 200) {
                toast.error("Sorry something went wrong", {
                    description: res.error,
                })
                router.refresh()
                setOpen(false)
                return
            }
        } catch (error) {
            console.error(error)
            toast.error("Error", {
                description: "Failed to delete projects",
            })
        } finally {
            setLoading(false)
            setOpen(false)
            router.refresh()
        }
    }

    return (
        <AlertDialogBox
            discription="This will delete all projects. This action cannot be undone and you will not be able to recover them anymore."
            className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
            loading={loading}
            open={open}
            onClick={handleDeleteAllProjects}
            handleOpen={() => setOpen(!open)}
        >
            <Button
                variant={"destructive"}
                size={"lg"}
                className="bg-red-600 hover:bg-red-900 transition-all duration-200 cursor-pointer"
            >
                <Trash className="size-4 mr-2" />
                Delete All
            </Button>
        </AlertDialogBox>
    )
}

export default DeleteAllButton
