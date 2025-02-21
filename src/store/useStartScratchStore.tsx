import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type OutlineStore = {
    outlines: OutlineCard[] | [];
    addOutline: (outline: OutlineCard) => void;
    addMultipleOutlines: (outlines: OutlineCard[] | []) => void;
    resetOutlines: () => void;
};

const useStartScratchStore = create<OutlineStore>()(
    devtools(
        persist(
            (set) => ({
                outlines: [],
                addOutline: (outline: OutlineCard) => {
                    set((state) => ({
                        outlines: [...state.outlines, outline],
                    }));
                },
                addMultipleOutlines: (outlines: OutlineCard[] | []) => {
                    set(() => ({
                        outlines: [...outlines],
                    }));
                },
                resetOutlines: () => {
                    set(() => ({
                        outlines: [],
                    }));
                },
            }),
            {
                name: "scratch",
            }
        )
    )
);

export default useStartScratchStore;
