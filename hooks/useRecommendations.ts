'use client'

import { useEffect, useMemo, useState } from 'react'

import { gameService } from '@/services/gameService'
import { Game } from '@/lib/database.types'

export function useRecommendations(likedGames: Game[]) {
  const [recommendations, setRecommendations] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)

  const enabled = likedGames.length >= 5

  useEffect(() => {
    if (!enabled) return

    let worker: Worker

    async function calculateRecommendations() {
      setLoading(true)

      const candidateGames =
        await gameService.getRecommendationCandidates()

      worker = new Worker(
        new URL('../workers/recommendation.worker.ts', import.meta.url)
      )

      worker.postMessage({
        type: 'CALCULATE_RECOMMENDATIONS',
        payload: {
          likedGames,
          candidateGames,
        },
      })

      worker.onmessage = (event) => {
        if (event.data.type === 'RECOMMENDATIONS_COMPLETE') {
          setRecommendations(
            event.data.payload.map((item: any) => item.game)
          )

          setLoading(false)
        }
      }
    }

    calculateRecommendations()

    return () => {
      worker?.terminate()
    }
  }, [enabled, likedGames])

  return {
    recommendations,
    loading,
    enabled,
  }
}