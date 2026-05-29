import { useInfiniteQuery } from '@tanstack/react-query'
import { gameService } from '@/services/gameService'
import { useDebounce } from './useDebounce'

export function useSearchGames(query: string) {
  const debouncedQuery = useDebounce(query, 400)

  return useInfiniteQuery({
    queryKey: ['search-games', debouncedQuery],
    queryFn: ({ pageParam = 0 }) => 
      gameService.searchGames(debouncedQuery, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: debouncedQuery.trim().length > 0,
  })
}
