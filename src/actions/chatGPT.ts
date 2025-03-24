"use server";

import client from "@/lib/prisma";
import { ContentItem, ContentType, ReturnProps, Slide } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { openai } from "./openAI";
export const generateCreativePrompt = async (
  userPrompt: string
): Promise<ReturnProps> => {
  const finalPrompt = `Create a coherent and relevant outline for the following prompt: ${userPrompt} . 
    
    The outline should consist of more than 5 points, with each point written as a single sentence. 
    Ensure the outline is well-structured and directly related to the topic.
    Return the outout in the following JSON format:
    
    {
        "outlines": [
            "Point 1",
            "Point 2",
            "Point 3",
            "Point 4",
            "Point 5",
            ]
            }
            
            Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
            `;

  try {
    const completion = openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      store: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that generates outline for presentation.",
        },
        { role: "user", content: finalPrompt },
      ],
      max_tokens: 1000,
      temperature: 0.0,
    });

    const responseContent = (await completion)?.choices?.[0]?.message?.content;

    if (responseContent) {
      try {
        const jsonResponse = JSON.parse(responseContent);
        return { status: 200, data: jsonResponse };
      } catch (error) {
        return {
          status: 500,
          error: "Failed to parse JSON response" + error,
        };
      }
    }

    return {
      status: 400,
      error: "No response generated",
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal Server Error" + error,
    };
  }
};

const findImageComponents = (contentObject: ContentItem): ContentItem[] => {
  const images = [];

  if (contentObject.type === "image") {
    images.push(contentObject);
  }

  if (Array.isArray(contentObject.content)) {
    contentObject.content.forEach((child) => {
      images.push(...findImageComponents(child as ContentItem));
    });
  } else if (
    contentObject.content &&
    typeof contentObject.content === "object"
  ) {
    images.push(...findImageComponents(contentObject.content));
  }

  return images;
};

const generateImageURL = async (prompt: string): Promise<string> => {
  try {
    const improvedPrompt = `
        Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

        Description: ${prompt}

        Important Notes:
        - The image must be in a photorealistic style and visually compelling.
        - Ensure all text, signs, or visible writings in the image are in English.
        - Pay special attention to lighting, shadows, and texture to make the image as lifelike as possible.
        - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentations.
        - Focus on accurate depiction the concept described, including specific objects, environment, mood, and context. Maintain relevant to the description provided.

        Example Use Cases: Business presentations, educational slides, professional designs.
        `;

    const dalleResponse = await openai.images.generate({
      prompt: improvedPrompt,
      n: 1,
      size: "1024x1024",
    });

    return dalleResponse.data[0]?.url || "https://via.placeholder.com/1024";
  } catch (error) {
    console.error("Error generating image URL:", error);
    return "https://via.placeholder.com/1024";
  }
};

const repleaceImagesWithPlaceholders = async (layout: Slide): Promise<void> => {
  const imageComponents = findImageComponents(layout.content);

  for (const component of imageComponents) {
    component.content = await generateImageURL(
      component.alt || "Placeholder Image"
    );
  }
};

export const generateLayoutsJSON = async (
  outlines: string[]
): Promise<ReturnProps> => {
  const prompt = `
    ### Guidelines:
    
    You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and creative contents and give me the output in the JSON format expected.
    
    Our final JSON output is a combination of layouts and elements. The available LAYOUTS TYPES are as follows: "accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", "twoColumnsWithHeading", "fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout".

    The available CONTENT TYPES are "heading1", "heading2", "heading3", "heading4", "title", "paragraph", "table", "resizable-column", "image", "blockquote", "numberedList", "bulletList", "todoList", "calloutBox", "tableOfContents", "divider", "column".

    Use these outlines as a starting point for the content of the presentations:
    ${JSON.stringify(outlines)}

    The output must be an array of JSON objects.
    1. Write layouts based on the specific outline provided. Do not use types that are not mentioned in the example layouts.
    2. Ensure each layout is unique and creative.
    3. Adhere to the structure of existing layouts.
    4. Fill placeholder data into content fields where required.
    5. Generate unique image placeholders for the "content" property of image components and also alt text according to the outline.
    6. Ensure proper formatting and scheme alignment for the output JSON.
    7. First create LAYOUTS TYPES at the top most level of the JSON output as follows:
    ${JSON.stringify([
      {
        id: uuidv4(),
        slideName: "Blank card",
        type: "blank-card",
        className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
        content: {},
      },
    ])}
    8. The content property of each LAYOUTS TYPES should start with "column" and within the columns content property you can use any of the CONTENT TYPES I provided above. Resizable-column, column and other multi element contents should be an array because you can have more elements inside them nested. Static elements like title and paragraph should have content set to a string. Here is an example of what 1 layout with 1 column with 1 title inside would look like:
    ${JSON.stringify({
      id: uuidv4(),
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
    })}
    9. Here is the final example output for you to get an idea 
    ${JSON.stringify([
      {
        id: uuidv4(),
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
      },

      {
        id: uuidv4(),
        slideName: "Accent left",
        type: "accentLeft",
        className: "min-h-[300px]",
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
                  className:
                    "w-full h-full p-8 flex justify-center items-center",
                  placeholder: "Heading1",
                },
              ],
            },
          ],
        },
      },
    ])}
    
    For Images:
    - The alt text should describe the image clearly and concisely.
    - Focus on the main subject(s) of the image and any relevant details such as colors, shapes, people, or objects.
    - Ensure the alt text aligns with the content of the presentation slide it will be used on (e.g., professional, educational, business-related).
    - Avoid using terms like "image of" or "picture of," and instead focus on the content and meaning.

    Output of the layouts in JSON format. Ensure there are no duplicate layouts across the array.
    `;

  try {
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-2024-11-20",
      messages: [
        {
          role: "system",
          content: "You generate JSON layouts for presentations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 5000,
      temperature: 0.7,
    });

    const responseContent = completion?.choices?.[0]?.message?.content;

    if (!responseContent) {
      return {
        status: 500,
        error: "Failed to generate layouts",
      };
    }

    let JSONResponse;

    try {
      JSONResponse = JSON.parse(responseContent.replace(/```json|```/g, ""));

      await Promise.all(JSONResponse.map(repleaceImagesWithPlaceholders));
    } catch (error) {
      return {
        status: 500,
        error: "Failed to parse JSON response" + error,
      };
    }

    return {
      status: 200,
      data: JSONResponse,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal Server Error" + error,
    };
  }
};

export const generateLayout = async (
  projectId: string,
  theme: string
): Promise<ReturnProps> => {
  try {
    if (!projectId) {
      return {
        status: 400,
        error: "Project ID is required",
      };
    }

    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
        error: "User not authenticated",
      };
    }

    const userExists = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (!userExists || !userExists.subscription) {
      return {
        status: 403,
        error: !userExists?.subscription
          ? "User does not have a active subscription"
          : "User does not found in a database",
      };
    }

    const project = await client.project.findUnique({
      where: {
        id: projectId,
        isDeleted: false,
      },
    });

    if (!project) {
      return {
        status: 404,
        error: "Project not found",
      };
    }

    if (!project.outlines || project.outlines.length === 0) {
      return {
        status: 400,
        error: "Project dose not have outlines",
      };
    }

    const layouts = await generateLayoutsJSON(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }

    await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides: layouts.data,
        themeName: theme,
      },
    });

    return { status: 200, data: layouts.data };
  } catch (error) {
    return {
      status: 500,
      error: "Internal Server Error" + error,
    };
  }
};
