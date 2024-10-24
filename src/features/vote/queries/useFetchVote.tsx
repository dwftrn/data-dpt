import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fetchInputVote } from '../service/vote.service'

const useFetchVote = () => {
  return useMutation({
    mutationFn: fetchInputVote,
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useFetchVote
