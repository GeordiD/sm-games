import { useAppDispatch, useAppSelector } from '@/app/_lib/hooks';
import { useState } from 'react';

export default function VotingOptions(props: {
  currentPlayerId: string,
  roomId: string,
}) {
  const votingOptions = [1, 2, 3, 5, 8];
  const dispatch = useAppDispatch();

  const currentVote = useAppSelector(state => {
    const votes = state.round.votes;
    const id = state.room.currentPlayerId;
    return votes[id];
  })

  const [localCurrentVote, setLocalCurrentVote] = useState<string | number | undefined>(undefined)

  async function handleVote(value: number) {
    setLocalCurrentVote(value);

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

  function getButtonColor(value: string | number) {
    // using double equal so '1' == 1
    return value == (localCurrentVote ?? currentVote)
      ? 'btn-accent'
      : 'btn-primary'
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center content-start">
      {
        votingOptions.map(option =>
          <button
            className={`btn btn-square ${getButtonColor(option)} w-16 h-16 my-0`}
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