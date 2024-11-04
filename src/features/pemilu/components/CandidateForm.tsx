import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Check, Image, X } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'
import { PemiluFormType } from '../pages/PemiluFormPage'
import CandidateFormShowMode from './CandidateFormShowMode'
import { compressImage } from '@/lib/compress-image'

type Props = {
  form: UseFormReturn<PemiluFormType>
  fieldArray: UseFieldArrayReturn<PemiluFormType, 'candidate'>
  index: number
}

const MAX_FILE_SIZE = 1000

const CandidateForm = ({ form, fieldArray, index }: Props) => {
  const [isEdit, setIsEdit] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileBlobUrl, setFileBlobUrl] = useState('')

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, onChange: (...event: unknown[]) => void) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    if (file.size / 1024 <= MAX_FILE_SIZE) {
      setFileBlobUrl(URL.createObjectURL(file))
      onChange(file)
      return
    }

    try {
      const compressedBlob = await compressImage(file, 1024, MAX_FILE_SIZE)
      const compressedFile = new File([compressedBlob], file.name, { type: compressedBlob.type })

      setFileBlobUrl(URL.createObjectURL(compressedFile))
      onChange(compressedFile)
    } catch (error) {
      console.error('Image compression error:', error)
      form.setError(`candidate.${index}.image`, {
        type: 'custom',
        message: 'Gagal memproses file, pilih file baru atau coba lagi dalam beberapa saat'
      })
    }
  }

  const imageValue = form.watch(`candidate.${index}.image`)
  useEffect(() => {
    if (typeof imageValue === 'string') {
      setFileBlobUrl(imageValue)
    }
  }, [imageValue])

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
                <FormField
                  control={form.control}
                  name={`candidate.${index}.image`}
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <div>
                        <div
                          role='button'
                          className='rounded-full flex items-center justify-center bg-gray-400 text-white size-24 lg:size-28'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {fileBlobUrl ? (
                            <img
                              alt='avatar'
                              src={fileBlobUrl}
                              draggable={false}
                              className='rounded-full size-24 lg:size-28 object-cover'
                            />
                          ) : (
                            <Image className='size-10' />
                          )}
                        </div>
                      </div>
                      <FormControl>
                        <input
                          ref={fileInputRef}
                          type='file'
                          accept='image/png, image/jpeg'
                          className='hidden'
                          onChange={(event) => handleFileChange(event, onChange)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`candidate.${index}.no`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='truncate'>No. Urut</FormLabel>
                      <FormControl>
                        <Input
                          className='w-12'
                          placeholder='No'
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === '') {
                              field.onChange(value)
                            } else {
                              const numValue = parseInt(value, 10)
                              if (!isNaN(numValue) && numValue > 0) {
                                field.onChange(numValue + '')
                              }
                            }
                          }}
                        />
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
        <Button
          type='button'
          size='icon'
          variant='outline'
          className='p-0 size-8'
          onClick={() => {
            const candidateName = form.getValues(`candidate.${index}.candidateName`)
            const viceCandidateName = form.getValues(`candidate.${index}.viceCandidateName`)
            const no = form.getValues(`candidate.${index}.no`)
            const color = form.getValues(`candidate.${index}.color`)
            const image = form.getValues(`candidate.${index}.image`)

            if (!candidateName || !viceCandidateName || !no || !color || !image) return

            setIsEdit(false)
          }}
        >
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
