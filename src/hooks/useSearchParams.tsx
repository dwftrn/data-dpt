import { startTransition, useCallback } from 'react'
import { useSearchParams as useRouterSearchParams } from 'react-router-dom'

const useSearchParams = (): [URLSearchParams, (params: Record<string, string>) => void] => {
  const [searchParams, setRSearchParams] = useRouterSearchParams()

  const setSearchParams = useCallback(
    (params: Record<string, string>) => {
      startTransition(() => setRSearchParams((prev) => ({ ...Object.fromEntries(prev.entries()), ...params })))
    },
    [setRSearchParams]
  )

  return [searchParams, setSearchParams]
}

export default useSearchParams
