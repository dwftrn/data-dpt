import { useQuery } from '@tanstack/react-query'
import { fetchPemiluType } from '../service/pemilu.service'

const useFetchPemiluType = () => {
  return useQuery({
    queryKey: ['pemilu-type'],
    queryFn: async () => {
      const res = await fetchPemiluType()

      if (!res) throw res
      if (res.error) throw res

      return res.data
    }
  })
}

export default useFetchPemiluType
