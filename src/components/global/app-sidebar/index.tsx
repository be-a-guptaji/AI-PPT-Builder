"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import React from "react";
import NavMain from "./nav-main";
import { data } from "@/lib/constant";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";

const AppSidebar = ({
    recentProjects,
    user,
    ...props
}: { recentProjects: Project[] } & { user: User } & React.ComponentProps<
        typeof Sidebar
    >) => {
    return (
        <Sidebar
            collapsible="icon"
            className="max-w-[212px] bg-background/10"
            {...props}
        >
            <SidebarHeader className="pt-6 px-3 pb-0">
                <SidebarMenuButton
                    size={"lg"}
                    className="data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="flex aspect-square items-center justify-center size-8 rounded-lg text-sidebar-primary-foreground">
                        <Avatar className="size-10 rounded-full">
                            <AvatarImage src="/logo.jpg" alt="Kraton" />
                            <AvatarFallback className="rounded-lg">
                                Kraton
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <span className="truncate text-primary text-3xl font-semibold">
                        Kraton
                    </span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="px-3 mt-10 gap-y-6">
                <NavMain items={data.navMain} />
                <RecentOpen recentProjects={recentProjects} />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter prismaUser={user} />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
