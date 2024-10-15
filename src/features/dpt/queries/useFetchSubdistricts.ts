import { fetchSubdistricts } from '@/api/services'
import { useMutation } from '@tanstack/react-query'

const useFetchSubdistricts = () => {
  return useMutation({
    mutationFn: async (districtId: string) => {
      const response = await fetchSubdistricts(districtId)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchSubdistricts
