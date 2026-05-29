'use client'

import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { GameCard } from './GameCard'
import { GameGridSkeleton, GameCardSkeleton } from './Skeletons'
import { useLibraryGames } from '@/hooks/useLibraryGames'
import { Library } from 'lucide-react'
import Link from 'next/link'
import { useRecommendations } from '@/hooks/useRecommendations'
import { RecommendedGames } from './RecommendedGames'

export function LibraryGrid() {
  const { ref, inView } = useInView()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isEmpty
  } = useLibraryGames()

  const likedGames = useMemo(() => {
    return data?.pages.flatMap((page) => page.games) ?? []
  }, [data])

  const {
    recommendations,
    loading: recommendationsLoading,
    enabled: recommendationsEnabled
  } = useRecommendations(likedGames)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-muted">
          <Library className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Your library is empty</h2>
        <p className="mt-2 text-muted-foreground max-w-xs">
          Games you like will appear here for quick access.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          Discover Games
        </Link>
      </div>
    )
  }

  if (status === 'pending') {
    return <GameGridSkeleton />
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.pages.map((page) =>
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
      {recommendationsEnabled && (
        <RecommendedGames
          games={recommendations}
          loading={recommendationsLoading}
        />
      )}
    </div>
  )
}
