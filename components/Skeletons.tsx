export function GameCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-card shadow-lg animate-pulse">
      <div className="aspect-[3/4] bg-muted" />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="h-5 w-5 rounded-full bg-muted" />
        </div>
        <div className="mb-3 flex gap-1">
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-4 w-12 rounded bg-muted" />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="h-4 w-10 rounded bg-muted" />
          <div className="h-3 w-8 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}

export function GameGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}
