import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { historyService } from '../services/history.service'

const useFetchHistory = (params: { id_pemilu: string; page: number; per_page: number; search?: string }) => {
  return useQuery({
    queryKey: ['history', ...Object.values(params)],
    queryFn: async () => {
      const res = await historyService.fetchHistories(params)
      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    placeholderData: keepPreviousData
  })
}

export default useFetchHistory
