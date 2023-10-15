import { PokerRoom } from '@prisma/client';
import db from '@/app/_lib/db';

export type CreateRoomReq = OptionalNullable<Omit<PokerRoom, 'id'>>;

export type GetRoomsRes = Omit<PokerRoom, 'userId'>;

export class RoomService {
  async createRoom(room: CreateRoomReq): Promise<PokerRoom> {
    return await db.pokerRoom.create({
      data: room
    })
  }

  async getRoomsByUser(userId: string): Promise<GetRoomsRes[]> {
    return await db.pokerRoom.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        nickname: true,
      }
    })
  }

  async getRoomById(roomId: string): Promise<GetRoomsRes | null> {
    return await db.pokerRoom.findFirst({
      where: {
        id: roomId,
      },
      select: {
        id: true,
        nickname: true,
      },
    })
  }
}

export const _roomService = new RoomService();