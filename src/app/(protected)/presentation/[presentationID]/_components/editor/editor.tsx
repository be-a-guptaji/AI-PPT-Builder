"use client"

import { v4 } from "uuid"
import { cn } from "@/lib/utils"
import { useDrag, useDrop } from "react-dnd"
import { LayoutSlides, Slide } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { useSlideStore } from "@/store/useSlideStore"
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useEffect, useRef, useState } from "react"
import MasterRecursiveComponent from "./masterRecursiveComponent"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Trash } from "lucide-react"

type EditorProps = {
    isEditable: boolean
}

interface DropZoneProps {
    index: number
    isEditable: boolean
    onDrop: (
        item: {
            type: string
            layoutType: string
            component: LayoutSlides
            index?: number
        },
        dropIndex: number
    ) => void
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
                isOver && canDrop
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300",
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
    handleDelete: (id: string) => void
}

export const DragableSlide: React.FC<DragableSlideProps> = ({
    index,
    slide,
    isEditable,
    moveSlide,
    handleDelete,
}) => {
    const ref = useRef(null)
    const { currentSlide, currentTheme, setCurrentSlide, updateContentItem } =
        useSlideStore()
    const [{ isDragging }, drag] = useDrag({
        type: "SLIDE",
        item: { index, type: "SLIDE" },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: isEditable,
    })

    const handelContentChange = (
        contentID: string,
        newContent: string | string[] | string[][]
    ) => {
        if (isEditable) {
            updateContentItem(slide.id, contentID, newContent)
        }
    }

    return (
        <div
            ref={ref}
            className={cn(
                "w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]",
                "shadow-xl transition-shadow duration-300",
                "flex flex-col",
                index === currentSlide
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "",
                slide.className,
                isDragging ? "opacity-50" : "opacity-100"
            )}
            style={{ backgroundImage: currentTheme.gradientBackground }}
            onClick={() => setCurrentSlide(index)}
        >
            <div className="size-full flex-grow overflow-hidden">
                <MasterRecursiveComponent
                    content={slide.content}
                    isEditable={isEditable}
                    isPreview={false}
                    slideId={slide.id}
                    onContentChange={handelContentChange}
                />
            </div>
            {isEditable && (
                <Popover>
                    <PopoverTrigger asChild className="absolute top-2 left-2">
                        <Button size={"sm"} variant={"outline"}>
                            <EllipsisVertical className="size-5" />
                            <span className="sr-only">Slide Options</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0">
                        <div className="flex space-x-2">
                            <Button
                                variant={"ghost"}
                                onClick={() => {
                                    handleDelete(slide.id)
                                }}
                            >
                                <Trash className="size-5 text-red-500" />
                                <span className="sr-only">Delete Slide</span>
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}

const Editor = ({ isEditable }: EditorProps) => {
    const slideRefs = useRef<(HTMLDivElement | null)[]>([])
    const [isLoading, setLoading] = useState(true)
    const {
        currentSlide,
        getOrderedSlides,
        reOrderedSlides,
        addSlideAtIndex,
        removeSlide,
    } = useSlideStore()
    const orderedSlides = getOrderedSlides()

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        if (isEditable) {
            reOrderedSlides(dragIndex, hoverIndex)
        }
    }

    const handleDrop = (
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

    const handleDelete = (id: string) => {
        if (isEditable) {
            removeSlide(id)
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

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoading(false)
        }
    }, [])

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
                            <DropZone
                                index={0}
                                isEditable={isEditable}
                                onDrop={handleDrop}
                            />
                        )}
                        {orderedSlides.map((slide, index) => (
                            <React.Fragment key={slide.id || index}>
                                <DragableSlide
                                    slide={slide}
                                    index={index}
                                    isEditable={isEditable}
                                    moveSlide={moveSlide}
                                    handleDelete={handleDelete}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    )
}

export default Editor
