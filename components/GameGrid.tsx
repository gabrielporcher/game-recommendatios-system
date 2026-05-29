'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { GameCard } from './GameCard'
import { GameGridSkeleton, GameCardSkeleton } from './Skeletons'
import { useGames } from '@/hooks/useGames'

export function GameGrid() {
  const { ref, inView } = useInView()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useGames()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (status === 'pending') {
    return <GameGridSkeleton />
  }

  if (status === 'error') {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-destructive/10 p-8 text-destructive">
        <p className="font-bold">Error loading games</p>
        <p className="text-sm">{(error as Error).message}</p>
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
