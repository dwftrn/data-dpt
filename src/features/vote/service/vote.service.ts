import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export type Vote = {
  NO: number
  c1: string
  data_paslon: VoteCandidate[]
  id_suara: string
  id_tps: string
  sah: string | number
  status: string | (0 | 1 | 2)
  tidak_sah: string | number
  count_dpt: number
  alasan_reject?: string
}

type VoteCandidate = {
  id_paslon: string
  jumlah: number
  no_urut: number
}

export type InputVote = Pick<Vote, 'data_paslon' | 'id_tps' | 'sah' | 'tidak_sah'> & { id_pemilu: string }

export type UpdateVote = {
  id: string
  data_paslon?: VoteCandidate[]
  sah?: number
  tidak_sah?: number
  status?: string | (0 | 1 | 2)
  alasan_reject?: string
}

export type VoteDetail = {
  alasan_reject: string
  c1: string
  data_paslon: (VoteCandidate & { foto: string })[]
  data_petugas: {
    jabatan: string
    nama_petugas: string
    nomor_wa: string
  }
  id: string
  jumlah_dpt_tps: number
  kecamatan: string
  kelurahan: string
  kota_kabupaten: string
  nama_tps: string
  provinsi: string
  sah: number
  status: number
  tidak_sah: number
}

export const fetchInputVote = (params: {
  id_pemilu: string
  id_kelurahan: string
}): Promise<CommonResponse<Vote[]>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_INPUT_VOTE, params, 'POST')
}

export const inputVote = (params: InputVote): Promise<CommonResponse<{ id_suara: string }>> => {
  return fetcher(ENDPOINTS.PEMILU.INPUT_VOTE, params, 'POST')
}

export const updateVote = (params: UpdateVote): Promise<CommonResponse<{ id_suara: string }>> => {
  return fetcher(ENDPOINTS.PEMILU.UPDATE_VOTE, params, 'POST')
}

export const inputC1 = (params: { id: string; c1: File }): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.PEMILU.INSERT_C1, params, 'POST', { 'Content-Type': 'multipart/form-data' })
}

export const fetchVoteDetail = (params: { id: string }): Promise<CommonResponse<VoteDetail>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_VOTE_DETAIL, params, 'POST')
}
