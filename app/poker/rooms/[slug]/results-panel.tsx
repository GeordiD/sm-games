import { useAppSelector } from '@/app/_lib/hooks';

export default function ResultsPanel() {
  const votes = useAppSelector(state => state.round.votes);
  const voteValues = Object.values(votes);
  const numericalVotes = voteValues
    .filter(vote => !isNaN(vote as unknown as number))
    .map(vote => typeof vote === 'number' ? vote : parseInt(vote))

  const average = numericalVotes.length
    ? (numericalVotes.reduce((acc, value) => acc + value) / numericalVotes.length).toFixed(1)
    : undefined;

  return (
    <div className="">
      <p>Average: {average}</p>
    </div>
  )
}