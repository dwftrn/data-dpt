import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export type PemiluType = {
  id: string
  name: string
  tipe: number
}

export type InsertPemiluParams = {
  name: string
  id_jenis_pemilu: string
  id_provinsi: string
  id_kab_kota?: string
}

export type InsertCandidateParams = {
  no_urut: number
  name: string
  warna: string
  id_pemilu: string
  vice_name: string
  foto: File
}

export const fetchPemiluType = (): Promise<CommonResponse<PemiluType[]>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_TYPE, {}, 'GET')
}

export const insertPemilu = (payload: InsertPemiluParams): Promise<CommonResponse<{ id_pemilu: string }>> => {
  return fetcher(ENDPOINTS.PEMILU.INSERT, payload, 'POST')
}

export const insertCandidate = (payload: InsertCandidateParams): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.PEMILU.INSERT_CANDIDATE, payload, 'POST', { 'Content-Type': 'multipart/form-data' })
}
