import { fetchDistricts } from '@/api/services'
import { useMutation } from '@tanstack/react-query'

const useFetchDistricts = () => {
  return useMutation({
    mutationFn: async (cityId: string) => {
      const response = await fetchDistricts(cityId)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchDistricts
