export interface RecommendationGame {
  id: number
  name: string

  genres?: string[]
  themes?: string[]
  franchise?: string[]
  platforms?: string[]
  game_modes?: string[]

  rating?: number | null
  aggregated_rating?: number | null

  cover_url?: string | null
}

export interface RecommendationResult {
  game: RecommendationGame
  score: number
}

export interface UserProfile {
  genres: Record<string, number>
  themes: Record<string, number>
  franchises: Record<string, number>
  platforms: Record<string, number>
  gameModes: Record<string, number>
}