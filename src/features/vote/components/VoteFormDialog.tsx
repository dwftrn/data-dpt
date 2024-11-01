import PemiluLogo from '@/assets/pemilu-logo.svg'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import { compressImage } from '@/lib/compress-image'
import { areArraysEqual } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pen, Plus, X } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import useInputC1 from '../queries/useInputC1'
import useInputVote from '../queries/useInputVote'
import useUpdateVote from '../queries/useUpdateVote'
import { UpdateVote, Vote } from '../service/vote.service'

type Props = {
  data: Vote
  pemilu: PemiluWithCandidate
}

const formSchema = z.object({
  data_paslon: z.array(
    z.object({
      id_paslon: z.string().trim().min(1, 'Tidak boleh kosong!'),
      jumlah: z.string().trim().min(1, 'Tidak boleh kosong!').regex(/^\d+$/, 'Harus berupa angka'),
      no_urut: z.number()
    })
  ),
  id_pemilu: z.string().trim().min(1, 'Tidak boleh kosong!'),
  id_tps: z.string().trim().min(1, 'Tidak boleh kosong!'),
  sah: z.string().trim().min(1, 'Tidak boleh kosong!').regex(/^\d+$/, 'Harus berupa angka'),
  tidak_sah: z.string().trim().min(1, 'Tidak boleh kosong!').regex(/^\d+$/, 'Harus berupa angka')
})

type FormType = z.infer<typeof formSchema>

