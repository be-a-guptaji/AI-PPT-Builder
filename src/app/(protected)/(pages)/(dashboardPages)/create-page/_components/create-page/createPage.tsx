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

type CreatePageProps = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: CreatePageProps) => {
  const { prompts } = usePromptStore();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-8"
      variants={containerVaraints}
    >
      <motion.div variants={itemVatiants} className="space-y-2 text-center">
        <h1 className="text-primary text-4xl font-bold">
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
            className={`${option.highlight ? "bg-kraton-gradient" : "border hover:bg-red-300"} cursor-default rounded-xl p-[1px] transition-all duration-300 ease-in-out`}
          >
            <motion.div
              className="flex h-full w-full flex-col items-start justify-between gap-y-6 rounded-xl bg-white p-4 dark:bg-black"
              whileHover={{ transition: { duration: 0.1 } }}
            >
              <div className="flex w-full flex-col items-start gap-y-3">
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
                  variant={option.highlight ? "default" : "outline"}
                  className="w-fit cursor-pointer rounded-xl font-bold"
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
