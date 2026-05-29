import { supabase } from '@/lib/supabase'
import { Game } from '@/lib/database.types'

export const gameService = {
  async getGames(page: number = 0, limit: number = 20) {
    const from = page * limit
    const to = from + limit - 1

    // Ordenação hierárquica:
    // 1. Rating (nota dos usuários) DESC
    // 2. Aggregated Rating (nota da crítica) DESC
    // 3. Release Date (mais recentes primeiro) DESC
    const { data, error, count } = await supabase
      .from('games')
      .select('*', { count: 'exact' })

      // evita jogos sem nota agregada
      .not('aggregated_rating', 'is', null)

      // ordenação principal
      .order('aggregated_rating', {
        ascending: false,
        nullsFirst: false,
      })

      // desempate
      .order('rating', {
        ascending: false,
        nullsFirst: false,
      })

      // jogos mais recentes ganham prioridade
      .order('release_date', {
        ascending: false,
        nullsFirst: false,
      })

      .range(from, to)

    if (error) {

      console.log(error)
      throw error
    }

    return {
      games: data as Game[],
      nextPage: data.length === limit ? page + 1 : undefined,
      totalCount: count
    }
  },

  async getGameById(id: string) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.log(error)
      throw error
    }
    return data as Game
  },

  async getLikedGames(gameIds: string[], page: number = 0, limit: number = 20) {
    if (gameIds.length === 0) return { games: [], nextPage: undefined, totalCount: 0 }

    const from = page * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('games')
      .select('*', { count: 'exact' })
      .in('id', gameIds)
      .order('name', { ascending: true }) // Na biblioteca pessoal, ordem alfabética costuma ser melhor
      .range(from, to)

    console.log('os gostados: ', data)

    if (error) throw error

    return {
      games: data as Game[],
      nextPage: data.length === limit ? page + 1 : undefined,
      totalCount: count
    }
  },

  async searchGames(query: string, page: number = 0, limit: number = 20) {
    if (!query.trim()) return { games: [], nextPage: undefined, totalCount: 0 }

    const from = page * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('games')
      .select('*', { count: 'exact' })
      .ilike('name', `%${query}%`)
      // Ordenação híbrida conforme solicitado
      .order('aggregated_rating', { ascending: false, nullsFirst: false })
      .order('rating', { ascending: false, nullsFirst: false })
      .order('release_date', { ascending: false, nullsFirst: false })
      .range(from, to)

    if (error) throw error

    return {
      games: data as Game[],
      nextPage: data.length === limit ? page + 1 : undefined,
      totalCount: count
    }
  },

  async getRecommendationCandidates(limit: number = 1000) {
    const { data, error } = await supabase
      .from('games')
      .select(`
      id,
      name,
      genres,
      themes,
      franchise,
      platforms,
      game_modes,
      aggregated_rating,
      rating,
      cover_url
    `)
      .not('aggregated_rating', 'is', null)
      .gte('aggregated_rating', 75)
      .order('aggregated_rating', { ascending: false })
      .limit(limit)

    if (error) throw error

    return data
  }
}
