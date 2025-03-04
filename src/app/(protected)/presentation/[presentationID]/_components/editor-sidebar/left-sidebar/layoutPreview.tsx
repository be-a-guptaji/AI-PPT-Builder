import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useState } from "react";

type LayoutPreviewProps = {};

const LayoutPreview = (props: LayoutPreviewProps) => {
    const [isLoading, setLoading] = useState(true);
    const { getOrderedSlides, reOrderedSlides } = useSlideStore();
    const slides = getOrderedSlides();

    return (
        <div className="w-64 h-full left-0 top-20 border-r overflow-y-auto">
            <ScrollArea className="size-full" suppressHydrationWarning>
                {isLoading ? (
                    <div className="w-full px-4 flex flex-col space-y-2">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ) : (
                    <div className="p-4 pb-32 space-y-6"></div>
                )}
            </ScrollArea>
        </div>
    );
};

export default LayoutPreview;
