import { useQuery } from '@tanstack/react-query'
import { fetchInputVote } from '../service/vote.service'

const useFetchVote = ({ id_kelurahan = '', id_pemilu = '' }: { id_pemilu: string; id_kelurahan: string }) => {
  const enabled = Boolean(id_pemilu) && Boolean(id_kelurahan)

  return useQuery({
    queryKey: ['votes', id_pemilu, id_kelurahan],
    queryFn: () => fetchInputVote({ id_pemilu, id_kelurahan }),
    enabled: enabled,
    retry: enabled ? 3 : false, // Only retry if we have an ID
    staleTime: 0
  })
}

export default useFetchVote
