import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { saksiService } from '../services/saksi.service'

const useFetchSaksi = (params: { page: number; per_page: number; search?: string }) => {
  return useQuery({
    queryKey: ['saksi', ...Object.values(params)],
    queryFn: async () => {
      const res = await saksiService.fetchSaksi(params)
      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    placeholderData: keepPreviousData
  })
}

export default useFetchSaksi
