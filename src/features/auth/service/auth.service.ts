import { fetcher } from '@/api'
import { ENDPOINTS } from '@/api/endpoints'
import { CommonResponse } from '@/api/services'

export const signIn = (payload: {
  username: string
  password: string
}): Promise<CommonResponse<{ access_token: string }>> => {
  return fetcher(ENDPOINTS.AUTH.SIGN_IN, payload, 'POST')
}
