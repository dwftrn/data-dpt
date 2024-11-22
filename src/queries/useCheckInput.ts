import { checkIsCanInput } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useCheckInput = () => {
  return useQuery({
    queryKey: ['is_can_input'],
    queryFn: async () => {
      const response = await checkIsCanInput()
      if (!response) throw response
      if (response.error) throw response

      return response.data.is_can_input
    }
  })
}

export default useCheckInput
