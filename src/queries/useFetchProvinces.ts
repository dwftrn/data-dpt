import { fetchProvinces } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useFetchProvinces = () => {
  return useQuery({
    queryKey: ['province'],
    queryFn: async () => {
      const response = await fetchProvinces()
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchProvinces
