import { NotFound } from '@/app/_lib/default-responses';
import { _playerService } from '@/app/_lib/services/player.service';
import { _roundService } from '@/app/_lib/services/round.service';
import { _socketService } from '@/app/_lib/services/socket.service';
import { RouteHandler } from '@/app/_lib/types/RouteHandler';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: RouteHandler) {
  const body: {
    playerId: string,
    value: string,
  } = await req.json();

  const roundResult = await _roundService.getActiveRound(params.slug);
  const playerResult = await _playerService.getPlayer(body.playerId, params.slug);

  // If rooom doesn't exist, return 404
  if (!roundResult || !playerResult) {
    return NotFound();
  }

  await _roundService.insertOrUpdateVote({
    roundId: roundResult.id,
    playerId: playerResult.id,
    value: body.value,
  })

  _socketService.send('vote_change', params.slug, {
    playerId: playerResult.cuid,
    value: body.value,
  })

  return NextResponse.json({});
}