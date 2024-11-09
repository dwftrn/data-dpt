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

export type Pemilu = {
  _id: string
  id_jenis_pemilu: string
  id_kab_kota: string
  id_provinsi: string
  jenis_pemilu_name: string
  name: string
  provinsi_name: string
  kab_kota_name?: string
}

export type PemiluCandidate = {
  foto: string
  no_urut: string
  id_paslon: string
}

export type PemiluWithCandidate = Pemilu & { paslon: PemiluCandidate[] }

export type PemiluDetail = {
  id: string
  id_jenis_pemilu: string
  id_kab_kota: string
  id_provinsi: string
  name: string
  name_jenis_pemilu: string
  name_kab_kota: string
  name_provinsi: string
  paslon: (Omit<InsertCandidateParams, 'id_pemilu'> & { id_paslon: string })[]
  tipe_jenis_pemilu: string
}

export const fetchPemiluType = (): Promise<CommonResponse<PemiluType[]>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_TYPE, {}, 'GET')
}

export const insertPemilu = (payload: InsertPemiluParams): Promise<CommonResponse<{ id_pemilu: string }>> => {
  return fetcher(ENDPOINTS.PEMILU.INSERT, payload, 'POST')
}

export const updatePemilu = (
  payload: { id: string } & Partial<InsertPemiluParams>
): Promise<CommonResponse<{ id_pemilu: string }>> => {
  return fetcher(ENDPOINTS.PEMILU.UPDATE, payload, 'POST')
}

export const insertCandidate = (payload: InsertCandidateParams): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.PEMILU.INSERT_CANDIDATE, payload, 'POST', { 'Content-Type': 'multipart/form-data' })
}

export const updateCandidate = (
  payload: { id: string } & Partial<InsertCandidateParams>
): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.PEMILU.UPDATE_CANDIDATE, payload, 'PUT', { 'Content-Type': 'multipart/form-data' })
}

export const fetchPemiluWithCandidate = (): Promise<CommonResponse<PemiluWithCandidate[]>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_LIST_WITH_CANDIDATE, {}, 'GET')
}

export const fetchPemiluDetail = (id: string): Promise<CommonResponse<PemiluDetail>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_DETAIL_PEMILU, { id }, 'POST')
}

export const deletePemilu = (id: string): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.PEMILU.DELETE_PEMILU, { id }, 'POST')
}

export const checkPemilu = (id: string): Promise<CommonResponse<boolean>> => {
  return fetcher(ENDPOINTS.PEMILU.CHECK_PEMILU, { id }, 'POST')
}
