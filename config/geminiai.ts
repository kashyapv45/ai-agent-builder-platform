import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY");
}

export const geminiai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});