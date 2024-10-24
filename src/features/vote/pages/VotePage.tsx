import PageFilter from '@/components/PageFilter'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import VoteItem from '../components/VoteItem'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Pemilu } from '@/features/pemilu/service/pemilu.service'

const VotePage = () => {
  const queryClient = useQueryClient()
  const pemilu = queryClient.getQueryData(['pemilu']) as Pemilu[]

  const [selectedPemilu, setSelectedPemilu] = useState('')

  return (
    <section className='flex flex-col gap-4 py-4'>
      <PageHeader
        title={`Input Suara ${selectedPemilu && pemilu.find((e) => e._id === selectedPemilu)?.name}`}
        onSelected={setSelectedPemilu}
      />

      <PageFilter />

      <Card className='rounded-xl p-6'>
        <CardContent className='p-0'>
          <div className='border rounded-lg'>
            <Table>
              <TableHeader>
                <TableRow className='[&>*:not(:first-child):not(:last-child)]:border [&>*:not(:first-child):not(:last-child)]:border-t-0'>
                  <TableHead className='text-center'>TPS</TableHead>
                  <TableHead className='text-center'>01</TableHead>
                  <TableHead className='text-center'>02</TableHead>
                  <TableHead className='text-center'>03</TableHead>
                  <TableHead className='text-center'>04</TableHead>
                  <TableHead className='text-center'>DPT</TableHead>
                  <TableHead className='text-center'>Sah</TableHead>
                  <TableHead className='text-center'>Tidak Sah</TableHead>
                  <TableHead className='text-center'>C1</TableHead>
                  <TableHead className='text-center'>Status</TableHead>
                  <TableHead className='text-center'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <VoteItem />
                <VoteItem />
                <VoteItem />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default VotePage
