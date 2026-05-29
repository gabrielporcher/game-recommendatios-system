'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { GameCard } from './GameCard'
import { GameGridSkeleton, GameCardSkeleton } from './Skeletons'
import { useSearchGames } from '@/hooks/useSearchGames'
import { SearchX } from 'lucide-react'

interface SearchGridProps {
  query: string
}

export function SearchGrid({ query }: SearchGridProps) {
  const { ref, inView } = useInView()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useSearchGames(query)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  // Se a query for vazia, não mostramos nada (HomeGrid assume)
  if (!query.trim()) return null

  if (status === 'pending') {
    return <GameGridSkeleton />
  }

  if (status === 'error') {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-destructive/10 p-8 text-destructive">
        <p className="font-bold">Error searching games</p>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    )
  }

  const hasResults = data?.pages[0]?.games.length > 0

  if (!hasResults && !isFetchingNextPage) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-muted">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">No games found</h2>
        <p className="mt-2 text-muted-foreground max-w-xs">
          We couldn't find any games matching "{query}".
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.pages.map((page) =>
          page.games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        )}
        
        {isFetchingNextPage && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <GameCardSkeleton key={`loading-${i}`} />
            ))}
          </>
        )}
      </div>

      <div ref={ref} className="h-10 w-full" />
    </div>
  )
}
