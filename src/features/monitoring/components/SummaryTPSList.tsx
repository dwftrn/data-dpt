/* eslint-disable @typescript-eslint/no-explicit-any */
import BoxIcon from '@/assets/3d-box-icon.svg'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useSearchParams from '@/hooks/useSearchParams'
import { cn } from '@/lib/utils'
import { Box, Loader2Icon } from 'lucide-react'
import { ReactSVG } from 'react-svg'
import useFetchGroupedTPS from '../queries/useFetchGroupedTPS'

function filterEmptyArrays(data: any[]): any[] {
  return data
    .map((region) => {
      const regionName = Object.keys(region)[0] // Extract the region name
      const areas = region[regionName] // Extract the areas

      // Filter areas recursively
      const filteredAreas = areas
        .map((area: { [x: string]: any }) => {
          const areaName = Object.keys(area)[0] // Extract the area name
          const tpsData = area[areaName] // Extract the TPS data

          // Filter out empty arrays
          const filteredTpsData = tpsData.filter((tps: any) => Object.keys(tps).length > 0)

          // Return the area only if it has non-empty TPS data
          return filteredTpsData.length > 0 ? { [areaName]: filteredTpsData } : null
        })
        .filter((area: null) => area !== null) // Remove null areas

      // Return the region only if it has non-empty areas
      return filteredAreas.length > 0 ? { [regionName]: filteredAreas } : null
    })
    .filter((region) => region !== null) // Remove null regions
}

const SummaryTPSList = ({ status }: { status: 0 | 2 | 1 | null }) => {
  const [searchParams] = useSearchParams()
  const electionId = searchParams.get('pemilu') || ''

  const { data, isLoading } = useFetchGroupedTPS(electionId, status)

  const filtered = filterEmptyArrays(data || [])

  return (
    <section className='h-[70vh] overflow-y-auto -mr-6 pr-6'>
      {isLoading ? (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 text-grey-700'>
          <Loader2Icon className='mx-auto size-16 animate-spin' />
        </div>
      ) : filtered.length > 0 ? (
        <Accordion type='single' collapsible>
          {filtered?.map((districts) =>
            Object.keys(districts).map((district) =>
              districts[district].map((subdistricts: { [x: string]: any[] }) =>
                Object.keys(subdistricts).map((subdistrict) => (
                  <AccordionItem key={subdistrict} value={`item-${subdistrict}`} className='border-none'>
                    <AccordionTrigger className='border-none bg-grey-50 px-[22px] py-[19.5px] text-sm font-bold hover:no-underline'>
                      {subdistrict}, {district}
                    </AccordionTrigger>
                    {subdistricts[subdistrict].map((item) => (
                      <AccordionContent key={item.id_tps} className='flex items-center gap-3 px-[22px] py-3.5'>
                        <ReactSVG
                          src={BoxIcon}
                          beforeInjection={(svg) => {
                            svg.setAttribute('width', '32')
                            svg.setAttribute('height', '32')
                          }}
                          className={cn({
                            '[&_rect]:fill-special-orange': status === 0,
                            '[&_rect]:fill-success-700': status === 1,
                            '[&_rect]:fill-primary-red-700': status === 2,
                            '[&_rect]:fill-grey-700': status === null
                          })}
                        />
                        <h4 className='text-sm font-semibold'>TPS {item.NO}</h4>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                ))
              )
            )
          )}
        </Accordion>
      ) : (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 text-grey-700'>
          <Box className='mx-auto size-16' />
          <h1>Belum ada data</h1>
        </div>
      )}
    </section>
  )
}

export default SummaryTPSList
