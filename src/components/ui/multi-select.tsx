import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

export interface Option {
  label: string
  value: string
}

export interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  className?: string
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  className
}) => {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (value: string): void => {
    if (value === '0') {
      // If "All" is selected
      if (selected.includes('0')) {
        // If "All" was already selected, unselect it
        onChange([])
      } else {
        // If "All" wasn't selected, select only "All"
        onChange(['0'])
      }
    } else {
      // If a regular option is selected
      let newSelected: string[]
      if (selected.includes(value)) {
        // If the option was already selected, unselect it
        newSelected = selected.filter((item) => item !== value)
      } else {
        // If the option wasn't selected, select it and ensure "All" is unselected
        newSelected = selected.filter((item) => item !== '0')
        newSelected.push(value)
      }
      onChange(newSelected)
    }
  }

  const getDisplayText = () => {
    if (selected.length === 0) {
      return placeholder
    }
    if (selected.includes('0')) {
      return 'Semua'
    }
    return `${selected.length} dipilih`
  }

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            data-selected={selected.length > 0 && !selected.includes('0')}
            aria-expanded={open}
            className='w-full justify-between bg-white data-[selected=true]:ring-2'
          >
            {getDisplayText()}
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0 text-sm' align='start'>
          <div className='max-h-64 overflow-auto bg-white'>
            <div
              onClick={() => handleSelect('0')}
              className={cn(
                'flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground',
                'outline-none'
              )}
              role='option'
              aria-selected={selected.includes('0')}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect('0')
                }
              }}
            >
              <div className={cn('flex h-4 w-4 items-center justify-center rounded-sm')}>
                {selected.includes('0') && <Check className='h-3 w-3' />}
              </div>
              Semua
            </div>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent hover:text-accent-foreground',
                  'focus:bg-accent focus:text-accent-foreground',
                  'outline-none'
                )}
                role='option'
                aria-selected={selected.includes(option.value)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelect(option.value)
                  }
                }}
              >
                <div className={cn('flex h-4 w-4 items-center justify-center rounded-sm')}>
                  {selected.includes(option.value) && <Check className='h-3 w-3' />}
                </div>
                {option.label}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default MultiSelect
