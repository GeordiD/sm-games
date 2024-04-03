import OptionsSvg from '@/app/_imgs/three-dot.svg';
import { useAppDispatch } from '@/app/_lib/hooks';
import { _localStorageService } from '@/app/_lib/utils/LocalStorageService';

export default function NavBar(props: {
  roomName: string,
  roomId: string,
}) {
  const dispatch = useAppDispatch();

  const {
    roomId,
    roomName,
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
    <div className="navbar bg-base-300 rounded-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{roomName}</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-square btn-ghost">
            <OptionsSvg className="w-8 h-8" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
            <li><a onClick={handleLeaveGame}>Leave Game</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}