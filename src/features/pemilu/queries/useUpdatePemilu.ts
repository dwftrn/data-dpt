import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updatePemilu } from '../service/pemilu.service'

const useUpdatePemilu = () => {
  return useMutation({
    mutationFn: updatePemilu,
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useUpdatePemilu
