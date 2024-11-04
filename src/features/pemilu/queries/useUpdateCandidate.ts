import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateCandidate } from '../service/pemilu.service'

const useUpdateCandidate = () => {
  return useMutation({
    mutationFn: updateCandidate,
    onSuccess: () => {
      toast.success('Berhasil Meyunting Data Pemilihan')
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useUpdateCandidate
