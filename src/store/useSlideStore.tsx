import { Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
    slides: Slide[];
    project: Project | null;
    curretntTheme: Theme;
    setSlides: (slides: Slide[]) => void;
    setProject: (project: Project | null) => void;
    setCurrentTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
    name: "Default",
    fontFamily: "'Inter', sans-serif",
    fontColor: "#000000",
    backgroundColor: "#f0f0f0",
    slideBackgroundColor: "#ffffff",
    accentColor: "#3b82f6",
    navbarColor: "#ffffff",
    sidebarColor: "#f0f0f0",
    type: "light",
};

export const useSlideStore = create(
    persist<SlideState>(
        (set) => ({
            slides: [],
            project: null,
            curretntTheme: defaultTheme,
            setSlides: (slides: Slide[]) => set({ slides }),
            setProject: (project: Project | null) => set({ project }),
            setCurrentTheme: (theme: Theme) => set({ curretntTheme: theme }),
        }),
        { name: "slides-storage" }
    )
);
