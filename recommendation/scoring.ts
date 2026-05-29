import { RecommendationGame, UserProfile } from './types'

const WEIGHTS = {
  genre: 5,
  theme: 3,
  franchise: 8,
  platform: 1,
  gameMode: 2,
  aggregatedRating: 0.05,
}

function calculateArrayScore(
  values: string[] | undefined,
  profileMap: Record<string, number>,
  weight: number
) {
  if (!values) return 0

  return values.reduce((total, value) => {
    return total + (profileMap[value] || 0) * weight
  }, 0)
}

export function calculateGameScore(
  game: RecommendationGame,
  profile: UserProfile
) {
  let score = 0

  score += calculateArrayScore(
    game.genres,
    profile.genres,
    WEIGHTS.genre
  )

  score += calculateArrayScore(
    game.themes,
    profile.themes,
    WEIGHTS.theme
  )

  score += calculateArrayScore(
    game.franchise,
    profile.franchises,
    WEIGHTS.franchise
  )

  score += calculateArrayScore(
    game.platforms,
    profile.platforms,
    WEIGHTS.platform
  )

  score += calculateArrayScore(
    game.game_modes,
    profile.gameModes,
    WEIGHTS.gameMode
  )

  // pequeno bônus de qualidade
  score += (game.aggregated_rating || 0) * WEIGHTS.aggregatedRating

  return score
}