'use client'

import { useAppDispatch, useAppSelector } from '@/app/_lib/hooks';
import { fetchRoomData } from '@/app/_lib/store/roomSlice';
import { _localStorageService } from '@/app/_lib/utils/LocalStorageService';
import AdminControls from '@/app/poker/rooms/[slug]/admin-controls';
import PlayerList from '@/app/poker/rooms/[slug]/player-list';
import VotingPanel from '@/app/poker/rooms/[slug]/voting-panel';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const roomId = params.slug;

  const status = useAppSelector(state => state.room.status);
  const players = useAppSelector(state => state.room.players ?? []);
  const hasLoaded = useAppSelector(state => state.room.hasLoaded);
  const currentPlayer = useAppSelector(state => state.room.currentPlayer);

  useEffect(() => {
    const playerId = _localStorageService.getPlayerIdForRoom(roomId);
    dispatch({
      type: 'room/updatePlayerId',
      payload: playerId,
    })

    if (!playerId) {
      router.push(`${pathname}/join`)
    } else if (hasLoaded && !players.find(x => x.cuid === playerId)) {
      // The player has an id in the local storage but not in the game
      // Navigate to join && delete the player id
      _localStorageService.removePlayerFromRoom({
        roomId,
      });
      router.push(`${pathname}/join`)
    } else {
      if (status === 'idle') {
        dispatch(fetchRoomData(roomId));
        const socket = io(process.env.socket_server_url ?? '');

        socket.emit('join', roomId);

        socket.on('vote_change', (payload) => {
          dispatch({
            type: 'round/updateVote',
            payload,
          })
        })

        socket.on('room_change', () => {
          dispatch(fetchRoomData(roomId))
        })
      }
    }
  }, [roomId, router, pathname, dispatch, status])

  if (!hasLoaded) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  // No room found
  if (status === 'failed') {
    return (
      <div>
        No room found.
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      <PlayerList
        className="max-w-xs w-full"
        currentPlayerId={currentPlayer.id}
        players={players}
        roomId={roomId}
      />
      {
        currentPlayer.isAdmin &&
        <AdminControls
          roomId={roomId}
        />
      }
      <VotingPanel
        roomId={roomId}
        currentPlayerId={currentPlayer.id}
      />
    </div>
  )
}