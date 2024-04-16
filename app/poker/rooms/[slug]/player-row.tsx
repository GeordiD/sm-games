import { useAppSelector } from '@/app/_lib/hooks'
import CloseIcon from '@/app/_imgs/x.svg';

export default function PlayerRow(props: {
  name: string,
  cuid: string,
  isConnected?: boolean,
  showDeleteButton: boolean,
}) {
  const votes = useAppSelector(state => state.round.votes) ?? [];
  const currentPlayerId = useAppSelector(state => state.room.currentPlayerId);
  const currentPlayerIsAdmin = useAppSelector(state => state.room.currentPlayerIsAdmin);
  const roomId = useAppSelector(state => state.room.roomId);
  const round = useAppSelector(state => state.round.active);

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

  let voteValue = '';
  if (votes[props.cuid]) {
    voteValue = round?.isCardsFlipped || props.cuid === currentPlayerId
      ? votes[props.cuid] : '■';
  }

  const shouldShowDeleteControls = currentPlayerIsAdmin
    && currentPlayerId !== props.cuid
    && props.showDeleteButton;

  return (
    <div className="flex items-center gap-4 h-8">
      {
        shouldShowDeleteControls &&
        <button
          className="btn btn-error btn-square btn-sm"
          onClick={handleRemovePlayer}
        >
          <CloseIcon />
        </button>
      }
      <div className={`flex-grow ${props.isConnected ? '' : 'text-base-context-disabled'}`}>
        {props.name}
      </div>
      <div className="">
        {voteValue ?? ''}
      </div>
    </div>
  )
}