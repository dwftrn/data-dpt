const BASE_URL = import.meta.env.VITE_BASE_URL

export const ENDPOINTS = {
  FETCH_PROVINCES: BASE_URL + '/getprovinsi',
  FETCH_CITIES: BASE_URL + '/getkotabyidprov',
  FETCH_DISTRICTS: BASE_URL + '/getkecamatanbyidkota',
  FETCH_SUBDISTRICTS: BASE_URL + '/getkelurahanbyidkecamatan',
  FETCH_TPS: BASE_URL + '/gettpsbyidkelurahan',
  FETCH_DPT: BASE_URL + '/getalldpt'
}
