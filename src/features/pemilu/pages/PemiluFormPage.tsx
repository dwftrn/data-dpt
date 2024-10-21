import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import AddCandidateButton from '../components/AddCandidateButton'
import CandidateForm from '../components/CandidateForm'
import PemiluTypeForm from '../components/PemiluTypeForm'

const formSchema = z.object({
  name: z.string().trim().min(1, 'Tidak boleh kosong!'),
  type: z.string().trim().min(1, 'Tidak boleh kosong!'),
  province: z.string().trim().min(1, 'Tidak boleh kosong!'),
  city: z.string(),
  candidate: z.array(
    z.object({
      no: z
        .string()
        .trim()
        .min(1, 'Tidak boleh kosong!')
        .refine((val) => !isNaN(Number(val)), { message: 'Harus berupa angka!' }),
      color: z.string().trim().min(1, 'Tidak boleh kosong!'),
      image: z
        .union([z.instanceof(File), z.string()])
        .optional()
        .refine(
          (file) => {
            if (file === undefined) return false
            if (typeof file === 'string') return true
            return file.size > 0
          },
          { message: 'Pilih Foto' }
        ),
      candidateName: z.string().trim().min(1, 'Tidak boleh kosong!'),
      viceCandidateName: z.string().trim().min(1, 'Tidak boleh kosong!')
    })
  )
})

export type PemiluFormType = z.infer<typeof formSchema>

const PemiluFormPage = () => {
  const form = useForm<PemiluFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      province: '',
      city: '',
      candidate: []
    }
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'candidate'
  })

  return (
    <section className='flex flex-col -m-4 md:-m-6 2xl:-m-8'>
      <Form {...form}>
        <form className='flex flex-col relative'>
          <div className='h-14 lg:h-[60px] flex items-center justify-between bg-white absolute top-0 inset-x-0 px-4 md:px-6 2xl:px-8 shadow'>
            <h1 className='font-semibold'>Tambah Pemilu</h1>
            <Button className='gap-2'>
              <Save className='size-4' />
              Simpan
            </Button>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-14 lg:mt-[60px] p-4 md:p-6 2xl:p-8 items-start'>
            <PemiluTypeForm form={form} />

            <div className='flex flex-col gap-4'>
              {fieldArray.fields.map((field, index) => (
                <CandidateForm key={field.id} form={form} fieldArray={fieldArray} index={index} />
              ))}
              <AddCandidateButton fieldArray={fieldArray} />
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default PemiluFormPage
