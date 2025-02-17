import { Project } from "@prisma/client";

export interface Slide {
    id: string;
    slideName: string;
    type: string;
    constent: ContentItem;
    slideOrder: number;
    className?: string;
}

export type ContentType =
    | "column"
    | "resizable-column"
    | "text"
    | "paragraph"
    | "image"
    | "table"
    | "tableOfContents"
    | "multiColumn"
    | "blank"
    | "imageAndText"
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "title"
    | "blockquote"
    | "code"
    | "link"
    | "quote"
    | "divider"
    | "calloutBox"
    | "todoList"
    | "bulletList"
    | "numberedList"
    | "codeBlock"
    | "customButton";

export interface ContentItem {
    id: string;
    type: ContentType;
    name: string;
    content: ContentItem[] | string | string[] | string[][];
    initialRows?: number;
    initialColumns?: number;
    restrictedToDrop?: boolean;
    columns?: number;
    placeholder?: string;
    className?: string;
    alt?: string;
    callOutType?: "success" | "warning" | "info" | "question" | "caution";
    link?: string;
    code?: string;
    language?: string;
    bgColor?: string;
    isTransparent?: boolean;
}

export interface recentProjectsProp {
    data?: Project[] | undefined;
    status?: number;
    error?: string;
}
