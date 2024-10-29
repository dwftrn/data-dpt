import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import { Vote } from '../service/vote.service'

type Props = {
  data: Vote
}

const C1Preview = ({ data }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='text-xs gap-2'>
          <Eye className='size-4' />
          View
        </Button>
      </DialogTrigger>

      <DialogContent withClose={false} className='bg-transparent border-none max-w-2xl'>
        <DialogTitle className='sr-only' />
        <DialogDescription className='sr-only' />
        <img src={data.c1} />
      </DialogContent>
    </Dialog>
  )
}

export default C1Preview
