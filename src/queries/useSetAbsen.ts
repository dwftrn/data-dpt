import { setIsCanAbsen } from '@/api/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const useSetAbsen = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: setIsCanAbsen,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['is_can_absen'] })
      toast.success(variables === 0 ? 'Berhasil Mematikan Absen' : 'Berhasil Mengaktifkan Absen')
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useSetAbsen
