import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'
import { Vote } from '@/features/vote/service/vote.service'

export const monitoringService = {
  fetchSummary: (params: {
    id_pemilu: string
  }): Promise<
    CommonResponse<{
      count_reject: number
      count_unverif: number
      count_unvote_tps: number
      count_verif: number
    }>
  > => {
    return fetcher(ENDPOINTS.MONITORING.FETCH_SUMMARY, params, 'POST')
  },
  fetchUnverifiedVotes: (params: {
    id_pemilu: string
  }): Promise<
    CommonResponse<
      (Vote & {
        id_kab_kota: string
        id_kecamatan: string
        id_kelurahan: string
        id_provinsi: string
        id_suara: string
        jabatan: string
        kab_kota: string
        kecamatan: string
        kelurahan: string
        nama_petugas: string
        provinsi: string
      })[]
    >
  > => {
    return fetcher(ENDPOINTS.MONITORING.FETCH_UNVERIFIED, params, 'POST')
  }
}
