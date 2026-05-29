import { Game } from '@/lib/database.types'
import { GameGridSkeleton } from './Skeletons'
import { GameCard } from './GameCard'

interface Props {
    games: Game[]
    loading?: boolean
}

export function RecommendedGames({ games, loading }: Props) {
    if (loading) {
        return <GameGridSkeleton />
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}