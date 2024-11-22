import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { saksiService } from '../services/saksi.service'

const useDeleteSaksi = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saksiService.deleteSaksi,
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: false, queryKey: ['saksi'] })
      toast.success('Berhasil Menghapus Saksi')
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useDeleteSaksi
