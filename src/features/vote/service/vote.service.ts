import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export type Vote = {
  NO: number
  c1: string
  data_paslon: VoteCandidate[]
  id_suara: string
  id_tps: string
  sah: string
  status: string | (0 | 1 | 2)
  tidak_sah: string
  count_dpt: number
}

type VoteCandidate = {
  id_paslon: string
  jumlah: number
  no_urut: number
}

type InputVote = Pick<Vote, 'data_paslon' | 'id_tps' | 'sah' | 'tidak_sah'> & { id_pemilu: string }

export const fetchInputVote = (params: {
  id_pemilu: string
  id_kelurahan: string
}): Promise<CommonResponse<Vote[]>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_INPUT_VOTE, params, 'POST')
}

export const inputVote = (params: InputVote): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.PEMILU.INPUT_VOTE, params, 'POST')
}