const VoteFormDialog = ({ data, pemilu }: Props) => {
  const isInitialized = useRef(false)
  const [isOpen, setIsOpen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileBlobUrl, setFileBlobUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')

  const { mutateAsync: inputVote, isPending: isLoadingInsert } = useInputVote()
  const { mutateAsync: updateVote, isPending: isLoadingUpdate } = useUpdateVote()
  const { mutateAsync: inputC1, isPending: isLoadingC1 } = useInputC1()

  const isLoading = isLoadingInsert || isLoadingUpdate || isLoadingC1

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_paslon: [],
      id_pemilu: pemilu._id,
      id_tps: data.id_tps,
      sah: '',
      tidak_sah: ''
    }
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'data_paslon'
  })

  const currentValues = form.watch('data_paslon')

  const sahTotal = () => {
    return currentValues.reduce((sum, item) => {
      const jumlah = parseInt(item.jumlah || '0')
      const total = sum + (isNaN(jumlah) ? 0 : jumlah)
      form.setValue('sah', total + '')
      return total
    }, 0)
  }

  const onSubmit = (values: FormType) => {
    console.log({ values })
    if (!file && !fileBlobUrl) {
      setFileError('Pilih Formulir C1')
      return
    }

    if (data.status === '') {
      inputVote({
        data_paslon: values.data_paslon.map((item) => ({ ...item, jumlah: +item.jumlah, no_urut: +item.no_urut })),
        id_pemilu: values.id_pemilu,
        id_tps: values.id_tps,
        sah: +values.sah,
        tidak_sah: +values.tidak_sah
      }).then((res) => {
        const { id_suara } = res.data
        if (file) {
          inputC1({
            id: id_suara,
            c1: file
          }).then(() => location.reload())
        } else {
          location.reload()
        }
      })
    } else {
      const params: UpdateVote = {
        id: data.id_suara
      }

      if (values.sah !== data.sah) params.sah = +values.sah
      if (values.tidak_sah !== data.tidak_sah) params.tidak_sah = +values.tidak_sah

      const parsedDataPaslon = values.data_paslon.map((item) => ({
        ...item,
        jumlah: +item.jumlah,
        no_urut: +item.no_urut
      }))

      if (!areArraysEqual(data.data_paslon, parsedDataPaslon)) {
        params.data_paslon = parsedDataPaslon
      }

      updateVote(params).then(() => {
        if (file) {
          inputC1({
            id: data.id_suara,
            c1: file
          }).then(() => location.reload())
        } else {
          location.reload()
        }
      })
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    const MAX_FILE_SIZE = 1000
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    if (file.size / 1024 <= MAX_FILE_SIZE) {
      setFileBlobUrl(URL.createObjectURL(file))

      setFile(file)
      return
    }

    try {
      const compressedBlob = await compressImage(file, 1024, MAX_FILE_SIZE)
      const compressedFile = new File([compressedBlob], file.name, { type: compressedBlob.type })

      setFileBlobUrl(URL.createObjectURL(compressedFile))
      setFile(compressedFile)
    } catch (error) {
      console.error('Image compression error:', error)
      setFileError('Gagal memproses file, pilih file baru atau coba lagi dalam beberapa saat')
    }
  }

  useEffect(() => {
    // Only run once on mount
    if (!isInitialized.current) {
      if (data.c1) {
        setFileBlobUrl(data.c1)
      }

      form.setValue('tidak_sah', data.tidak_sah.toString())

      if (data.data_paslon.length > 0) {
        const formattedData = data.data_paslon.map((item) => ({
          ...item,
          jumlah: item.jumlah.toString()
        }))
        fieldArray.replace(formattedData)
      } else {
        const initialData = pemilu.paslon.map((item) => ({
          id_paslon: item.id_paslon,
          jumlah: '',
          no_urut: Number(item.no_urut)
        }))
        fieldArray.replace(initialData)
      }
      isInitialized.current = true
    }

    form.setValue('id_pemilu', pemilu._id)
    form.setValue('id_tps', data.id_tps)
  }, [data.c1, data.data_paslon, data.id_tps, data.tidak_sah, fieldArray, form, pemilu._id, pemilu.paslon])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type='button' variant='secondary' className='p-2 h-fit'>
          <Pen className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent withClose={false} className='max-w-3xl p-0 gap-0'>
        <div className='grid grid-cols-2 h-full'>
          <div className='p-4 cursor-pointer'>
            {fileBlobUrl ? (
              <div className='relative size-full rounded-lg group'>
                <img
                  alt='form-c1'
                  src={fileBlobUrl}
                  className='size-full rounded-lg object-cover'
                  onClick={() => fileInputRef.current?.click()}
                />
                <div
                  className='size-6 rounded-full absolute -top-2 -right-2 bg-black/80 text-white group-hover:flex items-center justify-center hidden'
                  onClick={() => {
                    setFile(null)
                    setFileBlobUrl('')
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                >
                  <X className='size-4' />
                </div>
              </div>
            ) : (
              <div
                className='border-2 border-dashed size-full rounded-lg flex flex-col justify-center items-center bg-[#F1F2F3] text-muted-foreground'
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className='border-2 border-muted-foreground rounded-lg size-8 mb-4' />
                <h1 className='text-sm mb-2'>Klik Untuk Mengunggah Form C1</h1>
                <span className='text-xs'>Format Gambar : JPG/PNG</span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type='file'
              accept='image/png, image/jpeg'
              className='hidden'
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>
          <div className='border-l flex flex-col'>
            <DialogHeader className='p-4 flex items-center justify-between flex-row border-b border-b-gray-300 flex-shrink-0'>
              <div className='flex items-center gap-3'>
                <img alt='logo' src={PemiluLogo} className='size-8' />
                <DialogTitle className='text-base font-bold'>
                  TPS 77 <span className='text-xs font-normal'>(DPT 370)</span>
                </DialogTitle>
              </div>
              <DialogDescription className='sr-only' />
            </DialogHeader>

            <div className='p-4 border-b border-b-gray-300 flex-shrink-0'>
              <div className='space-y-1'>
                <h1 className='font-bold text-sm'>Kelurahan Cihanjuang • Kecamatan Cimahi Utara</h1>
                <p className='font-light text-sm'>Kota Cimahi • Provinsi Jawa Barat</p>
              </div>
            </div>

            <Form {...form}>
              <form
                id='vote-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 p-4 flex-1 overflow-y-auto max-h-[70vh]'
              >
                <h1 className='text-base font-bold'>Perolehan Suara</h1>
                <div className='space-y-4'>
                  {fieldArray.fields.map((item, index) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name={`data_paslon.${index}.jumlah`}
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex items-center gap-3'>
                            <div className='bg-red-500 rounded-full text-white size-6 aspect-square text-xs flex items-center justify-center'>
                              <FormLabel className='text-white'>{item.no_urut}</FormLabel>
                            </div>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='Input Suara'
                                {...field}
                                disabled={isLoading}
                                onKeyDown={(e) => {
                                  // Prevent 'e', '+', '-' and other non-numeric keys
                                  if (
                                    !/^\d$/.test(e.key) &&
                                    !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)
                                  ) {
                                    e.preventDefault()
                                  }
                                }}
                                onChange={(e) => {
                                  // Remove any non-numeric characters and update the field
                                  const value = e.target.value.replace(/\D/g, '')
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className='flex justify-between bg-[#E6F4F0] -mx-4 p-4 font-bold items-center'>
                    <h1 className='text-xs'>Total Suara Sah</h1>
                    <p className='text-lg'>{sahTotal()}</p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name='tidak_sah'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suara Tidak Sah</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ketikkan suara tidak sah...'
                          {...field}
                          disabled={isLoading}
                          onKeyDown={(e) => {
                            // Prevent 'e', '+', '-' and other non-numeric keys
                            if (
                              !/^\d$/.test(e.key) &&
                              !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)
                            ) {
                              e.preventDefault()
                            }
                          }}
                          onChange={(e) => {
                            // Remove any non-numeric characters and update the field
                            const value = e.target.value.replace(/\D/g, '')
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter className='border-t p-4 justify-between items-center'>
          <p className='text-sm font-medium text-destructive flex-1'>{fileError}</p>
          <div className='space-x-3'>
            <DialogClose asChild>
              <Button variant='outline' disabled={isLoading}>
                Batal
              </Button>
            </DialogClose>
            <Button
              form='vote-form'
              onClick={() => {
                if (!file && !fileBlobUrl) setFileError('Pilih Formulir C1')
              }}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Simpan
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default VoteFormDialog
