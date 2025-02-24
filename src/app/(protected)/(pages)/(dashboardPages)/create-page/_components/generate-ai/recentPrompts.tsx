"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { containerVaraints, itemVatiants } from "@/lib/constant";
import { OutlineCard } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import usePromptStore from "@/store/usePromptStore";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Prompt = {
    id: string;
    createdAt: string;
    title: string;
    outlines: OutlineCard[] | [];
};

const RecentPrompts = () => {
    const { prompts, setPage, removePrompt } = usePromptStore();
    const { addMultipleOutlines, setCurrentAIPrompt } = useCreativeAIStore();

    const handleEdit = (id: string) => {
        const prompt = prompts.find((prompt) => prompt?.id === id);

        if (prompt) {
            setPage("creative-ai");
            addMultipleOutlines(prompt?.outlines);
            setCurrentAIPrompt(prompt?.title);
        } else {
            toast.error("Error fetching prompt", {
                description: "Prompt not found",
            });
        }
    };

    const handleDelete = (prompt: Prompt) => {
        removePrompt(prompt.id);

        toast.success("Prompt deleted successfully", {
            description:
                "The recent prompt " + prompt.title + " has been deleted",
        });
    };

    return (
        <motion.div variants={containerVaraints} className="space-y-4 !mt-20">
            <motion.h2
                variants={itemVatiants}
                className="text-2xl font-semibold text-center"
            >
                Your Recent Prompts
            </motion.h2>
            <motion.div
                variants={containerVaraints}
                className="space-y-2 w-full lg:max-w-[80%] mx-auto"
            >
                {prompts.map((prompt) => (
                    <motion.div
                        key={prompt.id}
                        variants={itemVatiants}
                        className="cursor-default"
                    >
                        <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
                            <div className="max-w-[70%]">
                                <h3 className="font-semibold text-xl line-clamp-1">
                                    {prompt?.title}
                                </h3>
                                <p className="font-semibold text-sm text-muted-foreground">
                                    {timeAgo(prompt?.createdAt)}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-kraton">
                                    Creative AI
                                </span>
                                <Button
                                    variant={"default"}
                                    size={"sm"}
                                    className="rounded-xl bg-primary/20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary cursor-pointer"
                                    onClick={() => handleEdit(prompt?.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant={"destructive"}
                                    size={"sm"}
                                    className="cursor-pointer"
                                    onClick={() => handleDelete(prompt)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default RecentPrompts;
