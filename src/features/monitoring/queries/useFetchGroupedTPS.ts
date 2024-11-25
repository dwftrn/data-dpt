import { useQuery } from '@tanstack/react-query'
import { monitoringService } from '../services/monitoring.service'

const useFetchGroupedTPS = (id: string, status: null | 0 | 1 | 2) => {
  const enabled = Boolean(id)

  return useQuery({
    queryKey: ['grouped-tps', id, status],
    queryFn: async () => {
      const res = await monitoringService.fetchGroupedTPS({ status, id_pemilu: id })

      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    enabled,
    retry: enabled ? 1 : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
}

export default useFetchGroupedTPS
