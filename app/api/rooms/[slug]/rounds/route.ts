import { NotFound } from '@/app/_lib/default-responses';
import { NoUserIdFound } from '@/app/_lib/errors/NoUserIdFound';
import { _roomService } from '@/app/_lib/services/room.service';
import { _roundService } from '@/app/_lib/services/round.service';
import { _socketService } from '@/app/_lib/services/socket.service';
import { RouteHandler } from '@/app/_lib/types/RouteHandler';
import { Round } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export interface CreateRoundApiResponse {
  activeRound: Round,
}

export async function POST(req: NextRequest, { params }: RouteHandler) {
  const userId = (await getToken({ req }))?.userId;

  if (!userId) return NoUserIdFound();

  const roomResult = await _roomService.getRoomById(params.slug)

  // If rooom doesn't exist, return 404
  if (!roomResult) {
    return NotFound();
  }

  const newRound = await _roundService.createNextActiveRound(params.slug);

  _socketService.send('room_change', roomResult.id, undefined)

  return NextResponse.json({
    activeRound: newRound,
  } as CreateRoundApiResponse);
}

export async function PUT(req: NextRequest, { params }: RouteHandler) {
  const userId = (await getToken({ req }))?.userId;

  if (!userId) return NoUserIdFound();

  const round = await _roundService.getActiveRound(params.slug);

  // If rooom doesn't exist, return 404
  if (!round) {
    return NotFound();
  }

  const body: {
    isCardsFlipped: boolean,
  } = await req.json();

  const updatedRound = _roundService.flipCards(params.slug, round.id, body.isCardsFlipped);

  return NextResponse.json({
    activeRound: updatedRound,
  })
}
