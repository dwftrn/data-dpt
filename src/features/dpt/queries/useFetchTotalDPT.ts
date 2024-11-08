import { fetchTotaDPT } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useFetchTotalDPT = () => {
  return useQuery({
    queryKey: ['count-dpt'],
    queryFn: async () => {
      const res = await fetchTotaDPT()

      if (!res) throw res
      if (res.error) throw res

      return res.data
    }
  })
}

export default useFetchTotalDPT
