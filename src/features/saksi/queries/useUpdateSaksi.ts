import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { saksiService } from '../services/saksi.service'

const useUpdateSaksi = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saksiService.updateSaksi,
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: false, queryKey: ['saksi'] })
      toast.success('Berhasil Menyunting Saksi')
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useUpdateSaksi
