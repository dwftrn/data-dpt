import { fetchTps } from '@/api/services'
import { useMutation } from '@tanstack/react-query'

const useFetchTps = () => {
  return useMutation({
    mutationFn: async (subdistrictId: string) => {
      const response = await fetchTps(subdistrictId)
      if (!response) throw response
      if (response.error) throw response

      return response.data
    }
  })
}

export default useFetchTps
