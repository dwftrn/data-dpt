import { useQuery } from '@tanstack/react-query'
import { fetchVoteDetail } from '../service/vote.service'

const useFetchVoteDetail = ({ id }: { id: string }) => {
  const enabled = Boolean(id)

  return useQuery({
    queryKey: ['votes-detail', id],
    queryFn: async () => {
      const res = await fetchVoteDetail({ id })

      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    enabled: enabled,
    retry: enabled ? 3 : false
  })
}

export default useFetchVoteDetail
