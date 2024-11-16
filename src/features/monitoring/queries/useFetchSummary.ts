import { useQuery } from '@tanstack/react-query'
import { monitoringService } from '../services/monitoring.service'

const useFetchSummary = (id: string) => {
  const enabled = Boolean(id)

  return useQuery({
    queryKey: ['votes-summary', id],
    queryFn: async () => {
      const res = await monitoringService.fetchSummary({ id_pemilu: id })

      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    enabled,
    retry: enabled ? 1 : false
  })
}

export default useFetchSummary
