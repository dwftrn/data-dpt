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
}

type VoteCandidate = {
  id_paslon: string
  jumlah: number
  no_urut: number
}

export type InputVote = Pick<Vote, 'data_paslon' | 'id_tps' | 'sah' | 'tidak_sah'> & { id_pemilu: string }

export type UpdateVote = { id: string; data_paslon?: VoteCandidate[]; sah?: number; tidak_sah?: number }

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
