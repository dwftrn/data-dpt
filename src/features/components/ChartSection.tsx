import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart, XAxis } from 'recharts'
import useFetchChart from '../dpt/queries/useFetchChart'

export const description = 'A pie chart with a label'

const genderChartConfig = {
  l: {
    label: 'Laki-laki',
    color: 'hsl(var(--primary-blue-300))'
  },
  p: {
    label: 'Perempuan',
    color: 'hsl(var(--primary-red-500))'
  }
} satisfies ChartConfig

const generationChartConfig = {
  count: {
    label: 'Total',
    color: 'hsl(var(--primary-red-500))'
  }
} satisfies ChartConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomizedTick = (props: any) => {
  const { x, y, payload } = props
  const { value } = payload

  console.log({ value })

  const generation = value.split(' (')[0]
  const range = '(' + value.split(' (')[1]

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill='#666' textAnchor='middle'>
        <tspan x='0'>{generation}</tspan>
        <tspan x='0' dy='20'>
          {range}
        </tspan>
      </text>
    </g>
  )
}

const ChartSection = () => {
  const { data: chart } = useFetchChart()

  const genderChartData = [
    { gender: 'l', count: chart?.gender.L || 0, fill: 'var(--color-l)' },
    { gender: 'p', count: chart?.gender.P || 0, fill: 'var(--color-p)' }
  ]

  const totalCount = genderChartData.reduce((sum, item) => sum + item.count, 0)

  const shortenedData = Object.fromEntries(
    Object.entries(chart?.generation || {})
      .map(([key, value]) => {
        const match = key.match(/^(.*?) \((\d+)[–-](\d+)\)$/)
        if (!match) return [key, value] // If no match, return the original key-value pair

        const [_, label, startAge, endAge] = match
        const shortenedLabel = label
          .replace('Baby Boomer', 'Baby Boom.')
          .replace('Gen ', 'Gen ')
          .replace('Millennials', 'Millen.')
          .replace('Silent Generation', 'Silent Gen.')
        return [`${shortenedLabel} (${startAge}–${endAge})`, value, parseInt(startAge)]
      })
      .sort((a, b) => +b[2] - +a[2]) // Sort by the extracted start age
      .map(([key, value]) => [key, value]) // Remove the extracted start age after sorting
  )

  const generationChartData = Object.keys(shortenedData).map((key) => ({ generation: key, count: shortenedData[key] }))

  return (
    <div className='grid grid-cols-2 items-center gap-4'>
      <Card className='h-full'>
        <CardHeader className='items-center pb-2'>
          <CardTitle className='text-sm'>Statistik Berdasarkan Generasi</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={generationChartConfig}>
            <BarChart
              accessibilityLayer
              data={generationChartData}
              margin={{
                top: 20
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='generation'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                height={60}
                tick={<CustomizedTick />}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey='count' fill='var(--color-count)' radius={8}>
                <LabelList
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                  formatter={(value: number) => Number(value.toLocaleString('id'))}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className='flex flex-col h-full'>
        <CardHeader className='items-center pb-2'>
          <CardTitle className='text-sm'>Persentase Berdasarkan Jenis Kelamin</CardTitle>
        </CardHeader>
        <CardContent className='m-auto'>
          <ChartContainer
            config={genderChartConfig}
            className='mx-auto aspect-square min-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground'
          >
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Pie
                data={genderChartData}
                dataKey='count'
                label={({ count }) => Number(count).toLocaleString('id')}
                nameKey='gender'
              >
                <LabelList
                  dataKey='count'
                  position='right'
                  className='fill-primary-blue-700 stroke-none text-lg'
                  formatter={(value: number) => `${((value / totalCount) * 100).toFixed(1)}%`}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChartSection
