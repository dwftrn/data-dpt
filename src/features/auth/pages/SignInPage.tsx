import SignInForm from '../components/SignInForm'

const SignInPage = () => {
  return (
    <>
      <div className='flex h-dvh w-dvw items-center justify-center p-8'>
        <div className='z-50 flex flex-col items-center justify-center gap-6'>
          <SignInForm />
        </div>
      </div>
    </>
  )
}

export default SignInPage
