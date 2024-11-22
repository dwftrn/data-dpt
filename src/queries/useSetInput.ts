import { setIsCanInput } from '@/api/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const useSetInput = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: setIsCanInput,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['is_can_input'] })
      toast.success(variables === 0 ? 'Berhasil Mematikan Input Suara' : 'Berhasil Mengaktifkan Input Suara')
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useSetInput
