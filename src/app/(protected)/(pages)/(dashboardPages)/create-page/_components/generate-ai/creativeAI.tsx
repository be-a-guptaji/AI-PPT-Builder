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

type CreativeAIProps = {
  onBack: () => void;
};

const CreateAI = ({ onBack }: CreativeAIProps) => {
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
        description: "Please enter atleast one card to generate slides.",
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
      className="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8"
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
        <ChevronLeft className="mr-2 size-4" />
        Back
      </Button>
      <motion.div variants={itemVatiants} className="space-y-2 text-center">
        <h1 className="text-primary text-4xl font-bold">
          Generate with <span className="text-kraton">Creative AI</span>
        </h1>
        <p className="text-secondary-foreground/50">
          What would you like to create today?
        </p>
      </motion.div>
      <motion.div
        variants={itemVatiants}
        className="bg-primary/10 rounded-xl p-4"
      >
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl sm:flex-row">
          <Input
            value={currentAIPrompt}
            onChange={(e) => {
              setCurrentAIPrompt(e.target.value);
            }}
            required
            placeholder="Enter a prompt and add to the cards . . . "
            className="flex-grow border-0 bg-transparent py-0 text-base shadow-none focus-visible:ring-0 sm:text-xl"
          />
          <div className="flex items-center gap-3">
            <div
              className={`flex w-fit min-w-28 items-center justify-center rounded-lg border border-black/20 px-4 py-1 font-semibold shadow-xl dark:border-white/20 ${numberOfCards === 0 || numberOfCards >= 15 ? "text-red-500" : "text-primary"}`}
            >
              {numberOfCards === 0 ? "No Cards" : `${numberOfCards} Cards`}
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
      <div className="flex w-full items-center justify-center">
        <Button
          className="flex cursor-pointer items-center gap-2 text-lg font-medium"
          onClick={generateOutlines}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
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
          className="my-8 h-12 w-full cursor-pointer bg-black/5 text-lg text-black transition-all duration-300 hover:bg-black/50 dark:bg-white dark:hover:bg-white/50"
          onClick={handleGenerate}
          disabled={isGenerating || numberOfCards === 0 || numberOfCards > 15}
          variant={"default"}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Generating
            </>
          ) : (
            <>Generate</>
          )}
        </Button>
      )}
    </motion.div>
  );
};

export default CreateAI;
