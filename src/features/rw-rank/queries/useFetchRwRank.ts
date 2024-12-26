import { useQuery } from '@tanstack/react-query'
import { rwService } from '../services/rw.service'

const useFetchRwRank = () => {
  return useQuery({
    queryKey: ['rw-rank'],
    queryFn: async () => {
      const res = await rwService.fetchRwRank()

      if (!res) throw res
      if (res.error) throw res

      return res.data
    }
  })
}

export default useFetchRwRank
