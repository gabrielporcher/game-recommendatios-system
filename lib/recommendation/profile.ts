import { RecommendationGame, UserProfile } from './types'

const incrementMap = (
  map: Record<string, number>,
  values?: string[]
) => {
  if (!values) return

  values.forEach((value) => {
    map[value] = (map[value] || 0) + 1
  })
}

export function buildUserProfile(
  likedGames: RecommendationGame[]
): UserProfile {
  const profile: UserProfile = {
    genres: {},
    themes: {},
    franchises: {},
    platforms: {},
    gameModes: {},
  }

  likedGames.forEach((game) => {
    incrementMap(profile.genres, game.genres)
    incrementMap(profile.themes, game.themes)
    incrementMap(profile.franchises, game.franchise)
    incrementMap(profile.platforms, game.platforms)
    incrementMap(profile.gameModes, game.game_modes)
  })

  return profile
}