import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { PemiluFormType } from '../pages/PemiluFormPage'

type Props = {
  form: UseFormReturn<PemiluFormType>
  fieldArray: UseFieldArrayReturn<PemiluFormType, 'candidate'>
}

const AddCandidateButton = ({ form, fieldArray }: Props) => {
  return (
    <>
      <div className='flex items-start gap-2'>
        <Card
          className='p-4 rounded-2xl flex-1'
          onClick={() =>
            fieldArray.append({
              no: '0',
              candidateName: '',
              viceCandidateName: '',
              color: '',
              image: ''
            })
          }
        >
          <CardContent className='p-0 space-y-4'>
            <div
              role='button'
              className='w-full h-48 border-gray-300 border border-dashed rounded-xl flex items-center justify-center text-sm gap-4 text-gray-500'
            >
              <Plus />
              Tambah Calon
            </div>
          </CardContent>
        </Card>
        <div className='size-8'></div>
      </div>
      {form.getFieldState('candidate').error && (
        <p className='text-sm font-medium text-destructive'>
          {form.getFieldState('candidate').error?.message || form.getFieldState('candidate').error?.root?.message}
        </p>
      )}
    </>
  )
}

export default AddCandidateButton
