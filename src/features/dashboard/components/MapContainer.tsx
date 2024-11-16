import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useEffect, useRef, useState } from 'react'
import { Label, LabelList, Pie, PieChart } from 'recharts'
import useQuickCountQueries from '../queries/useQuickCountQueries'
import { QuickCountCandidate } from '../services/dashboard.service'
import { summarizeVotes } from '../utils/utils'
import CimahiMap from './CimahiMap'
import { toast } from 'sonner'

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

    setChartData(votes)
    region.current = data.name
    total.current = votes.reduce((acc, curr) => acc + curr.jumlah_suara, 0)
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
      <div data-loading={isLoading} className='w-full grid grid-cols-2 group'>
        <div className='grid place-content-center'>
          <CimahiMap onClick={handleClickMap} />
        </div>

        <Card className='flex flex-col'>
          <CardHeader className='items-center pb-0'>
            <CardTitle>Perolehan Suara</CardTitle>
            <CardDescription>{region.current || 'Semua Wilayah'}</CardDescription>
          </CardHeader>
          <CardContent className='flex-1 pb-0'>
            {chartData.every((item) => item.jumlah_suara === 0) && (
              <div className='grid size-full place-content-center'>
                <h1>Belum Ada Data</h1>
              </div>
            )}
            <ChartContainer
              config={chartConfig}
              className='mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground'
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent indicator='line' label='label' />} />
                <Pie
                  data={chartData.map((item) => ({ ...item, label: `${item.name} & ${item.vice_name}` }))}
                  dataKey='jumlah_suara'
                  nameKey='label'
                  label={({ jumlah_suara }) => Number(jumlah_suara).toLocaleString('id', { maximumFractionDigits: 2 })}
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <LabelList
                    dataKey='persentase'
                    className='fill-current'
                    stroke='none'
                    fontSize={16}
                    formatter={(value: keyof typeof chartConfig) =>
                      Number(value).toLocaleString('id', { maximumFractionDigits: 2 }) + '%'
                    }
                  />
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
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default MapContainer
