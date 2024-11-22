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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileText, Import, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useGetLink from '../queries/useGetLink'
import LoadingOverlay from '@/components/LoadingOverlay'
import useImportSaksi from '../queries/useImportSaksi'

const formSchema = z.object({
  file: z.instanceof(File).optional()
})

type FormType = z.infer<typeof formSchema>

const SaksiImportDialog = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading: isLoadingLink } = useGetLink()
  const { mutateAsync: importFile, isPending: isLoadingImport } = useImportSaksi()

  const isLoading = isLoadingLink || isLoadingImport

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined
    }
  })

  const onSubmit = async (values: FormType) => {
    console.log({ values })
    if (!values.file) return

    try {
      await importFile(values.file)
      setIsOpen(false)
    } catch (error) {
      console.log({ error })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('file', file)
    }
  }

  const clearFile = () => {
    form.setValue('file', undefined)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
      clearFile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='bg-white gap-3'>
            <Import className='size-5' />
            Impor
          </Button>
        </DialogTrigger>
        <DialogContent className='p-0 gap-0'>
          <DialogHeader className='py-4 px-6 border-b border-grey-500'>
            <DialogTitle>Impor Data Saksi</DialogTitle>
            <DialogDescription className='sr-only'>Tambah Data Saksi</DialogDescription>
          </DialogHeader>

          <div className='py-4 px-6'>
            <Form {...form}>
              <form id='import-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='file'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Dokumen</FormLabel>

                      {field.value ? (
                        <div
                          role='button'
                          className='flex h-[75px] items-center gap-4 rounded-2xl border-[1.5px] border-primary-blue-300 bg-primary-blue-50 p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FileText />
                          <h1 className='flex-1 truncate text-sm'>{field.value.name}</h1>
                          <X
                            role='button'
                            className='size-4'
                            onClick={(e) => {
                              e.stopPropagation()
                              clearFile()
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className='grid h-[75px] grid-cols-[32px_auto] items-start gap-2 rounded-2xl border-[1.5px] border-grey-500 bg-gradient-to-b from-white to-[#F0F0F0] p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]'
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Import className='text-dark-700' />
                          <div role='button' className='space-y-1'>
                            <h1 className='text-sm'>Klik Untuk Mengunggah Dokumen</h1>
                            <span className='text-xs text-grey-700'>Format dokumen .CSV</span>
                          </div>
                        </div>
                      )}

                      <FormControl>
                        <input
                          ref={fileInputRef}
                          className='hidden'
                          type='file'
                          accept='.csv'
                          capture='environment'
                          onChange={handleFileChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='button'
                  variant='link'
                  className='text-special-link p-0 h-fit'
                  onClick={() => {
                    window.open(data?.link, '_blank')
                  }}
                >
                  Lihat format data saksi
                </Button>
              </form>
            </Form>
          </div>

          <DialogFooter className='py-4 px-6 sm:justify-between'>
            <DialogClose className={cn(buttonVariants({ variant: 'secondary' }), 'bg-grey-500/50')}>Batal</DialogClose>
            <Button form='import-form' className='bg-success-700 hover:bg-success-700/90'>
              Impor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SaksiImportDialog
