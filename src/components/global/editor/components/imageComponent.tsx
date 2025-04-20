import Image from "next/image";
import React from "react";
import UploadImage from "./uploadImage";

type CustomImageProps = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  isEditable?: boolean;
  contentId: string;
  onContentChange: (
    contentID: string,
    newContent: string | string[] | string[][]
  ) => void;
};

const CustomImage = ({
  alt,
  contentId,
  src,
  className,
  isEditable = true,
  isPreview = false,
  onContentChange,
}: CustomImageProps) => {
  return (
    <div className={`group relative size-full rounded-lg`}>
      <Image
        src={src}
        alt={alt}
        className={`size-full rounded-lg object-cover ${className}`}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
      />
      {!isPreview && isEditable && (
        <div className="absolute top-0 right-0 hidden group-hover:block">
          <UploadImage
            contentId={contentId}
            onContentChange={onContentChange}
          />
        </div>
      )}
    </div>
  );
};

export default CustomImage;
