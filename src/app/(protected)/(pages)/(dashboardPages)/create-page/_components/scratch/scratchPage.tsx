"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { containerVaraints, itemVatiants } from "@/lib/constant";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCcw } from "lucide-react";
import useStartScratchStore from "@/store/useStartScratchStore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import CardList from "../common/cardList";
import { OutlineCard } from "@/lib/types";
import { v4 } from "uuid";
import { toast } from "sonner";
import { createProject } from "@/actions/projects";
import { useSlideStore } from "@/store/useSlideStore";

type ScratchPageProps = {
    onBack: () => void;
};

const ScratchPage = ({ onBack }: ScratchPageProps) => {
    const router = useRouter();
    const [editText, setEditText] = useState("");
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const { outlines, addMultipleOutlines, addOutline, resetOutlines } =
        useStartScratchStore();
    const { setProject } = useSlideStore();

    const handleBack = () => {
        resetOutlines();
        onBack();
    };

    const resetCards = () => {
        setEditText("");
        resetOutlines();
    };

    const handleAddCard = () => {
        const newCard: OutlineCard = {
            id: v4(),
            title: editText || "New Section",
            order: outlines.length + 1,
        };

        setEditText("");
        addOutline(newCard);
    };

    const handleGenerate = async () => {
        if (outlines.length === 0) {
            toast.error("No Prompts", {
                description:
                    "Please enter atleast one card to generate slides.",
            });
            return;
        }

        const response = await createProject(outlines?.[0]?.title, outlines);

        if (response.status !== 200) {
            toast.error("Oops!", {
                description: response.error || "Something went wrong",
            });
            return;
        }

        if (response.data) {
            setProject(response.data);
            resetOutlines();

            toast.success("Project created successfully.", {
                description: "Redirecting to your presntation.",
            });

            router.push(`/presentation/${response.data.id}/select-theme`);
        } else {
            toast.error("Oops!", {
                description: "Failed to create project.",
            });
        }
    };

    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVaraints}
            initial="hidden"
            animate="visible"
        >
            <Button
                onClick={handleBack}
                variant={"outline"}
                className="mb-4 cursor-pointer"
            >
                <ChevronLeft className="size-4 mr-2" />
                Back
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
                Prompt
            </h1>
            <motion.div
                className="bg-primary/10 p-4 rounded-xl"
                variants={itemVatiants}
            >
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                        value={editText}
                        onChange={(e) => {
                            setEditText(e.target.value);
                        }}
                        required
                        placeholder="Enter a prompt and add to the cards . . . "
                        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none py-0 bg-transparent flex-grow"
                    />
                    <div className="flex items-center gap-3">
                        <Select
                            value={
                                outlines.length > 0
                                    ? outlines.length.toString()
                                    : "0"
                            }
                        >
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl border dark:border-white/20 border-black/20 min-w-28">
                                <SelectValue placeholder="Select number of cards" />
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                                {outlines.length === 0 ? (
                                    <SelectItem
                                        value="0"
                                        className="font-semibold"
                                    >
                                        No Cards
                                    </SelectItem>
                                ) : (
                                    Array.from(
                                        { length: outlines.length },
                                        (_, index) => index + 1
                                    ).map((number) => (
                                        <SelectItem
                                            key={number}
                                            value={number.toString()}
                                            className="font-semibold"
                                        >
                                            {number}{" "}
                                            {number === 1 ? "Card" : "Cards"}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        <Button
                            variant={"destructive"}
                            onClick={resetCards}
                            size={"icon"}
                            aria-label="Reset Cards"
                            className="cursor-pointer"
                        >
                            <RotateCcw className="size-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>
            <CardList
                outlines={outlines}
                addOutline={addOutline}
                addMultipleOutlines={addMultipleOutlines}
                editingCard={editingCard}
                selectedCard={selectedCard}
                editText={editText}
                onEditChange={setEditText}
                onCardSelect={setSelectedCard}
                onCardDoubleClick={(cardId, title) => {
                    setEditingCard(cardId);
                    setEditText(title);
                }}
                setEditedText={setEditText}
                setEditingCard={setEditingCard}
                setSelectedCard={setSelectedCard}
            />
            <Button
                onClick={handleAddCard}
                variant={"default"}
                className="w-full bg-primary/10 dark:hover:bg-white/20 transition-all duration-300 cursor-pointer text-primary mt-4 text-lg h-12 hover:bg-black/50"
            >
                Add Cards
            </Button>

            {outlines.length > 0 && (
                <Button
                    onClick={handleGenerate}
                    variant={"default"}
                    className="w-full transition-all duration-300 cursor-pointer text-lg h-12 dark:bg-white text-black bg-black/5 dark:hover:bg-white/50 hover:bg-black/50"
                >
                    Generate PPT
                </Button>
            )}
        </motion.div>
    );
};

export default ScratchPage;
