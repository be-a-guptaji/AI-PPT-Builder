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
import NavMain from "./navMain";
import { data } from "@/lib/constant";
import RecentOpen from "./recentOpen";
import NavFooter from "./navFooter";

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: { recentProjects: Project[] } & {
  user: User;
} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-background/10 max-w-[212px]"
      {...props}
    >
      <SidebarHeader className="px-2 pt-6 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Avatar className="size-10 rounded-full">
              <AvatarImage src="/logo.png" alt="Kraton" />
              <AvatarFallback className="rounded-lg">Kraton</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-primary truncate text-3xl font-semibold">
            Kraton
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="mt-10 gap-y-6 px-2">
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
