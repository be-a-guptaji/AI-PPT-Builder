import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAIStore = {
    outlines: OutlineCard[] | [];
    currentAIPrompt: string;
    addMultipleOutlines: (outlines: OutlineCard[] | []) => void;
    addOutline: (outline: OutlineCard) => void;
    setCurrentAIPrompt: (prompt: string) => void;
    resetCurrentAIPrompt: () => void;
    resetOutlines: () => void;
};

const useCreativeAIStore = create<CreativeAIStore>()(
    persist(
        (set) => ({
            currentAIPrompt: "",
            outlines: [],
            addMultipleOutlines: (outlines: OutlineCard[] | []) => {
                set(() => ({
                    outlines: [...outlines],
                }));
            },
            addOutline: (outline: OutlineCard) => {
                set((state) => ({ outlines: [outline, ...state.outlines] }));
            },
            setCurrentAIPrompt: (prompt: string) => {
                set(() => ({
                    currentAIPrompt: prompt,
                }));
            },
            resetOutlines: () => {
                set(() => ({
                    outlines: [],
                }));
            },
            resetCurrentAIPrompt: () => {
                set(() => ({
                    currentAIPrompt: "",
                }));
            },
        }),
        { name: "creative-ai" }
    )
);

export default useCreativeAIStore;
