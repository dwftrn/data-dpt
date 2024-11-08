import { fetchTotaTPS } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useFetchTotalTPS = () => {
  return useQuery({
    queryKey: ['tps-dpt'],
    queryFn: async () => {
      const res = await fetchTotaTPS()

      if (!res) throw res
      if (res.error) throw res

      return res.data
    }
  })
}

export default useFetchTotalTPS
