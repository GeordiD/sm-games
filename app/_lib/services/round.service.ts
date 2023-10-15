import db from '@/app/_lib/db';

export class RoundService {
  async getActiveRound(roomId: string) {
    return await db.round.findFirst({
      where: {
        roomId,
        isActive: true
      },
    })
  }

  async getRoundHistory(
    roomId: string,
    { skip, take } = {
      skip: 0,
      take: 5,
    },
  ) {
    return await db.round.findMany({
      where: {
        roomId,
        isActive: false,
      },
      orderBy: {
        createTime: 'desc',
      },
      skip,
      take,
    })
  }

  /**
   * This will mark all other rounds as deactive and 
   * create a round marked as active
   */
  async createNextActiveRound(roomId: string) {
    await this.setAllRoundsAsInactive(roomId);
    return await this.createRound(roomId);
  }

  private async setAllRoundsAsInactive(roomId: string) {
    await db.round.updateMany({
      data: {
        isActive: false,
      },
      where: {
        roomId,
        isActive: true,
      }
    })
  }

  private async createRound(roomId: string) {
    return await db.round.create({
      data: {
        roomId,
        isActive: true,
      }
    })
  }
}

export const _roundService = new RoundService();