import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import useSearchParams from '@/hooks/useSearchParams'
import { useEffect, useState } from 'react'

const SearchBar = ({ placeholder = 'Cari...' }: { placeholder?: string }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const [search, setSearch] = useState(q)

  const sanitizeSearch = (value: string) => {
    return value.replace(/\\/g, '\\\\')
  }

  const handleSearchUpdate = (value: string) => {
    const sanitizedValue = sanitizeSearch(value)
    const currentParams = Object.fromEntries(searchParams.entries())

    if (sanitizedValue === '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { q: _, ...restParams } = currentParams
      setSearchParams(restParams)
    } else {
      setSearchParams({ ...currentParams, q: sanitizedValue })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (value === '') {
      handleSearchUpdate('')
    }
  }

  const handleSearch = () => {
    handleSearchUpdate(search)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  useEffect(() => {
    if (search) return

    setSearchParams({ q: search })
  }, [search, setSearchParams])

  return (
    <div className='relative w-[375px]'>
      <Search className='absolute top-2.5 left-3 size-5' />
      <Input
        placeholder={placeholder}
        className='bg-white border-grey-500 pl-10'
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant='secondary'
        size='sm'
        className='absolute top-1.5 right-1 h-[30px] text-xs font-normal'
        onClick={handleSearch}
      >
        Cari
      </Button>
    </div>
  )
}

export default SearchBar
