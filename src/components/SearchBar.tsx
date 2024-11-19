import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import useSearchParams from '@/hooks/useSearchParams'
import { useEffect, useState } from 'react'

const SearchBar = ({ placeholder = 'Cari...' }: { placeholder?: string }) => {
  const [searchParams, setsearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const [search, setSearch] = useState(q)

  useEffect(() => {
    if (search) return

    setsearchParams({ q: search })
  }, [search, setsearchParams])

  return (
    <div className='relative w-[375px]'>
      <Search className='absolute top-2.5 left-3 size-5' />
      <Input
        placeholder={placeholder}
        className='bg-white border-grey-500 pl-10'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return
          setsearchParams({ q: search })
        }}
      />
      <Button
        variant='secondary'
        size='sm'
        className='absolute top-1.5 right-1 h-[30px] text-xs font-normal'
        onClick={() => setsearchParams({ q: search })}
      >
        Cari
      </Button>
    </div>
  )
}

export default SearchBar
