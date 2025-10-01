'use server';

/**
 * @fileOverview AI-powered player recommendation flow for the "Jogo da Decisão" game.
 *
 * This file exports:
 * - `getNominationRecommendation`: A function to get nomination recommendations based on player voting patterns.
 * - `RecommendationInput`: The input type for the recommendation function.
 * - `RecommendationOutput`: The output type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendationInputSchema = z.object({
  playerNames: z.array(z.string()).describe('Array of player names in the game.'),
  votingHistory: z.record(z.string(), z.record(z.string(), z.number())).describe(
    'A record of each player and their voting history, including who they voted for and how many times.'
  ),
  currentPlayer: z.string().describe('The name of the current player.'),
});
export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  recommendedPlayers: z
    .array(z.string())
    .describe('An array of player names recommended for nomination.'),
  reasoning: z.string().describe('Explanation of why these players are recommended.'),
});
export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

export async function getNominationRecommendation(
  input: RecommendationInput
): Promise<RecommendationOutput> {
  return nominationRecommendationFlow(input);
}

const nominationRecommendationPrompt = ai.definePrompt({
  name: 'nominationRecommendationPrompt',
  input: {schema: RecommendationInputSchema},
  output: {schema: RecommendationOutputSchema},
  prompt: `You are an AI assistant designed to recommend players for nomination in the game "Jogo da Decisão".

  Based on the voting history provided, identify players who have been frequently voted against and provide a recommendation for nomination.  Consider players that the current player has voted against previously.

  Voting History:
  {{#each votingHistory}}
    Player {{key}} voted:
    {{#each this}}
      - {{key}}: {{this}}
    {{/each}}
  {{/each}}

Current Player: {{currentPlayer}}

  The players in the game are:
  {{#each playerNames}}
  - {{this}}
  {{/each}}

  Reasoning: Explain why you are recommending these players, including their voting history and how it impacts the game.

  Recommended Players: A list of recommended player names based on the above reasoning. The list should not contain the current player.

  Output in JSON format:
  {
    "recommendedPlayers": ["player1", "player2"],
    "reasoning": "Explanation of why these players are recommended."
  }`,
});

const nominationRecommendationFlow = ai.defineFlow(
  {
    name: 'nominationRecommendationFlow',
    inputSchema: RecommendationInputSchema,
    outputSchema: RecommendationOutputSchema,
  },
  async input => {
    const {output} = await nominationRecommendationPrompt(input);
    return output!;
  }
);
