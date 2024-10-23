import LoadingOverlay from '@/components/LoadingOverlay'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Save } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import AddCandidateButton from '../components/AddCandidateButton'
import CandidateForm from '../components/CandidateForm'
import PemiluTypeForm from '../components/PemiluTypeForm'
import useInsertCandidate from '../queries/useInsertCandidate'
import useInsertPemilu from '../queries/useInsertPemilu'
import { PemiluType } from '../service/pemilu.service'

const formSchema = z.object({
  name: z.string().trim().min(1, 'Tidak boleh kosong!'),
  type: z.string().trim().min(1, 'Tidak boleh kosong!'),
  province: z.string().trim().min(1, 'Tidak boleh kosong!'),
  city: z.string(),
  candidate: z
    .array(
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
    .nonempty('Tidak boleh kosong!')
})

export type PemiluFormType = z.infer<typeof formSchema>

const PemiluFormPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync: insertPemilu, isPending: isLoadingPemilu } = useInsertPemilu()
  const { mutateAsync: insertCandidate, isPending: isLoadingCandidate } = useInsertCandidate()

  const isLoading = isLoadingPemilu || isLoadingCandidate

  const form = useForm<PemiluFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      province: '',
      city: '',
      candidate: [
        {
          no: '',
          color: '',
          candidateName: '',
          viceCandidateName: '',
          image: ''
        }
      ]
    }
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'candidate'
  })

  const onSubmit = async (values: PemiluFormType) => {
    const types = queryClient.getQueryData(['pemilu-type']) as PemiluType[]
    if (types.find((item) => item.id === values.type)?.tipe === 1 && !values.city) {
      form.setError('city', { type: 'custom', message: 'Tidak boleh kosong!' })
      return
    }
    try {
      const res = await insertPemilu({
        name: values.name,
        id_jenis_pemilu: values.type,
        id_provinsi: values.province,
        id_kab_kota: values.city
      })

      const { id_pemilu } = res.data
      console.log({ id_pemilu })

      await Promise.all(
        values.candidate.map((item) =>
          insertCandidate({
            id_pemilu,
            no_urut: Number(item.no),
            name: item.candidateName,
            vice_name: item.viceCandidateName,
            warna: item.color,
            foto: item.image as File
          })
        )
      )
      navigate('/pemilu')
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <section className='flex flex-col -m-4 md:-m-6 2xl:-m-8'>
      {isLoading && <LoadingOverlay />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col relative'>
          <div className='h-14 lg:h-[60px] flex items-center justify-between bg-white absolute top-0 inset-x-0 px-4 md:px-6 2xl:px-8 shadow'>
            <h1 className='font-semibold'>Tambah Pemilu</h1>
            <div className='flex items-center gap-4'>
              <Link to='/pemilu'>
                <Button type='button' variant='outline' className='gap-2'>
                  Batal
                </Button>
              </Link>
              <Button className='gap-2'>
                <Save className='size-4' />
                Simpan
              </Button>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-14 lg:mt-[60px] p-4 md:p-6 2xl:p-8 items-start'>
            <PemiluTypeForm form={form} />

            <div className='flex flex-col gap-4'>
              {fieldArray.fields.map((field, index) => (
                <CandidateForm key={field.id} form={form} fieldArray={fieldArray} index={index} />
              ))}
              <AddCandidateButton form={form} fieldArray={fieldArray} />
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default PemiluFormPage
