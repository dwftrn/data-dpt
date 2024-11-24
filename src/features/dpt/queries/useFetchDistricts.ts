import { fetchDistricts } from '@/api/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useFetchDistricts = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (cityId: string) => {
      const response = await fetchDistricts(cityId)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    },
    onSuccess: (data, cityId) => {
      queryClient.setQueryData(['districts', cityId], data)
    }
  })
}

export default useFetchDistricts
