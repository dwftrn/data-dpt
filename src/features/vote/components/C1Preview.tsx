import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Eye, Image, Trash2, Upload } from 'lucide-react'
import { MutableRefObject } from 'react'
import { Vote } from '../service/vote.service'

type Props = {
  data: Vote
  editMode: boolean
  imageRef: MutableRefObject<HTMLInputElement | null>
}

const C1Preview = ({ data, editMode, imageRef }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {editMode ? (
          data.c1 === '' ? (
            <div>
              <Button
                type='button'
                size='sm'
                className='gap-2 text-xs font-normal'
                onClick={() => imageRef.current?.click()}
              >
                <Upload className='size-4' />
                Upload
              </Button>
              <Input ref={imageRef} type='file' accept='image/jpeg, image/png' className='hidden' />
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Button size='sm' variant='link' className='text-xs gap-2 underline text-blue-400'>
                <Image className='size-4' />
                View
              </Button>
              <Button size='sm' variant='destructive' className='text-xs gap-2'>
                <Trash2 className='size-4' />
              </Button>
            </div>
          )
        ) : (
          <Button size='sm' className='text-xs gap-2'>
            <Eye className='size-4' />
            View
          </Button>
        )}
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
