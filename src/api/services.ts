import { Pemilu } from '@/features/pemilu/service/pemilu.service'
import { fetcher } from '.'
import { ENDPOINTS } from './endpoints'

export type CommonResponse<T> = {
  error: boolean
  message: string
  data: T
}

export type IdNameType = {
  id: string
  name: string
}

export type TPS = {
  id: string
  NO: number
}

export type DPT = {
  alamat: string
  id: string
  id_kecamatan: string
  id_kelurahan: string
  id_kota: string
  id_provinsi: string
  id_tps: string
  jenis_kelamin: 'L' | 'P'
  kecamatan: string
  kelurahan: string
  kota: string
  nama: string
  no_tps: number
  provinsi: string
  rt: number
  rw: number
  usia: number
}

export type DPTQuery = {
  page: number
  per_page: number
  name: string
  jenis_kelamin: string
  id_kelurahan: string
  id_kecamatan: string
  id_provinsi: string
  id_kota: string
  id_tps: string
}

export type PaginatedData<T> = {
  current_page: number
  data: T[]
  per_page: number
  total_items: number
  total_pages: number
}

export const fetchProvinces = (): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_PROVINCES, {}, 'GET')
}

export const fetchCities = (id: string): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_CITIES, { id_provinsi: id }, 'POST')
}

export const fetchDistricts = (id: string): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_DISTRICTS, { id_kota_kabupaten: id }, 'POST')
}

export const fetchAllDistricts = (): Promise<
  CommonResponse<{ _id: string; id_kota_kabupaten: string; name: string }[]>
> => {
  return fetcher(ENDPOINTS.FETCH_ALL_DISTRICTS, {}, 'GET')
}

export const fetchSubdistricts = (id: string): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_SUBDISTRICTS, { id_kecamatan: id }, 'POST')
}

export const fetchTps = (id: string): Promise<CommonResponse<TPS[]>> => {
  return fetcher(ENDPOINTS.FETCH_TPS, { id_kelurahan: id }, 'POST')
}

export const fetchDPT = (query?: Partial<DPTQuery>): Promise<CommonResponse<PaginatedData<DPT>>> => {
  return fetcher(ENDPOINTS.FETCH_DPT, query, 'GET')
}

export const fetchChart = (): Promise<
  CommonResponse<{
    gender: {
      L: number
      P: number
    }
    generation: Record<string, number>
  }>
> => {
  return fetcher(ENDPOINTS.FETCH_CHART, {}, 'GET')
}

export const fetchPemilu = (): Promise<CommonResponse<Pemilu[]>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_LIST, {}, 'GET')
}

export const fetchTotaDPT = (): Promise<CommonResponse<{ jumlah_dpt: number }>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_TOTAL_DPT, {}, 'GET')
}

export const fetchTotaTPS = (): Promise<CommonResponse<{ jumlah_tps: number }>> => {
  return fetcher(ENDPOINTS.PEMILU.FETCH_TOTAL_TPS, {}, 'GET')
}

export const checkIsCanAbsen = (): Promise<CommonResponse<{ is_can_absen: 0 | 1 }>> => {
  return fetcher(ENDPOINTS.KOCAK.IS_CAN_ABSEN, {}, 'GET')
}

export const setIsCanAbsen = (is_can_absen: 0 | 1): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.KOCAK.SET_IS_CAN_ABSEN, { is_can_absen }, 'POST')
}

export const checkIsCanInput = (): Promise<CommonResponse<{ is_can_input: 0 | 1 }>> => {
  return fetcher(ENDPOINTS.KOCAK.IS_CAN_INPUT, {}, 'GET')
}

export const setIsCanInput = (is_can_input: 0 | 1): Promise<CommonResponse<null>> => {
  return fetcher(ENDPOINTS.KOCAK.SET_IS_CAN_INPUT, { is_can_input }, 'POST')
}
