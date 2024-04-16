'use client'

import { useAppDispatch, useAppSelector } from '@/app/_lib/hooks'
import { createNewRound } from '@/app/_lib/store/roundSlice';
import FlipIcon from '@/app/_imgs/rotate-ccw.svg';
import NextIcon from '@/app/_imgs/arrow-right.svg';

export default function AdminControls(props: {
  className?: string,
  roomId: string,
}) {
  const dispatch = useAppDispatch();

  const {
    className = '',
    roomId,
  } = props

  const nextRoundStatus = useAppSelector(state => state.round.status);
  const activeRound = useAppSelector(state => state.round.active);
  const votes = useAppSelector(state => state.round.votes);

  const someoneHasVoted = Object.keys(votes).length > 0;

  function handleNextRoundClick() {
    dispatch(createNewRound(roomId));
  }

  async function handleFlipCardsClick() {
    await fetch(`/api/rooms/${roomId}/rounds`, {
      method: 'PUT',
      body: JSON.stringify({
        isCardsFlipped: true,
      })
    });
  }

  return (
    <div className={`${className} flex gap-4`}>
      <div
        className="tooltip ml-4"
        data-tip="Flip Cards">
        <button
          onClick={handleFlipCardsClick}
          className="btn btn-square btn-ghost btn-sm"
          disabled={activeRound?.isCardsFlipped || !someoneHasVoted}
        >
          <FlipIcon />
        </button>
      </div>
      <div
        className="tooltip"
        data-tip="Next Round">
        <button
          onClick={handleNextRoundClick}
          className="btn btn-square btn-ghost btn-sm"
          disabled={nextRoundStatus !== 'idle' || !activeRound?.isCardsFlipped}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  )
}