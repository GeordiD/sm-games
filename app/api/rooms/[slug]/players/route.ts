import { NotFound } from '@/app/_lib/default-responses';
import { _playerService } from '@/app/_lib/services/player.service';
import { _roomService } from '@/app/_lib/services/room.service';
import { _socketService } from '@/app/_lib/services/socket.service';
import { RouteHandler } from '@/app/_lib/types/RouteHandler';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export interface AddPlayerApiResponse {
  playerId: string;
}

// Add Player
export async function POST(
  req: NextRequest,
  { params }: RouteHandler,
) {
  const body: {
    name: string,
    isAdmin: boolean,
    isVoter: boolean,
  } = await req.json();

  const token = await getToken({ req })

  if (!body.name) {
    return NextResponse.json({
      message: 'No player name provided',
    }, { status: 400 })
  }

  const roomResult = await _roomService.getRoomById(params.slug)

  // If rooom doesn't exist, return 404
  if (!roomResult) {
    return NotFound();
  }

  const player = await _playerService.addPlayer({
    name: body.name,
    roomId: roomResult.id,
    isAdmin: token?.userId === roomResult.userId,
    isVoter: !!body.isVoter,
  })

  _socketService.send('room_change', params.slug, undefined);

  return NextResponse.json({
    playerId: player.cuid,
  } as AddPlayerApiResponse);
}

// Remove player
export async function DELETE(
  req: NextRequest,
  { params }: RouteHandler,
) {
  const body: {
    playerId: string,
  } = await req.json();

  if (!body.playerId) {
    return NextResponse.json({
      message: 'No player id provided',
    }, { status: 400 })
  }

  const room = await _roomService.getRoomById(params.slug);

  if (!room) {
    return NotFound();
  }

  const shouldDeleteGame = room.userId === body.playerId;

  if (shouldDeleteGame) {
    // delete room
    console.error('unimplemented');
  } else {
    // remove player
    _playerService.removePlayer({ playerId: body.playerId })
    _socketService.send('room_change', params.slug, undefined);
  }

  return NextResponse.json({
    isDeletingGame: shouldDeleteGame,
  });
}