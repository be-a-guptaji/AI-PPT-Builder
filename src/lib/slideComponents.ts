import { v4 as uuidv4 } from "uuid";
import { ContentType } from "./types";

export const Heading1 = {
  id: uuidv4(),
  type: "heading1" as ContentType,
  name: "Heading1",
  content: "",
  placeholder: "Heading1",
};

export const Heading2 = {
  id: uuidv4(),
  type: "heading2" as ContentType,
  name: "Heading2",
  content: "",
  placeholder: "Heading2",
};

export const Heading3 = {
  id: uuidv4(),
  type: "heading3" as ContentType,
  name: "Heading3",
  content: "",
  placeholder: "Heading3",
};

export const Heading4 = {
  id: uuidv4(),
  type: "heading4" as ContentType,
  name: "Heading4",
  content: "",
  placeholder: "Heading4",
};

export const Title = {
  id: uuidv4(),
  type: "title" as ContentType,
  name: "Title",
  content: "",
  placeholder: "title",
};

export const Paragraph = {
  id: uuidv4(),
  type: "paragraph" as ContentType,
  name: "Paragraph",
  content: "",
  placeholder: "Start Typing",
};

export const Table = {
  id: uuidv4(),
  type: "table" as ContentType,
  name: "Table",
  initialRows: 2,
  initialColumns: 2,
  content: [],
};

export const Blockquote = {
  id: uuidv4(),
  type: "blockquote" as ContentType,
  name: "Blockquote",
  content: "",
  placeholder: "type here",
};

export const CustomImage = {
  id: uuidv4(),
  type: "image" as ContentType,
  name: "Image",
  content:
    "",
  alt: "Image",
};

export const NumberedListComponent = {
  id: uuidv4(),
  type: "numberedList" as ContentType,
  name: "Numbered List",
  content: ["First item", "Second item", "Third item"],
};

export const BulletListComponent = {
  id: uuidv4(),
  type: "bulletList" as ContentType,
  name: "Bullet List",
  content: ["First item", "Second item", "Third item"],
};

export const TodoListComponent = {
  id: uuidv4(),
  type: "todoList" as ContentType,
  name: "Todo List",
  content: ["[ ] Task 1", "[ ] Task 2", "[ ] Task 3"],
};


export const CalloutBoxComponent = {
  id: uuidv4(),
  type: "calloutBox" as ContentType,
  name: "Callout Box",
  content: "This is a callout box",
};

export const CodeBlockComponent = {
  id: uuidv4(),
  type: "codeBlock" as ContentType,
  name: "Code Block",
  language: "javascript",
  content: "console.log('Hello World!');",

};

export const CustomButtonComponent = {
  id: uuidv4(),
  type: "customButton" as ContentType,
  name: "Custom Button",
  content: "Click me",
  link: "#",
  bgColor: "#3b82f6",
  isTransparent: false,
};

export const TableOfContentsComponent = {
  id: uuidv4(),
  type: "tableOfContents" as ContentType,
  name: "Table of Contents",
  content: [
      "Section1",
      "Section2",
      "Section3"
    
  ],
};

export const DividerComponent = {
  id: uuidv4(),
  type: "divider" as ContentType,
  name: "Divider",
  content: "",
};


export const ResizableColumn =   {
  id: uuidv4(),
  type: "resizable-column" as ContentType,
  name: "Text and image",
  className: "border",
  content: [
    {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "paragraph" as ContentType,
          name: "Paragraph",
          content: "",
          placeholder: "Start typing...",
        },
      ],
    },
    {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "paragraph" as ContentType,
          name: "Paragraph",
          content: "",
          placeholder: "Start typing...",
        },
      ],
    },
  ],
};