import { buildUserProfile } from './profile'
import { calculateGameScore } from './scoring'

import {
  RecommendationGame,
  RecommendationResult,
} from './types'

export function generateRecommendations(
  likedGames: RecommendationGame[],
  candidateGames: RecommendationGame[],
  limit: number = 20
): RecommendationResult[] {
  const profile = buildUserProfile(likedGames)

  const likedIds = new Set(likedGames.map((game) => game.id))

  const recommendations = candidateGames
    // remove jogos já curtidos
    .filter((game) => !likedIds.has(game.id))

    .map((game) => ({
      game,
      score: calculateGameScore(game, profile),
    }))

    .sort((a, b) => b.score - a.score)

    .slice(0, limit)

  return recommendations
}