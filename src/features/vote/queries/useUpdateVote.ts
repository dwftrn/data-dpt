import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateVote } from '../service/vote.service'

const useUpdateVote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: false, queryKey: ['votes'] })
      toast.success('Berhasil Menyunting Suara')
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useUpdateVote
