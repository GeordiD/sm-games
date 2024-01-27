import { NotFound } from '@/app/_lib/default-responses';
import { _roomService } from '@/app/_lib/services/room.service';
import { _roundService } from '@/app/_lib/services/round.service';
import { RouteHandler } from '@/app/_lib/types/RouteHandler';
import { NextRequest, NextResponse } from 'next/server';

// Get data about current state of a room
export async function GET(
  req: NextRequest,
  { params }: RouteHandler,
) {
  const roomResult = await _roomService.getRoomById(params.slug)

  // If rooom doesn't exist, return 404
  if (!roomResult) {
    return NotFound();
  }

  const {
    players,
    ...pokerRoom
  } = roomResult;

  const activeRound = await _roundService.getActiveRound(roomResult.id);
  const pastRounds = await _roundService.getRoundHistory(roomResult.id);

  return NextResponse.json({
    room: pokerRoom,
    players,
    activeRound: activeRound || null,
    history: pastRounds || [],
  })
}
