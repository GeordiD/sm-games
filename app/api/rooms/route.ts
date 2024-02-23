import { CreateRoomReq, _roomService } from '@/app/_lib/services/room.service';
import { NoUserIdFound } from '@/app/_lib/errors/NoUserIdFound';
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from 'next/server';
import { _roundService } from '@/app/_lib/services/round.service';

export interface CreateRoomApiResponse {
  room: {
    id: string,
    nickname?: string,
  }
}

export async function POST(req: NextRequest) {
  const userId = (await getToken({ req }))?.userId;

  if (!userId) return NoUserIdFound();

  const roomReq: CreateRoomReq = {
    userId,
  }

  let body: any;

  try {
    body = await req.json();
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: 'Issue parsing nickname'
      }, { status: 400 }
    )
  }

  if (body.nickname && typeof body.nickname === 'string') {
    roomReq.nickname = body.nickname;
  }

  const newRoom = await _roomService.createRoom(roomReq);
  await _roundService.createNextActiveRound(newRoom.id);

  return NextResponse.json({
    room: {
      id: newRoom.id,
      nickname: newRoom.nickname || undefined,
    }
  });
}

export async function GET(req: NextRequest) {
  const userId = (await getToken({ req }))?.userId;

  if (!userId) return NoUserIdFound();

  const rooms = await _roomService.getRoomsByUser(userId);

  return NextResponse.json({
    rooms,
  })
}
