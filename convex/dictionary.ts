"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";

export const lookupWord = action({
  args: {
    word: v.string(),
    pageContext: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = 
      "System Instruction: You are the EduSphere Contextual Assistant for students aged 12-15. " +
      "You will receive a target word AND the raw text string of the lesson page the student is currently reading. " +
      "Your mission is to explain the meaning of the target word SPECIFICALLY based on how it functions inside that page context. " +
      "Maintain our three-row output structure: " +
      "1. SIMPLE DEFINITION (gated by the lesson context), " +
      "2. CAPSULE SYNONYMS (simplified alternatives that fit the sentence structure), and " +
      "3. EDUSPHERE EXAMPLES (reapplying the contextual meaning beautifully).";

    const prompt = `Lesson Page Context:\n"""\n${args.pageContext}\n"""\n\nTarget Word: "${args.word}"`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      return { result: response.text || "No definition found." };
    } catch (error: any) {
      console.error("Gemini API lookup failed:", error);
      throw new Error(error.message || "Failed to look up word via Gemini API");
    }
  },
});
