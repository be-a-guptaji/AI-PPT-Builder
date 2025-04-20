import { Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";
import MasterRecursiveComponent from "../../editor/masterRecursiveComponent";

type ScaledPreviewProps = {
  slide: Slide;
  isActive: boolean;
  index: number;
};

const ScaledPreview = ({ index, isActive, slide }: ScaledPreviewProps) => {
  const { currentTheme } = useSlideStore();

  return (
    <div
      className={cn(
        "ring-primary/20 relative aspect-video w-full overflow-hidden rounded-lg p-2 ring-2 ring-offset-2 transition-all duration-200",
        isActive
          ? "ring-2 ring-blue-500 ring-offset-2"
          : "hover:ring-2 hover:ring-gray-200 hover:ring-offset-2"
      )}
      style={{
        fontFamily: currentTheme.fontFamily,
        color: currentTheme.accentColor,
        backgroundColor: currentTheme.slideBackgroundColor,
        backgroundImage: currentTheme.gradientBackground,
      }}
    >
      <div className="size-[200%] origin-top-left scale-[0.5] overflow-hidden">
        <MasterRecursiveComponent
          slideId={slide.id}
          content={slide.content}
          isPreview={true}
          onContentChange={() => {}}
        />
      </div>

      <div
        className={cn(
          "absolute bottom-2 left-2 rounded bg-gray-800 px-2 py-1 text-xs",
          isActive && "!text-white ring-2 ring-blue-500 ring-offset-2"
        )}
        style={{ color: currentTheme.accentColor }}
      >
        {index + 1}
      </div>
    </div>
  );
};

export default ScaledPreview;
