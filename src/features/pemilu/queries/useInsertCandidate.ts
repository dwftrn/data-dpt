import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { insertCandidate } from '../service/pemilu.service'

const useInsertCandidate = () => {
  return useMutation({
    mutationFn: insertCandidate,
    onSuccess: () => {
      toast.success('Berhasil Menyimpan Data Pemilihan')
    },
    onError: () => {
      toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
    }
  })
}

export default useInsertCandidate
