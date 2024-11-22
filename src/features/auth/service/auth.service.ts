import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export const signIn = (payload: {
  username: string
  password: string
}): Promise<
  CommonResponse<{
    access_token: string
    is_absen: 0 | 1
    nama: string
    role: 0 | 1
  }>
> => {
  return fetcher(ENDPOINTS.AUTH.SIGN_IN, { ...payload }, 'POST')
}
