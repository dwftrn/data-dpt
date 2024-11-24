import { fetchSubdistricts } from '@/api/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useFetchSubdistricts = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (districtId: string) => {
      const response = await fetchSubdistricts(districtId)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    },
    onSuccess: (data, districtId) => {
      queryClient.setQueryData(['subdistricts', districtId], data)
    }
  })
}

export default useFetchSubdistricts
