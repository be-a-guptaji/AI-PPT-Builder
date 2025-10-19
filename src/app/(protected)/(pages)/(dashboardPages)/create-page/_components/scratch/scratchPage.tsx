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
import { Project } from "@prisma/client";

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
      const projectData = response.data as Project;

      setProject(projectData);
      resetOutlines();

      toast.success("Project created successfully.", {
        description: "Redirecting to your presntation.",
      });

      router.push(`/presentation/${projectData.id}/select-theme`);
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
      className="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8"
      variants={containerVaraints}
      initial="hidden"
      animate="visible"
    >
      <Button
        onClick={handleBack}
        variant={"outline"}
        className="mb-4 cursor-pointer"
      >
        <ChevronLeft className="mr-2 size-4" />
        Back
      </Button>
      <h1 className="text-primary text-left text-2xl font-bold sm:text-3xl">
        Prompt
      </h1>
      <motion.div
        className="bg-primary/10 rounded-xl p-4"
        variants={itemVatiants}
      >
        <div className="flex flex-col items-center justify-between gap-3 rounded-xl sm:flex-row">
          <Input
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
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
        className="bg-primary/10 text-primary mt-4 h-12 w-full cursor-pointer text-lg transition-all duration-300 hover:bg-black/50 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-white/20"
        disabled={numberOfCards >= 15}
      >
        Add Cards
      </Button>

      {outlines.length > 0 && (
        <Button
          onClick={handleGenerate}
          variant={"default"}
          className="h-12 w-full cursor-pointer bg-black/5 text-lg text-black transition-all duration-300 hover:bg-black/50 dark:bg-white dark:hover:bg-white/50"
        >
          Generate PPT
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
