import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { inputVote } from '../service/vote.service'

const useInputVote = () => {
  return useMutation({
    mutationFn: inputVote,
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useInputVote
