class LocalStorageService { 
  private roomIdToPlayerId = 'roomIdToPlayerId';


  addPlayerToRoom({ playerId, roomId }: {
    playerId: string,
    roomId: string,
  }) {
    const storedRoomToPlayerMap = this.getRoomToPlayerMap();

    storedRoomToPlayerMap[roomId] = playerId;

    localStorage.setItem(this.roomIdToPlayerId, JSON.stringify(storedRoomToPlayerMap));
  }

  removePlayerFromRoom({ playerId, roomId }: {
    playerId: string,
    roomId: string,
  }) {
    const storedRoomToPlayerMap = this.getRoomToPlayerMap();

    if (storedRoomToPlayerMap[roomId]) {
      delete storedRoomToPlayerMap[roomId];
    }

    localStorage.setItem(this.roomIdToPlayerId, JSON.stringify(storedRoomToPlayerMap));
  }

  getPlayerIdForRoom(roomId: string) {
    const storedRoomToPlayerMap = this.getRoomToPlayerMap();
    return storedRoomToPlayerMap[roomId] ?? '';
  }

  private getRoomToPlayerMap(): Record<string, string> {
    return JSON.parse(
      localStorage.getItem(this.roomIdToPlayerId) ?? '{}'
    );
  }
}

export const _localStorageService = new LocalStorageService();