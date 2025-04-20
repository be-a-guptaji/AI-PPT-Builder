import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import React from "react";
import SearchBar from "./upperInfoSearchBar";
import TheamSwicher from "../mode-toggle";
import NewProjectButton from "./newProjectButton";

const UpperInfobar = ({ user }: { user: User }) => {
  return (
    <header className="bg-background sticky top-0 z-10 flex shrink-0 flex-col items-center justify-center gap-4 p-4 lg:flex-row lg:justify-between">
      <div className="flex w-full items-center justify-start gap-4 md:gap-6">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <SearchBar />
      </div>
      <div className="flex w-full max-w-[95%] items-center justify-between gap-6 sm:mx-16 lg:mx-16 lg:justify-end">
        <TheamSwicher />
        <NewProjectButton user={user} />
      </div>
    </header>
  );
};

export default UpperInfobar;
