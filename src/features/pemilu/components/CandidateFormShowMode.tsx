import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Edit, Image } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { PemiluFormType } from '../pages/PemiluFormPage'

type Props = {
  form: UseFormReturn<PemiluFormType>
  index: number
  onEdit(): void
}

const CandidateFormShowMode = ({ form, index, onEdit }: Props) => {
  const image = form.getValues(`candidate.${index}.image`)

  console.log({ image })
  return (
    <div className='flex items-start gap-2'>
      <Card
        className='flex flex-1 gap-4 items-start bg-white rounded-xl p-6 border justify-between border-b-8'
        style={{
          borderBottomColor: form.getValues(`candidate.${index}.color`)
        }}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Label>No. Urut</Label>
            <p className='text-sm font-semibold'>{form.getValues(`candidate.${index}.no`)}</p>
          </div>
          <div className='space-y-1'>
            <Label>Nama Calon Walikota</Label>
            <p className='text-sm font-extrabold'>{form.getValues(`candidate.${index}.candidateName`)}</p>
          </div>
          <div className='space-y-1'>
            <Label>Nama Calon Wakil Walikota</Label>
            <p className='text-sm font-extrabold'>{form.getValues(`candidate.${index}.viceCandidateName`)}</p>
          </div>
        </div>
        <div className='rounded-full flex items-center justify-center bg-gray-400 text-white size-24 lg:size-28'>
          {typeof image === 'string' || image instanceof File ? (
            <img
              alt='avatar'
              src={typeof image === 'string' ? image : URL.createObjectURL(image)}
              draggable={false}
              className='rounded-full size-24 lg:size-28 object-cover'
            />
          ) : (
            <Image className='size-10' />
          )}
        </div>
      </Card>
      <div className='flex flex-col gap-2'>
        <Button type='button' size='icon' variant='outline' className='p-0 size-8' onClick={onEdit}>
          <Edit role='button' className='size-4 text-amber-500' />
        </Button>
      </div>
    </div>
  )
}

export default CandidateFormShowMode
