'use client'

import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="group relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for games (e.g. Elden Ring, Zelda)..."
          className="h-14 w-full rounded-2xl bg-card pl-12 pr-12 text-lg outline-none ring-primary/20 transition-all focus:ring-4 border border-border"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 rounded-full p-1 hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  )
}
