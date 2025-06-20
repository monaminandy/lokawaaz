import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge";

const generateID = () => Math.random().toString(36).slice(2,15);

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
    {
        id: generateID(),
        role: "user",
        content: initialMessage.content
    },
    ...messages.map((message) => ({
        id: message.id || generateID(),
        role: message.role,
        content: message.content,
    })),
];

export async function POST(request: Request) {
    const { messages } =await request.json();
    const stream = await streamText({
        model: google("gemini-1.5-pro"),
        messages: buildGoogleGenAIPrompt(messages),
        temperature: 0.7,
    });
    return stream?. toDataStreamResponse();
    
}
