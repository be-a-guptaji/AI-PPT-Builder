"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    containerVaraints,
    CreatePageCard,
    itemVatiants,
} from "@/lib/constant";
import { Button } from "@/components/ui/button";
import RecentPrompts from "../generate-ai/recentPrompts";
import usePromptStore from "@/store/usePromptStore";

type Props = {
    onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
    const { prompts, setPage } = usePromptStore();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-8"
            variants={containerVaraints}
        >
            <motion.div
                variants={itemVatiants}
                className="text-center space-y-2"
            >
                <h1 className="text-4xl font-bold text-primary">
                    How would you like to get started?
                </h1>
                <p className="text-secondary-foreground/50">
                    Choose your prefferd method to begin
                </p>
            </motion.div>

            <motion.div
                variants={containerVaraints}
                className="grid gap-6 md:grid-cols-3"
            >
                {CreatePageCard.map((option) => (
                    <motion.div
                        key={option.type}
                        variants={itemVatiants}
                        whileHover={{
                            scale: 1.05,
                            rotate: 1,
                            transition: { duration: 0.1 },
                        }}
                        className={`${option.highlight ? "bg-kraton-gradient" : "hover:bg-red-300 border"} rounded-xl p-[1px] transition-all duration-300 ease-in-out cursor-default`}
                    >
                        <motion.div
                            className="w-full h-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl justify-between"
                            whileHover={{ transition: { duration: 0.1 } }}
                        >
                            <div className="flex flex-col items-start w-full gap-y-3">
                                <div>
                                    <p className="text-primary text-lg font-semibold">
                                        {option.title}
                                    </p>
                                    <p
                                        className={`${option.highlight ? "text-kraton" : "text-primary"} text-4xl font-bold`}
                                    >
                                        {option.highlightedText}
                                    </p>
                                </div>
                                <p className="text-secondary-foreground text-sm font-normal">
                                    {option.description}
                                </p>
                            </div>
                            <motion.div
                                className="self-end"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant={
                                        option.highlight ? "default" : "outline"
                                    }
                                    className="w-fit rounded-xl font-bold cursor-pointer"
                                    size={"sm"}
                                    onClick={() => onSelectOption(option.type)}
                                >
                                    {option.highlight ? "Generate" : "Continue"}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {prompts.length > 0 && <RecentPrompts />}
        </motion.div>
    );
};

export default CreatePage;
