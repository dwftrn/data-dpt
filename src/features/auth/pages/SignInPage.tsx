import SignInForm from '../components/SignInForm'

const SignInPage = () => {
  return (
    <div className='flex h-dvh w-dvw items-center justify-center p-8 bg-primary relative'>
      <div className='h-3/5 w-full absolute bg-primary-blue-300 top-0'></div>
      <div className='z-50 flex flex-col items-center justify-center gap-6'>
        <SignInForm />
      </div>
    </div>
  )
}

export default SignInPage
