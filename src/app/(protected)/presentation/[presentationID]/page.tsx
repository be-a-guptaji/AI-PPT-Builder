"use client";

import { getProjectById } from "@/actions/projects";
import { themes } from "@/lib/constant";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Page = () => {
    const params = useParams();
    const { setTheme } = useTheme();
    const [isLoading, setLoading] = useState(true);
    const { setCurrentTheme, setProject, setSlides } = useSlideStore();

    useEffect(() => {
        (async () => {
            try {
                const response = await getProjectById(
                    params.presentationID as string
                );

                if (response.status !== 200 || !response.data) {
                    toast.error("Oops!", {
                        description: "Unable to fetch project.",
                    });

                    redirect("/dashboard");
                }

                const findTheme = themes.find(
                    (theme) => theme.name === response?.data?.themeName
                );

                setCurrentTheme(findTheme || themes[0]);
                setTheme(findTheme?.type === "dark" ? "dark" : "light");
                setProject(response.data);
                setSlides(JSON.parse(JSON.stringify(response.data.slides)));
            } catch (error) {
                console.error("Error fetching project:", error);
                toast.error("Error!", {
                    description: "An unexpected error occurred.",
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [
        params.presentationID,
        setCurrentTheme,
        setTheme,
        setProject,
        setSlides,
    ]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin size-4 text-primary" />
            </div>
        );
    }

    return <DndProvider backend={HTML5Backend}>
        <div></div>
    </DndProvider>;
};

export default Page;
