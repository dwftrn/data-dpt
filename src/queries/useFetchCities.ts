import { fetchCities } from '@/api/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useFetchCities = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (provinceId: string) => {
      const response = await fetchCities(provinceId)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    },
    onSuccess: (data, provinceId) => {
      queryClient.setQueryData(['cities', provinceId], data)
    }
  })
}

export default useFetchCities
