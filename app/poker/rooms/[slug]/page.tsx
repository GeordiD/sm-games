import { _localStorageService } from '@/app/_lib/utils/LocalStorageService';
import JoinGame from '@/app/poker/rooms/[slug]/join/page';

async function getData(id: string) {
  const response = await fetch(
    `${process.env.URL}/api/rooms/${id}`,
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

export default async function Page({ params }: { params: { slug: string } }) {
  const roomId = params.slug;

  // can't do this because no local storage on server
  // const playerId = _localStorageService.getPlayerIdForRoom(roomId);
  // if (!playerId) {

  // }

  const data = await getData(roomId);

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
    </div>
  )
}