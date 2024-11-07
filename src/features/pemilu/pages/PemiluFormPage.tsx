import LoadingOverlay from '@/components/LoadingOverlay'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import AddCandidateButton from '../components/AddCandidateButton'
import CandidateForm from '../components/CandidateForm'
import PemiluTypeForm from '../components/PemiluTypeForm'
import useFetchPemiluDetail from '../queries/useFetchPemiluDetail'
import useInsertCandidate from '../queries/useInsertCandidate'
import useInsertPemilu from '../queries/useInsertPemilu'
import useUpdateCandidate from '../queries/useUpdateCandidate'
import useUpdatePemilu from '../queries/useUpdatePemilu'
import { InsertCandidateParams, InsertPemiluParams, PemiluDetail, PemiluType } from '../service/pemilu.service'
import PemiluFormHeader from '../components/PemiluFormHeader'

const formSchema = z.object({
  name: z.string().trim().min(1, 'Tidak boleh kosong!'),
  type: z.string().trim().min(1, 'Tidak boleh kosong!'),
  province: z.string().trim().min(1, 'Tidak boleh kosong!'),
  city: z.string(),
  candidate: z
    .array(
      z.object({
        id: z.string().optional(),
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferArray<T extends any[]> = T extends (infer U)[] ? U : never

const getChangedCandidateFields = (
  original: InferArray<PemiluDetail['paslon']>,
  current: InferArray<PemiluFormType['candidate']>
) => {
  const changes: Partial<InsertCandidateParams> = {}

  if (Number(current.no) !== Number(original.no_urut)) changes.no_urut = Number(current.no)
  if (current.candidateName !== original.name) changes.name = current.candidateName
  if (current.viceCandidateName !== original.vice_name) changes.vice_name = current.viceCandidateName
  if (current.color !== original.warna) changes.warna = current.color
  if (current.image instanceof File) changes.foto = current.image

  return Object.keys(changes).length > 0 ? changes : null
}

const getChangedPemiluFields = (original: PemiluDetail, current: Omit<PemiluFormType, 'candidate'>) => {
  const changes: Partial<InsertPemiluParams> = {}

  if (current.name !== original.name) changes.name = current.name
  if (current.type !== original.id_jenis_pemilu) changes.id_jenis_pemilu = current.type
  if (current.province !== original.id_provinsi) changes.id_provinsi = current.province
  if (current.city !== original.id_kab_kota) changes.id_kab_kota = current.city

  return Object.keys(changes).length > 0 ? changes : null
}

const PemiluFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const originalData = useRef<PemiluDetail | null>(null)
  const isInitialized = useRef(false)

  const { data, isLoading: isLoadingDetail } = useFetchPemiluDetail(id || '')
  const { mutateAsync: insertPemilu, isPending: isLoadingPemilu } = useInsertPemilu()
  const { mutateAsync: insertCandidate, isPending: isLoadingCandidate } = useInsertCandidate()
  const { mutateAsync: updatePemilu, isPending: isLoadingUpdatePemilu } = useUpdatePemilu()
  const { mutateAsync: updateCandidate, isPending: isLoadingUpdateCandidate } = useUpdateCandidate()

  const isLoading =
    isLoadingDetail || isLoadingPemilu || isLoadingCandidate || isLoadingUpdatePemilu || isLoadingUpdateCandidate

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

  const onSubmit = async (values: PemiluFormType) => {
    const types = queryClient.getQueryData(['pemilu-type']) as PemiluType[]
    if (types.find((item) => item.id === values.type)?.tipe === 1 && !values.city) {
      form.setError('city', { type: 'custom', message: 'Tidak boleh kosong!' })
      return
    }
    try {
      if (!id) {
        const res = await insertPemilu({
          name: values.name,
          id_jenis_pemilu: values.type,
          id_provinsi: values.province,
          id_kab_kota: values.city
        })

        const { id_pemilu } = res.data

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
      } else {
        console.log(originalData.current)
        if (!originalData.current) return

        const pemiluChanges = getChangedPemiluFields(originalData.current, {
          name: values.name,
          type: values.type,
          province: values.province,
          city: values.city
        })

        if (pemiluChanges) {
          await updatePemilu({
            id,
            ...pemiluChanges
          })
        }

        await Promise.all(
          values.candidate
            .map((item) => {
              if (!item.id) return null // Skip new candidates for now
              const candidate = originalData.current?.paslon.find((p) => p.id_paslon === item.id)
              if (!candidate) return

              const candidateChanges = getChangedCandidateFields(
                {
                  foto: candidate?.foto,
                  id_paslon: candidate?.id_paslon,
                  name: candidate?.name,
                  no_urut: candidate?.no_urut,
                  vice_name: candidate?.vice_name,
                  warna: candidate?.warna
                },
                {
                  no: item.no,
                  candidateName: item.candidateName,
                  viceCandidateName: item.viceCandidateName,
                  color: item.color,
                  image: item.image
                }
              )

              if (candidateChanges) {
                return updateCandidate({
                  id: item.id!,
                  id_pemilu: id,
                  ...candidateChanges
                })
              }
              return null
            })
            .filter(Boolean)
        )

        const newCandidates = values.candidate.filter((item) => !item.id)
        if (newCandidates.length > 0) {
          await Promise.all(
            newCandidates.map((item) =>
              insertCandidate({
                id_pemilu: id,
                no_urut: Number(item.no),
                name: item.candidateName,
                vice_name: item.viceCandidateName,
                warna: item.color,
                foto: item.image as File
              })
            )
          )
        }
      }
      navigate('/pemilu')
    } catch (error) {
      console.error({ error })
    }
  }

  useEffect(() => {
    // Only initialize the form once when data is available
    if (data && !isInitialized.current) {
      originalData.current = data
      form.reset({
        name: data.name,
        type: data.id_jenis_pemilu,
        province: data.id_provinsi,
        city: data.id_kab_kota,
        candidate: data.paslon
          .sort((a, b) => a.no_urut - b.no_urut)
          .map((item) => ({
            id: item.id_paslon,
            candidateName: item.name,
            viceCandidateName: item.vice_name,
            no: item.no_urut + '',
            image: item.foto,
            color: item.warna
          }))
      })
      isInitialized.current = true
    }
    // Initialize empty form for new entry
    else if (!id && fieldArray.fields.length === 0) {
      fieldArray.append({
        candidateName: '',
        viceCandidateName: '',
        no: '',
        image: undefined,
        color: ''
      })
    }
  }, [data, fieldArray, form, id])

  return (
    <section className='flex flex-col -m-4 md:-m-6 2xl:-m-8'>
      {isLoading && <LoadingOverlay />}
      <PemiluFormHeader />

      <Form {...form}>
        <form id='pemilu-form' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col relative'>
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
