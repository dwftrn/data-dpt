import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Info } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Label, Pie, PieChart } from 'recharts'
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
  const [chartData, setChartData] = useState<Vote[]>([])
  const total = useRef(0)
  const region = useRef('')
  const activeMapId = useRef('')

  const handleClickMap = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = e.target
    if (!('id' in target)) return
    if (!target.id) return

    const name = (target.id as string).split('-')[1]
    const data = districtsData.find((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    const votes = data?.votes.map((item) => ({ ...item, fill: item.warna }))

    if (!data || !votes) return

    if (votes.every((item) => item.jumlah_suara === 0)) {
      toast.warning('Belum Ada Data', { description: `Kelurahan ${name} belum memiliki data` })
      return
    }

    if (data.name === region.current) {
      const { totalVotes, ...rest } = summarizeVotes(districtsData)
      setChartData(rest.votes)
      region.current = ''
      total.current = totalVotes
      activeMapId.current = ''
      return
    }

    setChartData(votes)
    region.current = data.name
    total.current = votes.reduce((acc, curr) => acc + curr.jumlah_suara, 0)
    activeMapId.current = target.id as string
  }

  useEffect(() => {
    districtsData.map((item) => {
      const higher = item.votes[0]
      const color = higher.persentase > 0 ? higher.warna : '#E6E6E6'
      document
        .querySelector(`#map-${item.name.replace(' ', '-').toLowerCase()}`)
        ?.setAttribute('style', `fill: ${color}`)
    })
  }, [districtsData])

  useEffect(() => {
    if (isLoading) return

    const { totalVotes, ...rest } = summarizeVotes(districtsData)
    total.current = totalVotes
    setChartData(rest.votes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <>
      <h1 className='font-semibold text-lg'>Peta Perolehan Suara</h1>
      <div className='rounded-full bg-primary-blue-700 text-white text-sm font-thin flex items-center gap-2 p-1 w-fit pr-6'>
        <Info />
        <h2>Klik salah satu wilayah untuk melihat persentase perolehan suara</h2>
      </div>
      <div data-loading={isLoading} className='w-full grid grid-cols-2 group'>
        <div className='grid place-content-center'>
          <CimahiMap onClick={handleClickMap} data-active={activeMapId.current} />
        </div>

        <Card
          className='flex flex-col h-fit border-0 rounded-2xl border-b-8 py-6 px-10 shadow-[0_4px_4px_-4px_rgba(12,12,13,0.05),0_16px_16px_-8px_rgba(12,12,13,0.1)]'
          style={{
            borderColor: chartData.sort((a, b) => b.jumlah_suara - a.jumlah_suara).at(0)?.fill
          }}
        >
          <CardHeader className='p-0'>
            <CardTitle className='font-bold capitalize leading-9'>
              {region.current ? 'Kelurahan' + ' ' + region.current.toLowerCase() : 'Kota Cimahi'}
            </CardTitle>
            {/* <CardDescription className='text-sm font-thin capitalize'>Cimahi Utara • Kota Cimahi</CardDescription> */}
          </CardHeader>
          <CardContent className='flex-1 flex items-center justify-center gap-6 p-0'>
            {chartData.every((item) => item.jumlah_suara === 0) ? (
              <div className='grid size-full place-content-center'>
                <h1>Belum Ada Data</h1>
              </div>
            ) : (
              <>
                <ChartContainer
                  config={chartConfig}
                  className='mx-auto aspect-square size-[232px] [&_.recharts-pie-label-text]:fill-foreground'
                >
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent indicator='line' label='label' />} />
                    <Pie
                      data={chartData.map((item) => ({ ...item, label: `${item.name} & ${item.vice_name}` }))}
                      dataKey='jumlah_suara'
                      nameKey='label'
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                                <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                                  {total.current.toLocaleString('id')}
                                </tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                                  Suara
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
                        <div className='size-2.5 rounded-full' style={{ backgroundColor: item.fill }}></div>
                        <div className='text-sm'>
                          <p className='truncate'>{item.name}</p>
                          <p className='truncate'>{item.vice_name}</p>
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
