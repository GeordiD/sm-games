import { NotFound } from '@/app/_lib/default-responses';
import { NoUserIdFound } from '@/app/_lib/errors/NoUserIdFound';
import { _roomService } from '@/app/_lib/services/room.service';
import { _roundService } from '@/app/_lib/services/round.service';
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

  return NextResponse.json({
    activeRound: newRound,
  } as CreateRoundApiResponse);
}