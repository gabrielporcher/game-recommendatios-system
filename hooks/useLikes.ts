import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { likeService } from '@/services/likeService'
import { useAuthStore } from '@/stores/useAuthStore'

export function useLikes() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const { data: likedGameIds = [] } = useQuery({
    queryKey: ['likes', user?.id],
    queryFn: () => (user ? likeService.getUserLikedGames(user.id) : []),
    enabled: !!user,
  })

  const toggleLikeMutation = useMutation({
    mutationFn: ({ gameId, isLiked }: { gameId: string; isLiked: boolean }) => {
      if (!user) throw new Error('User must be logged in')
      return likeService.toggleLike(user.id, gameId, isLiked)
    },
    onMutate: async ({ gameId, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ['likes', user?.id] })

      const previousLikes = queryClient.getQueryData<string[]>(['likes', user?.id])

      queryClient.setQueryData(['likes', user?.id], (old: string[] = []) => {
        if (isLiked) {
          return old.filter((id) => id !== gameId)
        }
        return [...old, gameId]
      })

      return { previousLikes }
    },
    onError: (err, variables, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(['likes', user?.id], context.previousLikes)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', user?.id] })
    },
  })

  const isGameLiked = (gameId: string) => likedGameIds.includes(gameId)

  return {
    likedGameIds,
    toggleLike: (gameId: string) => {
      const isLiked = isGameLiked(gameId)
      toggleLikeMutation.mutate({ gameId, isLiked })
    },
    isGameLiked,
    isLoading: toggleLikeMutation.isPending,
  }
}
