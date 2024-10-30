import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export type QuickCount = {
  calon_hasil: QuickCountCandidate[]
  total_suara_sah: number
  total_suara_tidak_sah: number
  persentase_suara_masuk: number
  total_suara_masuk: number
}

export type QuickCountCandidate = {
  foto: string
  id_paslon: string
  jumlah_suara: number
  nama: string
  nama_vice: string
  no_urut: string
  persentase: number
  warna: string
}

export const fetchQuickCount = (params: { id_pemilu: string }): Promise<CommonResponse<QuickCount>> => {
  return fetcher(ENDPOINTS.QUICK_COUNT.FETCH, params, 'POST')
}
