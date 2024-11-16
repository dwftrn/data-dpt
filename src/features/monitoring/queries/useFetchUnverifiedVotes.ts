import { useQuery } from '@tanstack/react-query'
import { monitoringService } from '../services/monitoring.service'

const useFetchUnverifiedVotes = (id: string) => {
  const enabled = Boolean(id)

  return useQuery({
    queryKey: ['unverified-votes', id],
    queryFn: () => monitoringService.fetchUnverifiedVotes({ id_pemilu: id }),
    enabled,
    retry: enabled ? 1 : false
  })
}

export default useFetchUnverifiedVotes
