'use client'

import Card from '@/app/_components/card';
import { useAppDispatch, useAppSelector } from '@/app/_lib/hooks';
import AdminControls from '@/app/poker/rooms/[slug]/admin-controls';

export default function VotingPanel(props: {
  roomId: string,
  currentPlayerId: string,
}) {
  const dispatch = useAppDispatch();
  const votingOptions = [1, 2, 3, 5, 8];

  const isAdmin = useAppSelector(state => state.room.currentPlayerIsAdmin);

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
    // using double equal so '1' == 1
    return value == currentVote
      ? 'btn-accent'
      : 'btn-primary'
  }

  const header = [
    (<p key="header">Vote</p>)
  ]

  if (isAdmin) header.push((
    <AdminControls
      key="adminControls"
      roomId={props.roomId}
    />
  ));

  console.log(currentVote);

  return (
    <Card
      header={header}
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