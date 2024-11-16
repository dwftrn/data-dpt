import { QuickCountCandidate, QuickCountCard } from '../services/dashboard.service'

export function summarizeVotes(data: QuickCountCard[]): QuickCountCard & {
  votes: ((Omit<QuickCountCandidate, 'foto' | 'nama' | 'nama_vice'> & { name: string; vice_name: string }) & {
    fill: string
  })[]
} & { totalVotes: number } {
  // Initialize map to store combined votes
  const voteSummary = new Map<
    string,
    (Omit<QuickCountCandidate, 'foto' | 'nama' | 'nama_vice'> & { name: string; vice_name: string }) & {
      fill: string
    }
  >()

  // Process each region
  data.forEach((region) => {
    region.votes.forEach((vote) => {
      const existingSummary = voteSummary.get(vote.id_paslon)

      if (!existingSummary) {
        voteSummary.set(vote.id_paslon, {
          id_paslon: vote.id_paslon,
          name: vote.name,
          vice_name: vote.vice_name,
          no_urut: vote.no_urut,
          warna: vote.warna,
          jumlah_suara: vote.jumlah_suara,
          persentase: 0,
          fill: vote.warna
        })
      } else {
        existingSummary.jumlah_suara += vote.jumlah_suara
      }
    })
  })

  // Convert to array and calculate percentages
  const summaryArray = Array.from(voteSummary.values())
  const totalVotes = summaryArray.reduce((sum, candidate) => sum + candidate.jumlah_suara, 0)

  // Calculate percentages if total votes is not zero
  if (totalVotes > 0) {
    summaryArray.forEach((candidate) => {
      candidate.persentase = (candidate.jumlah_suara / totalVotes) * 100
    })
  }

  // Sort by candidate number (no_urut)
  const sortedSummary = summaryArray.sort((a, b) => a.no_urut.localeCompare(b.no_urut))

  // Return in QuickCountCard format
  return {
    id_region: 'total',
    name: 'Total',
    votes: sortedSummary,
    totalVotes
  }
}
