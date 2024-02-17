'use client'

import { _localStorageService } from '@/app/_lib/utils/LocalStorageService';
import { AddPlayerApiResponse } from '@/app/api/rooms/[slug]/players/route';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState('')

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function navigateToRoom() {
    // navigate to the path minus join
    router.push(pathname.split('/join')[0]);
  }

  async function handleJoin(asParticipant: boolean) {
    if (!name) return;

    const response = await fetch(
      `/api/rooms/${params.slug}/players`,
      {
        method: 'POST',
        body: JSON.stringify({
          name,
          isVoter: asParticipant,
          isAdmin: false,
        }),
      }
    );

    if (response.status === 200) {
      const result: AddPlayerApiResponse = await response.json();

      _localStorageService.addPlayerToRoom({
        roomId: params.slug,
        playerId: result.playerId
      });

      navigateToRoom();
    }
  }

  useEffect(() => {
    if (_localStorageService.getPlayerIdForRoom(params.slug)) {
      navigateToRoom();
    }
  })

  return (
    <div
      className="flex flex-col gap-4">
      <h1>Join Game</h1>
      <div>
        <label
          className="form-control w-full max-w-xs">
          <div
            className="label">
            <span
              className="label-text">What is your name?
            </span>
          </div>
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs" />
        </label>
      </div>
      <div
        className="flex gap-4">
        <button
          disabled={!name}
          className="btn btn-primary"
          onClick={() => handleJoin(true)}
        >Join as Participant
        </button>
        <button
          disabled={!name}
          className="btn btn-secondary"
          onClick={() => handleJoin(false)}
        >Join as Observer
        </button>
      </div>
    </div>
  )
}