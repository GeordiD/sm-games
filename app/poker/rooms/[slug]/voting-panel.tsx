'use client'

import { useAppDispatch } from '@/app/_lib/hooks';

export default function VotingPanel(props: {
  roomId: string,
  currentPlayerId: string,
}) {
  const dispatch = useAppDispatch();
  const votingOptions = [1, 2, 3, 5, 8];

  async function handleVote(value: number) {
    await fetch(
      `/api/rooms/${props.roomId}/vote`,
      {
        method: 'POST',
        body: JSON.stringify({
          playerId: props.currentPlayerId,
          value: value.toString(),
        })
      }
    )

    dispatch({
      type: 'round/updateVote',
      payload: {
        value,
        playerId: props.currentPlayerId,
      },
    });
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center content-start">
      {
        votingOptions.map(option =>
          <button
            className="btn btn-square btn-secondary w-16 h-16 my-0"
            key={option}
            onClick={() => handleVote(option)}
          >
            {option}
          </button>
        )
      }
    </div>
  )
}