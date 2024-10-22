import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

type PemiluType = {
  id: string
  name: string
  tipe: number
}

export const fetchPemiluType = (): Promise<CommonResponse<PemiluType[]>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_TYPE, {}, 'GET')
}
