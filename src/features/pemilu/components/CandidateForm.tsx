import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Check, Image, X } from 'lucide-react'
import { useState } from 'react'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { PemiluFormType } from '../pages/PemiluFormPage'
import CandidateFormShowMode from './CandidateFormShowMode'

type Props = {
  form: UseFormReturn<PemiluFormType>
  fieldArray: UseFieldArrayReturn<PemiluFormType, 'candidate'>
  index: number
}

const CandidateForm = ({ form, fieldArray, index }: Props) => {
  const [isEdit, setIsEdit] = useState(true)

  if (!isEdit) return <CandidateFormShowMode form={form} index={index} onEdit={() => setIsEdit(true)} />

  return (
    <div className='flex items-start gap-2'>
      <Card className='p-6 rounded-xl flex-1'>
        <CardContent className='p-0 flex items-start gap-6'>
          <div className='flex flex-1 gap-4'>
            <div className='w-full space-y-4'>
              <FormField
                control={form.control}
                name={`candidate.${index}.candidateName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Calon Walikota</FormLabel>
                    <FormControl>
                      <Input placeholder='Ketikkan nama calon' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`candidate.${index}.viceCandidateName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Calon Wakil Walikota</FormLabel>
                    <FormControl>
                      <Input placeholder='Ketikkan nama calon' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-start gap-4'>
                <div>
                  <div
                    role='button'
                    className='rounded-full flex items-center justify-center bg-gray-400 text-white size-24 lg:size-28'
                  >
                    <Image className='size-10' />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name={`candidate.${index}.no`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='truncate'>No. Urut</FormLabel>
                      <FormControl>
                        <Input className='w-12' placeholder='No' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`candidate.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warna</FormLabel>
                      <div className='grid grid-cols-[1fr_40px] items-center gap-2'>
                        <FormControl>
                          <Input className='w-full' placeholder='#000000' {...field} />
                        </FormControl>
                        <FormControl>
                          <Input type='color' role='button' className='p-0 border-none rounded-md' {...field} />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='flex flex-col gap-2'>
        <Button type='button' size='icon' variant='outline' className='p-0 size-8' onClick={() => setIsEdit(false)}>
          <Check role='button' className='size-4 text-green-500' />
        </Button>
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='p-0 size-8'
          onClick={() => fieldArray.remove(index)}
        >
          <X role='button' className='size-4 text-red-500' />
        </Button>
      </div>
    </div>
  )
}

export default CandidateForm
