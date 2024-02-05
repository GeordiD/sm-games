# Dev Notes

I think we should probably start integrating websockets now. I think I need to hook up the websocket
events to a redux action (using middleware). I should be able to just listen for actions and update state appropriately.

Ex. 
admin hits api to create a new round. response updates UI via redux on his screen
the server also will send a websocket event to notify the clients
That notification would get picked up by the same redux store? 

# Schema Brainstorm:

Room {
  id,
  userId,
  nickname?,

  // Default settings:
  cards: [1, 2, 3, 5, 8, 13, ?],
}

Players: {
  id: (generated cuid),
  name,
  isVoter: true,
  isAdmin,
}

Round: {
  id,
  roomId,
  isActive,
  name?,
}

Vote: {
  id,
  roundId,
  playerId,
  value,
  time,
}


Leader: userId
Participants: {
  some-id, (local-storage)
  name,
  isVoter,
}[]
Settings: {
  cards: [1, 2, 3, 5, 8],
}
Round: {
  name?,
  votes: {
    participantId,
    value,
  }[],
}
History: Rouind[]