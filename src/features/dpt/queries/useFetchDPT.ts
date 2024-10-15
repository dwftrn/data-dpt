import { DPTQuery, fetchDPT } from '@/api/services'
import { useMutation } from '@tanstack/react-query'

const useFetchDPT = () => {
  return useMutation({
    mutationFn: async (query: DPTQuery) => {
      const response = await fetchDPT(query)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchDPT
