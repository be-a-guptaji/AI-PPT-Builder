import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import React from "react";
import SearchBar from "./upperInfoSearchBar";
import TheamSwicher from "../mode-toggle";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import NewProjectButton from "./newProjectButton";

const UpperInfobar = ({ user }: { user: User }) => {
    return (
        <header className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 bg-background p-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
                <SearchBar />
                <TheamSwicher />
                <div className="flex flex-wrap gap-4 items-center justify-end">
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
            </div>
        </header>
    );
};

export default UpperInfobar;
