import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import { Pen } from 'lucide-react'
import { useState } from 'react'
import { Vote } from '../service/vote.service'
import VoteFormDialogContent from './VoteFormDialogContent'
import LoadingOverlay from '@/components/LoadingOverlay'

type Props = {
  data: Vote
  pemilu: PemiluWithCandidate
}

const VoteFormDialog = ({ data, pemilu }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button type='button' variant='secondary' className='p-2 h-fit'>
            <Pen className='size-4' />
          </Button>
        </DialogTrigger>

        {isOpen && (
          <VoteFormDialogContent
            data={data}
            pemilu={pemilu}
            closeDialog={() => setIsOpen(false)}
            onLoadinChange={setIsLoading}
          />
        )}
      </Dialog>
    </>
  )
}

export default VoteFormDialog
