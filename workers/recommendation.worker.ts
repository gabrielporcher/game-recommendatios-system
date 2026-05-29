/* eslint-disable no-restricted-globals */

import { generateRecommendations } from '@/recommendation/similarity'

self.onmessage = async (event: MessageEvent) => {
  const { type, payload } = event.data

  if (type === 'CALCULATE_RECOMMENDATIONS') {
    try {
      const { likedGames, candidateGames } = payload

      const recommendations = generateRecommendations(
        likedGames,
        candidateGames,
        20
      )

      self.postMessage({
        type: 'RECOMMENDATIONS_COMPLETE',
        payload: recommendations,
      })
    } catch (error) {
      self.postMessage({
        type: 'RECOMMENDATIONS_ERROR',
        payload: {
          message: 'Failed to generate recommendations',
        },
      })
    }
  }
}

export {}