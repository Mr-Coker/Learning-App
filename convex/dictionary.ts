"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";

export const lookupWord = action({
  args: {
    word: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = 
      "Act exclusively as a junior school lexicon vocabulary tutor for kids aged 12-15. " +
      "Do not engage in casual chat conversation. If a word is submitted, parse it strictly into three clear text rows: " +
      "1. SIMPLE DEFINITION (written in highly clear, digestible basic language), " +
      "2. SYNONYMS (3-4 basic matching alternative terms), and " +
      "3. EXAMPLE (A sentence applying the word specifically within a middle school context).";

    const prompt = `Define the word: "${args.word}"`;

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
