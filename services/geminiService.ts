
import { GoogleGenAI, Type } from "@google/genai";
import { GoalInput, GoalPlan } from "../types";

export const generateGoalPlan = async (input: GoalInput): Promise<GoalPlan> => {
  // Always create a fresh instance to ensure correct API key usage
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const today = new Date().toISOString().split('T')[0];
  
  const prompt = `
    Act as a world-class performance coach and strategist. 
    Create a highly detailed, structured, and realistic action plan for the following goal:
    - Topic/Aim: ${input.topic}
    - Category: ${input.category}
    - Difficulty/Current Level: ${input.difficulty}
    - Target Date: ${input.dueDate}
    - Current Date: ${today}
    
    CRITICAL INSTRUCTION: 
    Check if the timeframe (from today until ${input.dueDate}) is realistic for the goal "${input.topic}" given the user's current level (${input.difficulty}).
    If the time is too short for a human to realistically achieve high proficiency or completion, set "isTimeframeRealistic" to false and provide a helpful "timeframeWarning" explaining why and suggesting a better approach or extended timeline.

    The plan must include specific milestones tailored to the ${input.difficulty} level, actual resource names (e.g., Coursera courses, YouTube channels, books), daily habits, and common pitfalls.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["title", "summary", "difficulty", "isTimeframeRealistic", "milestones", "resources", "dailyHabits", "weeklyChecklist", "commonObstacles"],
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          isTimeframeRealistic: { type: Type.BOOLEAN },
          timeframeWarning: { type: Type.STRING, description: "Only provide if isTimeframeRealistic is false" },
          milestones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                timeframe: { type: Type.STRING }
              }
            }
          },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING },
                description: { type: Type.STRING },
                estimated_cost: { type: Type.STRING }
              }
            }
          },
          dailyHabits: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          weeklyChecklist: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          commonObstacles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                obstacle: { type: Type.STRING },
                solution: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as GoalPlan;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to generate your plan. This might be due to a complex request or API limit. Please try again with a simpler aim.");
  }
};
