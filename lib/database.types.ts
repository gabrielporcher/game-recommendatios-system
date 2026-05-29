export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string
          name: string
          release_date: string | null
          rating: number | null
          aggregated_rating: number | null
          genres: string[] | null
          themes: string[] | null
          franchise: string | null
          publisher: string | null
          platforms: string[] | null
          player_perspectives: string[] | null
          game_modes: string[] | null
          cover_url: string | null
          summary: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          release_date?: string | null
          rating?: number | null
          aggregated_rating?: number | null
          genres?: string[] | null
          themes?: string[] | null
          franchise?: string | null
          publisher?: string | null
          platforms?: string[] | null
          player_perspectives?: string[] | null
          game_modes?: string[] | null
          cover_url?: string | null
          summary?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          release_date?: string | null
          rating?: number | null
          aggregated_rating?: number | null
          genres?: string[] | null
          themes?: string[] | null
          franchise?: string | null
          publisher?: string | null
          platforms?: string[] | null
          player_perspectives?: string[] | null
          game_modes?: string[] | null
          cover_url?: string | null
          summary?: string | null
          created_at?: string
        }
      }
      user_liked_games: {
        Row: {
          user_id: string
          game_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          game_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          game_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Game = Database['public']['Tables']['games']['Row']
export type UserLikedGame = Database['public']['Tables']['user_liked_games']['Row']
