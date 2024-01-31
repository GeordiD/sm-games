'use client'

import { CreateRoomApiResponse } from '@/app/api/rooms/route';
import { useRouter } from 'next/navigation';

export default function CreateGameButton() {
  const router = useRouter();

  async function handleCreate() {
    const result: CreateRoomApiResponse =
      await (await fetch(
        '/api/rooms',
        {
          method: 'POST',
          body: JSON.stringify({}),
        }
      )).json()

    router.push(`/poker/rooms/${result.room.id}`);
  }

  return (
    <button
onClick={handleCreate}>Create Game
    </button>
  )
}