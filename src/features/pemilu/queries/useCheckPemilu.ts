import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { checkPemilu } from '../service/pemilu.service'

const useCheckPemilu = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await checkPemilu(id)
      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useCheckPemilu
