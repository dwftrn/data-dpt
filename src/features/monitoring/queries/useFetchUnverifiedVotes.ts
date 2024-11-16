import { useQuery } from '@tanstack/react-query'
import { monitoringService } from '../services/monitoring.service'

const useFetchUnverifiedVotes = (id: string) => {
  const enabled = Boolean(id)

  return useQuery({
    queryKey: ['unverified-votes', id],
    queryFn: () => monitoringService.fetchUnverifiedVotes({ id_pemilu: id }),
    enabled,
    retry: enabled ? 1 : false,
    refetchInterval: enabled ? 19000 : false, // Only refetch if on home page and has ID
    refetchIntervalInBackground: enabled,
    staleTime: 0 // Consider all data stale immediately for real-time updates
  })
}

export default useFetchUnverifiedVotes
