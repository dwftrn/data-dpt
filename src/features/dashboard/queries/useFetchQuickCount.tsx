import { useQuery } from '@tanstack/react-query'
import { fetchQuickCount } from '../services/dashboard.service'

type QuickCountParams = {
  id_pemilu: string
}

const useFetchQuickCount = ({ id_pemilu }: QuickCountParams) => {
  const enabled = Boolean(id_pemilu)

  return useQuery({
    queryKey: ['quickCount', id_pemilu],
    queryFn: () => fetchQuickCount({ id_pemilu }),
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
    enabled: enabled, // Query won't run if id_pemilu is empty
    // You might want to add these options for better UX
    retry: enabled ? 3 : false, // Only retry if we have an ID
    staleTime: 0 // Consider all data stale immediately for real-time updates
  })
}

export default useFetchQuickCount
