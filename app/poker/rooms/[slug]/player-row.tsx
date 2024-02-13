import { useAppSelector } from '@/app/_lib/hooks'

export default function PlayerRow(props: {
  name: string,
  cuid: string,
}) {
  const votes = useAppSelector(state => state.round.votes);

  return (
    <div className="flex justify-between">
      <div>
        {props.name}
      </div>
      <div>
        {votes[props.cuid] ?? ''}
      </div>
    </div>
  )
}