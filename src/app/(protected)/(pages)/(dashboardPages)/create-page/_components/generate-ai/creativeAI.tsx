"use client";

import { generateCreativePrompt } from "@/actions/chatGPT";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { containerVaraints, itemVatiants } from "@/lib/constant";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import usePromptStore from "@/store/usePromptStore";
import { ArrowRight, ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardList from "../common/cardList";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { OutlineCard } from "@/lib/types";
import { v4 } from "uuid";
import { createProject } from "@/actions/projects";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
    onBack: () => void;
};

const CreateAI = ({ onBack }: Props) => {
    const router = useRouter();
    const [numberOfCards, setNumberOfCards] = useState<number>(0);
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const {
        currentAIPrompt,
        outlines,
        setCurrentAIPrompt,
        addMultipleOutlines,
        resetCurrentAIPrompt,
        resetOutlines,
    } = useCreativeAIStore();
    const { addPrompts } = usePromptStore();
    const { setProject } = useSlideStore();

    const resetCards = () => {
        setEditingCard(null);
        setSelectedCard(null);

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

        if (response.status === 200 && response.data.outlines) {
            const cardData: OutlineCard[] = [];

            response.data.outlines.map((outline: string, index: number) => {
                const newCard: OutlineCard = {
                    id: v4(),
                    title: outline,
                    order: index + 1,
                };
                cardData.push(newCard);
            });

            addMultipleOutlines(cardData);
            setNumberOfCards(cardData.length);

            toast.success("Success", {
                description: "Outlines generated successfully.",
            });
        } else {
            toast.error("Error", {
                description: "Failed to generate outlines.",
            });
        }

        setIsGenerating(false);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);

        if (numberOfCards === 0) {
            toast.error("No Prompts", {
                description:
                    "Please enter atleast one card to generate slides.",
            });
            return;
        }

        try {
            const response = await createProject(currentAIPrompt, outlines);

            if (response.status !== 200 || !response.data) {
                toast.error("Oops!", {
                    description: response.error || "Something went wrong",
                });
                return;
            }

            setProject(response.data);

            addPrompts({
                id: response.data.id,
                title: response.data.title,
                outlines: outlines,
                createdAt: response.data.createdAt.toISOString(),
            });

            toast.success("Project created successfully.", {
                description: "Redirecting to your presntation.",
            });

            setCurrentAIPrompt("");
            resetOutlines();

            router.push(`/presentation/${response.data.id}/select-theme`);
        } catch (error) {
            console.error("Error creating project:", error);

            toast.error("Oops!", {
                description: "Failed to create project.",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        setNumberOfCards(outlines.length);
        if (outlines.length === 15) {
            toast.error("You can't add more than 15 cards.", {
                description:
                    "Please delete some cards to add more or generate project.",
            });
            return;
        }
    }, [outlines]);

    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVaraints}
            initial="hidden"
            animate="visible"
        >
            <Button
                onClick={() => {
                    resetCurrentAIPrompt();
                    resetOutlines();
                    onBack();
                }}
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
                        <div
                            className={`flex w-fit font-semibold shadow-xl border dark:border-white/20 border-black/20 min-w-28 px-4 py-1 rounded-lg justify-center items-center ${numberOfCards === 0 || numberOfCards >= 15 ? "text-red-500" : "text-primary"}`}
                        >
                            {numberOfCards === 0
                                ? "No Cards"
                                : `${numberOfCards} Cards`}
                        </div>
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
                onCardSelect={setSelectedCard}
                onCardDoubleClick={(cardId) => {
                    setEditingCard(cardId);
                }}
                setEditingCard={setEditingCard}
                setSelectedCard={setSelectedCard}
            />
            {outlines.length > 0 && (
                <Button
                    className="w-full transition-all duration-300 cursor-pointer text-lg h-12 dark:bg-white text-black bg-black/5 dark:hover:bg-white/50 hover:bg-black/50 mt-8"
                    onClick={handleGenerate}
                    disabled={
                        isGenerating ||
                        numberOfCards === 0 ||
                        numberOfCards > 15
                    }
                    variant={"default"}
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
            {/* {prompts?.length > 0 && <RecentPrompts />} */}
        </motion.div>
    );
};

export default CreateAI;
