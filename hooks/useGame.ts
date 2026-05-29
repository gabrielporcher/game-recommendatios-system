import { useQuery } from '@tanstack/react-query'
import { gameService } from '@/services/gameService'

export function useGame(id: string) {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => gameService.getGameById(id),
    enabled: !!id,
  })
}
