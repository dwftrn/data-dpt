import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse, PaginatedData } from '@/api/services'

type History = {
  _id: string
  desc: string
  id_kab_kota: string
  id_kecamatan: string
  id_kelurahan: string
  id_provinsi: string
  kab_kota: string
  kecamatan: string
  kelurahan: string
  provinsi: string
  time: string
  tps: 1
}

export const historyService = {
  fetchHistories: ({
    id_pemilu,
    page,
    per_page,
    search
  }: {
    id_pemilu: string
    page: number
    per_page: number
    search?: string
  }): Promise<CommonResponse<PaginatedData<History>>> => {
    return fetcher(
      ENDPOINTS.HISTORY.FETCH_HISTORY + `?page=${page}&per_page=${per_page}&search=${search}`,
      { id_pemilu },
      'POST'
    )
  }
}
