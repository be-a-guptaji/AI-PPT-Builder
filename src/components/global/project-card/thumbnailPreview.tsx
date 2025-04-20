import MasterRecursiveComponent from "@/app/(protected)/presentation/[presentationID]/_components/editor/masterRecursiveComponent";
import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
import React from "react";

type ThumbnailPreviewProps = {
  slide: Slide;
  theme: Theme;
};

const ThumbnailPreview = ({ slide, theme }: ThumbnailPreviewProps) => {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg p-2 transition-all duration-200"
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="h-[200%] w-[200%] origin-top-left scale-[0.5] overflow-hidden">
          <MasterRecursiveComponent
            slideId={slide.id}
            content={slide.content}
            isPreview={false}
            isEditable={false}
            index={0}
            onContentChange={() => {}}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-400">
          <Image
            className="size-6 text-gray-500"
            aria-label="Descriptive text for the image"
          />
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
