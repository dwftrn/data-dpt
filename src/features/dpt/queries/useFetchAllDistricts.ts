import { fetchAllDistricts } from '@/api/services'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const useFetchAllDistricts = () => {
  return useQuery({
    queryKey: ['all-districts'],
    queryFn: async () => {
      const response = await fetchAllDistricts()
      if (!response) throw response
      if (response.error) throw response

      return response.data
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
}

export default useFetchAllDistricts
