import { useMutation } from '@tanstack/react-query'
import { signIn } from '../service/auth.service'

const useSignIn = () => {
  return useMutation({
    mutationFn: signIn
  })
}

export default useSignIn
