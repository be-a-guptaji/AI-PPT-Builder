import React from "react"
import DeleteAllButton from "./_components/deleteAllButton"
import { getDeletedProjects } from "@/actions/projects"
import NotFound from "@/components/global/not-found"

const Page = async () => {
    const deletedProjects = await getDeletedProjects()

    if (!deletedProjects.data || deletedProjects.data.length === 0) {
        return <NotFound />
    }

    return (
        <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
                        Trash
                    </h1>
                    <p className="text-base font-normal dark:text-secondary-foreground/50">
                        All your deleted projects
                    </p>
                </div>
                <DeleteAllButton Projects={deletedProjects.data} />
            </div>
        </div>
    )
}

export default Page
