import { supabase } from '@/lib/supabase'

export const likeService = {
  async toggleLike(userId: string, gameId: string, isLiked: boolean) {
    if (isLiked) {
      const { error } = await supabase
        .from('user_liked_games')
        .delete()
        .match({ user_id: userId, game_id: gameId })
      
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('user_liked_games')
        .insert({ user_id: userId, game_id: gameId })

      if (error) throw error
    }
  },

  async getUserLikedGames(userId: string) {
    const { data, error } = await supabase
      .from('user_liked_games')
      .select('game_id')
      .eq('user_id', userId)

    if (error) throw error
    return data.map(item => item.game_id)
  }
}
