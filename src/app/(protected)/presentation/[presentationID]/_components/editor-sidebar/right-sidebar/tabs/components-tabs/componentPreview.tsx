import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useDrag } from "react-dnd";

type ComponentItemProps = {
  type: string;
  componentType: string;
  name: string;
  icon: string;
  component: ContentItem;
};

const ComponentCard = ({ item }: { item: ComponentItemProps }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CONTENT_ITEM",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className={cn(
        "rounded-lg border",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{
        backgroundColor: "#f9f9f9",
      }}
    >
      <button
        className={cn(
          "hover:bg-primary/90 flex cursor-grab flex-col items-center gap-2 rounded-lg p-2 transition-all duration-200 active:cursor-grabbing",
          "w-full text-center",
          "transform hover:scale-105"
        )}
      >
        <div className="aspect-video w-full rounded-md border bg-gray-100 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-gray-700">
          <div className="flex size-full flex-col items-center justify-center gap-2 rounded-md shadow-sm shadow-gray-600 transition-shadow duration-200 hover:shadow-lg">
            <span className="text-primary text-2xl">{item.icon}</span>
          </div>
        </div>
        <span className="text-xs font-medium text-gray-500">{item.name}</span>
      </button>
    </div>
  );
};

export default ComponentCard;
