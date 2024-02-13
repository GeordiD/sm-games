type Event = {
  vote_change: {
    playerId: string,
    value: string,
  }
}

type EventName = keyof Event;

export class SocketService {
  send<T extends EventName>(eventName: T, roomId: string, payload: Event[T]) {
    const baseUrl = process.env.BE_URL ?? '';
    if (!baseUrl) {
      throw Error('no BE_URL found. check env variables');
    }

    fetch(
      `${baseUrl}/api/v1/sockets/${roomId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          eventName,
          payload,
        })
      }
    )
  }
}

export const _socketService = new SocketService();