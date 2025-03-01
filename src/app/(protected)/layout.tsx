export const dynamic = "force-dynamic";

import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
    const auth = await onAuthenticateUser();

    if (!auth.user) {
        redirect("/sign-in");
    }
    return <div className="w-full min-h-screen">{children}</div>;
};

export default Layout;
