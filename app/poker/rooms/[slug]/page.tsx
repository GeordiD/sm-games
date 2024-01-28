'use client'

import { _localStorageService } from '@/app/_lib/utils/LocalStorageService';
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

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    console.log(window === undefined);
    const playerId = _localStorageService.getPlayerIdForRoom(roomId);

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

  async function handleLeaveGame() {
    const playerId = _localStorageService.getPlayerIdForRoom(roomId);

    const response = await fetch(
      `/api/rooms/${params.slug}/players`,
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
        playerId: _localStorageService.getPlayerIdForRoom(roomId),
      });

      router.push(`${pathname}/join`)
    } else {
      console.error('Could not remove player from api')
    }
  }

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
    <div className="flex flex-col gap-4">
      <p>
        {JSON.stringify(data, undefined, 2)}
      </p>
      <button
        className="btn btn-warning"
        onClick={handleLeaveGame}
      >Leave Game</button>
    </div>
  )
}