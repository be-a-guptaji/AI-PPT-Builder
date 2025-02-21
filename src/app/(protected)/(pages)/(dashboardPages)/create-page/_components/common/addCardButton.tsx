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
            className="w-full relative overflow-hidden"
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
                        className="absolute inset-0 flex justify-center items-center"
                    >
                        <div className="w-[40%] h-[1px] bg-primary" />
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            aria-label="Add a new card"
                            className="rounded-full size-8 p-0 bg-primary hover:bg-primary/90 cursor-pointer"
                            onClick={onAddCard}
                        >
                            <Plus className="size-4 text-black" />
                        </Button>
                        <div className="w-[40%] h-[1px] bg-primary" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AddCardButton;
