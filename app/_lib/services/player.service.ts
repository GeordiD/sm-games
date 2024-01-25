import db from '@/app/_lib/db';

export class PlayerService {
  async getPlayer(playerCuid: string, roomId: string) {
    return await db.player.findFirst({
      where: {
        cuid: playerCuid,
        pokerRoomId: roomId,
      }
    });
  }

  async addPlayer({
    name,
    roomId,
    isVoter,
    isAdmin,
  }: {
    name: string,
    roomId: string,
    isVoter?: boolean,
    isAdmin?: boolean,
  }) {
    if (isVoter === undefined) isVoter = true;
    if (isAdmin === undefined) isAdmin = false;

    return await db.player.create({
      data: {
        name,
        pokerRoomId: roomId,
        isVoter,
        isAdmin,
      }
    })
  }
}

export const _playerService = new PlayerService();