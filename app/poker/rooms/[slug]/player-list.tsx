import { useAppSelector } from '@/app/_lib/hooks';
import PlayerRow from '@/app/poker/rooms/[slug]/player-row';

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

  return (
    <div
      className={`${className} flex flex-col gap-4 bg-base-300 p-4 rounded-md`}>
      {
        getPlayers().map(player =>
          <PlayerRow
            key={player.cuid}
            name={player.name}
            cuid={player.cuid}
            isConnected={connectedIds.includes(player.cuid)}
          />)
      }
    </div>
  )
}