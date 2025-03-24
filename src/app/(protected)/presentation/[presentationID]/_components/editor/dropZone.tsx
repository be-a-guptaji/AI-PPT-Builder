import { v4 } from "uuid";
import React from "react";
import { cn } from "@/lib/utils";
import { useDrop } from "react-dnd";
import { ContentItem } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";

type DropZoneProps = {
  index: number;
  parentID: string;
  slideID: string;
};

const DropZone = ({ index, parentID, slideID }: DropZoneProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CONTENT_ITEM",
    drop: (item: {
      type: string;
      componentType: string;
      lable: string;
      component: ContentItem;
    }) => {
      if (item.type === "component") {
        addComponentInSlide(
          slideID,
          { ...item.component, id: v4() },
          parentID,
          index
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  const { addComponentInSlide } = useSlideStore();
  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "h-3 w-full transition-all duration-200",
        "",
        isOver && canDrop ? "border-blue-500 bg-blue-100" : "border-gray-300",
        "hover:border-blue-300"
      )}
    >
      {isOver && canDrop && (
        <div className="size-full flex text-sm items-center justify-center text-green-600">
          Drop here
        </div>
      )}
    </div>
  );
};

export default DropZone;
