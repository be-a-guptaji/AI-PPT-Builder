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
    <div className="w-72 h-full left-0 top-20 border-r overflow-y-auto">
      <ScrollArea className="size-full" suppressHydrationWarning>
        {isLoading ? (
          <div className="w-full px-4 flex flex-col space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">
                SLIDES
              </h2>
              <span
                className="text-xs dark:text-gray-200 text-gray-400"
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
