'use client'

import Card from '@/app/_components/card';
import { useAppDispatch, useAppSelector } from '@/app/_lib/hooks';

export default function VotingPanel(props: {
  roomId: string,
  currentPlayerId: string,
}) {
  const dispatch = useAppDispatch();
  const votingOptions = [1, 2, 3, 5, 8];

  const currentVote = useAppSelector(state => {
    const votes = state.round.votes;
    const id = state.room.currentPlayerId;
    return votes[id];
  })

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

  function getButtonColor(value: string | number) {
    return value === currentVote
      ? 'btn-accent'
      : 'btn-primary'
  }

  return (
    <Card
      header={(<p key="header">Vote</p>)}
    >
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
    </Card>

  )
}