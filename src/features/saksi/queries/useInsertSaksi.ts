import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { saksiService } from '../services/saksi.service'

const useInsertSaksi = () => {
  return useMutation({
    mutationFn: saksiService.insertSaksi,
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useInsertSaksi
