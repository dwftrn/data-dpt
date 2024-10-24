import LoadingOverlay from '@/components/LoadingOverlay'
import PageFilter from '@/components/PageFilter'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import VoteItem from '../components/VoteItem'
import useFetchVote from '../queries/useFetchVote'

const VotePage = () => {
  const queryClient = useQueryClient()
  const pemiluData = queryClient.getQueryData(['pemilu-list']) as PemiluWithCandidate[]

  const [selectedPemilu, setSelectedPemilu] = useState('')
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('')
  const { mutate: fetchVotes, data, isPending: isLoading } = useFetchVote()

  const votes = data?.data || []
  const pemilu = pemiluData?.find((item) => item._id === selectedPemilu)

  useEffect(() => {
    if (!selectedPemilu || !selectedSubdistrict) return

    fetchVotes({ id_kelurahan: selectedSubdistrict, id_pemilu: selectedPemilu })
  }, [fetchVotes, selectedPemilu, selectedSubdistrict])

  return (
    <section className='flex flex-col gap-4 py-4'>
      {isLoading && <LoadingOverlay />}
      <PageHeader title={`Input Suara ${selectedPemilu && pemilu?.name}`} onSelected={setSelectedPemilu} />

      <PageFilter
        onChange={(value, oldValue) => {
          if (value.subdistrict === oldValue?.subdistrict) return

          setSelectedSubdistrict(value.subdistrict)
        }}
      />

      <Card className='rounded-xl p-6'>
        <CardContent className='p-0'>
          <div className='border rounded-lg'>
            <Table>
              <TableHeader>
                <TableRow className='[&>*:not(:first-child):not(:last-child)]:border [&>*:not(:first-child):not(:last-child)]:border-t-0'>
                  <TableHead className='text-center'>TPS</TableHead>

                  {pemilu?.paslon
                    .sort((a, b) => Number(a.no_urut) - Number(b.no_urut))
                    .map((item) => (
                      <TableHead className='text-center'>{item.no_urut}</TableHead>
                    ))}

                  <TableHead className='text-center'>DPT</TableHead>
                  <TableHead className='text-center'>Sah</TableHead>
                  <TableHead className='text-center'>Tidak Sah</TableHead>
                  <TableHead className='text-center'>C1</TableHead>
                  <TableHead className='text-center'>Status</TableHead>
                  <TableHead className='text-center'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {votes.map((item) => (
                  <VoteItem key={item.id_tps} data={item} pemilu={pemilu!} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default VotePage
