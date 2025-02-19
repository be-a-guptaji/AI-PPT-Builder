"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const NewProjectButton = ({ user }: { user: User }) => {
    const router = useRouter();

    return (
        <Button
            className="flex items-center gap-2 justify-center cursor-pointer transition-all duration-300 dark:hover:bg-white/60 hover:bg-black/75 dark:disabled:bg-white/50 disabled:bg-black/50"
            size={"default"}
            disabled={!user.subscription}
            onClick={() => router.push("/create-page")}
        >
            <Plus />
            New Project
        </Button>
    );
};

export default NewProjectButton;
