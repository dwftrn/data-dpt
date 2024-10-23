import { useMutation } from '@tanstack/react-query'
import { insertPemilu } from '../service/pemilu.service'
import { toast } from 'sonner'

const useInsertPemilu = () => {
  return useMutation({
    mutationFn: insertPemilu,
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useInsertPemilu
