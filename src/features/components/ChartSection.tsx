import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart, XAxis, YAxis } from 'recharts'
import useFetchChart from '../dpt/queries/useFetchChart'

export const description = 'A pie chart with a label'

const genderChartConfig = {
  l: {
    label: 'Laki-laki',
    color: 'hsl(var(--chart-1))'
  },
  p: {
    label: 'Perempuan',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

const generationChartConfig = {
  count: {
    label: 'Total',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

const ChartSection = () => {
  const { data: chart } = useFetchChart()

  const genderChartData = [
    { gender: 'l', count: chart?.gender.L || 0, fill: 'var(--color-l)' },
    { gender: 'p', count: chart?.gender.P || 0, fill: 'var(--color-p)' }
  ]

  const totalCount = genderChartData.reduce((sum, item) => sum + item.count, 0)

  const generationChartData = Object.keys(chart?.generation || {}).map((key) => ({
    generation: key,
    count: chart?.generation[key]
  }))

  return (
    <div className='grid grid-cols-[.4fr_1fr] items-center gap-4'>
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
                  formatter={(value: number) => `${((value / totalCount) * 100).toFixed(1)}%`}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className='h-full'>
        <CardHeader className='items-center pb-2'>
          <CardTitle className='text-sm'>Statistik Berdasarkan Generasi</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={generationChartConfig}>
            <BarChart
              accessibilityLayer
              data={generationChartData}
              layout='vertical'
              margin={{
                right: 16
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey='generation'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey='count' type='number' hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
              <Bar dataKey='count' layout='vertical' fill='var(--color-count)' radius={4}>
                <LabelList
                  dataKey='generation'
                  position='insideLeft'
                  offset={8}
                  className='fill-[--color-label]'
                  fontSize={12}
                />
                <LabelList
                  dataKey='count'
                  position='right'
                  offset={8}
                  className='fill-foreground'
                  fontSize={12}
                  formatter={(value: number) => Number(value).toLocaleString('id')}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChartSection
