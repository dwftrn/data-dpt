import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useEffect, useMemo, useState } from 'react'
import { Label, LabelList, Pie, PieChart } from 'recharts'
import { toast } from 'sonner'
import useQuickCountQueries from '../queries/useQuickCountQueries'
import { QuickCountCandidate } from '../services/dashboard.service'
import { summarizeVotes } from '../utils/utils'
import CimahiMap from './CimahiMap'

const chartConfig = {
  jumlah_suara: {
    label: 'Suara'
  }
} satisfies ChartConfig

type Vote = (Omit<QuickCountCandidate, 'foto' | 'nama' | 'nama_vice'> & { name: string; vice_name: string }) & {
  fill: string
}

const MapContainer = () => {
  const { data: districtsData, isLoading } = useQuickCountQueries()
  const [selectedRegion, setSelectedRegion] = useState('')
  const [activeMapId, setActiveMapId] = useState('')

  // Memoize the chart data and total calculations
  const { chartData, total } = useMemo(() => {
    if (!districtsData) {
      return { chartData: [], total: 0 }
    }

    if (!selectedRegion) {
      const { totalVotes, votes } = summarizeVotes(districtsData)
      return { chartData: votes, total: totalVotes }
    }

    const data = districtsData.find((item) => item.name.toLowerCase() === selectedRegion.toLowerCase())

    if (!data) {
      return { chartData: [], total: 0 }
    }

    const votes = data.votes.map((item) => ({ ...item, fill: item.warna }))
    const totalVotes = votes.reduce((acc, curr) => acc + curr.jumlah_suara, 0)

    return { chartData: votes, total: totalVotes }
  }, [districtsData, selectedRegion])

  const handleClickMap = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target
    if (!('id' in target) || !target.id || !districtsData) return

    const name = (target.id as string).split('-')[1]
    const data = districtsData.find((item) => item.name.toLowerCase().includes(name.toLowerCase()))

    if (!data) return

    if (data.votes.every((item) => item.jumlah_suara === 0)) {
      toast.warning('Belum Ada Data', {
        description: `Kelurahan ${name} belum memiliki data`
      })
      return
    }

    // Toggle selection
    if (data.name === selectedRegion) {
      setSelectedRegion('')
      setActiveMapId('')
    } else {
      setSelectedRegion(data.name)
      setActiveMapId(target.id as string)
    }
  }

  // Update map colors once when districtsData changes
  useEffect(() => {
    if (!districtsData) return

    districtsData.forEach((item) => {
      const higher = item.votes[0]
      const color = higher.persentase > 0 ? higher.warna : '#E6E6E6'
      const element = document.querySelector(`#map-${item.name.replace(' ', '-').toLowerCase()}`)
      if (element) {
        element.setAttribute('style', `fill: ${color}`)
      }
    })
  }, [districtsData])

  return (
    <>
      <h1 className='font-semibold text-lg'>Peta Perolehan Suara</h1>
      <div data-loading={isLoading} className='w-full grid grid-cols-2 group'>
        <div className='grid place-content-center'>
          <CimahiMap onClick={handleClickMap} data-active={activeMapId} />
        </div>

        <Card
          className='flex flex-col h-fit border-0 rounded-2xl border-b-8 py-4 px-10 shadow-[0_4px_4px_-4px_rgba(12,12,13,0.05),0_16px_16px_-8px_rgba(12,12,13,0.1)]'
          style={{
            borderColor: (chartData.sort((a, b) => b.jumlah_suara - a.jumlah_suara).at(0) as Vote)?.fill
          }}
        >
          <CardHeader className='p-0'>
            <CardTitle className='font-bold capitalize leading-9'>
              {selectedRegion ? 'Kelurahan ' + selectedRegion.toLowerCase() : 'Kota Cimahi'}
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1 flex items-center justify-center gap-6 p-0'>
            {chartData.length === 0 || chartData.every((item) => item.jumlah_suara === 0) ? (
              <div className='grid size-full place-content-center'>
                <h1>Belum Ada Data</h1>
              </div>
            ) : (
              <>
                <ChartContainer
                  config={chartConfig}
                  className='mx-auto aspect-square size-[300px] [&_.recharts-pie-label-text]:fill-foreground'
                >
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent indicator='line' label='label' />} />
                    <Pie
                      data={chartData.map((item) => ({
                        ...item,
                        label: `${item.name} & ${item.vice_name}`
                      }))}
                      dataKey='jumlah_suara'
                      nameKey='label'
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <LabelList
                        dataKey='persentase'
                        className='fill-current'
                        stroke='none'
                        fontSize={16}
                        formatter={(value: keyof typeof chartConfig) =>
                          Number(value).toLocaleString('id', {
                            maximumFractionDigits: 2
                          }) + '%'
                        }
                      />
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                                <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                                  {total.toLocaleString('id')}
                                </tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                                  Suara Sah
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>

                <div className='flex flex-col gap-4 flex-1'>
                  {chartData
                    .sort((a, b) => +a.no_urut - +b.no_urut)
                    .map((item) => (
                      <div key={item.no_urut} className='flex items-center gap-3'>
                        <div className='size-2.5 rounded-full' style={{ backgroundColor: (item as Vote).fill }} />
                        <div className='text-sm max-w-[200px]'>
                          <p className='truncate w-full block'>{item.name}</p>
                          <p className='truncate w-full block'>{item.vice_name}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default MapContainer
