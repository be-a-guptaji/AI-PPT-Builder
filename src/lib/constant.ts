import { Home, LayoutTemplate, Settings, Trash } from "lucide-react";

export const data = {
    user: {
        name: "Aryan Baadlas",
        email: "aryanbaadals@gmail.com",
        avatar: "/logo.jpg",
    },

    navMain: [
        {
            title: "Home",
            url: "/",
            icon: Home,
            isActive: true,
        },
        {
            title: "Templates",
            url: "/templates",
            icon: LayoutTemplate,
            isActive: false,
        },
        {
            title: "Trash",
            url: "/trash",
            icon: Trash,
            isActive: false,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
            isActive: false,
        },
    ],
};
