import { ContentItem, Slide, Theme } from "@/lib/types"
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
  updateContentItem: (
    slideId: string,
    contentID: string,
    newContent: string | string[] | string[][]
  ) => void
  setCurrentSlide: (index: number) => void
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
      setCurrentSlide: (index: number) => set({ currentSlide: index }),
      updateContentItem: (
        slideId: string,
        contentID: string,
        newContent: string | string[] | string[][]
      ) => {
        set((state) => {
          const updateContentRecursively = (item: ContentItem): ContentItem => {
            if (item.id === contentID) {
              return {
                ...item,
                content: newContent,
              }
            }

            if (
              Array.isArray(item.content) &&
              item.content.every((i) => typeof i !== "string")
            ) {
              return {
                ...item,
                content: item.content.map((subItem) => {
                  if (typeof subItem !== "string") {
                    return updateContentRecursively(subItem as ContentItem)
                  }
                  return subItem
                }) as ContentItem[],
              }
            }
            return item
          }
          return {
            slides: state.slides.map((slide) =>
              slide.id === slideId
                ? { ...slide, content: updateContentRecursively(slide.content) }
                : slide
            ),
          }
        })
      },
    }),
    { name: "slides-storage" }
  )
)
