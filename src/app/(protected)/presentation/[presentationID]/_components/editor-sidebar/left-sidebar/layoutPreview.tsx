import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useState } from "react";
import DragableSlidePreview from "./dragableSlidePreview";

const LayoutPreview = () => {
  const [isLoading, setLoading] = useState(true);
  const { getOrderedSlides, reOrderedSlides } = useSlideStore();
  const slides = getOrderedSlides();

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    reOrderedSlides(dragIndex, hoverIndex);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <div className="top-20 left-0 h-full w-72 overflow-y-auto border-r">
      <ScrollArea className="size-full" suppressHydrationWarning>
        {isLoading ? (
          <div className="flex w-full flex-col space-y-2 px-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="mt-8 space-y-6 p-4 pb-32">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-100">
                SLIDES
              </h2>
              <span
                className="text-xs text-gray-400 dark:text-gray-200"
                suppressHydrationWarning
              >
                {slides.length} slides
              </span>
            </div>
            {slides.map((slide, index) => (
              <DragableSlidePreview
                key={slide.id || index}
                slide={slide}
                index={index}
                moveSlide={moveSlide}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
