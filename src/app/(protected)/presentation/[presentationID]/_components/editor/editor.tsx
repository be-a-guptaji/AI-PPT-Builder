import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { LayoutSlides, Slide } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useSlideStore } from "@/store/useSlideStore"
import React, { useEffect, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import { v4 } from "uuid"

type EditorProps = {
  isEditable: boolean
}

interface DropZoneProps {
  index: number
  onDrop: (
    item: {
      type: string
      layoutType: string
      component: LayoutSlides
      index?: number
    },
    dropIndex: number
  ) => void
  isEditable: boolean
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  isEditable,
  onDrop,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "LAYOUT"],
    drop: (item: {
      type: string
      layoutType: string
      component: LayoutSlides
      index?: number
    }) => {
      onDrop(item, index)
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  if (!isEditable) {
    return null
  }

  return (
    <div
      className={cn(
        "h-4 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop Here
        </div>
      )}
    </div>
  )
}

interface DragableSlideProps {
  index: number
  slide: Slide
  isEditable: boolean
  moveSlide: (dragIndex: number, hoverIndex: number) => void
  handelDelete: (id: string) => void
}

export const DragableSlide: React.FC<DragableSlideProps> = ({
  index,
  slide,
  isEditable,
  moveSlide,
  handelDelete,
}) => {
  const ref = useRef(null)

  return (
    <div className="h-4 rounded-md transition-all duration-200 border-gray-300">
      <div className="h-full flex items-center justify-center text-gray-600">
        Drag Here
      </div>
    </div>
  )
}

const Editor = ({ isEditable }: EditorProps) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isLoading, setLoading] = useState(true)
  const {
    curretntTheme,
    project,
    slides,
    currentSlide,
    addSlideAtIndex,
    removeSlide,
    getOrderedSlides,
    reOrderedSlides,
    setCurrentTheme,
    setProject,
    setSlides,
  } = useSlideStore()
  const orderedSlides = getOrderedSlides()

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reOrderedSlides(dragIndex, hoverIndex)
    }
  }

  const handelDrop = (
    item: {
      type: string
      layoutType: string
      component: LayoutSlides
      index?: number
    },
    dropIndex: number
  ) => {
    if (!isEditable) {
      return
    }

    if (item.type === "layout") {
      addSlideAtIndex(
        { ...item.component, id: v4(), slideOrder: dropIndex },
        dropIndex
      )
    } else if (item.type === "slide" && item.index !== undefined) {
      moveSlide(item.index, dropIndex)
    }
  }

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [currentSlide])

  return (
    <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {isLoading ? (
        <div className="w-full px-4 flex flex-col space-y-2 mt-8">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="px-4 pb-4 space-y-4 pt-2">
            {isEditable && (
              <DropZone index={0} isEditable={isEditable} onDrop={handelDrop} />
            )}
            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DragableSlide />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

export default Editor
