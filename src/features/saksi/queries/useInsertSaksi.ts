import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { saksiService } from '../services/saksi.service'

const useInsertSaksi = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saksiService.insertSaksi,
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: false, queryKey: ['saksi'] })
      toast.success('Berhasil Menambah Saksi')
    },
    onError: (error) => {
      if (error.message === 'Nomor Sudah Digunakan') {
        toast.error(error.message)
        return
      }
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useInsertSaksi
