import { Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import ScaledPreview from "./scaledPreview";

type DragableSlidePreviewProps = {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
};

const DragableSlidePreview = ({
  index,
  slide,
  moveSlide,
}: DragableSlidePreviewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentSlide, setCurrentSlide } = useSlideStore();

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: { index, type: "SLIDE" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    hover: (item: { index: number }) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveSlide(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    accept: "SLIDE",
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cn(
        "group relative cursor-pointer",
        index === currentSlide ? "before:bg-blue-500" : "before:bg-transparent",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="relative mb-4 pl-2">
        <ScaledPreview
          slide={slide}
          isActive={index === currentSlide}
          index={index}
        />
      </div>
    </div>
  );
};

export default DragableSlidePreview;
