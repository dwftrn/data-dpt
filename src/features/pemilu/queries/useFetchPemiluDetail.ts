import { useQuery } from '@tanstack/react-query'
import { fetchPemiluDetail } from '../service/pemilu.service'

const useFetchPemiluDetail = (id: string) => {
  const enabled = Boolean(id)

  return useQuery({
    queryKey: ['pemilu', id],
    queryFn: async () => {
      const res = await fetchPemiluDetail(id)

      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    enabled: enabled,
    retry: enabled ? 3 : false
  })
}

export default useFetchPemiluDetail
