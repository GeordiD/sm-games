'use client'

import { _localStorageService } from '@/app/_lib/utils/LocalStorageService';
import { GetRoomApiResponse } from '@/app/api/rooms/[slug]/route';
import AdminControls from '@/app/poker/rooms/[slug]/admin-controls';
import PlayerList from '@/app/poker/rooms/[slug]/player-list';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function getData(id: string) {
  const response = await fetch(
    `/api/rooms/${id}`,
    {
      method: 'GET'
    }
  );

  if (response.status === 404) {
    return null;
  } else {
    return await response.json();
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const pathname = usePathname();

  const roomId = params.slug;

  const [data, setData] = useState<GetRoomApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState('');

  useEffect(() => {
    const playerId = _localStorageService.getPlayerIdForRoom(roomId);
    setCurrentPlayerId(playerId);

    if (!playerId) {
      router.push(`${pathname}/join`)
    } else {
      getData(roomId)
        .then(response => {
          setData(response);
          setIsLoading(false);
        })
    }
  }, [roomId, router, pathname])

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  // No room found
  if (!data) {
    return (
      <div>
        No room found.
      </div>
    )
  }

  return (
    <div
className="flex gap-4">
      <PlayerList
        className="max-w-sm w-full"
        currentPlayerId={currentPlayerId}
        players={data.players}
        roomId={roomId}
      />
      <AdminControls />
    </div>
  )
}