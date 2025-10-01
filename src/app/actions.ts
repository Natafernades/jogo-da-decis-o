"use server";

import {
  getNominationRecommendation,
  type RecommendationInput,
  type RecommendationOutput,
} from "@/ai/flows/ai-game-recommendation";

export async function getRecommendation(
  input: RecommendationInput
): Promise<RecommendationOutput | { error: string }> {
  try {
    const recommendation = await getNominationRecommendation(input);
    return recommendation;
  } catch (error) {
    console.error("Error getting AI recommendation:", error);
    return { error: "Failed to get recommendation from AI." };
  }
}
