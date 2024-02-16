import { Player, PokerRoom } from '@prisma/client';
import db from '@/app/_lib/db';
import { OptionalNullable } from '@/app/_lib/utils/optional-nullable';

export type CreateRoomReq = OptionalNullable<Omit<PokerRoom, 'id'>>;

export type GetRoomsRes = Omit<PokerRoom, 'userId'>;

export type RoomWithPlayers = ({
  players: Player[];
} & PokerRoom)

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

  async getRoomById(roomId: string): Promise<RoomWithPlayers | null> {
    return await db.pokerRoom.findFirst({
      where: {
        id: roomId,
      },
      include: {
        players: {
          where: {
            hasLeft: false,
          }
        },
      }
    })
  }
}

export const _roomService = new RoomService();