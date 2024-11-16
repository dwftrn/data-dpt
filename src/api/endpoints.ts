export const BASE_URL = import.meta.env.VITE_BASE_URL

export const ENDPOINTS = {
  FETCH_PROVINCES: BASE_URL + '/getprovinsi',
  FETCH_CITIES: BASE_URL + '/getkotabyidprov',
  FETCH_DISTRICTS: BASE_URL + '/getkecamatanbyidkota',
  FETCH_SUBDISTRICTS: BASE_URL + '/getkelurahanbyidkecamatan',
  FETCH_TPS: BASE_URL + '/gettpsbyidkelurahan',
  FETCH_DPT: BASE_URL + '/getalldpt2',
  FETCH_CHART: BASE_URL + '/chart-data',
  AUTH: {
    SIGN_IN: BASE_URL + '/login'
  },
  PEMILU: {
    FETCH_LIST: BASE_URL + '/getpemilu',
    FETCH_LIST_WITH_CANDIDATE: BASE_URL + '/getpemiluwithpaslon',
    FETCH_TYPE: BASE_URL + '/getjenispemilu',
    INSERT: BASE_URL + '/insertpemilu',
    UPDATE: BASE_URL + '/updatepemilu',
    INSERT_CANDIDATE: BASE_URL + '/insertpaslon',
    UPDATE_CANDIDATE: BASE_URL + '/updatepaslon',
    FETCH_INPUT_VOTE: BASE_URL + '/getinsertsuara',
    INPUT_VOTE: BASE_URL + '/insertsuara',
    UPDATE_VOTE: BASE_URL + '/updatesuara',
    INSERT_C1: BASE_URL + '/insertc1suara',
    FETCH_DETAIL_PEMILU: BASE_URL + '/getdetailpemilu',
    DELETE_PEMILU: BASE_URL + '/deletepemilu',
    FETCH_VOTE_DETAIL: BASE_URL + '/getdetailsuara',
    FETCH_TOTAL_DPT: BASE_URL + '/getcountdpt',
    FETCH_TOTAL_TPS: BASE_URL + '/getcountalldpt',
    CHECK_PEMILU: BASE_URL + '/cekisexistpemilu'
  },
  QUICK_COUNT: {
    FETCH: BASE_URL + '/quickcount',
    FETCH_CARDS: BASE_URL + '/getcarddetail'
  },
  MONITORING: {
    FETCH_SUMMARY: BASE_URL + '/getsummonitor',
    FETCH_UNVERIFIED: BASE_URL + '/getinsertsuaraunverif'
  }
}
