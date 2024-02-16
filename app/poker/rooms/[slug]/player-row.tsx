import { useAppSelector } from '@/app/_lib/hooks'
import { useEffect, useState } from 'react';

export default function PlayerRow(props: {
  name: string,
  cuid: string,
}) {
  const votes = useAppSelector(state => state.round.votes) ?? [];
  const currentPlayer = useAppSelector(state => state.room.currentPlayer);
  const roomId = useAppSelector(state => state.room.roomId);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(currentPlayer.isAdmin);
  }, [currentPlayer, isAdmin])

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
        {props.name}
      </div>
      {
        isAdmin && currentPlayer.id !== props.cuid &&
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