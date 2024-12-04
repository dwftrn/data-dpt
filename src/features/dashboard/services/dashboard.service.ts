import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export type QuickCount = {
  calon_hasil: QuickCountCandidate[]
  total_suara_sah: number
  total_suara_tidak_sah: number
  persentase_suara_masuk: number
  total_suara_masuk: number
  persentase_suara_sah: number
  persentase_suara_tidak_sah: number
  total_dpt: number
  total_tps: number
  total_tps_verif: number
  persentase_tps_verif: number
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

export enum REGION_CODE {
  ALL = 0,
  PROVINCE = 1,
  CITY = 2,
  DISTRICT = 3,
  SUBDISTRICT = 4
}

export type QuickCountCardParams = {
  id_pemilu: string
  id_wilayah: string
  kode_wilayah: REGION_CODE
}

export type QuickCountCard = {
  id_region: string
  name: string
  rt_rw?: string[] | null
  votes: (Omit<QuickCountCandidate, 'foto' | 'nama' | 'nama_vice'> & { name: string; vice_name: string })[]
}

export const fetchQuickCount = (params: { id_pemilu: string }): Promise<CommonResponse<QuickCount>> => {
  return fetcher(ENDPOINTS.QUICK_COUNT.FETCH, params, 'POST')
}

export const fetchCards = (params: QuickCountCardParams): Promise<CommonResponse<QuickCountCard[]>> => {
  return fetcher(ENDPOINTS.QUICK_COUNT.FETCH_CARDS, params, 'POST')
}
