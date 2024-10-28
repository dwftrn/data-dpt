import { useMutation } from '@tanstack/react-query'
import { inputVote } from '../service/vote.service'

const useInputVote = () => {
  return useMutation({
    mutationFn: inputVote
  })
}

export default useInputVote
