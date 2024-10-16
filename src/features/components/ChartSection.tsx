import useFetchChart from '../dpt/queries/useFetchChart'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

const ChartSection = () => {
  const { data: chart } = useFetchChart()

  const genderChart = chart?.gender
  const generationChart = chart?.generation

  const genderSeries = Object.values(genderChart || {})
  const genderOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'pie'
    },
    labels: ['Laki-laki', 'Perempuan'],
    colors: ['#8CD5EB', '#f07070'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }

  const generationSeries = [{ data: Object.values(generationChart || {}) }]
  const generationOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true
      }
    },
    colors: ['#f07070'],
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: Object.keys(generationChart || {})
    }
  }

  return (
    <div className='flex items-center w-full justify-between mb-6'>
      <ReactApexChart options={genderOptions} series={genderSeries} type='pie' width={350} />
      <ReactApexChart options={generationOptions} series={generationSeries} type='bar' width={600} />
    </div>
  )
}

export default ChartSection
