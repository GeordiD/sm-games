import { CreateRoomReq, _roomService } from '@/app/_lib/services/room.service';
import { NoUserIdFound } from '@/app/_lib/errors/NoUserIdFound';
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const userId = (await getToken({ req }))?.userId;

  if (!userId) return NoUserIdFound();

  let roomReq: CreateRoomReq = {
    userId,
  }

  try {
    const body = await req.json();

    if (body.nickname && typeof body.nickname === 'string') {
      roomReq.nickname = body.nickname;
    }
  } catch (err) {
    return NextResponse.json(
      {}, { status: 400 }
    )
  }

  const newRoom = await _roomService.createRoom(roomReq);

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