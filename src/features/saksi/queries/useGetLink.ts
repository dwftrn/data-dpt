import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { saksiService } from '../services/saksi.service'

const useGetLink = () => {
  return useQuery({
    queryKey: ['saksi-link'],
    queryFn: async () => {
      const res = await saksiService.getLink()
      if (!res) throw res
      if (res.error) throw res

      return res.data
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData
  })
}

export default useGetLink
