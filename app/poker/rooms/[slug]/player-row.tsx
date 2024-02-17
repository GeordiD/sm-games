import { useAppSelector } from '@/app/_lib/hooks'
import { useEffect, useState } from 'react';

export default function PlayerRow(props: {
  name: string,
  cuid: string,
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