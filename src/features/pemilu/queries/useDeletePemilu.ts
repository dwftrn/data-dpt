import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePemilu } from '../service/pemilu.service'
import { toast } from 'sonner'

const useDeletePemilu = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePemilu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pemilu-list'] })
      toast.success('Berhasil Menghapus Pemilu')
    },
    onError: (error) => {
      const msg = error.message.includes('0x0unk') ? 'Coba lagi dalam beberapa saat!' : error.message
      toast.error('Terjadi Kesalahan', { description: msg })
    }
  })
}

export default useDeletePemilu
