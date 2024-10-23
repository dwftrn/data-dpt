import { useQuery } from '@tanstack/react-query'
import { fetchPemiluWithCandidate } from '../service/pemilu.service'

const useFetchPemilu = () => {
  return useQuery({
    queryKey: ['pemilu-list'],
    queryFn: async () => {
      const res = await fetchPemiluWithCandidate()

      if (!res) throw res
      if (res.error) throw res

      return res.data
    }
  })
}

export default useFetchPemilu
