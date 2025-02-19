import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAIStore = {
    outlines: OutlineCard[] | [];
    addMultipleOutlines: (outlines: OutlineCard[] | []) => void;
    addOutline: (outline: OutlineCard) => void;
    createAIPrompt: string;
    setCurrentAIPrompt: (prompt: string) => void;
};

const useCreativeAIStore = create<CreativeAIStore>()(
    persist(
        (set) => ({
            createAIPrompt: "",
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
                    createAIPrompt: prompt,
                }));
            },
        }),
        { name: "creative-ai" }
    )
);

export default useCreativeAIStore;
