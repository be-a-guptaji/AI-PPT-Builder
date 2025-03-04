import { Slide, Theme } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Image } from "lucide-react"
import React from "react"

type ThumbnailPreviewProps = {
  slide: Slide
  theme: Theme
}

const ThumbnailPreview = ({ slide, theme }: ThumbnailPreviewProps) => {
  return (
    <div
      className={cn(
        "w-full relative aspect-video rounded-lg overflow-hidden transition-all duration-200 p-2"
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left h-[200%] w-[200%] overflow-hidden">
          This is a slide
        </div>
      ) : (
        <div className="w-full h-full bg-gray-400 flex items-center justify-center">
          <Image
            className="size-6 text-gray-500"
            aria-label="Descriptive text for the image"
          />
        </div>
      )}
    </div>
  )
}

export default ThumbnailPreview
