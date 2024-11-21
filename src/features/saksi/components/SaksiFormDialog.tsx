import { Button, buttonVariants } from '@/components/ui/button'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useInsertSaksi from '../queries/useInsertSaksi'

const formSchema = z.object({
  name: z.string().min(1, 'Tidak boleh kosong!'),
  nik: z.string().min(1, 'Tidak boleh kosong!'),
  phone: z.string().min(1, 'Tidak boleh kosong!'),
  bankAccount: z.string().min(1, 'Tidak boleh kosong!'),
  bankName: z.string().min(1, 'Tidak boleh kosong!'),
  district: z.string().min(1, 'Tidak boleh kosong!'),
  subdistrict: z.string().min(1, 'Tidak boleh kosong!'),
  tps: z.string().min(1, 'Tidak boleh kosong!'),
  address: z.string().min(1, 'Tidak boleh kosong!'),
  rw: z.string().min(1, 'Tidak boleh kosong!'),
  recommendation: z.string().min(1, 'Tidak boleh kosong!')
})

type FormType = z.infer<typeof formSchema>

const SaksiFormDialog = ({ triggerRef }: { triggerRef?: RefObject<HTMLButtonElement> }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id') || ''

  const { mutate: insert } = useInsertSaksi()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nik: '',
      phone: '',
      bankAccount: '',
      bankName: '',
      district: '',
      subdistrict: '',
      tps: '',
      address: '',
      recommendation: '',
      rw: ''
    }
  })

  const onSubmit = (values: FormType) => {
    console.log({ values })

    if (!id) {
      insert({
        nama: values.name,
        kelurahan: values.subdistrict,
        nama_bank: values.bankName,
        nik: values.nik,
        no_rek: values.bankAccount,
        no_telepon: values.phone,
        tps: values.tps,
        alamat: values.address,
        rekomendasi: values.recommendation,
        rw: values.rw
      })
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setSearchParams({ id: '' })
      }}
    >
      <DialogTrigger asChild>
        <Button ref={triggerRef} className='gap-3'>
          <PlusCircle className='size-5 fill-white stroke-primary-blue-700' />
          Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 gap-0'>
        <DialogHeader className='py-4 px-6 border-b border-grey-500'>
          <DialogTitle>Tambah Data Saksi</DialogTitle>
          <DialogDescription className='sr-only'>Tambah Data Saksi</DialogDescription>
        </DialogHeader>

        <div className='py-4 px-6'>
          <Form {...form}>
            <form
              id='saksi-form'
              onSubmit={form.handleSubmit(onSubmit, (err) => console.log({ err }))}
              className='space-y-4 [&_input]:border-grey-500'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Saksi</FormLabel>
                    <FormControl>
                      <Input placeholder='Nama Saksi' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 items-start gap-4 w-full'>
                <FormField
                  control={form.control}
                  name='nik'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input placeholder='NIK' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ketikkan No. Telepon'
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                            // Only allow valid inputs
                            if (value === '' || /^\d*$/.test(value)) {
                              field.onChange(value)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-4 items-start gap-4 w-full'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem className='col-span-2'>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Input placeholder='Alamat' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='rw'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RW</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='RW'
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                            // Only allow valid inputs
                            if (value === '' || /^\d*$/.test(value)) {
                              field.onChange(value)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='recommendation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rekomendasi</FormLabel>
                      <FormControl>
                        <Input placeholder='Rekomendasi' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 items-start gap-4 w-full'>
                <FormField
                  control={form.control}
                  name='bankAccount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. Rekening</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='No. Rekening'
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                            // Only allow valid inputs
                            if (value === '' || /^\d*$/.test(value)) {
                              field.onChange(value)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bankName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Bank</FormLabel>
                      <FormControl>
                        <Input placeholder='Nama Bank' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-[1fr_1fr_auto] items-start gap-4 w-full [&_button]:bg-background [&_button]:border-grey-500'>
                <FormField
                  control={form.control}
                  name='district'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan TPS</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih Kecamatan' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='light'>Light</SelectItem>
                          <SelectItem value='dark'>Dark</SelectItem>
                          <SelectItem value='system'>System</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='subdistrict'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelurahan TPS</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih Kelurahan' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='light'>Light</SelectItem>
                          <SelectItem value='dark'>Dark</SelectItem>
                          <SelectItem value='system'>System</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='subdistrict'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TPS</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Pilih TPS' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='light'>Light</SelectItem>
                          <SelectItem value='dark'>Dark</SelectItem>
                          <SelectItem value='system'>System</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className='py-4 px-6 sm:justify-between'>
          <DialogClose className={cn(buttonVariants({ variant: 'secondary' }), 'bg-grey-500/50')}>Batal</DialogClose>
          <Button form='saksi-form' className='bg-success-700 hover:bg-success-700/90'>
            Tambah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SaksiFormDialog
