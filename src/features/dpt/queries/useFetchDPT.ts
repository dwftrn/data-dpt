import { fetchDPT } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useFetchDPT = () => {
  return useQuery({
    queryKey: ['dpt'],
    queryFn: async () => {
      const response = await fetchDPT()
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchDPT
