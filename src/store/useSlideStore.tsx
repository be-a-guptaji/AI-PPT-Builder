import { Slide, Theme } from "@/lib/types"
import { Project } from "@prisma/client"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 } from "uuid"

interface SlideState {
  slides: Slide[]
  project: Project | null
  curretntTheme: Theme
  currentSlide: number
  setSlides: (slides: Slide[]) => void
  setProject: (project: Project | null) => void
  setCurrentTheme: (theme: Theme) => void
  removeSlide: (id: string) => void
  addSlideAtIndex: (slide: Slide, index: number) => void
  getOrderedSlides: () => Slide[]
  reOrderedSlides: (fromIndex: number, toIndex: number) => void
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
}

export const useSlideStore = create(
  persist<SlideState>(
    (set, get) => ({
      slides: [],
      project: null,
      curretntTheme: defaultTheme,
      currentSlide: 0,
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project: Project | null) => set({ project }),
      setCurrentTheme: (theme: Theme) => set({ curretntTheme: theme }),
      removeSlide: (id: string) => {
        set((state) => ({
          slides: state.slides.filter((slide) => slide.id !== id),
        }))
      },
      addSlideAtIndex: (slide: Slide, index: number) => {
        set((state) => {
          const newSlides = [...state.slides]
          newSlides.splice(index, 0, { ...slide, id: v4() })
          newSlides.forEach((s: Slide, i: number) => {
            s.slideOrder = i
          })
          return { slides: newSlides, currentSlide: index }
        })
      },
      getOrderedSlides: () => {
        const state = get()
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder)
      },
      reOrderedSlides: (fromIndex: number, toIndex: number) => {
        set((state) => {
          const newSlides = [...state.slides]
          const [removed] = newSlides.splice(fromIndex, 1)
          newSlides.splice(toIndex, 0, removed)
          return {
            slides: newSlides.map((slide: Slide, index: number) => ({
              ...slide,
              slideOrder: index,
            })),
          }
        })
      },
    }),
    { name: "slides-storage" }
  )
)
