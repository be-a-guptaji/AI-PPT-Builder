"use client";

import { itemVatiants, themes } from "@/lib/constant";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import ThumbnailPreview from "./thumbnailPreview";
import { timeAgo } from "@/lib/utils";

type ProjectCardProps = {
    projectId: string;
    title: string;
    createdAt: string;
    isDeleted: boolean;
    slideData: JsonValue;
    src: string;
    themeName: string;
};

const ProjectCard = ({
    projectId,
    title,
    createdAt,
    isDeleted,
    slideData,
    themeName,
    src,
}: ProjectCardProps) => {
    const router = useRouter();
    const { setSlides } = useSlideStore();

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slideData)));
        router.push(`/presentation/${projectId}`);
    };

    const currentTheme =
        themes.find((theme) => theme.name === themeName) || themes[0];

    return (
        <motion.div
            variants={itemVatiants}
            className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${!isDeleted && "hover:bg-black/5 dark:hover:bg-white/5"}`}
        >
            <div
                className="realtive aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
                onClick={handleNavigation}
            >
                <ThumbnailPreview
                    theme={currentTheme}
                    // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
                />
            </div>
            <div className="w-full">
                <div className="space-y-1">
                    <h3 className="font-semibold text-base text-primary line-clamp-1">
                        {title}
                    </h3>
                    <div className="flex justify-between items-center gap-2 w-full">
                        <p
                            suppressHydrationWarning
                            className="text-sm text-muted-foreground"
                        >
                            {timeAgo(createdAt)}
                        </p>
                        {isDeleted?"":""}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
