"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { containerVaraints, itemVatiants } from "@/lib/constant";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CardList from "../common/cardList";
import usePromptStore from "@/store/usePromptStore";
import { toast } from "sonner";
import { generateCreativePrompt } from "@/actions/chatGPT";

type Props = {
    onBack: () => void;
};

const CreateAI = ({ onBack }: Props) => {
    const router = useRouter();
    const [numberOfCards, setNumberOfCards] = useState(0);
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [editingText, setEditingText] = useState<string | null>(null);
    const {
        currentAIPrompt,
        outlines,
        setCurrentAIPrompt,
        addOutline,
        resetOutlines,
        addMultipleOutlines,
    } = useCreativeAIStore();
    const { prompts, addPrompts } = usePromptStore();

    const resetCards = () => {
        setEditingCard(null);
        setSelectedCard(null);
        setEditingText("");

        setCurrentAIPrompt("");
        resetOutlines();
    };

    const generateOutlines = async () => {
        if (currentAIPrompt === "") {
            toast.error("Empty prompt", {
                description: "Please enter a prompt to generate a outlines.",
            });
            return;
        }

        setIsGenerating(true);
        const response = await generateCreativePrompt(currentAIPrompt);
    };

    const handleGenerate = () => {};

    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVaraints}
            initial="hidden"
            animate="visible"
        >
            <Button
                onClick={onBack}
                variant={"outline"}
                className="mb-4 cursor-pointer"
            >
                <ChevronLeft className="size-4 mr-2" />
                Back
            </Button>
            <motion.div
                variants={itemVatiants}
                className="text-center space-y-2"
            >
                <h1 className="text-4xl font-bold text-primary">
                    Generate with{" "}
                    <span className="text-kraton">Creative AI</span>
                </h1>
                <p className="text-secondary-foreground/50">
                    What would you like to create today?
                </p>
            </motion.div>
            <motion.div
                variants={itemVatiants}
                className="bg-primary/10 p-4 rounded-xl"
            >
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                        value={currentAIPrompt}
                        onChange={(e) => {
                            setCurrentAIPrompt(e.target.value);
                        }}
                        required
                        placeholder="Enter a prompt and add to the cards . . . "
                        className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none py-0 bg-transparent flex-grow"
                    />
                    <div className="flex items-center gap-3">
                        <Select
                            value={numberOfCards.toString()}
                            onValueChange={(value) => {
                                setNumberOfCards(parseInt(value));
                            }}
                        >
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl border border-black/20 dark:border-white/20 hover:cursor-pointer min-w-28">
                                <SelectValue placeholder="Select number of cards"></SelectValue>
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
                                    ).map((num) => (
                                        <SelectItem
                                            key={num}
                                            value={num.toString()}
                                            className="font-semibold"
                                        >
                                            {num} {num === 1 ? "Card" : "Cards"}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                        <Button
                            variant={"destructive"}
                            onClick={resetCards}
                            size="default"
                            aria-label="Reset Cards"
                            className="cursor-pointer"
                        >
                            <RotateCcw className="size-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>
            <div className="w-full flex items-center justify-center">
                <Button
                    className="font-medium text-lg flex gap-2 items-center cursor-pointer"
                    onClick={generateOutlines}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin size-4" />
                            Generating
                        </>
                    ) : (
                        <>
                            Generate Outline
                            <ArrowRight className="size-4" />
                        </>
                    )}
                </Button>
            </div>
            <CardList
                outlines={outlines}
                addMultipleOutlines={addMultipleOutlines}
                editingCard={editingCard}
                selectedCard={selectedCard}
                editText={editingText}
                onEditChange={setEditingText}
                onCardSelect={setSelectedCard}
                onCardDoubleClick={(cardId, title) => {
                    setEditingCard(cardId);
                    setEditingText(title);
                }}
                setEditedText={setEditingText}
                setEditingCard={setEditingCard}
                setSelectedCard={setSelectedCard}
            />
            {outlines.length > 0 && (
                <Button
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="animate-spin size-4 mr-2" />
                            Generating
                        </>
                    ) : (
                        <>Generate</>
                    )}
                </Button>
            )}
            {prompts?.length > 0 && <RecentPrompts />}
        </motion.div>
    );
};

export default CreateAI;
