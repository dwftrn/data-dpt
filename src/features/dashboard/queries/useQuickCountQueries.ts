import { useQueries } from '@tanstack/react-query'
import { useLocation, useSearchParams } from 'react-router-dom'
import { fetchCards, QuickCountCard, REGION_CODE } from '../services/dashboard.service'
import { CommonResponse } from '@/api/services'

export const DISTRICT_IDS = {
  DISTRICT1: '670ccae6fec682bd6c0bc8d3',
  DISTRICT2: '670ccafafec682bd6c0bc8d5',
  DISTRICT3: '670ccb03fec682bd6c0bc8d6'
} as const

const useQuickCountQueries = () => {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const idPemilu = searchParams.get('pemilu') || ''

  const districts = [
    { id: DISTRICT_IDS.DISTRICT1, name: 'District 1' },
    { id: DISTRICT_IDS.DISTRICT2, name: 'District 2' },
    { id: DISTRICT_IDS.DISTRICT3, name: 'District 3' }
  ]

  const enabled = Boolean(idPemilu)
  const shouldRefetch = pathname === '/' && enabled

  const results = useQueries({
    // @ts-expect-error idk why tho
    queries: districts.map((district) => ({
      queryKey: ['quickCount-cards', idPemilu, district.id, REGION_CODE.DISTRICT] as const,
      queryFn: () =>
        fetchCards({
          id_pemilu: idPemilu,
          id_wilayah: district.id,
          kode_wilayah: REGION_CODE.DISTRICT
        }),
      enabled,
      refetchInterval: shouldRefetch ? 15000 : false,
      refetchIntervalInBackground: shouldRefetch,
      retry: enabled ? 3 : false,
      staleTime: 0
    }))
  })

  const isLoading = results.some((result) => result.isLoading)
  const data = results.reduce<QuickCountCard[]>((acc, result) => {
    if (result.data && typeof result.data === 'object' && 'data' in result.data) {
      const responseData = (result.data as CommonResponse<QuickCountCard[]>).data
      // Sort votes for each district by percentage in descending order
      const sortedData = responseData.map((district) => ({
        ...district,
        votes: [...district.votes].sort((a, b) => b.persentase - a.persentase) // or use jumlah_suara: b.jumlah_suara - a.jumlah_suara
      }))
      return [...acc, ...sortedData]
    }
    return acc
  }, [])

  return { data, isLoading }
}

export default useQuickCountQueries
