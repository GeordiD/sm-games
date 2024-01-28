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

  function handleLeaveGame() {
    _localStorageService.removePlayerFromRoom({
      roomId,
      playerId: _localStorageService.getPlayerIdForRoom(roomId),
    });

    router.refresh();
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