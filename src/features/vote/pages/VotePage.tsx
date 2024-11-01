import LoadingOverlay from '@/components/LoadingOverlay'
import PageFilter from '@/components/PageFilter'
import PageHeader from '@/components/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PemiluWithCandidate } from '@/features/pemilu/service/pemilu.service'
import useSearchParams from '@/hooks/useSearchParams'
import { useQueryClient } from '@tanstack/react-query'
import VoteItem from '../components/VoteItem'
import VoteVerificationPopup from '../components/VoteVerificationPopup'
import useFetchVote from '../queries/useFetchVote'

const VotePage = () => {
  const [searchParams] = useSearchParams()

  const subdistrict = searchParams.get('subdistrict') || ''
  const selectedPemilu = searchParams.get('pemilu') || ''

  const queryClient = useQueryClient()
  const pemiluData = queryClient.getQueryData(['pemilu-list']) as PemiluWithCandidate[]

  const { data, isLoading } = useFetchVote({ id_pemilu: selectedPemilu, id_kelurahan: subdistrict })

  const votes = data?.data || []
  const pemilu = pemiluData?.find((item) => item._id === selectedPemilu)

  return (
    <>
      <section className='flex flex-col gap-4 py-4'>
        {isLoading && <LoadingOverlay />}
        <PageHeader title={`Input Suara ${selectedPemilu && pemilu?.name}`} />

        <PageFilter />

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
                        <TableHead key={item.no_urut} className='text-center'>
                          {item.no_urut}
                        </TableHead>
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
                  {votes.length > 0 ? (
                    votes.map((item) => <VoteItem key={item.id_tps} data={item} pemilu={pemilu!} />)
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={1 + (pemilu?.paslon?.length ?? 0) + 7}
                        className='text-center text-sm text-muted-foreground'
                      >
                        Pilih pemilu dan kelurahan untuk menampilkan data.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <VoteVerificationPopup />
      </section>
    </>
  )
}

export default VotePage
