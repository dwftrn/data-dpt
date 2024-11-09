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
import { UpdateVote, updateVote, Vote } from '../service/vote.service'
import { CommonResponse } from '@/api/services'

const useUpdateVote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateVote,
    onMutate: async (newVote: UpdateVote) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ['votes']
      })

      // Snapshot the previous value
      const previousVotes = queryClient.getQueryData<CommonResponse<Vote[]>>(['votes'])

      // Optimistically update to the new value
      if (previousVotes) {
        queryClient.setQueryData<CommonResponse<Vote[]>>(['votes'], (old) => {
          if (!old) return previousVotes

          const updatedVotes = old.data.map((vote) => {
            if (vote.id_suara === newVote.id) {
              // Create updated vote object with optional properties
              const updatedVote = { ...vote }

              // Only update properties that are provided in newVote
              if (newVote.data_paslon !== undefined) {
                updatedVote.data_paslon = newVote.data_paslon
              }
              if (newVote.sah !== undefined) {
                updatedVote.sah = newVote.sah
              }
              if (newVote.tidak_sah !== undefined) {
                updatedVote.tidak_sah = newVote.tidak_sah
              }
              if (newVote.status !== undefined) {
                updatedVote.status = newVote.status
              }
              if (newVote.alasan_reject !== undefined) {
                updatedVote.alasan_reject = newVote.alasan_reject
              }

              return updatedVote
            }
            return vote
          })

          return {
            ...old,
            data: updatedVotes
          }
        })
      }

      return { previousVotes }
    },
    onError: (_err, _newVote, context) => {
      // Roll back to the previous state on error
      if (context?.previousVotes) {
        queryClient.setQueryData(['votes'], context.previousVotes)
      }
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    },
    onSuccess: () => {
      toast.success('Berhasil Menyunting Suara')
    },
    onSettled: () => {
      // Refetch to ensure cache is in sync with server
      queryClient.invalidateQueries({
        queryKey: ['votes']
      })
    }
  })
}

export default useUpdateVote
