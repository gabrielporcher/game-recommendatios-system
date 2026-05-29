import { useInfiniteQuery } from '@tanstack/react-query'
import { gameService } from '@/services/gameService'
import { useLikes } from './useLikes'

export function useLibraryGames() {
  const { likedGameIds } = useLikes()

  const query = useInfiniteQuery({
    queryKey: ['library-games', likedGameIds],
    queryFn: ({ pageParam = 0 }) => 
      gameService.getLikedGames(likedGameIds, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: true, // Sempre habilitado para podermos lidar com o estado vazio internamente
  })

  return {
    ...query,
    isEmpty: likedGameIds.length === 0
  }
}
