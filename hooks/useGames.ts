import { useInfiniteQuery } from '@tanstack/react-query'
import { gameService } from '@/services/gameService'

export function useGames() {
  return useInfiniteQuery({
    queryKey: ['games'],
    queryFn: ({ pageParam = 0 }) => gameService.getGames(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}
