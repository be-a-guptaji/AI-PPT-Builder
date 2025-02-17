import { getRecentProjects } from "@/actions/projects";
import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import UpperInfobar from "@/components/global/upper-infobar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const recentProjects = await getRecentProjects();
    const checkUser = await onAuthenticateUser();

    if (!checkUser.user) {
        redirect("/sign-in");
    }
    return (
        <SidebarProvider>
            <AppSidebar
                recentProjects={recentProjects?.data || []}
                user={checkUser.user}
            />
            <SidebarInset>
                <UpperInfobar user={checkUser.user} />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default layout;
