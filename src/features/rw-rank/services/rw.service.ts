import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export type RwRank = {
  data_paslon: {
    foto: string
    id_paslon: string
    jumlah: number
    name: string
    no_urut: number
    vice_name: string
    warna: string
  }[]
  kecamatan: string
  kelurahan: string
  rw: number
  sah: number
  tidak_sah: number
}

export const rwService = {
  fetchRwRank: (): Promise<CommonResponse<RwRank[]>> => {
    return fetcher(ENDPOINTS.KOCAK.RANK_RW, {}, 'GET')
  }
}
