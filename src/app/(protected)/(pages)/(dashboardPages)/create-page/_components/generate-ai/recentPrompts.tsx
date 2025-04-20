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
      description: "The recent prompt " + prompt.title + " has been deleted",
    });
  };

  return (
    <motion.div variants={containerVaraints} className="!mt-20 space-y-4">
      <motion.h2
        variants={itemVatiants}
        className="text-center text-2xl font-semibold"
      >
        Your Recent Prompts
      </motion.h2>
      <motion.div
        variants={containerVaraints}
        className="mx-auto w-full space-y-2 lg:max-w-[80%]"
      >
        {prompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            variants={itemVatiants}
            className="cursor-default"
          >
            <Card className="hover:bg-accent/50 flex items-center justify-between p-4 transition-colors duration-300">
              <div className="max-w-[70%]">
                <h3 className="line-clamp-1 text-xl font-semibold">
                  {prompt?.title}
                </h3>
                <p className="text-muted-foreground text-sm font-semibold">
                  {timeAgo(prompt?.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-kraton text-sm">Creative AI</span>
                <Button
                  variant={"default"}
                  size={"sm"}
                  className="bg-primary/20 text-primary cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
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
