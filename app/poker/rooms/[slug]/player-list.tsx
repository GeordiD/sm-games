import { useAppSelector } from '@/app/_lib/hooks';
import PlayerRow from '@/app/poker/rooms/[slug]/player-row';
import EditIcon from '@/app/_imgs/pen.svg';
import CheckIcon from '@/app/_imgs/check.svg';
import { useState } from 'react';
import Card from '@/app/_components/card';

export default function PlayerList(props: {
  className?: string,
  currentPlayerId: string,
}) {
  const {
    className = '',
    currentPlayerId,
  } = props;

  const players = useAppSelector(state => state.room.players);
  const connectedIds = useAppSelector(state => state.room.connectedPlayerIds);

  const [isInEditMode, setIsInEditMode] = useState(false);

  const getPlayers = () => players
    .map(x => x)
    .sort((a, b) => {
      // The current player must be first
      if (a.cuid === currentPlayerId) return -1;
      if (b.cuid === currentPlayerId) return 1;

      // Otherwise, sort alphabetically (case insensitive)
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      return aName < bName ? -1 : (aName > bName ? 1 : 0);
    }) ?? [];

  function handleEditToggle() {
    setIsInEditMode(!isInEditMode);
  }

  const editButton = (
    <button
      className="btn btn-square btn-sm btn-ghost"
      key="editButton"
      onClick={handleEditToggle}>
      <EditIcon />
    </button>
  )

  const stopEditingButton = (
    <button
      key="stopEditButton"
      className="btn btn-square btn-sm btn-success"
      onClick={handleEditToggle}>
      <CheckIcon />
    </button>
  )

  const header = [
    (<p key="headerTitle">Players</p>),
    isInEditMode ? stopEditingButton : editButton,
  ]

  return (
    <Card
      className={className}
      header={header}
    >
      <div
        className="flex flex-col gap-4">
        {
          getPlayers().map(player =>
            <PlayerRow
              key={player.cuid}
              name={player.name}
              cuid={player.cuid}
              isConnected={connectedIds.includes(player.cuid)}
              showDeleteButton={isInEditMode}
            />)
        }
      </div>
    </Card>
  )
}