import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import React from "react";
import SearchBar from "./upper-info-searchBar";
import TheamSwicher from "../mode-toggle";

type InfobarProps = {
    user: User;
    children: React.ReactNode;
};

const UpperInfobar = ({ user, children }: InfobarProps) => {
    return (
        <header className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center justify-between gap-2 bg-background p-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
                <SearchBar />
            </div>
            <TheamSwicher />
        </header>
    );
};

export default UpperInfobar;
