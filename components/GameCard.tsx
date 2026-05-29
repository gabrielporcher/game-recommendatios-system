'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
import { Game } from '@/lib/database.types'
import { useLikes } from '@/hooks/useLikes'
import { cn } from '@/lib/utils'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const { toggleLike, isGameLiked } = useLikes()
  const liked = isGameLiked(game.id)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
      <Link href={`/game/${game.id}`} className="aspect-[3/4] overflow-hidden">
        {game.cover_url ? (
          <Image
            src={game.cover_url}
            alt={game.name}
            width={300}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link href={`/game/${game.id}`} className="hover:underline">
            <h3 className="line-clamp-1 font-bold leading-tight">{game.name}</h3>
          </Link>
          <button
            onClick={() => toggleLike(game.id)}
            className="group/heart rounded-full p-1 transition-colors hover:bg-red-500/10"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all",
                liked ? "fill-red-500 text-red-500" : "text-muted-foreground group-hover/heart:text-red-500"
              )}
            />
          </button>
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {game.genres?.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-semibold">
              {game.rating 
                ? (game.rating / 10).toFixed(1) 
                : game.aggregated_rating 
                ? (game.aggregated_rating / 10).toFixed(1) 
                : 'N/A'}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">
            {game.release_date ? new Date(game.release_date).getFullYear() : 'TBA'}
          </span>
        </div>
      </div>
    </div>
  )
}
