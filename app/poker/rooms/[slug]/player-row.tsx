import { useAppSelector } from '@/app/_lib/hooks'

export default function PlayerRow(props: {
  name: string,
  cuid: string,
  isConnected?: boolean,
}) {
  const votes = useAppSelector(state => state.round.votes) ?? [];
  const currentPlayerId = useAppSelector(state => state.room.currentPlayerId);
  const currentPlayerIsAdmin = useAppSelector(state => state.room.currentPlayerIsAdmin);
  const roomId = useAppSelector(state => state.room.roomId);

  async function handleRemovePlayer() {
    await fetch(
      `/api/rooms/${roomId}/players`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          playerId: props.cuid,
        })
      }
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-grow">
        {props.isConnected && '*'}
        {props.name}
      </div>
      {
        currentPlayerIsAdmin && currentPlayerId !== props.cuid &&
        <button
          className="btn btn-ghost"
          onClick={handleRemovePlayer}>x
        </button>
      }
      <div>
        {votes[props.cuid] ?? ''}
      </div>
    </div>
  )
}