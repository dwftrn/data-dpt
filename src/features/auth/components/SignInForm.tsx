import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import md5 from 'md5'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import useSignIn from '../queries/useSignIn'

const formSchema = z.object({
  username: z.string().trim().min(1, 'Tidak boleh kosong!'),
  password: z.string().trim().min(1, 'Tidak boleh kosong!')
})

type FormType = z.infer<typeof formSchema>

const SignInForm = () => {
  const navigate = useNavigate()

  const { mutateAsync: signIn, isPending: isLoading } = useSignIn()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (values: FormType) => {
    console.log({ values })
    try {
      const res = await signIn({
        ...values,
        password: md5(values.password).toString()
      })

      const { access_token } = res.data
      localStorage.setItem('access_token', access_token)

      navigate('/')
    } catch (error) {
      if (typeof error !== 'object' || error === null) {
        toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
        return
      }

      if ('message' in error) {
        if (typeof error.message === 'string' && error.message.toLowerCase().includes('invalid')) {
          form.setError('password', { type: 'custom', message: 'Nama pengguna atau kata sandi salah' })
        } else {
          toast.error('Terjadi Kesalahan', { description: 'Coba lagi dalam beberapa saat' })
        }
      }
    }
  }

  return (
    <Card className='z-50 w-full max-w-sm rounded-2xl shadow-lg'>
      <CardHeader className='text-center text-[#37485B]'>
        <CardTitle className='text-2xl text-[#37485B]'>Masuk</CardTitle>
        <CardDescription>Masuk dengan nama pengguna dan kata sandi.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='grid gap-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pengguna</FormLabel>
                  <FormControl>
                    <Input placeholder='Ketikkan nama pengguna...' disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Ketikkan kata sandi...' disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button isLoading={isLoading} disabled={isLoading} className='w-full'>
              Masuk
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default SignInForm
