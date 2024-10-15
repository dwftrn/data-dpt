import { fetchChart } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useFetchChart = () => {
  return useQuery({
    queryKey: ['chart'],
    queryFn: async () => {
      const response = await fetchChart()
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchChart
