import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse, PaginatedData } from '@/api/services'

export type Saksi = {
  _id: string
  id_kab_kota: string
  id_kecamatan: string
  id_kelurahan: string
  id_provinsi: string
  id_tps: string
  is_absen: 0 | 1
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
  waktu_absen: string
  rekomendasi: string
  alamat: string
  rw: string
}

export const saksiService = {
  fetchSaksi: (params: {
    page: number
    per_page: number
    search?: string
  }): Promise<CommonResponse<PaginatedData<Saksi> & { total_saksi: number; total_sudah_absen: number }>> => {
    return fetcher(
      ENDPOINTS.OPERATOR.FETCH_OPERATORS + `?page=${params.page}&per_page=${params.per_page}&search=${params.search}`,
      {},
      'POST'
    )
  },
  insertSaksi: (params: {
    alamat: string
    rw: string
    nama: string
    nik: string
    no_rek: string
    nama_bank: string
    no_telepon: string
    tps: string
    kelurahan: string
    rekomendasi: string
  }): Promise<CommonResponse<null>> => {
    return fetcher(ENDPOINTS.OPERATOR.INSERT_OPERATOR, params, 'POST')
  },
  updateSaksi: (params: {
    id: string
    alamat?: string
    rw?: string
    nama?: string
    nik?: string
    no_rek?: string
    nama_bank?: string
    no_telepon?: string
    tps?: string
    kelurahan?: string
    rekomendasi?: string
  }): Promise<CommonResponse<null>> => {
    return fetcher(ENDPOINTS.OPERATOR.UPDATE_OPERATOR, params, 'POST')
  },
  getLink: (): Promise<CommonResponse<{ link: string }>> => {
    return fetcher(ENDPOINTS.OPERATOR.GET_LINK, {}, 'GET')
  },
  deleteSaksi: (params: { id: string }): Promise<CommonResponse<null>> => {
    return fetcher(ENDPOINTS.OPERATOR.DELETE_OPERATOR, params, 'POST')
  },
  importSaksi: (file: File): Promise<CommonResponse<null>> => {
    return fetcher(ENDPOINTS.OPERATOR.IMPORT_OPERATORS, { file }, 'POST', { 'Content-Type': 'multipart/form-data' })
  }
}
