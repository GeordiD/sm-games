import db from '@/app/_lib/db';
import { _socketService } from '@/app/_lib/services/socket.service';
import { Prisma, Round } from '@prisma/client';

export type ActiveRound = {
  Vote: {
    value: string,
    player: {
      cuid: string,
    }
  }[]
} & Round;

export class RoundService {
  async getActiveRound(roomId: string): Promise<ActiveRound | null> {
    return await db.round.findFirst({
      where: {
        roomId,
        isActive: true
      },
      include: {
        Vote: {
          select: {
            value: true,
            player: {
              select: {
                cuid: true,
              }
            },
          }
        }
      }
    })
  }

  async flipCards(roomId: string, roundId: number, value: boolean) {
    const updatedRound = await _roundService.updateRound(roundId, {
      isCardsFlipped: value,
    });
    _socketService.send('round_update', roomId, {
      isCardsFlipped: value,
    });

    return updatedRound;
  }

  async updateRound(roundId: number, update: Prisma.RoundUpdateInput) {
    return await db.round.update({
      data: update,
      where: {
        id: roundId,
      }
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

  async vote({ round, playerId, playerCuid, roomId, value }: {
    round: ActiveRound,
    roomId: string,
    playerId: number,
    playerCuid: string,
    value: string,
  }) {
    await this.insertOrUpdateVote({ roundId: round.id, playerId, value });

    _socketService.send('vote_change', roomId, {
      playerId: playerCuid,
      value: value,
    });

    const playersLeftToVote = await this.getUnvotedPlayerCount(roomId, round.id);
    if (playersLeftToVote <= 0) {
      await this.flipCards(roomId, round.id, true);
    }
  }

  async getUnvotedPlayerCount(roomId: string, roundId: number) {
   return await db.player.count({
      where: {
        AND: {
          pokerRoomId: roomId,
          isVoter: true,
          hasLeft: false,
          Vote: {
            none: {
              roundId,
            }
          }
        }
      }
    })
  }

  async insertOrUpdateVote({ roundId, playerId, value }: {
    roundId: number,
    playerId: number,
    value: string,
  }) {
    return await db.vote.upsert({
      create: {
        value: value,
        playerId,
        roundId,
      },
      update: {
        value,
      },
      where: {
        roundId_playerId: {
          playerId,
          roundId,
        }
      }
    });
  }
}

export const _roundService = new RoundService();