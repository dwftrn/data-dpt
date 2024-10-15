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

export const fetchProvinces = (): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_PROVINCES, {}, 'GET')
}

export const fetchCities = (id: string): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_CITIES, { id_provinsi: id }, 'POST')
}

export const fetchDistricts = (id: string): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_DISTRICTS, { id_kota_kabupaten: id }, 'POST')
}

export const fetchSubdistricts = (id: string): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_SUBDISTRICTS, { id_kecamatan: id }, 'POST')
}

export const fetchTps = (id: string): Promise<CommonResponse<IdNameType[]>> => {
  return fetcher(ENDPOINTS.FETCH_TPS, { id_kelurahan: id }, 'POST')
}

export const fetchDPT = (): Promise<CommonResponse<DPT[]>> => {
  return fetcher(ENDPOINTS.FETCH_DPT, {}, 'GET')
}
