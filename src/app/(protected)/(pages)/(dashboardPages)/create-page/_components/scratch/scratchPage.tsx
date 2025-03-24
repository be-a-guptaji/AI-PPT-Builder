"use client";

import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OutlineCard } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import useStartScratchStore from "@/store/useStartScratchStore";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CardList from "../common/cardList";
import { motion } from "framer-motion";
import { containerVaraints, itemVatiants } from "@/lib/constant";
import { v4 } from "uuid";

type ScratchPageProps = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: ScratchPageProps) => {
  const router = useRouter();
  const [editText, setEditText] = useState<string>("");
  const [numberOfCards, setNumberOfCards] = useState<number>(0);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { outlines, addMultipleOutlines, addOutline, resetOutlines } =
    useStartScratchStore();
  const { setProject } = useSlideStore();

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    setEditText("");
    resetOutlines();
  };

  const handleAddCard = () => {
    if (outlines.length >= 15) {
      toast.error("You can't add more than 15 cards.", {
        description:
          "Please delete some cards to add more or generate project.",
      });
      return;
    }
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
        description: "Please enter atleast one card to generate slides.",
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
            <div
              className={`flex w-fit font-semibold shadow-xl border dark:border-white/20 border-black/20 min-w-28 px-4 py-1 rounded-lg justify-center items-center ${numberOfCards === 0 || numberOfCards >= 15 ? "text-red-500" : "text-primary"}`}
            >
              {numberOfCards === 0 ? "No Cards" : `${numberOfCards} Cards`}
            </div>
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
      <Button
        onClick={handleAddCard}
        variant={"default"}
        className="w-full bg-primary/10 dark:hover:bg-white/20 transition-all duration-300 cursor-pointer text-primary mt-4 text-lg h-12 hover:bg-black/50 disabled:pointer-events-none disabled:opacity-50"
        disabled={numberOfCards >= 15}
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
