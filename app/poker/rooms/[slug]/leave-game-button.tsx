import { useAppDispatch } from '@/app/_lib/hooks';
import { _localStorageService } from '@/app/_lib/utils/LocalStorageService';

export default function LeaveGameButton(props: {
  roomId: string,
}) {
  const dispatch = useAppDispatch();

  const {
    roomId,
  } = props;

  async function handleLeaveGame() {
    const playerId = _localStorageService.getPlayerIdForRoom(roomId);

    const response = await fetch(
      `/api/rooms/${roomId}/players`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          playerId,
        })
      }
    )

    if (response.status === 200) {
      _localStorageService.removePlayerFromRoom({
        roomId,
      });

      dispatch({ type: 'room/reset' });
    } else {
      console.error('Could not remove player from api')
    }
  }

  return (
    <button
      className="btn btn-warning"
      onClick={handleLeaveGame}
    >Leave Game
    </button>
  )
}