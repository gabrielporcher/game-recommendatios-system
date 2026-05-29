'use client'

import { useState } from 'react'
import { SearchBar } from "@/components/SearchBar"
import { GameGrid } from "@/components/GameGrid"
import { SearchGrid } from "@/components/SearchGrid"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-12 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Discover Your Next Favorite Game
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse through a massive library of games, rated and curated for you.
          </p>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </header>

      {searchQuery.trim() ? (
        <SearchGrid query={searchQuery} />
      ) : (
        <GameGrid />
      )}
    </main>
  );
}
