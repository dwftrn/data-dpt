// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'sonner'
// import { updateVote } from '../service/vote.service'

// const useUpdateVote = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: updateVote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ exact: false, queryKey: ['votes'] })
//       toast.success('Berhasil Menyunting Suara')
//     },
//     onError: () => {
//       toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
//     }
//   })
// }

// export default useUpdateVote

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UpdateVote, updateVote, Vote, VoteDetail } from '../service/vote.service'
import { CommonResponse } from '@/api/services'
import { useSearchParams } from 'react-router-dom'

const useUpdateVote = () => {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const subdistrict = searchParams.get('subdistrict') || ''
  const pemilu = searchParams.get('pemilu') || ''

  const votesQueryKey = ['votes', pemilu, subdistrict] as const

  return useMutation({
    mutationFn: updateVote,
    onMutate: async (newVote: UpdateVote) => {
      // Cancel any outgoing refetches
      await Promise.all([
        queryClient.cancelQueries({ queryKey: votesQueryKey }),
        queryClient.cancelQueries({ queryKey: ['votes-detail', newVote.id] })
      ])

      // Snapshot previous values
      const previousVotes = queryClient.getQueryData<CommonResponse<Vote[]>>(votesQueryKey)
      const previousVoteDetail = queryClient.getQueryData<VoteDetail>(['votes-detail', newVote.id])

      // Optimistically update votes list
      if (previousVotes) {
        queryClient.setQueryData<CommonResponse<Vote[]>>(votesQueryKey, (old) => {
          if (!old?.data) return previousVotes

          return {
            ...old,
            data: old.data.map((vote) => {
              if (vote.id_suara !== newVote.id) return vote

              const updatedVote = { ...vote }
              const updateFields: (keyof UpdateVote)[] = ['data_paslon', 'sah', 'tidak_sah', 'status', 'alasan_reject']

              updateFields.forEach((field) => {
                if (field in newVote && newVote[field] !== undefined) {
                  // @ts-expect-error - Dynamic property assignment
                  updatedVote[field] = newVote[field]
                }
              })

              return updatedVote
            })
          }
        })
      }

      // Optimistically update vote detail
      if (previousVoteDetail) {
        queryClient.setQueryData<VoteDetail>(['votes-detail', newVote.id], (old) => {
          if (!old) return previousVoteDetail

          const updatedVoteDetail = { ...old }
          const updateFields: (keyof UpdateVote)[] = ['data_paslon', 'sah', 'tidak_sah', 'status', 'alasan_reject']

          updateFields.forEach((field) => {
            if (field in newVote && newVote[field] !== undefined) {
              // @ts-expect-error - Dynamic property assignment
              updatedVoteDetail[field] = newVote[field]
            }
          })

          return updatedVoteDetail
        })
      }

      return { previousVotes, previousVoteDetail }
    },
    onError: (error, _newVote, context) => {
      // Roll back to the previous state on error
      if (context?.previousVotes) {
        queryClient.setQueryData(['votes'], context.previousVotes)
      }

      // Show error message with more specific details if available
      const errorMessage = error instanceof Error ? error.message : 'Coba lagi dalam beberapa saat'
      toast.error('Terjadi Kesalahan', { description: errorMessage })
    },
    onSuccess: () => {
      toast.success('Berhasil Menyunting Suara')

      // Immediately invalidate to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: ['votes']
      })
    }
  })
}

export default useUpdateVote
