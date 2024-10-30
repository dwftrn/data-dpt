import { useMutation } from '@tanstack/react-query'
import { inputC1 } from '../service/vote.service'
import { toast } from 'sonner'

const useInputC1 = () => {
  return useMutation({
    mutationFn: inputC1,
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useInputC1
