'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Star, Heart, Calendar, Users, Monitor, Gamepad2, Info } from 'lucide-react'
import { useGame } from '@/hooks/useGame'
import { useLikes } from '@/hooks/useLikes'
import { cn } from '@/lib/utils'

export default function GameDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: game, isLoading, error } = useGame(id as string)
  const { toggleLike, isGameLiked } = useLikes()
  const liked = isGameLiked(id as string)

  console.log(game)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="mb-8 h-10 w-32 rounded bg-muted" />
        <div className="grid gap-8 md:grid-cols-[400px_1fr]">
          <div className="aspect-[3/4] rounded-xl bg-muted" />
          <div className="flex flex-col gap-6">
            <div className="h-12 w-2/3 rounded bg-muted" />
            <div className="flex gap-4">
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-8 w-24 rounded bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-destructive">Game not found</h2>
        <button
          onClick={() => router.back()}
          className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Go back
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Library
      </button>

      <div className="grid gap-8 md:grid-cols-[400px_1fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted shadow-2xl">
          {game.cover_url ? (
            <Image
              src={game.cover_url}
              alt={game.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Info className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight lg:text-6xl">
                {game.name}
              </h1>
              <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-lg font-bold text-foreground">
                    {game.rating 
                      ? (game.rating / 10).toFixed(1) 
                      : game.aggregated_rating 
                      ? (game.aggregated_rating / 10).toFixed(1) 
                      : 'N/A'}
                  </span>
                </div>
                {game.release_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(game.release_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleLike(game.id)}
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all active:scale-95",
                liked
                  ? "border-red-500 bg-red-500/10 text-red-500"
                  : "border-muted-foreground/20 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500"
              )}
            >
              <Heart className={cn("h-7 w-7", liked && "fill-current")} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {game.genres?.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
              >
                {genre}
              </span>
            ))}
          </div>

          {game.summary && (
            <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <h2 className="mb-3 text-xl font-bold">About</h2>
              <p className="leading-relaxed text-muted-foreground">
                {game.summary}
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {game.platforms && (
              <div className="flex items-start gap-3 rounded-xl bg-card/50 p-4 ring-1 ring-border">
                <Monitor className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Platforms
                  </h3>
                  <p className="mt-1 text-sm font-medium">{game.platforms.join(', ')}</p>
                </div>
              </div>
            )}
            {game.game_modes && (
              <div className="flex items-start gap-3 rounded-xl bg-card/50 p-4 ring-1 ring-border">
                <Gamepad2 className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Game Modes
                  </h3>
                  <p className="mt-1 text-sm font-medium">{game.game_modes.join(', ')}</p>
                </div>
              </div>
            )}
            {game.player_perspectives && (
              <div className="flex items-start gap-3 rounded-xl bg-card/50 p-4 ring-1 ring-border">
                <Users className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Perspectives
                  </h3>
                  <p className="mt-1 text-sm font-medium">{game.player_perspectives.join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
