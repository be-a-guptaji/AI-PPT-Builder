import { v4 as uuidv4 } from "uuid";
import { ContentType } from "./types";

export const BlankCard = {
  slideName: "Blank card",
  type: "blank-card",
  className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
    ],
  },
};

export const AccentLeft = {
  slideName: "Accent left",
  type: "accentLeft",
  className:"min-h-[300px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    restrictDropTo: true,
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Resizable column",
        restrictToDrop: true,
        content: [
          {
            id: uuidv4(),
            type: "image" as ContentType,
            name: "Image",
            content:
              "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Title",
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
        ],
      },
    ],
  },
};

export const AccentRight = {
  slideName: "Accent Right",
  type: "accentRight",
  className:"min-h-[300px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Resizable column",
        restrictToDrop: true,
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
          {
            id: uuidv4(),
            type: "image" as ContentType,
            name: "Image",
            restrictToDrop: true,
            content:
              "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Title",
          },
        ],
      },
    ],
  },
};

export const ImageAndText = {
  slideName: "Image and text",
  type: "imageAndText",
  className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Image and text",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
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
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
        ],
      },
    ],
  },
};

export const TextAndImage = {
  slideName: "Text and image",
  type: "textAndImage",
  className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "",
            content: [
              {
                id: uuidv4(),
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const TwoColumns = {
  slideName: "Two columns",
  type: "twoColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
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
  },
};

export const TwoColumnsWithHeadings = {
  slideName: "Two columns with headings",
  type: "twoColumnsWithHeadings",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
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
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
      },
    ],
  },
};

export const ThreeColumns = {
  slideName: "Three column",
  type: "threeColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "",
            content: "",
            placeholder: "Start typing...",
          },
        ],
      },
    ],
  },
};


export const ThreeColumnsWithHeadings = {
  slideName: "Three columns with headings",
  type: "threeColumnsWithHeadings",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
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
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
      },
    ],
  },
};



export const FourColumns = {
  slideName: "Four column",
  type: "fourColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
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
  },
};

export const TwoImageColumns = {
  slideName: "Two Image Columns",
  type: "twoImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
      },
    ],
  },
};


export const ThreeImageColumns = {
  slideName: "Three Image Columns",
  type: "threeImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
      },
    ],
  },
};

export const FourImageColumns = {
  slideName: "Four Image Columns",
  type: "fourImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
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
      },
    ],
  },
};

export const TableLayout = {
  slideName: "Table Layout",
  type: "tableLayout",
  className:
    "p-8 mx-auto flex flex-col justify-center items-center min-h-[400px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "table" as ContentType,
        name: "Table",
        initialRowSizes: 2,
        initialColumnSizes: 2,
        content: [],
      },
    ],
  },
};
