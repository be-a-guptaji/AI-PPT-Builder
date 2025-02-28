"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

export const generateCreativePrompt = async (userPrompt: string) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

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

        const responseContent = (await completion)?.choices[0]?.message
            ?.content;

        if (responseContent) {
            try {
                const jsonResponse = JSON.parse(responseContent);
                return { status: 200, data: jsonResponse };
            } catch (error) {
                console.error("Failed to parse JSON response:", error);

                return {
                    status: 500,
                    error: "Failed to parse JSON response",
                };
            }
        }

        return {
            status: 400,
            error: "No response generated",
        };
    } catch (error) {
        console.error("Error generating creative prompt:", error);

        return {
            status: 500,
            error: "Internal Server Error",
        };
    }
};

export const generateLayoutsJSON = async () => {
    const prompt = ``;
};

export const generateLayout = async (projectId: string, theme: string) => {
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
        console.error("Error generating layout:", error);

        return {
            status: 500,
            error: "Internal Server Error",
        };
    }
};
