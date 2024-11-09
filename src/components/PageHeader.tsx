import SelectPemilu from './SelectPemilu'

type Props = {
  title: string
  onSelected?(value: string): void
}

const PageHeader = ({ title, onSelected }: Props) => {
  return (
    <div className='flex items-center justify-between h-14 lg:h-[60px] -mt-4 md:-mt-6 2xl:-mt-8'>
      <h1 className='font-semibold text-lg'>{title}</h1>

      <SelectPemilu onSelected={onSelected} />
    </div>
  )
}

export default PageHeader
