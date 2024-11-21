import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse, PaginatedData } from '@/api/services'

export const saksiService = {
  fetchSaksi: (params: {
    page: number
    per_page: number
    search?: string
  }): Promise<
    CommonResponse<
      PaginatedData<{
        _id: string
        id_kab_kota: string
        id_kecamatan: string
        id_kelurahan: string
        id_provinsi: string
        id_tps: string
        // is_saksi_luar: number
        kab_kota: string
        kecamatan: string
        kelurahan: string
        nama: string
        nama_bank: string
        nik: string
        no_rek: string
        no_telepon: string
        provinsi: string
        tps: number
      }>
    >
  > => {
    return fetcher(
      ENDPOINTS.OPERATOR.FETCH_OPERATORS + `?page=${params.page}&per_page=${params.per_page}&search=${params.search}`,
      {},
      'POST'
    )
  },
  insertSaksi: (params: {
    nama: string
    nik: string
    no_rek: string
    nama_bank: string
    no_telepon: string
    tps: string
    kelurahan: string
  }): Promise<CommonResponse<null>> => {
    return fetcher(ENDPOINTS.OPERATOR.INSERT_OPERATOR, params, 'POST')
  }
}
