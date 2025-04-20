"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type AddCardButtonProps = {
  onAddCard: () => void;
};

const AddCardButton = ({ onAddCard }: AddCardButtonProps) => {
  const [showGap, setShowGap] = useState(false);

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={{ height: "0.5rem" }}
      animate={{
        height: showGap ? "2rem" : "0.5rem",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      onHoverStart={() => setShowGap(true)}
      onHoverEnd={() => setShowGap(false)}
    >
      <AnimatePresence>
        {showGap && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-primary h-[1px] w-[40%]" />
            <Button
              variant={"outline"}
              size={"sm"}
              aria-label="Add a new card"
              className="bg-primary hover:bg-primary/90 size-8 cursor-pointer rounded-full p-0"
              onClick={onAddCard}
            >
              <Plus className="size-4 text-black" />
            </Button>
            <div className="bg-primary h-[1px] w-[40%]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddCardButton;
