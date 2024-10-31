import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateVote } from '../service/vote.service'

const useUpdateVote = () => {
  return useMutation({
    mutationFn: updateVote,
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useUpdateVote
