import { fetchPemilu } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useFetchPemilu = () => {
  return useQuery({
    queryKey: ['pemilu'],
    queryFn: async () => {
      const response = await fetchPemilu()
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchPemilu
