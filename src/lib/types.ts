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
    | "multiColumn"
    | "blank"
    | "imageAndText"
    | "heading1"
    | "heading2"
    | "heading3"
    | "title"
    | "heading4"
    | "table"
    | "blockquote"
    | "numberedList"
    | "bulletedList"
    | "code"
    | "link"
    | "quote"
    | "divider"
    | "calloutBox"
    | "todoList"
    | "bulletList"
    | "codeBlock"
    | "customButton"
    | "table"
    | "tableOfContents";

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

export interface Theme {
    name: string;
    fontFamily: string;
    fontColor: string;
    backgroundColor: string;
    slideBackgroundColor: string;
    accentColor: string;
    gradientBackground?: string;
    sidebarColor?: string;
    navbarColor?: string;
    type: "light" | "dark";
}

export interface OutlineCard {
    title: string;
    id: string;
    order: number;
}
