class LocalStorageService { 
  addPlayerToRoom({ playerId, roomId }: {
    playerId: string,
    roomId: string,
  }) {
    const key = 'roomIdToPlayerId';
    
    const storedRoomToPlayerMap: Record<string, string> = JSON.parse(
      localStorage.getItem(key) ?? '{}'
    );

    storedRoomToPlayerMap[roomId] = playerId;

    localStorage.setItem(key, JSON.stringify(storedRoomToPlayerMap));
  }

  getPlayerIdForRoom(roomId: string) {
    const key = 'roomIdToPlayerId';
    const storedRoomToPlayerMap: Record<string, string> = JSON.parse(
      localStorage.getItem(key) ?? '{}'
    );
    return storedRoomToPlayerMap[roomId] ?? '';
  }
}

export const _localStorageService = new LocalStorageService();