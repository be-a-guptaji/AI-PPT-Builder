"use server";

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
