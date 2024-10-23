import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios'

export function getToken(): string {
  return 'Bearer ' + localStorage.getItem('access_token') || ''
}

export const fetcher = async <T = unknown>(
  endpoint: string,
  params: unknown,
  method: Method = 'post',
  optHeader: AxiosRequestConfig['headers'] = {}
): Promise<T> => {
  const headers = {
    Authorization: getToken(),
    'Content-Type': 'application/json',
    ...optHeader
  }

  const isGet = ['GET', 'get'].includes(method)

  const requestConfig: AxiosRequestConfig = {
    url: endpoint,
    method,
    headers,
    ...(isGet ? { params } : { data: params })
  }

  try {
    const response = await axios(requestConfig)

    if (response.data.error) return Promise.reject(response.data)

    return response.data
  } catch (error) {
    console.error({ error })
    if (error instanceof AxiosError) {
      if (error.response?.data) return Promise.reject(error.response.data)
    }

    throw error
  }
}
