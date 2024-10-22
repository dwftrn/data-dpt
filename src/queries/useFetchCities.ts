import { fetchCities } from '@/api/services'
import { useMutation } from '@tanstack/react-query'

const useFetchCities = () => {
  return useMutation({
    mutationFn: async (provinceId: string) => {
      const response = await fetchCities(provinceId)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchCities
