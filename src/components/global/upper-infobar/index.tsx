import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { User } from "@prisma/client"
import React from "react"
import SearchBar from "./upperInfoSearchBar"
import TheamSwicher from "../mode-toggle"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import NewProjectButton from "./newProjectButton"

const UpperInfobar = ({ user }: { user: User }) => {
    return (
        <header className="sticky top-0 z-10 flex flex-col shrink-0 items-center lg:justify-between justify-center gap-4 bg-background p-4 lg:flex-row">
            <div className="w-full flex items-center justify-start md:gap-6 gap-4">
                <SidebarTrigger className="-ml-1 cursor-pointer" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <SearchBar />
            </div>
            <div className="w-full max-w-[95%] flex items-center lg:justify-end justify-between gap-6 lg:mx-16 sm:mx-16">
                <TheamSwicher />
                <Button
                    className="bg-primary/20 rounded-lg dark:hover:bg-white/30 transition-all duration-300 cursor-pointer text-primary font-semibold hover:bg-black/30"
                    size={"default"}
                >
                    {" "}
                    <Upload />
                    Import
                </Button>
                <NewProjectButton user={user} />
            </div>
        </header>
    )
}

export default UpperInfobar
