import { checkIsCanAbsen } from '@/api/services'
import { useQuery } from '@tanstack/react-query'

const useCheckAbsen = () => {
  return useQuery({
    queryKey: ['is_can_absen'],
    queryFn: async () => {
      const response = await checkIsCanAbsen()
      if (!response) throw response
      if (response.error) throw response

      return response.data.is_can_absen
    }
  })
}

export default useCheckAbsen
